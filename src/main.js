// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

import App from './App'

Vue.use(VueMaterial)
Vue.material.registerTheme('ranklol', {
  primary: {
    color: 'red',
    hue: 900
  },
  accent: 'indigo',
  warn: 'deep-orange',
  background: {
    color: 'grey',
    hue: 300
  }
})
Vue.material.setCurrentTheme('ranklol')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
