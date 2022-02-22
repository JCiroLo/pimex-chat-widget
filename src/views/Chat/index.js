import moment from 'moment'
// import {sendNotification} from "../lib/utils";
import { addMessage, updateChat, createLead } from '../../services/chat'
import { io } from 'socket.io-client'

export default {
  name: 'ChatWidget',
  data () {
    return {
      chatData: { id: '', userId: '', agentName: '', agentImg: '', name: '' },
      chatUserInfo: { email: '', name: '', tel: '' },
      chatModal: false,
      message: null,
      messages: [],
      currentTab: 0,
      formTab: 0,
      boardData: {},
      transitionState: 'right',
      loadingMessages: true
    }
  },
  filters: {
    formatChatDate: ({ seconds }) => {
      const msgDate = moment.unix(seconds).format('LL')
      const todayDate = moment().format('LL')
      const firstDay = moment(0).format('LL')
      const diffToday = moment(todayDate).diff(moment(firstDay), 'days')
      const diffMsg = moment(msgDate).diff(moment(firstDay), 'days')
      if (Math.abs(diffToday - diffMsg) >= 1) {
        return moment.unix(seconds).format('MMMM DD - hh:mm A')
      } else {
        return moment.unix(seconds).format('hh:mm A')
      }
    }
  },
  methods: {
    goToTab (tabNumber) {
      if (tabNumber === 1) {
        setTimeout(() => {
          this.scrollToBottom()
        }, 500)
      }
      this.currentTab = tabNumber
    },
    async fetchName (chatId) {
      const resChatData = await window.db
        .collection('chats')
        .doc(chatId)
        .get()
      this.chatData = resChatData.data()
    },
    fetchMessages (chatId) {
      window.db
        .collection('messages')
        .where('chatId', '==', chatId)
        .orderBy('createdAt')
        .onSnapshot(querySnapshot => {
          const allMessages = []
          querySnapshot.forEach(doc => {
            const data = doc.data()
            data.id = doc.id
            allMessages.push(data)
          })
          this.messages = allMessages
        })
    },
    async sendMessage () {
      if (this.message === null || this.message === '') {
        return
      }
      const info = {
        boardId: this.boardData.id,
        msg: this.message,
        message: this.message,
        chatId: this.chatData.id,
        senderId: this.chatData.userId,
        senderType: 'client',
        createdAt: new Date()
      }
      this.messages.push(info)
      this.message = null
      try {
        await addMessage(this.boardData, info)
        this.$track.event('chat.customer.send-message') // Track
      } catch (e) {
        this.message = info.message
      }
      setTimeout(() => {
        this.scrollToBottom()
      }, 50)
      // TODO la notificacion
      // sendNotification(this.boardData.id, msg)
    },
    openAndCloseChat () {
      this.currentTab = 0
      this.chatModal = !this.chatModal
    },
    scrollToBottom () {
      const box = this.$refs.chatRef
      box.scrollTop = box.scrollHeight
    },
    formPrevTab () {
      this.transitionState = 'left'
      this.formTab--
    },
    formNextTab () {
      this.transitionState = 'right'
      this.formTab++
      this.$track.event('chat.customer.fill-form', { step: this.formTab }) // Track
    },
    async submitChatForm () {
      const leadData = {
        _state: 'lead',
        name: this.chatUserInfo.name,
        phone: this.chatUserInfo.tel,
        email: this.chatUserInfo.email,
        project: this.boardData.id,
        referrer: 'Chat',
        origin: 'Chat',
        _compare: false
      }
      const data = await createLead(this.boardData, leadData)
      await updateChat(this.boardData, this.chatData.id, {
        leadId: data.ID,
        name: this.chatUserInfo.name,
        submitedForm: true
      })
      this.$track.event('chat.customer.create-lead.bot-message') // Track
    }
  },
  async beforeMount () {
    await this.fetchName(this.$route.params.chatId)
    await this.fetchMessages(this.$route.params.chatId)
    this.loadingMessages = false
    this.chatData.userId = this.$route.params.userId
    this.chatData.id = this.$route.params.chatId
    this.boardData = {
      id: this.$route.params.boardId,
      token: this.$route.params.boardToken
    }
    if (this.chatData.submitedForm) {
      this.formTab = 3
    }
    const socket = io('http://localhost:5000')

    socket.on('message', message => {
      console.log(message)
    })
  }
}
