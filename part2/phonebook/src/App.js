/**
 * 2.6 Create a simple phone book. Only allow adding names.
 * 
 * 2.7 Prevent adding existing names in phone book.
 * 
 * 2.8 Allow adding phone numbers associated with the names.
 * 
 * 2.9 Implement a search field that can be used to filter the list of people by name.
 * 
 * 2.10 Refractor components into separate component files and place into ./component .
 * 
 * 2.11 Add db.json file to project. Modify the application such that the initial state of the data is fetched from the server using the axios-library. Complete the fetching with an Effect hook.
 * 
 * 2.12 Save entry as resources onto the server.
 * 
 * 2.13 Separate backend communication into its own module.
 * 
 * 2.14 Allow deleting entries and confirm action through window.confirm prompt.
 * 
 * 2.15 Allow replacing an existing number in an entry and prompt to confirm using window.confirm.
 * 
 * 2.16 Add a notification message that times out after 5 seconds when an entry is added or modified.
 * 
 * 2.17 Add a notification error message when attempting to change or delete an entry.
 */

import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react'

import Entry from "./components/Entry"
import Filter from "./components/Filter"
import EntryService from './service/EntryService';
import Remove from './components/Remove';
import Notification from './components/Notification'

function App(props) {

  // no longer retrieving data from index.js
  // const [persons, setPersons] = useState(props.persons) 

  const [persons, setPersons] = useState([]) 
  
  const [newName, setNewName] = useState('Add Name Here')

  const [newNumber, setNewNumber] = useState('Add Number Here')

  const [newSearch, setNewSearch] = useState("")

  const [errorMessage, setErrorMessage] = useState(null)

  const [isError, setError] = useState(false)

  useEffect(() => {
    EntryService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])

  return (
    <div>
      <h1>Phone Book</h1>
      <Notification message={errorMessage} isError={isError}/>
      <Filter newSearch={newSearch} setNewSearch={setNewSearch} persons={persons}/>
      <h2>Add Person</h2>
      <Entry persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} setErrorMessage={setErrorMessage} setError={setError}/>
      <h2>{`Entire List ↔️ #${persons.length}`}</h2>
      <Remove persons={persons} setPersons={setPersons} setErrorMessage={setErrorMessage} setError={setError}/>
    </div>
  )
}

export default App
