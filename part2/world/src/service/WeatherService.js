import axios from 'axios'

const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q='

const apiKEY = process.env.REACT_APP_WEATHER_API_KEY

const apiQuery = '&appid='

// get weather object for a country's capital
// capital is a string of a country's capital name
const getWeather = (capital) => {

    const queryURL = baseURL
        .concat(
            capital,
            apiQuery,
            apiKEY
        ) 

    const request = axios.get(queryURL)
    return request.then(response => {
        return response.data
    })

}

export default {getWeather}