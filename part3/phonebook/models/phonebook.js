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
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        required: [ true,'User phone number required'],
        validate: {
            validator: function (v) {
                return /^\d{2,3}-\d{7,8}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number! \nThe format is {2 to 3 digits}-{7 to 8 digits}, there is a hypen in the middle.`
        }
    }
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