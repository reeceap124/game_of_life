import React, {useState} from 'react';
import './App.scss';
import useInterval from './customHooks/useInterval'
import Slider from './components/Slider'
import BoardGrid from './components/Board'
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
      <section className='matrix'>
        <div className='controls'>
          <div>
            <button onClick={toggleRun}>{gameStatus.isGameRunning?'Stop':'Start'}</button>
            <button onClick={clearBoard}>Clear</button>
            <button onClick={newGame}>New Game</button>
          </div>
          
          <label>Time Between Steps<Slider speed={gameStatus.speed} onSpeedChange={changeSpeed}/>{gameStatus.speed}ms</label>
          <p>Generation: {gameStatus.generation}</p>
        </div>
        
        <BoardGrid gameStatus={gameStatus} setGameStatus={setGameStatus} size={size}/>
      </section>
      <section className='rules'>
        <h1>Rules of the Game</h1>
        <ul>
          <li>Any live cell with fewer than two live neighbors dies (as if by isolation), or with four or more neighbors dies (as if by over population)</li>
          <li className='second'>Any cell with two or three living neighbors survives to the next generation</li>
          <li className='third'>Any dead cell with exactly three living neighbors will be resurrected</li>
        </ul>
      </section>
      <footer>
        
        <h2>To get in contact with the developer or see more of his work:</h2>
          
        
        <ul>
        
          <li><a href='https://github.com/reeceap124' target='_blank' rel="noopener noreferrer">Github</a></li>
          <li><a href='https://www.reecepierson.com' target='_blank' rel="noopener noreferrer">www.reecepierson.com</a></li>
        <li><a href='https://www.linkedin.com/in/reecepierson/' target='_blank' rel="noopener noreferrer">LinkedIn</a></li>
        
        </ul>
        
      </footer>
      
      
      
    </div>
  )
}

export default App;
