/*
* File name: Profile.vue
* Purpose: Component responsible for viewing and changing user information
* Authors: Heather Miller
* Date Created: 3/8/22
* Last Modified: 4/22/22
*/

<script>
	import Header from './Header.vue'
	import Service from '../services/Service.js'
	export default {
		components: { Header },
		data() {
			return {
				credentials: this.$store.state.credentials,
				isStaff: false,
				isMember: false,
				isSaveConfirmationDisplayed: false
			};
		},
		mounted() {
			this.isStaff = this.credentials.Staff == 1 ? true : false;
			this.isMember = this.credentials.Member == 1 ? true : false;
		},
		methods: {
			/*
			* Name: saveInfo
			* Purpose: Saves the changed information in the system
			* Parameters: none
			*/
			saveInfo() {
				this.isSaveConfirmationDisplayed = true;

				var member = this.isMember == true ? 1 : 0;
				var staff = this.isStaff == true ? 1 : 0;

				Service.saveAccountInfo(member, staff, this.credentials.UserId).then((res) => {
					this.credentials.Staff = staff;
					this.credentials.Member = member;
					this.$store.commit('login', this.credentials);
					this.showSaved = true;
				});
			}
		}
	}
</script>

<template>
	<div>
		<Header :credentials="credentials" :helpLink="'https://miller8746.github.io/MyMCA/build/UserManual/profile.html'"/>
		<div class="body pt-5">
			<div class="card">
				<div class="card-body">
					<div v-if="isSaveConfirmationDisplayed" class="alert alert-success alert-dismissible fade show alert-font" role="alert">
						Your profile information has been saved
						
						<button type="button" 
								class="btn-close"
								data-bs-dismiss="alert"
								aria-label="Close">
						</button>
					</div>

					<h3 class="card-title card-header">{{ credentials.Name }}</h3>

					<div>
						<div class="switches">
							<div class="form-check form-switch mb-3">
								<input v-model="isMember" class="form-check-input" type="checkbox" role="switch" id="isMemberSwitch">
								<label class="form-check-label" for="isMemberSwitch">Member</label>
							</div>

							<div class="form-check form-switch">
								<input v-model="isStaff" class="form-check-input" type="checkbox" role="switch" id="isStaffSwitch">
								<label class="form-check-label" for="isStaffSwitch">Staff</label>
							</div>
						</div>
						
						<div class="btn btn-primary btn-lg mt-3 mb-3" @click="saveInfo">Save</div>
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
	min-height: 90vh;
}

.card {
	margin: 0% 5% 10% 5%;
	padding-bottom: 150px;
}

.switches {
	margin-top: 30px;
	margin-left: 10%;
}

.form-check-label {
	font-size: larger;
}

</style>





