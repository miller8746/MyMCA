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
				showSaved: false
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
				this.showSaved = false;
				// Parsing booleans for the database
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
		<div class="pageContent">
			<div class="card border-primary mt-3">
				<div class="card-body">
					<h3 class="card-title card-header">Profile - {{ credentials.Name }}</h3>
					<div class="profileContentContainer">
						<div class="profileCheckboxes">
							<div class="profileCheckboxContainer">
								<div class="profileCheckboxLabel">Member?</div>
								<input type="checkbox" v-model="isMember"/>
							</div>
							<div class="profileCheckboxContainer">
								<div class="profileCheckboxLabel">Staff?</div>
								<input type="checkbox" v-model="isStaff"/>
							</div>
						</div>
						<div class="profileButtonContainer">
							<div class="btn btn-primary btn-sm mt-3 mb-3" @click="saveInfo">Save</div>
						</div>
						<div v-if="showSaved">Saved.</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>

.profileButtonContainer {
	display: flex;
	justify-content: space-around;
	width: 240px;
}

.profileContentContainer {
	font-size: 12pt;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 160px;
	justify-content: space-around;
}

.profileCheckboxes {
	display: flex;
	justify-content: space-evenly;
	width: 300px;
}

.profileCheckboxContainer {
	display: flex;
}

.profileCheckboxLabel {
	font-size: 12pt;
	margin-right: 6px;
}
</style>