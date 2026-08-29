import { useState } from 'react'
import { Link } from 'react-router-dom'

const NoteList = ({ notes }) => {

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
        {notesToShow.map(note => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.content}</Link>
          </li>
        ))}
      </ul>

    </div>
  )

}

export default NoteList