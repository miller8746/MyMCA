<script>
	import Header from './Header.vue'
	import Service from '../services/Service.js'
	import moment from 'moment'


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
					var date = new Date(program['offeringPeriod']);
					program['OfferingDate'] = date.toLocaleString();
				});
			})
			.catch(error => {
				console.log("Something went wrong: ");
				console.log(error);
			});
		}		
	}
</script>

<template>
	<div>
		<Header :credentials="this.credentials" :includeSignOut="true"/>
		<div>
			<div class="container card-group">
				<div v-for="program in this.programs" v-bind:key="program" class="card border-primary mt-3">
					<div class="card-body">
						<h3 class="card-title card-header">{{ program['Title'] }}</h3>
						<p>{{ program['Description'] }}</p>

						<div class="program-detail">[current capacity here] / {{ program['Capacity'] }} Openings - ${{ program['Cost'] }}/Person</div>
						<a href="#" class="btn btn-primary btn-sm mt-3 mb-3">Sign Up</a>	
						<div class="card-footer footer">
							<div class="text-muted" >{{ program['OfferingDate']}}</div>
    					</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.footer {
	font-size: small;
}

.program-detail {
	font-size: medium;
}

</style>