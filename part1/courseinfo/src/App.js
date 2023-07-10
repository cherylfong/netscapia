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
 */


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

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
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

export default App