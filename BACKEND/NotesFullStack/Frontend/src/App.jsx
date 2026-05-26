import React, { useEffect, useState } from 'react'
import axios from 'axios'
const App = () => {
  const [notes, setnotes] = useState([{}])

  async function dataFetch() {
    await axios.get("http://localhost:3000/notes").then((res) => {
      setnotes(res.data.note)
      console.log(res.data.note);
    })
  }

  useEffect(() => {
    dataFetch()
  }, [])
  function submitHandler(e) {
    e.preventDefault();
    const { title, desc } = e.target.elements
    console.log(title.value, desc.value);
    axios.post("http://localhost:3000/notes", { title: title.value, description: desc.value }).then((res) => {
      console.log(res);
      dataFetch()
    })
  }
  function deleteNote(noteId) {
    axios.delete(`http://localhost:3000/notes/${noteId}`).then((response) => {
      console.log(response);
      dataFetch()
    })
  }
  function updateNote(event, noteId) {
    event.preventDefault()

    const { update_title, update_desc } = event.target.elements

    console.log(update_title.value, update_desc.value);
    console.log(noteId);
    

    axios.patch(`http://localhost:3000/notes/${noteId}`, {
      title: update_title.value,
      description: update_desc.value
    }).then((response) => {
      console.log(response);
      dataFetch()
    })
  }
  return (
    <>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder='Title' id="title" />
        <input type="text" placeholder='Description' id="desc" />
        <button type="submit">Submit</button>
      </form>
      {
        notes.map((note) => {
          return <div className="note" key={note._id}>
            <h2>{note.title}</h2>
            <h5>{note.description}</h5>
            <button onClick={() => { deleteNote(note._id) }}>delete</button>
            
            <form onSubmit={(event) => updateNote(event, note._id)}>
              <input type="text" id="update_title" name="update_title" placeholder='update title' />
              <input type="text" id="update_desc" name="update_desc" placeholder='update description' />
              <button type="submit">Update</button>
            </form>
          </div>
        })
      }
    </>
  )
}

export default App
