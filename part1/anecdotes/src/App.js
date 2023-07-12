/**
 * 1.12 Expand the application by adding a button that can be clicked to display a random anecdote.
 * 
 * 1.13 Allow voting for the displayed anecdote.
 * 
 * 1.14 Display the anecdote with the largest number of votes
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

  const [votes, setVote] = useState(Array(anecdotes.length).fill(0))
   
  const handleRandomSelection = () => {
    // gets a random number from 0 to the length of the anecdote array length
    const updateSelection = Math.floor(Math.random() * anecdotes.length )
    setSelected(updateSelection)
  }

  const handleVoting = () => {
    // update array element value + 1 that corresponds to the selected anecdote
    // always update the reference, do not directly mutate 
    let copyArray = [...votes]
    copyArray[selected] += 1
    // create a new array with the copied elements
    setVote([...copyArray])
  }

  const getIndexHighestVote = () => {
    console.log( "WTF ",votes.findIndex((e) => e === Math.max(...votes)))
    return votes.findIndex((e) => e === Math.max(...votes))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Votes: {votes[selected]}</p>
      <Button handle={handleRandomSelection} text="next anecdote" />
      <Button handle={handleVoting} text="vote +1" />
      <PopularAnecdote anecdote={anecdotes[getIndexHighestVote()]} voted={Math.max(...votes)} />
    </div>
  )
}

/**
 * Custom Button
 */
const Button = ({ handle, text }) => <button onClick={handle}>{text}</button>

/**
 * Largest voted anecdote display
 */
const PopularAnecdote = ({anecdote, voted}) => {

  return(
    <>
      <h1>Anecdote with the most votes</h1>
        <p>{anecdote}</p>
        <b>Number of votes: {voted}</b>
    </>
  )
}

export default App
