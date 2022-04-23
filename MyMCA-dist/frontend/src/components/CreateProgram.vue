/*
* File name: CreateProgram.vue
* Purpose: Component responsible for creating a program
* Authors: Heather Miller, Hannah Hunt
* Date Created: 2/25/22
* Last Modified: 4/23/22
*/

<script>
	import Header from './Header.vue'
	import ProgramEditor from './ProgramEditor.vue'
	import Service from '../services/Service.js'

	export default {
		components: { Header, ProgramEditor },
		data() {
			return {
				credentials: this.$store.state.credentials
			};
		},
		methods: {
			/*
			* Name: createProgram
			* Purpose: Attempts to create the program with the information from the program editor
			* Parameters: program (Object; contains all the program information)
			*/
			createProgram(program) {
				Service.createProgram(program).then((res) => {
					this.$router.push('/programs');
				});
			}
		}
	};
</script>

<template>
	<div>
		<Header :credentials="this.credentials" :helpLink="'https://miller8746.github.io/MyMCA/build/UserManual/StaffOnly/programcreation.html'"/>
		<ProgramEditor @submitProgram="this.createProgram" :program="null"/>
	</div>
</template>

<style>

</style>