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