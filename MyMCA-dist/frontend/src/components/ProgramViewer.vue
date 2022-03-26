<script>
	import Header from './Header.vue'
	import Programs from './Programs.vue'

	export default {
		components: { Header, Programs },
		data() {
			return {
				credentials: this.$store.state.credentials
			};
		}
	}
</script>

<template>
	<div>
		<Header :credentials="this.credentials"/>
		<Programs :credentials="this.credentials"/>
	</div>
</template>

<style>

</style>