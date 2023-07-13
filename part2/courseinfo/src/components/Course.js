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

    return(
        <>
          {parts.map( p => <Part key={p.id} part={p} />
          )}
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

export default Course