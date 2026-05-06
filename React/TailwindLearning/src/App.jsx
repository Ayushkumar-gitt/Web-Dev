import React, { useState } from 'react'

const App = () => {
  const [gender, setgender] = useState('Male');
  const [color, setcolor] = useState('blue');

  function changeGender() {
    if (gender == 'Male') {
      setgender('Female')
      setcolor('blue')
    } else {
      setgender('Male')
    }
  }
  return (
    <div className='top'>
      <h1>{`Your Gender is - ${gender}`}</h1>
      <button onClick={changeGender}>Change gender</button>
      <div className='box' style={{ backgroundColor: gender === 'Male' ? 'blue' : 'pink' }}>{gender === 'Male' ? <h1>Male Washroom</h1> : <h1>Female Washroom</h1>}</div>

    </div>
  )
}

export default App
