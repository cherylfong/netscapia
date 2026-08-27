const { describe, test, expect, beforeEach } = require('@playwright/test')

describe('Note app', () => {

    beforeEach(async ({ page, request }) => {

        await request.post('http://localhost:3001/api/testing/reset')
        await request.post('http://localhost:3001/api/users', {
            data: {
                name: 'jelly',
                username: 'jelly',
                password: 'password'
            }
        })

        await page.goto('http://localhost:5173')

    })

    test('front page can be opened', async ({ page }) => {

        const locator = page.getByText('Notes')
        await expect(locator).toBeVisible()
        await expect(page.getByText('NOTE APP')).toBeVisible()
    })

    test('login fails with wrong password', async ({ page }) => {

        await page.getByRole('button', { name: 'Welcome! Want to Login?' }).click()

        await page.getByLabel('username').fill('jelly')
        await page.getByLabel('password').fill('wrong')
        await page.getByRole('button', { name: 'login' }).click()

        // using CSS selector
        const errorDiv = page.locator('.error')
        await expect(errorDiv).toContainText('wrong credentials')

        await expect(errorDiv).toHaveCSS('border-style', 'solid')
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

        await expect(page.getByText('jelly logged in.')).not.toBeVisible()
    })


    test('user can log in', async ({ page }) => {

        await page.getByRole('button', { name: 'Welcome! Want to Login?' }).click()

        // use first() and last() when there are more than 1 textbox
        //
        // await page.getByRole('textbox').first().fill('jelly')
        // await page.getByRole('textbox').last().fill('password')

        // const textboxes = await page.getByRole('textbox').all()
        // await textboxes[0].fill('jelly')
        // await textboxes[1].fill('password')
        // if the registration form is changed, the tests may break, 
        // as they rely on the fields to be on the page in a certain order
        //
        // option to use:
        // https://playwright.dev/docs/api/class-page#page-get-by-test-id


        await page.getByLabel('username').fill('jelly')
        await page.getByLabel('password').fill('password')

        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('jelly is logged in.')).toBeVisible()

    })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByRole('button', { name: 'Welcome! Want to Login?' }).click()
            await page.getByLabel('username').fill('jelly')
            await page.getByLabel('password').fill('password')

            await page.getByRole('button', { name: 'login' }).click()
        })

        test('a new note can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'Create a new note?' }).click()
            await page.getByLabel('content').fill('a note created by playwright')
            await page.getByRole('button', { name: 'save' }).click()
            await expect(page.getByText('a note created by playwright')).toBeVisible()
        })

        describe('and a note exists', () => {
            beforeEach(async ({ page }) => {
                await page.getByRole('button', { name: 'Create a new note?' }).click()
                await page.getByLabel('content').fill('another note by playwright')
                await page.getByRole('button', { name: 'save' }).click()
            })

            test('importance can be changed', async ({ page }) => {
                await page.getByRole('button', { name: 'make not important' }).click()
                await expect(page.getByText('make important')).toBeVisible()
            })
        })
    })

})