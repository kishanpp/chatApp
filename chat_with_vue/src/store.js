import Vuex from "vuex";
import Vue from 'vue'

//import globalService from './service/globalCall'

Vue.use(Vuex);

//const session = Vue.prototype.$session
const store = new Vuex.Store({
	state: {
		isLogged : false,
		apiBaseUrl : 'http://192.168.43.56:5000/user/',
		apiUrl : 'http://192.168.43.56:5000/',
		user_email : '',
		user_id : null,
		socket_id : '',
	},
	actions: {
		setToken: function(state, data){
			//store._vm.$session.set('validatedToken', data.token);
			this.commit('validateLogin', true);
			/*this.commit('setUserEmail', data.user_email)*/
			this.commit('setUserId', data.user_id)
		},
		getValidatedToken: function(){
			const token = store._vm.$session.get('validatedToken')
			//const user_name = store._vm.$session.get('user_name')
			const user_id = store._vm.$session.get('user_id')
			// check token expiry to continue else invalidate login
			
			if(token) 
			this.commit('validateLogin', true);
			//if(user_name) this.commit('setUserEmail', user_name)
			if(user_id) this.commit('setUserId', user_id)
			
		},
		
		destroyToken: function(){
			store._vm.$session.remove('validatedToken')
			store._vm.$session.remove('user_name')
			store._vm.$session.remove('user_id')
			//console.log(store._vm)
			this.commit('validateLogin', false)
		}
	},
	mutations: {
   
		validateLogin (state, valid){
			state.isLogged = valid;
		},
		setUserEmail (state, useremail){
			state.user_email = useremail
		},
		setUserId (state, userId){
			state.user_id = userId
		},
		setSocketId (state, socketId){
			state.socket_id = socketId
		},
		
	},
	// same as computed. data will be cached and re-evaluated when any variable data is changes.
	getters: {
		validUser : state => {
			return state.isLogged
		},
		user_email : state =>{
			return state.user_email
		},
		user_id : state =>{
			return state.user_id
		},
		getSocketId : state =>{
			return  state.socket_id
		},
   }
})

export default store;