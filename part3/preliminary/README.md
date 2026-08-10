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