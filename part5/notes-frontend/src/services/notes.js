import axios from 'axios'

// when in production with dist directory generated
const baseUrl = '/api/notes'

// when initiated in development 
//const baseUrl = 'http://localhost:3001/api/notes'

// when using the json development server
// const baseUrl = 'http://localhost:3001/notes'

let token = null
const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    //   const nonExisting = {
    //     id: 10000,
    //     content: 'This note is not saved to server',
    //     important: true,
    //   }
    //   return request.then(response => response.data.concat(nonExisting))
    return request.then(response => response.data)
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, update, setToken }