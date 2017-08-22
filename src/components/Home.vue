<template>
  <div class="home">
    <section class="welcome" v-if="remember">
      <img :src="avatar" alt="" class="avatar">
      <p class="name">{{username}}</p>
      <p class="wel">-------欢迎回来-------</p>
    </section>
    <section class="form" v-else>
      <img @click="changeAvatar" :src="avatar" alt="" class="avatar">
      <div class="usr">
        <label for="username" class="usr-label">昵称</label>
        <input type="text" id="username" class="usr-ipt" placeholder="请输入昵称" v-model:value="username"
               @keydown.enter="login" autofocus>
        <p class="tips">{{tips}}</p>
      </div>
      <button @click="login" class="login">登陆</button>
    </section>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: 'home',
    data() {
      return {
        tips: ''
      }
    },
    computed: {
      ...mapState(['remember', 'avatar']),
      username: {
        get() {
          return this.$store.state.username
        },
        set(value) {
          this.updateUsername(value)
        }
      }
    },
    mounted() {
      let profile = window.localStorage.getItem('profile');
      if (profile) {
        this.initialState(JSON.parse(profile));
        setTimeout(() => {
          this.$router.push({path: '/chat'});
        }, 3000);
      } else {
        this.changeAvatar()
      }
    },
    methods: {
      ...mapMutations([
        'initialState', 'setRemember', 'changeAvatar', 'updateUsername'
      ]),
      login: function () {
        if (this.$store.state.username) {
          window.localStorage.setItem('profile', JSON.stringify({
            name: this.$store.state.username,
            avatar: this.$store.state.avatar
          }));
          this.setRemember();
          this.$router.push({path: '/chat'})
        } else {
          this.$data.tips = '取个名字吧，亲';
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../static/style/variables.scss';

  .home {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: rgba(72, 185, 181, 1);
    overflow: hidden;
  }

  .form, .welcome {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: p2r(200);
    margin-top: - p2r(100);
    font-size: p2r(14);
    color: #fff;
  }

  .avatar {
    width: p2r(100);
    height: p2r(100);
  }

  .name {
    margin-top: p2r(20);
    font-size: p2r(14);
    line-height: 30px;
  }

  .wel {
    font-size: p2r(18);
  }

  input::-webkit-input-placeholder {
    color: rgba(255, 255, 255, .6);
  }

  .usr {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: p2r(15);
    &-label {
      display: none;
    }
    &-ipt {
      width: 100%;
      margin-top: p2r(10);
      line-height: 2;
      text-align: center;
      color: #fff;
      border: none;
      border-bottom: 1px solid #fff;
      background-color: transparent;

    }
  }

  .tips {
    height: p2r(30);
    line-height: 2;
    color: #ff0;
  }

  .login {
    width: 100%;
    height: p2r(36);
    color: rgba(72, 185, 181, 1);
    border: none;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 1);
    &:active {
      background-color: rgba(255, 255, 255, .8);
    }
  }
</style>
