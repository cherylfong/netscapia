import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const persons = [
  { name: 'Arto Hellas' },
  { name: 'Jabba the Hutt'},
  { name: 'Grimace'},
  { name: 'Birdie the Early Bird'},
  { name: 'Jaja Binks'}
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App persons={persons}/>
  </React.StrictMode>
);