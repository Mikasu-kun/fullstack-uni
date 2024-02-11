import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [sum, setSum] = useState(0)  

  const Average = (prop) => {
    if(prop.tot===0)
    {
      return 0
    }
    else
    {
      console.log(prop.avarage/prop.tot)
      return (prop.avarage/prop.tot)
    }
  }

  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

  const handleGoodClick = () => {
    setGood(good + 1)  
    setTotal(good + 1 + neutral + bad)    
    setSum(sum + 1)    
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)  
    setTotal(good + neutral + 1 + bad)      
  }

  const handleBadClick = () => {
    setBad(bad + 1)   
    setTotal(good + neutral + bad + 1)     
    setSum(sum - 1)        
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
      <p>all {total}</p>
      average <Average avarage={sum} tot={total} />
    </div>
  )
}
export default App