const mongoose = require('mongoose')
require('dotenv').config()

const password = process.argv[2]
const url = process.env.MONGODB_URI

mongoose.connect(url , { family: 4 })
.then( result => console.log('connection succesfull!'))
.catch( err => console.log('There was an error with connecting.', err.message ))

const wordSchema = new mongoose.Schema({
    word: String,
    meaning: String,
    type: String,
    synonyms: Array
})

wordSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Word", wordSchema)