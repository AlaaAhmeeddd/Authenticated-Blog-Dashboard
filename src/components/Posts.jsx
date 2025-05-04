import React, { useEffect, useState } from 'react'
import Container from './Container'

export default function Posts() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchData() {

      const data = await fetch('http://localhost:5000/posts');
      const response = await data.json();

      setPosts(response)
    }
    fetchData()
  }, [])

  async function handleDelete(id) {
    const response = await fetch('http://localhost:5000/posts/' + id, {
      method: 'DELETE',
      headers: {

      }
    })
    return response
  }

  async function handleAdd() {
    const newPost = {
      "id": "1",
      "title": "Post 1",
      "body": "This is the first post"
    }
    const response = await fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: {
        body: JSON.stringify(newPost)
      }
    })
    return response
  }

  console.log(posts)
  return (
    <Container>
      {posts.length > 0 ? posts.map((post) => (
        <div>
          <p key={post.id}> {post.title} </p>
          <button onClick={() => handleDelete(post.id)}>delete </button>
        </div>
      )) : <p>No posts</p>}

      <div>
        <button onClick={handleAdd}>add</button>
      </div>
    </Container>
  )
}
