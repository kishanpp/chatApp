


<!--===============================================================================================-->	
	<link rel="icon" type="image/png" href="images/icons/favicon.ico"/>
<!--===============================================================================================-->
	<!-- <style  src="@/assets/vendor/bootstrap/css/bootstrap.min.css"></style> -->
<!--===============================================================================================-->
	<style  src="@/assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css"></style>
<!--===============================================================================================-->
	<style  src="@/assets/fonts/iconic/css/material-design-iconic-font.min.css"></style>
<!--===============================================================================================-->
	<style scoped src="@/assets/vendor/animate/animate.css"></style>
<!--===============================================================================================-->	
	<style scoped src="@/assets/vendor/css-hamburgers/hamburgers.min.css"></style>
<!--===============================================================================================-->
	<style scoped src="@/assets/vendor/animsition/css/animsition.min.css"></style>
<!--===============================================================================================-->
<!--===============================================================================================-->	
<!--===============================================================================================-->
	<style scoped src="@/assets/css/util.css"></style>
<!--===============================================================================================-->
<style scoped src="@/assets/css/main.css"></style>

<template>
	<div class="row limiter">
		<div class=" container-login100">
			<div class=" col-7 col-sm-7 col-md-6 col-lg-6 wrap-login100">
				<div>
					<div v-if="page === 'login'" >
						<form class="login100-form validate-form "  @submit.prevent = "loginUser">
							<span class="login100-form-title p-b-26">
								Welcome
							</span>
							
							<div class="wrap-input100 validate-input" data-validate = "Valid email is: a@b.c">
								<input class="input100" v-model="user_data.useremail" type="email" name="email">
								<span class="focus-input100" data-placeholder="Email"></span>
							</div>
							
							<div class="wrap-input100 validate-input" data-validate="Enter password">
								<span class="btn-show-pass">
									<i class="zmdi zmdi-eye"></i>
								</span>
								<input class="input100" v-model="user_data.userpassword" type="password" name="pass">
								<span class="focus-input100" data-placeholder="Password"></span>
							</div>

							<div class="container-login100-form-btn">
								<div class="wrap-login100-form-btn">
									<div class="login100-form-bgbtn"></div>
									<button type="submit" class="login100-form-btn" >
										login
									</button>
								</div>
							</div>

							<div  class="text-center p-t-115">
								
								<span class="txt1">
									dont have account 
								</span>

								<a class="txt2" href="#" @click="toggleLoginRegister('register')">
									sign up
								</a>
								<div >
									<a class="txt1" href="#" @click='toggleForgotEmail'> Forgot Password ? </a>
								</div>
							</div>
						</form>
					</div>
					<div v-else-if="page === 'register'">
						<form class="login100-form validate-form "  @submit.prevent = "registerUser">
							<span class="login100-form-title p-b-26">
								Welcome
							</span>
							
							<div class="wrap-input100 validate-input" data-validate = "cannot be empty">
								<input class="input100" v-model="user_data.username" type="text" name="firstname">
								<span class="focus-input100" data-placeholder="User Name"></span>
							</div>
							
							<div class="wrap-input100 validate-input" data-validate = "Valid email is: a@b.c">
								<input class="input100" v-model="user_data.useremail" type="email" name="email">
								<span class="focus-input100" data-placeholder="Email"></span>
							</div>
							
							<div class="wrap-input100 validate-input" data-validate="Enter password">
								<span class="btn-show-pass">
									<i class="zmdi zmdi-eye"></i>
								</span>
								<input class="input100" v-model="user_data.userpassword" type="password" name="pass">
								<span class="focus-input100" data-placeholder="Password"></span>
							</div>

							<div class="container-login100-form-btn">
								<div class="wrap-login100-form-btn">
									<div class="login100-form-bgbtn"></div>
									<button type="submit" class="login100-form-btn" >
										Register
									</button>
								</div>
							</div>

							<div  class="text-center p-t-115">
								
								<span class="txt1">
									Have an account ? 
								</span>

								<a class="txt2" href="#" @click="toggleLoginRegister('login')">
									log in
								</a>
								
							</div>
						</form>
					</div>
					<div v-else-if="page === 'forgotPass'">
						<form class="login100-form validate-form "  @submit.prevent = "recoverPassword">
							<span class="login100-form-title p-b-26">
								Welcome
							</span>
							
							<div class="wrap-input100 validate-input" data-validate = "Valid email is: a@b.c">
								<input class="input100" v-model="user_data.useremail" type="email" name="email">
								<span class="focus-input100" data-placeholder="Email"></span>
							</div>
							
							

							<div class="container-login100-form-btn">
								<div class="wrap-login100-form-btn">
									<div class="login100-form-bgbtn"></div>
									<button type="submit" class="login100-form-btn" >
										send
									</button>
								</div>
							</div>

							<div  class="text-center p-t-115">
								
								<span class="txt1">
									Have an account ?
								</span>

								<a class="txt2" href="#" @click="toggleLoginRegister('login')">
									log in
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	
	//require ('../assets/vendor/animsition/js/animsition.min.js')
	//import auth from '../service/authentication'
	//import globalService from '../service/globalCall'
	import globalCalls from '../mixins/globalCalls'
	
	
	
	import jQuery from "jquery";
	const $ = jQuery;
	window.$ = $;
	
	export default {
		name: 'Login',
		mixins: [globalCalls],
		components: {
			
			//'Footer': Footer,
		},
		data: function (){
			return {
				
				submitted : false,
				page: 'login',
				user_data : {
					username : '',
					useremail : '',
					userpassword : '',
					
				},
				serverMessage: '',
				
				
			}
		},
		validations: {
			
		},
		computed : {
			
		},
		methods : {
			showValidate : function (input) {
				var thisAlert = $(input).parent();

				$(thisAlert).addClass('alert-validate');
			},
			validate : function (input) {
				if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
					if($(input).val().trim().match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/) == null) {
						return false;
					}
				}
				else {
					if($(input).val().trim() == ''){
						return false;
					}
				}
			},
			validateForm: function(){
				var input = $('.validate-input .input100');
				
				var check = true;

				for(var i=0; i<input.length; i++) {
					if(this.validate(input[i]) == false){
						this.showValidate(input[i]);
						check=false;
					}
				}
				this.submitted = check
			},
			loginUser: function () {
			
				/*==================================================================
				[ Validate ]*/
				/*var input = $('.validate-input .input100');

				$(document).on('submit', '.validate-form',function(){
					var check = true;

					for(var i=0; i<input.length; i++) {
						if(validate(input[i]) == false){
							showValidate(input[i]);
							check=false;
						}
					}
					ref.submitted = check
					return check;
				});*/
				this.validateForm()
			
				console.log(this.submitted)
				// stop here if form is invalid															1																				
				
				//this.$v.$touch();
                //if (this.$v.$invalid) {
                  //  return;
                //}
				// Send a POST request
				//globalService.ajaxCall('authenticateUser', 'post', this.user_data, this.loginSuccess, this.loginError)

				if (!this.submitted) return
				
				this.ajaxCall('authenticateUser', 'post', this.user_data, this.loginSuccess, this.loginError)
			},
			loginSuccess : function (response)
			{
				const ref = this
				var result = response.data;
				
				if(result.isDone == 1){
					this.$dialog.alert(result.message)
					this.$store.dispatch('setToken', { /*user_email : this.user_data.useremail,*/ user_id: result.data.user_id }).then(()=>{
						this.$session.set('validatedToken', result.data.token);
						//this.$session.set('user_email', this.user_data.useremail);
						this.$session.set('user_id', result.data.user_id);
						this.$router.push('/homepage')
					}).catch((err) => {
						console.log(err)
					})
				}
				// if user registration -> not active
				else if(result.isDone === 2)
				{
					this.$dialog.confirm('User not Validated ! Resend Verification link').then(() => {
						ref.ajaxCall('sendverificationmail', 'post', {useremail : ref.user_data.useremail}, this.resendVerificationEmailSucess, this.resendVerificationEmailError)
					}).catch(() => {
					
					})	
				}
				else{
					this.$dialog.alert(result.message)
				}
			},
			loginError : function (){
				
			},
			resendVerificationEmailSucess: function(res){
				this.$dialog.alert(res.data.message)
			},
			resendVerificationEmailError: function(){
			},
			registerUser : function (){
				
				this.validateForm()
				// stop here if form is invalid
				
				if (!this.submitted) return
				
				this.ajaxCall('registerUser', 'post', this.user_data, this.registerSucess, this.registerFail);
			},
			registerSucess : function (res) {
				if(res.data.isDone) this.page = 'login'
				this.$dialog.alert(res.data.message)
				
			},
			registerFail : function (err) {
				this.$dialog.alert(err.data.message)
			},
			recoverPassword : function (){
				
				this.validateForm()
				console.log(this.submitted)
				// stop here if form is invalid
				if (!this.submitted) return
				
				// send password to user mail
				this.ajaxCall('sendPassword', 'post', this.user_data, this.getPassSucess, this.getPassFail);
				
				console.log('good')
			},
			getPassSucess : function(res){
				this.$dialog.alert(res.data.message)
				if(res.data.isDone) this.page = 'login'
			},
			getPassFail : function(){},
			toggleLoginRegister : function (page){
				this.page = page
				this.$nextTick(() => {
					
					
				})
			},
			toggleForgotEmail : function(){
				this.page = 'forgotPass'
			},
			
		},
		watch: {
		},
		// called after data() is set, so make api calls on this
		created: function () {
		},
		// called after DOM is ready so do dom manipulations here.
		mounted: function () {
		
			//const ref = this
			function hideValidate (input) {
				var thisAlert = $(input).parent();

				$(thisAlert).removeClass('alert-validate');
			}
			
			/*==================================================================
			[ Focus input ]*/
			$('.input100').each(function(){
				$(this).on('blur', function(){
					if($(this).val().trim() != "") {
						$(this).addClass('has-val');
					}
					else {
						$(this).removeClass('has-val');
					}
				})    
			})
			
			/*==================================================================
			[ Show pass ]*/
			var showPass = 0;
			$(document).on('click', '.btn-show-pass', function(){
				if(showPass == 0) {
					$(this).next('input').attr('type','text');
					$(this).find('i').removeClass('zmdi-eye');
					$(this).find('i').addClass('zmdi-eye-off');
					showPass = 1;
				}
				else {
					$(this).next('input').attr('type','password');
					$(this).find('i').addClass('zmdi-eye');
					$(this).find('i').removeClass('zmdi-eye-off');
					showPass = 0;
				}
				
			});
			
			
			$('.validate-form .input100').each(function(){
				$(this).focus(function(){
					hideValidate(this);
				});
			});
			
			
			

		}
	}		
</script>