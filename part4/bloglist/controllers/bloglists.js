const bloglistRouter = require('express').Router()

const Blog = require('../models/bloglist')
const User = require('../models/user')

const { userExtractor } = require('../utils/middleware')


// Use relative path of the URL:
// Since defined in app.js that any route which
// begins with /api/blogs will use definitons in this module.

bloglistRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

bloglistRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

bloglistRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  if (!body.title || !body.url) {
    return response.status(400).end()
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

bloglistRouter.delete('/:id', userExtractor, async (request, response) => {
  try {

    const blog = await Blog.findById(request.params.id)
    if (!blog) return response.status(404).end()

    // only get blog owner username if needed for the error message
    const user = request.user
    const userIDFromBlog = blog.user.toString()
    const userIDFromLogin = user.id.toString()

    if (userIDFromLogin !== userIDFromBlog) {
      const owner = await User.findById(blog.user)
      const ownerName = owner ? owner.username : 'unknown'
      return response.status(401).json({ error: `Only original poster can delete posted blog - blog owner: ${ownerName}` })
    }

    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

bloglistRouter.put('/:id', userExtractor, async (request, response) => {
  const { likes, url, author, title } = request.body

  let blog = await Blog.findById(request.params.id)

  const user = request.user

  const userIDFromBlog = blog.user.toString()
  const userIDFromLogin = user.id.toString()

  // if updated likes are the same as the original likes OR
  // likes is not provided at all
  // then check if logged in user is the one making updates
  // to the blog they have added
  if(likes === blog.likes || likes === null ){

    if (userIDFromLogin !== userIDFromBlog) {
      const owner = await User.findById(blog.user)
      const ownerName = owner ? owner.username : 'unknown'
      return response.status(401).json({ error: `Only original poster can update the posted blog - blog owner: ${ownerName}` })
    }

  }

  if (!blog) {

    return response.status(404).end()

  } else {

    blog.likes = likes? likes : blog.likes
    blog.url = url? url : blog.url
    blog.author = author? author : blog.author
    blog.title = title? title : blog.title

    const updatedBlog = await blog.save()
    response.status(200).json(updatedBlog)
  }

})

module.exports = bloglistRouter