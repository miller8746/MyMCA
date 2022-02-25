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
	<div class="header">
		<img src="../assets/header-logo.png" />
		<div v-if="this.credentials != null" class="userInfoContainer">
			<div>Welcome, {{ credentials.Name }}</div>
			<div @click="logOut" class="signOutText link">Sign out</div>
		</div>
	</div>
	<div v-if="credentials != null" class="pages">
		<div class="pageLink">Profile</div>
		<router-link to="/programs" class="pageLink">Programs</router-link>
		<div class="pageLink">Enrollments</div>
		<div v-if="credentials.Staff == true" class="pageLink">Users</div>
		<router-link to="/create-program" v-if="credentials.Staff == true" class="pageLink">Create Program...</router-link>
	</div>
</template>

<style>
.header {
	display: flex;
	height: 50px;
	background-color: #bafcff;
	justify-content: space-between;
}

img {
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
	color: dimgrey;
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
	background-color: #7D00B7;
	cursor: pointer;
	color: #FFFFFF;
}

</style>