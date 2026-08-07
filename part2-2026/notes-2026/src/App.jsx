// to save component states
import { useState, useEffect } from 'react'
import axios from 'axios' 

import Note from './components/Note'

import noteService from './services/notes'

// remove props param and replace props.notes with [] empty array 
// if want to start with not using notes array from
// main.jsx
const App = (props) => {
  const [notes, setNotes] = useState([])

  const [newNote, setNewNote] = useState(
    'a new note...'
  )

  const [showAll, setShowAll] = useState(true)


  //console.log(notes) // notes as an array extracted from note object
  //console.log(props) // note object from main.jsx


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
      id: String(notes.length + 1),
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

    const url = `http://localhost:3001/notes/${id}`
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
    .catch(error => {
      alert(
        `the note '${note.content}' was already deleted from server`
      )
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


  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
   </div>
  )
}

export default App