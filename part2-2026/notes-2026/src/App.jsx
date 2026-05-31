// to save notes in App component's state
import { useState } from 'react'

import Note from './components/Note'


// remove props param and replace props.notes with [] empty array 
// if want to start with not using notes array from
// main.jsx
const App = (props) => {
  const [notes, setNotes] = useState(props.notes)

  console.log(notes) // notes as an array extracted from note object
  console.log(props) // note object from main.jsx

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
   </div>
  )
}

export default App