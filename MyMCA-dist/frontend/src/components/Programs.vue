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
			Service.getEnrollments()
				.then(response => {
					this.enrollments = JSON.stringify(response.data);
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
						this.popUpSignUpSuccessAlert(programId);
					})
					.catch(error => {
						this.popUpSignUpFailureAlert(programId);
						console.log("Something went wrong:");
						console.log(error);
					}
				);
			},
			getCurrentEnrollments(programId) {
				// console.log("get current = " + this.enrollments);
				// console.log("programid = " + programId);
				// if(this.enrollments != null) {
				// 	for(var i = 0; i < this.enrollments.length; i++){
				// 		if( this.enrollment[i]['ProgramId'] == programId ){
				// 			return this.enrollment[i]['NumOfEnrollments'] == null ? 0 : this.enrollment[i]['NumOfEmrollments'];
				// 		}	
				// 	}

				// 	this.enrollments.forEach(enrollment => {
				// 		if( enrollment['ProgramId'] == programId ){
				// 			return enrollment['NumOfEnrollments'] == null ? 0 : enrollment['NumOfEmrollments'];
				// 		}
				// 	});
				// }
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
				let formatted = 'Offered ';
				repeatDays.forEach(day => {
					if( day == "Monday"){
						formatted += "Monday, ";
					} else if( day == "Tuesday"){
						formatted += "Tuesday, ";
					} else if( day == "Wednesday"){
						formatted += "Wednesday, ";
					} else if( day == "Thursday"){
						formatted += "Thursday, ";
					} else if( day == "Friday"){
						formatted += "Friday, ";
					} else if( day == "Saturday"){
						formatted += "Saturday, ";
					} else if( day == "Sunday"){
						formatted += "Sunday, ";
					}
				});

				if( formatted.length > 0 ){
					formatted = formatted.substring(0, formatted.length-2);
				} 
				
				return formatted;
			},
			getFormattedDate(value) {
				if (value){
    				return moment(String(value)).format('MM/DD hh:mm A')
				} else {
					return '';
				}
			},
			popUpSignUpSuccessAlert(programId){
				let alert = document.createElement("div"); 
				alert.setAttribute("class", "alert alert-success alert-dismissible fade show alert-font");
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
			},
			popUpSignUpFailureAlert(programId){
				let alert = document.createElement("div"); 
				alert.setAttribute("class", "alert alert-danger alert-dismissible fade show");
				alert.setAttribute("role", "alert");

				let alertMessage = document.createTextNode("Something went wrong, try again later.");
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
		<div class="body pt-3">
			<div class="container">
				<div class="list-group list-group-horizontal align-items-stretch flex-wrap">
					<div v-for="program in this.programs" v-bind:key="program" class="list-group-item program-card card shadow-sm bg-body rounded">
						<div :id="'program-' + program['ProgramId']" class="card-body">
							<h3 class="program-card-title card-header">{{ program['Title'] }}</h3>
							<div class="m-3">
								<div class="fs-6">
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
								
								<span @click="enrollUser(program['ProgramId'])" :disabled="getCurrentEnrollments(program['ProgramId']) === program['Capacity']" class="btn btn-outline-primary btn mb-3">Sign Up</span>  
							</div>

							<div class="card-footer footer">
								<div class="fs-6">{{ getCurrentEnrollments( program['ProgramId'] ) }} / {{ program['Capacity'] }} Slots filled</div>
								<div class="text-muted" >Start Date: {{ getFormattedDate( program['OfferingDate']) }}</div>
								<div class="text-muted" >End Date: {{ getFormattedDate( program['OfferingDateEnd']) }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>


.body {
	background-color: rgb(240, 240, 240);
	width: 100vw;
	min-height: 100vh;
}

.list-group-item {
    width: 95%;
    margin: 1% !important;
}

@media (min-width: 576px) {
    .list-group-item {
        width: 30%;
        margin: 5px 1.5% !important;
    }
}

.program-card {
	margin-bottom: 15px !important;
}

.program-card:hover {
    box-shadow: 0 8px 17px 0 rgba(119, 119, 119, 0.2), 0 6px 20px 0 rgba(85, 85, 85, 0.19) !important;
	margin-top: -2px !important; 
    transition: all .3s ease-in-out;
}

.program-card-title {
	color: rgb(70, 69, 69);
}

.program-more-info {
	font-size: small;
	color: rgb(87, 85, 85);
}

.alert-font {
	font-size: small;
}

.footer {
	font-size: small;
}

</style>