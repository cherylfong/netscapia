import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

/* 
 * Return all resource from the server
 */
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

/**
 * Create new person resource
 */
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

export default { getAll, create }