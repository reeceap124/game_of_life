import React, {useState, useEffect, useRef, useCallback} from 'react';
import './App.scss';
import Cell from './components/Cell'

function App() {
  const [userInput, setUserInput] = useState(5)
  const [running, setRunning] = useState(false)
  const [grid, setGrid] = useState(()=>{
    let rows = []
    for(let i = 0; i < userInput; i++) {
      rows[i] = []
      for(let j = 0; j < userInput; j++) {
        rows[i][j] = false
      }
    }
    return rows
  })
  const runningRef = useRef(running)
  runningRef.current = running

  const runGame = useCallback(()=>{
    if (!runningRef.current) {
      return
    }
    //Logic
    setTimeout(runGame, 500)
  },[])

  function toggleStart(e){
    e.preventDefault()
    setRunning(!running)
  }

  function handleChange(e) {
        e.preventDefault();
        setUserInput(e.target.value)
      }

  function handleCellToggle (x, y) {
    const toggle = () => {
      const clonedGrid = JSON.parse(JSON.stringify(grid)) //needed to deep copy the full nested obj
      clonedGrid[x][y] = !clonedGrid[x][y]
      return clonedGrid
    }
    setGrid(toggle())
  }

  return (
    <div className="App">
      <button onClick={toggleStart}>{running?'Stop':'Start'}</button>
      <label>Size<input type='number' onChange={handleChange} value={userInput}/></label>
      {grid.map((row, i) => {
      return (
        <div key={`${i}`} className='row'>
        {row.map((col, j)=>{
          return <span key={`${i}${j}`} className={grid[i][j]?'alive':'dead'} onClick={(e)=>{
            e.preventDefault()
            handleCellToggle(i, j)
          }}></span>
        })}
        </div>
      )
      
      })}
    </div>
  )
}

export default App;
