<script>
	import Header from './Header.vue'
	import Service from '../services/Service.js'
	export default {
		components: { Header },
		data() {
			return {
				username: '',
				password: '',
				credentials: null
			}
		},
		methods: {
			submitCredentials() {
				this.credentials = Service.getCredentials(this.username, this.password);
			}
		}
	}
</script>

<template>
	<Header :credentials="this.credentials" :includeSignOut="false"/>
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
			<div><button @click="submitCredentials">Log in</button></div>
		</div>
		<div v-else>Welcome, {{ credentials.name }}!</div>
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
</style>