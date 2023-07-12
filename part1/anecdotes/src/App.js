/**
 * 1.12 Expand the application by adding a button that can be clicked to display a random anecdote.
 */

import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'If debugging is the process of removing bugs, then programming must be the process of putting them in.',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well in increments.'
  ]
   
  const [selected, setSelected] = useState(0)

  const handleRandomSelection = () => {
    // gets a random number from 0 to the length of the anecdote array length
    const updateSelection = Math.floor(Math.random() * anecdotes.length )
    setSelected(updateSelection)
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <Button handle={handleRandomSelection} text="next anecdote" />
    </div>
  )
}

/**
 * Custom Button
 */
const Button = ({ handle, text }) => <button onClick={handle}>{text}</button>

export default App
