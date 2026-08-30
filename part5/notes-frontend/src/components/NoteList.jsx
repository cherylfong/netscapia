import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material'

const NoteList = ({ notes }) => {

  const [showAll, setShowAll] = useState(true)


  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true) //comparison operator is redundant)


  return (

    <div>
      <div>
        <Button variant='outlined' style={{ marginTop: 10 }} onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </Button>
      </div>
      {/* <ul>
        {notesToShow.map(note => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.content}</Link>
          </li>
        ))}
      </ul> */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>content</TableCell>
              <TableCell>user</TableCell>
              <TableCell>important</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notesToShow.map(note => (
              <TableRow key={note.id}>
                <TableCell>
                  <Link to={`/notes/${note.id}`}>
                    {note.content}
                  </Link>
                </TableCell>
                <TableCell>
                  {note.user?.name}
                </TableCell>
                <TableCell>
                  {note.important ? 'yes': ''}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


    </div>
  )

}

export default NoteList