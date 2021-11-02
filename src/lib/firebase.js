import firebase from 'firebase'
import config from '../../config.json'

const firebaseConfig = {
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  databaseURL: config.firebase.databaseURL,
  projectId: config.firebase.projectId,
  storageBucket: config.firebase.storageBucket,
  messagingSenderId: config.firebase.messagingSenderId,
  appId: config.firebase.appId,
  measurementId: config.firebase.measurementId
}

firebase.initializeApp(firebaseConfig)

const firestore = firebase.firestore
const db = firestore()

db.settings({
  timestampsInSnapshots: true
})

export default {
  firestore,
  db
}
