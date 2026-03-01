const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())

// Morgan logs request body
morgan.token('body', function (req) { 
  // to filter out id, destructure req.body into id, and the rest of the other paramters into one object
  const { id, ...rest } = req.body
  return JSON.stringify(rest)} 
)

app.use(
  morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req)
  ].join(' ')
  })
)

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

// get all entries
app.get('/api/persons', (request, response) => {
  // response sends back to the web page phonebook as a javascript object
  response.json(phonebook)
})

app.get('/info', (request, response) => {
  response.send(`
    <p>
      Phonebook has info for ${phonebook.length} people 
    </p>
    <p>
      ${new Date()}
    </p>
  `)
})

// get single entry
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const personEntry = phonebook.find( person => person.id === id )

  if (personEntry) {
    response.json(personEntry)
  } else {
    // 404 - server cannot locate requested resource
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  phonebook = phonebook.filter( person => person.id !== id)

  // 204 - request has been successfully fullfilled, but no content will be send back to response
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const person = request.body // json-parser converts json from request to JS object

  if (!person.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }
  if (!person.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  if (phonebook.find(p => p.name === person.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  person.id = String(Math.random() * 10000000)

  phonebook = phonebook.concat(person)
  response.json(person)
})

// define a port and let express run backend code on given port
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
