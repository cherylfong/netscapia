import ReactDOM from 'react-dom/client'
import App from './App'
import {
  BrowserRouter as Router,
} from 'react-router-dom'

import './index.css'

// content below is moved into db.json
// fetching data from server is done in App.jsx
//
// const notes = [
//   {
//     id: 1,
//     content: 'HTML is easy',
//     important: true
//   },
//   {
//     id: 2,
//     content: 'Browser can execute only JavaScript',
//     important: false
//   },
//   {
//     id: 3,
//     content: 'GET and POST are the most important methods of HTTP protocol',
//     important: true
//   }
// ]
//


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router><App/></Router>
)