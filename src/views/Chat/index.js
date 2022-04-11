import moment from 'moment'
// import {sendNotification} from "../lib/utils";
import {
  updateChat,
  createLead,
  fetchChat,
  fetchMessages,
  sendMessage
} from '../../services/chat'

export default {
  name: 'ChatWidget',
  data () {
    return {
      chatData: { id: '', userId: '', agentName: '', agentImg: '', name: '' },
      chatUserInfo: { email: '', name: '', tel: '' },
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
    formatChatDate: ({ _seconds }) => {
      const msgDate = moment.unix(_seconds).format('LL')
      const todayDate = moment().format('LL')
      const firstDay = moment(0).format('LL')
      const diffToday = moment(todayDate).diff(moment(firstDay), 'days')
      const diffMsg = moment(msgDate).diff(moment(firstDay), 'days')
      if (Math.abs(diffToday - diffMsg) >= 1) {
        return moment.unix(_seconds).format('MMMM DD - hh:mm A')
      } else {
        return moment.unix(_seconds).format('hh:mm A')
      }
    }
  },
  sockets: {
    connect () {
      console.log('Chat socket connected')
    },
    'chat.message.created.user' (data) {
      if (
        this.chatData.id === data.message.chatId &&
        data.message.senderType !== 'client'
      ) {
        this.messages.push(data.message)
        this.scrollToBottom(50)
      }
    },
    'chat.message.created.bot' (data) {
      if (this.chatData.id === data.message.chatId) {
        this.messages.push(data.message)
        this.scrollToBottom(50)
      }
    },
    getMessage (messageData) {
      if (this.$route.params.userId !== messageData.senderId) {
        this.messages.push(messageData)
      }
      this.scrollToBottom(50)
    },
    getBotMessage (messageData) {
      this.messages.push(messageData)
      this.scrollToBottom(50)
    }
  },
  methods: {
    async fetchChatData () {
      this.chatData = await fetchChat(this.$route.params.chatId)
      this.chatData.userId = this.$route.params.userId
      this.chatData.id = this.$route.params.chatId
      this.boardData = {
        id: this.$route.params.boardId,
        token: this.$route.params.boardToken
      }
      if (this.chatData.submitedForm) {
        this.formTab = 3
      }
    },
    async fetchChatMessages () {
      this.messages = await fetchMessages(this.$route.params.chatId)
    },
    goToTab (tabNumber) {
      if (tabNumber === 1) {
        this.scrollToBottom(300)
      }
      this.currentTab = tabNumber
    },
    async sendMessage () {
      if (!this.message) {
        return
      }

      const messageData = {
        boardId: this.boardData.id,
        message: this.message,
        chatId: this.chatData.id,
        senderId: this.chatData.userId,
        senderType: 'client',
        createdAt: new Date()
      }

      this.message = null
      this.messages.push(messageData)
      this.scrollToBottom(50)

      await sendMessage(messageData)

      this.$track.event('chat.customer.send-message') // Track
    },
    scrollToBottom (time) {
      setTimeout(() => {
        const box = this.$refs.chatRef
        box.scrollTop = box.scrollHeight
      }, time)
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
    // this.$route.params.chatId
    // this.$route.params.boardId
    await this.fetchChatData()
    await this.fetchChatMessages()
    this.loadingMessages = false
  }
}
