// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import './assets/libs/normalize-css/normalize.css'
import * as firebase from 'firebase'

const FirebaseConfig = {
	apiKey: 'AIzaSyDMPVrRsAMs3sEs-ha8HmLtrtYkuAIKlMM',
	authDomain: 'star-wars-vue-app.firebaseapp.com',
	databaseURL: 'https://star-wars-vue-app.firebaseio.com',
	projectId: 'star-wars-vue-app',
	storageBucket: '',
	messagingSenderId: '414843723'
}

Vue.use(VueResource)

Vue.http.options.root = 'https://swapi.co/api/'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {App},
	template: '<App/>',
	created () {
		firebase.initializeApp(FirebaseConfig)

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				let userId = firebase.auth().currentUser.uid

				this.$store.dispatch('AUTO_LOGIN', {user, userId})
			}
		})
	}
})
