import { useState, useEffect, useRef } from 'react'

import {
  Routes, Route, Link,
  useMatch, useNavigate
} from 'react-router-dom'

import About from './components/About'

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

  const navigate = useNavigate()

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
        setNotifyFlag(false)
      })
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
      navigate('/')

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
    navigate('/')
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

  const linkPadding = {
    padding: 5
  }

  return (
    <div>

      <div>
        <Link style={linkPadding} to="/how-to-use">USAGE GUIDE</Link>
        <Link style={linkPadding} to="/">BLOGS</Link>
        {user && (
          <button onClick={handleLogOff}>Log Out</button>
        )}
        {user && (
          <span style={linkPadding} to=''>| {user.name ?? user.username} is logged in.</span>
        )}
        <Link style={linkPadding} to='/login'> {!user && (
          <>LOGIN</>
        )}</Link>
      </div>

      <h1>blogs</h1>

      <Notification message={notifyMessage} success={notifyFlag} />

      <Routes>
        <Route path='/how-to-use' element={<About />} />
        <Route path='/' element={
          <FilterBlogs blogs={blogs} user={user} updateBlogLikes={updateBlogLikes} removeBlog={removeBlog} />}/>
        <Route path='/login' element={<LoginForm handleLogin={handleLogin} />} />
      </Routes>


    </div>
  )
}

export default App