import { useState } from 'react'
import Blog from './Blog'

const FilterBlogs = ({ blogs, user, updateBlogLikes }) => {
  const [sortOrder, setSortOrder] = useState('earliest')

  const sortedBlogs = [...blogs].sort((firstBlog, secondBlog) => {
    if (sortOrder === 'most') {
      return secondBlog.likes - firstBlog.likes
    }

    if (sortOrder === 'least') {
      return firstBlog.likes - secondBlog.likes
    }

    return 0
  })

  return (
    <>
      <div>
        <button onClick={() => setSortOrder('earliest')}>
          Sort by Earliest Add First
        </button>

        <button onClick={() => setSortOrder('most')}>
          Sort by Most Likes
        </button>

        <button onClick={() => setSortOrder('least')}>
          Sort by Least Likes
        </button>
      </div>

      <div>
        {sortedBlogs.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            loggedInUser={user?.username}
            updateBlogLikes={updateBlogLikes}
          />
        ))}
      </div>
    </>
  )
}

export default FilterBlogs