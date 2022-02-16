import { createApp } from 'vue/dist/vue.esm-bundler.js'
import Landing from '../Components/Landing.js'
import { header } from "./header.js";


createApp(Landing).mount('#Landing');
header();
