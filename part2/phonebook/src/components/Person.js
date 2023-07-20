/**
 * Displays one person and their number from the phone book
 */
const Person = ({ person }) => {

    return (
        <>
            <p>{person.id}. {person.name} {person.number}</p>
        </>
    )
}

/**
 * Person Component but with a delete button
 */
const PersonWithDelete = ({person, handleRemove}) => {

    return(
        <>
            <p>{person.id}. {person.name} {person.number} <button onClick={ () => handleRemove(person.id) }>delete</button></p>
        </>
    )

}


export default { Person, PersonWithDelete }
