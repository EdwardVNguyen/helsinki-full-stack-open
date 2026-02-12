// useState will allow us to change states in React (add interactive UI!)
import { useState } from 'react'

const Header = ( {text} ) => {
  return (
    <h1>
      {text} 
    </h1>
  )
}

// Because props are passed down as JS objects, { } is the destructing syntax that allows us to use properties directly
const Button = ( {onClick, text} ) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = ( {text, stats} ) => {
  return (
    <tr>
      <td> {text} </td>
      <td> {stats} </td>
    </tr>
  )
}

// returns list of statistics if there is info available
const StatisticsList = ( {good, netural, bad} ) => {

  const calculateSum = (good, netural, bad) => good + netural + bad
  const calculateAverage = (good, netural, bad) => (good - bad) / calculateSum(good, netural, bad) 
  const calculatePositiveRatio = (good, netural, bad) => good / calculateSum(good, netural, bad)

  const isValid = () => {
    if (calculateSum(good, netural, bad) > 0) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      { 
        isValid() ? (
        <table>
          <tbody>
            <StatisticLine text="Good" stats={good} />
            <StatisticLine text="Neutral" stats={netural} />
            <StatisticLine text="Bad" stats={bad} />
            <StatisticLine text="All" stats={calculateSum(good, netural, bad)} />
            <StatisticLine text="Average" stats={calculateAverage(good, netural, bad).toFixed(1)} />
            <StatisticLine text="Postive" stats={ `${(calculatePositiveRatio(good, netural, bad) * 100).toFixed(1)}%`} /> 
          </tbody>
        </table>
        ) : (
        <p>No feedback given</p>
        )
      }
    </>
  )
}

const App = () => {
  // useState creates an array with a var and a function, calls for rerender when the function is called
  // although useStates don't have identifiers, React assigns them inside an array, so it is important that
  // these hooks are NOT binded to any conditional statement so the React knows the exact order of each
  const [good, setGood] = useState(0)
  const [netural, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // reference to anonymous function that will set next snapshot/state to good + 1 (doesn't modify the good var but makes a copy)
  // in which a copy is used for the next rerender
  const incrementGoodClick = () => {
    setGood(good + 1)
  }
  const incrementNeutralClick = () => {
    setNeutral(netural + 1)
  }
  const incrementBadClick = () => {
    setBad(bad + 1)
  }
  
  return (
    <div>
      <Header text="Give feedback" />

      {
        // important to not set onClick=incrementGoodClick() because that would cause an infinite recursion due to the fact
        // that setGood will call for a rerender each time App is rendered!
      }
      <Button onClick={incrementGoodClick} text="Good" />
      <Button onClick={incrementNeutralClick} text="Neutral" />
      <Button onClick={incrementBadClick} text="Bad" />

      <Header text="Statistics" />
      <StatisticsList good={good} netural={netural} bad={bad} />
          
    </div>
  )
}

export default App

