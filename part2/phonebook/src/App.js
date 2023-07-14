/**
 * 2.6 Create a simple phone book. Only allow adding names.
 * 
 * 2.7 Prevent adding existing names in phone book.
 * 
 * 2.8 Allow adding phone numbers associated with the names.
 */

import logo from './logo.svg';
import './App.css';

import { useState } from 'react'

import Entry from "./components/Entry"
import People from "./components/People"

function App(props) {

  const [persons, setPersons] = useState(props.persons) 
  
  const [newName, setNewName] = useState('Add Name Here')

  const [newNumber, setNewNumber] = useState('Add Number Here')

  return (
    <div>
      <h1>Phone Book</h1>
      <Entry persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
      <People people={persons}/>
    </div>
  )
}

export default App
