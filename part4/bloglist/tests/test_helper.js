const Blog = require('../models/bloglist')
const User = require('../models/user')
const bcrypt = require('bcrypt')

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

const initialUsers = [{
  username: 'root',
  password: bcrypt.hash('sekret', 10)
},
{
  username: 'beagle',
  name: 'dog',
  password: bcrypt.hash('blahblahblah', 10)
}
]

const getTestBlogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  getTestBlogsInDB,
  initialUsers,
  usersInDb
}