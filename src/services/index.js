import axios from 'axios'

const getLocation = async () => {
  try {
    const { data } = await axios.get('https://freegeoip.app/json/')
    return data
  } catch (e) {
    console.log(e)
  }
}

export { getLocation }
