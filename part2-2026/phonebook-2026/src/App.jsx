import { useState, useEffect } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

import phonebookService from './services/phonebook'

const App = () => {

    const [persons, setPersons] = useState([])

    const [newName, setNewName] = useState('')

    const [newNumber, setNewNumber] = useState('')

    const [newFilter, setNewFilter] = useState('')

    const [notifyMessage, setNotifyMessage] = useState(null)

    const [successFlag, setSuccessFlag] = useState(true)

    useEffect(() => {
        phonebookService
            .getAll('http://localhost:3001/persons')
            .then(initialPhonebook => {
                console.log('promise fulfilled')
                setPersons(initialPhonebook)
            })
    }, [])

    const addEntry = (event) => {
        event.preventDefault() // prevents form submission

        const trimmedName = newName.trim()
        const trimmedNumber = newNumber.trim()

        // prevent empty submissions
        if (trimmedName === '') {
            alert('Please enter a name')
            return
        }

        const existingPerson = persons.find(p => p.name.toLowerCase() === trimmedName.toLowerCase())

        // check if name already exists (case-insensitive)
        if (existingPerson) {
            if (confirm(`${trimmedName} is already added to phonebook, replace the old number with a new one?`)) {
                const changedPerson = {
                    ...existingPerson,
                    number: trimmedNumber
                }

                phonebookService
                    .update(existingPerson.id, changedPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(p =>
                            p.id === existingPerson.id ? returnedPerson : p
                        ))

                        setNotifyMessage(
                            `UPDATED: ${changedPerson.name} is now ${changedPerson.number}`
                        )
                    }).catch(error => {
                        console.log(error.response.data.error)
                        setNotifyMessage(`ERROR: ${error.response.data.error}`)
                        setSuccessFlag(false)
                    })
                    .finally(resetNotification)

            }
            return
        }

        const personObject = {
            name: trimmedName,
            number: trimmedNumber,
            id: Date.now()
        }

        phonebookService
            .create(personObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName('') // clear input field
                setNewNumber('')
                setNotifyMessage(
                    `ADDED: ${returnedPerson.name} has the number ${returnedPerson.number}`
                )
            }).catch(error => {
                console.log(error.response.data.error)
                setNotifyMessage(`ERROR: ${error.response.data.error}`)
                setSuccessFlag(false)
            })
            .finally(resetNotification)

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
    const personsToShow = persons.filter(p =>
        p.name.toLowerCase().includes(filterText)
    )

    const toggleRemoval = (id, name) => {
        if (!window.confirm(`Delete ${name}?`)) {
            return
        }

        phonebookService
            .remove(id)
            .then(() => {
                // server-side delete succeeded
            })
            .catch(error => {
                console.error('Failed to delete person:', error)
                setNotifyMessage(
                    `WARNING: ${name} already deleted.`
                )
                setSuccessFlag(false)
                resetNotification()
            })
            .then(() => {
                // runs both after success and after the catch above
                setPersons(persons.filter(p => p.id !== id))
            })
    }

    const resetNotification = () => {
        setTimeout(() => {
            setNotifyMessage(null)
            setSuccessFlag(true)
        }, 5000)
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={notifyMessage} success={successFlag} />
            <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
            <h2>add a new</h2>
            <PersonForm
                addEntry={addEntry}
                newName={newName}
                newNumber={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <ul>
                <Persons persons={personsToShow} toggleRemove={toggleRemoval} />
            </ul>
        </div>
    )
}

export default App