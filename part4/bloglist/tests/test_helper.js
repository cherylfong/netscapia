const Blog = require('../models/bloglist')

const initialBlogs = [{
  title: 'How to be happy?',
  author: 'Mr. Funny',
  url: 'http://www.behappynow123.com',
  likes: 4
},
{
  title: 'How breathe underwater?',
  author: 'Mr. Fish',
  url: 'http://www.thefishlifestyle.com',
  likes: 6
}]

const getTestBlogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

module.exports = {
  initialBlogs,
  getTestBlogsInDB
}
