import axios from 'axios'
import store from '../store'

//import router from '../router'
		
export default {
	/* apiurl,
	   type : post/get,
	   payload data,
	   success callback
	   error callback
	*/
	
		
	ajaxCall : function  (url, type, data, successCallback, errorCallback){
		
		var headerContent = {
		'Content-type': 'application/json',
		}

		// pass token to all authrised calls
		if(store.getters.validUser) headerContent.Authorization = store._vm.$session.get('validatedToken')

		if(type === 'post'){
			axios.post(store.state.apiBaseUrl + url,
				data || '', // the data to post
				{ 
					headers: headerContent
				})
				.then((response) => {
					console.log(response)
					if(typeof successCallback !== 'undefined') successCallback(response)
					
				})
				.catch((error) => {
					console.warn(error);
					if(typeof errorCallback !== 'undefined') errorCallback(error)
				})
		}
		else if(type === 'get'){
			console.log(type)
		}
	},

}