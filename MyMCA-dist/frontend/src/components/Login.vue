<script>
	import Header from './Header.vue'
	import Service from '../services/Service.js'
	export default {
		components: { Header },
		data() {
			return {
				username: '',
				password: '',
				credentials: null,
				showLoginError: false,
				showDataError: false
			}
		},
		methods: {
			submitCredentials() {
				this.showLoginError = false;
				this.showDataError = false;
				if (this.username != '' && this.password != '') {
					Service.getCredentials(this.username, this.password).then(response => {
						if (response.data == "") {
							this.showLoginError = true;
						} else {
							this.credentials = response.data;
							// Store credentials in VueX state
							this.$store.commit('login', this.credentials);
							
						}
					});
				} else {
					this.showDataError = true;
				}
			}
		},
		mounted() {
			if (this.$store.state.credentials != null) {
				this.credentials = this.$store.state.credentials;
			}
		}
	}
</script>

<template>
	<Header :credentials="this.credentials" :isLoginPage="true"/>
	<div class="loginContainer">
		<div v-if="credentials == null" class="loginModule">
			<div>
				<div class="centerText">Welcome to MyMCA.</div>
				<div class="centerText">Please enter your credentials below to continue.</div>
			</div>
			<div class="userInputContainer">
				<div class="userInputColumn">
					<div class="userInputText">Username: </div>
					<div class="userInputText">Password: </div>
				</div>
				<div class="userInputColumn">
					<input v-model="username"/>
					<input type="password" v-model="password"/>
				</div>
			</div>
			<div class="confirmLoginContainer">
				<div @click="submitCredentials" class="button">Log in</div>
				<div v-if="showLoginError" class="warningText">The credentials you have entered are not correct.</div>
				<div v-if="showDataError" class="warningText">Please fill in both fields.</div>
			</div>
		</div>
		<div v-else>Welcome, {{ credentials.Name }}!</div>
	</div>
	
</template>

<style>
.loginContainer {
	margin-top: 20px;
	display: flex;
	justify-content: center;
}

.centerText {
	text-align: center;
}

.loginModule {
	color: #000000;
	background-color: lightgrey;
	border-radius: 15px;
	display: flex;
	width: 300px;
	height: 300px;
	justify-content: space-around;
	align-items: center;
	flex-direction: column;
}

.userInputContainer {
	display: flex;
	font-size: 12pt;
	height: 50px;
}

.userInputColumn {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-end;
}

.userInputText {
	margin-right: 5px;
}

.confirmLoginContainer {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>