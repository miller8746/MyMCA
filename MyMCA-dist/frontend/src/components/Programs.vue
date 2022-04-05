<script>
	import Service from '../services/Service.js'
	import moment from 'moment'

	export default {
		props: ['credentials', 'isUserOnly'],
		data() {
			return {
				programs: null,
				enrollments: null,
				userEnrollments: null
			};
		},
		mounted() {
			var id = this.isUserOnly ? this.credentials.UserId : 'null';
			Service.getPrograms(id).then(response => {
				this.programs = response.data;
				// Getting number of enrollments for all programs
				Service.getEnrollments().then(response => {
					this.enrollments = response.data;
					this.programs.forEach(program => {
						var startDate = new Date(program['OfferingPeriod']);
						var endDate = new Date(program['OfferingPeriodEnd']);
						program['OfferingDate'] = startDate.toLocaleString();
						program['OfferingDateEnd'] = endDate.toLocaleString();
						program['Enrollments'] = this.getCurrentEnrollments(program['ProgramId'], this.enrollments);
					});

					if (this.isUserOnly) {
						Service.getUserEnrollments(this.credentials.UserId).then(response => {
							this.userEnrollments = response.data;
							this.programs.forEach(program => {
								program['UserEnrollments'] = this.getCurrentEnrollments(program['ProgramId'], this.userEnrollments);
							});
						});
					}
				}).catch(error => {
					console.log("Something went wrong: ");
					console.log(error);
				});
			})
			.catch(error => {
				console.log("Something went wrong: ");
				console.log(error);
			});
		},
		methods: {
			enrollUser(programId) {
				Service.enrollUser(this.credentials.UserId, programId).then((response) => {
					this.popUpSignUpSuccessAlert(programId);
					this.enrollments = response.data;
				}).catch(error => {
					this.popUpSignUpFailureAlert(programId, "Something went wrong, try again later.");
					console.log("Something went wrong:");
					console.log(error);
				});
			},
			getCurrentEnrollments(program) {
				if(this.enrollments != null) {
					let num = this.enrollments.filter( e => e.ProgramId == program.ProgramId ).map( e => e.NumOfEnrollments )[0];
					console.log("num = " + num);
					if( num !== undefined && num !== null ){
						return num;
					} else {
						return 0;
					}
				}
			},
			isSignUpEnabled: function (program) {
				return this.credentials !== null && 
						this.getCurrentEnrollments(program) < program['Capacity'];
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
			// getUserCost(program) {
			// 	var baseCost = program['Cost'];
			// 	if( this.credentials != null ) {
			// 		if(this.credentials.Member == 1) {
			// 			var d = baseCost / 2;
			// 			return (d * program['UserEnrollments']).toFixed(2);
			// 		} else {
			// 			return baseCost;
			// 		}
			// 	}
			// 	return baseCost;
			// },
			getFormattedDays(days){
				let formatted = 'Offered ';

				days.forEach((day) => {						
					if( day.Day == "Monday"){
						formatted += "Monday, ";
					} else if( day.Day == "Tuesday"){
						formatted += "Tuesday, ";
					} else if( day.Day == "Wednesday"){
						formatted += "Wednesday, ";
					} else if( day.Day == "Thursday"){
						formatted += "Thursday, ";
					} else if( day.Day == "Friday"){
						formatted += "Friday, ";
					} else if( day.Day == "Saturday"){
						formatted += "Saturday, ";
					} else if( day.Day == "Sunday"){
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
			popUpSignUpFailureAlert(programId, message){
				let alert = document.createElement("div"); 
				alert.setAttribute("class", "alert alert-danger alert-dismissible fade show alert-font");
				alert.setAttribute("role", "alert");

				let alertMessage = document.createTextNode(message);
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
										${{ getCost(program['Cost']) }}/Person
									</div>
									<!-- <div v-if="this.isUserOnly">
										You are paying ${{ getUserCost(program) }} for this program.
									</div> -->
									<div>
										{{ getFormattedDays(program['Days']) }} 
									</div>
								</div>

								<button v-if="isSignUpEnabled(program)" @click="enrollUser(program['ProgramId'])" class="btn btn-outline-primary btn mb-3">Sign Up</button>  
								<button v-else class="disabled btn btn-outline-secondary btn mb-3">Sign Up</button>
							</div>

							<div class="card-footer footer">
								<div class="fs-6">{{ getCurrentEnrollments( program ) }} / {{ program['Capacity'] }} Slots filled</div>
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
	background-color: rgb(233, 233, 233);
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
	background-color: rgb(252, 252, 252) !important;
}

.program-card:hover {
    box-shadow: 0 8px 17px 0 rgba(119, 119, 119, 0.2), 0 6px 20px 0 rgba(85, 85, 85, 0.19) !important;
	background-color: white !important;
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