/**
 * Refactor the code so that it consists of three new components:
 * 
 * Header, Content, and Total. All data still resides in the App component, which passes the necessary data to each component using props.
 * 
 * Define the new components in the file App.js.
 */


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
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
      <Part part={props.part1} exercises={props.exercises1}/>
      <Part part={props.part2} exercises={props.exercises2}/>
      <Part part={props.part3} exercises={props.exercises3}/>
    </>
  )

}

/**
 * Total renders the total number of exercises
 */
const Total = (props) => {

  return (
    <>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
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
      <p>{props.part} {props.exercises}</p>
    </>
  )

}

export default Apps