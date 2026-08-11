const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://cherylfong_db_user:${password}@cluster0.52qsfwq.mongodb.net/noteApp?appName=Cluster0`

mongoose.set('strictQuery', false)

console.log(`connecting to MongoDB...`)
mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})


// the first "Note" parameter is the singular name of the model. 
// The name of the collection will be the lowercase plural notes, 
// because the Mongoose convention is to automatically name collections as the plural (e.g. notes)s
const Note = mongoose.model('Note', noteSchema)

// model constructor
// const note = new Note({
//     content: 'test content 3',
//     important: true,
// })

// saves the constructed note object to the db
// result is the returned object from the save method
// result contains the note object saved to the db
// note.save().then(result => {
//     console.log('note saved!')
//     // event handler to close db connection
//     mongoose.connection.close()
//     // the connection remains open until the program terminates
//     // unless the connection is explicitly closed
// })

// The parameter is an empty object{},
// thus all of the notes stored in the notes collection are returned
Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
})

Note.find({ important: true }).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})