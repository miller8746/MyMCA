/*
* File name: UserViewer.vue
* Purpose: Component for staff members to view users and their enrollments
* Authors: Heather Miller, Hannah Hunt
* Date Created: 4/1/22
* Last Modified: 5/4/22
*/

<script>
	import Header from './Header.vue'
	import SearchBar from './SearchBar.vue'
	import Service from '../services/Service.js'
	import DialogPrompt from './DialogPrompt.vue'

	export default {
		components: { Header, SearchBar, DialogPrompt },
		data() {
			return {
				credentials: this.$store.state.credentials,
				users: null,
				isDialogVisible: false,
				selectedUserId: null,
			};
		},
		mounted() {
			this.queryUsers(0);
		},
		methods: {
			/*
			* Name: queryUsers
			* Purpose: Filters the users shown based on the search query
			* Parameters: searchTerm (string; null if no search)
			*/
			queryUsers(searchTerm) {
				Service.getUsers(searchTerm).then(response => {
					this.users = response.data;
					this.users.forEach(user => {
						Service.getUserEnrollments(user.UserId).then(response => {
							user.Enrollments = response.data;
						});
					});
				});
			},
			/*
			* Name: getEnrollmentDate
			* Purpose: Parses the enrollment date from database format to MM/YY format.
			* Parameters: date (date in database string format)
			*/
			getEnrollmentDate(date) {
				var parsedDate = new Date(date)
				return `${parsedDate.getMonth()}/${parsedDate.getDate()}/${parsedDate.getFullYear()} at ${parsedDate.toLocaleTimeString()}`;
			},

			/*
			* Name: deactivateAccount
			* Purpose: Deactivates the profile
			* Parameters: userId
			*/
			deactivateAccount(userId) {
				Service.deactivateAccount(userId).then((res) => {
					if( userId == this.credentials.UserId ) {
						this.$store.commit('logout');
						this.$router.push('/');
					} else {
						this.isDialogVisible = false;
						this.users = res.data;
						this.users.forEach(user => {
							Service.getUserEnrollments(user.UserId).then(response => {
								user.Enrollments = response.data;
							});
						});
					}
				});
			}
		}
	}
</script>

<template>
	<div>
		<Header :credentials="this.credentials" :helpLink="'https://miller8746.github.io/MyMCA/build/UserManual/StaffOnly/userviewing.html'"/>
		<DialogPrompt v-if="this.isDialogVisible" 
						:confirmFunction="deactivateAccount"
						:confirmFunctionInput="this.selectedUserId"
						:text="'Are you sure you want to deactivate this account? This action cannot be undone.'"
						:cancelButtonText="'Cancel'"
						:confirmButtonText="'Deactivate'"
						:isDialogVisible="this.isDialogVisible"
						@exitPrompt="this.isDialogVisible = false;"/>
		<div class="body pt-3">
			<SearchBar @search="this.queryUsers" :term="'Users'"/>
			<div class="list-group list-group-horizontal align-items-stretch flex-wrap user-group">
				<div v-for="user in this.users" v-bind:key="user" class="list-group-item program-card card shadow-sm bg-body rounded user-item">
					<div class="card-body">
						<div class="program-card-title card-header">
							<span v-if="user.Active == 1" class="fs-4">{{ user.Name }}</span>
							<span v-else class="inactive-user">{{user.Name}}</span>

							<span class="userViewCredentialsContainer">
								<img v-if="user.Member == 1" src="../assets/memberIcon.png" class="userCredentialImage"/>
								<img v-if="user.Staff == 1" src="../assets/staffIcon.png" class="userCredentialImage"/>
							</span>
							<span v-if="user.Active == 1 && user.UserId != this.credentials.UserId"
									class="material-icons delete-user" 
									@click="this.isDialogVisible = true; this.selectedUserId = user.UserId">delete</span>
							<span v-else-if="user.UserId != this.credentials.UserId" class="inactive-user-label">Inactive User</span>
						</div>
						<div v-if="user.Enrollments != null">
							<div class="pt-3">Enrollments</div>
							<div v-if="user.Enrollments.length != 0">
								<div v-for="enrollment in user.Enrollments" v-bind:key="enrollment" class="fs-6 pt-3">This user has {{ enrollment.NumOfEnrollments }} spot(s) reserved for the {{ enrollment.Title }} program beginning on {{ this.getEnrollmentDate(enrollment.OfferingPeriod) }}.
								</div>
							</div>
							<div v-else class="fs-6 pt-3">This user has no current enrollments.</div>
						</div>
					</div>	
				</div>	
			</div>
		</div>
	</div>
</template>

<style>

.userViewCredentialsContainer {
	margin-left: 10px;
}

.userCredentialImage {
	padding: 5px;
}

.body {
	background-color: rgb(233, 233, 233);
	width: 100vw;
	min-height: 100vh;
}

.user-group {
	margin-left: 120px;
}

.delete-user {
	float: right;
	margin-top: 5px;
	cursor: pointer;
}

.inactive-user-label {
	float: right;
	color: rgb(150, 150, 150);
	font-size: small;
	margin-top: 8px;
}

.inactive-user {
	color: rgb(150, 150, 150);
}

.delete-user:hover {
	color: rgb(26, 25, 25);
}

.user-item {
    min-width: 40%;
	max-width: 40%;
    margin: 1% !important;
}

@media (min-width: 576px) {
    .user-item {
        min-width: 40%;	
		max-width: 40%;
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