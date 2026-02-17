const PersonForm = ( {persons, setPersons, newName, setNewName, newNumber, setNewNumber} ) => {
  // prevent any identical names in phonebook
  const addNewPerson = (event) => {
    if (persons.some( person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    } 

    // add new name and phone number to phonebook list
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: (persons.length + 1).toString()
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  // handler functions for name and phone number
  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNewPhoneNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // form with name and phone number inputs
  return (
    <form onSubmit={addNewPerson}>
        <div>
          Name: <input value={newName} onChange={handleNewNameChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNewPhoneNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

export default PersonForm
