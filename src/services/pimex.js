import axios from 'axios'
import config from '../../config.json'

const baseUrl = config.pimexApi.url
const token = config.pimexApi.token

const addLead = async Data => {
  try {
    const { data } = await axios.post(`${baseUrl}/conversions/`, Data)
    return data
  } catch (e) {
    console.log(e)
  }
}

const getUsersFromBoard = async boardId => {
  try {
    const { data } = await axios.get(`${baseUrl}/boards/${boardId}/users`, {
      headers: {
        Authorization: token
      }
    })
    return data
  } catch (e) {
    console.log(e)
  }
}

const addNotification = async (idUser, data) => {
  try {
    const alert = await axios.post(`${baseUrl}/users/${idUser}/alerts`, data)
    return Promise.resolve(alert.data)
  } catch (e) {
    return Promise.reject(e)
  }
}

export { addNotification, getUsersFromBoard, addLead }
