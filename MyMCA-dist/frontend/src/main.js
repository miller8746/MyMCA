import { createApp } from 'vue'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import App from './App.vue'
import router from './router/router'

// Store login data through VueX app state

const store = createStore({
	state() {
		return {
			credentials: null
		}
	},
	mutations: {
		login(state, credentials) {
			state.credentials = credentials;
		},
		logout(state) {
			state.credentials = null;
		}
	},
	plugins: [createPersistedState({
		storage: window.sessionStorage
	})]
});

createApp(App).use(router).use(store).mount('#app');
