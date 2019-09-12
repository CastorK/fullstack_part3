const mongoose = require('mongoose')
require('dotenv').config()

if ( process.argv.length < 3 ) {
  console.log('Give the following arguments: password [name number]')
  process.exit(1)
}

const password = process.env.DB_URL_PASSWORD

const url = `mongodb+srv://fullstack:${password}@fullstackcluster-vkqi8.mongodb.net/test?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true })

const contactSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length >= 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const contact = new Contact({
    name: name,
    number: number
  })

  contact.save().then(
    console.log(`Added ${name} (${number}) to phonebook!`),
    mongoose.connection.close()
  )
} else {
  Contact.find({}).then( resp => {
    console.log('Phonebook:')
    resp.map( entry => console.log(`${entry.name} ${entry.number}`) )
    mongoose.connection.close()
  })
}