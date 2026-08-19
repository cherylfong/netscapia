const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/bloglist')
const User = require('../models/user')
const helper = require('../tests/test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)

const userTokens = []

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  // await User.insertMany(helper.initialUsers)
  // DO NOT USE THIS when loginning in with Post to /api/login

  // Supertest tests that seed the DB must store a passwordHash
  // (a hashed string) for each user — otherwise
  // user.passwordHash is undefined and bcrypt throws "data
  // and hash arguments required".
  // Postman logins succeed when you already
  // created users via the real signup endpoint (which creates passwordHash).

  for (const u of helper.testUsernamesAndPasswords) {
    const passwordHash = await bcrypt.hash(u.password, 10)
    const user = new User({ username: u.username, name: u.name, passwordHash })
    await user.save()
  }

  //save authentication tokens into array
  userTokens.length = 0
  for (const cred of helper.testUsernamesAndPasswords) {
    // conditional test to make sure that initialUsers and testUsernamesAndPasswords have the same usernames
    if (!helper.initialUsers.some(u => u.username === cred.username)) {
      throw new Error(`no such user ${cred.username} in initialUsers`)
    }

    const res = await api
      .post('/api/login')
      .send({ username: cred.username, password: cred.password })

    userTokens.push({ username: cred.username, token: res.body.token })
  }


  // add initial blogs per user
  for (const [i, { token }] of userTokens.entries()) {

    if (i >= helper.initialBlogs.length) break

    const blog = helper.initialBlogs[i]

    await api
      .post('/api/blogs')
      .auth(token, { type: 'bearer' })
      .send(blog)
  }

})

describe('TESTING: superagent json return', () => {
  test('blogs are returned as json', async () => {
    const res = await api
      .get('/api/blogs')
      .expect(200)
    // expect to contain the regex expression
      .expect('Content-Type', /application\/json/)

    console.log('TEST OUTPUT: blogs added by registered users',res.body)
  })
})

describe('TESTING: superagent response body contents', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
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

    const subsetResult = (({ title, author, url, likes }) => ({ title, author, url, likes }))(resultBlog.body)

    const subsetStarting = (({ title, author, url, likes }) => ({ title, author, url, likes }))(resultBlog.body)

    assert.deepStrictEqual(subsetResult, subsetStarting)
  })
})

describe('TESTING: add new blogs', () => {
  test('a valid blog with valid user can be added', async () => {

    const newBlog = {
      title: 'The Meaning of Life?',
      author: 'The Great Guru',
      url: 'http://www.lifeasweknowtobetrue.com',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .auth(userTokens[0].token, { type: 'bearer' })
      .expect('Content-Type', /application\/json/)

    const blogsAfterAddingOne = await helper.getTestBlogsInDB()

    assert.strictEqual(blogsAfterAddingOne.length, helper.initialBlogs.length + 1)

    const authors = blogsAfterAddingOne.map(n => n.author)
    assert(authors.includes('The Great Guru'))
  })

  test('adding a blog with valid user without starting likes', async () => {

    const newBlog = {
      title: 'Emptiness',
      author: 'Who am I?',
      url: 'http://nowheredotcom.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .auth(userTokens[0].token, { type: 'bearer' })
      .expect('Content-Type', /application\/json/)

    const blogsAfterAddingOne = await helper.getTestBlogsInDB()

    assert.strictEqual(blogsAfterAddingOne.length, helper.initialBlogs.length + 1)

    const match = blogsAfterAddingOne.find(b => b.title === newBlog.title)

    const subset = (({ title, author, url, likes }) => ({ title, author, url, likes }))(match)

    assert.deepStrictEqual(subset, {
      title: 'Emptiness',
      author: 'Who am I?',
      url: 'http://nowheredotcom.com',
      likes: 0
    })

  })

  test('Adding a blog with valid user without title', async() => {

    const newBlog = {
      author: 'I am incomplete!',
      url: 'http://nowheredotcom.com',
      likes: 100
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .auth(userTokens[0].token, { type: 'bearer' })
      .expect(400)

    const blogsInDBNow = await helper.getTestBlogsInDB()

    assert.strictEqual(blogsInDBNow.length, helper.initialBlogs.length)

  })

  test('Adding a blog with valid user without a url', async() => {

    const newBlog = {
      title: 'No idea?',
      author: 'I am also incomplete?',
      likes: 100
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .auth(userTokens[0].token, { type: 'bearer' })
      .expect(400)


    const blogsInDBNow = await helper.getTestBlogsInDB()

    assert.strictEqual(blogsInDBNow.length, helper.initialBlogs.length)

  })

  test('Adding a blog with valid user without title and url', async() => {

    const newBlog = {
      author: 'I am very incomplete',
      likes: 100
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .auth(userTokens[0].token, { type: 'bearer' })
      .expect(400)

    const blogsInDBNow = await helper.getTestBlogsInDB()

    assert.strictEqual(blogsInDBNow.length, helper.initialBlogs.length)

  })

  test('Adding a blog without logged in user', async() => {

    const newBlog = {
      title: 'huh',
      author: 'what',
      url: 'http://somethingsomehownowhere.com',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsInDBNow = await helper.getTestBlogsInDB()

    assert.strictEqual(blogsInDBNow.length, helper.initialBlogs.length)

  })
})

describe('TESTING: deleting blogs using async/await', () => {

  test('a blog can be deleted with logged in user', async () => {
    const blogsAtStart = await helper.getTestBlogsInDB()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .auth(userTokens[0].token, { type: 'bearer' })
      .expect(204)

    const blogsAtEnd = await helper.getTestBlogsInDB()

    const ids = blogsAtEnd.map(n => n.id)
    assert(!ids.includes(blogToDelete.id))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })

  test('a blog cannot be deleted when user is not the creator', async () => {
    const blogsAtStart = await helper.getTestBlogsInDB()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .auth(userTokens[1].token, { type: 'bearer' })
      .expect(401)

    const blogsAtEnd = await helper.getTestBlogsInDB()

    const ids = blogsAtEnd.map(n => n.id)
    assert(ids.includes(blogToDelete.id))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('a blog cannot be deleted when user not logged in', async () => {
    const blogsAtStart = await helper.getTestBlogsInDB()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)

    const blogsAtEnd = await helper.getTestBlogsInDB()

    const ids = blogsAtEnd.map(n => n.id)
    assert(ids.includes(blogToDelete.id))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
})

describe('TESTING: updating blogs using async/await', () => {

  test('a blog can be updated by creator', async () => {
    const blogsAtStart = await helper.getTestBlogsInDB()
    const blogToUpdate = blogsAtStart[0]

    blogToUpdate.likes = blogToUpdate.likes * 2

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .auth(userTokens[0].token, { type: 'bearer' })
      .expect(200)

    const blogsAtEnd = await helper.getTestBlogsInDB()

    const ids = blogsAtEnd.map(n => n.id)
    assert(ids.includes(blogToUpdate.id))


    const match = blogsAtEnd.find(b => b.title === blogToUpdate.title)

    const subset = (({ title, author, url, likes }) => ({ title, author, url, likes }))(match)

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

    assert.deepStrictEqual(subset, {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes
    })
  })

  test('a blog cannot be updated by creator', async () => {
    const blogsAtStart = await helper.getTestBlogsInDB()
    let blogToUpdate = blogsAtStart[0]

    blogToUpdate.likes = blogToUpdate.likes * 2

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .auth(userTokens[1].token, { type: 'bearer' })
      .expect(401)

    const blogsAtEnd = await helper.getTestBlogsInDB()

    const ids = blogsAtEnd.map(n => n.id)
    assert(ids.includes(blogToUpdate.id))


    const match = blogsAtEnd.find(b => b.title === blogToUpdate.title)

    const subset = (({ title, author, url, likes }) => ({ title, author, url, likes }))(match)

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)

    assert.deepStrictEqual(subset, {
      title: blogsAtEnd[0].title,
      author: blogsAtEnd[0].author,
      url: blogsAtEnd[0].url,
      likes: blogsAtEnd[0].likes
    })
  })

  test('a blog cannot be updated if user not logged in', async () => {
    const blogsAtStart = await helper.getTestBlogsInDB()
    let blogToUpdate = blogsAtStart[0]

    blogToUpdate.likes = blogToUpdate.likes * 2

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(401)

    const blogsAtEnd = await helper.getTestBlogsInDB()

    const ids = blogsAtEnd.map(n => n.id)
    assert(ids.includes(blogToUpdate.id))


    const match = blogsAtEnd.find(b => b.title === blogToUpdate.title)

    const subset = (({ title, author, url, likes }) => ({ title, author, url, likes }))(match)

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)

    assert.deepStrictEqual(subset, {
      title: blogsAtEnd[0].title,
      author: blogsAtEnd[0].author,
      url: blogsAtEnd[0].url,
      likes: blogsAtEnd[0].likes
    })
  })
})



after(async () => {
  // close connection after test completes
  await mongoose.connection.close()
})