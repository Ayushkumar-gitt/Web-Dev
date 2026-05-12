import React from 'react'

const Card = (obbj) => {
  const allUser = obbj.arr

  function deleteHandler(idx){
    const copyUsers = [...allUser]
    copyUsers.splice(idx,1)
    // we can use confirm builtin function to confirm if user wants to delete or not , if yes then do splice thing inside it
    obbj.setarr(copyUsers)
    localStorage.setItem('all-users',JSON.stringify(copyUsers))
  }
  return (
    <div id='cardbox' key={obbj.id}>
      <h4>Name : {obbj.eleme.name}</h4>
      <h4>Roll : {obbj.eleme.roll}</h4>
      <h4>Class : {obbj.eleme.standard}</h4>
      <h4>Dept : {obbj.eleme.department}</h4>
      <button onClick={()=>{
        deleteHandler(obbj.id)
      }}>Delete</button>
    </div>
  )
}

export default Card
