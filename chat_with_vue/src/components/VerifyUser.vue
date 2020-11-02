

<template>
	<div>
		verify user registration
	</div>
</template>


<script>
	
	import globalCalls from '../mixins/globalCalls'
	
	import jQuery from "jquery";
	const $ = jQuery;
	window.$ = $;
	
	export default{
		name : 'verifyUser',
		mixins: [globalCalls],
		data: function (){
			return {				
				
			}
		},
		// called after data() is set, so make api calls on this
		created: function () {
		console.log(this.$route)
			const url = 'verifyuser?useremail=' + this.$route.query.useremail + '&token=' + this.$route.query.token + '&expiry=' + this.$route.query.expiry
			this.ajaxCall(url, 'get', this.user_data, this.verifyRegSuccess, this.verifyRegError)
			
			
		},
		methods : {
			verifyRegSuccess : function (res){
				this.$dialog.alert(res.data.message)
				if(res.data.isDone) {
					// redirect to login page
					this.$router.push('/login')
				}
			},
			verifyRegError : function (err){
				console.log(err)
			},
		}, 
		
	}
</script>