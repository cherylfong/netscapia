const { describe, test, expect } = require('@playwright/test')

describe('Note app', () => {

    test('front page can be opened', async ({ page }) => {
        await page.goto('http://localhost:5173')

        const locator = page.getByText('Notes')
        await expect(locator).toBeVisible()
        await expect(page.getByText('NOTE APP')).toBeVisible()
    })

})