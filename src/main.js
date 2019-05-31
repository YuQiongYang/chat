import Vue from 'vue'
import App from './App.vue'
import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';

Vue.use(new VueSocketio({
  connection: 'ws://192.168.0.33:88'
}));    

new Vue({
  el: '#app',
  render: h => h(App)
})
