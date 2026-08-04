import { useState } from 'react'
import Card from './Card.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Lets Learn Props</h1>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <Card name="card1" price="1000" />
      <Card name="card2" price="2000" />
      <Card name="card3" price="3000" />
    </>
  )
}

export default App