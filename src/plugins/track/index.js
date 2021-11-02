import mixpanel from 'mixpanel-browser'
import config from '../../../config.json'

mixpanel.init(config.mixpanel.token)

function event (eventName, data = false) {
  mixpanel.track(eventName, data)
  return eventName
}

export default {
  install (Vue) {
    Vue.prototype.$track = {
      event
    }
  },
  event
}
