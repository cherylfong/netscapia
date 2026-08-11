const express = require('express')
const mongoose = require('mongoose')


var morgan = require('morgan')

// mongodb intergration 
require('dotenv').config()
const Phonebook = require('./models/phonebook')

const app = express()
const PORT = 3001

app.listen(PORT)
console.log(`Server running on port ${PORT}`)

app.use(express.json()); //middleware to parse incoming JSON data in request body

app.use(express.static('dist'))


morgan.token("body", function (req) {
  return JSON.stringify(req.body);
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', function (req, res) {
  res.send('hello, world! This is a Phonebook App :)')
})

// global persons variable contains all entries in the database
let persons = []
const loadPersons = async () => {
  persons = await Phonebook.find({});
}
loadPersons().catch(console.error)

app.get('/api/persons', (request, response) => {
  Phonebook.find({}).then(entries => {
    response.json(entries);
  })

})

app.get('/info', (request, response) => {
  Phonebook.find({}).then(entries => {
    const numPersons = entries.length;
    const timeReceived = new Date().toString();
    response.send(`Phonebook has info for ${numPersons} people <br><br> ${timeReceived}`);
  }).catch(error => {
    response.status(500).send({ error: 'server error' });
  });
});


app.get('/api/persons/:id', async (request, response, next) => {
  const { id } = request.params; // destructuring, extract id from value assigned

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ error: 'malformatted id' });
  }

  try {
    const person = await Phonebook.findById(id);

    if (person) {
      response.json(person);
    } else {
      response.status(404).json({ error: 'person not found' });
    }
  } catch (error) {
    next(error);
  }
});

// TODO 3.4: implement function to remove a singple persons entry by id 
// will still responde with 204 even if the note with the given id does not exist
app.delete('/api/persons/:id', async (request, response, next) => {

  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ error: 'malformatted id' });
  }

  try {

    const person = await Phonebook.findByIdAndDelete(id)

    if (person) {
      response.status(204).end();
    } else {
      response.status(404).json({ error: 'person not found' });
    }

  } catch (error) {

    console.log(error)
    next(error)
  }



});


app.post('/api/persons', (request, response) => {
  const newPerson = request.body;

  if (!newPerson || !newPerson.name || !newPerson.number) {
    return response.status(400).json({
      error: 'person name or number is missing'
    });
  }

  if (newPerson.name.trim() === '' || newPerson.number.trim() === '') {
    return response.status(400).json({
      error: 'person name or number cannot be empty'
    });
  }


  if (persons.some(person => person.name === newPerson.name)) {
    return response.status(400).json({
      error: 'person name must be unique'
    });
  }

  newPerson.name = newPerson.name.trim();
  newPerson.number = newPerson.number.trim();

  const entry = new Phonebook({
    name: newPerson.name,
    number: newPerson.number
  })

  entry.save().then(result => {
    console.log(`added ${newPerson.name} number ${newPerson.number} to phonebook`)
    mongoose.connection.close()
  })
  // persons.push(newPerson);
  response.status(201).json(newPerson);
});
