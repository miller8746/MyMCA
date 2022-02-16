import { createApp } from './vue.esm-bundler.js'
import Login from '../Components/Login.js'
import { header } from "./header.js";

createApp(Login).mount('#Login');
header();
