import React from 'react'
import './dock.scss'
const Dock = ({ toggleWindow }) => {
  return (
    <div className='dock'>
      
      <div onClick={() => { toggleWindow('github') }}
        className='icon github'><img src="/doc-icons/github.svg" alt="" /></div>

      <div onClick={() => { toggleWindow('note') }} className='icon note'><img src="/doc-icons/note.svg" alt="" /></div>

      <div onClick={() => { toggleWindow('resume') }} className='icon pdf'><img src="/doc-icons/pdf.svg" alt="" /></div>

      <div onClick={()=>{window.open("https://calendar.google.com/calendar", "_blank")}} className='icon calender'><img src="/doc-icons/calender.svg" alt="" /></div>

      <div onClick={() => { toggleWindow('spotify') }} className='icon spotify'><img src="/doc-icons/spotify.svg" alt="" /></div>
      
      {/* <div onClick={()=>{window.open("mailto:raj309457@gmail.com","_blank")}} className='icon mail'><img src="/doc-icons/mail.svg" alt="" /></div> */}

      <div onClick={()=>{window.open("https://linkedin.com/in/ayush-kumar-60b667231", "_blank")}} className='icon link'><img src="/doc-icons/link.svg" alt="" /></div>

      <div onClick={() => { toggleWindow('terminal') }} className='icon cli'><img src="/doc-icons/cli.svg" alt="" /></div>
    </div>
  )
}

export default Dock
