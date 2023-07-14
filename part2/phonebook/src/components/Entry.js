/**
 * Adds an entry to the Phone book
 */
const Entry = ({persons, setPersons, newName, setNewName}) => {

    const addEntry = (event) => {

        event.preventDefault();
        
        console.log('Triggered event source: ', event.target)
    
        const personObject = {
        name: newName,
        }

        setPersons(persons.concat(personObject))
        setNewName('Ready to save a new person!')
    }

    const handleNewName = (event) => {
        setNewName(event.target.value)
        console.log('Triggered event source value: ', event.target.value)
    }

    return(
        <>
            <form onSubmit={addEntry}>
                <label>Name</label><br/>
                <input value={newName} onChange={handleNewName}/>
                <button type="submit">Add</button>
            </form>
        </>
    )
}

export default Entry