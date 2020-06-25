import React, {useState, useEffect, useRef, useCallback} from 'react';
import './App.scss';
import useInterval from './customHooks/useInterval'
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
      <div className='matrix'>
        <div className='controls'>
          <div>
            <button onClick={toggleRun}>{gameStatus.isGameRunning?'Stop':'Start'}</button>
            <button onClick={clearBoard}>Clear</button>
            <button onClick={newGame}>New Game</button>
          </div>
          
          <label>Step time<Slider speed={gameStatus.speed} onSpeedChange={changeSpeed}/>{gameStatus.speed}ms</label>
          <p>Generation: {gameStatus.generation}</p>
        </div>
        
        <BoardGrid gameStatus={gameStatus} setGameStatus={setGameStatus} size={size}/>
      </div>
      <div className='rules'>
        <h1>Rules of the Game</h1>
        <ol>
          <li>Any cell with fewer than two live neighbors dies (as if by isolation)</li>
          <li>Any cell with two or three living neighbors survives to the next generation</li>
          <li>Any cell with four or more neighbors dies (as if by over population)</li>
        </ol>
      </div>
      
      
      
    </div>
  )
}

export default App;
