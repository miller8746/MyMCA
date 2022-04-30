/*
* File name: EditProgram.vue
* Purpose: Component responsible for editing/canceling a program
* Authors: Heather Miller
* Date Created: 4/23/22
* Last Modified: 4/24/22
*/

<script>
	import Header from './Header.vue'
	import ProgramEditor from './ProgramEditor.vue'
	import Service from '../services/Service.js'

	export default {
		props: ['programId'],
		components: { Header, ProgramEditor },
		data() {
			return {
				credentials: this.$store.state.credentials,
				program: null,
				saved: false
			};
		},
		methods: {
			/*
			* Name: saveProgram
			* Purpose: Attempts to save the program with the information from the program editor
			* Parameters: program (Object; contains all the program information)
			*/
			saveProgram(program) {
				this.saved = false;
				Service.saveProgram(program).then((res) => {
					this.saved = true;
				});
			},
		},
		mounted() {
			if (this.programId == null) {
				// Page was reloaded or URL was navigated to manually
				// Handle this by redirecting to programs
				this.$router.push('/programs');
			} else {
				Service.getProgram(this.programId).then((res) => {
					this.program = res.data;
					this.$refs.editor.refreshProgramData(this.program);
				});
			}
		}
	};
</script>

<template>
	<div>
		<Header :credentials="this.credentials" :helpLink="'https://miller8746.github.io/MyMCA/build/UserManual/StaffOnly/editprogram.html'"/>
		<ProgramEditor @submitProgram="this.saveProgram" @deactivateProgram="this.deactivateProgram" :program="this.program" :saved="this.saved" ref="editor"/>
	</div>
</template>

<style>

</style>