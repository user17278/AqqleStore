import App from './App'
import amap from './common/amap-wx.130.js';
import $http from '@/common/api/request.js';
import QQMapWX from '@/libs/qqmap-wx-jssdk.js'


// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.amap = amap
Vue.prototype.$http = $http
Vue.prototype.QQMapWX = QQMapWX
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif





// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
