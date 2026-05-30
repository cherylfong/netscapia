// TODO 3.1: allow starting app using `npm start` and `npm run dev` commands.
// DONE - defined in package.json.

// TODO 3.1: use provided json data and create /api/persons endpoint
const express = require('express');

// TODO 3.7 Setup using Morgan, a middleware to your application for logging.
var morgan = require('morgan')

const app = express();
const PORT = 3001;

app.listen(PORT);
console.log(`Server running on port ${PORT}`);

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
];

app.use(express.json()); //middleware to parse incoming JSON data in request body

// log all request in the Apache combined format to STDOUT
// 
// TODO 3.7 Configure logging messages to console based on the tiny configuration.
// https://github.com/expressjs/morgan
//app.use(morgan('tiny')); 


// TODO 3.8 Match the output in the screenshot using Morgan and Stringify
morgan.token("body", function (req) {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/', function (req, res) {
  res.send('hello, world!')
})

// TODO This is the section before 3.7 to set up Morgan (application logging)
//
// Middleware: this will be handled by all routes.
// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }
// app.use(requestLogger)

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

// TODO 3.2: create a page at /info to show the number of people in persons array
// and showtime of the request received 
// i.e. DAY MONTH DATE YEAR 24hour time with seconds TIMEZONE in GMT and (name of timezone in parentheses)
app.get('/info', (request, response) => {
    const numPersons = persons.length;
    const timeReceived = new Date().toString();
    response.send(`Phonebook has info for ${numPersons} people <br><br> ${timeReceived}`);
});

// TODO 3.3: create endpoint to retrieve a single persons entry by id
// The endpoint should be /api/persons/:id where :id is the id of the person to retrieve
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.statusMessage = 'Person not found';
    response.status(404);
    response.send('PERSON NOT FOUND').end();
  }

});

// TODO 3.4: implement function to remove a singple persons entry by id 
// will still responde with 204 even if the note with the given id does not exist
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);
  response.status(204).end();
});

// TODO 3.5: implement function to add a new entry to Persons array. 
// The endpoint should be /api/persons and the new entry should be sent in the request body as JSON.
app.post('/api/persons', (request, response) => {
  const newPerson = request.body;
  // TODO 3.8 - This needs to be printed through Morgan
  // console.log(newPerson);

  // TODO 3.6: ensure that the name or number in the new entry is not missing or completely empty.
  if (!newPerson || !newPerson.name || !newPerson.number) {
    return response.status(400).json({
      error: 'person name or number is missing'
    });
  }

  if(newPerson.name.trim() === '' || newPerson.number.trim() === '') {
    return response.status(400).json({
      error: 'person name or number cannot be empty'
    });
  }

  // TODO 3.6: ensure that the name of the new entry is unique
  // Hence the name should not already exists in the Persons array.
  if (persons.some(person => person.name === newPerson.name)) {
    return response.status(400).json({
      error: 'person name must be unique'
    });
  }

  newPerson.id = generateId();
  newPerson.name = newPerson.name.trim();
  newPerson.number = newPerson.number.trim();

  persons.push(newPerson);
  response.status(201).json(newPerson);
});

// Generate a unique id for new entries using random number generator.for the entry
const generateId = () => {
  return Math.floor(Math.random() * 1000000);
}

// TODO This is the section before 3.7 to set up Morgan (application logging)
//
// Middleware: catches non-existent routes
// requires to be defined after all existing routes.
// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }
// app.use(unknownEndpoint)