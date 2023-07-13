import logo from './logo.svg';
import './App.css';

const App = (props) => {
  
  // props in the App parameter is from index.js
  // 
  // this is a destructuring syntax
  // similar to:
  // const notes = props.notes
  const { notes } = props

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
        { notes.map(note =>
          <Note key={note.id} note={note}/>
        )}
      </ul>
    </div>
  )
}

const Note = ({note}) => {
  return(
    <li>{note.content}</li>
  )
}

export default App
