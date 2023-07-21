/*
 * Allows deleting entries
 *
 * persons - the array of person resources 
 */
import Person from "./Person"
import EntryService from "../service/EntryService"

const Remove = ({persons, setPersons, setErrorMessage, setError}) => {

    const handleRemove = id => {

        const who = persons.find(p => p.id === id)

        if(window.confirm(`Do you want to delete ${who.name}?`)){

            console.log("REMOVE ME")
            EntryService
                .remove(id)
                .then(returnData => {

                    console.log("Remove status: ", returnData.statusText)

                    setPersons(persons.filter(p => p.id !== id))

                    setError(false)

                    setErrorMessage(
                        `Remove ${who.name} successful!`
                      )
                      setTimeout(() => {
                        setErrorMessage(null)
                      }, 5000)

                })
                .catch(error => {

                    console.log("ERROR: ", error)

                    setError(true)

                    setErrorMessage(
                        `${who.name} has already been removed!`
                      )
                      setTimeout(() => {
                        setErrorMessage(null)
                        setError(false)
                      }, 10000)
                    }
 
                )

        }

    }

    return(
        <>
        {
            persons.map( (person,i) =>
                <Person.PersonWithDelete key={i} person={person} handleRemove={ handleRemove }/>
            )
        }
        </>
    )


}

export default Remove