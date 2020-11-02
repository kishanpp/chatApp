

<template>
	<!-- loader design -->
	<div class="vld-parent">
		<loading 
		:active.sync = "isLoading"
		:can-cancel="true" 
		:is-full-page="true"
		loader="dots"
		color="#695252"></loading>
	</div>
</template>


<script>

	// Import component
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
	import 'vue-loading-overlay/dist/vue-loading.css';
	
	//import globalCalls from '../mixins/globalCalls'
	//import io from 'socket.io-client/dist/socket.io.js'
	import jQuery from "jquery";
	const $ = jQuery;
	window.$ = $;
	
	export default{
		name : 'Loader',
		data: function (){
			return {

			}
		},
		components : {
			'Loading' : Loading
		},
		props: {
			isLoading :{
				type : Boolean,
				required : true,
				default : true,
			},
		},
	}
</script>