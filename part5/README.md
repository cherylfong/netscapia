This is part 5 of the fullstack open course by <https://studies.cs.helsinki.fi>

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

### Part 5 sub c. Testing React apps

**Setup**:

1. `npm install --save-dev vitest jsdom`

`jsdom` simulates the bowser

1. `npm install --save-dev @testing-library/react @testing-library/jest-dom`
2. Add to `package.json` :

```json
{
  "scripts": {
    // ...
    "test": "vitest run"
  }
  // ...
}
```

1. Add to `vite.config.js` :

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

1. `npm install --save-dev @testing-library/user-event`

This is used to simulate user input.

1. `npm test -- --coverage`

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

### Part 5 sub d. End to end testing

Part 4 tested the backed on the API level using integration tests.

While Part 5 sub c. tested the frontend components individually using unit tests.

**End to End (E2E)** tests is one way to test the system as a whole.

Testing libraries and tools:

1. [Selenium](http://www.seleniumhq.org/)
1. Headless browsers (no GUI) i.e. Chrome.
1. [Playwright](https://playwright.dev/)
1. [Cypress](https://www.cypress.io/)

E2E test the system through the same interface as real users use.

Configuring E2E tests is more challenging than unit or integration tests.

E2E usually has slow execution depending on how big the system is. This can be impractical for development because it is beneficial to run tests as often as possible in case of code [regressions](https://en.wikipedia.org/wiki/Regression_testing).

Cypress tests are run entirely within the browser.

Playwright tests are executed in the Node process, which is connected to the browser via programming interfaces.

#### Initializing Tests | Setting Up Playwright

E2E tests do not need to be located in the same `npm` project where the application code is.

1. In a new directory run,

`npm init playwright@latest`

```bash
 npm init playwright@latest
Need to install the following packages:
create-playwright@1.17.139
Ok to proceed? (y) y

> npx
> 'create-playwright'

Getting started with writing end-to-end tests with Playwright:
Initializing project in '.'
✔ Do you want to use TypeScript or JavaScript? · JavaScript
✔ Where to put your end-to-end tests? · tests
✔ Add a GitHub Actions workflow? (Y/n) · false
✔ Install Playwright browsers (can be done manually via 'npx playwright install')? (Y/n) · false
✔ Install Playwright operating system dependencies (requires sudo / root - can be done manually via 'sudo npx playwright install-deps')? (y/N) · true
Initializing NPM project (npm init -y)…
Wrote to /home/puggle/github/cherylfong-github/netscapia/part5/notes-e2e/package.json:

{
  "name": "notes-e2e",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs"
}


Installing Playwright Test (npm install --save-dev @playwright/test)…

added 3 packages, and audited 4 packages in 6s

found 0 vulnerabilities
Installing Types (npm install --save-dev @types/node)…

added 2 packages, and audited 6 packages in 3s

found 0 vulnerabilities
Writing playwright.config.js.
Writing tests/example.spec.js.
Writing package.json.
✔ Success! Created a Playwright Test project at /home/puggle/github/cherylfong-github/netscapia/part5/notes-e2e

Inside that directory, you can run several commands:

  npx playwright test
    Runs the end-to-end tests.

  npx playwright test --ui
    Starts the interactive UI mode.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright codegen
    Auto generate tests with Codegen.

We suggest that you begin by typing:

    npx playwright test

And check out the following files:
  - ./tests/example.spec.js - Example end-to-end test
  - ./playwright.config.js - Playwright Test configuration

Visit https://playwright.dev/docs/intro for more information. ✨

Happy hacking! 🎭
```

2. Download playwright specific browser support e.g. firefox and chromium.

```bash
npx playwright install firefox

BEWARE: your OS is not officially supported by Playwright; downloading fallback build for ubuntu24.04-x64.
Downloading Firefox 153.0 (playwright firefox v1538) from https://cdn.playwright.dev/dbazure/download/playwright/builds/firefox/1538/firefox-ubuntu-24.04.zip
108.2 MiB [====================] 100% 0.0s
Firefox 153.0 (playwright firefox v1538) downloaded to /home/puggle/.cache/ms-playwright/firefox-1538
BEWARE: your OS is not officially supported by Playwright; downloading fallback build for ubuntu24.04-x64.
Downloading FFmpeg (playwright ffmpeg v1011) from https://cdn.playwright.dev/dbazure/download/playwright/builds/ffmpeg/1011/ffmpeg-linux.zip
2.3 MiB [====================] 100% 0.0s
FFmpeg (playwright ffmpeg v1011) downloaded to /home/puggle/.cache/ms-playwright/ffmpeg-1011
```

```bash
npx playwright install chromium 

BEWARE: your OS is not officially supported by Playwright; downloading fallback build for ubuntu24.04-x64.
Downloading Chrome for Testing 151.0.7922.34 (playwright chromium v1234) from https://cdn.playwright.dev/builds/cft/151.0.7922.34/linux64/chrome-linux64.zip
184.3 MiB [====================] 100% 0.0s
Chrome for Testing 151.0.7922.34 (playwright chromium v1234) downloaded to /home/puggle/.cache/ms-playwright/chromium-1234
BEWARE: your OS is not officially supported by Playwright; downloading fallback build for ubuntu24.04-x64.
BEWARE: your OS is not officially supported by Playwright; downloading fallback build for ubuntu24.04-x64.
Downloading Chrome Headless Shell 151.0.7922.34 (playwright chromium-headless-shell v1234) from https://cdn.playwright.dev/builds/cft/151.0.7922.34/linux64/chrome-headless-shell-linux64.zip
114.7 MiB [====================] 100% 0.0s
Chrome Headless Shell 151.0.7922.34 (playwright chromium-headless-shell v1234) downloaded to /home/puggle/.cache/ms-playwright/chromium_headless_shell-1234
```

3. Add test command to `package.json`

```json
{
  // ...
  "scripts": {
    "test": "playwright test --project=chromium --project=firefox",
    "test:report": "playwright show-report"
  },
  // ...
}
```

4. Make sure the appropriate browser is defined in `playwright.config.js`:

```javascript
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

```

5. When `npm test` is first executed the example test file used i.e. `tess/example.spec.js`

```bash
npm test

> notes-e2e@1.0.0 test
> playwright test --project=chromium --project=firefox


Running 2 tests using 2 workers
  2 passed (4.2s)

To open last HTML report run:

  npx playwright show-report
```

6. Using the `test:report` npm command defined in `package.json` to view the playwright report, run

`npm run test:report`

```bash

> notes-e2e@1.0.0 test:report
> playwright show-report


  Serving HTML report at http://localhost:9323. Press Ctrl+C to quit.
```

6. Playwright UI requires chromium browser support even if was executed without the `--project=chromium` flag.

`npx playwright test --project=chromium --project=firefox --ui`

The above is equivalent to `npm run test -- --ui` which is defined in `packages.json`.

**🚨 Continue setup using instructions below ⬇️.**

#### Testing own code | Using Playwright

Steps:

1. For the backend application, edit `package.json`:

```json
"scripts": {
  //

  "start:test": "NODE_ENV=test node --watch index.js"
},
```

2. Run backend application with the `start:test` command:

`npm run start:test`

3. In a new terminal, for the frontend application run:

`npm run dev`

4. Check to make sure that front and back applications are communicating.

5. Using `playwright` for E2E testing, go to the e2d playwright configured project directory and add tests to `/test` with the follwing filename format `note_app.spec.js`

6. When ready to initiate E2E testing, in a new terminal run `npm run test`. The test command is defined in the E2E `package.json` file. 

7. Inspect the generated report at `playwright-report/index.html` or launch using `npx playwright show-report`

8. To speed up the timeout time for failling tests, for example, if an element is not found, a TimeoutError is raisedd and the test fails.

```javascript
export default defineConfig({
  // ...
  timeout: 3000,
  fullyParallel: false,
  workers: 1,  
// ...
})
```

This enables all tests to be [executed one at a time](https://playwright.dev/docs/test-parallel).

The execution of each test starts from the browser's "zero state", all changes made to the browser's state by the previous tests are reset.

#### Run specific tests

Options:

1. `npm test -- -g "contents  of the test string"`

1. using `test.only()` which requires removal from the test code when there is no longer need for it.

#### Test development and debugging

Debugging a test of a specific test title:

1. `npm test -- -g 'name of the test' --debug`

By default, debugging steps through the test commands sequentially. If it is a complex test, it can take many steps to get the test to the point of interest. This can be avoided by using the command `await page.pause()`

Use the Fast Forward green arrow button pointing to the right to fast forward to the line `await page.pause()` instead steping through each command with the green arrow over a dot button.

2. To view the test report with a visual view of the browser for each test command the following command can save the playback of the command trace for each test.

This initiates the test with trace turned on:

`npm run test -- --trace on`

To view the report, run:

`npx playwright show-report` OR `npm run test:report` which is defined in the `package.json` for the E2E project directory.

3. Playwright Locator GUI

Inspecting an element via the debug GUI can be done using the double circle or bullseye icon. The playwright _Locator_ in the bottom panel of the debug GUI suggests element locator or element selector identity for targeting the specific element that is clicked on when the bullseye icon is enaged.

For example, to target the _make important_ button of note:

Playwright _Locator_ states `page.locator('li').filter({ hasText: 'some note' }).getByRole('button')`

While is it also possible to select the button with `page.getByText('first note').locator('..').getByRole('button', { name: 'make not important' })`

4. [Playwright Test Generator](https://playwright.dev/docs/codegen-intro)

The generator can be initiated using:

`npx playwright codegen http://localhost:5173/`

When the Record mode is on, the test generator "records" the user's interaction in the Playwright inspector, from where it is possible to copy the locators and actions to the actual test scripts.

#### Playwright References

- [Intro documentation](https://playwright.dev/docs/intro)
- [Locators](https://playwright.dev/docs/locators) to find elements for testing
- [Actions](https://playwright.dev/docs/input) are used to simulate interactions with the browser in tests
- [Assertions](https://playwright.dev/docs/test-assertions) are types of test expectations
- [Page class](https://playwright.dev/docs/api/class-page) corresponds to the test browser window

### Part 5 sub e. React Router and UI Frameworks

#### [React Router](https://reactrouter.com/)

Install via `npm install react-router-dom`

`BrowserRouter` uses the [HTML5 History API](https://css-tricks.com/using-the-html5-history-api/) to allow the URL in the browser's address bar to be used for internal "routing" within a React application.

Page content is manipulated solely through JavaScript, and the browser does not load new content from the server. However, the usual browser behavior for going back and forth different addresses and bookmarking works just like [traditional](https://fullstackopen.com/en/part0/fundamentals_of_web_apps#traditional-web-applications) websites (i.e. ones that send a new HTTP GET request per page and renders a new page).

The JavaScript code executed in the browser creates the illusion of different "pages." If HTTP requests are made when changing views, they are used solely to fetch JSON-formatted data that may be required to display the new view.
