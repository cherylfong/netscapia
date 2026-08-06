import { useState } from 'react'

import Person from './components/Person'

const App = () => {

    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-1234567'
         }
    ])

    const [newName, setNewName] = useState('')

    const [newNumber, setNewNumber] = useState('')

    const addEntry = (event) => {
        event.preventDefault() // prevents form submission

        const trimmedName = newName.trim()
        const trimmedNumber = newNumber.trim()

        // prevent empty submissions
        if (trimmedName === '') {
            alert('Please enter a name')
            return
        }

        // check if name already exists (case-insensitive)
        if (persons.some(person => person.name.toLowerCase() === trimmedName.toLowerCase())) {
            alert(`${trimmedName} is already added to phonebook`)
            return
        }

        const personObject = {
            name: trimmedName,
            number: trimmedNumber
        }

        setPersons(persons.concat(personObject))
        setNewName('') // clear input field
        setNewNumber('')

        console.log('button clicked !!!', event.target)
    }



    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addEntry}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number: <input value={newNumber}
                    onChange={handleNumberChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map(person =>
                    <Person key={person.id} person={person} />
                )}
            </ul>
        </div>
    )
}

export default App