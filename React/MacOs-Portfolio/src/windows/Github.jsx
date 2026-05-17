import React from 'react'
import MacWindow from './MacWindow'
import githubData from '../../src/assets/github.json'
import GithubCard from '../components/GithubCard'
import './github.scss'

const Github = ({ windowName, setWindowState }) => {
    // console.log(githubData[0]);

    return (
        <MacWindow windowName={windowName} setWindowState={setWindowState}>
            <div className='cards'>
                {githubData.map((elem, idx) => {
                    return <GithubCard data={elem} />
                    // console.log(elem);

                })}
            </div>
        </MacWindow>
    )
}

export default Github
