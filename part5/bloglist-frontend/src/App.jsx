import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

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
      .then(returnedBlog => {
        console.log(returnedBlog)
        setBlogs(blogs.concat(returnedBlog))

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
    <Togglable buttonLabel="Create a new blog to the list?" ref={blogFormRef}>
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
          <button onClick={handleLogOff}>Log Off</button>
        </div>
      )}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App