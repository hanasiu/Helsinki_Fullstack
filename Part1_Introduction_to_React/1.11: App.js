import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )

const StatisticLine = (props) => <tr><td>{props.text}</td><td>{props.value}</td></tr>

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  const average = (good*1+neutral*0+bad*-1)/all;
  const positive = (good/all)*100 + "%";
  if(all === 0) return (<div><b>No feedback given</b></div>) 
  return (
    <div>
      <table>
        <tbody>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
      </tbody>
      </table>
    </div>
  )
}


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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
