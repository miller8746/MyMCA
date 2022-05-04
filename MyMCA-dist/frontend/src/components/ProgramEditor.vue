/*
* File name: ProgramEditor.vue
* Purpose: Component responsible for taking inputs for program information
* Authors: Heather Miller
* Date Created: 2/23/22
* Last Modified: 5/4/22
*/

<script>
	import DialogPrompt from './DialogPrompt.vue'
	import Service from '../services/Service.js'

	export default {
		components: { DialogPrompt },
		props: ['program', 'saved'],
		emits: ['submitProgram', 'deactivateProgram'],
		data() {
			return {
				programTitle: '',
				programDescription: '',
				programCapacity: 0,
				programCost: 0.0,
				programStartDate: '',
				programEndDate: '',
				programLocation: '',
				programRepetitions: 1,
				minDate: null,
				dayCount: 1,
				days: [],
				showFormatError: false,
				showDataError: false,
				isDeactivateDialogVisible: false
			};
		},
		methods: {
			/*
			* Name: submitProgram
			* Purpose: Attempts to submit edits to the program with the entered information
			* Parameters: none
			*/
			submitProgram() {
				this.showFormatError = false;
				this.showDataError = false;
				// Check that all necessary information has been entered
				if (this.checkData()) {
					// Check that the entered data is valid
					if (this.checkValidity()) {
						// Standardize the days array to 0 index
						var programDays = [];
						var i = 0;
						for (i = 0; i < this.dayCount; i++) {
							programDays[i] = this.days[i+1];
						}
						var program = {
							title: this.programTitle,
							description: this.programDescription,
							capacity: this.programCapacity,
							repetitions: this.programRepetitions,
							cost: this.programCost,
							offeringPeriod: this.programStartDate,
							offeringPeriodEnd: this.programEndDate,
							location: this.programLocation,
							days: programDays,
							id: this.program ? this.program.ProgramId : null
						};

						this.$emit('submitProgram', program);
					} else {
						// Data is filled in, but not valid
						this.showFormatError = true;
					}
				} else {
					// Some data is not filled in
					this.showDataError = true;
				}
			},
			/*
			* Name: deactivateProgram
			* Purpose: Sets the program to an inactive state and redirects to the Programs page
			* Parameters: none
			*/
			deactivateProgram(programId) {
				this.isDeactivateDialogVisible = false;
				Service.deactivateProgram(programId).then((res) => {
					this.$router.push('/programs');
				});
			},
			/*
			* Name: addOccurrence
			* Purpose: Adds a week day occurrence when the user hits the + button
			* Parameters: none
			*/
			addOccurrence() {
				if (this.dayCount < 7) {
					this.dayCount++;
				}
			},
			/*
			* Name: removeOccurrence
			* Purpose: Removes a week day occurrence when the user hits the - button
			* Parameters: none
			*/
			removeOccurrence() {
				if (this.dayCount > 1) {
					this.dayCount--;
				}
			},
			/*
			* Name: checkData
			* Purpose: Checks that all the necessary data has been filled in
			* Parameters: none
			*/
			checkData() {
				// Make sure all occurrence day dropdowns are filled in
				for (var i = 1; i <= this.dayCount; i++) {
					if (this.days[i] == null) {
						return false;
					}
				}
				// Make sure all other information is filled in
				if (this.programTitle != '' && 
				    this.programDescription != '' && 
				    this.programCapacity != 0 && 
				    this.programRepetitions != 0 &&
				    this.programCost != 0 && 
				    this.programStartDate != '' && 
				    this.programEndDate != '' && 
				    this.programLocation != '') {
					return true;
				} else return false;
			},
			/*
			* Name: checkValidity
			* Purpose: Checks that the entered data is valid
			* Parameters: none
			*/
			checkValidity() {
				var dayExists = [];
				// Makes sure occurrence days are not entered multiple times
				for (var i = 1; i < this.days.length; i++) {
					if (dayExists[this.days[i]]) {
						return false;
					} else {
						dayExists[this.days[i]] = true;
					}
				}
				var startDate = new Date(this.programStartDate);
				var endDate = new Date(this.programEndDate);
				// Check if other data in form is valid
				var datesValid = startDate > Date.now() && endDate > Date.now() || this.program != null;
				var capacityValid = this.program == null || this.programCapacity >= this.program.Capacity;
				if (this.programCapacity > 0 &&
				    capacityValid &&
                    		    this.programCost > 0 &&
				    this.programRepetitions > 0 &&
				    datesValid && 
				    startDate < endDate) {
					return true;
				} else return false;
			},
			/*
			* Name: refreshProgramData
			* Purpose: Refreshes the form data with the program data given by the parent (edit page only)
			* Parameters: program (Object; the loaded program data)
			*/
			refreshProgramData(program) {
				this.programTitle = program.Title;
				this.programDescription = program.Description;
				this.programCapacity = program.Capacity;
				this.programCost = program.Cost;
				this.programStartDate = program.OfferingPeriod;
				this.programEndDate = program.OfferingPeriodEnd;
				this.programLocation = program.Location;
				this.programRepetitions = program.Repetitions;
				
				this.dayCount = program.Days.length;
				this.days = [];
				var i = 1;
				for (i = 1; i <= this.dayCount; i++) {
					this.days[i] = program.Days[i - 1].Day;
				}
			}
		},
		mounted() {
			this.minDate = new Date(Date.now()).toISOString();
		}
	};
</script>

<template>
	<div>
		<DialogPrompt v-if="this.isDeactivateDialogVisible" 
						:confirmFunction="deactivateProgram"
						:confirmFunctionInput="this.program.ProgramId"
						:text="'Are you sure you want to deactivate this program? This action cannot be undone.'"
						:cancelButtonText="'Cancel'"
						:confirmButtonText="'Deactivate'"
						:isDialogVisible="this.isDeactivateDialogVisible"
						@exitPrompt="this.isDeactivateDialogVisible = false;"/>
		<div class="pageContent create-page">
			<div class="card create-card shadow-lg">
				<div class="card-body">
					<h3 v-if="this.program == null" class="header-text">Create Program</h3>
					<h3 v-else class="header-text">Edit Program</h3>
					<div class="input-group mb-2">
						<label class="input-group-text program-create-label">Title </label>
						<input class="form-control" style="height:38px;" v-model="programTitle"/>
					</div>

					<div class="input-group mb-2">
						<label class="input-group-text program-create-label">Location </label>
						<input class="form-control" style="height:38px;" v-model="programLocation"/>
					</div>

					<div class="input-group mb-2">
						<label class="input-group-text program-create-label">Capacity </label>
						<input class="form-control" style="height:38px;" type="number" v-model.number="programCapacity"/>
					</div>

					<div class="input-group mb-2">
						<label class="input-group-text program-create-label">Cost ($) </label>
						<input class="form-control" style="height:38px;" type="number" v-model.number="programCost"/>
					</div>
					
					<div class="input-group mb-2">
						<label class="input-group-text program-create-label">Start Date </label>
						<input class="form-control" style="height:38px;" type="datetime-local" :min="minDate" v-model="programStartDate"/>
					</div>
					<div class="input-group mb-2">
						<label class="input-group-text program-create-label">End Date </label>
						<input class="form-control" style="height:38px;" type="datetime-local" :min="minDate" v-model="programEndDate"/>
					</div>
					<div class="input-group mb-2">
						<label class="input-group-text program-create-label">Days </label>
						<div class="selectContainer">
							<select v-for="dayOption in dayCount" v-bind:key=dayOption v-model="days[dayOption]" class="daySelect" style="height:38px;">
								<option value="Sunday">Sunday</option>
								<option value="Monday">Monday</option>
								<option value="Tuesday">Tuesday</option>
								<option value="Wednesday">Wednesday</option>
								<option value="Thursday">Thursday</option>
								<option value="Friday">Friday</option>
								<option value="Saturday">Saturday</option>
							</select>
						</div>
						<div class="btn input-group-text dayOccurrenceButton editProgramRemoveButton" @click="removeOccurrence">-</div>
						<div class="btn btn-primary input-group-text edit-program-add-button dayOccurrenceButton" @click="addOccurrence">+</div>
					</div>
					<div class="input-group mb-2">
						<span class="input-group-text program-create-label">Repeats for </span>
						<input class="form-control" style="height:38px;" type="number" v-model="programRepetitions"/>
						<span class="input-group-text program-create-label"> week(s)</span>
					</div>
					<div class="input-group mb-2">
						<div class="input-group-text program-create-label">Description </div>
						<textarea class="form-control" style="height:50px;" v-model="programDescription"/>
					</div>
				</div>
				<div class="programButtonContainer">
					<div>
						<div v-if="program != null" class="button editProgramRemoveButton" @click="this.isDeactivateDialogVisible = true">Deactivate</div>
						<div class="button" @click="submitProgram()">Save</div>
					</div>
					<div v-if="this.saved">Saved.</div>
					<div v-if="showFormatError" class="warningText">The information you have entered is not formatted correctly.</div>
					<div v-if="showDataError" class="warningText">Please fill in all fields.</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.create-card {
	margin-top: 3%;
	margin-bottom: 20%;
	padding: 2% 10% 3% 10%;

	border-top-color: #44a1e4;
	border-top-width: 10px;
}

.header-text {
	text-align: center;
	margin-bottom: 40px;
}

.option {
	display: flex;
	margin: 8px 0px 8px 0px;
}

.programInputLabel {
	width: 105px;
	font-size: 12pt;
	text-align: right;
	margin-right: 6px;
}

.descriptionArea {
	font-size: 10pt;
	height: 68px;
	width: 200px;
}

.programButtonContainer {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.daySelect {
	font-size: 12pt;
}

.dayOccurrenceButton {
	margin-left: 2px !important;
	height: 38px;
	transition: background-color 0.5s fade;
}

.edit-program-add-button {
	background-color : rgb(32, 163, 32);
	border-radius: 50%;
}

.edit-program-add-button:hover {
	background-color: green !important;
	color: #FFFFFF;
}

.editProgramRemoveButton {
	background-color: #ff5454 !important;
	color: #FFFFFF;
	border-radius: 50%;
}

.editProgramRemoveButton:hover {
	background-color: #de4949 !important;
	color: #FFFFFF;
}

.selectContainer {
	display: flex;
	flex-direction: column;
}

.occurrenceContainer {
	display: flex;
	justify-content: space-between;
	width: 200px;
}

.create-page {
	background-color: rgb(233, 233, 233);
	width: 100vw;
	min-height: 100vh;
}

.program-create-label {
	width: 150px;
}

.button {
  background-color: #0d6efd;
  color: white;

  border: none;
  
  padding: 10px 20px;
  width: 200px;

  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;

  border-radius: 25px;
}

.button:hover {
	background-color: #154a99;
}


</style>
