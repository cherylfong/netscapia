const Person = ({ person, toggleRemove }) => {
  return <li className='person'>{person.name} {person.number}
  <button onClick={toggleRemove}>delete</button>
  </li>
}

export default Person