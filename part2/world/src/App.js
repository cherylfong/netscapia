/**
 * 2.18 Create an application that allows viewing country details. Provide search by common name and only display results if the total return results are 10 countries. When only one country matches the search term, display the details of the country.
 * 
 * 2.19 Allow selecting a country from the search results that will display the country's details.
 * 
 */

import logo from './logo.svg';
import './App.css';

import {useState, useEffect} from 'react'

import WorldService from './service/WorldService'
import Search from './components/Search'
import Raw from './components/Raw'
import Body from './components/Body'
import ErrorDisplay from './components/ErrorDisplay'

function App() {

  // the entire list of countries
  const [countries, setCountries] = useState([])

  // search term
  const [newSearch, setNewSearch] = useState("")

 
  // track notification message state
  const [notifyMessage, setNotifyMessage] = useState(null)

 
  // track error message state
  const [errorMessage, setErrorMessage] = useState(null)


  // the current selected country
  // either found through search (as the singular search result) or country is clicked for details
  //
  // user "inspect"(s) the selected country
  //
  // inspect is a singular country object 
  const [inspect, setInspect] = useState(null)
  // 
  // only the string name of the country in a single element array
  const [inspectName, setInspectName] = useState([])

  useEffect(() => {
    WorldService
      .getAll()
      .then(allCountries => {
        setCountries(
          allCountries.map(country =>
            country.name)
        )}
        
      )
      .catch(error => {
        setErrorMessage(error)
        })
    }
  , [])

  return (
    <>
      <ErrorDisplay errorMessage={errorMessage} setErrorMessage={setErrorMessage} duration={5000}/>

      <Search newSearch={newSearch} setNewSearch={setNewSearch} countries={countries} setErrorMessage={setErrorMessage} errorMessage={errorMessage} notifyMessage={notifyMessage} setNotifyMessage={setNotifyMessage} setInspectName={setInspectName} inspectName={inspectName} setInspect={setInspect}/>

      <Body inspect={inspect} setInspect={setInspect} inspectName={inspectName} setErrorMessage={setErrorMessage} errorMessage={errorMessage}/>
    </>
  )
}

export default App;
