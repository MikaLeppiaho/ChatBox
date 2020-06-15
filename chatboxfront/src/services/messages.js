//Tämä moduuli lähettää REST kyselyt palvelimelle.
import axios from 'axios'
const baseUrl = '/api/messages'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAllMessages = () => {
    const request = axios.get(baseUrl)
    
    return request.then(response => {
        return response.data
    })
}

const createMessage = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

export default {
    getAllMessages,
    createMessage,
    setToken
}