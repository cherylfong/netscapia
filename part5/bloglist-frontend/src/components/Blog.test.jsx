import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('<Blog />', () => {


  test('displays blog title and author but does not render URL and number of Likes', () => {

    const blogItem = {
      title: 'some title',
      author: 'some author',
      url: 'some url',
      likes: 1
    }

    const mockLoggedInUserHandler = vi.fn()
    const mockUpdateBlogLikesHandler = vi.fn()

    const { container } = render(<Blog blog={blogItem} loggedInUser={mockLoggedInUserHandler} updateBlogLikes={mockUpdateBlogLikesHandler}/>)

    const titleByAuthor = container.querySelector('#title-author-test')
    expect(titleByAuthor).toHaveTextContent('some title by some author')

    const urlNotVisible = screen.getByText('some url')
    expect(urlNotVisible).not.toBeVisible()

    const likesNotVisible = screen.getByText('1 like')
    expect(likesNotVisible).not.toBeVisible()

  })

  test('blog url and likes shown when view button toggled', async () => {

    const blogItem = {
      title: 'some title',
      author: 'some author',
      url: 'some url',
      likes: 1
    }

    const mockLoggedInUserHandler = vi.fn()
    const mockUpdateBlogLikesHandler = vi.fn()

    render(<Blog blog={blogItem} loggedInUser={mockLoggedInUserHandler} updateBlogLikes={mockUpdateBlogLikesHandler}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const urlVisible = screen.getByText('some url')
    expect(urlVisible).toBeVisible()

    const likesVisible = screen.getByText('1 like')
    expect(likesVisible).toBeVisible()

  })

  test('event handler received props called twice when like button clicked twice', async () => {

    const blogItem = {
      title: 'some title',
      author: 'some author',
      url: 'some url',
      likes: 1
    }

    const mockLoggedInUserHandler = vi.fn()
    const mockUpdateBlogLikesHandler = vi.fn()

    render(<Blog blog={blogItem} loggedInUser={mockLoggedInUserHandler} updateBlogLikes={mockUpdateBlogLikesHandler}/>)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('👍')

    // click twice
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockUpdateBlogLikesHandler.mock.calls).toHaveLength(2)

  })







}) // end: describe