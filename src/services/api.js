import axios from 'axios'

const getIcon = async () => {
  try {
    const { data } = await axios.get(
      'https://api.npoint.io/fa58b5583f222a321102'
    )
    return data[Math.floor(Math.random() * (data.length - 1))]
  } catch (e) {
    console.log(e)
  }
}

const getColor = async () => {
  try {
    const { data } = await axios.get(
      'https://api.npoint.io/e636f257d1ad79e7ef84'
    )
    return data[Math.floor(Math.random() * (data.length - 1))]
  } catch (e) {
    console.log(e)
  }
}

const getLocation = async () => {
  try {
    const { data } = await axios.get('https://freegeoip.app/json/')
    return data
  } catch (e) {
    console.log(e)
  }
}

export { getIcon, getColor, getLocation }
