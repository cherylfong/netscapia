import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import Filter from './components/Filter'
import countryService from './services/countryService'
import Countries from './components/Countries'

function App() {

  const [countries, setCountries] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')

  const [newFilter, setNewFilter] = useState('')

  const [matches, setMatches] = useState([])

  useEffect(() => {
    console.log('effect run: getAll')

    if (!countries) {
      console.log('fetching countries...')
      countryService
        .getAll()
        .then(allCountries => {
          console.log('getAll promise fulfilled')
          setCountries(allCountries)
        })
    }

  }, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setSearchTerm(newFilter.trim().toLowerCase())

    console.log (`newFilter is ${newFilter}`)

    const m_temp = countries
      .filter(c => c?.name?.common?.toLowerCase().includes(searchTerm))
      .map(c => ({ name: c.name.common, capital: c.capital, area: c.area, flag: c.flag, languages: c.languages, flagImage: c.flags.png })) 

    setMatches(m_temp)

  }



  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
      </section>
      <div className="ticks"></div>
      <section id="spacer"></section>

      <Filter onSearch={onSearch} newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <div className="ticks"></div>
      <section id="spacer"></section>

      <Countries result={matches} />

      {/* <pre>
        {JSON.stringify(countries, null, 2)}
      </pre> */}

    </>
  )
}

export default App
