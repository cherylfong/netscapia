import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import Filter from './components/Filter'
import Countries from './components/Countries'

import countryService from './services/countryService'
import weatherService from './services/weatherService'


function App() {

  const [countries, setCountries] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')

  const [newFilter, setNewFilter] = useState('')

  const [matches, setMatches] = useState([])

  const [weather, setWeather] = useState(null)

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

  const getMatches = (term) => {
    const normalizedTerm = term.trim().toLowerCase()

    if (!countries || normalizedTerm === '') {
      return []
    }

    return countries
      .filter(c => c?.name?.common?.toLowerCase().includes(normalizedTerm))
      .map(c => ({
        name: c.name.common,
        capital: c.capital,
        area: c.area,
        flag: c.flag,
        languages: c.languages,
        flagImage: c.flags.png
      }))
  }

  const onSearch = (event) => {
    event.preventDefault()
    const normalizedSearch = newFilter.trim().toLowerCase()
    setSearchTerm(normalizedSearch)

    console.log(`newFilter is ${newFilter}`)

    setMatches(getMatches(normalizedSearch))
  }

  const toggleShowOne = (param) => {
    console.log('Selected country: ', param)
    const normalizedTerm = String(param).trim().toLowerCase()
    setSearchTerm(normalizedTerm)
    setMatches(getMatches(normalizedTerm))
  }

  useEffect(() => {
    console.log('searchTerm changed:', searchTerm)
  }, [searchTerm,])

  useEffect(() => {
    console.log('Match is now', matches)
    if (matches.length == 1) {

      weatherService
        .getCapitalWeather(matches[0].name)
        .then(weatherObject => {
          console.log('weather object is', weatherObject)
          setWeather(
            {
              temp: weatherObject.main.temp,
              icon: weatherObject.weather[0].icon,
              wind: weatherObject.wind.speed
            }
          )
        })

    }
  }, [matches])

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

      <Countries result={matches} toggleShow={toggleShowOne} weather={weather} />

      {/* <pre>
        {JSON.stringify(countries, null, 2)}
      </pre> */}

    </>
  )
}

export default App
