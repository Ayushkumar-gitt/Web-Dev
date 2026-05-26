import React, { useEffect, useState } from 'react'
import axios from 'axios'
const App = () => {
  const [notes, setnotes] = useState([{}])

  async function  dataFetch() {
    await axios.get("http://localhost:3000/notes").then((res)=>{
    setnotes(res.data.note)
    console.log(res.data.note);
  })
  }
  
  useEffect(()=>{
    dataFetch()
  },[])
  
  return (
    <>
    {
      notes.map((note)=>{
        return <div className="note">
          <h2>{note.title}</h2>
          <h5>{note.description}</h5>
        </div>
      })
    }
    </>
  )
}

export default App
