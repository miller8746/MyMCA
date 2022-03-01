<script>
	import Header from './Header.vue'
	import Service from '../services/Service.js'
	import moment from 'moment'
	export default {
		components: { Header },
		data() {
			return {
				credentials: this.$store.state.credentials,
				programs: null,
				enrollments: null
			};
		},
		mounted() {
			// Getting all available programs
			Service.getPrograms().then(response => {
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
			// Getting number of enrollments for all programs
			Service.getEnrollments().then(response => {
				console.log("data === " + response.data[0]['NumOfEnrollments']);
				this.enrollments = response.data;
			})
			.catch(error => {
				console.log("Something went wrong: ");
				console.log(error);
			});	
		},
		methods: {
			getCurrentEnrollments(programId) {
				if(this.enrollments != null) {
					console.log(this.enrollments);
					this.enrollments.forEach(enrollment => {
						console.log("enrollment = " + enrollment);
						if( enrollment['ProgramId'] == programId ){
							return enrollment['NumOfEnrollments'];
						}
					});
				}
				return 0;
			},
			getCost(baseCost){
				if( this.credentials != null ) {
					if(this.credentials.Member == 1){
						return baseCost / 2;
					} else {
						return baseCost;
					}
				}
				return baseCost;
			} 
		}		
	}
</script>

<template>
	<div>
		<Header :credentials="this.credentials"/>
		<div>
			<div class="container card-deck">
				<div v-for="program in this.programs" v-bind:key="program" class="card border-primary mt-3">
					<div class="card-body">
						<h3 class="card-title card-header">{{ program['Title'] }}</h3>
						<p>{{ program['Description'] }} (${{ getCost( program['Cost'] ) }}/Person)</p>

						<a href="#" class="btn btn-primary btn-sm mb-3">Sign Up</a>	
						<div class="card-footer footer">
							<div class="program-detail">{{ getCurrentEnrollments( program['ProgramId'] ) }} / {{ program['Capacity'] }} Slots filled</div>
							<div class="text-muted" >02/2022 {{ program['OfferingDate']}}</div>
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