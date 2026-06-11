import React, { useEffect } from 'react'
import '../Style/feed.scss'
import 'remixicon/fonts/remixicon.css'
import Post from '../components/Post'
import { usePost } from '../hooks/usePost'
import Nav from '../../Shared/components/Nav'

const Feed = () => {
    const { loading, feed, handleGetFeed } = usePost()
    useEffect(() => {
        handleGetFeed()
    }, [])

    if (loading || !feed) {
        return (<main><h1>Feed is loading...</h1></main>)
    }
    // console.log(feed);

    return (
        <main className='feed-page'>
            <Nav/>
            <div className="feed">
                {feed.map((post) => {
                    return <Post user={post.user} post={post} />

                })}
            </div>
        </main>
    )
}

export default Feed
