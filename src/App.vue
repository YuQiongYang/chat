<template>
  <div id="app">
    <div v-if="!isShow" class="login">
      <div class="usrename">
        <input @keydown.enter="isShow = true" placeholder="请输入用户名" v-model="username" type="text">
      </div>
      <span @click="isShow = true">开始聊天吧</span>
    </div>
    <div v-else>
    <h1>简易聊天</h1>  
    <ul v-if="chats.length">
      <li v-for="(item, i) in chats" :key="i">
        <div v-if="item" :class="{'active' : item.username === username}">
          <p>{{item.username}}</p>
          <span>{{item.msg}}</span>
        </div>
      </li>
    </ul>
    <footer>
      <textarea @keydown.enter="handleSend" v-model="msg" rows="10"></textarea>
      <a href="javascript:" @click="handleSend">send</a>
    </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      username: '',
      isShow: false,
      msg: '',
      chats: []
    }
  },
  methods: {
    handleSend() {
      this.$socket.emit('message', {
         msg: this.msg,
         username: this.username
     });
     this.msg = ''
    }
  },
  mounted() {
    this.$socket.emit('message');
     this.sockets.subscribe('msgObj', (data) => {
       this.chats = JSON.parse(data)
      });
  }
}
</script>

<style lang="scss">
*{
  padding: 0;
  margin: 0;
}
#app {
  width: 60%;
  height: 100vh;
  background: #eee;
  margin: 0 auto;
  position: relative;
}
.login{
  width: 350px;
  height: 350px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login input{
  width: 200px;
  height: 30px;
  margin-bottom: 10px;
}

.login span{
  cursor: pointer;
  display: block;
  padding: 5px 10px;
  color: #fff;
  border-radius: 5px;
  background: #42b983;
}

h1, h2 {
  text-align: center;
  font-weight: normal;
}
footer{
  width: 60%;
  position: fixed;
  bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
footer textarea{
  width: 300px;
  height: 50px;
}
footer a{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  margin-left: 10px;
}

ul {
  list-style-type: none;
  padding: 0 20px;
}
li{
  margin-bottom: 20px;
}
.active{
  text-align: right;
}
.active p, .active span{
  text-align: right;
}
.active span{
  background: #42b983;
}
li p{
  margin-bottom: 10px;
}

li span{
  background: skyblue; 
  padding: 3px 8px;
  border-radius: 5px;
}

a {
  color: #42b983;
}
</style>
