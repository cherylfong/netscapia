import { useState } from 'react'

const Blog = ({ blog, loggedInUser, updateBlogLikes, removeBlog }) => {

  const [view, setView] = useState(true)

  const toggleView = () => {
    setView(viewable => !viewable)
  }
  const blogItemStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLikes = () => {

    {updateBlogLikes(blog.id,
      {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1
      })}
  }

  const removeBlogByID = (blogID) => {
    confirm(`🚨 Remove blog "${blog.title}" by ${blog.author}??`)
    removeBlog(blogID)
  }

  return (
    < div style={blogItemStyle} >

      <p id='title-author-test'><b><i>{blog.title}</i></b> by {blog.author}</p>

      <div style={{ display: view ? 'none' : '' }} >
        <a style={{ color : 'green' }}>{blog.url}</a>
        <p>{blog.likes} {blog.likes > 1 ? 'likes' : 'like'} <button onClick={addLikes}>👍</button></p>
        <p>Added by: {blog.user?.username ?? 'unknown user'}</p>
        <button onClick={toggleView}>hide view</button>

        {/* show delete button only if logged in user is the creator */}
        <button style={{ display: loggedInUser === blog.user?.username ? '' : 'none' }}  onClick={() => removeBlogByID(blog.id)}>DETELE</button>
      </div>

      <div style={{ display: view ? '' : 'none' }}  >
        <button onClick={toggleView}>view</button>
      </div>

    </div >
  )

}

export default Blog