const loginWith = async (page, username, password) => {
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

    await page.getByLabel('username').fill(username)
    await page.getByLabel('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const createNote = async (page, content) => {
    await page.getByRole('button', { name: 'Create a new note?' }).click()
    await page.getByRole('textbox').fill(content)
    await page.getByRole('button', { name: 'save' }).click()
}
export { loginWith, createNote }