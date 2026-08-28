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

    test('DELETE button is only visible to user who posted the blog item', async ({ page, request }) => {
      await createBlog(page, 'Playwright Initiated Entry', 'Playwright Test', 'playwright.dev')
      await expect(page.getByText('Playwright Initiated Entry by Playwright Test')).toBeVisible()

      await page.getByRole('button', { name: 'view' }).click()

      await expect(page.getByRole('button', { name: 'DELETE' })).toBeVisible()

      await page.getByRole('button', { name: 'Log Out' }).click()

      await expect(page.getByText('Log off successful')).toBeVisible()

      await expect(page.getByText('jelly is logged in.')).not.toBeVisible()

      await expect(page.getByRole('button', { name: 'DELETE' })).not.toBeVisible()

      await request.post('/api/users', {
        data: {
          name: 'bean',
          username: 'bean',
          password: 'password'
        }
      })

      await loginWith(page, 'bean', 'password')

      await expect(page.getByText('bean is logged in.')).toBeVisible()

      await expect(page.getByRole('button', { name: 'DELETE' })).not.toBeVisible()
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
  }) // when logged in

  describe('sorting blog items', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'jelly', 'password')

      await createBlog(page, 'Test title 0', 'Playwright Test', 'playwright.dev')
      await createBlog(page, 'Test title 1', 'Playwright Test', 'playwright.dev')
      await createBlog(page, 'Test title 2', 'Playwright Test', 'playwright.dev')
      await createBlog(page, 'Test title 3', 'Playwright Test', 'playwright.dev')

    })

    test('sort blog items by most likes', async ({ page }) => {

      // title 0
      await page.getByRole('button', { name: 'view' }).first().click()

      // title 1
      await page.getByRole('button', { name: 'view' }).nth(1).click()

      const titleOneLikesParagraph = page.locator('#likes-id-2')

      await titleOneLikesParagraph.getByRole('button', { name: '👍' }).click()
      await expect(titleOneLikesParagraph).toContainText('1 like')

      // title 2
      const titleTwoLikesParagraph = page.locator('#likes-id-3')

      await page.getByRole('button', { name: 'view' }).nth(2).click()

      for (let i = 0; i < 2; i++) {
        await titleTwoLikesParagraph.getByRole('button', { name: '👍' }).click()
        if (i === 0) {
          await expect(titleTwoLikesParagraph).toContainText('1 like')
        }
      }
      await expect(titleTwoLikesParagraph).toContainText('2 likes')

      // title 3
      const titleThreeLikesParagraph = page.locator('#likes-id-4')

      await page.getByRole('button', { name: 'view' }).last().click()
      await titleThreeLikesParagraph.getByRole('button', { name: '👍' }).click()
      await expect(titleThreeLikesParagraph).toContainText('1 like')
      await titleThreeLikesParagraph.getByRole('button', { name: '👍' }).click()
      await expect(titleThreeLikesParagraph).toContainText('2 likes')
      await titleThreeLikesParagraph.getByRole('button', { name: '👍' }).click()
      await expect(titleThreeLikesParagraph).toContainText('3 likes')

      // sort by most likes

      await page.getByRole('button', { name: 'Sort by Most Likes' }).click()

      // reference the div that contains the whole list of blogs
      const parentOfTopMostElement = page.locator('#blog-stack')

      // get the top most child of parent div
      // CSS parent.locator(':scope > div').first()
      // OR XPath parent.locator('xpath=./div[1]')
      const topMostChild = parentOfTopMostElement.locator(':scope > div').first()
      const topMostParagraph = topMostChild.locator('p').first()

      await expect(topMostParagraph).toContainText('Test title 3')

      // get the next nested div after test title 3 div
      const topSecondParagraph = parentOfTopMostElement.locator('xpath=./div[2]').locator('p').first()
      await expect(topSecondParagraph).toContainText('Test title 2')

      // get the next nested div after test title 2 div
      const topThirdParagraph = parentOfTopMostElement.locator('xpath=./div[3]').locator('p').first()
      await expect(topThirdParagraph).toContainText('Test title 1')

      // get the next nested div after test title 1 div
      const lastParagraph = parentOfTopMostElement.locator('xpath=./div[4]').locator('p').first()
      await expect(lastParagraph).toContainText('Test title 0')

      // div id='blog-stack'
      //  div 
      //    p Test title 3
      //  div 
      //    p Test title 2
      //  div 
      //    p Test title 1
      //  div 
      //    p Test title 0
      // div - closing of blog stack div

    })

  }) // sorting blog items

})