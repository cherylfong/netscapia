import logo from './logo.svg';
import './App.css';

/**
 * 2.1 Define a component responsible for formatting a single course called Course.
 * 
 * 2.2 Show sum of exercises of the course.
 * 
 * 2.3 Use Array.reduce to calculate the sum exercises in the course.
 */

import Course from './components/Course';

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

  return <Course course={course} />
}

export default App;
