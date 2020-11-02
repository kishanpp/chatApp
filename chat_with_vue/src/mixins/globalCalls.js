//import axios from 'axios'


//var socket = null

export default {
	
		data : function (){
			return {
				
			}
		},
		created : function () {
			//console.log('Hello from the mixin!')
			//console.log(this.axios)
		},
		methods : {
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
				if(this.$store.getters.validUser) headerContent.Authorization = this.$session.get('validatedToken') || ''

				if(type.toLowerCase() === 'post'){
					this.axios.post(this.$store.state.apiBaseUrl + url,
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
				else if(type.toLowerCase() === 'get'){
					console.log(type)
					this.axios.get(this.$store.state.apiBaseUrl + url,
						data || '', // the data to get
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
			},
			dateTime : function (date){
				const month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
				console.log(date)
				var hours = date.getHours();
				var minutes = date.getMinutes();
				var ampm = hours >= 12 ? ' PM' : ' AM';
				hours = hours % 12;
				hours = hours ? hours : 12; // the hour '0' should be '12'
				minutes = minutes < 10 ? '0'+minutes : minutes;
				var strTime = hours + ':' + minutes + ' ' + ampm + ' | ' + month_names_short[date.getMonth()] + ' ' + date.getDate();
				return strTime;
			},
		},
    }