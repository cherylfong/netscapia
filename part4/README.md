 This is part 4 of the fullstack open course by https://studies.cs.helsinki.fi 
 
### Part 4 sub b. | Testing the Backend

#### Supertest

`npm install --save-dev supertest`

Supertest binds to ephemeral port if there not one already listening. Using axios would require another instance of the server running separately before testing. Supertest offers the method [expect()](https://www.npmjs.com/package/supertest).

#### Running Specific Tests

There are ways to run specific tests:

1. `npm test -- --test-only`

Any test object initiated with the `only()` method, such as:

```javascript
test.only('all notes are returned', async () => {
  const response = await api.get('/api/notes')

  assert.strictEqual(response.body.length, 2)
})
```
Do not forget to remove tests with the `only()` when no longer needed.

2. `npm test -- tests/note_api.test.js`

Any tests defined in the path will be executed.

3. `npm test -- --test-name-pattern="a specific note is within the returned notes"`

Executes tests with a specific name pattern. This can be describe block or test object description.For example, the command `npm run test -- --test-name-pattern="notes"` will run all of the tests that contain the string `notes`.


#### `async` and `await`

```javascript
const main = async () => {
// execuition of this code pauses until the promise from find is fulfilled
const notes = await Note.find({})
// after fulfillment, notes is assigned the value from the returned promise

console.log('operation returned the following notes', notes)
}
```
Code is a lot simpler than the then-chain. See below:

```javascript
Note.find({}).then(notes => {
  console.log('operation returned the following notes', notes)
})
```

**Important details to keep in mind for usage:**

1. To use `await`, the asynchronous operations must return a promise.

2. Using `await` is possible only inside of an async function.

Errors no longer need to be forwarded separately for handling. In code using promises, a possible error was passed to the error-handling middleware like this:

```javascript
notesRouter.post('/', (request, response, next) => {
  //

  note
    .save()
    .then((savedNote) => {
      response.status(201).json(savedNote)
    })
    .catch((error) => next(error))
})

// can become

notesRouter.post('/', async (request, response) => {  
const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  const savedNote = await note.save()
  response.status(201).json(savedNote)
})
```

When using async/await syntax, Express will automatically call the error-handling middleware if an await statement throws an error or the awaited promise is rejected.


#### Adding more than 1 test object

The `beforeEach` function in `note_api.test.js` is populating the testNoteApp db with test objects.

There are various ways to add test objects, ordered from least optimized code structure to most:

1. Using hard-coded indices:

```javascript
beforeEach(async () => {
  await Note.deleteMany({})

  let noteObject = new Note(helper.initialNotes[0])
  await noteObject.save()

  noteObject = new Note(helper.initialNotes[1])
  await noteObject.save()
})
```

2. Using a for loop problem

```javascript
beforeEach(async () => {
  await Note.deleteMany({})
  console.log('cleared')

  helper.initialNotes.forEach(async (note) => {
    let noteObject = new Note(note)
    await noteObject.save()
    console.log('saved')
  })
  console.log('done')
})
```

This structure unfortunately allows the test execution to begin before the database is done populating with test objects.

**Reason:**

1. Each iteration of tthe forEach loop generates its own asynchronous operation, and the beforeEach function does not wait for their completion. 

1. The await commands inside the forEach loop are not part of the beforeEach function but are instead in separate functions.

1. The forEach method expects a synchronous function as its parameter, so the async/await structure does not work correctly within it.

3. Using `Promise.all()` to avoid the for loop problem in 2.



```javascript
beforeEach(async () => {
  await Note.deleteMany({})

  // line 3
  const noteObjects = helper.initialNotes
    .map(note => new Note(note))

  // line 4
  const promiseArray = noteObjects.map(note => note.save())

  await Promise.all(promiseArray)
})
```

`Promise.all()` forces all asynchronous operation to complete execution before stepping out into the next line of instruction.

In reference to `// line 3`:
> `noteObjects` is assigned to an array of Mongoose objects that are created with the `Note` constructor for each of the notes in the `helper.initialNotes` array. 

In reference to `// line 4`:
> `promiseArray` is an array of promises for saving each of the items to the test database.

Finally, `await Promise.all(promiseArray)`:

>Transforms an array of promises into a single promise, that will be fulfilled once every promise in the array passed to it as an argument is resolved. 

For example, `const results = await Promise.all(promiseArray)`
will return an array that contains the resolved values for each promise in the promiseArray`


3. Problems with `Promise.all` if execution needs to be in series.


`Promise.all` executes the promises it receives in **parallel**. 

If the promises need to be executed in a particular order, this will be problematic. 

```javascript
beforeEach(async () => {
  await Note.deleteMany({})

  for (let note of helper.initialNotes) {
    let noteObject = new Note(note)
    await noteObject.save()
  }
})
```
4. Using Mongoose's `insertMany()`

```javascript
beforeEach(async () => {
  await Note.deleteMany({})
  await Note.insertMany(helper.initialNotes)
})
```