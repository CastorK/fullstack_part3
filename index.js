const express = require('express')
const app = express()

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

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  const amountStr = `Phonebook has info for ${persons.length} people`
  const dateStr = new Date()
  res.send(`<p>${amountStr}</p><p>${dateStr}</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})