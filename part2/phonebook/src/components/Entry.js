/**
 * Adds an entry to the Phone book
 */
const Entry = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {

    const addEntry = (event) => {

        event.preventDefault();
        
        console.log('Triggered event source: ', event.target)

        if( isExists(newName, persons) ){
            alert(`${newName} is already added.`)
        } else {
            
      
        const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
        }

        setPersons(persons.concat(personObject))
        setNewName('Ready to save a new person!')
        }
    }

    const handleNewName = (event) => {
        setNewName(event.target.value)
        console.log('Triggered event source value: ', event.target.value)
    }

    const handleNewNumber = (event) => {
        setNewNumber(event.target.value)
        console.log('Triggered event source value: ', event.target.value)
    }

    return(
        <>
            <form onSubmit={addEntry}>
                <label>Name</label><br/>
                <input value={newName} onChange={handleNewName}/><br/>
                <input value={newNumber} onChange={handleNewNumber}/><br/>
                <button type="submit">Add</button>
            </form>
        </>
    )
}

function isExists(newName, persons) {

    const namesOnly = persons.map(person => person.name)

    return namesOnly.includes(newName)

}

export default Entry