<script>
	import Service from '../services/Service.js'
	export default {
		props: ['credentials', 'isLoginPage'],
		methods: {
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
				<router-link to="/profile" v-if="credentials != null" class="pageLink">Profile</router-link>
				<router-link to="/programs" v-if="credentials != null" class="pageLink">Programs</router-link>
				<router-link to="/enrollments" v-if="credentials != null" class="pageLink">Enrollments</router-link>
				<div v-if="credentials != null && credentials.Staff == true" class="pageLink">Users</div>
				<router-link to="/create-program" v-if="credentials != null && credentials.Staff == true" class="pageLink">Create Program</router-link>
				
				<span @click="logOut" v-if="credentials != null" class="signOutText link">Sign out</span>
				<span v-if="credentials != null" class="material-icons face">person</span>
			</div>
		</nav>

		<!-- <div v-if="this.credentials != null" class="userInfoContainer">
			<div>{{ credentials.Name }}</div>
			<div>
				<img v-if="credentials.Staff == 1" src="../assets/staffIcon.png"/>
				<img v-if="credentials.Member == 1" src="../assets/memberIcon.png"/>
			</div>
		</div> -->
	</div>
</template>

<style>
.header {
	display: flex;
	height: 50px;
	background-color: #ffffff;
	justify-content: space-between;
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

.face {
	color: white;
	margin-top: 20px;
	margin-right: 20px;
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
	margin-top: 20px;
}

.link {
	cursor: pointer;
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
	padding: 0px 30px 0px 50px;
	transition: background-color 0.5s;
	color: #FFFFFF;
	text-decoration: none;

	font-size: medium;
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

</style>