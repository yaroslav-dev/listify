import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { firestorePlugin } from 'vuefire'

Vue.config.productionTip = false

Vue.use(firestorePlugin)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMzZWRySZRLzVkcj28AcwI3vMk-YbxGDQ",
  authDomain: "listify-fd1c8.firebaseapp.com",
  projectId: "listify-fd1c8",
  storageBucket: "listify-fd1c8.appspot.com",
  messagingSenderId: "564380864584",
  appId: "1:564380864584:web:ce99e8d7c7b826cd99887d"
};

// Initialize Firebase
export const db = firebase.initializeApp(firebaseConfig).firestore();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
