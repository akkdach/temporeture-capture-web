import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LineChart from './Charts/LineChart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LineChart />
    </>
  )
}

export default App
