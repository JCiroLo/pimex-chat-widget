import axios from 'axios'

const chatURL = 'http://localhost:5000' // 'https://pimex-chat-api.herokuapp.com'
const auth = {
  username: '14557',
  password: '2ofzTRwdkLjKZPr3nx4gXeh6H'
}

const addChat = async chatData => {
  try {
    const { data } = await axios.post(`${chatURL}/chat`, chatData, {
      auth: auth,
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
    return data
  } catch (e) {
    console.log(e)
  }
}

const updateChat = async (chatId, chatData) => {
  try {
    const { data } = await axios.put(`${chatURL}/chat/${chatId}`, chatData, {
      auth: auth,
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
    console.log(data)
    return data
  } catch (e) {
    console.log(e)
  }
}

const addMessage = async MessageData => {
  try {
    const { data } = await axios.post(`${chatURL}/message`, MessageData, {
      auth: auth,
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
    return data
  } catch (e) {
    console.log(e)
  }
}

export { addChat, addMessage, updateChat }
