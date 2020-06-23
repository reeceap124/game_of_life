import React from 'react'

const Cell = (props) => {
    const [cell, setCell] = useState({
        status = false,
        neighbors = [
            props.matrix[x - 1][y - 1],
            props.matrix[x - 1][y],
            props.matrix[x - 1][y + 1],
            props.matrix[x][y - 1],
            props.matrix[x][y + 1],
            props.matrix[x + 1][y - 1],
            props.matrix[x +1][y],
            props.matrix[x + 1][y + 1]
        ],
        alive_neighbors = 0
    })

    return(
        <span className={'cell' && cell.status?'alive':null}></span>
    )
}

export default Cell