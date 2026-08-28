const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {

  beforeEach(async ({ page, request }) => {

    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'jelly',
        username: 'jelly',
        password: 'password'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {

    await page.getByRole('button', { name: 'Welcome! Want to Login?' }).click();

    await expect(page.getByLabel('username')).toBeVisible()

    await expect(page.getByLabel('password')).toBeVisible()

  })

  test('login fails with wrong credentials', async ({ page }) => {

    await loginWith(page, 'jelly', 'wrong')
    // using CSS selector
    const errorDiv = page.locator('.error')
    await expect(errorDiv).toContainText('Invalid credentials! 🔐 Try again 😀')

    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    await expect(page.getByText('jelly logged in.')).not.toBeVisible()
  })


  test('login succeeds with correct credentials', async ({ page }) => {

    await loginWith(page, 'jelly', 'password')

    await expect(page.getByText('jelly is logged in.')).toBeVisible()

  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'jelly', 'password')
    })

    test('a new blog item can be created', async ({ page }) => {
      await createBlog(page, 'Playwright Initiated Entry', 'Playwright Test', 'playwright.dev')
      await expect(page.getByText('Playwright Initiated Entry by Playwright Test')).toBeVisible()
    })

    test('a new blog item can be liked', async ({ page }) => {
      await createBlog(page, 'Playwright Initiated Entry', 'Playwright Test', 'playwright.dev')
      await expect(page.getByText('Playwright Initiated Entry by Playwright Test')).toBeVisible()

      await page.getByRole('button', { name: 'view' }).click()

      await page.getByRole('button', { name: '👍' }).click()
      await page.getByText(`'1 like`).waitFor

      await expect(page.getByText('1 like')).toBeVisible()

    })

    test('a blog created by logged in user can be deleted', async ({ page }) => {
      await createBlog(page, 'Playwright Initiated Entry', 'Playwright Test', 'playwright.dev')
      await expect(page.getByText('Playwright Initiated Entry by Playwright Test')).toBeVisible()

      await page.getByRole('button', { name: 'view' }).click()

      page.on('dialog', dialog => dialog.accept());
      await page.getByRole('button', { name: 'DELETE' }).click();

      await expect(page.getByText('Playwright Initiated Entry by Playwright Test')).not.toBeVisible()

      await expect(page.getByText('Blog item removed!')).toBeVisible()

    })


  })

})