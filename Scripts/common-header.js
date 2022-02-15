createCommonHeader = function() {
	import { createApp } from 'vue'

	createApp({
		data() {
			return {}
		},
		template: '#CommonHeader'
	}).mount('#header');
}