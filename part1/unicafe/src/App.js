/**
 * 1.6 Implement a web application for collecting customer feedback. There are only three options for feedback: good, neutral, and bad.
 * 
 * 1.7 Show statistics that include total number of collected feedback, average score where (good:1, neutral:0, bad:-1), and the percentage of good feedback.
 * 
 * 1.8 Refactor to display statistics in its own component. Application state should remain in the App root component.
 * 
 * 1.9 Display statistics only when feedback is given.
 */

import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  // updates and sets the number of "good" button clicks
  // updates total of all button clicks
  const handleGoodClick = () => {
    const updateGood = good + 1
    setGood(updateGood)
    setTotal(updateGood + neutral + bad)
  }

  // updates and sets the number of "neutral" button clicks
  // updates total of all button clicks
  const handleNeutralClick = () => {
    const updateNeutral = neutral + 1
    setNeutral(updateNeutral)
    setTotal(updateNeutral + good + bad)
  }

  // updates and sets the number of "bad" button clicks
  // updates total of all button clicks
  const handleBadClick = () => {
    const updateBad = bad + 1
    setBad(updateBad)
    setTotal(updateBad + good + neutral)
  }

  // gets the average of all feedback
  const getAverage = (good, bad, total) => { return (good - bad) / total }

  // gets the percentage of good feedback
  const getGoodPercentage = (good, total) => { return (good / total) * 100 }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handle={handleGoodClick} text={"good 😃"} />
      <Button handle={handleNeutralClick} text={"neutral 😐"} />
      <Button handle={handleBadClick} text={"bad 😟"} />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={getAverage(good, bad, total)} percentage={getGoodPercentage(good, total)}/>
    </div>
  )
}

/**
 * Custom Button
 */
const Button = ({ handle, text }) => <button onClick={handle}>{text}</button>

/**
 * Display values
 */
const P = ({ text, value }) => <p>{text} {value}</p>

/**
 * Statistics display
 */
const Statistics = (props) => {

  if (props.total === 0) {
    return <p>No feedback given</p>
  }

  return (
    <>
      <h1>statistics</h1>
        <P text={"good"} value={props.good} />
        <P text={"neutral"} value={props.neutral} />
        <P text={"bad"} value={props.bad} />
        <P text={"all"} value={props.total} />
        <P text={"average"} value={props.average} />
        <P text={"positive in %"} value={props.percentage} />
    </>
  )
}

export default App