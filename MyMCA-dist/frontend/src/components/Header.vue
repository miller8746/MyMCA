/*
* File name: Header.vue
* Purpose: Header for the application; contains page links and logout functionality
* Authors: Heather Miller, Hannah Hunt
* Date Created: 2/18/22
* Last Modified: 4/22/22
*/

<script>
	import Service from '../services/Service.js'
	export default {
		props: ['credentials', 'isLoginPage', 'helpLink'],
		methods: {
			/*
			* Name: logOut
			* Purpose: Logs the user out of the application
			* Parameters: none
			*/
			logOut() {
				this.$store.commit('logout');
				if (!this.isLoginPage) {
					this.$router.push('/');
				} else {
					this.$router.go();
				}
			}
		}
	}
</script>

<template>
	<div>
		<nav class="header">
			<div class="p-2">
				<router-link to="/">
					<img class="headerLogo" src="../assets/header-logo.png" />
				</router-link>			

			</div>
			<div class="pages mt-3">
				<router-link to="/programs" class="pageLink fs-5">Programs</router-link>
				<router-link to="/enrollments" v-if="credentials != null" class="pageLink fs-5">Enrollments</router-link>
				<router-link to="/users" v-if="credentials != null && credentials.Staff == true" class="pageLink fs-5">Users</router-link>
				<router-link to="/create-program" v-if="credentials != null && credentials.Staff == true" class="pageLink fs-5">Create Program</router-link>
				<div v-if="credentials != null" class="signOutText">
					<div class="nav-item dropdown">
						<a class="navLinkPartial dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							{{ credentials.Name }}
						</a>
						<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
							<li><router-link class="link" to="/profile">Profile</router-link></li>
							<li><a href="https://miller8746.github.io/MyMCA/build/UserManual/general.html" target="_blank" class="link">Help</a></li>
							<li><hr class="dropdown-divider"></li>
							<li><a @click="logOut" class="link">Sign out</a></li>
						</ul>
					</div>
				</div>

				<router-link to="/profile">
					<span v-if="credentials != null" class="material-icons face">person</span>
				</router-link>
				<a :href="this.helpLink" class="help" target="_blank">
					<span class="material-icons">help_outline</span>
				</a>
			</div>
		</nav>
	</div>
</template>

<style>
.header {
	display: flex;
	height: 50px;
	background-color: #ffffff;
	padding-bottom: 30px;
	margin-bottom: 15px;
}

.pages:after {
	height: 70px; 
	width: 30px;

	margin-left: -30px;
	background-color: white;
	position: absolute;
	content: "";
	transform: rotate(15deg);
	transform-origin: bottom right;
}

.headerLogo {
	height: 50px;
	margin-right: 20px;
	margin-left: 20px;
}

.dropdown {
	margin-top: 5px;
}

.dropdown-toggle {
	color: white;
}

.dropdown-toggle:hover {
	color: white;
}

.face {
	color: white;
	margin-top: 25px;
	margin-right: 20px;
}

.help {
	color: white;
	margin-top: 25px;
	margin-right: 20px;
}

.help:hover {
	color:white;
}

.userInfoContainer {
	margin-right: 10px;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: space-evenly;
}

.signOutText {
	font-size: 12pt;
	color: rgb(255, 255, 255);
	margin-left: auto; 
	margin-right: 15px;
	margin-top: 12px;
	display: flex;
}

.link {
	cursor: pointer;
	font-family: 'Montserrat', sans-serif;
	text-decoration: none;
	margin-left: 9px;
}

.pages {
	height: 70px;
	width: 100%;

	margin-top: -4px !important;

	background-color: #006FBF;
	display: flex;
}

.pageLink {
	height: 70px;
	display: inline-block;
	
  	position: relative;
	align-items: center;

	margin-top: 25px;
	padding: 0px 50px 0px 50px;
	transition: background-color 0.5s;
	color: #FFFFFF;
	text-decoration: none;

	font-size: medium;
	font-family: 'Montserrat', sans-serif;
}

.pageLink:hover {
  color: rgb(255, 255, 255);
}

.pageLink::before {
  content: "";
  position: absolute;
  display: block;
  width: 100%;
  height: 4px;
  bottom: 25px;
  left: 0;
  background-color: rgb(255, 255, 255);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.pageLink:hover::before {
  transform: scaleX(1);
}

.subtitle {
	margin-left: -10px !important;
}

.headerCredentialImage {
	padding: 5px;
}

.navLinkPartial {
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out;
}

</style>