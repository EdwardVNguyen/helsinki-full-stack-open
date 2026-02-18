const Persons = ( {filterPerson, persons, deletePerson} ) => {
   // filter person by name
  const filteredPersons = (filterPerson === '')
      ? persons
      : persons.filter(person => person.name.toLowerCase().includes(filterPerson))

  return (
    <ul>
      {filteredPersons.map(person => 
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={ () => deletePerson(person.id) }>Delete</button> {/* important to make it a callback function! or infinite recursion*/}
        </li>
      )}
    </ul>

  )
}

export default Persons
