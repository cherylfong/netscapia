# Part 1 Notes

In addition to comments found in: [`part1/preliminary/src/App.js`](part1/preliminary/src/App.js)

Listed in order of parsing the material.

1. ECMAScript  a standard for scripting languages, including JavaScript, JScript, and ActionScript. 

1. ECMA-262: ECMAScript® 2023 language specification is the 14th edition,, released in June 2023.

1. Transpilation (newer version to older) is automatically configured in React applications created with `create-react-app` through [Babel](https://babeljs.io/).

1. Node.js is a JavaScript runtime environment based on Google's Chrome V8 JavaScript engine.

1. Have the latest Chrome browser to handle new features of JavaScript "usually".

1. Important to understand & be aware of JavaScript features. It is a loosely typed language.

1. `var` keyword is used to define scope for variables within a function. Advised to understand when to use `var`, `let`, and `const`. [[ref](https://medium.com/craft-academy/javascript-variables-should-you-use-let-var-or-const-394f7645c88f)][[ref](http://www.jstips.co/en/javascript/keyword-var-vs-let/)]

1. Use `let` and avoid `var` for the purpose of this course.

1. A `const` initialized array is pointing to an array object. Contents of the array object can be mutated. The pointer to the array object is immutable.

1. When using React, techniques from functional programming are often used.

1. A characteristic of the functional programming paradigm is the use of immutable data structures.

1. Preferable to use `concat` to **create** a new array with the added item.

1. JavaScript does not have class mechanisms in the same sense as object-oriented programming languages. JavaScript simulates OOP classes.

1. It is not necessary to define objects with methods when using React Hooks. Hence, it would be redundant to use JavaScript's class syntax.

1. Arrow functions and functions defined using the function keyword vary substantially when it comes to how they behave with respect to the `this` keyword.

1. The value of `this` in JavaScript is defined based on how the method is being called. When calling through a reference, `this` is from the global scope, not from the the object it originates from. It will be undefined if `this` is undefined in the global scope.

1. Use `bind()` and provide the object as the parameter to bind this to the given object. 

1. JavaScript uses Prototypal inheritance. [[ref](https://javascript.info/prototype-inheritance)] [[ref](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes)]

1. JavaScript types: Boolean, Null, Undefined, Number, String, Symbol, BigInt, and Object.

1. Arrow functions should not used as methods for objects because `this` does not work. [[ref](https://egghead.io/courses/understand-javascript-s-this-keyword-in-depth)]
   
1. Arrow functions were introduced in ES6. Syntax: function-name `=` parameter(s) `=>` function-definition.

```Javascript
pfunction = p => p * p
```

Function expression vs Function declaration:

```Javascript
// expression
const average = function(a, b) {
  return (a + b) / 2
}

// declaration
function average(a,b){
    return (a + b) / 2
}
```

Reliable JavaScript sources:

- [Mozilla JS Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Re-Introduction to JS by Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)
- https://javascript.info
- https://github.com/getify/You-Dont-Know-JS 

The above notes was appended onto this README from `npx create-react-app`.

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
