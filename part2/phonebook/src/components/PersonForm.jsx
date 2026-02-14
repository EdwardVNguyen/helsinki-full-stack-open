const PersonForm = ( {persons, setPersons, newName, setNewName, newPhoneNumber, setNewPhoneNumber} ) => {
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
      phoneNumber: newPhoneNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewPhoneNumber('')
  }

  // handler functions for name and phone number
  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNewPhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  // form with name and phone number inputs
  return (
    <form onSubmit={addNewPerson}>
        <div>
          Name: <input value={newName} onChange={handleNewNameChange} />
        </div>
        <div>
          Number: <input value={newPhoneNumber} onChange={handleNewPhoneNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

export default PersonForm
