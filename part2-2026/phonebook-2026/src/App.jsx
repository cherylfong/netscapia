import { useState } from 'react'

import Persons from './components/Persons'

const App = () => {

    const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])

    const [newName, setNewName] = useState('')

    const [newNumber, setNewNumber] = useState('')

    const [newFilter, setNewFilter] = useState('')

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

    const handleFilterChange = (event) => {
        console.log(event.target.value)
        setNewFilter(event.target.value)
    }

    const filterText = newFilter.trim().toLowerCase()
    const personsToShow = persons.filter( p =>
        p.name.toLowerCase().includes(filterText)
    )


    return (
        <div>
            <h1>Phonebook</h1>
            <div>
                filter shown with <input value={newFilter} onChange={handleFilterChange}/>
            </div>
            <h2>add a new</h2>
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
                <Persons persons={personsToShow} />
            </ul>
        </div>
    )
}

export default App