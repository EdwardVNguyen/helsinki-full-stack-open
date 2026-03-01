const express = require('express')
const app = express()

let phonebook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
  // resonse sends back to the web page phonebook as a javascript object
  response.json(phonebook)
})

// define a port and let express run backend code on given port
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
