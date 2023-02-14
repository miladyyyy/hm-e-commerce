import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/element-ui'
import TreeTable from 'vue-table-with-tree-grid'
import dayjs from 'dayjs'

import '@/style/index.css'
import '@/style/element-variables.scss'

Vue.config.productionTip = false
Vue.component('tree-table', TreeTable)

Vue.filter('timeFormat', function (value) {
  return dayjs(value * 1000).format('YYYY-MM-DD HH:mm:ss')
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
