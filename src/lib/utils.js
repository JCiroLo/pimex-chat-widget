import { getUsersFromBoard, addNotification } from '../services/pimex.js'

const sendNotification = async (boardId, message) => {
  const { data } = await getUsersFromBoard(boardId)
  const sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  const addNotifications = async () => {
    for (const user of data) {
      await sleep(500)
      await addNotification(user.ID, {
        title: `Tienes nuevos mensajes de ${boardId}`,
        message: message,
        user: user.ID,
        style: {
          button: {
            text: 'Ir a los chats',
            path: `/board/${boardId}/chats`
          },
          icon: 'mdi mdi-forum'
        },
        event: 'user.lead.upload'
      })
    }
  }
  await addNotifications()
  return data
}

export { sendNotification }
