import React, { useRef, useState } from 'react'
import '../Shared/navstyle.scss'
import { usePost } from './hooks/usePost'
import { useNavigate } from 'react-router'
const CreatePost = () => {
  const [caption, setcaption] = useState('')

  const postImageUseRef = useRef(null)

  const { loading, handleCreatePost } = usePost()

  const navigate = useNavigate()

  async function submitHandler(e) {
    e.preventDefault()
    const file = postImageUseRef.current.files[0]
    await handleCreatePost(file, caption)
    navigate('/')
  }
  if (loading) {
    return <h1>Creating Post...</h1>
  }
  return (
    <main className='createPostform'>
      <form onSubmit={submitHandler}>

        <label className='postImageLabel' htmlFor="postimage">Select File</label>

        <input hidden ref={postImageUseRef} type="file" name="postImage" id="postimage" />

        <input type="text" value={caption} onInput={(e) => { setcaption(e.target.value) }} name="caption" id="caption" placeholder='Enter Caption' />

        <button type="submit" className='primary-button'>Submit</button>

      </form>
    </main>
  )
}

export default CreatePost
