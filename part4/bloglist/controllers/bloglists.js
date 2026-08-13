const bloglistRouter = require('express').Router()

const Blog = require('../models/bloglist')

// Use relative path of the URL:
// Since defined in app.js that any route which
// begins with /api/blogs will use definitons in this module.

bloglistRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

bloglistRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

module.exports = bloglistRouter