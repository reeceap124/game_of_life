import React, {useState, useEffect, useRef, useCallback} from 'react';
import './App.scss';
import useInterval from './components/useInterval'
import Cell from './components/Cell'
import BoardGrid from './components/Board'

const size = 25;

const newBoardStatus = (cellStatus = ()=> {
  const cell = {
    status : Math.random() < 0.3,
    aliveCount: 0
  }
  if (cell.status){cell.aliveCount = 1}
  return cell
}) => {
  const grid = []
  for (let i = 0; i < size; i ++) {
    grid[i] = []
    for(let j = 0; j < size; j++) {
      grid[i][j] = cellStatus()
    }
  }
  return grid
};



const Slider = () => {};

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

  function toggleCell(x, y){
    const toggleBoardStatus = () => {
      const clonedBoard = JSON.parse(JSON.stringify(gameStatus.boardStatus))
      clonedBoard[x][y].status = !clonedBoard[x][y].status;
      return clonedBoard
    }
    setGameStatus({...gameStatus, boardStatus: toggleBoardStatus()})
  }

  const runGame = () => {
    const trueNeighbors = (arr, x, y) => {
        const find = (val) => {
          if (val < 0) {
            return (arr.length - 1)
          }
          else if (val > arr.length - 1){
            return 0
          }
          else {
            return val
          }
        }
        const neighbors = [
          arr[find((x-1))][find((y-1))],
          arr[find((x-1))][y],
          arr[find((x-1))][find((y+1))],
          arr[find(x)][find((y-1))],
          arr[find(x)][find((y+1))],
          arr[find((x+1))][find((y-1))],
          arr[find((x+1))][y],
          arr[find((x+1))][find((y+1))]
        ]
        
          let counter = 0
          neighbors.forEach(n=>{
            if (n.status) {
              counter ++
            }
          })

        return counter //not sure yet if I want return out neighbors array or not
      }
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
  
  useInterval(()=>{
    runGame()
  }, gameStatus.isGameRunning?gameStatus.speed:null)
  
  return (
    <div className="App">
      <button onClick={toggleRun}>{gameStatus.isGameRunning?'Stop':'Start'}</button>
      <button onClick={clearBoard}>Clear</button>
      <button onClick={newGame}>New Game</button>
      <label>Next Step<input type='number' name='speed' value={gameStatus.speed}/>ms</label>
      <p>{gameStatus.generation}</p>
      <BoardGrid boardStatus={gameStatus.boardStatus} onToggleCell={toggleCell} isGameRunning={gameStatus.isGameRunning} size={size}/>
    </div>
  )
}

export default App;
