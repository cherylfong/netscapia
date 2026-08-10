const Header = ({ courseName }) => <h2>{courseName}</h2>

const Content = ({ parts }) =>
  parts.map((part) =>
  <Part key={part.id} part={part}
  />)

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({ total }) => <strong>Total of {total} exercises</strong>

const Course = ({ course }) => (
  <div>
    <Header courseName={course.name} />
    <Content parts={course.parts} />
    <Total total={course.parts.reduce(
      (s, p) => {
        console.log('what is happening', s, p)
        return s + p.exercises
        },
      0) // value of s
    }/>
  </div>
)

export default Course
