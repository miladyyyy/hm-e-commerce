import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/element-ui'
import TreeTable from 'vue-table-with-tree-grid'

import '@/style/index.css'
import '@/style/element-variables.scss'

Vue.config.productionTip = false
Vue.component('tree-table', TreeTable)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
