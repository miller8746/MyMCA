<script>
	import Header from './Header.vue'
	import Service from '../services/Service.js'

	export default {
		components: { Header },
		data() {
			return {
				credentials: this.$store.state.credentials,
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
				showDataError: false
			};
		},
		methods: {
			createProgram() {
				this.showFormatError = false;
				this.showDataError = false;
				if (this.checkData()) {
					if (this.checkValidity()) {
						var program = {
							title: this.programTitle,
							description: this.programDescription,
							capacity: this.programCapacity,
							repetitions: this.programRepetitions,
							cost: this.programCost,
							offeringPeriod: this.programStartDate,
							offeringPeriodEnd: this.programEndDate,
							location: this.programLocation,
							days: this.days
						};

						Service.createProgram(program).then((res) => {
							this.$router.push('/programs');
						});
					} else {
						// Data is filled in, but not valid
						this.showFormatError = true;
					}
				} else {
					// Some data is not filled in
					this.showDataError = true;
				}
			},
			addOccurrence() {
				if (this.dayCount < 7) {
					this.dayCount++;
				}
			},
			checkData() {
				// Check if all data in form is filled in
				if (this.days.length - 1 != this.dayCount) {
					return false;
				} else {
					for (var i = 1; i < this.days.length; i++) {
						if (this.days[i] == null) {
							return false;
						}
					}
				}
				if (this.programTitle 		!= '' 	&& 
				    this.programDescription != '' 	&& 
				    this.programCapacity 	!= 0 	&& 
					this.programRepetitions != 0 	&&
				    this.programCost 		!= 0 	&& 
				    this.programStartDate 	!= '' 	&& 
				    this.programEndDate 	!= '' 	&& 
				    this.programLocation 	!= '') {
					return true;
				} else return false;
			},
			checkValidity() {
				var dayExists = [];
				for (var i = 1; i < this.days.length; i++) {
					if (dayExists[this.days[i]]) {
						return false;
					} else {
						dayExists[this.days[i]] = true;
					}
				}
				var startDate = new Date(this.programStartDate);
				var endDate = new Date(this.programEndDate);
				// Check if data in form is valid
				if (this.programCapacity 	> 0 			&&
                    this.programCost 		> 0 			&&
					this.programRepetitions > 0 			&&
				    startDate 				> Date.now() 	&& 
				    endDate 				> Date.now() 	&& 
				    startDate 				< endDate) {
					return true;
				} else return false;
			}
		},
		mounted() {
			this.minDate = new Date(Date.now()).toISOString();
		}
	};
</script>

<template>
	<div>
		<Header :credentials="this.credentials" :helpLink="'https://miller8746.github.io/MyMCA/build/UserManual/StaffOnly/programcreation.html'"/>
		<div class="pageContent create-page">
			<div class="card create-card shadow-lg">
				<div class="card-body">
					<h3 class="header-text">Create Program</h3>

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
							<div class="btn btn-primary input-group-text" @click="addOccurrence">+</div>
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
						<div class="button" @click="createProgram()">Submit</div>
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