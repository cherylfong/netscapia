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

### Part 4 sub c. | User Administration

#### Test-driven Development (TDD)

Tests for new functionality are written before the functionality is implemented.

#### Mongodb vs Relational DB

 Document databases like Mongo do not support join queries that are available in relational databases, used for aggregating data from multiple tables. However, starting from version 3.2. Mongo has supported [lookup aggregation queries](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/).

 Mongoose offers joining and aggregating data, which gives the appearance of a join query. However, Mongoose makes multiple queries to the database in the background to achieve this operation.

 The Mongoose join is done with the [`populate()`](http://mongoosejs.com/docs/populate.html) method.

 The functionality of the `populate()` method of Mongoose is based on the fact that we have defined `types` to the references in the Mongoose schema with the `ref` option. For example,

 ```javascript
 const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5
  },
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})
 ```

Schema-less databases like Mongo require developers to make far more radical design decisions about data organization at the beginning of the project than relational databases with schemas. On average, relational databases offer a more or less suitable way of organizing data for many applications.

### Part 4 sub d. | Token Authentication

#### Token-based Authentication


1. Expiration Time

The shorter the expiration time of the authentication token, the safer the solution is.

However, requires users to log in more frequently.

2. Saving Tokens by User

Save info about each token to the backend database and to check for each API request if the access rights corresponding to the tokens are still valid. With this scheme, access rights can be revoked at any time. This kind of solution is often called a **server-side session**.

However, increases backend complexity and reduces performance since token validity needs to be check for each API request to the database.

Database access is considerably slower compared to checking the validity of the token itself.

That is why it is quite common to save the session corresponding to a token to a key-value database such as **Redis**, that is limited in functionality compared to eg. MongoDB or a relational database, but extremely fast in some usage scenarios.

For each API request, the server fetches the relevant information about the identity of the user from the database. 

3. Using Cookies instead of an Authorization-header

Cookies are used as the mechanism for transferring the token between the client and the server.

4. Credentials need to travel over HTTPS

Usernames, passwords and applications using token authentication must always be used over HTTPS. Node HTTPS servers requires more configuration.

**Bearer Token**



To retrieve the bearer token:

1. POST credentials to `http://localhost:3001/api/users`.

```json
{ 
    "username": "some-username",
    "password": "some-password"
}
```

2. Copy the string value from the `token` key in the response body:

```json
{
    "token": "eyJhb...",
    "username": "Cabbage",
    "name": "Vegetable"
}
```

3. Using the Postman application.

To POST a new note to `http://localhost:3001/api/notes`:

Select the button `Authorization`, set `Auth Type` as `Bearer Token`, and then add the string from the response body in step 2., i.e., `eyJhb...` into the token input field.

In the request body:

```json
{    "content" : "some interesting content",
    "important" : true
}
```

Then click on the send button in Postman. 