import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import Testcard from './Components/Testcard'


const App = () => {
  var arr = ['ayush', 'kashish', 'renu', 'dilip']
  return (
    <div>
      <Navbar name = 'Ayush' listt = {arr}/>
      <Testcard/>
    </div>
  )
}

export default App
