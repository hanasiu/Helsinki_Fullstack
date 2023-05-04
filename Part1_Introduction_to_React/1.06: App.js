import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )

const Display = (props) => <div>{props.text} {props.value}</div>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const plusGood = (newValue) => {
    setGood(newValue);
  } 

  const plusNeutral = (newValue) => {
    setNeutral(newValue);
  } 

  const plusBad = (newValue) => {
    setBad(newValue);
  } 

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => plusGood(good+1)} text="good" />
      <Button handleClick={() => plusNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => plusBad(bad+1)} text="bad" />
      <h1>statistics</h1>
      <Display text="good" value={good} />
      <Display text="neutral" value={neutral} />
      <Display text="bad" value={bad} />
    </div>
  )
}

export default App
