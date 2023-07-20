/*
 * Allows deleting entries
 *
 * persons - the array of person resources 
 */
import Person from "./Person"

const Remove = ({persons, setPersons}) => {

    const handleRemove = id => {
        console.log("REMOVE ME")
    }

    return(
        <>
        {
            persons.map( (person,i) =>
                <Person.PersonWithDelete key={i} person={person} handleRemove={handleRemove}/>
            )
        }
        </>
    )


}





export default Remove