import React from 'react'
import '../navstyle.scss'
import { useNavigate } from 'react-router'
const Nav = () => {
  const navigate = useNavigate()
  return (
    <div className='navbar'>
      <h1>Insta</h1>
      <button onClick={()=>{navigate("/createpost")}} className='button primary-button'>New Post</button>
    </div>
  )
}

export default Nav
