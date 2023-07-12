/**
 * Refactor the code so that it consists of three new components:
 * 
 * Header, Content, and Total. All data still resides in the App component, which passes the necessary data to each component using props.
 * 
 * Define the new components in the file App.js.
 * 
 * 1.3 Modify the variable definitions of the App component as objects.
 * 
 * 1.4 Place the objects into an array.
 * 
 * 1.5 Change the course and its parts into a single JavaScript object.
 * 
 * Part 1 (c) Component state using useState and Event handling with button clicks
 * 
 * Part 1 (d) Multiple varying state types
 * 
 */

import {useState} from 'react'

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const [counter, setCounter] = useState(0)

  const addOneCount = () => {
    console.log('add count ', counter)
    setCounter(counter +1)
  }

  const minusOneCount = () => {
    console.log('minus count ', counter)
    setCounter(counter -1)
  }

  const resetCount = () => {
    console.log('reset count ', counter)
    setCounter(0)
  }

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    // does not mutate, creates a copy of existing with the added input
    // remember to not directly change state objects
    setAll(allClicks.concat('L'))
    // intently update left click value because asynchronous 
    const updateLeft = left + 1
    setLeft(updateLeft)
    // the left variable is still holding the previous/un-updated value!
    setTotal(updateLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updateRight = right + 1
    setRight(updateRight)
    setTotal(updateRight + left)
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      <CountDisplay counter={counter} />
      <Button handle={addOneCount} text={"++"} />
      <Button handle={minusOneCount} text={"--"} />
      <Button handle={resetCount} text={"0"} />
      <LeftRightLog allClicks={allClicks} />
      <Button handle={handleLeftClick} text={"<- LEFT"} />
      <Button handle={handleRightClick} text={"RIGHT ->"} />
      <p>Total Right and Left clicks: {total}</p>
      </div>
  )
}

/**
 * Header takes care of rendering the name of the course
 */
const Header = (props) => {

  return (
    <>
      <h1>{props.course}</h1>
    </>
  )

}

/**
 * Content renders the parts and their number of exercises
 */
const Content = (props) => {

  return (
    <>
      <Part parts={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part parts={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part parts={props.parts[2].name} exercises={props.parts[2].exercises}/>
    </>
  )

}

/**
 * Total renders the total number of exercises
 */
const Total = (props) => {

  return (
    <>
      <p>Number of exercises {props.parts[0].exercises + props.parts[2].exercises + props.parts[2].exercises}</p>
    </>
  )

}

/**
 * Refactor the Content component so that it does not render any names of parts or their number of exercises by itself.
 * 
 * Instead, it only renders three Part components of which each renders the name and number of exercises of one part.
 */
const Part = (props) => {

  return (
    <>
      <p>{props.parts} {props.exercises}</p>
    </>
  )

}

/**
 * Displays click counter
 */
const CountDisplay = ({counter}) => {

  return <p>Counting button clicks: {counter}</p>
}
export default App

/**
 * Custom Button
 */
const Button = ({handle, text}) => <button onClick={handle}>{text}</button>

/**
 * 
 * @param {*} allClicks gets the array of clicks logged as L and R chars 
 * @returns JSX using conditional rendering
 */
const LeftRightLog = ({allClicks}) => {
  if (allClicks.length === 0){
    return(
      <p>Start clicking LEFT or Right!</p>
    )
  }
  return (
    <p>Logging : {allClicks.join(' ')}</p>
  )
}
