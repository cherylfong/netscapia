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