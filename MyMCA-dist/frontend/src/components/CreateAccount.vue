<script>
	import Header from './Header.vue'
	import Service from '../services/Service.js'
export default {
		components: { Header },
		data() {
			return {
				name: '',
				username: '',
				password: '',
				confirmPassword: '',
				credentials: null,
				isMember: false,
				isStaff: false,
				showDataError: false,
				showPasswordError: false,
				showDuplicateUserError: false
			}
		},
		methods: {
			createAccount() {
				this.showDataError = false;
				this.showPasswordError = false;
				this.showDuplicateUserError = false;
				// Check if all inputs are filled
				if (this.name != '' && 
				    this.username != '' && 
				    this.password != '' && 
				    this.confirmPassword != '') {
					// Check if password fields are equal
					if (this.password === this.confirmPassword) {
						Service.createAccount({
							name: this.name,
							username: this.username,
							password: this.password,
							isMember: this.isMember,
							isStaff: this.isStaff
						}).then((res) => {
							if (res.successful == true) {
								// Store credentials and redirect to login page
								var credentials = {
									UserId: res.userId,
									Name: this.name,
									Member: this.isMember,
									Staff: this.isStaff
								};
								this.$store.commit('login', credentials);
								this.$router.push('/');
							} else {
								// Username already exists
								this.showDuplicateUserError = true;
							}
						});
					} else {
						this.showPasswordError = true;
					}
				} else {
					this.showDataError = true;
				}
			}
		}
	}
</script>

<template>
	<div>
		<Header :credentials="null"/>
		<div class="pageContent">
			<div class="card border-primary mt-3">
				<div class="card-body">
					<h3 class="card-title card-header">Create Account</h3>
					<div class="inputContainer">
						<div class="textColumn">
							<div class="inputLabel">Display Name: </div>
							<div class="inputLabel">Username: </div>
							<div class="inputLabel">Password: </div>
							<div class="inputLabel">Confirm Password:</div>
						</div>
						<div class="inputColumn">
							<input v-model="name"/>
							<input v-model="username"/>
							<input type="password" v-model="password"/>
							<input type="password" v-model="confirmPassword"/>
						</div>
					</div>
					<div class="checkboxes">
						<div class="checkboxContainer">
							<div class="checkboxLabel">Member?</div>
							<input type="checkbox" v-model="isMember"/></div>
						<div class="checkboxContainer">
							<div class="checkboxLabel">Staff?</div>
							<input type="checkbox" v-model="isStaff"/></div>
					</div>
					<div class="buttonContainer">
						<div class="btn btn-primary btn-sm mt-3 mb-3" @click="createAccount">Submit</div>
						<div v-if="showDataError" class="warningText">Please fill in all fields.</div>
						<div v-if="showPasswordError" class="warningText">The passwords do not match.</div>
						<div v-if="showDuplicateUserError" class="warningText">The specified username has already been registered.</div>
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
	height: 142px;
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

.buttonContainer {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.checkboxes {
	display: flex;
	justify-content: space-evenly;
	width: 300px;
}

.checkboxContainer {
	display: flex;
}

.checkboxLabel {
	font-size: 12pt;
	margin-right: 6px;
}
</style>