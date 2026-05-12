import React, { useEffect, useState } from 'react'
import axios from 'axios'
const App = () => {
  const [allresponse, allsetresponse] = useState([])
  async function getData(){
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    console.log(response.data)
    allsetresponse(response.data)
  }
  useEffect(function(){ 
    getData()
  },[])
  return (
    <div>
      {/* <button onClick={getData}>Get data</button> */}

      {allresponse.map((elem,idx)=>{
        return <h1>{elem.name}</h1>
      })}
    </div>
  )
}

export default App
