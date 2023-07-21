import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
// import axios from 'axios'
import noteService from './services/notes'

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

  const [errorMessage, setErrorMessage] = useState(null)

  /* 
  useEffect(() => {
    console.log("Use effect")

    axios
      .get('http://localhost:3001/notes')
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  */

  // After module refactor

  /* 
  useEffect(() => {
    console.log("Use effect")
    noteService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  
  */

  // After promise chaining refactor:
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
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
    //
    // let the server handle adding IDs
    // id: notes.length + 1,
  }

  // Save object to server
  // automatic as JSON format since data sent is a JavaScript object

  /* 
  axios
    .post("http://localhost:3001/notes", noteObject)
    .create(noteObject)
    .then(response => {
      console.log(response)
      // this is still required to render in the front end
      // this updates the application state! 
      // or use response.data instead of noteObject in parameter for setNotes
      setNotes(notes.concat(noteObject))
      setNewNote('Ready to save another note!')
    })

  */

  // After module refactor:

  /* 
  noteService
    .create(noteObject)
    .then(response => {
      console.log(response)
      setNotes(notes.concat(noteObject))
      setNewNote('Ready to save another note!')
    })
  */

  // After promise chaining refactor:

  noteService
    .create(noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('Ready to save another note!')
    })
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

// Change note importance
const toggleImportance = (id) => {

  console.log(`Change importance NOTE # ${id}`)

  // get copy from server
  const url = `http://localhost:3001/notes/${id}`

  // get copy from front-end app
  // == is comparing object reference
  const note = notes.find(n => n.id === id)

  const label = note.important
  ? "NOT important" : "IMPORTANT" 

  setErrorMessage(
    `Importance for '${note.content}' set to ${label}`
  )
  setTimeout(() => {
    setErrorMessage(null)
  }, 5000)

  // make the changes
  // ... object spread syntax to create a copy
  //
  // This is a shallow copy: objects are references to origin copy
  //
  // DO NOT MUTATE REACT STATE DIRECTLY
  // i.e. for setNotes()
  const changedNote = { ...note, important: !note.important }


  // update in server and front-end

  /* 
  axios
    .put(url, changedNote)
    .update(id, changedNote)
    .then(response => {

      console.log("Data response:", response.data)
      // if the id number is does not match then keep note the same
      // otherwise update with response data
      setNotes(notes.map(n => n.id !== id ? n : response.data))
    })
  */

  // After module refactor:

  /* 
  noteService
    .update(id, changedNote)
    .then(response => {
      console.log("Data response:", response.data)
      setNotes(notes.map(n => n.id !== id ? n : response.data))
    })
  */

  // After promise chaining refactor:

  noteService
    .update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {
      alert(
        `The note: '${note.content}' was already deleted from server!`
      )
      setErrorMessage(
        `Note '${note.content}' was already removed from server!`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      // set notes state without the deleted note
      setNotes(notes.filter(n => n.id !== id))
    })

}

return (
  <div>
    <h1>Notes</h1>

    <Notification message={errorMessage} />

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
        <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)} />
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
        <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)} />
      )}
    </ul>
    <Footer />

  </div>
)
}

const Note = ({ note, toggleImportance }) => {

  const label = note.important
    ? "🍓" : "Mark important!"

  return (
    <li className='note'><button onClick={toggleImportance}>{label}</button> {note.content}
    </li>
  )
}

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const Footer = () => {
  const footerStyle = {
      color: 'pink',
      fontStyle: 'italic',
      fontSize: 16,
  }
  return (
      <div style={footerStyle}>
          <br />
          <em>🫐Strawberry Notes🫐</em>
      </div>
  )
}

export default App
