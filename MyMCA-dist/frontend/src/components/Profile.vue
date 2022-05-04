/*
* File name: Profile.vue
* Purpose: Component responsible for viewing and changing user information
* Authors: Heather Miller, Hannah Hunt
* Date Created: 3/8/22
* Last Modified: 5/4/22
*/

<script>
	import Header from './Header.vue'
	import Service from '../services/Service.js'
	import DialogPrompt from './DialogPrompt.vue'

	export default {
		components: { Header, DialogPrompt },
		data() {
			return {
				credentials: this.$store.state.credentials,
				isStaff: false,
				isMember: false,
				isSaveConfirmationDisplayed: false,
				isDialogVisible: false,
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
			},
			/*
			* Name: deactivateAccount
			* Purpose: Deactivates the profile
			* Parameters: userId
			*/
			deactivateAccount(userId) {
				Service.deactivateAccount(userId).then((res) => {
					this.$store.commit('logout');
					if (!this.isLoginPage) {
						this.$router.push('/');
					} else {
						this.$router.go();
					}
				});
			},
			/*
			* Name: closeDeactivatePrompt
			* Purpose: Closes the prompt for deactivating the user.
			* Parameters: none
			*/
			closeDeactivatePrompt() {
				this.isDialogVisible = false;
			}
		}
	}
</script>

<template>
	<div>
		<Header :credentials="credentials" :helpLink="'https://miller8746.github.io/MyMCA/build/UserManual/profile.html'"/>
		<DialogPrompt v-if="this.isDialogVisible" 
						:confirmFunction="deactivateAccount"
						:confirmFunctionInput="this.credentials.UserId"
						:text="'Are you sure you want to deactivate this account? This action cannot be undone.'"
						:cancelButtonText="'Cancel'"
						:confirmButtonText="'Deactivate'"
						:isDialogVisible="this.isDialogVisible"
						@exitPrompt="this.isDialogVisible = false;"/>

		<div class="profile-body pt-5 container">
			<div class="profile card">
				<div class="card-body">
					<div v-if="isSaveConfirmationDisplayed" class="alert alert-success alert-dismissible fade show alert-font" role="alert">
						Your profile information has been saved.
						
						<button type="button" 
								class="btn-close"
								data-bs-dismiss="alert"
								aria-label="Close">
						</button>
					</div>

					<h3 class="card-title card-header">{{ credentials.Name }}</h3>

					<div>
						<div class="switches row">
							<div class="col form-check form-switch mb-3 member">
								<input v-model="isMember" class="form-check-input" type="checkbox" role="switch" id="isMemberSwitch">
								<label class="form-check-label" for="isMemberSwitch">Member</label>
							</div>

							<div class="col form-check form-switch">
								<input v-model="isStaff" class="form-check-input" type="checkbox" role="switch" id="isStaffSwitch">
								<label class="form-check-label" for="isStaffSwitch">Staff</label>
							</div>
						</div>
						
						<div class="alignment">
							<div class="button-margin button delete" @click="this.isDialogVisible = true">Deactivate</div>
							<div class="button-margin button" @click="saveInfo">Save</div>
						</div>
					</div>
				</div>
			</div>
		</div>	
	</div>
</template>

<style>

.profile-body {
	background-color: rgb(233, 233, 233);
	min-width: 100vw;
	min-height: 90vh;
}

.profile {
	margin: 0% 20% 10% 20%;
	padding-bottom: 50px;

	border-top-color: #44a1e4;
	border-top-width: 10px;
}

.switches {
	margin-top: 30px;
	margin-left: 10%;
}

.member {
	margin-left: 100px;
}

.form-check-input {
	height: 20px;
}

.form-check-label {
	font-size: 20px !important;
}

.button-margin {
	max-width: 400px !important;
}

.delete {
	background-color: #ff5454 !important;
	color: #FFFFFF;
}

.delete:hover {
	background-color: #de4949 !important;
	color: #FFFFFF;
}

.alignment {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 70px;
}

</style>





