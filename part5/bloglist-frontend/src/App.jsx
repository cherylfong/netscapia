import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import FilterBlogs from './components/FilterBlogs'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)

  const [notifyMessage, setNotifyMessage] = useState(null)
  const [notifyFlag, setNotifyFlag] = useState(true) // false for errors


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      // key values are stored as JSON strings (so convert to JSON object)
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createBlog = (blogItemObject) => {

    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogItemObject)
      .then(() => blogService.getAll())
      .then(refreshedBlogs => {
        console.log(refreshedBlogs)

        setBlogs(refreshedBlogs)

        setNotifyMessage(`Blog item titled "${blogItemObject.title}" added`)
        setNotifyFlag(true)
        resetNotification()
      }).catch(error => {
        // console.log(error.response.status)
        if (error.response.status === 400) {
          setNotifyMessage('Fill in all fields')
        } else {
          setNotifyMessage(`ERROR: status ${error.response.status}`)
        }

        setNotifyFlag(false)
      })
      .finally(resetNotification)


  }

  const updateBlogLikes = (blogId, blogObject) => {

    blogService
      .update(blogId, blogObject)
      // update blogs with the new updated blog
      .then(() => blogService.getAll())
      .then(refreshedBlogs => {
        console.log(refreshedBlogs)

        setBlogs(refreshedBlogs)

        setNotifyMessage(
          `Blog item titled "${blogObject.title}" updated with ${blogObject.likes} 👍`
        )
        setNotifyFlag(true)

      })
      .catch(error => {
        setNotifyMessage(`ERROR: ${error.message}`)
        setNotifyFlag(false)})
      .finally(resetNotification)

  }

  // only the logged-in users who is the original poster
  // (the user who added it) can delete the blog item
  const removeBlog = (blogId) => {

    blogService
      .remove(blogId)
      .then(() => blogService.getAll())
      .then(refreshedBlogs => {
        console.log('REMOVED: ', refreshedBlogs)

        setBlogs(refreshedBlogs)

        setNotifyMessage('Blog item removed!')
        setNotifyFlag(true)
      }).catch(error => {
        setNotifyMessage(`ERROR: ${error.message}`)
        setNotifyFlag(false)})
      .finally(resetNotification)

  }

  const handleLogin = async (username, password, setUsername, setPassword) => {


    try {

      if (password === '' || username === '') {
        throw new Error('Please enter both username and password')
      }

      const user = await loginService.login({ username, password })

      // save user's logged in username to browser key-value database
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      setUser(user)

      setUsername('')
      setPassword('')

      setNotifyMessage(`🎊 Welcome back ${username}!`)
      setNotifyFlag(true)


    } catch (error) {

      if (error.message.includes(401)) {

        setNotifyMessage('Invalid credentials! 🔐 Try again 😀')

      } else {
        setNotifyMessage(error.message)
      }
      setNotifyFlag(false)

    } finally {
      resetNotification()
    }
  }


  const handleLogOff = () => {
    window.localStorage.clear()
    setUser(null)
    setNotifyMessage('Log off successful')
    setNotifyFlag(true)
    resetNotification()
  }

  const resetNotification = async () => {
    await setTimeout(() => {
      setNotifyMessage(null)
      setNotifyFlag(true)
    }, 5000)
  }

  const loginForm = () => (

    <Togglable buttonLabel='Welcome! Want to Login?'>
      <LoginForm handleLogin={handleLogin} />
    </Togglable>

  )

  const blogFormRef = useRef()


  const blogForm = () => (
    <Togglable buttonLabel="Add a new blog to the list?" ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  return (
    <div>
      <h1>blogs</h1>

      <Notification message={notifyMessage} success={notifyFlag} />

      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name ?? user.username} is logged in.</p>
          {blogForm()}
          <button onClick={handleLogOff}>Log Out</button>
        </div>
      )}

      <p><i>*Blogs can only be deleted by the original user who added it. Login to see delete button</i></p>

      <FilterBlogs blogs={blogs} user={user} updateBlogLikes={updateBlogLikes} removeBlog={removeBlog}/>

    </div>
  )
}

export default App