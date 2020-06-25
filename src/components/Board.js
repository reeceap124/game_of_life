import React from 'react'
import Cell from './Cell'

const BoardGrid = ({boardStatus, onToggleCell, size}) => {
    const handleClick = (x, y) => onToggleCell(x,y)

    const board = []
    for (let i = 0; i < size; i++) {
      let row = []
      for (let j = 0; j< size; j++) {
        row.push(
          <Cell cell={boardStatus[i][j]}/>
        )
      }
      board.push(<div>{row}</div>)
    }
    return board
  };

export default BoardGrid