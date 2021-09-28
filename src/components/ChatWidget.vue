<template>
  <div class="chat-container">
    <div class="inbox_msg">
      <div class="inbox_header" :class="{ active: currentTab === 1 }">
        <div class="greeting_text" v-if="currentTab === 0">
          <h4>Hola 👋</h4>
          <p>
            Pregúntanos lo que quieras y comparte con nosotros tus comentarios
          </p>
        </div>
        <div class="chat_header" v-if="currentTab === 1">
          <button class="go_back" @click="goToTab(0)" v-if="currentTab != 0">
            <span class="close_stripe_1"></span>
            <span class="close_stripe_2"></span>
          </button>
          <img
            :src="chatData.agentImg"
            alt=""
            v-if="chatData.agentImg"
            class="profile"
          />
          <div class="icon" v-else>
            <svg viewBox="0 0 147.39 108.07">
              <path
                class="cls-1"
                fill="white"
                d="M130.43,9.91a40,40,0,0,0-18.31,9.35s0,0,0,0,0,0,0,0a2.76,2.76,0,0,0-.28.39,2.77,2.77,0,0,0-.31.45,2.17,2.17,0,0,0-.13.5,3.14,3.14,0,0,0-.12.51,3,3,0,0,0,.07.51,2.36,2.36,0,0,0,.09.52,3,3,0,0,0,.26.46,2.34,2.34,0,0,0,.26.43s0,0,0,0l0,.05a71.31,71.31,0,0,1,13.81,20.52l.12.27c.1.23.19.45.26.57a48.88,48.88,0,0,0,21.25,23.12,17.23,17.23,0,0,1-8.24,2.19A2.72,2.72,0,0,0,136.94,71a2.77,2.77,0,0,0-.38,2.46,19.42,19.42,0,0,0,6.58,8.48,55.63,55.63,0,0,0-13.39,4.58,45,45,0,0,0-6.41,4.37,74.89,74.89,0,0,1-49.65,17.17A74.89,74.89,0,0,1,24,90.88a45.58,45.58,0,0,0-6.41-4.37A55.63,55.63,0,0,0,4.24,81.93a19.4,19.4,0,0,0,6.57-8.48,2.72,2.72,0,0,0-2.59-3.59A17.16,17.16,0,0,1,0,67.66a48.66,48.66,0,0,0,21.19-23c.11-.22.21-.44.31-.67l.14-.32A71,71,0,0,1,35.43,23.19s0,0,0-.05,0,0,0,0a2.3,2.3,0,0,0,.25-.43,2.59,2.59,0,0,0,.26-.46,2.36,2.36,0,0,0,.09-.52,3,3,0,0,0,.07-.51,3.1,3.1,0,0,0-.11-.51,2.83,2.83,0,0,0-.13-.5,2.83,2.83,0,0,0-.32-.45,2.7,2.7,0,0,0-.27-.39l-.05,0,0,0A40,40,0,0,0,16.94,9.91a2.72,2.72,0,1,0-1.07,5.34A33.55,33.55,0,0,1,29.49,21.6,77.25,77.25,0,0,0,17.74,39.09C7.34,29.42,5.64,10.81,5.41,2.83a2.79,2.79,0,0,1,1-2.2A2.66,2.66,0,0,1,8.68.06,80.65,80.65,0,0,1,39.13,12.4a8.1,8.1,0,0,0,9,.19A47.49,47.49,0,0,1,73.69,4.4a47.48,47.48,0,0,1,25.54,8.19,8.08,8.08,0,0,0,9-.2A80.8,80.8,0,0,1,138.69.06,2.65,2.65,0,0,1,141,.63a2.77,2.77,0,0,1,1,2.19c-.22,8-1.92,26.6-12.32,36.27A77.29,77.29,0,0,0,117.88,21.6a33.53,33.53,0,0,1,13.63-6.35,2.71,2.71,0,0,0,2-1.8"
              />
            </svg>
          </div>
          <div class="user_info">
            <h4>{{ chatData.agentName || "Agente de Pimex" }}</h4>
            <small>Integrante de Pimex</small>
          </div>
        </div>
      </div>
      <div class="mesgs" ref="chatRef" :class="{ active: currentTab === 1 }">
        <transition name="fade-tabs" mode="out-in">
          <div class="greeting" key="0" v-if="currentTab === 0">
            <div class="begin_conversation">
              <button @click="goToTab(1)">
                {{ messages.length > 0 ? "Continuar" : "Iniciar" }}
                conversación
                <svg class="svg-icon" viewBox="0 0 20 20">
                  <path
                    d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="msgs_chat" key="1" v-if="currentTab === 1">
            <div class="msg_history">
              <div class="we_use_pimex">
                <img
                  src="https://es.pimex.co/wp-content/uploads/2018/04/simbolo.png"
                  alt="Pimex_logo"
                />
                <span>Usamos Pimex</span>
              </div>
              <div
                v-for="(message, index) in messages"
                :key="index"
                class="chat_message"
                :class="{
                  received_msg: message.senderType === 'board',
                  bot_msg: message.senderType === 'bot',
                  outgoing_msg: message.senderType === 'client',
                }"
              >
                <div class="message_content">
                  <div
                    class="message_text"
                    :class="{ 'too-large': message.message.length > 20 }"
                    v-if="message.senderType !== 'bot'"
                  >
                    {{ message.message }}
                  </div>
                  <div class="message_text" v-else>
                    <span v-if="formTab < 3">
                      Por el momento no hay asesores disponibles para resolver
                      tus dudas, dejanos tu correo para contactarnos contigo lo
                      mas pronto posible
                    </span>
                    <div class="bot_msg_form">
                      <small v-if="formTab < 3">
                        <button
                          :style="{
                            visibility: formTab > 0 ? 'visible' : 'hidden',
                          }"
                          @click="formPrevTab()"
                        >
                          Atrás
                        </button>
                        <span>({{ formTab + 1 }}/3)</span>
                      </small>
                      <transition name="fade-form-tabs" mode="out-in">
                        <form
                          @submit.prevent="formNextTab()"
                          class="form-control"
                          v-if="formTab === 0"
                          key="0"
                        >
                          <input
                            type="email"
                            v-model="chatUserInfo.email"
                            placeholder="Correo electronico"
                          />
                          <button>
                            <i class="fas fa-paper-plane"></i>
                          </button>
                        </form>
                        <form
                          @submit.prevent="formNextTab()"
                          class="form-control"
                          v-if="formTab === 1"
                          key="1"
                        >
                          <input
                            type="text"
                            v-model="chatUserInfo.name"
                            placeholder="Tu nombre"
                          />
                          <button>
                            <i class="fas fa-paper-plane"></i>
                          </button>
                        </form>
                        <form
                          @submit.prevent="
                            () => {
                              formNextTab();
                              submitChatForm();
                            }
                          "
                          class="form-control"
                          v-if="formTab === 2"
                          key="2"
                        >
                          <input
                            type="text"
                            v-model="chatUserInfo.tel"
                            placeholder="Tu teléfono"
                          />
                          <button>
                            <i class="fas fa-paper-plane"></i>
                          </button>
                        </form>
                        <div class="form-control" v-if="formTab === 3" key="3">
                          Gracias, ¡Nos pondremos en contacto!
                        </div>
                      </transition>
                    </div>
                  </div>
                  <span class="time_date">
                    {{ message.createdAt | formatChatDate }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="inbox_footer" :class="{ active: currentTab === 0 }">
        <transition name="fade-footer" mode="out-in">
          <div class="we_use_pimex" v-if="currentTab === 0" key="1">
            <img
              src="https://es.pimex.co/wp-content/uploads/2018/04/simbolo.png"
              alt="Pimex_logo"
            />
            <span>Usamos Pimex</span>
          </div>
          <div class="input_msg_write" v-if="currentTab === 1" key="2">
            <input
              @keyup.enter="sendMessage"
              v-model="message"
              type="text"
              placeholder="Escribe un mensaje"
            />
            <button class="msg_send_btn" type="button" @click="sendMessage">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
// import {sendNotification} from "../lib/utils";
import { addMessage, updateChat } from "../services/chat";
import { addLead } from "../services/pimex";

export default {
  name: "ChatWidget",
  data() {
    return {
      chatData: { id: "", userId: "", agentName: "", agentImg: "", name: "" },
      chatUserInfo: { email: "", name: "", tel: "" },
      chatModal: false,
      message: null,
      messages: [],
      currentTab: 0,
      formTab: 0,
      boardData: {},
    };
  },
  filters: {
    formatChatDate: ({ seconds }) => {
      const msgDate = moment.unix(seconds).format("LL");
      const todayDate = moment().format("LL");
      const firstDay = moment(0).format("LL");
      const diffToday = moment(todayDate).diff(moment(firstDay), "days");
      const diffMsg = moment(msgDate).diff(moment(firstDay), "days");
      if (Math.abs(diffToday - diffMsg) >= 1) {
        return moment.unix(seconds).format("MMMM DD - hh:mm A");
      } else {
        return moment.unix(seconds).format("hh:mm A");
      }
    },
  },
  methods: {
    goToTab(tabNumber) {
      if (tabNumber === 1) {
        setTimeout(() => {
          this.scrollToBottom();
        }, 500);
      }
      this.currentTab = tabNumber;
    },
    async fetchName(chatId) {
      const resChatData = await window.db
        .collection("chats")
        .doc(chatId)
        .get();
      this.chatData = resChatData.data();
    },
    fetchMessages(chatId) {
      window.db
        .collection("messages")
        .where("chatId", "==", chatId)
        .orderBy("createdAt")
        .onSnapshot((querySnapshot) => {
          const allMessages = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id;
            allMessages.push(data);
          });
          this.messages = allMessages;
        });
    },
    async sendMessage() {
      if (this.message === null || this.message === "") {
        return;
      }
      const info = {
        boardId: this.boardData.id,
        msg: this.message,
        message: this.message,
        chatId: this.chatData.id,
        senderId: this.chatData.userId,
        senderType: "client",
        createdAt: new Date(),
      };
      this.messages.push(info);
      this.message = null;
      try {
        await addMessage(this.boardData, info);
      } catch (e) {
        this.message = info.message;
      }
      setTimeout(() => {
        this.scrollToBottom();
      }, 50);
      // TODO la notificacion
      // sendNotification(this.boardData.id, msg)
    },
    openAndCloseChat() {
      this.currentTab = 0;
      this.chatModal = !this.chatModal;
    },
    scrollToBottom() {
      const box = this.$refs.chatRef;
      box.scrollTop = box.scrollHeight;
    },
    formPrevTab() {
      this.formTab--;
    },
    formNextTab() {
      this.formTab++;
    },
    async submitChatForm() {
      const leadData = {
        _state: "lead",
        name: this.chatUserInfo.name,
        phone: this.chatUserInfo.tel,
        email: this.chatUserInfo.email,
        project: this.boardData.id,
        referrer: "Chat",
        origin: "Chat",
        _compare: false,
      };
      const { data } = await addLead(leadData);
      await updateChat(this.boardData, this.chatData.id, {
        leadId: data.ID,
        name: this.chatUserInfo.name,
        submitedForm: true,
      });
    },
  },
  async beforeMount() {
    await this.fetchName(this.$route.params.chatId);
    await this.fetchMessages(this.$route.params.chatId);
    this.chatData.userId = this.$route.params.userId;
    this.chatData.id = this.$route.params.chatId;
    this.boardData = {
      id: this.$route.params.boardId,
      token: this.$route.params.boardToken,
    };
    if (this.chatData.submitedForm) {
      this.formTab = 3;
    }
  },
};
</script>

<style scoped lang="scss">
$widget_x_gap: 20px;
$widget_y_gap: 20px;
$widget_height_footer: 66px;
$widget_height_header: 200px;
$widget_height_header_active: 75px;
$widget_height_body: calc(
  80vh - #{$widget_height_header} - #{$widget_height_footer} - #{$widget_y_gap *
    2}
);
$widget_height_body_active: calc(
  90vh - #{$widget_height_header_active} - #{$widget_height_footer} - #{$widget_y_gap *
    2}
);
$widget_width: 100vw;

.chat-container {
  position: fixed;
  bottom: $widget_y_gap;
  left: $widget_x_gap;
  right: $widget_x_gap;
  .inbox_msg {
    overflow: hidden;
    border-radius: 15px;
    box-shadow: 0 0 15px rgba($color: #555, $alpha: 0.25);
    background-color: white;
    ::-webkit-scrollbar {
      width: 7px;
    }
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    ::-webkit-scrollbar-thumb {
      background: #bbb;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #999;
    }
    .inbox_header {
      display: flex;
      width: 100%;
      min-height: $widget_height_header;
      max-height: $widget_height_header;
      background-image: linear-gradient(45deg, #134251, #146e78);
      transition: min-height 0.1s ease-out;
      &.active {
        min-height: $widget_height_header_active;
        max-height: $widget_height_header_active;
      }
      .greeting_text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: white;
        padding: 15px;
        width: 100%;
        h4 {
          margin: 0;
          font-size: 28px;
        }
        p {
          margin: 15px 0;
        }
      }
      .chat_header {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 15px;
        .go_back {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: transparent;
          outline: none;
          border: none;
          border-radius: 15px;
          cursor: pointer;
          font-size: 24px;
          width: 45px;
          height: 45px;
          margin-right: 5px;
          padding: 0;
          color: white;
          transition: background-color 0.2s ease-out;
          &:hover {
            background-color: #eff4f833;
            .close_stripe_1 {
              min-width: 25px;
              transform: rotate(-45deg) translate(0, 0);
            }
            .close_stripe_2 {
              min-width: 25px;
              transform: rotate(45deg) translate(0, 0);
            }
          }
          .close_stripe_1 {
            position: absolute;
            background-color: white;
            min-width: 15px;
            height: 2px;
            border-radius: 25px;
            transform: rotate(45deg) translate(50%, calc(50% - 2px));
            transition: all 0.2s ease-out;
          }
          .close_stripe_2 {
            position: absolute;
            background-color: white;
            min-width: 15px;
            height: 2px;
            border-radius: 25px;
            transform: rotate(-45deg) translate(50%, 50%);
            transition: all 0.2s ease-out;
          }
        }
        .profile {
          margin-left: 10px;
          width: 45px;
          height: 45px;
          border-radius: 15px;
        }
        .icon {
          display: flex;
          align-items: center;
          width: 40px;
          height: 40px;
          padding: 5px;
        }
        .user_info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0 15px;
          color: #fff;
          h4 {
            text-align: left;
            margin: 0;
            font-size: 20px;
            font-weight: 200;
          }
          small {
            font-weight: 100;
            font-size: 12px;
          }
        }
      }
    }
    .mesgs {
      display: flex;
      flex: 0 0 100%;
      max-height: $widget_height_body;
      min-height: $widget_height_body;
      overflow-y: auto;
      overflow-x: hidden;
      scroll-behavior: smooth;
      margin-bottom: 30px;
      transition: min-height 0.1s ease-out, padding 0.1s ease-out;
      &.active {
        max-height: $widget_height_body_active;
        min-height: $widget_height_body_active;
        padding: 0;
      }
      .greeting {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 15px;
        .begin_conversation {
          padding: 30px 0;
          button {
            display: flex;
            align-items: center;
            margin: 0 auto;
            padding: 15px 30px;
            border-radius: 15px;
            border-radius: 15px;
            font-size: 18px;
            font-weight: 500;
            cursor: pointer;
            background-color: transparent;
            color: #555;
            border: none;
            outline: none;
            transition: background-color 0.2s ease-out;
            &:hover {
              background-color: #eff4f8;

              svg {
                transform: translateX(10px);
              }
            }
            svg {
              width: 22px;
              transition: transform 0.2s ease-out;

              path {
                fill: #555;
              }
            }
          }
        }
      }
      .msgs_chat {
        display: flex;
        flex: 0 0 100%;
        .msg_history {
          display: flex;
          flex-direction: column;
          width: 100%;
          word-break: break-all;
          padding: 15px 15px 0 15px;
          background: #fff;
          .chat_message {
            position: relative;
            margin-bottom: 10px;
            max-width: 60%;
            .message_content {
              display: flex;
              &:hover {
                .time_date {
                  opacity: 1;
                }
              }
              .message_text {
                width: 100%;
                border-radius: 5px;
                font-size: 16px;
                margin: 0;
                padding: 10px 15px;
                text-align: left;
                word-wrap: break-word;
                word-break: keep-all;
                &.too-large {
                  word-break: break-all;
                }
              }

              .time_date {
                position: absolute;
                display: flex;
                align-items: center;
                width: max-content;
                top: 0;
                bottom: 0;
                font-size: 10px;
                margin: 0 10px;
                opacity: 0;
                transition: opacity 0.2s ease-out;
              }
            }

            &.received_msg {
              align-self: flex-start;
              &::before {
                content: "";
                position: absolute;
                top: 100%;
                left: 0;
                border-top: 3px solid #eff4f8;
                border-left: 6px solid #eff4f8;
                border-right: 3px solid transparent;
                border-bottom: 6px solid transparent;
                transition: border-color 0.2s ease-out;
              }
              .message_content {
                .message_text {
                  background-color: #eff4f8;
                  color: #646464;
                  border-bottom-left-radius: 0;
                }
                .time_date {
                  left: 100%;
                  color: #747474;
                }
              }
            }
            &.outgoing_msg {
              align-self: flex-end;
              &::before {
                content: "";
                position: absolute;
                top: 100%;
                right: 0;
                border-top: 3px solid #146478;
                border-left: 3px solid transparent;
                border-right: 3px solid #146478;
                border-bottom: 3px solid transparent;
                transition: border-color 0.2s ease-out;
              }
              .message_content {
                .message_text {
                  background-color: #146478;
                  border-bottom-right-radius: 0;
                  color: #fff;
                }
                .time_date {
                  right: 100%;
                }
              }
            }
            &.bot_msg {
              align-self: flex-start;
              &::before {
                content: "";
                position: absolute;
                top: 100%;
                left: 0;
                border-top: 3px solid #eff4f8;
                border-left: 6px solid #eff4f8;
                border-right: 3px solid transparent;
                border-bottom: 6px solid transparent;
                transition: border-color 0.2s ease-out;
              }
              .message_content {
                .message_text {
                  background-color: #eff4f8;
                  color: #646464;
                  border-bottom-left-radius: 0;
                }
                .bot_msg_form {
                  position: relative;
                  display: flex;
                  flex-direction: column;
                  overflow-x: hidden;
                  small {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 15px;
                    padding: 5px 5px 5px 0;
                    color: #bbb;

                    button {
                      color: #bbb;
                      background-color: transparent;
                      border: none;
                      outline: none;
                      cursor: pointer;
                    }
                  }
                  .form-control {
                    display: flex;
                    width: 100%;
                    input {
                      height: 30px;
                      width: 100%;
                      padding: 5px 10px;
                      border: none;
                      outline: none;
                      border-radius: 5px;
                    }
                    button {
                      position: absolute;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      width: 30px;
                      height: 30px;
                      right: 5px;
                      bottom: 5px;
                      border-radius: 5px;
                      color: #146478;
                      background-color: transparent;
                      padding: 0;
                      margin: 0;
                      border: none;
                      outline: none;
                      cursor: pointer;
                      font-size: 18px;
                    }
                  }
                }
                .time_date {
                  left: 100%;
                  color: #747474;
                }
              }
            }
          }
          .we_use_pimex {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            bottom: 60px;
            right: 0;
            left: 0;
            height: 20px;
            width: fit-content;
            padding: 5px 15px;
            margin: 0 auto;
            border-radius: 15px;
            opacity: 0.5;
            transition: background-color 0.2s ease-out, opacity 0.2s ease-out;
            &:hover {
              background-color: #eff4f8;
              cursor: pointer;
              opacity: 1;
            }
            img {
              height: 100%;
            }
            span {
              margin-left: 10px;
            }
          }
        }
      }
    }
    .inbox_footer {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      height: $widget_height_footer;
      transition: box-shadow 0.2s ease-out;
      &.active {
        box-shadow: 0 0 15px #00000011;
      }
      .input_msg_write {
        position: relative;
        display: flex;
        flex-basis: 100%;
        padding: 10px;
        input {
          flex-basis: 100%;
          padding: 15px;
          border-radius: 15px;
          background-color: #eff4f8;
          outline: none;
          border: none;
        }
        .msg_send_btn {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #146478;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-size: 20px;
          height: 30px;
          right: 18px;
          top: 50%;
          width: 30px;
          transform: translateY(-50%);
        }
      }
      .we_use_pimex {
        height: 20px;
        width: fit-content;
        padding: 5px 15px;
        margin: auto 0;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 15px;
        transition: background-color 0.2s ease-out;
        &:hover {
          background-color: #eff4f8;
          cursor: pointer;
        }
        img {
          height: 100%;
        }
        span {
          margin-left: 10px;
        }
      }
    }
  }
}

.fade-tabs-enter,
.fade-tabs-leave-to {
  opacity: 0;
}

.fade-tabs-enter-active,
.fade-tabs-leave-active {
  transition: opacity 0.2s ease-out;
}

.fade-tabs-enter-to,
.fade-tabs-leave {
  opacity: 1;
}

.fade-footer-enter,
.fade-footer-leave-to {
  opacity: 0;
}

.fade-footer-enter-active,
.fade-footer-leave-active {
  transition: all 0.2s ease-out;
}

.fade-footer-enter-to,
.fade-footer-leave {
  opacity: 1;
}

.fade-form-tabs-enter {
  opacity: 0;
  transform: translateX(50px);
}

.fade-form-tabs-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.fade-form-tabs-enter-active,
.fade-form-tabs-leave-active {
  transition: all 0.2s ease-out;
}

.fade-form-tabs-enter-to,
.fade-form-tabs-leave {
  opacity: 1;
  transform: translateX(0);
}
</style>
