const Persons = ( {filterPerson, persons} ) => {
   // filter person by name
  const filteredPersons = (filterPerson === '')
      ? persons
      : persons.filter(person => person.name.toLowerCase().includes(filterPerson))

  return (
    <ul>
      {filteredPersons.map(person => <li key={person.id}>{person.name} {person.phoneNumber}</li>)}
    </ul>

  )
}

export default Persons
