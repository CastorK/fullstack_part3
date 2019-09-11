const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const Person = require('./models/person');

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
app.use(express.static('build'))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then( response => {res.json(response)})
})

app.post('/api/persons', (req, res) => {
  const newPerson = Object.assign({}, req.body)

  if (!newPerson.name) {
    return res.status(400).json({ 
      error: 'Name missing from request' 
    })
  } else if (!newPerson.number) {
    return res.status(400).json({ 
      error: 'Number missing from request' 
    })
  }

  new Person(req.body).save().then( response => {
    res.json(response)
  })
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