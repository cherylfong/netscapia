/* 
 *  Notes for Part 1 (a): https://fullstackopen.com/en/part1/introduction_to_react
 */

import logo from './logo.svg';
import './App.css';

const Trademark = () => {
  return (
    <>
      <footer>
        <p>&exist; &infin; trash 🗑️  </p>
      </footer>
    </>
  )
}

// an array of JSX elements or components
// instead of using an outermost div-element
const Footer = () => {

  return [
    <p>Created by <a href="https://en.wikipedia.org/wiki/Oscar_the_Grouch">Oscar</a>.</p>,
    <Trademark />
  ]

}

// another React component
const Garbage = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name} </p>
      <img src="https://media2.giphy.com/media/erhLUWfTMQTF6l3qw4/giphy.gif?cid=ecf05e472sj8xiav5wsjv4yhwk45f7z4ug93x4rphf7ir4ql&ep=v1_gifs_gifId&rid=giphy.gif"></img>
    </div>
  )
}


// a React component
// the first letter of component names need to be Capitalized
function App() {
  console.log('hello world! - App() component')
  const now = new Date()

  const a = 300
  const b = 500
  console.log(a + b)

  var value = "World !"

  const trash = [
    { name: 'paper bits', count: 5 },
    { name: 'scrap', count: 10 },
    { name: 'dust', count: 10000 },
  ]

  const contributors = ['Oscar', " & Oscar's friends"]

  return (

    // this is not HTML, it is JSX
    // JSX returned by a React component is compiled into Javascript

    // JSX is similar to Jinja (templating)
    // Jinja is server side (good for static webpages) while JSX is client side

    // JSX elements must have a closing tag e.g. <br/>

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        <p>Today is {now.toTimeString()}</p>
        <p>{now.toDateString()}</p>

        <Garbage name={value} />

        <h4>Garbage contents:</h4>
        <ul>
          <li>{trash[0].count} of {trash[0].name}</li>
          <li>{trash[1].count} pieces of {trash[1].name}</li>
          <li>{trash[2].count} of {trash[2].name}</li>
        </ul>

        <img src="/trashpile.png"></img>

        <p>Contributed by {contributors}.</p>

      </header>

      <Footer />

    </div>

  );
}

export default App;
