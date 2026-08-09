import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_API_KEY

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='

const getCapitalWeather = (capital) => {
    const request = axios.get(`${baseUrl}${capital}&appid=${api_key}`)
    return request.then(response => response.data)
}

export default {getCapitalWeather}