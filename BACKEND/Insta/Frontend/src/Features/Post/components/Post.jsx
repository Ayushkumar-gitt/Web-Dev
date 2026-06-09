import React, { useState } from 'react'
import { usePost } from '../hooks/usePost';

const Post = ({ user, post }) => {
    const { handlePostLike } = usePost()
    const [likeResponse, setlikeResponse] = useState(null)

    return (
        <div className="post">
            <div className="user">
                <img src={user.profile_pic} alt="" />
                <p>{user.username}</p>
            </div>
            <img src={post.imgUrl} alt="" />
            <div className="icons">
                <div className="left">
                    <button onClick={async () => {
                        await handlePostLike(post._id).then((response) => {
                             setlikeResponse(response)
                        })
                    }}><i class="ri-heart-3-line" style={likeResponse != null ? { color: 'red' } : { color: 'white' }} ></i></button>
                    <button><i class="ri-chat-3-line" style={{ color: 'white' }}></i></button>
                    <button><i class="ri-share-forward-line" style={{ color: 'white' }}></i></button>
                </div>
                <div className="right">
                    <button><i class="ri-bookmark-line" style={{ color: 'white' }}></i></button>
                </div>
            </div>
            <div className="bottom">
                <p className="caption">{post.caption}</p>
            </div>
        </div>
    )
}

export default Post
