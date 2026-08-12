const express = require('express')
const app = express()

// dotenv dependency needs to be declared before /models/note because 
// models/note requires it too
require('dotenv').config()
const Note = require('./models/note')

let notes = [
  {
    id: '1',
    content: 'HTML is easy',
    important: true,
  },
  {
    id: '2',
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: '3',
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
]

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

// middleware loading order is crucial

// to allow rendering of static content using express
app.use(express.static('dist'))
// Whenever Express gets an HTTP GET request,
// it will check if the dist directory contains a file corresponding to the request's address.
// If a correct file is found, Express will return it

app.use(express.json())
app.use(requestLogger)

// Cross Origin Resource Sharing (CORS) needed.
//
// Reason:
// forntend is served on localhost:5173
// backend is hosted on localhost:3001
// back and front are communicating with different origins 
// More info at: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
//
// const cors = require('cors')
// app.use(cors())

// In reference to `vite.config.js` in the frontend root directory: 
// After restarting with `npm run dev`, the React development environment will act as proxy. 
// If the React code makes an HTTP request to a path starting with http://localhost:5173/api, 
// the request will be forwarded to the server at http://localhost:3001. 
// Requests to other paths will be handled normally by the development server.

// Since from the frontend's perspective all requests are made to http://localhost:5173, 
// which is a single origin, 
// there is no longer a need for the backend's cors middleware.
// This is the case for both development mode and in production mode.


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})


app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {


  Note.findById(request.params.id).then(note => {
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
  // if next was called without an argument, then the execution would simply move onto the next route or middleware
})

app.post('/api/notes', (request, response, next) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    })
  }


  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    // ensures that response is only sent when save operation is successful
    response.json(savedNote)
  })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findById(request.params.id)
    .then(note => {
      if (!note) {
        return response.status(404).end()
      }

      note.content = content
      note.important = important

      return note.save().then((updatedNote) => {
        response.json(updatedNote)
      })
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// the middleware for handling unsupported routes is loaded only after all the endpoints have been defined,
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
  console.error("ERROR", error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return reponse.status(400)
      .json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)