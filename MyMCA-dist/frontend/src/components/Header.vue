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
		<div class="header p-2">
			<router-link to="/">
				<img class="headerLogo" src="../assets/header-logo.png" />
			</router-link>			
			<div v-if="this.credentials != null" class="userInfoContainer">
				<div>{{ credentials.Name }}</div>
				<div>
					<img v-if="credentials.Staff == 1" src="../assets/staffIcon.png"/>
					<img v-if="credentials.Member == 1" src="../assets/memberIcon.png"/>
				</div>
			</div>
		</div>
		<div class="pages mt-3">
			<router-link to="/profile" v-if="credentials != null" class="pageLink">Profile</router-link>
			<router-link to="/programs" v-if="credentials != null" class="pageLink">Programs</router-link>
			<div v-if="credentials != null" class="pageLink">Enrollments</div>
			<div v-if="credentials != null && credentials.Staff == true" class="pageLink">Users</div>
			<router-link to="/create-program" v-if="credentials != null && credentials.Staff == true" class="pageLink">Create Program</router-link>
			<span @click="logOut" v-if="credentials != null" class="signOutText link">Sign out</span>
		</div>
	</div>
</template>

<style>
.header {
	display: flex;
	height: 50px;
	background-color: #ffffff;
	justify-content: space-between;
	margin-bottom: 10px;
}

.headerLogo {
	height: 50px;
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
	margin-top: 9px;
}

.link {
	cursor: pointer;
	text-decoration: underline;
}

.pages {
	height: 50px;
	background-color: #006FBF;
	display: flex;
}

.pageLink {
	height: 50px;
	display: flex;
	align-items: center;
	padding: 0px 10px 0px 10px;
	transition: background-color 0.5s;
	color: #FFFFFF;
	text-decoration: none;
}

.pageLink:hover {
	background-color: #292457;
	cursor: pointer;
	color: #FFFFFF;
}

.subtitle {
	margin-left: -10px !important;
}

</style>