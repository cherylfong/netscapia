/**
 * 2.1 Define a component responsible for formatting a single course called Course.
 * 
 * 2.2 Show sum of exercises of the course.
 * 
 * 2.3 Use Array.reduce to calculate the sum exercises in the course.
 * 
 * 2.4 Extend the application to display an arbitrary number of courses.
 * 
 * 2.5 Implement Course component as a separate module and import to use in App component.
 */

import logo from './logo.svg';
import './App.css';

import Course from './components/Course';

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course courses={courses} />
}

export default App;
