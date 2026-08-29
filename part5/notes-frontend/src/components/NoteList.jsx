import { useState } from 'react'
import Note from './Note'

const NoteList = ({ notes, toggleImportanceOf }) => {

  const [showAll, setShowAll] = useState(true)


  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true) //comparison operator is redundant)


  return (

    <div>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>

    </div>
  )

}

export default NoteList