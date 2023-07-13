/**
 * The Course component contains the following structure:
 * 
 * Course
 *  Header
 *   Content
 *     Part
 */
const Course = ({course}) => {
    return(
        <>
          <Header course={course} />
          <Content course={course} />
        </>
    )
}

/**
 * @param {*} course : is the course object
 * @returns level 1 header containing course.name 
 */
const Header = ({course}) => { 

    return (
        <>
          <h1>
            {course.name}
          </h1>
        </>
    ) 
}

/**
 * @param {*} course : is the course object
 * @returns iteration of Part component
 */
const Content = ({course}) => {

    const parts = course.parts

    let sum = 0;

    parts.forEach( e => { sum += e.exercises })

    const i = 0;
    const sumReduce = parts.reduce(
        (accumulator, part) => accumulator + part.exercises, i
    )

    return(
        <>
          {parts.map( p => <Part key={p.id} part={p} />
          )}
          <SumDisplay total={sum} text=""/>
          <SumDisplay total={sumReduce} text={"Using Array.reduce(): "}/>
        </>
    )
}
/**
 * 
 * @param {*} part : an element of the parts array from course object
 * @returns paragraph containing the course part name and exercises
 */
const Part = ({part}) => {

    return(
        <p>{part.name} {part.exercises}</p>
    )
}

/**
 * Displays the sum of exercises for the course.
 */
const SumDisplay = ({total, text}) => {
    return(
        <>
          <p><b>{text}total of {total} exercises</b></p>
        </>
    )
}

export default Course