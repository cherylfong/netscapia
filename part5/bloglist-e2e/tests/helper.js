const loginWith = async (page, username, password) => {
    await page.getByRole('button', { name: 'Welcome! Want to Login?' }).click()
    await page.getByLabel('username').fill(username)
    await page.getByLabel('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'Add a new blog to the list?' }).click()
    await page.getByLabel('title:').fill(title)
    await page.getByLabel('author:').fill(author)
    await page.getByLabel('url:').fill(url)
    await page.getByRole('button', { name: 'Save' }).click()
    await page.getByText(content).waitFor() // to wait for the inserted note to render
}
export { loginWith, createNote }