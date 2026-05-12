import React, { startTransition, useState } from 'react'
import Card from './Components/Card'

const App = () => {
  const [name, setname] = useState('')
  const [roll, setroll] = useState('')
  const [standard, setstandard] = useState('')
  const [department, setdepartment] = useState('')

  const dataa = JSON.parse(localStorage.getItem('all-users')) || []
  const [allUsers, setallUsers] = useState(dataa)

  
  return (
    <div className='main'>
      <form onSubmit={(e) => {
        e.preventDefault(); setdepartment(''); setname(''); setroll(''); setstandard('')
        let latestData = [...allUsers]
        latestData.push({ name, roll, standard, department })
        setallUsers(latestData)

        localStorage.setItem('all-users',JSON.stringify(latestData))
        
        // setallUsers([...allUsers,{ name, roll, standard, department }])
      }}>

        <input type="text" style={{ color: 'white' }} placeholder='Enter your name' className='input' value={name}
          onChange={(e) => {
            setname(e.target.value)
          }} />

        <input type="text" placeholder='Enter your Roll' className='input' style={{ color: 'white' }} value={roll}
          onChange={(e) => {
            setroll(e.target.value)
          }} />

        <input type="text" placeholder='Enter your standard' className='input' style={{ color: 'white' }} value={standard}
          onChange={(e) => {
            setstandard(e.target.value)
          }} />

        <input type="text" placeholder='Enter your department' className='input' style={{ color: 'white' }} value={department}
          onChange={(e) => {
            setdepartment(e.target.value)
          }} />
        <button>Submit form</button>
      </form>

      <div className='cards'>
        {allUsers.map(function (elem,idx) {
          return <Card eleme = {elem} id = {idx} setarr = {setallUsers} arr = {allUsers} />
        })}
      </div>
    </div>
  )
}

export default App
