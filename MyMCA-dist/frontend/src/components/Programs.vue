/*
* File name: Programs.vue
* Purpose: Shows programs based on user/search criteria
* Authors: Heather Miller, Hannah Hunt
* Date Created: 2/20/22
* Last Modified: 4/26/22
*/

<script>
	import SearchBar from './SearchBar.vue'
	import Service from '../services/Service.js'
	import DialogPrompt from './DialogPrompt.vue'
	import moment from 'moment'

	export default {
		components: { SearchBar, DialogPrompt },
		props: ['credentials', 'isUserOnly'],
		data() {
			return {
				programs: null,
				enrollments: null,
				userEnrollments: null,
				showEnrollDialog: false,
				isConfirmDialogVisible: false,
				selectedProgramId: null,
			};
		},
		beforeMount() {
			var id = this.isUserOnly ? this.credentials.UserId : 'null';
			Service.getUserEnrollments(id).then(response => {
				this.userEnrollments = response.data;
			}).catch(error => {
					console.log("Something went wrong: ");
					console.log(error);
			});
		},
		mounted() {
			this.queryPrograms(0);
		},

		methods: {
			/*
			* Name: queryPrograms
			* Purpose: Filters the programs shown based on the search query
			* Parameters: searchTerm (string; null if no search)
			*/
			queryPrograms(searchTerm) {
				if (this.isUserOnly) {
					// Get data for Enrollments page
					Service.getUserPrograms(this.credentials.UserId, searchTerm).then(response => {
						this.programs = response.data;
						// Getting number of enrollments for all programs and specify user enrollments
						this.getEnrollmentsForPrograms(true);
					});
				} else {
					// Get data for Programs page					
					if( this.credentials != null && this.credentials.Staff == 1 ){
						Service.getPrograms( searchTerm ).then(response => {
							this.programs = response.data;
						});
					} else {
						Service.getNonDeactivatedPrograms( searchTerm ).then(response => {
							this.programs = response.data;
						});	
					}

					this.getEnrollmentsForPrograms(false);
				}
			},
			/*
			* Name: enrollUser
			* Purpose: Attempts to enroll the user in the specified program
			* Parameters: programId (integer)
			*/
			enrollUser(programId, firstName) {
				console.log("name = " + this.firstName)

				this.isConfirmDialogVisible = false
				if( firstName && firstName.length > 0 ){
					this.showEnrollDialog = false;
					this.enrollmentInvalid = false;

					Service.enrollUser(this.credentials.UserId, programId, firstName).then((response) => {
						this.popUpSignUpSuccessAlert(programId);
						this.enrollments = response.data;
						
						// Update the user enrollments in the view
						Service.getUserEnrollments(this.credentials.UserId).then(response => {
							this.userEnrollments = response.data;
							this.programs.forEach(program => {
								program['UserEnrollments'] = this.getCurrentEnrollments(program['ProgramId'], this.userEnrollments);
							});
						});
					}).catch(() => {
						this.popUpSignUpFailureAlert(programId, "Something went wrong, try again later.");
					});
				} else {
					this.popUpSignUpFailureAlert(programId, "Enter your first name to enroll");
				}
			},
			/*
			* Name: hasTimeConflict
			* Purpose: Determines if a program conflicts with a user's enrollments
			* Parameters: programOfferingDate (string; the database-parsed start date of the program)
			*/
			hasTimeConflict(programOfferingDate) {
				let d1 = new Date(programOfferingDate);
				let res = false;

				this.userEnrollments.forEach(enrollment => {
					let d2 = new Date(enrollment.OfferingPeriod);
					
					if( d1.getDay() == d2.getDay() && d1.getTime() == d2.getTime() ){
						res = true;
					}
				});

				return res;
			},
			/*
			* Name: getEnrollmentsForPrograms
			* Purpose: Gets enrollments for programs from the database.
			* Parameters: none
			*/
			getEnrollmentsForPrograms() {
				Service.getEnrollments().then(response => {
					this.enrollments = response.data;
					if( this.programs ) {
						this.programs.forEach(program => {
							var startDate = new Date(program['OfferingPeriod']);
							var endDate = new Date(program['OfferingPeriodEnd']);
							program['OfferingDate'] = startDate.toLocaleString();
							program['OfferingDateEnd'] = endDate.toLocaleString();
							program['Enrollments'] = this.getCurrentEnrollments(program['ProgramId']);
							if (this.isUserOnly) {
								program['UserEnrollments'] = this.getCurrentEnrollments(program['ProgramId'], this.userEnrollments);
							}
						});
					}
				});
			},
			/*
			* Name: getCurrentEnrollments
			* Purpose: Gets the total number of enrollments in the specified program
			* Parameters: program (Object; contains the program's information)
			*/
			getCurrentEnrollments(program) {
				if(this.enrollments != null) {
					let num = this.enrollments.filter( e => e.ProgramId == program.ProgramId ).map( e => e.NumOfEnrollments )[0];
					if( num !== undefined && num !== null ){
						return num;
					} else {
						return 0;
					}
				}
			},
			/*
			* Name: isSignUpEnabled
			* Purpose: Determines if the "Sign Up" button is valid for use
			* Parameters: program (Object; contains the program's information)
			*/
			isSignUpEnabled: function (program) {
				return this.credentials !== null && 
						this.getCurrentEnrollments(program) < program['Capacity'] && 
						program['Active'] == 1;
			},
			/*
			* Name: isEditButtonVisible
			* Purpose: Determines if the "Sign Up" button is valid for use
			* Parameters: program (Object; contains the program's information)
			*/
			isEditButtonVisible(program) {
				return !this.isUserOnly && 
						this.credentials != null && 
						this.credentials.Staff == 1 && 
						program['Active'] == 1;
			},
			/*
			* Name: getCost
			* Purpose: Gets the cost of the program, including member discounts
			* Parameters: baseCost (double; the cost of the program before discounts)
			*/
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
			/*
			* Name: getFormattedDays
			* Purpose: Formats the program occurrence days for display
			* Parameters: days (Array of Objects; a program's occurrence days)
			*/
			getFormattedDays(days){
				let formatted = '';

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
			/*
			* Name: getFormattedDate
			* Purpose: Formats the start and end dates of a program
			* Parameters: value (string; a program's start or end date as parsed in the database)
			*/
			getFormattedDate(value) {
				if (value) {
    					return moment(String(value)).format('MM/DD hh:mm A')
				} else {
					return '';
				}
			},
			/*
			* Name: popUpSignUpSuccessAlert
			* Purpose: Creates a popup message for successfully registering for a program
			* Parameters: programId (integer; the id of the program that was signed up for)
			*/
			popUpSignUpSuccessAlert(programId) {
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
			/*
			* Name: popUpSignUpFailureAlert
			* Purpose: Creates a popup message for failing to register for a program
			* Parameters: programId (integer; the id of the program that was signed up for), message (string; the failure message to display)
			*/
			popUpSignUpFailureAlert(programId, message) {
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
			},
			/*
			* Name: editProgram
			* Purpose: Redirects to the Edit Program page for the specified program
			* Parameters: programId (integer; the id of the program to edit)
			*/
			editProgram(programId) {
				this.$router.push({name: 'edit-program', params: { programId: programId }});
			}
		}
	}
</script>

<template>
	<div>
		<div class="body pt-3">
			<SearchBar @search="this.queryPrograms" :term="'Programs'"/>
			<DialogPrompt v-if="this.isConfirmDialogVisible" 
				:confirmFunction="enrollUser"
				:confirmFunctionInput="this.selectedProgramId"
				:text="'Please enter your first name'"
				:cancelButtonText="'Cancel'"
				:confirmButtonText="'Enroll'"
				:isDialogVisible="this.isConfirmDialogVisible"/>
			<div class="container">
				<div class="list-group list-group-horizontal align-items-stretch flex-wrap">
					<div v-for="program in this.programs" v-bind:key="program" class="list-group-item program-card card shadow-sm bg-body rounded">
						<div :id="'program-' + program['ProgramId']" class="card-body">
							<h3 class="program-card-title card-header">
								<span class="programViewerTitle">{{ program['Title'] }}</span>

								<span v-if="isEditButtonVisible(program)" 
										class="material-icons edit-button" 
										@click="this.editProgram(program['ProgramId'])">edit</span>
							</h3>
							<div class="m-3">
								<div class="fs-6">{{ program['Description'] }}</div>
								<div class="pt-2 pb-2 program-more-info">
									<div>
										${{ getCost(program['Cost']) }}/Person
									</div>
									<div>
										Offered on {{ getFormattedDays(program['Days']) }} for {{ program['Repetitions'] }} 
										week(s) at the {{program['Location']}}.
									</div>

									<div v-if="this.isUserOnly" class="enrollment-name">Enrolled in by {{program['FirstName']}}</div>
									
									<div v-if="hasTimeConflict(program['OfferingPeriod'])" class="info">
										<span>This program conflicts with another program you are enrolled in</span>
									</div>
									
									<div class="program-deactivation-text" v-if="program['Active'] == 0">
										<span>This program has been deactivated. </span>
										<span v-if="!this.isUserOnly">You cannot sign up for this program.</span>
										<span v-else>Your enrollments have been canceled.</span>
									</div>
								</div>

								<button v-if="isSignUpEnabled(program)" @click="this.isConfirmDialogVisible = true; this.selectedProgramId = program['ProgramId']" class="btn btn-outline-primary btn mb-3">Sign Up</button>  
								<button v-if="!isSignUpEnabled(program)" class="disabled btn btn-outline-secondary btn mb-3">Sign Up</button>								
							</div>

							<div class="card-footer footer">
								<div class="fs-6">{{ getCurrentEnrollments( program ) }} / {{ program['Capacity'] }} Slots filled</div>
								<div class="text-muted" >Start Date: {{ getFormattedDate( program['OfferingPeriod']) }}</div>
								<div class="text-muted" >End Date: {{ getFormattedDate( program['OfferingPeriodEnd']) }}</div>
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
	min-width: 100vw;
	min-height: 100vh;
	padding-bottom: 300px;
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

.info {
	color: #006FBF;
	font-size: small;
	font-style: italic;
	margin-top: 10px;
	margin-bottom: 10px;
}

.footer {
	font-size: small;
}

.programViewerTitle {
	margin-right: 10px;
}


.program-deactivation-text {
	color: #ff5454;
	font-size: small;
	font-style: italic;
	margin-top: 10px;
	margin-bottom: 10px;
}

.edit-button {
	color: rgb(102, 102, 102);
	float: right;
	cursor: pointer;
}

.edit-button:hover {
	color: black;
}

.error-input {
	color:red;
	border-color: red;
}

.enrollment-name {
	margin-top: 10px;
	font-weight: bolder;
	color: black;
}

</style>