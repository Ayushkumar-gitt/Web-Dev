import React, { useState } from 'react'

const Testcard = () => {
  const [namee, setname] = useState("Ayush")
  function btnclicked() {
    setname('Kashish')
  }
  return (
    <div>
      <h2>{namee}</h2>
      <button onClick={btnclicked}>Change button</button>
    </div>
  )
}

export default Testcard
