const bloglistRouter = require('express').Router()

const Blog = require('../models/bloglist')

// Use relative path of the URL:
// Since defined in app.js that any route which
// begins with /api/blogs will use definitons in this module.

bloglistRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({})
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

bloglistRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })


  const savedBlog= await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = bloglistRouter