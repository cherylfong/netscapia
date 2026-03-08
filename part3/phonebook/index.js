// TODO 3.1: allow starting app using `npm start` and `npm run dev` commands.
// DONE - defined in package.json.

// TODO 3.1: use provided json data and create /api/persons endpoint
const express = require('express');
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

app.use(express.json()); //middleware to parse incoming JSON data in request body

// TODO 3.5: implement function to add a new entry to Persons array. 
// The endpoint should be /api/persons and the new entry should be sent in the request body as JSON.
app.post('/api/persons', (request, response) => {
  const newPerson = request.body;
  console.log(newPerson);

    if (!newPerson || !newPerson.name || !newPerson.number) {
    return response.status(400).json({
      error: 'person name or number is missing'
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