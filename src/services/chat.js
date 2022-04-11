import axios from 'axios'
import config from '../../config.json'

const chatURL = config.chatsApi.url

const fetchChat = async chatId => {
  const { data } = await axios.get(`${chatURL}/chats/${chatId}`)
  return data
}

const fetchMessages = async chatId => {
  const { data } = await axios.get(`${chatURL}/messages/${chatId}`)
  return data
}

const updateChat = async (boardData, chatId, chatData) => {
  try {
    const { data } = await axios.put(`${chatURL}/chats/${chatId}`, chatData, {
      auth: {
        username: boardData.id,
        password: boardData.token
      }
    })
    return data
  } catch (e) {
    console.log(e)
  }
}

const createLead = async (boardData, leadData) => {
  const { data } = await axios.post(`${chatURL}/leads`, leadData, {
    auth: {
      username: boardData.id,
      password: boardData.token
    }
  })
  return data
}

const sendMessage = async messageData => {
  const { data } = await axios.post(`${chatURL}/messages`, messageData)
  return data
}

export { updateChat, createLead, fetchChat, fetchMessages, sendMessage }
