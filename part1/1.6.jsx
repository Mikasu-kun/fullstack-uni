import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

  const handleGoodClick = () => {
    setGood(good + 1)   
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)   
  }

  const handleBadClick = () => {
    setBad(bad + 1)   
  }  

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />      
      <Button handleClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      good {good} 
      <p>neutral {neutral} </p>
      bad {bad}
    </div>
  )
}

export default App