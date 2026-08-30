// to save component states
import { useState, useEffect, useRef } from 'react'
import { Container, Button, AppBar, Toolbar } from '@mui/material'

import {
  BrowserRouter as Router,
  Routes, Route, Link,
  useMatch
} from 'react-router-dom'

import NoteList from './components/NoteList'
import Home from './components/Home'


import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'

import noteService from './services/notes'
import loginService from './services/login'

// remove props param and replace props.notes with [] empty array
// if want to start with not using notes array from
// main.jsx
const App = () => {
  const [notes, setNotes] = useState([])

  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const noteFormRef = useRef(null)

  // Effects  hook:
  // Lets a component connect to and synchronize with external systems.
  // This includes dealing with network, browser DOM, animations,
  // widgets written using a different UI library, and other non-React code.
  useEffect(() => {
    console.log('effect')
    // storing the promise object in a variable is generally unnecessary
    //
    // const promise = axios.get('http://localhost:3001/notes')
    // console.log(promise)
    //
    // promise.then(response => {
    //   console.log("Registered event handler triggered: ")
    //   console.log(response)
    // })
    //
    // Chain like this instead:
    noteService
      .getAll('http://localhost:3001/notes')
      .then(initialNotes => {
        console.log('promise fulfilled')
        setNotes(initialNotes)
      })
  }, [])

  // check to see if user was logged on before
  // save user key value to application state
  // so user does not have to login again
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      // key values are stored as JSON strings (so convert to JSON object)
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])
  // effect is executed only when the component is rendered for the first time.

  // NOTICE that the webpage is rendered first before fetching from URL
  // once fetched
  // App component is rendered again
  console.log('render', notes.length, 'notes')

  // this event handler is called when the form is submitted
  const createNote = (noteObject) => {

    // hides the note form after submit button is clicked
    noteFormRef.current.toggleVisibility()

    noteService
      .create(noteObject)
      .then(returnedNote => {
        console.log('POSTED !!! ')
        console.log(returnedNote)
        setNotes(notes.concat(returnedNote)) // THIS DOES NOT MUTATE ORIGINAL notes ARRAY -- append new object to notes
      })

    console.log('button clicked !!!', event.target)
  }


  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} needs to be toggled`)

    const note = notes.find(n => n.id === id)

    // object spread syntax:
    // must make a new Note object because:
    // If using the variable note, it is a reference to an item in the notes array
    // in the component's state,
    // and as we recall we must never mutate state directly in React.
    //
    // changedNote is a shallow copy of note
    // if note contains object references then changedNote
    // will have copies of references (not new objects)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
        // If the condition is false, then copy the item from the old array into the new array
        // response.data contains the changedNote
        setErrorMessage(
          {
            text: `Note '${note.content}' is set to ${(note.important ? 'not important' : 'important')}`,
            type: 'success'
          }
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(() => {
        // alert(
        //   `the note '${note.content}' was already deleted from server`
        // )
        setErrorMessage(
          {
            text: `Note '${note.content}' was already removed from server`,
            type: 'error'
          }
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }




  const handleLogin = async (username, password, setUsername, setPassword) => {

    // event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      // save user's logged in username to browser key-value database
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      noteService.setToken(user.token)

      setUser(user)

      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage(
        {
          text: 'wrong credentials',
          type: 'error'
        }
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOff = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const loginForm = () => (

    <Togglable buttonLabel='Welcome! Want to Login?'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />
    </Togglable>

  )


  const noteForm = () => {

    if (!user) {
      return (
        <p><a href='/login'>Login</a> to add a new note.</p>
      )
    } else {
      return (
        <Togglable buttonLabel="Create a new note?" ref={noteFormRef}>
          <NoteForm
            createNote={createNote}
          />
        </Togglable>
      )
    }

  }

  const deleteNote = (id) => {
    noteService.remove(id).then(() => {
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const match = useMatch('/notes/:id')
  const note = match
    ? notes.find(note => note.id === match.params.id)
    : null

  const styleToolBar = { '&:hover': { bgcolor: 'rgba(18, 136, 152, 0.51)' } }

  const styleAppBar = { bgcolor: 'rgba(5, 53, 27, 0.6)' }

  return (

    <Container>
      <h1>Notes</h1>

      <AppBar position="static" sx={styleAppBar}>
        <Toolbar>
          <Button color="inherit" component={Link} to="/" sx={styleToolBar}>HOME</Button>
          <Button color="inherit" component={Link} to="/notes" sx={styleToolBar}>NOTES</Button>
          <Button color="inherit" component={Link} to="/create" sx={styleToolBar}>ADD</Button>

          <Button color="inherit" component={Link} to="/login" sx={styleToolBar}> {!user && (
            <>LOGIN</>
          )}
          {user && (
            <>
              {user.name ?? user.username} is logged in.
            </>
          )}
          </Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<NoteList
          notes={notes}
          user={user}
          toggleImportanceOf={toggleImportanceOf} />}
        />
        <Route path="/create" element={noteForm()} />
        <Route path="/login" element={loginForm()} />
        <Route path="/notes/:id" element={
          <Note note={note}
            toggleImportanceOf={toggleImportanceOf}
            deleteNote={deleteNote} />
        } />
      </Routes>


      <div>
        <Notification notification={errorMessage} />

        {user && (
          <div>

            <Button onClick={handleLogOff} style={{ marginTop: 10 }}>
              Log Off
            </Button>
          </div>
        )}

        <Footer />
      </div>
    </Container>
  )
}

export default App