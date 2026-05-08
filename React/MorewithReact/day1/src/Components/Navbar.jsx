import React from 'react'

const Navbar = (props) => {
  return (
    <div className='nav' style={{backgroundColor:props.color}}>
      <h4>{props.name}</h4>
      <div className='section'>
        {props.listt.map(function(elem){
            return <h3>{elem}</h3>
        })}
      </div>
    </div>
  )
}

export default Navbar
