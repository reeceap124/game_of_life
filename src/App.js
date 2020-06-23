import React, {useState} from 'react';
import './App.css';
import Cell from './components/Cell'

function App() {
  const [userInput, setUserInput] = useState(25)
  function handleChange(e) {
    e.preventDefault;
    setUserInput(e.target.value)
  }

  function row(){
    let i = 0
    for (i; i < userInput; i++) {
      return <Cell/>
    }
  }

  function matrix() {
    let i = 0
    for (i; i < userInput; i++) {<div>{row()}</div>}
  }
  return (
    <div className="App">
      <label onChange={handleChange}>Size<input type="number"/></label>
      {matrix()}
    </div>
  );
}

export default App;
