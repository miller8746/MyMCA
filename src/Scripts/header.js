import { createApp } from 'vue'
import Header from '../Components/Header.vue'

export function header() {
	createApp(Header).mount('#Header');
}