<script>
	import Header from './Header.vue'
	import Service from '../services/Service.js'
	export default {
		components: { Header },
		data() {
			return {
				credentials: this.$store.state.credentials,
				programs: null
			};
		},
		mounted() {
			Service.getPrograms(this.$store.state.credentials.UserId).then(response => {
				this.programs = response.data;
				this.programs.forEach(program => {
					var date = new Date(program.offeringPeriod);
					program.offeringDate = date.toLocaleString();
				});
			})
		}
	}
</script>

<template>
	<Header :credentials="this.credentials" :includeSignOut="true"/>
	<div>
		<div class="programsContainer">
			<div v-for="program in this.programs" class="programContainer">
				<div class="progName">{{ program.title }}</div>
				<div>Description: {{ program.description }}</div>
				<div class="supplementalText">Capacity: {{ program.capacity }}</div>
				<div class="supplementalText">Cost: ${{ program.cost }}.00</div>
				<div class="supplementalText">Starting time: {{ program.offeringDate }}</div>
			</div>
		</div>
	</div>
</template>

<style>
.programsContainer {
	display: flex;
	justify-content: center;
}

.programContainer {
	display: flex;
	flex-direction: column;
	background-color: #8c0000;
	color: #FFFFFF;
	border-radius: 15px;
	margin: 10px 0px 10px 0px;
	padding: 5px;
	min-width: 600px;
}

.supplementalText {
	font-size: 12pt;
}
</style>