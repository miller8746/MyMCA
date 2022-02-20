<script>
	import Service from '../services/Service.js'
	export default {
		props: ['credentials', 'includeSignOut']
	}
</script>

<template>
	<div class="header">
		<img src="../assets/header-logo.png" />
		<div v-if="this.credentials != null" class="userInfoContainer">
			<div>Welcome, {{ credentials.name }}</div>
			<router-link to="/" v-if="includeSignOut" class="signOutText link">Sign out</router-link>
		</div>
	</div>
	<div v-if="credentials != null" class="pages">
		<div class="pageLink">Profile</div>
		<router-link to="/programs" class="pageLink">Programs</router-link>
		<div class="pageLink">Enrollments</div>
		<div v-if="credentials.staff == true" class="pageLink">Users</div>
		<div v-if="credentials.staff == true" class="pageLink">Create Program...</div>
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
}

</style>