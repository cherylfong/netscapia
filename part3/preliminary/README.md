## Part 3

This is part 3 of the fullstack open course by https://studies.cs.helsinki.fi 

Excerpt:
> ... implementing functionality on the server side of the stack (i.e.) a simple REST API in Node.js by using the Express library, and the application's data will be stored in a MongoDB database. At the end of this part, ... deploy our application to the internet.

The sections below are notes I consider important per each segment of the guided part 3.

### Part 3 sub a. | Node.js and Express

Although possible to implement server code directly with Node's built-in http server, scaling will be difficult.

Express offers easy to use interface to work with the built-in http module and  improved abstraction and to build server side implementation.

```bash
npm install express
```

The `node_modules` directory contains the express source code and related dependencies including their dependencies, also known as transitive dependencies. 

`"express": "^5.1.0"`The caret is a part of a versioning model called semantic versioning. The caret means that the package will be at least the version number specified. 

Dependencies are updated with `npm update`.

To use the project in a new development environment, use `npm install` to install everything required at the specified version.

Newever updates greater than e.g. 2.0 such as 2.1 will be backwards compatible. However, future versions such 3.0 may no longer work with 2.9 and below. These are arbitrary numbers for illustration. Key point is the major version number, i.e. the whole number, not the digits right of the decimal. 

> It's worth noting that `JSON` is a data format. However, it's often represented as a `string`and is **not the same as a JavaScript object**, like the value assigned to notes.

```js
$ node
Welcome to Node.js v25.8.0.
Type ".help" for more information.
> person = {name: 'jam', age: 2}
{ name: 'jam', age: 2 }
> typeof person
'object'
> const json = JSON.stringify(person)
undefined
> json
'{"name":"jam","age":2}'
> typeof json
'string'
>
```

##### Automatic Change Tracking

`node --watch index.js`

Restarts application whenever there are changes to the code. But requires manual browser reload. 

When adding a custom script command in `package.json`, such as `"dev": "node --watch index.js"`, the keyword `run` is required as a commandline argument such as:

```bash
npm run dev
```

#### REST | Representational State Transfer

Architectural style for building scalable web applications.

Resources - singular information type.

Every resource has an associated URL (unique address).

For example, the resource type `notes` with the identifier 10 can be located at `example.com/api/notes/10`.

The address location for the entire collection would be at `example.com/api/notes`

```md
URL 	verb 	functionality
notes/10 	GET 	fetches a single resource
notes 	GET 	fetches all resources in the collection
notes 	POST 	creates a new resource based on the request data
notes/10 	DELETE 	removes the identified resource
notes/10 	PUT 	replaces the entire identified resource with the request data
notes/10 	PATCH 	replaces a part of the identified resource with the request data
```

REST is a *uniform interface*, a consistent structure that allows systems to cooperate.

> This way of interpreting REST falls under the second level of RESTful maturity in the Richardson Maturity Model. According to the definition provided by Roy Fielding, we have not defined a REST API. In fact, a large majority of the world's purported "REST" APIs do not meet Fielding's original criteria outlined in his dissertation. 
>
> In some places (see e.g. Richardson, Ruby: RESTful Web Services) you will see our model for a straightforward CRUD API, being referred to as an example of resource-oriented architecture instead of REST. We will avoid getting stuck arguing semantics and instead return to working on our application.

##### DELETE Request

Using `curl` from the commandline
`curl -X DELETE http://localhost:3001/api/notes/1`

Using Postman is more interactive via GUI.

#### HTTP Request Types

Safety - NO SIDE EFFECTS to database state as a result of a request or response.

> Nothing can ever guarantee that a GET request is safe...


**HEAD** request - Same as GET request except it only returns status code and response headers (body of the response is not returned).

**HEAD** request is consider safe.

All HTTP requests except **POST** should be idempotent:

    Methods can also have the property of "idempotence" in that (aside from error or expiration issues) the side-effects of N > 0 identical requests is the same as for a single request.
    
    The methods GET, HEAD, PUT and DELETE share this property.

Similarly, idempotence is a HTTP standard recommendation and is not guaranteed.

Thus, adhere to the RESTful principles. To maintain safe and idempotent requests.

> POST is neither safe nor idempotent.

#### Middleware

Reference: 
https://expressjs.com/en/guide/using-middleware.html 

Middleware are functions that have access to the: 

1. request object
1. response object
1. next middleware function in the application's resquest-response cycle, denoted by variable name `next` 


##### Middleware USAGE NOTES

1. Middleware functions are called **in the order that they're encountered** by the JavaScript engine. 
1. Middleware functions have to be used before routes when we want them to be executed by the route event handlers.
    > Sometimes, we want to use middleware functions after routes. We do this when the middleware functions are only called if no route handler processes the HTTP request.
    > For example, catching non-existent routes.


e.g. **Express** is a routing and middleware web framework.

> An Express application is **essentially a series of middleware function calls**.

### Part 3 sub b. | Deploying an App to the Internet

##### CORS | Cross Origin Resource Sharing

The same-origin policy is a security mechanism implemented by browsers in order to **prevent session hijacking** among other security vulnerabilities.

In order to enable legitimate cross-origin requests (requests to URLs that don't share the same origin) W3C came up with a mechanism called CORS(Cross-Origin Resource Sharing). According to Wikipedia:

    Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources (e.g. fonts) on a web page to be requested from another domain outside the domain from which the first resource was served. A web page may freely embed cross-origin images, stylesheets, scripts, iframes, and videos. Certain "cross-domain" requests, notably Ajax requests, are forbidden by default by the same-origin security policy.

The problem is that, by default, the JavaScript code of an application that runs in a browser can only communicate with a server in the same origin. For example, if the backend localhost is on port 3001, while the frontend is in localhost port 5173, they do not have the same origin.

Reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS


##### Production Notes

A version of the application that is optimized for production does not expose application errors to the end user.

A production build for applications created with Vite can be created with the command `npm run build`.

This creates a _dist_ directory in the root of the project. It contains the minified version of the application:

- An HTML file of the application (index.html) and directory assets
> All of the JavaScript will be minified into one file. All of the code from all of the application's dependencies will also be minified into this single file.

### Part 3 sub c. | Saving Data to MongoDB

#### Mongoose

Document databases are schemaless, i.e., the database does not have strict structure of data stored. It is possible to store documents with completely different fields in the same collection.

Mongoose allows storing data in a schema format at the application level which defines structure of documents stored in any given collection.

> Unfortunately the Mongoose documentation is not very consistent, with parts of it using callbacks in its examples and other parts, other styles, so it is not recommended to copy and paste code directly from there.
>
> Mixing promises with old-school callbacks in the same code is not recommended.

##### Note to self about Mongose

Even though the `_id` property of Mongoose objects looks like a string, it is in fact an **object**. 

The toJSON method defined in `note.js`:

```javascript
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
```

Transforms `_id` into a string for convenience.

`"2"` is not a valid string cast to ObjectId when using Mongoose `findById()` method. A valid string is composed of this many digits `6a7ae2b66397f71ade48a490`

What it looks like on MongoDB Atlas:

```json
_id : ObjectId('6a7ae2b66397f71ade48a490')
content : "the sky is blue"
importance : true
__v: 0
```
For example, when performing a GET request from the URL `http://localhost:3001/api/notes/6` will cause the server to crash with the following error:

```bash
...node_modules/mongoose/lib/schema/objectId.js:252
    throw new CastError('ObjectId', value, this.path, error, this);
          ^

CastError: Cast to ObjectId failed for value "6" (type string) at path "_id" for model "Note"
    at SchemaObjectId.cast
    .
    .
    .
  stringValue: '"6"',
  messageFormat: undefined,
  kind: 'ObjectId',
  value: '6',
  path: '_id',
  reason: BSONError: input must be a 24 character hex string, 12 byte Uint8Array, or an integer
      at new ObjectId
      .
      .
      .
  valueType: 'string'
}

Node.js v25.8.0
```
Becuase it is expecting a string in this format:

`http://localhost:3001/api/notes/6a7ae2b66397f71ade48a490`

### Part 3 sub d. | ESLint or Linting

Linting - ... any tool that detects and flags errors in programming languages, including stylistic errors. The term lint-like behavior is sometimes applied to the process of flagging suspicious language usage. Lint-like tools generally perform static analysis of source code.

**Setup Summary**

1. Install packages: `npm install eslint @eslint/js @stylistic/eslint-plugin --save-dev`

1. Install VSCode ESLint extension.

1. Add this to `package.json` for convenience to lint all files in the root directory

```json
{
  // ...
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js",
    "test": "echo \"Error: no test specified\" && exit 1",
    "lint": "eslint ."
    // ...
  },
  // ...
}
```

**Setup Summary continued...**

1. Generate a lint configuration file: `npx eslint --init`

1. Look at suggested course lint configuration or use Airbnb lint configuration: https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb 

1. Lint a specific file: `npx eslint index.js`

**Suggested course ESLint configuration:**

```javascript
import globals from 'globals'
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin'

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
      ecmaVersion: 'latest',
    },
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
    },
  },
  {
    ignores: ['dist/**'],
  },
]
```