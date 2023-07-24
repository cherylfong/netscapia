/**
 * An input field to search for countries through all save country names.
 */
import Country from "./Country"
import Notification from "./Notification"
import ErrorDisplay from "./ErrorDisplay"
import { useEffect } from "react"

const Search = ({ newSearch, setNewSearch, countries, setErrorMessage, errorMessage, notifyMessage, setNotifyMessage, setInspectName, inspectName, setInspect, setIsCountryRendered}) => {

    // get an array that matches the lowercase search term with country's common name in lowercase
    const filterCountries = countries.filter(
        country => {
            country = country.common.toLowerCase()
            return country.includes(newSearch)
        }
    )


    const handleSearch = (event) => {

        setInspect(null)

        setIsCountryRendered(false)

        if (filterCountries.length > 10) {

            setNotifyMessage("Type more letters to search!")
        }


        const searchLowerCase = (event.target.value).toLowerCase()

        setNewSearch(searchLowerCase)
    }

    return (
        <>
            <form>
                <label>Find Countries: </label>
                <input value={newSearch} onChange={handleSearch} />
            </form>
            <Notification notifyMessage={notifyMessage} setNotifyMessage={setNotifyMessage} duration={2000} />
            <ResultCount filterCountries={filterCountries} notifyMessage={notifyMessage} />
            <SearchDisplay filterCountries={filterCountries} setNotifyMessage={setNotifyMessage} notifyMessage={notifyMessage} setInspectName={setInspectName} newSearch={newSearch} inspectName={inspectName} setIsCountryRendered={setIsCountryRendered} />
        </>
    )
}

const ResultCount = ({ filterCountries, notifyMessage }) => {

    return filterCountries.length > 1 || filterCountries.length === 0 ? <h3>Results: {filterCountries.length}</h3> : null

}

const SearchDisplay = ({ filterCountries, setNotifyMessage, notifyMessage, setInspectName, newSearch, inspectName,setIsCountryRendered }) => {

    const handleCountrySelect = (name) => {

        // remember this takes an array!!!
        setInspectName([name])
        setIsCountryRendered(false)
    }


    // update setInspectName only when newSearch changes!
    useEffect(() => {

        if (filterCountries.length < 2) {

            setInspectName(() => filterCountries.map(
                country => country.common
                )
            )
            return () => { }
        }

    }, [newSearch])

  
    if (filterCountries.length < 11 && filterCountries.length !== 1) {

        return (
            filterCountries.map((country, i) =>
                <Country.CountrySelect key={i} country={country} handleCountrySelect={() => handleCountrySelect(country.common)} />)
        )
    } else {

        return () => { }; // no-op
    }

}

export default Search