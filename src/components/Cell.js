import React, {useState, useEffect} from 'react'

const Cell = (props) => {
    const {x, y} = props
    // let nextCell = alternate[x][y]
    const [cell, setCell] = useState({
        status : false,
        alive_neighbors : 0,
        // neighbors : [
        //     current[x - 1][y - 1],
        //     current[x - 1][y],
        //     current[x - 1][y + 1],
        //     current[x][y - 1],
        //     current[x][y + 1],
        //     current[x + 1][y - 1],
        //     current[x +1][y],
        //     current[x + 1][y + 1]
        // ]
    })
    const get_neighbors = (current) => {
        console.log('getting neighbors')
        setCell({
            ...cell,
            neighbors : [
                current[x - 1][y - 1],
                current[x - 1][y],
                current[x - 1][y + 1],
                current[x][y - 1],
                current[x][y + 1],
                current[x + 1][y - 1],
                current[x +1][y],
                current[x + 1][y + 1]
            ],
            // next_neighbors : [
            //     alternate[x - 1][y - 1],
            //     alternate[x - 1][y],
            //     alternate[x - 1][y + 1],
            //     alternate[x][y - 1],
            //     alternate[x][y + 1],
            //     alternate[x + 1][y - 1],
            //     alternate[x +1][y],
            //     alternate[x + 1][y + 1]
            // ]

        })
    }
    

    // const setNextStatus = () => { //Sets the status of the cell in the opposing matrix based on number of neighbors
    //     if (cell.alive_neighbors < 2) {
    //         nextCell.setCell({...nextCell.cell, status : false})
    //     }
    //     else if (cell.alive_neighbors >= 2 && cell.alive_neighbors < 4) {
    //         if (cell.status === false && cell.alive_neighbors === 3) {
    //             nextCell.setCell({...nextCell.cell, status : true})
    //         }
    //         else {
    //             nextCell.setCell({...nextCell.cell})
    //         }
    //     }
    //     else {
    //         nextCell.setCell({...nextCell.cell, status: false})
    //     }
    // }

    // useEffect(()=>{ //hopefully dynamically updates status based on alive neighbors clicked on
    //     setNextStatus()
    // },[cell.alive_neighbors])

    // const update_next_neighbors = () => { //make sure you set the nextCell status first
    //     if (cell.status !== nextCell.status) {
    //         if (cell.status) {
    //             cell.next_neighbors.forEach(c => {
    //                 c.setCell({...nextCell.cell, alive_neighbors: c.cell.alive_neighbors - 1}) //if neighbor counts is an issue start here.
    //             });
    //         }
    //         else {
    //             cell.next_neighbors.forEach(c => {
    //                 c.setCell({...nextCell.cell, alive_neighbors: c.cell.alive_neighbors + 1})
    //             });
    //         }
    //     }
    //     else {
    //         cell.next_neighbors.forEach(c => {
    //             c.setCell({...nextCell.cell, alive_neighbors: cell.alive_neighbors}) 
    //         });
    //     }
    // }

    const handleClick = (e) => { //allows for the setting of the initial state of a cell
        e.preventDefault()
        setCell({...cell, status:!cell.status})
        // update_next_neighbors()
    }


    return(
        <span onClick={handleClick} className={`cell ${cell.status?'alive':null}`}>CELL</span>
    )
}

export default Cell