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
				if (this.programTitle != '' && 
				    this.programDescription != '' && 
				    this.programCapacity != 0 && 
				    this.programCost != 0 && 
				    this.programStartDate != '' && 
				    this.programEndDate != '' && 
				    this.programLocation != '') {
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
				if (this.programCapacity > 0 &&
                                    this.programCost > 0 &&
				    startDate > Date.now() && 
				    endDate > Date.now() && 
				    startDate < endDate) {
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
		<div class="pageContent">
			<div class="card border-primary mt-3">
				<div class="card-body">
					<h3 class="card-title card-header">Create Program</h3>
					<div class="programInputContainer">
						<div class="option">
							<div class="programInputLabel">Title: </div>
							<input v-model="programTitle"/>
						</div>
						<div class="option">
							<div class="programInputLabel">Capacity: </div>
							<input type="number" v-model.number="programCapacity"/>
						</div>
						<div class="option">
							<div class="programInputLabel">Cost ($): </div>
							<input type="number" v-model.number="programCost"/>
						</div>
						<div class="option">
							<div class="programInputLabel">Location: </div>
							<input v-model="programLocation"/>
						</div>
						<div class="option">
							<div class="programInputLabel">Start Date: </div>
							<input type="datetime-local" :min="minDate" v-model="programStartDate"/>
						</div>
						<div class="option">
							<div class="programInputLabel">End Date: </div>
							<input type="datetime-local" :min="minDate" v-model="programEndDate"/>
						</div>
						<div class="option">
							<div class="programInputLabel">Occurrences:</div>
							<div class="occurrenceContainer">
								<div class="selectContainer">
									<select v-for="dayOption in dayCount" v-model="days[dayOption]" class="daySelect">
										<option value="Sunday">Sunday</option>
										<option value="Monday">Monday</option>
										<option value="Tuesday">Tuesday</option>
										<option value="Wednesday">Wednesday</option>
										<option value="Thursday">Thursday</option>
										<option value="Friday">Friday</option>
										<option value="Saturday">Saturday</option>
									</select>
								</div>
								<div class="btn btn-primary btn-sm addButton" @click="addOccurrence">+</div>
							</div>
						</div>
						<div class="option">
							<div class="programInputLabel">Description: </div>
							<textarea v-model="programDescription" class="descriptionArea"/>
						</div>
					</div>
					<div class="programButtonContainer">
						<div class="btn btn-primary btn-sm mt-3 mb-3" @click="createProgram">Submit</div>
						<div v-if="showFormatError" class="warningText">The information you have entered is not formatted correctly.</div>
						<div v-if="showDataError" class="warningText">Please fill in all fields.</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
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

.addButton {
	height: 28px;
}
</style>