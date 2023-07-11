/* 
 *  Notes for Part 1 (a): https://fullstackopen.com/en/part1/introduction_to_react
 */

import logo from './logo.svg';
import './App.css';

// React State Hook
//
// import the userState function
// https://react.dev/learn/state-a-components-memory
import {useState} from 'react';


const DisplayGarb = ({garbItem, randnum}) => {
  
  console.log( "RANDNUM is " , randnum() )
  return(    
    <>
      <p>Thank you for the trash!</p>
      <img src={garbItem[randnum]}></img>
    </>
  )
}

// TODO: setCounter object cannot be a global object; hence can only be passed, however this passed object is a copy or a reference to the original. Therefore when setCounter is set to zero, the original counter is not reset.
// TODO: the html in the return closure is not returning; this may be to do with async requests and states
// listens to mouse clicks for trash
const GiveTrash = ( setCounter ) => {

  setCounter()

  console.log("CLICKED ME")

  const garbItem = ['/bananapeel.png', '/dirtpile.jpeg', 'plasticbottle.png']

  const randnum = () => Math.floor(Math.random() *3 )

  console.log( randnum() )
  console.log( garbItem[randnum()] )
  
  return(
    <DisplayGarb garbItem={garbItem} randnum={randnum}/>
  );

}


// counts per second 
const TimedCounterDisplay = ({counter, setCounter}) => {

  // increment counter
  // timeout set to 1 second
  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  // Every time the setCounter modifies the state it causes the component to re-render

  return (
    <div>Counting every second for more trash... {counter}
    <img src='https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjgyanc1N21hZW9qczBmaG9kd25idWpzZ2Y3anhreGMxdjM0andxaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aasBMkWpXsZUu58az4/giphy.gif' width={250} ></img>
    </div>
    
    )

}

// creates a list
const Lister = () => {

  const garbs = ['junk', 'rust', 'dump', 'goo', 'slime', 'yuck']

  // destructuring assignment
  const [first, second, ...rest] = garbs

  // console.log(first, second)
  // console.log(rest)          

  let garbsList = garbs.map(val => '<li>' + val + '</li>')

  const listString = Array.from(garbsList).map((value) => `${value}`).join('');

  return (
    <div dangerouslySetInnerHTML={{ __html: listString }} />
  )
}

// some trashy math
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
const Footer = ({counter, setCounter}) => {

  return [
    <p>Created by <a href="https://en.wikipedia.org/wiki/Oscar_the_Grouch">Oscar</a>.</p>,
    <Trademark />,
    <TimedCounterDisplay counter={counter} setCounter={setCounter}/>
  ]

}

// another React component
const Garbage = (props) => {
  // console.log(props)
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
  const now = new Date()

  // destructuring value from the userState object
  // initialize state to value zero
  // counter is set to 0; state at 0 
  const [ counter, setCounter ] = useState(0)

  const resetCounter = () => setCounter(0)

  const a = 300
  const b = 500
  // console.log(a + b)

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
          <Lister/>
        </ul>

        <img src="/trashpile.png"></img>

        <button onClick={ () => { GiveTrash(resetCounter) } }>Give Oscar Trash</button>


        <p>Contributed by {contributors}.</p>

      </header>

      <Footer counter={counter} setCounter={setCounter}/>

    </div>

  );
}

export default App;
