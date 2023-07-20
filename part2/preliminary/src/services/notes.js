import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

// const getAll = () => {
//   return axios.get(baseUrl)
// }

// const create = newObject => {
//   return axios.post(baseUrl, newObject)
// }

// const update = (id, newObject) => {
//   return axios.put(`${baseUrl}/${id}`, newObject)
// }


/* To chain promises in order to catch errors at each step */
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  
  const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }
  
  const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

// module returns an object that has three functions

// export default { 
//   getAll: getAll, 
//   create: create, 
//   update: update 
// }

// Since the names of the keys and the assigned variables are the same:

export default { getAll, create, update }