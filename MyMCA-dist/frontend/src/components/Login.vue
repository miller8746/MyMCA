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
	<div>
		<Header :credentials="this.credentials" :isLoginPage="true"/>
		<div id="carouselExampleControls" class="carousel slide " data-bs-ride="carousel">
			<div class="carousel-inner">
				<div id="image1" class="carousel-item active">
					<img src="../assets/bikes.jpg" class="d-block w-100" style="object-fit:cover; height: 500px;" alt="Bikers">
				</div>
				<div id="image2" class="carousel-item">
					<img src="../assets/football.jpg" class="d-block w-100" style="object-fit:cover; height: 500px;" alt="Kids playing football">
				</div>
				<div id="image3" class="carousel-item">
					<img src="../assets/kids.jpg" class="d-block w-100" style="object-fit:cover; height: 500px;" alt="Kids playing soccer">
				</div>
				  	<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
   						<span class="carousel-control-prev-icon" aria-hidden="true"></span>
    					<span class="visually-hidden">Previous</span>
  					</button>
					<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
						<span class="carousel-control-next-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Next</span>
					</button>
			</div>
		</div>

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
			<div v-else>
				<div class="banner-container">
					<ul class="banner">
						<li class="banner-item"> Welcoming </li>
						<li class="banner-item"> Community Focused </li>
						<li class="banner-item"> Mission Driven </li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	
</template>

<style>

.banner-container {
	display: block;
	color: #FFF;
	background-color: #006FBF;
	padding: 3px 12px 3px 8px;
	border-bottom: 1px solid #fff;
	width: 100%;
}

.banner {
	list-style-type: none;
	height: 100px;
 	margin: 0 auto;
	padding-left: 90px;
	padding-right: 90px;
}

.banner-item {
	display: inline;
    float: left;
	margin-right: 50px;
	margin-top: 25px;
}

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
	margin-top: -200px;
	justify-content: space-around;
	align-items: center;
	flex-direction: column;
	position: fixed;
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