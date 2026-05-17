import React from 'react'
import MacWindow from './MacWindow'
import githubData from '../../src/assets/github.json'
import GithubCard from '../components.jsx/GithubCard'
import './github.scss'

const Github = () => {
    // console.log(githubData[0]);
    
  return (
    <MacWindow>
        <div className='cards'>
        {githubData.map((elem,idx)=>{
            return <GithubCard data = {elem}/>
            // console.log(elem);
            
        })}
        </div>
    </MacWindow>
  )
}

export default Github
