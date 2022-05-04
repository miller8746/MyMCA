/*
* File name: Login.vue
* Purpose: Component responsible for logging in the user
* Authors: Heather Miller, Hannah Hunt, Chloe McQuin
* Date Created: 2/16/22
* Last Modified: 5/4/22
*/

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
				showDataError: false,
				showInactiveError: false
			}
		},
		methods: {
			/*
			* Name: submitCredentials
			* Purpose: Attempts to log the user in
			* Parameters:  none
			*/
			submitCredentials() {
				this.showLoginError = false;
				this.showDataError = false;
				this.showInactiveError = false;
				// Verify both fields are filled in
				if (this.username != '' && this.password != '') {
					Service.getCredentials(this.username, this.password).then(response => {
						if (response.data == "") {
							// Login unsuccessful
							this.showLoginError = true;
						} else if (response.data == 'inactive') {
							// Account is deactivated, send special message
							this.showInactiveError = true;
						} else {
							// Login successful, save in VueX state
							this.credentials = response.data;
							this.$store.commit('login', this.credentials);
							
						}
					});
				} else {
					// Some information is missing
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
		<Header :credentials="this.credentials" :isLoginPage="true" :helpLink="'https://miller8746.github.io/MyMCA/build/UserManual/login.html'"/>
		<div id="carouselExampleControls" class="carousel slide " data-bs-ride="carousel">
			<div class="carousel-inner">
				<div id="image1" class="carousel-item active">
					<img src="../assets/kids-playing.jpg" class="d-block w-100" style="object-fit:cover; height: 500px;" alt="Kids playing">
				</div>
				<div id="image2" class="carousel-item">
					<img src="../assets/running.jpg" class="d-block w-100" style="object-fit:cover; height: 500px;" alt="Kids playing running">
				</div>
				<div id="image3" class="carousel-item">
					<img src="../assets/soccer-team.jpg" class="d-block w-100" style="object-fit:cover; height: 500px;" alt="Soccer Team">
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

		<div class="loginContainer pl-3 pr-3">
			<div v-if="credentials == null" class="loginModule">
				<div>
					<div class="modal-header text-center">
						<h4 class="modal-title w-100 font-weight-bold">Welcome to MyMCA</h4>
					</div>
				</div>
				<div class="userInputContainer">
					<div class="userInputColumn">
						<div class="material-icons">account_circle</div>
						<div class="material-icons mt-3">lock</div>			
					</div>
					<div class="userInputColumn">

						<input class="mb-4 user-input-box" placeholder="Username" v-model="username"/>
						<input class="user-input-box" placeholder="Password" type="password" v-model="password"/>
					</div>
				</div>
				<div class="confirmLoginContainer">
					<div @click="submitCredentials" class="button ">Log in</div>
					<div v-if="showLoginError" class="warningText">The credentials you have entered are not correct.</div>
					<div v-if="showDataError" class="warningText">Please fill in both fields.</div>
					<div v-if="showInactiveError" class="warningText">This acccount has been deactivated.</div>
				</div>
				<div class="linkText">
					<span class="userInputText">Don't have an account?</span>
					<router-link to="/create-account">Create one here</router-link>
				</div>
			</div>
		</div>
		
		<div class="body">
			<div class="banner-container">
				<ul class="banner">
					<li class="banner-item"> Welcoming </li>
					<li class="banner-item"> Community Focused </li>
					<li class="banner-item"> Mission Driven </li>
				</ul>
			</div>

			<div class="container">
				<div class="mt-4 row">
					<div class="col">
						<div class="card">
							<img src="../assets/dinner.jpg" class="card-img-top">
							<div class="card-body">
								<p class="card-text">Here at the Y, we support you and your family in all aspects of health.</p>
							</div>
						</div>
					</div>
					<div class="col">
						<div class="card">
							<img src="../assets/child-running.jpg" class="card-img-top">
							<div class="card-body">
								<p class="card-text">We offer a variety of sports education to the whole community.</p>
							</div>
						</div>
					</div>
					<div class="col">
						<div class="card">
							<img src="../assets/man-and-woman.jpg" class="card-img-top">
							<div class="card-body">
								<p class="card-text">With our highly trained staff, we can help no matter your circumstance.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	
	
</template>

<style>
.body {
	background-color: rgb(233, 233, 233);
	width: 100vw;
	min-height: 65vh;
}

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
	display: flex;
	justify-content: center;
}

.banner-item {
	display: inline;
    float: left;
	margin-right: 50px;
	margin-top: 25px;
}

.loginContainer {
	display: flex;
	z-index: 999;
	position: fixed;
	left: 37%;
	top: 80%;
	transform: translate(-50%, -50%);
}

.loginModule {
	color: #000000;
	background-color: rgb(255, 255, 255);
	border-radius: 8px;
	display: flex;
	width: 400px;
	height: 400px;
	margin-top: -640px;
	justify-content: space-around;
	align-items: center;
	flex-direction: column;
	position: fixed;
	box-shadow: 0 .5rem 1rem rgb(43, 42, 42)

}

.userInputContainer {
	display: flex;
	font-size: 12pt;
	height: 50px;
}

.userInputColumn {
	margin-right: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-end;
}

.userInputText {
	margin-right: 10px;
	margin-bottom: 20px;
}

.user-input-box {
	border: 0;
    outline: 0;
    border-bottom: 1px solid rgb(211, 211, 211);
}

.confirmLoginContainer {
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 0;
}

.linkText {
	font-size: 10pt;
	cursor: pointer;
}

.button {
  background-color: #0d6efd;
  color: white;

  border: none;
  
  padding: 10px 20px;
  width: 200px;

  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;

  border-radius: 25px;
}

.button:hover {
	  background-color: #162adb;
}

.card-body {
	font-family: 'Montserrat', sans-serif;
}

.card-image-top {
	height: 50px !important;
}

</style>