/*
* File name: EnrollmentViewer.vue
* Purpose: Component for the Enrollments page
* Authors: Heather Miller
* Date Created: 3/26/22
* Last Modified: 4/22/22
*/

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
		<Header :credentials="this.credentials" :helpLink="'https://miller8746.github.io/MyMCA/build/UserManual/enrollmentviewing.html'"/>
		<Programs :credentials="this.credentials" :isUserOnly="true"/>
	</div>
</template>

<style>

</style>