import React, {useState} from 'react';
import './App.css';
import Cell from './components/Cell'

function App() {
  const [userInput, setUserInput] = useState(25)
  function handleChange(e) {
    e.preventDefault;
    setUserInput(e.target.value)
  }

  function row(x, m){
    let i = 0
    let arr = []
    for (i; i < userInput; i++) {
      arr.push(<Cell x={x} y={i} alternate={m}/>)
    }
  }

  function matrix(m) {
    let i = 0
    for (i; i < userInput; i++) {row(i, m)}
  }
  let matrixB
  let matrixA = matrix(userInput, matrixB)
  matrixB = matrix(userInput, matrixA)
  return (
    <div className="App">
      <label onChange={handleChange}>Size<input type="number"/></label>
      <div className='matrix matrixA'>{matrixA}</div>
      <div className='matrix matrixB'>{matrixB}</div>
    </div>
  );
}

export default App;
