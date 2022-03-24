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
				enrollments: null,
			};
		},
		mounted() {
			// Getting all available programs
			Service.getPrograms().then(response => {
				this.programs = response.data;
				this.programs.forEach(program => {
					var startDate = new Date(program['OfferingPeriod']);
					var endDate = new Date(program['OfferingPeriodEnd']);
					program['OfferingDate'] = startDate.toLocaleString();
					program['OfferingDateEnd'] = endDate.toLocaleString();
					program['RepeatDays'] = [];
					program['Days'].forEach((day) => {
						program['RepeatDays'].push(day.Day);
					});
				});
			})
			.catch(error => {
				console.log("Something went wrong: ");
				console.log(error);
			});
			// Getting number of enrollments for all programs
			Service.getEnrollments().then(response => {
				this.enrollments = response.data;
			})
			.catch(error => {
				console.log("Something went wrong: ");
				console.log(error);
			});	
		},
		methods: {
			enrollUser(programId){
				Service.enrollUser(this.credentials.UserId, programId)
					.then(() => {
						this.popUpSignUpAlert(programId);
					})
					.catch(error => {
						console.log("Something went wrong:");
						console.log(error);
					}
				);
			},
			getCurrentEnrollments(programId) {
				if(this.enrollments != null) {
					this.enrollments.forEach(enrollment => {
						if( enrollment['ProgramId'] == programId ){
							return enrollment['NumOfEnrollments'];
						}
					});
				}
				return 0;
			},
			getCost(baseCost){
				if( this.credentials != null ) {
					if(this.credentials.Member == 1) {
						var d = baseCost / 2;
						return d.toFixed(2);
					} else {
						return baseCost;
					}
				}
				return baseCost;
			}, 
			getFormattedRepeatDays(repeatDays){
				let formatted = '';
				repeatDays.forEach(day => {
					if( day == "Monday"){
						formatted += "Mon/";
					} else if( day == "Tuesday"){
						formatted += "Tue/";
					} else if( day == "Wednesday"){
						formatted += "Wed/";
					} else if( day == "Thursday"){
						formatted += "Thu/";
					} else if( day == "Friday"){
						formatted += "Fri/";
					} else if( day == "Saturday"){
						formatted += "Sat/";
					} else if( day == "Sunday"){
						formatted += "Sun/";
					}
				});

				if( formatted.length > 0 ){
					formatted = formatted.substring(0, formatted.length-1);
				} 
				
				return formatted;
			},
			getFormattedDate(value) {
				console.log("value " + value);
				if (value){
    				return moment(String(value)).format('MM/DD hh:mm A')
				} else {
					return '';
				}
			},
			popUpSignUpAlert(programId){
				let alert = document.createElement("div"); 
				alert.setAttribute("class", "alert alert-success alert-dismissible fade show");
				alert.setAttribute("role", "alert");

				let alertMessage = document.createTextNode("You are now signed up for this program.");
				alert.appendChild(alertMessage);

				let alertExitButton = document.createElement("button");
				alertExitButton.setAttribute("type", "button"); 
				alertExitButton.setAttribute("class", "btn-close"); 
				alertExitButton.setAttribute("data-bs-dismiss", "alert"); 
				alertExitButton.setAttribute("aria-label", "Close"); 

				alert.appendChild(alertExitButton);
						
				let card = document.getElementById("program-" + programId);
				card.prepend(alert);
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
					<div :id="'program-' + program['ProgramId']" class="card-body">
						<h3 class="card-title card-header">{{ program['Title'] }}</h3>
						<div>
							{{ program['Description'] }}
						</div>	
						<div class="pt-2 pb-2 program-more-info">
							<div>
								${{ getCost( program['Cost'] ) }}/Person
							</div>
							<div>
								{{ getFormattedRepeatDays(program['RepeatDays']) }} 
							</div>
						</div>

						<span @click="enrollUser(program['ProgramId'])" class="btn btn-primary btn-sm mb-3">Sign Up</span>		

						<div class="card-footer footer">
							<div class="program-detail">{{ getCurrentEnrollments( program['ProgramId'] ) }} / {{ program['Capacity'] }} Slots filled</div>
							<div class="text-muted" >Start Date: {{ getFormattedDate( program['OfferingDate']) }}</div>
							<div class="text-muted" >End Date: {{ getFormattedDate( program['OfferingDateEnd']) }}</div>
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

.program-more-info {
	font-size: small;
	color: rgb(87, 85, 85);
}
</style>