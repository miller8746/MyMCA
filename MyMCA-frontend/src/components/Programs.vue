<script>
	import Header from './Header.vue'
	import Service from '../services/Service.js'
	export default {
		components: { Header },
		data() {
			return {
				credentials: null
			};
		},
		mounted() {
			this.credentials = Service.getCredentials('', '');
		}
	}
</script>

<template>
	<Header :credentials="this.credentials" :includeSignOut="true"/>
	<div>Coming soon...</div>
</template>