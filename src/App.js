import React, {useState, useEffect, useRef, useCallback} from 'react';
import './App.scss';
import useInterval from './components/useInterval'
import Slider from './components/Slider'
import BoardGrid from './components/Board'
import trueNeighbors from './helpers/findNumTrue'


const initialSize = 25
const newBoardStatus = (num = initialSize, cellStatus = ()=> {
  const cell = {
    status : Math.random() < 0.3,
    aliveCount: 0
  }
  if (cell.status){cell.aliveCount = 1}
  return cell
}) => {
  const grid = []
  for (let i = 0; i < num; i ++) {
    grid[i] = []
    for(let j = 0; j < num; j++) {
      grid[i][j] = cellStatus()
    }
  }
  return grid
};

function App() {
  const [size, setSize] = useState(initialSize)
  const [gameStatus, setGameStatus] = useState({
    boardStatus: newBoardStatus(),
    generation: 0,
    isGameRunning: false,
    speed: 125
  })

  function clearBoard(e) {
    e.preventDefault()
    setGameStatus({...gameStatus, boardStatus: newBoardStatus(size,()=>{
      const cell = {
        status : false,
        aliveCount: 0
      }
      return cell
    }), isGameRunning: false, generation: 0})
  }

  function newGame(e){
    e.preventDefault()
    setGameStatus({...gameStatus, boardStatus: newBoardStatus(size), isGameRunning: false, generation: 0})
  }


  const runGame = () => {
    const boardStatus = gameStatus.boardStatus
    const clonedBoardStatus = JSON.parse(JSON.stringify(boardStatus))
    let changed = false
    const nextStep = () => {
      for(let i = 0; i < size; i ++) {
        for (let j = 0; j < size; j++) {
          const totalTrueN = trueNeighbors(boardStatus, i, j)
          if (boardStatus[i][j].status) {
            if (totalTrueN < 2 || totalTrueN > 3) {
              clonedBoardStatus[i][j] = {...clonedBoardStatus[i][j], status: false, aliveCount: 0};
              changed = true
            } else {
              clonedBoardStatus[i][j] = {...clonedBoardStatus[i][j], aliveCount: clonedBoardStatus[i][j].aliveCount + 1};
            }

          } else {
            if (totalTrueN === 3) {
              clonedBoardStatus[i][j] = {...clonedBoardStatus[i][j], status: true, aliveCount: 1};
              changed = true
            }
          }
        }
      }
      return clonedBoardStatus
    }
    const newbie = nextStep()
    if (changed == false){
      setGameStatus({...gameStatus, isGameRunning: false})
    } else {

      setGameStatus({...gameStatus, boardStatus: newbie, 
      generation: gameStatus.generation + 1})
    }
    
  }
  function toggleRun(e){
    e.preventDefault()
    setGameStatus({...gameStatus, isGameRunning: !gameStatus.isGameRunning})
  }
  function changeSpeed(newSpeed) {
    setGameStatus({...gameStatus, speed: newSpeed})
  }
  useInterval(()=>{
    runGame()
  }, gameStatus.isGameRunning?gameStatus.speed:null)
  
  return (
    <div className="App">
      <button onClick={toggleRun}>{gameStatus.isGameRunning?'Stop':'Start'}</button>
      <button onClick={clearBoard}>Clear</button>
      <button onClick={newGame}>New Game</button>
      <label>Step time<Slider speed={gameStatus.speed} onSpeedChange={changeSpeed}/>{gameStatus.speed}ms</label>
      <p>{gameStatus.generation}</p>
      <BoardGrid gameStatus={gameStatus} setGameStatus={setGameStatus} size={size}/>
    </div>
  )
}

export default App;
