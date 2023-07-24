/**
 * Shows the main body content of a search result.
 */
import WorldService from "../service/WorldService"
import Country from "./Country"
import { useEffect } from "react"
import ErrorDisplay from "./ErrorDisplay"
import WeatherService from "../service/WeatherService"
import Weather from "./Weather"

// inspectName is the country name in an array e.g. ["USA"]
const Body = ({ inspect, setInspect, inspectName, setErrorMessage, errorMessage, weather, setWeather, isCountryRendered, setIsCountryRendered }) => {

    useEffect(() => {

        if (inspectName[0] !== undefined) {

            WorldService
                .getCountry(inspectName[0])
                .then(country => {

                    setInspect(country)

                })
                .then( () => {

                    setIsCountryRendered(true)

                })
                .catch(error => {
                    setErrorMessage(error)
                })

        }
    }, [inspectName])


    return (
        <>
            <ErrorDisplay setErrorMessage={setErrorMessage} errorMessage={errorMessage} duration={5000} />
            {
                inspect !== null && <Country.CountryDetails country={inspect} />
            }
            { isCountryRendered && < WeatherDisplay setIsCountryRendered={setIsCountryRendered} weather={weather} setWeather={setWeather} inspect={inspect}/> }
        </>
    )

}

const WeatherDisplay = ({setIsCountryRendered, weather, setWeather, inspect}) => {

    useEffect( () => {
        
        WeatherService
            .getWeather(inspect.capital)
            .then(weatherData => {
                setWeather(weatherData)
            })
            .catch(error => {
                console.log(error)
            })

    },[])

    return (
        <>
            { weather !== null && <Weather weather={weather}/> }
        </>
    )

}

export default Body

