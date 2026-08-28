const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

let words = [
    {
      id: "1",
      word: "serried",
      meaning: "something being packed tightly together",
      type: "adverb",
      synonyms: [
        "compressed",
        "dense",
        "crowded"
      ]
    },
    {
      id: "2",
      word: "date",
      meaning: "reference to the day of the month of the year / romantic event between intimate persons",
      type: "noun",
      synonyms: []
    },
    {
      id: "3",
      word: "toes",
      type: "noun",
      meaning: "part of the feet",
      synonyms: [
        "tick",
        "tack",
        "toe"
      ]
    },
    {
      id: "4",
      word: "aghast",
      type: "adjective",
      meaning: "filled with shock or horror",
      synonyms: [
        "scary"
      ]  
    }
]

app.get('/words', (req , res) => {
    res.json(words)
})

const IdGenerator = () => {
    const maxId = words.length
    let newId = maxId + 1
    return newId
}

app.post('/words', (req , res) => {
    let word = req.body
    if(!word.word || !word.type){
        return res.status(400).end()
    }

    let newWord = {
        id: IdGenerator(),
        word: word.word,
        type: word.type,
        meaning: word.meaning,
        synonyms: word.synonyms
    }
    console.log(newWord)
    let newSet = words.concat(newWord)
    words = newSet
    res.json(newWord)
})

const port = process.env.PORT || 3000
app.listen(port)
console.log("Server is running at", port)
