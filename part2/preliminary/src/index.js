import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios'
import App from './App';

// calling a http get request
// will include data, status code and headers
const promise = axios.get('http://localhost:3001/notes')
console.log(promise)

// To access only data from the response object,
// register an event handler to the promise object
//
// this returned as a String
// The Axios library using content-type header: i.e. the data format and charset,
// will be able to parse the data into an array
promise.then(response => {
  console.log("GETTING DATA: ", response.data)
})

// alternative writing
/* axios
  .get('http://localhost:3001/notes')
  .then(response => {
    const notes = response.data
    console.log(notes)
  }) */

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true
  }
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <App notes={notes} />
)