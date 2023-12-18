import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [negative, setNegative] = useState(0)
  const [sum, setSum] = useState(0)
  const [total, setTotal] = useState(0)

  const Statistics = (props) => {
    return(
    <div>
          <p>good {props.good}</p>
            neutral {props.neutral}
          <p>bad {props.negative}</p>
            all {props.all}
          <p>average {(props.sum/props.all).toFixed(1)}</p>
            positive {(props.good / props.all * 100).toFixed(1)} %
    </div>
    )
  }  

  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

  const goodClick = () => {
    setGood(good + 1)  
    setTotal(good + 1 + neutral + negative)    
    setSum(sum + 1)    
  }

  const neutralClick = () => {
    setNeutral(neutral + 1)
    setTotal(neutral + 1 + good + negative)
  }

  const negativeClick = () => {
    setNegative(negative + 1)
    setTotal(negative + 1 + neutral + good)
    setSum(sum - 1)
  }

  return (
    <>
        <h1>give feedback</h1>
        <Button handleClick={goodClick} text="good"></Button>
        <Button handleClick={neutralClick} text="neutral"></Button>
        <Button handleClick={negativeClick} text="bad"></Button>
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} negative={negative} sum={sum} all={total}/>
    </>
  )
}
export default App