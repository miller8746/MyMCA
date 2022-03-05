<script>
	import Header from './Header.vue'
	import Service from '../services/Service.js'
export default {
		components: { Header },
		data() {
			return {
				username: '',
				password: '',
				credentials: null,
				isMember: false,
				isStaff: false,
				showDataError: false
			}
		},
		methods: {
			createAccount() {

				} else {
					this.showDataError = true;
				}
			}
		}
	}
</script>

<template>
	<div>
		<Header :credentials="null"/>

	</div>
</template>

<style>
</style>