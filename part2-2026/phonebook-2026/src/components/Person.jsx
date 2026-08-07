const Person = ({ person, toggleRemove }) => {
  return <li>{person.name} {person.number}
  <button onClick={toggleRemove}>delete</button>
  </li>
}

export default Person