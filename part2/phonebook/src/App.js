/**
 * 2.6 Create a simple phone book. Only allow adding names.
 */

import logo from './logo.svg';
import './App.css';

import { useState } from 'react'

import Entry from "./components/Entry"
import People from "./components/People"

function App(props) {

  const [persons, setPersons] = useState(props.persons) 
  
  const [newName, setNewName] = useState('Add Name Here')

  return (
    <div>
      <h1>Phone Book</h1>
      <Entry persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName}/>
      <People people={persons}/>
    </div>
  );
}

export default App;
