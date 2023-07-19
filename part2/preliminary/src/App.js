import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = (props) => {

  // props in the App parameter is from index.js
  // 
  // this is a destructuring syntax
  // similar to:
  // const notes = props.notes
  // const { notes } = props

  // no longer retrieving data from index.js
  // const [notes, setNotes] = useState(props.notes)

  const [notes, setNotes] = useState([])

  const [newNote, setNewNote] = useState('Save a new note?')
  const [isShowAll, setShowAll] = useState(true)


  useEffect(() => {
    console.log("Use effect")
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])

  // a call to a state-updating function triggers the re-rendering of the component.
  // this log print will be called again after data is fetched from server
  console.log('Render', notes.length, 'notes')

  // alternatively

  /* const hook = () => {
      console.log('effect')
      axios
        .get('http://localhost:3001/notes')
        .then(response => {
          console.log('promise fulfilled')
          setNotes(response.data)
        })

    useEffect(hook, [])

    } 


    useEffect(() => {
    
      console.log('effect')

      const eventHandler = response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      }

      const promise = axios.get('http://localhost:3001/notes')
      promise.then(eventHandler)

    }, [])
    
  */

  // creates a new note Object and adds it to the notes array
  const addNote = (event) => {

    event.preventDefault() // e.g. prevents page from reloading

    console.log('Triggered event source: ', event.target)

    const noteObject = {
      content: newNote,
      // 50% chance for importance either true or false
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    setNotes(notes.concat(noteObject))
    setNewNote('Ready to save another note!')
  }

  // changes the input value of the form and updates newNote content state
  const handleNewNote = (event) => {
    // does not have default actions that occur
    setNewNote(event.target.value)
    console.log('Triggered event source value: ', event.target.value)
  }

  // an array of notes
  // if showAll is true, then return all notes
  // otherwise, return notes with important attribute set to true
  //
  // "===" operator is redundant
  const notesToShow = isShowAll ? notes : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>

      {/* Alternatives for the same component */}

      {/* <ul>
        {notes.map(note =>
          <li>
            key={note.content}
          </li>
        )} */}

      {/* 
        <ul>
         {notes.map( note =>
            <li key={note.id}>
              {note.content}
            </li>
         )}
      
      */}

      {/* <ul>
        {notes.map((note, i) =>
          <li key={i}>
            {note.content}
          </li>
        )} 
      */}

      <ul>
        {notes.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>


      {/* value is the place holder and needs onChange to make edits to the form field i.e. value's content */}

      {/* onChange is called each time when change occurs! */}
      <form onSubmit={addNote}>
        <input value={newNote}
          onChange={handleNewNote}
        />
        <button type='submit'>SAVE</button>
      </form>


      <h1>Filtered Note list</h1>
      <button onClick={() => setShowAll(!isShowAll)}>
        Show {isShowAll ? "important notes?" : "all notes?"}
      </button>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>

    </div>
  )
}

const Note = ({ note }) => {
  return (
    <li>{note.content}</li>
  )
}

export default App
