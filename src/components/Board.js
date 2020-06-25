import React from 'react'
import Cell from './Cell'

const BoardGrid = ({gameStatus, setGameStatus, size}) => {
    // const handleClick = (x, y) => onToggleCell(x,y)
    function handleClick(x, y){
        if (gameStatus.isGameRunning || gameStatus.generation > 0) {
            return
        }
        const toggleBoardStatus = () => {
          const clonedBoard = JSON.parse(JSON.stringify(gameStatus.boardStatus))
          clonedBoard[x][y].status = !clonedBoard[x][y].status;
          return clonedBoard
        }
        setGameStatus({...gameStatus, boardStatus: toggleBoardStatus()})
      }
    

    const board = []
    for (let i = 0; i < size; i++) {
      let row = []
      for (let j = 0; j< size; j++) {
        row.push(
          <Cell cell={gameStatus.boardStatus[i][j]} click={handleClick} i={i} j={j}/>
        )
      }
      board.push(<div>{row}</div>)
    }
    return board
  };

export default BoardGrid