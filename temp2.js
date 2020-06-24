import React, {useState, useEffect, useRef, useCallback} from 'react';
import './App.scss';

const totalrows = 15;
const totalcol = 15;

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
const BoardGrid = ({boardStatus, onToggleCell}) => {
  const handleClick = (x, y) => onToggleCell(x,y)
  const board = []
  for (let i = 0; i < totalrows; i++) {
    let row = []
    for (let j = 0; j< totalcol; j++) {
      row.push(
        <span className={boardStatus[i][j]?'alive':'dead'} onClick={handleClick(i, j)}/>
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
    speed: 500
  })

  console.log('First Status', gameStatus.boardStatus)

  

  function clearBoard(e) {
    e.preventDefault()
    setGameStatus({...gameStatus, boardStatus: newBoardStatus(()=>false)})
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
    if (!gameStatus.isGameRunning) {
      console.log('Stopped running')
      return
    }
    console.log('RUNNING', gameStatus)
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
        
        console.log('Counter', counter)
        return counter //not sure yet if I want return out neighbors array or not
      }

    const nextStep = () => {

      const boardStatus = gameStatus.boardStatus
      const clonedBoardStatus = JSON.parse(JSON.stringify(boardStatus))

      
      for(let i = 0; i < totalrows; i ++) {
        for (let j = 0; j < totalcol; j++) {
          const totalTrueN = trueNeighbors(boardStatus, i, j)
          if (boardStatus[i][j]) {
            if (totalTrueN < 2 || totalTrueN > 3) {
              clonedBoardStatus[i][j] = false;
            }
          } else {
            clonedBoardStatus[i][j] = true
          }
        }
      }
      return clonedBoardStatus
    }
    setGameStatus({...gameStatus, boardStatus: nextStep(), 
      generation: gameStatus.generation + 1})
    console.log('end of round')
  }


  function toggleRun(e){
    e.preventDefault()
    setGameStatus({...gameStatus, isGameRunning: !gameStatus.isGameRunning})
  }

  //Methods
  

  
  return (
    <div className="App">
      <button onClick={toggleRun}>{gameStatus.isGameRunning?'Stop':'Start'}</button>
      <BoardGrid boardStatus={gameStatus.boardStatus} onToggleCell={()=>null}/>
    </div>
  )
}

export default App;