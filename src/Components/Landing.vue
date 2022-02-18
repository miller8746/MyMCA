<script>
	import Header from './Header.vue'

	export default {
		components: { Header }
	}
</script>

<template>
	<Header />
	<div class="text">Welcome to MyMCA.  Please <a href="../Pages/login.html">log in</a> to continue, or <a href="../Pages/create_account.html">create an account</a> first.</div>
</template>

<style>
.text {
    	text-align: center;
    	margin-top: 100px;
}
</style>