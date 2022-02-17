import { createApp } from 'vue'
import AccountCreation from '../Components/AccountCreation.vue'
import { header } from "./header.js";

createApp(AccountCreation).mount('#AccountCreation');
header();