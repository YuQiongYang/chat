import Vue from 'vue'
import App from './App.vue'
import VueSocketio from 'vue-socket.io';

Vue.use(new VueSocketio({
  connection: 'http://120.78.75.213:3005/'
}));    

new Vue({
  el: '#app',
  render: h => h(App)
})
