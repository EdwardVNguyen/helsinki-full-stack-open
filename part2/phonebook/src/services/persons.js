import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

// get all data from JSON server and send base the data portion
const getAll = () => {
  const request = axios.get(baseUrl)

  return request.then(response => response.data)
}

// send object to JSON server to be saved
const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const deleteObject = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

const updateObj = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, deleteObject, updateObj }
