// import React, {useState} from 'react';
// import './App.css';
// import Cell from './components/Cell'

// function App() {
//   const [userInput, setUserInput] = useState(3)
//   const [running, setRunning] = useState(false)
//   function handleChange(e) {
//     e.preventDefault();
//     setUserInput(e.target.value)
//   }

//   function callCounter(){
//     let i = 1
//     function increaseI () {
//       const times = i
//       i++
//       return times
//     }
//     return increaseI
//   }

//   function row(x, alt){
//     let j = 0
//     let arr = []
//     for (j; j < userInput; j++) {
//       if (alt = null) {
//         arr.push(
//           <span className='cell'>nell</span>
//         )
//       } else {
//         arr.push(
//           <Cell x={x} y={j} alternate={alt}/>
//         )
//       }
      
//     }
//     return arr
//   }

//   function matrix(alt=null) {
//     console.trace('matrix has been called at:')
//     let i = 0
//     let mat = []
//     for (i; i < userInput; i++) {
//       console.log(`in Matrix. Value is ${i}`)
//       mat.push(
//         <div>{row(i, alt)}</div>
//       )
      
//       // row(i, m)
//     }
//     return mat
//   }
//   let matrixB
//   let matrixA = matrix(matrixB)
//   matrixB =  matrix(matrixA)

//   // const [current, setCurrent] = useState({
//   //   active: matrixA,
//   //   next: matrixB
//   // })

//   // function swapCurrent() {
//   //   let temp = current.active
//   //   setCurrent({
//   //     active: current.next,
//   //     next: temp
//   //   })

//   // }
//   function toggleStart(e){
//     e.preventDefault()
//     // setRunning(!running)
//     return null
//   }
//   // while (running) {
//   //   setTimeout(swapCurrent(), 500)
//   // }

//   return (
//     <div className="App">
//       <label>Size<input type="number"onChange={handleChange} value={userInput}/></label>
//   <button type='button' onClick={toggleStart}>{running?'Stop':'Start'}</button>
//       <div className='matrix matrixA'>{matrixA}</div>
//     </div>
//   );
// }

// export default App;
