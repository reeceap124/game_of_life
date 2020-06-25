import React from 'react'

const Cell = ({cell}) => {
  
  
    let stage = 'stageOne'
    if (cell.aliveCount >= 5 && cell.aliveCount < 10) {
      stage = 'stageTwo'
    } else if (cell.aliveCount >= 10 && cell.aliveCount < 25) {
      stage = 'stageThree'
    } else if (cell.aliveCount >= 25 && cell.aliveCount < 50) {
      stage = 'stageFour'
    }
    return (
      <span className={`${cell.status?stage:'dead'}`}/>
    )
    
  
  }

  export default Cell