import { useState, useEffect } from 'react'
import personService from './services/persons.js'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPerson, setFilterPerson] = useState('')

  // use external web api to fetch data from json server to get initial values for persons
  useEffect( () => {
    personService
      .getAll()
      .then(returnedPersons => setPersons(returnedPersons))
  }, [])

  // delete person from json server, reason why we set function on app is because we want to set state for persons
  const deletePerson = id => {
    // confirm on whether to delete person
    if (!(window.confirm("Delete this person?"))) {
      return
    }
      
    personService
      .deleteObject(id)
      .then( response => {
        const personObj = response.data
        setPersons( persons.filter(person => person.id !== personObj.id))
      })
 }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filterPerson={filterPerson} setFilterPerson={setFilterPerson}/>
      <h3>Add New</h3>
        <PersonForm 
          persons={persons}
          setPersons={setPersons}
          newName={newName}
          setNewName={setNewName}
          newNumber={newNumber}
          setNewNumber={setNewNumber}
        /> 
      <h3>Numbers</h3>
      <Persons filterPerson={filterPerson} persons={persons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
