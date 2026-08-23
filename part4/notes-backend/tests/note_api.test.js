const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Note = require('../models/note')
const helper = require('../tests/test_helper')

// superagent object
// https://github.com/visionmedia/superagent
const api = supertest(app)

beforeEach(async () => {
  await Note.deleteMany({})

  const noteObjects = helper.initialNotes
    .map(note => new Note(note))
  const promiseArray = noteObjects.map(note => note.save())
  await Promise.all(promiseArray)
})

describe('TESTING: superagent json return', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
    // expect to contain the regex expression
      .expect('Content-Type', /application\/json/)
  })
})

describe('TESTING: superagent response body contents', () => {
  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    // execution gets here only after the HTTP request is complete
    // the result of HTTP request is saved in variable response
    assert.strictEqual(response.body.length, helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(e => e.content)
    // assert.strictEqual(contents.includes('HTML is easy'), true)
    assert(contents.includes('HTML is easy'))
  })
})

describe('TESTING: adding new notes using async/await', () => {
  test('a valid note can be added ', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // const response = await api.get('/api/notes')

    // const contents = response.body.map(r => r.content)

    const notesAtEnd = await helper.notesInDb()

    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

    const contents = notesAtEnd.map(n => n.content)

    assert(contents.includes('async/await simplifies making async calls'))
  })

  test('note without content is not added', async () => {
    const newNote = {
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)

    const notesAtEnd = await helper.notesInDb()
    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
  })

})

describe('TESTING: viewing details of notes using async/await', () => {

  test('a specific note can be viewed', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToView = notesAtStart[0]


    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultNote.body, noteToView)
  })

  test('fails with statuscode 404 if note does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api.get(`/api/notes/${validNonexistingId}`).expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api.get(`/api/notes/${invalidId}`).expect(400)
  })
})

describe('TESTING: deleting notes using async/await', () => {

  test('a note can be deleted', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToDelete = notesAtStart[0]

    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204)

    const notesAtEnd = await helper.notesInDb()

    const ids = notesAtEnd.map(n => n.id)
    assert(!ids.includes(noteToDelete.id))

    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
  })
})



after(async () => {
  // close connection after test completes
  await mongoose.connection.close()
})