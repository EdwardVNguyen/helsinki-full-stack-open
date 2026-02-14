import { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phoneNumber: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phoneNumber: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phoneNumber: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filterPerson, setFilterPerson] = useState('')
  
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
          newPhoneNumber={newPhoneNumber}
          setNewPhoneNumber={setNewPhoneNumber}
        /> 
      <h3>Numbers</h3>
      <Persons filterPerson={filterPerson} persons={persons} />
    </div>
  )
}

export default App
