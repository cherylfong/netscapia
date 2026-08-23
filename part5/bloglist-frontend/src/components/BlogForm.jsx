import { useState } from 'react'

const BlogForm = ( { createBlog } ) => {

  const [newBlogTitle, setBlogTitle] = useState('')
  const [newBlogAuthor, setBlogAuthor] = useState('')
  const [newBlogUrl, setBlogUrl] = useState('http://')

  const addBlog = (event) => {

    event.preventDefault()

    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    })

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('http://')
  }


  return (
    <form onSubmit={addBlog}>
      <div><label>title:
        <input
          value={newBlogTitle}
          onChange={event => setBlogTitle(event.target.value)}
        />
      </label></div>
      <div><label>author:
        <input
          value={newBlogAuthor}
          onChange={event => setBlogAuthor(event.target.value)}
        />
      </label></div>
      <div><label>url:
        <input
          value={newBlogUrl}
          onChange={event => setBlogUrl(event.target.value)}
        />
      </label></div>
      <button type="submit">Save</button>
    </form>
  )
}

export default BlogForm