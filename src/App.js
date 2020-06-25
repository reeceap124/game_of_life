import React, {useState, useEffect, useRef, useCallback} from 'react';
import './App.scss';
import useInterval from './components/useInterval'

const totalrows = 25;
const totalcol = 25;

const newBoardStatus = (cellStatus = ()=> Math.random() < 0.3) => {
  const grid = []
  for (let i = 0; i < totalrows; i ++) {
    grid[i] = []
    for(let j = 0; j < totalcol; j++) {
      grid[i][j] = cellStatus()
    }
  }
  return grid
};
const BoardGrid = ({boardStatus, onToggleCell, isGameRunning}) => {
  const handleClick = (x, y) => onToggleCell(x,y)
  const board = []
  for (let i = 0; i < totalrows; i++) {
    let row = []
    for (let j = 0; j< totalcol; j++) {
      row.push(
        <span className={boardStatus[i][j]?'alive':'dead'} onClick={isGameRunning?null:()=>handleClick(i, j)}/>
      )
    }
    board.push(<div>{row}</div>)
  }
  return board
};
const Slider = () => {};

function App() {
  const [gameStatus, setGameStatus] = useState({
    boardStatus: newBoardStatus(),
    generation: 0,
    isGameRunning: false,
    speed: 250
  })

  

  function clearBoard(e) {
    e.preventDefault()
    setGameStatus({...gameStatus, boardStatus: newBoardStatus(()=>false), isGameRunning: false, generation: 0})
  }

  function newGame(e){
    e.preventDefault()
    setGameStatus({...gameStatus, boardStatus: newBoardStatus(), isGameRunning: false, generation: 0})
  }

  function toggleCell(x, y){
    const toggleBoardStatus = () => {
      const clonedBoard = JSON.parse(JSON.stringify(gameStatus.boardStatus))
      clonedBoard[x][y] = !clonedBoard[x][y];
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
            if (n) {
              counter ++
            }
          })

        return counter //not sure yet if I want return out neighbors array or not
      }
      const boardStatus = gameStatus.boardStatus
      const clonedBoardStatus = JSON.parse(JSON.stringify(boardStatus))
    const nextStep = () => {
      for(let i = 0; i < totalrows; i ++) {
        for (let j = 0; j < totalcol; j++) {
          const totalTrueN = trueNeighbors(boardStatus, i, j)
          if (boardStatus[i][j]) {
            if (totalTrueN < 2 || totalTrueN > 3) {
              clonedBoardStatus[i][j] = false;
            }

          } else {
            if (totalTrueN === 3) {
              clonedBoardStatus[i][j] = true;
            }
          }
        }
      }
      return clonedBoardStatus
    }
    const newbie = nextStep()
    setGameStatus({...gameStatus, boardStatus: newbie, 
      generation: gameStatus.generation + 1})
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
      <p>{gameStatus.generation}</p>
      <BoardGrid boardStatus={gameStatus.boardStatus} onToggleCell={toggleCell} isGameRunning={gameStatus.isGameRunning}/>
    </div>
  )
}

export default App;
