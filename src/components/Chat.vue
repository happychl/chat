<template>
  <div class="chat">
    <header class="header"><h1>聊天室</h1></header>
    <section id="message" class="content">
      <ul class="message__list">
        <template v-for="msg in messages">
          <li class="message__item" v-if="msg.type===0">
            <p class="message__tip">{{msg.text}}</p>
          </li>
          <li class="message__item" :class="{'self':msg.self}" v-else>
            <p class="message__info">
              <template v-if="msg.self">
                <span class="message__addr">{{msg.loc}}</span>
                <span class="message__from">{{msg.name}}</span>
              </template>
              <template v-else>
                <span class="message__from">{{msg.name}}</span>
                <span class="message__addr">{{msg.loc}}</span>
              </template>
            </p>
            <div class="message__main">
              <template v-if="msg.self">
                <p class="message__con">{{msg.text}}</p>
                <p class="message__avatar">
                  <img :src="msg.avatar" alt="" class="message__avatar">
                </p>
              </template>
              <template v-else>
                <p class="message__avatar">
                  <img :src="msg.avatar" alt="" class="message__avatar">
                </p>
                <p class="message__con">{{msg.text}}</p>
              </template>
            </div>
          </li>
        </template>
      </ul>
    </section>
    <section class="send">
      <input type="text" class="send-ipt" v-model:value="sendTxt" @keydown.enter="send" @focus="focus">
      <button class="send-btn" :class="{'active':sendTxt.length}" @click="send">发送</button>
    </section>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  let socket = null;

  export default {
    name: 'chat',
    data() {
      return {
        messages: [],
        sendTxt: ''
      }
    },

    mounted() {
      if (!this.$store.state.remember) {
        this.$router.push({path: '/'});
      } else {
        socket = io.connect('http://192.168.0.180:3000');

        socket.on('connect', () => {
          console.log('连接服务器成功')
          console.log(`发送用户名:${this.$store.state.username}`)
          socket.emit('userInfo', {
            name: this.$store.state.username
          })
        });
        socket.on('userId', res => {
          console.log(`收到用户ID:${res.userId}`)
          this.$data.id = res.userId
        });
        socket.on('message', msg => {
          console.log(`收到消息:${msg}`)
          if (msg.type === 1) {
            msg.self = msg.id && msg.id === this.$data.id;
            msg.avatar = msg.id == '1001' ? '../../static/image/avatar/robot.jpg' : msg.avatar;
          }
          this.$data.messages.push(msg);
        });
      }
    },

    computed: {
      ...mapState([
        'avatar', 'username'
      ])
    },

    watch: {
      messages() {
        this.$nextTick(() => {
          document.getElementById('message').scrollTop = document.getElementById('message').scrollHeight;
        })
      }
    },

    methods: {
      focus: function () {
        let scrollTop = document.getElementById('message').scrollTop, interval, count = 3000;
        interval = setInterval(() => {
          document.getElementById('message').scrollTop = document.getElementById('message').scrollHeight;
          if (document.getElementById('message').scrollTop > scrollTop || !count--) {
            clearInterval(interval);
          }
        }, 100);
      },
      send: function () {
        if (this.$data.sendTxt.length) {
          var msg = {
            type: 1,
            name: this.$store.state.username,
            text: this.$data.sendTxt,
            avatar: this.$store.state.avatar,
            loc: '上海市'
          };

          this.$data.sendTxt = '';
          console.log(`发送消息:${msg}`);
          socket.emit('message', msg);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../static/style/variables.scss';

  .chat {
    display: flex;
    height: 100vh;
    flex-direction: column;
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: p2r(40);
    font-size: p2r(16);
    color: #fff;
    background-color: #48b9b5;
  }

  .content {
    flex: 1;
    overflow: auto;
  }

  .message {
    &__list {
    }
    &__item {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: p2r(4);
      &.self {
        align-items: flex-end;
        .message {
          &__con {
            margin-left: 0;
            margin-right: p2r(10);
            &:before {
              top: p2r(10);
              left: auto;
              right: - p2r(5);
            }
          }
        }
      }
    }
    &__tip{
      width: 60%;
      margin: auto;
      line-height: 1.5;
      text-align: center;
      border-radius: 10px;
      background-color: #ddd;
    }
    &__info {
      font-size: p2r(12);
      line-height: 1.5;
    }
    &__main {
      display: flex;
    }
    &__avatar {
      flex: none;
      width: p2r(30);
      height: p2r(30);
      border-radius: 50%;
      overflow: hidden;
    }
    &__con {
      position: relative;
      padding: p2r(5);
      margin-left: p2r(10);
      font-size: p2r(14);
      line-height: p2r(20);
      color: #fff;
      word-break: break-all;
      border-radius: 5px;
      background-color: #00B7FF;
      &:before {
        content: '';
        z-index: -1;
        position: absolute;
        top: p2r(10);
        left: - p2r(5);
        width: p2r(10);
        height: p2r(10);
        background-color: #00B7FF;
        transform: rotate(45deg);
      }
    }
  }

  .send {
    display: flex;
    align-items: center;
    height: p2r(30);
    padding: p2r(2) p2r(4);
    background-color: #eee;

    &-ipt {
      flex: 1;
      border-radius: 5px;
      height: 100%;
      padding: 0 p2r(8);
      font-size: p2r(14);
      border: none;
    }

    &-btn {
      width: p2r(50);
      height: 100%;
      margin-left: p2r(4);
      font-size: p2r(14);
      color: #fff;
      border: none;
      border-radius: 5px;
      background-color: #ccc;
      &.active {
        background-color: #48b9b5;
      }
    }
  }
</style>
