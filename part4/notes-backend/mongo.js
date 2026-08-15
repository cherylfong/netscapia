const mongoose = require('mongoose')
require('dotenv').config()
const logger = require('./utils/logger')
// if (process.argv.length < 3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]

// const url = `mongodb+srv://fullstack:${password}@cluster0.a5qfl.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

const url = process.env.TEST_MONGODB_URI

mongoose.set('strictQuery', true)

mongoose
  .connect(url)
  .then(() => {
    logger.info('connected to MongoDB: ', url)
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'blah blah blah...',
  important: false,
})

note.save().then((result) => {
  console.log('note saved!: ', result)
  mongoose.connection.close()
})

// Note.find({}).then((result) => {
//   result.forEach((note) => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })
