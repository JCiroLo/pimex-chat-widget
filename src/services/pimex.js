import axios from 'axios'

const baseUrl = 'https://api.pimex.co/v2'

const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExMiwiaWF0IjoxNTc0MTQ3MjA3fQ.YYdQd7sLHSbKLmRDVSqvAG3Y5VaaxXspUUzhfYKRLLg'

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

export { getUsersFromBoard, addNotification, addLead }
