import personService from '../services/persons.js'

const PersonForm = ( {persons, setPersons, newName, setNewName, newNumber, setNewNumber} ) => {
  // prevent any identical names in phonebook
  const addNewPerson = (event) => {
    event.preventDefault() // IMPORTANT: to prevent the form from refreshing before we can do actions
    if (persons.some( person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        // create shallow copy and update state
        const changedPerson = {...persons.find(person => person.name === newName), number: newNumber}
        personService
          .updateObj(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === changedPerson.id ? returnedPerson : person))
          })
      } else {
        console.log("User decided not to replace old number")
      } 
    } else {
      // add new name and phone number to phonebook list
      const nameObject = {
        name: newName,
        number: newNumber,
      }
      personService.create(nameObject)
      .then(returnedObject => {
        setPersons(persons.concat(returnedObject))
        setNewName('')
        setNewNumber('')
      })
    }
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
