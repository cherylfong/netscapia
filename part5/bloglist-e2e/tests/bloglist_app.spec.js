const { test, expect, beforeEach, describe } = require('@playwright/test')

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
})