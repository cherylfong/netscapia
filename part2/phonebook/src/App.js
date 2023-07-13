import logo from './logo.svg';
import './App.css';

import { useState } from 'react'

function App() {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  return (
    <div className="App">
      <header className="App-header">
      </header>


    </div>
  );
}

export default App;
