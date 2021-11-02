import axios from 'axios'
import config from '../../config.json'

const chatURL = config.chatsApi.url

const updateChat = async (boardData, chatId, chatData) => {
  try {
    const { data } = await axios.put(`${chatURL}/chats/${chatId}`, chatData, {
      auth: {
        username: boardData.id,
        password: boardData.token
      },
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
    return data
  } catch (e) {
    console.log(e)
  }
}

const addMessage = async (boardData, MessageData) => {
  try {
    const { data } = await axios.post(`${chatURL}/messages`, MessageData, {
      auth: {
        username: boardData.id,
        password: boardData.token
      },
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
    return data
  } catch (e) {
    console.log(e)
  }
}

export { addMessage, updateChat }
