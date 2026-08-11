const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI_PHONEBOOKAPP
console.log('connecting to', url)

mongoose.connect(url, { family: 4 })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const entrySchema = new mongoose.Schema({
    name: String,
    number: String,
})

entrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// PhonebookEntry becomes the name for the directory containing data on MongoDB
module.exports = mongoose.model('PhonebookEntry', entrySchema)