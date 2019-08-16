const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')



app.use(bodyParser.json())
app.use(morgan(function (tokens, req, res) {
  var result =  [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ]

  if (tokens.method(req,res) === 'POST') {
    result.push(JSON.stringify(req.body))
  }

  return result.join(' ')
}))
app.use(cors())

let persons = [
  {
    "name": "Ada Lovelace",
    "number": "39-44-53235323",
    "id": 1
  },
  {
    "name": "Martti Tienari",
    "number": "123",
    "id": 2
  },
  {
    "name": "Arto Järvinen",
    "number": "040-123456",
    "id": 3
  },
  {
    "name": "Lea Kutvonen",
    "number": "040-123456",
    "id": 4
  }
]

const generateId = () => {
  const existingIds = [...persons.map( x => x.id )]
  let newId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
  while (existingIds.indexOf(newId) >= 0) {
    newId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
  }
  return newId
}

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.post('/api/persons', (req, res) => {
  const newPerson = Object.assign({}, req.body)
  const requestIsOk = newPerson.name && newPerson.number && [...persons.map( x => x.name )].indexOf(newPerson.name) < 0
  if (!newPerson.name) {
    return res.status(400).json({ 
      error: 'Name missing from request' 
    })
  } else if (!newPerson.number) {
    return res.status(400).json({ 
      error: 'Number missing from request' 
    })
  } else if ([...persons.map( x => x.name )].indexOf(newPerson.name) >= 0) {
    return res.status(400).json({ 
      error: 'Name must be unique' 
    })
  }
  newPerson.id = generateId()
  persons.push(newPerson)
  res.json(newPerson)
})

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(p => p.id === Number(req.params.id))
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  persons = persons.filter(p => p.id !== Number(req.params.id))
  res.status(204).end()
})

app.get('/info', (req, res) => {
  const amountStr = `Phonebook has info for ${persons.length} people`
  const dateStr = new Date()
  res.send(`<p>${amountStr}</p><p>${dateStr}</p>`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})