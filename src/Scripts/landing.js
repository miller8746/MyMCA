import { createApp } from 'vue'
import Landing from '../Components/Landing.vue'
import { header } from "./header.js";

createApp(Landing).mount('#Landing');
header();