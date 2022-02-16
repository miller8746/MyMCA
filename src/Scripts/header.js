import { createApp } from 'vue/dist/vue.esm-bundler.js'
import Header from '../Components/Header.js'

export function header() {
	createApp(Header).mount('#Header');
}



