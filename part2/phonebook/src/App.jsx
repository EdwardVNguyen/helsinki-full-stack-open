import { useState, useEffect } from 'react'
import axios from 'axios'

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
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])
  
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
      <Persons filterPerson={filterPerson} persons={persons} />
    </div>
  )
}

export default App
