import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

/**
 * Gets all the countries.
 */
const getAll = () => {

    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => {
        // console.log(response.data)
        return response.data
    })
}
/**
 * Returns a country object.
 */
const getCountry = (countryName) => {
    const request = axios.get(`${baseUrl}/name/${countryName}`)
    return request.then(response => {
        return response.data
    })
}
export default {getAll, getCountry}