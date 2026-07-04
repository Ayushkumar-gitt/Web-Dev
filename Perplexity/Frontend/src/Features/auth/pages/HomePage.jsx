import React from 'react'
import { useSelector } from 'react-redux'

const HomePage = () => {
    const {user} = useSelector(state => state.auth)
    console.log(user);
    
    return (
        <div>
            <h2>Homepage</h2>
        </div>
    )
}

export default HomePage
