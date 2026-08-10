// imports Node's built-in web server module.
// same as import http from 'http' in ES6 syntax
const express = require('express');

// express is a function that creates an Express application. 
// The app variable now holds the Express application, 
// which we can use to define routes and middleware for our web server.
const app = express();

// built-in middleware function in Express that parses incoming JSON request bodies 
// and makes the data available under the req.body property of the request object.
app.use(express.json());

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
];

// root route even handler
// request - incoming request from the client
// response - object used to send a response back to the client
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
  // string is passed into send method,
  // express automatically sets the Content-Type header to text/html 
  // and sends the string as the response body.

  // status code 200 is the default status code for a successful response
});

// api note route
// returns the notes array as a JSON response to the client
// express automatically sets the Content-Type header to application/json
app.get('/api/notes', (request, response) => {
  response.json(notes);
  // express automatically converts the JavaScript array into a JSON string 
  // manual transformation is needed with Node only http module

});

// retrieve a single note by id
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id;
  const note = notes.find(note => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.statusMessage = 'Note not found';
    response.status(404);
    response.send('NOTE NOT FOUND').end();
  }

});

// delete a note by id
// will still responde with 204 even if the note with the given id does not exist
app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id;
  notes = notes.filter(note => note.id !== id);
  response.status(204).end();
});

// provide a unique id for new notes
const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0;
    // Math.max returns the maximum value of the numbers that are passed 
    // However, notes.map(n => Number(n.id)) is an array 
    // so it can't directly be given as a parameter to Math.max. 
    // The array can be transformed into individual numbers 
    // by using the "three dot" spread syntax 
  return (maxId + 1).toString();
}

//add a new note
app.post('/api/notes', (request, response) => {
  const body = request.body;
  console.log(body);

  if (!body || !body.content) {
    return response.status(400).json({
      error: 'note content is missing'
    });
  }

  const note = {
    id: generateId(),
    content: body.content,
    important: body.important || false //if important is missing, defaukt to false
  };

  notes = notes.concat(note);

  response.status(201).json(note);

});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);