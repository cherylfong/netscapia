/**
 * Displays people on the phone book.
 */
const People = ({people}) => {

  return (
      <>
          <h1>Numbers</h1>
          <Person people={people} />
      </>
  )
}


/**
 * Displays one person and their number from the phone book
 */
const Person = ({people}) => {

    return (
        <>
            { people.map(
               ( person, i )=> 
                <p key={i}>{i}. {person.name} {person.number}</p>
            )}
        </>
    )
}

export default People;
