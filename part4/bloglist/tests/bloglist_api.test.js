const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/bloglist')
const helper = require('../tests/test_helper')

const api = supertest(app)

beforeEach( async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('TESTING: superagent json return', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
    // expect to contain the regex expression
      .expect('Content-Type', /application\/json/)
  })
})

describe('TESTING: superagent response body contents', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('a specific blog is within the returned notes', async () => {
    const response = await api.get('/api/blogs')

    const authors = response.body.map(e => e.author)
    assert(authors.includes('Mr. Fish'))
  })
})

describe('TESTING: viewing blogs', () => {

  test('Retrieve blog via valid id', async () => {
    const blogsAtStart = await helper.getTestBlogsInDB()
    const blogToRetrive = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToRetrive.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultBlog.body, blogToRetrive)
  })
})


after(async () => {
  // close connection after test completes
  await mongoose.connection.close()
})