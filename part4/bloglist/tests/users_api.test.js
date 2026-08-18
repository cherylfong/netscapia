const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('../tests/test_helper')
const api = supertest(app)


beforeEach(async () => {
  await User.deleteMany({})

  const userObjects = helper.initialUsers
    .map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})

describe('TESTING: superagent json return', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('TESTING: superagent response body contents', () => {
  test('all users are returned', async () => {
    const response = await api.get('/api/users')

    // execution gets here only after the HTTP request is complete
    // the result of HTTP request is saved in variable response
    assert.strictEqual(response.body.length, helper.initialUsers.length)
  })
})

describe('TESTING: adding users', () => {

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username is less than 3 characters long', async () => {

    const usersAtStart = await helper.usersInDb()

    const newWrongUsernameLength1 = {
      username: 'ro',
      name: 'Superuser',
      password: 'salainen'
    }

    const newWrongUsernameLength2 = {
      username: 'r',
      name: 'Superuser',
      password: 'salainen'
    }

    const newWrongUsernameLength3 = {
      username: '',
      name: 'Superuser',
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newWrongUsernameLength1)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    let usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('User validation failed'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    const result2 = await api
      .post('/api/users')
      .send(newWrongUsernameLength2)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    usersAtEnd = await helper.usersInDb()
    assert(result2.body.error.includes('User validation failed'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    const result3 = await api
      .post('/api/users')
      .send(newWrongUsernameLength3)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    usersAtEnd = await helper.usersInDb()
    assert(result3.body.error.includes('User validation failed'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })


  test('creation fails with proper statuscode and message if passwprd is less than 3 characters long', async () => {

    const usersAtStart = await helper.usersInDb()

    const errorString = 'password must be at least 3 characters long'

    const newWrongPasswordLength1 = {
      username: 'roooo',
      name: 'Superuser',
      password: ''
    }

    const newWrongPasswordLength2 = {
      username: 'roooo',
      name: 'Superuser',
      password: 'sa'
    }

    const newWrongPasswordLength3 = {
      username: 'roooo',
      name: 'Superuser',
      password: 's'
    }

    const result = await api
      .post('/api/users')
      .send(newWrongPasswordLength1)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    let usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes(errorString))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    const result2 = await api
      .post('/api/users')
      .send(newWrongPasswordLength2)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    usersAtEnd = await helper.usersInDb()
    assert(result2.body.error.includes(errorString))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    const result3 = await api
      .post('/api/users')
      .send(newWrongPasswordLength3)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    usersAtEnd = await helper.usersInDb()
    assert(result3.body.error.includes(errorString))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })


})

after(async () => {
  // close connection after test completes
  await mongoose.connection.close()
})