// import React, {useState, useEffect, useRef, useCallback} from 'react';
// import './App.scss';

// function App() {
//   const [userInput, setUserInput] = useState(25)
//   const [running, setRunning] = useState(false)
//   const [grid, setGrid] = useState(()=>{
//     let rows = []
//     for(let i = 0; i < userInput; i++) {
//       rows[i] = []
//       for(let j = 0; j < userInput; j++) {
//         rows[i][j] = false
//       }
//     }
//     return rows
//   })
//   const runningRef = useRef(running)
//   runningRef.current = running

//   const runGame = useCallback(()=>{
//     if (!runningRef.current) {
//       console.log('stopped running')
//       return
//     }
//     console.log('running')
//     const getNeighbors = (arr, x, y) => {
//       const find = (val) => {
//         if (val < 0) {
//           //arr[(arr.length() - 1)]
//           return (arr.length - 1)
//         }
//         else {
//           //arr[0]
//           return 0
//         }
//       }
//       const neighbors = [
//         arr[find((x-1))][find((y-1))],
//         arr[find((x-1))][y],
//         arr[find((x-1))][find((y+1))],
//         arr[find(x)][find((y-1))],
//         arr[find(x)][find((y+1))],
//         arr[find((x+1))][find((y-1))],
//         arr[find((x+1))][y],
//         arr[find((x+1))][find((y+1))]
//       ]
//       const alive = () => {
//         let counter = 0
//         neighbors.forEach(n=>{
//           if (n) {
//             counter ++
//           }
//         })
//         return counter
//       }
      
//       return {neighbors, alive} //not sure yet if I want return out neighbors array or not
//     }
//     const newGrid = JSON.parse(JSON.stringify(grid))
//     for (let i = 0; i < userInput; i++){
//       for (let j = 0; j < userInput; j++){
//         let alive_counter = getNeighbors(grid, i, j).alive()
//         if (newGrid[i][j]){
//           if (alive_counter < 2 || alive_counter > 3) {
//             newGrid[i][j] = false
//           }
//         } else {
//           if (alive_counter === 3) {
//             newGrid[i][j] = true
//           }
//         }
//       }
//     }
//     setGrid(newGrid)
//     console.log('set new grid')
//     setTimeout(runGame, 500)
//   },[])

//   function toggleStart(e){
//     e.preventDefault()
//     setRunning(!running)
//     if (!running){
//       runningRef.current = true
//       runGame()
//     }
    
//   }

//   function handleChange(e) {
//         e.preventDefault();
//         setUserInput(e.target.value)
//       }

//   function handleCellToggle (x, y) {
//     const toggle = () => {
//       const clonedGrid = JSON.parse(JSON.stringify(grid)) //needed to deep copy the full nested obj
//       clonedGrid[x][y] = !clonedGrid[x][y]
//       return clonedGrid
//     }
//     setGrid(toggle())
//   }

//   return (
//     <div className="App">
//       <button onClick={toggleStart}>{running?'Stop':'Start'}</button>
//       <label>Size<input type="number"onChange={handleChange} value={userInput}/></label>
//       {grid.map((row, i) => {
//       return (
//         <div key={`${i}`} className='row'>
//         {row.map((col, j)=>{
//           return  col = (<span key={`${i}${j}`} className={grid[i][j]?'alive':'dead'} onClick={(e)=>{
//             e.preventDefault()
//             handleCellToggle(i, j)
//           }}></span>)
//         })}
//         </div>
//       )
      
//       })}
//     </div>
//   )
// }

// export default App;
