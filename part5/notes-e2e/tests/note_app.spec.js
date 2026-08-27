const { describe, test, expect, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')

describe('Note app', () => {

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

    test('front page can be opened', async ({ page }) => {

        const locator = page.getByText('Notes')
        await expect(locator).toBeVisible()
        await expect(page.getByText('NOTE APP')).toBeVisible()
    })

    test('login fails with wrong password', async ({ page }) => {

        await loginWith(page, 'jelly', 'wrong')
        // using CSS selector
        const errorDiv = page.locator('.error')
        await expect(errorDiv).toContainText('wrong credentials')

        await expect(errorDiv).toHaveCSS('border-style', 'solid')
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

        await expect(page.getByText('jelly logged in.')).not.toBeVisible()
    })


    test('user can log in with correct credentials', async ({ page }) => {

        await loginWith(page, 'jelly', 'password')

        await expect(page.getByText('jelly is logged in.')).toBeVisible()

    })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'jelly', 'password')
        })

        test('a new note can be created', async ({ page }) => {
            await createNote(page, 'a note created by playwright')
            await expect(page.getByText('a note created by playwright')).toBeVisible()
        })

        describe('and a note exists', () => {
            beforeEach(async ({ page }) => {
                await createNote(page, 'another note by playwright')
            })

            test('importance can be changed', async ({ page }) => {
                await page.getByRole('button', { name: 'make not important' }).click()
                await expect(page.getByText('make important')).toBeVisible()
            })
        })
    })

})