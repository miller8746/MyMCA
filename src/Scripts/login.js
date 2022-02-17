import { createApp } from 'vue'
import Login from '../Components/Login.vue'
import { header } from "./header.js";

createApp(Login).mount('#Login');
header();