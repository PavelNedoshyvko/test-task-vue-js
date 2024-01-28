import Vue from 'vue'
import App from './App.vue'
import VModal from 'vue-js-modal'
import 'vue-js-modal/dist/styles.css'

Vue.use(VModal)

Vue.config.productionTip = false

new Vue({
	render: h => h(App),
}).$mount('#app')
