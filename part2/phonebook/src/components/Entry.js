/**
 * Adds an entry to the Phone book
 */
import EntryService from "../service/EntryService";

const Entry = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {

    const addEntry = (event) => {

        event.preventDefault();

        console.log('Triggered event source: ', event.target)

        if( isExists(newName, persons)) {
            // alert(`${newName} is already added.`)

            if( window.confirm(`${newName} is already added to the phonebook. Do you want to replace the existing number?`) ){

                console.log("Replace existing number.")

                let id = getPersonID(persons, newName)

                const personObject = {
                    name: newName,
                    number: newNumber,
                    // get the id of the last element plus 1
                    id: id
                }

                EntryService
                .update(id, personObject)
                .then(returnedPerson => {
                    setPersons(persons.map( person =>
                        person.id !== id ? person : returnedPerson
                    ))
                    setNewName('Ready to save a new person!')
                })

                
            }
           
        } else {
            
      
        const personObject = {
        name: newName,
        number: newNumber,
        // get the id of the last element plus 1
        id: idGenerator(persons)
        }

        console.log("Save to server!")

        //save to server
        EntryService
            .create(personObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName('Ready to save a new person!')
            })


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
                <label>Name: </label>
                <input value={newName} onChange={handleNewName}/><br/>
                <label>Number: </label>
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

function idGenerator(persons){

    let id = 0

    if( persons.length !== 0){

        id = persons[persons.length - 1].id + 1
    }

    return id
}
/**
 * Uses the name of the person resource to match object
 * returns the object's id value
 */
function getPersonID(persons, name){

    const personByName = persons.find(p => p.name === name)

    return personByName.id
}


export default Entry