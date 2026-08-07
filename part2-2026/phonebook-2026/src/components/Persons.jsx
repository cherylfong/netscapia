import Person from './Person'

const Persons = ({ persons, toggleRemove }) => {
  return (
    <>
      {persons.map(person => (
        <Person key={person.id} person={person} toggleRemove={() => toggleRemove(person.id, person.name)}/>
      ))}
    </>
  )
}

export default Persons