This is part 5 of the fullstack open course by https://studies.cs.helsinki.fi

### Part 5 sub a. | Login in frontend

#### Storing session token in browser storage

The persistence for a logged in user is done by storing the session token as a key-value in the [browser's local storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage).

Key-value pairs can be acessed from the browser console using: `window.localStorage`.

Although this is convenient it comes with risks.

Token-based authentication should have two aspects in mind, token expiration/validity and token management. Implementing both adds complexity to the server's functionality. This approach is called server-side session.

Saving a token in local storage allow Cross Site Scripting (XSS) attacks. These attacks are when users inject Javascript code using a form that would execute. However, React sanitizes all text that is renders.

The identity of a signed-in user should be saved as `httpOnly` cookies, so that JavaScript code could not have any access to the token. The drawback of this solution is that it would make implementing Single Page  Applications (SPAs) a bit more complex. A separate page for logging in would be needed.

`httpOnly` cookies are not any safer than the use of local storage.

[Reference to minimize XSS Attacks.](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html)

### Part 5 sub b. | Component States

To have two components change state together, best practice is to move their state to their common parent and pass down via props. Ths is known as _lifting state up_ and is considered the most common approaches.

Reference [link](https://react.dev/learn/sharing-state-between-components).

#### References to component functions and members

For example, to access a component's function named `Hello.jsx`:

```javascript

import { useState, useImperativeHandle } from 'react'

const Hello = (props) => {  
const [greeting, setGreeting] = useState('')

.
.
.

  const makeHello = (someWords) => {
    setGreeting(someWords)
  }

  useImperativeHandle(props.ref, () => {
    return { makeHello }
  })
  .
  .
  return (
    <div>
        <p> Message is: {greeting}</p>
    </div>
  )

  export default Hello
}
```

So that `makeHello()` can be used wherever needed like so:

```javascript

const App = () => {

import { useRef } from 'react'

const helloRef = useRef()

return (
    <div>
        <Hello ref={helloRef}>
    </div>
)
}
```

Each instance of a component has its own internal state. This state is not shared between different instances of the same component type. This is like creating two separate objects from the same class: each object keeps its own values, even though they were created from the same template.

#### Frontend Testing

**Setup**:

1. `npm install --save-dev vitest jsdom`

`jsdom` simulates the bowser

2. `npm install --save-dev @testing-library/react @testing-library/jest-dom`
3. Add to `package.json` :

```json
{
  "scripts": {
    // ...
    "test": "vitest run"
  }
  // ...
}
```

4. Add to `vite.config.js` :

```json
export default defineConfig({
  // ...
  test: {
    environment: 'jsdom',
    globals: true, // no need to import keywords such as describe, test and expect into the tests
    setupFiles: './testSetup.js', 
  }
})
```

Create a file named _testSetup.js_ and save it to the root directory of the project:

```javascript
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

afterEach(() => {
  cleanup()
})
```

5. `npm install --save-dev @testing-library/user-event`

This is used to simulate user input.

6. `npm test -- --coverage`

Pick yes to install dependencies.

```bash
> notes-2026@0.0.0 test
> vitest run --coverage

 MISSING DEPENDENCY  Cannot find dependency '@vitest/coverage-v8'

✔ Do you want to install @vitest/coverage-v8? … yes

> notes-2026@0.0.0 test
> vitest run --coverage

# Example output

 RUN  v4.1.11 /home/puggle/github/cherylfong-github/netscapia/part5/notes-frontend
      Coverage enabled with v8

 ✓ src/components/Note.test.jsx (2 tests) 139ms
 ✓ src/components/Togglable.test.jsx (4 tests) 199ms
 ✓ src/components/NoteForm.test.jsx (1 test) 213ms

 Test Files  3 passed (3)
      Tests  7 passed (7)
   Start at  14:52:58
   Duration  896ms (transform 89ms, setup 286ms, import 143ms, tests 550ms, environment 1.13s)

 % Coverage report from v8
---------------|---------|----------|---------|---------|-------------------
File           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
---------------|---------|----------|---------|---------|-------------------
All files      |      95 |    83.33 |    87.5 |     100 |                   
 Note.jsx      |     100 |       50 |     100 |     100 | 2                 
 NoteForm.jsx  |     100 |      100 |     100 |     100 |                   
 Togglable.jsx |   88.88 |      100 |      75 |     100 |                   
---------------|---------|----------|---------|---------|-------------------
```

A HTML report will be generated to the _coverage_ directory.

##### React Testing Render

Normally React components are rendered to the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model).

`render(<Note note={note} />)`

The [render](https://testing-library.com/docs/react-testing-library/api#render) method  used renders the components in a format that is suitable for tests without rendering them to the DOM.

It is also possible to use CSS-selectors to find rendered elements by using the method `querySelector()` of an object container.

##### Mock objects and functions

1. [`vi.fn()`](https://vitest.dev/api/mock)
1. [`mock.calls`](https://vitest.dev/api/mock#mock-calls) -- used to save calls to the mock function

are commonly used stub components in testing that are used for replacing dependencies of the components being tested. Mocks make it possible to return hardcoded responses, and to verify the number of times the mock functions are called and with what parameters.

#### Frontend Integration Tests

The backend testing done in Part 4 were integration tests.

Integration testing involves a collaboration of multiple components including mock data from the server which can be considerably more difficult than unit testing.

So far all tests for the frontend in this portion of Part 5 section C are unit tests. These tests validated correct functioning of individual components. Note that even a comprehensive suite of unit tests is not enough to validate that the application works as a whole.

#### Snapshot Testing

Vitest offers [snapshot](https://vitest.dev/guide/snapshot) testing which compares HTML code defined by components with HTML code that existed before it was changed.

Changes are categorized as either new functionality or a bug. Snapshot tests notify the if HTML code of the component changes.

The role of the developer is to tell Vitest if the change was desired or undesired. If the change to the HTML code is unexpected, it strongly implies a bug, and the developer can become aware of these potential issues easily.
