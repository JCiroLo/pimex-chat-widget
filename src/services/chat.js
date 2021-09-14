import axios from 'axios'

const chatURL = 'http://localhost:4000/'
const auth = {
  username: '14557',
  password: '2ofzTRwdkLjKZPr3nx4gXeh6H'
}

const addChat = async chatData => {
  try {
    const { data } = await axios.post(`${chatURL}chat`, chatData, {
      auth: auth
    })
    return data
  } catch (e) {
    console.log(e)
  }
}

const addMessage = async MessageData => {
  try {
    const { data } = await axios.post(`${chatURL}message`, MessageData, {
      auth: auth
    })
    return data
  } catch (e) {
    console.log(e)
  }
}

export { addChat, addMessage }
