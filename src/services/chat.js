import axios from 'axios'

const chatURL = 'https://pimex-chat-api.herokuapp.com'

const addChat = async (boardData, chatData) => {
  try {
    const { data } = await axios.post(`${chatURL}/chat`, chatData, {
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

const updateChat = async (boardData, chatId, chatData) => {
  try {
    const { data } = await axios.put(`${chatURL}/chat/${chatId}`, chatData, {
      auth: {
        username: boardData.id,
        password: boardData.token
      },
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
    console.log(data)
    return data
  } catch (e) {
    console.log(e)
  }
}

const addMessage = async (boardData, MessageData) => {
  try {
    const { data } = await axios.post(`${chatURL}/message`, MessageData, {
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

export { addChat, addMessage, updateChat }
