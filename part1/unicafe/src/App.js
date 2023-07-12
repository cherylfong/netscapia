/**
 * 1.6 Implement a web application for collecting customer feedback. There are only three options for feedback: good, neutral, and bad.
 */

import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const updateGood = good + 1
    setGood(updateGood)
  }

  const handleNeutralClick = () => {
    const updateNeutral = neutral + 1
    setNeutral(updateNeutral)

  }

  const handleBadClick = () => {
    const updateBad = bad + 1
    setBad(updateBad)
    // setTotal(updateBad + bad)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button handle={handleGoodClick} text={"good 😃"} />
      <Button handle={handleNeutralClick} text={"neutral 😐"} />
      <Button handle={handleBadClick} text={"bad 😟"} />
      <h1>statistics</h1>
      <P text={"good"} value={good}/>
      <P text={"neutral"} value={neutral}/>
      <P text={"bad"} value={bad}/>

    </div>
  )
}

/**
 * Custom Button
 */
const Button = ({handle, text}) => <button onClick={handle}>{text}</button>

/**
 * Display values
 */
const P = ({text, value}) => <p>{text} {value}</p>


export default App