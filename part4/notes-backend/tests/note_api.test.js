const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Note = require('../models/note')

// superagent object
// https://github.com/visionmedia/superagent
const api = supertest(app)

const initialNotes = [
    {
        content: 'HTML is easy',
        important: false,
    },
    {
        content: 'Browser can execute only JavaScript',
        important: true,
    },
]
beforeEach(async () => {
    await Note.deleteMany({})
    let noteObject = new Note(initialNotes[0])
    await noteObject.save()
    noteObject = new Note(initialNotes[1])
    await noteObject.save()
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
        assert.strictEqual(response.body.length, initialNotes.length)
    })

    test('a specific note is within the returned notes', async () => {
        const response = await api.get('/api/notes')

        const contents = response.body.map(e => e.content)
        // assert.strictEqual(contents.includes('HTML is easy'), true)
        assert(contents.includes('HTML is easy'))
    })
})

after(async () => {
    // close connection after test completes
    await mongoose.connection.close()
})