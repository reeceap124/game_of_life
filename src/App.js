import React, {useState, useEffect, useRef, useCallback} from 'react';
import './App.scss';
import useInterval from './components/useInterval'
import Slider from './components/Slider'
import BoardGrid from './components/Board'
import trueNeighbors from './helpers/findNumTrue'
import newBoardStatus from './helpers/newBoardStatus'
import runGame from './helpers/runGame'


const size = 25

function App() {
  const [gameStatus, setGameStatus] = useState({
    boardStatus: newBoardStatus(),
    generation: 0,
    isGameRunning: false,
    speed: 125
  })
  function clearBoard(e) {
    e.preventDefault()
    setGameStatus({...gameStatus, boardStatus: newBoardStatus(()=>{
      const cell = {
        status : false,
        aliveCount: 0
      }
      return cell
    }), isGameRunning: false, generation: 0})
  }
  function newGame(e){
    e.preventDefault()
    setGameStatus({...gameStatus, boardStatus: newBoardStatus(), isGameRunning: false, generation: 0})
  }
  function toggleRun(e){
    e.preventDefault()
    setGameStatus({...gameStatus, isGameRunning: !gameStatus.isGameRunning})
  }
  function changeSpeed(newSpeed) {
    setGameStatus({...gameStatus, speed: newSpeed})
  }
  useInterval(()=>{
    runGame(gameStatus, setGameStatus, size)
  }, gameStatus.isGameRunning?gameStatus.speed:null)
  
  return (
    <div className="App">
      <div>
        <button onClick={toggleRun}>{gameStatus.isGameRunning?'Stop':'Start'}</button>
        <button onClick={clearBoard}>Clear</button>
        <button onClick={newGame}>New Game</button>
        <label>Step time<Slider speed={gameStatus.speed} onSpeedChange={changeSpeed}/>{gameStatus.speed}ms</label>
        <p>{gameStatus.generation}</p>
        <BoardGrid gameStatus={gameStatus} setGameStatus={setGameStatus} size={size}/>
      </div>
      
    </div>
  )
}

export default App;
