const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  const Header = (props) => {
    return(
    <h1>{props.course}</h1>
    )
  }
  
  const Part = (props) =>
  {
    console.log(props)
    return (<p>
      {props.name} {props.exercises}
    </p>)
  }

  const Content = (parts) => {
    return(
    <div>
      <Part name={parts.parts[0].name} exercises={parts.parts[0].exercises}/>
      <Part name={parts.parts[1].name} exercises={parts.parts[1].exercises}/>
      <Part name={parts.parts[2].name} exercises={parts.parts[2].exercises}/>
    </div>
    )
  }
  
  const Total = (parts) => {
    return (
      <p>Number of exercises {parts.parts[0].exercises + parts.parts[1].exercises + parts.parts[2].exercises}</p>
    )
  }

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts} />
    </div>
  )
}

export default App