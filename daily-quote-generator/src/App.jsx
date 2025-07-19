import React, { useState } from 'react'
import './App.css'

function App() {
  const [number,setNumber] = useState(1);
  const [color,setColor] = useState(false);

  const toggelColor =()=> setColor(prev=> !prev);

  return (
    <>
    <div>
      <h2>Show Calculation without useMemo</h2>
      <input type='number' value={number} onChange={(e)=> setNumber(e.target.value)}/>
      <button onClick={toggelColor}></button>
    </div>
      
    </>
  )
}

export default App
