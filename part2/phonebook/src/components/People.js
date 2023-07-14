/**
 * Displays people on the phone book.
 */
const People = ({people}) => {

console.log("People ?",people)
  return (
      <>
          <h1>Numbers</h1>
          <Person people={people} />
      </>
  )
}


/**
 * Displays one person from the phone book
 */
const Person = ({people}) => {

    return (
        <>
            { people.map(
               ( person, i )=> 
                <p key={i}>{person.name}</p>
            )}
        </>
    )
}

export default People;
