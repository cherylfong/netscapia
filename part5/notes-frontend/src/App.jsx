// to save component states
import { useState, useEffect } from 'react'

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

  const [newNote, setNewNote] = useState(
    'a new note...'
  )

  const [showAll, setShowAll] = useState(true)

  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
  const addNote = (event) => {
    event.preventDefault() // prevents form submission

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        console.log("POSTED !!! ")
        console.log(returnedNote)
        setNotes(notes.concat(returnedNote)) // THIS DOES NOT MUTATE ORIGINAL notes ARRAY -- append new object to notes
        setNewNote('') // clear input field
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
      })
      .catch(() => {
        // alert(
        //   `the note '${note.content}' was already deleted from server`
        // )
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  // To enable editing of the input element, register an event handler that synchronizes the changes made to the input with the component's state:
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true) //comparison operator is redundant)

  const handleLogin = async event => {

    event.preventDefault()

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
      setErrorMessage('wrong credentials')
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

  const noteForm = () => (
    <Togglable buttonLabel="Create a new note?">
      <NoteForm
        onSubmit={addNote}
        value={newNote}
        handleChange={handleNoteChange}
      />
    </Togglable>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}

      {user && (
        <div>
          <p>{user.name ?? user.username} is logged in.</p>
          {noteForm()}
          <button onClick={handleLogOff}>Log Off</button>
        </div>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>

      <Footer />
    </div>
  )
}

export default App