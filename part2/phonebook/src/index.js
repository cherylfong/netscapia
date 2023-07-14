import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const persons = [
  { name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },
  { name: 'Jabba the Hutt',
    number: '39-44-5323523',
    id: 2
  },
  { name: 'Grimace',
    number: '12-43-234345',
    id: 3
  },
  { name: 'Birdie the Early Bird',
    number: '39-23-6423122',
    id: 4
  },
  { name: 'Jaja Binks',
    number: '66-236-2342',
    id: 5
  }
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App persons={persons}/>
  </React.StrictMode>
);