import React from 'react'

const Cell = (props) => {
    let {x, y, alternate} = props
    let nextCell = alternate[x][y]
    const [cell, setCell] = useState({
        status = false,
        next_neighbors = [
            alternate[x - 1][y - 1],
            alternate[x - 1][y],
            alternate[x - 1][y + 1],
            alternate[x][y - 1],
            alternate[x][y + 1],
            alternate[x + 1][y - 1],
            alternate[x +1][y],
            alternate[x + 1][y + 1]
        ],
        alive_neighbors = 0
    })

    const handleClick = (e) => { //allows for the setting of the initial state of a cell
        e.preventDefault()
        setCell(!cell.status)
    }

    const setNextStatus = () => { //Sets the status of the cell in the opposing matrix based on number of neighbors
        if (cell.alive_neighbors < 2) {
            nextCell.setCell({...nextCell.cell, status : false})
        }
        else if (cell.alive_neighbors >= 2 && cell.alive_neighbors < 4) {
            if (cell.status === false && cell.alive_neighbors === 3) {
                nextCell.setCell({...nextCell.cell, status : true})
            }
            else {
                nextCell.setCell({...nextCell.cell})
            }
        }
        else {
            nextCell.setCell({...nextCell.cell, status: false})
        }
    }

    const update_next_neighbors = () => {
        if (cell.status !== nextCell.status) {
            if (cell.status) {
                next_neighbors.forEach(c => {
                    c.setCell({...nextCell.cell, alive_neighbors: c.cell.alive_neighbors - 1}) //if neighbor counts is an issue start here.
                });
            }
        }
    }


    return(
        <span onClick={handleClick} className={'cell' && cell.status?'alive':null}></span>
    )
}

export default Cell