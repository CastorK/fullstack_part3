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

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then( response => {res.json(response)}).catch( error => next(error) )
})

app.post('/api/persons', (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({error: 'Name missing from request'})
  } else if (!req.body.number) {
    return res.status(400).json({error: 'Number missing from request'})
  }
  
  Person
    .find({})
    .then( response => {
      if ([...response.map( x => x.name )].indexOf(req.body.name) >= 0) return res.status(400).json({error: 'Name must be unique'})
    })
    .catch( error => next(error) )

  new Person(req.body)
    .save()
    .then( response => { res.json(response) })
    .catch( error => next(error) )
})

app.get('/api/persons/:id', (req, res, next) => {
  Person
    .findById(req.params.id)
    .then( response => {
      if (!response) {
        res.status(404).send({error:`Person with id ${req.params.id} not found`})
      } else {
        res.json(response)
      }
    })
    .catch( error => next(error) )
})

app.put('/api/persons/:id', (req, res, next) => {
  Person
    .findByIdAndUpdate(req.params.id, { name: req.body.name, number: req.body.number })
    .then( response => {
      res.json(response)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id).then( response => { res.status(204).end() }).catch( error => next(error) )
})

app.get('/info', (req, res, next) => {
  Person.find({}).then( response => {
    const amountStr = `Phonebook has info for ${response.length} people`
    const dateStr = new Date()
    res.send(`<p>${amountStr}</p><p>${dateStr}</p>`)
  }).catch( error => next(error) )
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})