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
				programDate: '',
				programLocation: '',
				minDate: null,
				showFormatError: false,
				showDataError: false
			};
		},
		methods: {
			createProgram() {
				this.showFormatError = false;
				this.showDataError = false;
				var date = new Date(this.programDate);
				// Check if all data is filled in
				if (this.programTitle != '' && 
				    this.programDescription != '' && 
				    this.programCapacity != 0 && 
				    this.programCost != 0 && 
				    this.programDate != '' && 
				    this.programLocation != '') {
					// Check if data is valid
					if (this.programCapacity > 0 &&
                                            this.programCost > 0 &&
					    date > Date.now()) {
						var program = {
							title: this.programTitle,
							description: this.programDescription,
							capacity: this.programCapacity,
							cost: this.programCost,
							offeringPeriod: this.programDate,
							location: this.programLocation
						};
						Service.createProgram(program);
					} else {
						// Data is filled in, but not valid
						this.showFormatError = true;
					}
				} else {
					// Some data is not filled in
					this.showDataError = true;
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
		<Header :credentials="this.credentials"/>
		<div class="pageContent">
			<div class="card border-primary mt-3">
				<div class="card-body">
					<h3 class="card-title card-header">Create Program</h3>
					<div class="inputContainer">
						<div class="textColumn">
							<div class="inputLabel">Title: </div>
							<div class="inputLabel">Capacity: </div>
							<div class="inputLabel">Cost ($): </div>
							<div class="inputLabel">Location: </div>
							<div class="inputLabel">Time: </div>
							<div class="inputLabel">Description: </div>
						</div>
						<div class="inputColumn">
							<input v-model="programTitle"/>
							<input type="number" v-model.number="programCapacity"/>
							<input type="number" v-model.number="programCost"/>
							<input v-model="programLocation"/>
							<input type="datetime-local" :min="minDate" v-model="programDate"/>
							<textarea v-model="programDescription" class="descriptionArea"/>
						</div>
					</div>
					<div class="buttonContainer">
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
.pageContent {
	display: flex;
	justify-content: center;
}

.inputContainer {
	display: flex;
	height: 250px;
}

.inputColumn {
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
}

.textColumn {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}

.inputLabel {
	font-size: 12pt;
	margin: 9px 5px 0px 0px;
}

.descriptionArea {
	font-size: 10pt;
	height: 68px;
}

.buttonContainer {
	display: flex;
	flex-direction: column;
	align-items: center;
}

</style>