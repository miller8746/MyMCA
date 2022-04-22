/*
* File name: App.vue
* Purpose: Handles the router for directing the control of the application
* Authors: Heather Miller, Hannah Hunt
* Date Created: 2/17/22
* Last Modified: 3/22/22
*/

<template>
  <router-view/>
</template>

<style>
/* Some basic stylings for the app */
body {
	margin: 0px !important;
	font-size: 15pt;
	font-family: system-ui;
    	color: dimgrey;
}

/* A simple black and white button */
.button {
	background-color: #FFFFFF;
	color: #000000;
	font-size: 12pt;
	padding: 5px;
	cursor: pointer;
	transition: background-color 0.5s;
}

.button:hover {
	background-color: lavender;
}

/* Overriding bootstrap's input styles (way too big) */
input {
	height: 25px;
	font-size: 12pt;
}

/* Common text style for warnings */
.warningText {
	color: #fc0303;
	font-size: 10pt;
}

/* Common setting for page content */
.pageContent {
	display: flex;
	justify-content: center;
}

</style>
