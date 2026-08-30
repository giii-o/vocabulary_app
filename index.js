const express = require('express')
const cors = require('cors')
const Word = require('./models/word')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('./dist'))

app.get('/words', (req , res) => {
    Word.find({}).then(result => {
      res.json(result)
    })
})

const IdGenerator = () => {
    const maxId = words.length
    let newId = maxId + 1
    return newId
}

app.post('/words', (req , res) => {
    let req_word = req.body
    if(!req_word.word || !req_word.type){
        return res.status(400).end()
    }

    const word = new Word({
      word: req_word.word,
      type: req_word.type,
      meaning: req_word.meaning,
      synonyms: req_word.synonyms
    })

    word.save().then(result => {
      console.log(result)
      res.json(result)
    })
})

const port = process.env.PORT
app.listen(port)
console.log("Server is running at", port)
