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
 */

import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react'
import axios from 'axios'

import Entry from "./components/Entry"
import People from "./components/People"
import Filter from "./components/Filter"

function App(props) {

  // no longer retrieving data from index.js
  // const [persons, setPersons] = useState(props.persons) 

  const [persons, setPersons] = useState([]) 
  
  const [newName, setNewName] = useState('Add Name Here')

  const [newNumber, setNewNumber] = useState('Add Number Here')

  const [newSearch, setNewSearch] = useState("")


  useEffect(() => {
    console.log("Use effect")
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h1>Phone Book</h1>
      <Filter newSearch={newSearch} setNewSearch={setNewSearch} persons={persons}/>
      <h2>Add Person</h2>
      <Entry persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
      <h2>Entire List</h2>
      <People people={persons}/>
    </div>
  )
}

export default App
