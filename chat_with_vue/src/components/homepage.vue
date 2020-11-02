<style  src="@/assets/css/homepage.css"></style>
<style  src="@/assets/vendor/emoji-js/emoji.css"></style>
<style scoped>
	.logout {
		cursor: pointer
	}
	.data-attr{
		position : absolute;
		display : block;
		top: 290px;
		left: 30px;
		opacity: 0.3;;
	}
	.home-page {
		padding: 5px;
		align-items: flex-end;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-ms-flex-direction: row;
		flex-direction: row;
		height: 100%;
		width: 100%;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		text-align: -webkit-left;
		text-align: left;
		display: flex;
	}
	
	* {
		box-sizing: border-box;
	}
	.textarea-emoji-picker {
		position: relative;
		margin: 0 auto;
		display: flex;
		align-items: center; 
		margin: 0 auto;
	}
	.input-content{
		/* margin: 0px 5px 0px 5px; */
		background-color: white;
		border-radius: 20px;
		position: relative;
		-webkit-box-flex: 1;
		-ms-flex: 1 1 auto;
		flex: 1 1 auto;
		min-height: 36px;
		max-height: 120px;
		width: 100%;
		/* padding: 5px 10px 0px 5px; */
		width: 100%;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		min-width: 0;
	}
	.text-content{
		padding: 5px 10px 5px 5px;
		position: relative;
		flex-direction: column;
		min-height: 36px;
		max-height: inherit;
		flex: 1;
		overflow: hidden;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		width: 100%;
	}
	
	.textarea {
		padding: 5px 5px 5px 10px;
		border-radius: 10px;
		display: block;
    
		background-color: white;
		position: relative;
		-webkit-box-flex: 1;
		-ms-flex: 1;
		flex: 1;
		max-height: inherit;
		overflow-y: auto;
		overflow-x: hidden;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		width: 100%;
		resize: none;
		
		box-shadow: none;
		font-size: 15px;
		color: #333;
	}
	.emoji-mart {
		transition: all 0.2s linear 0s;
		
		position: relative;
		bottom: 0px;
		/* display: none; */
		position: absolute;
		bottom : 0;
	}
	.emoji-trigger {
		flex: none;
		min-height: 30px;
		position: relative;
		cursor: pointer;
		padding: 5px 10px;
		color: gray;
	}
	.emoji-trigger path {
		transition: 0.1s all;
	}
	.emoji-trigger.triggered path {
		fill: darken(#FEC84A, 15%);
	}
	/* .droparea {
		display: flex;
		flex-direction: column;
		top: calc(0% + 60px);
		height: 100%;
		position: absolute;
		z-index: 1;
		width: 100%;
	} */
	#dropzone{
		height: 100%;
		border: none;
		overflow: auto;
	}
	.send-document {
			flex-direction: column;
		top: calc(100% + 60px);
		height: calc(100% - 60px);
		position: absolute;
		z-index: 2;
		width: 100%;
		overflow: auto;
		transition: all 0.2s linear 0s;
		padding: 10px;
		background-color: white;
	}
	.send-document-button {
			position: absolute;
		bottom: 20px;
		right: 20px;
	}
	.placeholder-message {
		user-select: none;
		pointer-events: none;
		line-height: 1.5;
		color: #999;
		z-index: 1;
		top: 7px;
		position: absolute;
		left: 15px;
	}
	._kjdfg {
			height: 100%;
	border: 5px solid grey;
	border-style: dashed;
		
	}
</style>

<template>
	<div class="main">
		<!--<div class="data-attr bg-light row">			
			<div >
				<span class="col-sm-3 bg-white">newMessage</span><span class="col-sm-8">{{newMessage}}</span>
			</div>
			<div >
				<span class="col-sm-3 bg-white">messages</span> <span class="col-sm-8">{{messages}}</span>
			</div>
			<div>
				<span class="col-sm-3 bg-white">typing</span><span class="col-sm-3">{{typing}}</span>
			</div>
			<div>
				<span class="col-sm-3 bg-white">username</span><span class="col-sm-8">{{username}}</span>
			</div>
			<div>
				<span class="col-sm-3 bg-white">user id</span><span class="col-sm-8">{{userId}}</span>
			</div>
			<div>
				<span class="col-sm-3 bg-white">ready</span><span class="col-sm-8">{{ready}}</span>
			</div>
			<div>
				<span class="col-sm-3 bg-white">info</span><span class="col-sm-8">{{info}}</span>
			</div>
			<div>
				<span class="col-sm-3 bg-white">connections</span><span class="col-sm-8">{{connections}}</span>
			</div>
			<div>
				<span class="col-sm-3 bg-white">Internet Connection</span><span class="col-sm-8">{{isOnline}}</span>
			</div>
			<div>
				<span class="col-sm-3 bg-white">friends_list</span><span class="col-sm-8">{{friends_list}}</span>
			</div>
		</div>-->
		<!-- loader template -->
		<Loader :isLoading = "isLoading" />
		
		<div class="messaging">
			<div class="inbox_msg h70RQ">
				<div class="inbox_people side">
					
					<!-- primary slide -->
					<div class="side-one">					
						<!-- profile area -->
						<div class="heading">
							<div class="heading-avatar _sdffgf">
								<div class="heading-avatar-icon _1BjNO" @click="toggleProfileSection">
									<!-- when image is present -->
									<img v-if="userPic" :src="userPic" class="_2goTk" :class="{'_1Jdop' : userPic.length}">
									<div class="_1V82l">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" width="212" height="212">
											<path fill="#DFE5E7" class="background" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z">
											</path>
											<path fill="#FFF" class="primary" d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z">
											</path>
										</svg>
									</div>
									<div class="_bjkas" :class="{ 'c2sdff' : serverOnline }">
										<!-- show server online/offline -->
									</div>
								</div>
							</div>
							
							<div class=" heading-compose  ">
								<i class="fa fa-comments fa-2x  " aria-hidden="true"></i>
							</div>
							
							<div class=" heading-dot  ">
								
								<div class="dropdown">
									<!--Trigger-->
									<i class="fa fa-ellipsis-v fa-2x  " aria-hidden="true" id="dropdownMenu1" data-toggle="dropdown"></i>
									<!--Menu-->
									<div class="dropdown-menu dropdown-primary dropdown-menu-right">
										<h6 class="dropdown-header">MANAGE</h6>
										<a class="dropdown-item profile" @click="toggleProfileSection" href="#"> Profile </a>
										
										<div class="dropdown-divider"></div>
										<a class="dropdown-item" href="#">New Group</a>
										
										<!-- <div class="dropdown-divider"></div> -->
										<a class="dropdown-item" @click='logout' href="#">Log Out</a>
										
									</div>
								</div>
							</div>
							
						</div>
						
						<!-- search area -->
						<div class="row searchBox">
							<div class="col-sm-12 searchBox-inner">
								<div class="form-group has-feedback"> 
									<input id="searchText" type="text" class="form-control search-bar" name="searchText" v-model="newUserName" v-on:keyup.enter="addNewUser" placeholder="Search">
									<span class="input-group-addon form-control-feedback">
										<i class="fa fa-search" aria-hidden="true"></i>
									</span> 
								</div>
							</div>
						</div>
						
						<!-- friends section -->
						<div class="inbox_chat">
							
							
							
						<!---<div class="chat_list active_chat">
								<div class="chat_people">
									<div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
									<div class="chat_ib">
										<h5>Sunil Rajput <span class="chat_date">Dec 25</span></h5>
										<p>Test, which is a new approach to have all solutions 
										astrology under one roof.</p>
									</div>
								</div>
							</div> --->
							
							<div  v-for="(friend) in friends_list" :key="friend.email" @click="currentFriend($event, friend)" class="chat_list">
								<div class="chat_people">
									<div class="_fsdfl">
										<div class=" _1BjNO chat_img">
											
											<img v-if="friend.photo.length" :src = "friend.photo" class="_2goTk" :class="{'_1Jdop' : friend.photo.length}">
											<div class="_1V82l">
												<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" width="212" height="212">
													<path fill="#DFE5E7" class="background" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z">
													</path>
													<path fill="#FFF" class="primary" d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z">
													</path>
												</svg>
											</div>
											<div class="_bjkas"  :class="{ 'c2sdff' : friend.online_status }">
												<!-- show friend online/offline -->
											</div>
										</div>
									</div>
									<div class="chat_ib">
										<div class="_lkgfd">
											<div class="_kdsf">
												<span>{{ friend.email }} </span>
											</div> 
											<span class="chat_date">Dec 25</span>
										</div>
										<div class="_lkgfd"> 
											<div class="_mklfdg">
												<span class="_nkfds">Test, which is a new approach to have all solutions 
												astrology under one roof.</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					
					<!-- profile slide -->
					<div class="side-two" v-if="showProfileSection">
						<div class="row newMessage-heading">
							<div class="row newMessage-main">
								<div class="col-2 col-sm-2 col-xs-2 newMessage-back">
									<i class="fa fa-arrow-left" aria-hidden="true"></i>
								</div>
								<div class="col-10 col-sm-10 col-xs-10 newMessage-title">
									Profile
								</div>
							</div>
						</div>
						
						<div class="row compose-sideBar">
							<div class=" _zmnfmds  _2PkS4">
								<div class=" _3X-61 ">
									<div class=" _3_Hvt " @click="$refs.userImageUpload.click()" @mouseleave="hoverProfilePic=false">
										<div class="Ao0On" @mouseenter="hoverProfilePic=true" >
											<div class="H36t4">
												<div v-if="userPic.length" class="_dsf23">
													<img :src="userPic" class="_2goTk" :class="{'_1Jdop' : userPic.length}">
												</div>
											</div>
										</div>
										<span v-if="hoverProfilePic">
											<div class="_2H1bg" style="opacity: 1;" >
												<div class="_1Zi9g" >
													<span data-testid="camera" data-icon="camera" class="">
														<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M21.317 4.381H10.971L9.078 2.45c-.246-.251-.736-.457-1.089-.457H4.905c-.352 0-.837.211-1.078.468L1.201 5.272C.96 5.529.763 6.028.763 6.38v1.878l-.002.01v11.189a1.92 1.92 0 0 0 1.921 1.921h18.634a1.92 1.92 0 0 0 1.921-1.921V6.302a1.92 1.92 0 0 0-1.92-1.921zM12.076 18.51a5.577 5.577 0 1 1 0-11.154 5.577 5.577 0 0 1 0 11.154zm0-9.506a3.929 3.929 0 1 0 0 7.858 3.929 3.929 0 0 0 0-7.858z"></path>
														</svg>
													</span>
												</div>
												<div class="_2r5kE" >Change profile photo</div>
											</div>
										</span>
									</div>
									<input type="file" ref="userImageUpload" @change="onUserImagePicked" accept="image/gif,image/jpeg,image/jpg,image/png" style="display: none;">
								</div>
							</div>
							
							<div class=" user-name-area _2Bps4 _1mTqm _1q6Ey">
								<div class="_1Gecv">
									<div class="">
										<div class="_3mR1z">
											<div class="_3HPyS _1e77x">
												<span class="_2y8MV">Your Name</span>
											</div>
										</div>
									</div>
								</div>

								<div class="_2m-1n">
									<div class="_1Rerq">
										<div class="_2FVVk">
											<div contenteditable="false" @keydown="updateUserName" spellcheck="false">
												{{username}}
											</div>
										</div>
										<div>
											<span class="jhifs2"><i class="fa fa-pencil" aria-hidden="true"></i></span>
										</div>
									</div>										
								</div>								
							</div>

							<div class="_2fM4q">
								<span class="_2-1_O">This is not your username or pin. This name will be visible to your WhatsApp contacts.</span>
							</div>
							
							<div class=" user-email-area _2Bps4 _1mTqm _1q6Ey ">
								<div class=" _1Gecv sideBar-avatar">
									<div class="">
										<div class="_3mR1z">
											<div class="_3HPyS _1e77x">
												<span class="_2y8MV">Your Email</span>
											</div>
										</div>
									</div>
								</div>
								<div class="_2m-1n">
									<div class="_1Rerq ">
										<div class="_2fVVk">
											<span >{{ useremail }}</span>
										</div>
									</div>
								</div>
								
							</div>
							
						</div>
					</div>
				</div>

				<div v-if="!showMessageArea" class="welcome-page">
					<div class="fsfdsf dskf">
						<div class="dsjkf">
							<!-- image area -->
						</div>
						<div class="_nsdjfk">
							<div class="bkdf">
								Chat app helps in real time chatting with person to person.	
								You can share documents and many more.
							</div>
						</div>
					</div>
				</div>
				<div v-else class="mesgs ">
				
					<!-- background image -->
					<div class="_sdff">
					</div>
					<!-- message area header -->
					<div class=" heading">
						<div class=" heading-avatar">
							<div class="friend-avatar-icon _1BjNO">
								<div v-if="targetFriendDetails.photo" class="_dsf23">
									<img :src="targetFriendDetails.photo" class="_2goTk" :class="{'_1Jdop' : targetFriendDetails.photo.length}">
								</div>
								<div class="_1V82l">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" width="212" height="212">
										<path fill="#DFE5E7" class="background" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z">
										</path>
										<path fill="#FFF" class="primary" d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z">
										</path>
									</svg>
								</div>
							</div>
						</div>
						<div class="heading-name">
							<div class="_2FCjS">
								<span class="heading-name-meta"> {{ targetFriendDetails.email }} </span>
							</div>
							
							<div class="_3xjAz">
								<div class="ticontainer" v-if = "typing_status.me === targetFriendDetails.email && typing_status.status">
									<div class="tiblock">
										<div class="tidot"></div>
										<div class="tidot"></div>
										<div class="tidot"></div>
									</div>
								</div>						
								
								<div class="" v-else>
									<span v-if="targetFriendDetails.online_status" title="online" class="heading-online _3-cMa">Online</span>
									<span v-else title="last seen " class="heading-online _3-cMa">
										last seen
										<span v-if="new Date().setHours(0,0,0,0) === new Date(targetFriendDetails.last_login).setHours(0,0,0,0)">
											today at
										</span>
										<span v-else>
											{{new Date(targetFriendDetails.last_login).toLocaleDateString('en-us')}} at
										</span>
										<span> {{new Date(targetFriendDetails.last_login).toLocaleTimeString('en-us', {hour:'2-digit', minute:'2-digit'})}}</span>
									</span>
								</div>
							</div>
						</div>
						<div class=" heading-dot">
							<i class="fa fa-ellipsis-v fa-2x " aria-hidden="true"></i>
						</div>
					</div>
					
					<div class="msg_history" @dragenter="enableDropzone">
						<div v-if="noMessages">
							<span> No conversation yet ! Please start sending messages </span>
						</div>
						<div v-for="cum in CurrentUserMessages" :key="cum.index" >							
							<div v-if="cum.user_id != userId" class="incoming_msg _2hqOq">
								<div class="incoming_msg_img _1BjNO">
									<img src="" :alt="cum.user_id" class="_2goTk">
									<div class="_1V82l">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" width="212" height="212">
											<path fill="#DFE5E7" class="background" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z">
											</path>
											<path fill="#FFF" class="primary" d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z">
											</path>
										</svg>
									</div>
								</div>


								<div v-if="cum.type == 'text'" class="received_msg text-message">
									<div class="received_withd_msg">
										<p v-html = 'cum.msg'></p>
										<span class="time_date"> {{cum.time}} | {{cum.date}}<!---11:01 AM | June 9---></span>
									</div>
								</div>
								<div v-else-if="cum.type == 'document'" class="received_msg document-message">
									<div class="received_withd_msg">
										<p v-html = 'cum.original_file_name'></p>
										<span class="time_date"> {{cum.time}} | {{cum.date}}<!---11:01 AM | June 9---></span>
									</div>
								</div>
							</div>
							
							<div v-else class="outgoing_msg _2hqOq">
								<div v-if="cum.type == 'text'" class="sent_msg text-message">
									<p v-html = 'cum.msg'></p>
									<span class="time_date"> {{cum.time}} | {{cum.date}} </span> 
								</div>
								<div v-else-if="cum.type == 'document'" class="sent_msg document-message">
									<p v-html = 'cum.original_file_name'></p>
									<span class="time_date"> {{cum.time}} | {{cum.date}} </span> 
								</div>
							</div>
							
						</div>
					</div>
					<div class=" send-document" id="send-document" >
						<div v-if="showdropzone" 
							class="_kjdfg"
							@dragleave="disableDropzone">
							<vue-dropzone ref="myVueDropzone" 
								id="dropzone" 
								:options="dropzoneOptions" 
								:duplicateCheck=true
								v-on:vdropzone-removed-file="fileRemoved"
								v-on:vdropzone-mounted="dropzoneMounted"
								v-on:vdropzone-success="fileUploadSuccess"
								v-on:vdropzone-drop="fileDropped"
								class=""
							></vue-dropzone>
							
							<div class="send-document-button" v-if="showSendDocumentButton">
								<button type="button" class="msg_send_btn" @click="sendDocument">
									<i aria-hidden="true" class="fa fa-paper-plane-o"></i>
								</button>
							</div>
						</div>
					</div>
					<div class="type_msg">
						<div class="input_msg_write">
							<form @submit.prevent="send">								
								<div class="home-page">									
									
									<span class="emoji-trigger" :class="{ 'triggered': showEmojiPicker }" @mousedown.prevent="toggleEmojiPicker" >
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"></path></svg>
									</span>

									<div class="input-content">
										<div v-if="messagePlaceholder" class="placeholder-message">
											<span>Type a message</span>
										</div>
										<div class="text-content">
											<div
											contenteditable="true"
											spellcheck="false"
											placeholder="Type a message"
											ref="textarea"
											class="textarea"
											id = "inputmessage"
											@keyup="onEditorChange"
											@keydown="removePlaceholder"
											@keydown.enter="send">
											</div>
										</div>
										
									</div>
									
									<div class="_kdffd">
										<button class="msg_send_btn"  type="submit"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
									</div>
								</div>														
								<div  class="emoji-section" :class="{ 'kkjh' :  showEmojiPicker }">
									<picker
									v-if="showEmojiPicker"
									title="Pick your emoji..."
									emoji="point_up"
									:emojiSize="35"
									:infiniteScroll="false"
									:showPreview="false"
									:showSkinTones="true"
									:native="false"
									:style="{ width: '100%', height: '300PX', position: 'absolute', border: 'none'}"
									@select="addEmoji"
									/>
								</div>								
							</form>
						</div>
					</div>
					
				</div>		  
			</div>
		</div>
		<div v-if="false" >
			<EmojiConvertor/>
		</div>
	</div>
</template>

<script>

	//import globalService from '../service/globalCall'
	//import openSocket from 'socket.io-client';
	
	import globalCalls from '../mixins/globalCalls'
	import io from 'socket.io-client/dist/socket.io.js'
	import jQuery from "jquery";
	const $ = jQuery;
	window.$ = $;
	//import emoji from '../assets/vendor/emoji-images-master/'
	
	import { Picker } from 'emoji-mart-vue'
	
	import vue2Dropzone from 'vue2-dropzone'
	import 'vue2-dropzone/dist/vue2Dropzone.min.css'

	// // Import component
    // import Loading from 'vue-loading-overlay';
    // // Import stylesheet
	// import 'vue-loading-overlay/dist/vue-loading.css';
	import Loader from './Loader'
	
	import EmojiConvertor from 'emoji-js'
	
	let socket = null
	export default{
		name : 'Homepage',
		mixins: [globalCalls],
		components:  {
			'picker' : Picker,
			'vueDropzone' : vue2Dropzone,
			'Loader' : Loader,
			'EmojiConvertor' : EmojiConvertor,
		},
		data : function (){
			return {
				myemoji: '',
				newMessage: '', // the string content to save
				// content : '', // the actual content to view
				newUserName: '',
				messages: [],
				typing: false,
				username: '',
				updatedusername : '',
				useremail : '',
				userPic : '',
				userId: this.$store.getters.user_id || null,
				// ready: false,
				info: [],
				connections: 0,
				// isOnline : false,
				serverOnline : false,
				socketId : this.$store.getters.getSocketId || 'invalid Id',
				newUserAdded : false,
				friends_list : [],
				listOfFriendOnline : [],
				targetFriendDetails : {},
				CurrentUserMessages : [],
				noMessages : true,
				showMessageArea : false,
				typing_status : false,
				showEmojiPicker : false,				
				currentIndex : 0,
				messagePlaceholder : true,
				showdropzone : false,
				showSendDocumentButton : false,
				isLoading: true,
				showProfileSection : false,
				hoverProfilePic : false,
				dropzoneOptions: {
					url: this.$store.state.apiBaseUrl + 'fileupload/', //'https://httpbin.org/post',
					thumbnailWidth: 150,
					maxFilesize: 15, // in mb
					addRemoveLinks: true,
					autoProcessQueue: false,
					ignoreHiddenFiles : true,
					clickable : true,
					// dictDefaultMessage: "<span class='add-more'>click on me</span>",
					// uploadMultiple : true,
					headers: { "Authorization": this.$session.get('validatedToken') || '' }
				},
			}
		},
		created : function(){
			const ref = this
			
			$(document).on('focus', 'div[id=inputmessage]',  function(){
				ref.range = window.getSelection().getRangeAt(0);
			})

			$(document).on('keyup click DOMNodeInserted','#inputmessage', function(){
				ref.range = window.getSelection().getRangeAt(0);
				/*
				let node = $(".textarea")[0]
				var caretOffset = 0
				var range = window.getSelection().getRangeAt(0);

				var treeWalker = document.createTreeWalker(
					node,
					NodeFilter.ELEMENT_NODE,
					function(node) {
						var nodeRange = document.createRange();
						nodeRange.selectNodeContents(node);
						return nodeRange.compareBoundaryPoints(Range.END_TO_END, range) < 1 ?
							NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
					},
					false
				);

				var charCount = 0, lastNodeLength = 0;

				if (range.startContainer.nodeType == 3) {
					charCount += range.startOffset;
				}

				while (treeWalker.nextNode()) {
					charCount += lastNodeLength;
					lastNodeLength = 0;
					
					if(range.startContainer != treeWalker.currentNode) {
						if(treeWalker.currentNode instanceof Text) {
							lastNodeLength += treeWalker.currentNode.length;
						} else if(treeWalker.currentNode instanceof HTMLBRElement ||
								treeWalker.currentNode instanceof HTMLImageElement  ||
								treeWalker.currentNode instanceof HTMLDivElement)
						{
							lastNodeLength++;
						}
					}
				}
				
				caretOffset =  charCount + lastNodeLength;				
				ref.currentIndex = caretOffset
				*/
			})

			// check for network connections
			window.setInterval(() => {
				// this.isOnline = navigator.onLine
			}, 1000)
		
			socket = io.connect(this.$store.state.apiUrl, 
				{ 
					query:{
							token:this.$session.get('validatedToken')
					} ,
					path : '/ws', 
				}
			);
			
			// when client socket connected to server socket
			socket.on('connect', function () {
				console.log('socket connect from client : ' + socket.connected)
				// ref.ready = true;
				ref.serverOnline = socket.connected
			})
			
			// when client socket is disconnected
			socket.on('disconnect', (data) => {
				//socket.open();
				console.log(data)
				ref.serverOnline = socket.connected
				console.log('socket is disconnected ' + socket.connected)

				// set all friend statis false
				this.friends_list.forEach(function(ele){
					ele.online_status = false
				})
			});

			// Listening to 'joined' event emitted from the server and pushing the data to info array
			socket.on('joined', (data) => {
				console.log(data)
				this.$store.commit('setSocketId', data.res.data)
				this.$store.commit('setUserId', this.$session.get("user_id"))
				//this.$store.commit('setUserName', this.$session.get("user_name"))
				
				// get all the connected friends
				socket.emit('get_friends', {});
				
				// get user details
				socket.emit('get_user_details', {});
				
			})
			
			// Emitting 'leave' event on tab closed event.
			window.onbeforeunload = () => {
				socket.emit('leave', {date : new Date});
				
            }
			
			// 'friendLeft' event emit when friend logged out
			socket.on('friendLeft', (data) => {
				console.log(data)
				console.log(' left and is offline')
				// this.serverOnline = false
				this.friends_list.forEach(function(ele){
					if(ele.email === data.friendemail) ele.online_status = false

					if(ele.email === ref.targetFriendDetails.email)
					{
						ref.targetFriendDetails.online_status = false
						ref.targetFriendDetails.last_login = data.last_login
					}
				})
				

			})
			// inbuilt event 'leave' of current login
			// socket.on('leave', (data) => {
			// 	console.log(data + ' left')
			// 	this.serverOnline = false
			// 	// this.friends_list.forEach(function(ele){
			// 	// 	if(ele.email === data)
			// 	// 	ele.online_status = false
			// 	// })

			// })
			socket.on('connect_error', (error) => {
				console.log('connect_error' + error)
			});
			socket.on('connect_timeout', (timeout) => {
				console.log('connect_timeout ' + timeout)
			});
			// on token expiry
			socket.on('error', (error) => {
				console.log('error ' + error)
				// redirect to invalid session
				this.$store.dispatch('destroyToken').then(() => {
					socket.close();
					this.$router.push('/login')
				}).catch(() => {})
			});

			// get friends online status
			// socket.on('getFriendsOnlineStatus', (res) => {
			// 	console.log(res)
			// 	this.listOfFriendOnline.push(res.data)
			// 	console.log(this.listOfFriendOnline)
				
			// });

			// get friend online status
			socket.on('getFriendOnlineStatus', (res) => {
				console.log(res)
				// update status in global data
				this.friends_list.forEach(function(ele){
					if(ele.email === res.friendEmail) ele.online_status = res.online

					if(ele.email === ref.targetFriendDetails.email)
					{
						ref.targetFriendDetails.online_status = res.online
					}
				})
				
			});

			// Listening to typing event emitted from the server and setting the data (username) to the UI
			socket.on('typing', (data) => {
                this.typing = data;
            });
			// Listening to stopTyping event emitted from the server and setting the typing property to false
			socket.on('stopTyping', () => {
				this.typing = false;
			});
			
			// Get friend updated image (if you are online)
			socket.on('getUpdatedFriendPic', (res) => {
                // update pic in global data
				this.friends_list.forEach(function(ele){
					if(ele.email === res.friendEmail)
						ele.photo = res.imageData
						ref.targetFriendDetails.photo = res.imageData
				})
			});
			// Get updated image
			socket.on('getUpdatedPic', (res) => {
				// update pic in global data
				console.log(res)
				this.userPic = res.imageData
			});

		
			// Listening to 'connections' event emitted from the server to get the total number of connected clients
			socket.on('connections', (data) => {
				this.connections = data;
			})
		},
		computed : {
			updatesocketId : function(){
				return this.$store.getters.getSocketId
			},
			updateuserId : function(){
				return this.$store.getters.user_id
			},
			
			
		},
		methods : {
			// uplaod / remove user pic
			onUserImagePicked : function (event){
				const files = event.target.files
				let ref = this
				var validMIME = ['image/gif' ,'image/jpeg', 'image/jpg', 'image/png']; //array of valid file types
				if(!files || !files.length || $.inArray(files[0].type, validMIME) == -1)
					return
				
				// let filename = files[0].name
				const fileReader = new FileReader()
				let imageUrl
				fileReader.addEventListener('load', () => {
					imageUrl = fileReader.result
					ref.updateImage(imageUrl)
					// console.log(imageUrl ,fileReader);
				})

				fileReader.readAsDataURL(files[0])

				// var image = files[0]
				// console.log(filename);console.log(image)
				
			},
			// callback initiated for image convertion to readAsDataURL
			updateImage : function (imageUrl) {
				// save image data in database
				socket.emit('save-user-image', {
					// date : new Date,
					// time : new Date().toLocaleTimeString('en-us', {hour:'2-digit', minute:'2-digit'}),
					imageData : imageUrl,
					email : this.useremail,
					
				});
			},
			// show/hide profile section
			toggleProfileSection : function (){
				
				this.showProfileSection = true

				this.$nextTick(() => { 
					$(".side-two").css({
						"left": "0%"
					});
				})
			},
			//  focus on message area
			focusMessageBox : function () {
				const textarea = this.$refs.textarea
				// console.log(textarea)
				textarea.focus()
			},
			
			// on key press in message area
			onEditorChange : function(event){
				//this.content = event.target.innerHTML
				this.newMessage = event.target.innerHTML.replace(/<br\s*\/?>|[&]nbsp[;]/gi, "")
				// console.log(this.newMessage)
				this.messagePlaceholder = this.newMessage.length ? false : true
				
				//console.log(this.newMessage)
			},
			//  remove placeholder from message area
			removePlaceholder : function (e){
				// console.log(!this.newMessage.length, e.code , e.keyCode , e.which)
				if(!this.newMessage.length){
					if( (e.code === 'Space' && e.keyCode === 32 &&  e.which === 32)
						|| (e.code === 'Backspace' && e.keyCode === 8 && e.which === 8) )
						e.preventDefault()
					else if( (e.code === 'Tab' && e.keyCode === 9 && e.which === 9 )){
						this.messagePlaceholder = true
					}
					else
						this.messagePlaceholder = false
				}
			},
			// update user name in profile section
			updateUserName : function (e){
				const updatedusername = e.target.innerText

				// Excempt keys(arrows, del, backspace, home, end);
				var excempt = [37,38,39,40,46,8,36,35];
				
				if(excempt.indexOf(event.which) === -1 && updatedusername.length > 20){
					e.preventDefault(); 
					return;
				} 
			},
			pasteHtmlAtCaret : function(html) {
				var sel, range , selectPastedContent = false;
				if (window.getSelection) {
					// IE9 and non-IE
					sel = window.getSelection();
					if (sel.getRangeAt && sel.rangeCount) {
						range = sel.getRangeAt(0);
						range.deleteContents();

						// Range.createContextualFragment() would be useful here but is
						// only relatively recently standardized and is not supported in
						// some browsers (IE9, for one)
						var el = document.createElement("div");
						el.innerHTML = html;
						var frag = document.createDocumentFragment(), node, lastNode;
						while ( (node = el.firstChild) ) {
							lastNode = frag.appendChild(node);
						}
						var firstNode = frag.firstChild;
						range.insertNode(frag);
						
						// Preserve the selection
						if (lastNode) {
							range = range.cloneRange();
							range.setStartAfter(lastNode);
							if (selectPastedContent) {
								range.setStartBefore(firstNode);
							} else {
								range.collapse(true);
							}
							sel.removeAllRanges();
							sel.addRange(range);
						}
					}
				} 
				else if ( (sel = document.selection) && sel.type != "Control") {
					// IE < 9
					var originalRange = sel.createRange();
					originalRange.collapse(true);
					sel.createRange().pasteHTML(html);
					if (selectPastedContent) {
						range = sel.createRange();
						range.setEndPoint("StartToStart", originalRange);
						range.select();
					}
				}
				this.range = window.getSelection().getRangeAt(0);
			},

			addEmoji : function(emoji) {
				//const textarea = this.$refs.textarea
				// console.log(emoji)
				// const id = emoji.id
				// const name = emoji.name
				// const url = '/pngs'
				// const size = 20
				let colons = emoji.colons
				
				// console.log(this.myemoji)
				// this.myemoji.replace_mode = 'css'
				// this.myemoji.use_css_imgs = true

				// this.myemoji.replace_mode = 'img'
				// this.myemoji.allow_native = true
				this.myemoji.wrap_native = true
				this.myemoji.supports_css = false
				// this.myemoji.use_sheet = true
				// this.myemoji.include_title = true
				// this.myemoji.include_text = true
				// this.myemoji.img_set = 'apple'
				// this.myemoji.img_sets.apple.path = 'http://my-cdn.com/emoji-apple-64/';
				// this.myemoji.img_sets.apple.sheet = 'emoji-data/64.png';
				var img = this.myemoji.replace_colons(colons);
				// console.log(img)

				
				var content = document.getElementById("inputmessage")

				// restore focus selection
				this.restoreMessageAreaSelection()				
				
				this.pasteHtmlAtCaret(img);
				
				this.$nextTick(() => {
					this.newMessage = content.innerHTML
					this.messagePlaceholder = this.newMessage.length ? false : true
				})				
			},
			// catch the caret position
			restoreMessageAreaSelection : function () {
				if (window.getSelection)//non IE and there is already a selection
				{
					var s = window.getSelection();
					if (s.rangeCount > 0) 
						s.removeAllRanges();
					s.addRange(this.range);
				}
				else if (document.createRange)//non IE and no selection
				{
					window.getSelection().addRange(this.range);
				}
				else if (document.selection)//IE
				{
					this.range.select();
				}
			},
			// show/hide emoji picker
			toggleEmojiPicker : function () {		
				
				this.showEmojiPicker = !this.showEmojiPicker

				this.$nextTick( () => {
					
					// focus on contenteditable
					this.focusMessageBox()
					

					// catch the focus range to insert
					this.range = window.getSelection().getRangeAt(0);
					// console.log(this.range)
				})
			},
			logout: function(){
				const ref = this
				// Trigger a confirmation dialog
				this.$dialog.confirm('Please confirm to continue').then(() => {
					// logs out the app
					ref.$store.dispatch('destroyToken').then(() => {
						socket.emit('leave', {date : new Date});
						socket.close();
						ref.$session.destroy()
						ref.$router.push('/login')
					}).catch(() => {})
				}).catch((err) => {
					console.log(err);
				});
				
			},
			
			//The send method stores the user message and emit an event to the server.
			send: function(e) {
				
				if (e.keyCode === 13) e.preventDefault()

				// console.log()
				if(!this.newMessage.trim().length) return
				
				const content = document.getElementById("inputmessage")
				//this.newMessage = content.innerHTML
				content.innerHTML  = ''
				content.focus()

				this.showEmojiPicker = false
				this.$nextTick( () => {
					$(".emoji-section").css("transform", "translateY(365px)")

				})
				
				socket.emit('chat-message', {
					date : new Date,
					time : new Date().toLocaleTimeString('en-us', {hour:'2-digit', minute:'2-digit'}),
					message : this.newMessage,
					type : 'text',
					me : this.userId,
					friendRoom : this.targetFriendDetails.email
				});
				
				this.newMessage = "";
			},

			// The addUser method emit a 'joined' event with the username and set the 'ready' property to true.
			addNewUser: function() {
			
				if(!$(".search-bar").val().trim()) return
				
				socket.emit('addNewUser', {my_user_id : this.userId, friend_email : this.newUserName})
				this.newUserName = ""
			},
			currentFriend: function(e, friend){
				const ref = this
				// console.log(Object.keys(this.targetFriendDetails).length)
				// if same friend selected return false
				if(Object.keys(this.targetFriendDetails).length && this.targetFriendDetails.email === friend.email) {
					// restore focus selection
					this.restoreMessageAreaSelection()
				}

				this.targetFriendDetails.email = friend.email
				this.friends_list.forEach(function(ele){
					if(ele.email === ref.targetFriendDetails.email)
					{
						ref.targetFriendDetails.photo = ele.photo
						ref.targetFriendDetails.online_status = ele.online_status
						ref.targetFriendDetails.last_login = ele.last_login
					}
				})

				// highlight friend
				$(".inbox_chat").children('.chat_list').removeClass("active_chat")
				e.currentTarget.classList.add("active_chat")

				// when clicked on any friend then show the message area and using v-else in template
				this.$nextTick(() => {
					//get messages
					socket.emit('get-chat-messages', {
						//myId : this.userId,
						friendName : this.targetFriendDetails.email
					});

					$(".emoji-section").css("transform", "translateY(365px)")
					this.showEmojiPicker = false
				})
			},
			dropzoneMounted : function (){
				console.log('dropzone loaded successfully')
			},
			fileRemoved : function(file) { //, error, xhr){
				//console.log(file, error, xhr)
				if(file && !this.$refs.myVueDropzone.getAcceptedFiles().length){
					this.disableDropzone()
					this.showSendDocumentButton = false
					// document.getElementById('send-document').style.top = 'calc(100% + 60px)';
				}
			},
			sendDocument : function (){
				console.log('send initiated')
				if(this.$refs.myVueDropzone.getAcceptedFiles().length){
					// upload all the files to server. -- autoprocess disabled in options
					this.$refs.myVueDropzone.processQueue()

					// get all the files object
					//let documents = this.$refs.myVueDropzone.getAcceptedFiles()
				}
			},
			fileUploadSuccess : function(file, response){
			// fileUploadSuccess : function(file){

				// if(file.status === 'success'){
				// this.filesSuccessCount = this.filesSuccessCount + 1
				console.log(response)
				// console.log(file, response)
				this.$refs.myVueDropzone.removeFile(file)

				// send file to socket to save and emit
				socket.emit('chat-message', {
					date : new Date,
					time : new Date().toLocaleTimeString('en-us', {hour:'2-digit', minute:'2-digit'}),
					message : response.file,
					original_file_name : response.original_file_name,
					type : 'document',
					me : this.userId,
					friendRoom : this.targetFriendDetails.email
				});

				// remove dropzone from DOM
				if(!this.$refs.myVueDropzone.getAcceptedFiles().length){
					this.disableDropzone
				}
			},
			fileDropped : function(event){
			// fileDropped : function(){

				if(event.dataTransfer.items[0].webkitGetAsEntry().isDirectory)
					alert('no directories allowed')
				else
					this.showSendDocumentButton = true
					// console.log(this.$refs.myVueDropzone.getAcceptedFiles())
				// console.log(event.dataTransfer.items[0].webkitGetAsEntry(), event.dataTransfer.types)
			},
			enableDropzone : function (e){
				e.preventDefault();
				
				// console.log( e.dataTransfer.items, e.dataTransfer.types[1])

				if(e.dataTransfer.types[0] === "Files" || e.dataTransfer.types[1] === "Files"){
					this.showdropzone = true
					console.log('dropzone ' + this.showdropzone)
					this.$nextTick(() => {

						// console.log(this.$refs.myVueDropzone.dropzone.element)
						document.getElementById('send-document').style.top = 'calc(0% + 60px)';
					})
				}
			},
			disableDropzone : function (){
				
				document.getElementById('send-document').style.top = 'calc(100% + 60px)';
			
				this.$nextTick(() => {
					// setTimeout(function(){  }, 1000);
					this.showdropzone = false
					this.focusMessageBox()
					console.log('dropzone ' + this.showdropzone)
				})
				
			},
			
		},
		mounted : function(){
			
			const ref = this

			// disable the loader
			this.isLoading = false

			// create emoji object
			this.myemoji = new EmojiConvertor();
			
			// console.log(output2)


			// join the current logged in user to its own room
			socket.emit('user_connected', {
				
			});
			
			// avoid pasting html format
			$(document).on('paste', '[contenteditable]', function(e) {
				e.preventDefault();
				var text = '';
				if (e.clipboardData || e.originalEvent.clipboardData) {
					text = (e.originalEvent || e).clipboardData.getData('text/plain');
				} else if (window.clipboardData) {
					text = window.clipboardData.getData('Text');
				}
				if (document.queryCommandSupported('insertText')) {
					document.execCommand('insertText', false, text);
				} else {
					document.execCommand('paste', false, text);
				}
			});

			// $(".heading-avatar-icon>img, .profile").click(function() {
			// 	$(".side-two").css({
			// 		"left": "0"
			// 	});
			// });

			$(document).on("click", ".newMessage-back", function() {
				$(".side-two").css({
					"left": "-100%"
				});
				// ref.$nextTick( () => {
					ref.showProfileSection = false
				// })
				
			});
			$(document).on('click', '.jhifs2', function(){
				$(this).find('i').toggleClass('fa-pencil');
				$(this).find('i').toggleClass('fa-check');
				const el = $(this).parents("._1Rerq").find("div[contenteditable]")
				var status = el.attr("contenteditable")
				status = JSON.parse(status) ? 'false' : 'true'
				el.attr("contenteditable", status).focus()
				
				var range,selection;
				if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
				{
					range = document.createRange();//Create a range (a range is a like the selection but invisible)
					range.selectNodeContents(el[0]);//Select the entire contents of the element with the range
					range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
					selection = window.getSelection();//get the selection object (allows you to change selection)
					selection.removeAllRanges();//remove any selections already made
					selection.addRange(range);//make the range you have just created the visible selection
				}
				else if(document.selection)//IE 8 and lower
				{ 
					range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
					range.moveToElementText(el[0]);//Select the entire contents of the element with the range
					range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
					range.select();//Select the range (make it the visible selection
				}

				// save user name
				if(!JSON.parse(status)){
					ref.updatedusername = el[0].innerText
					socket.emit('save-user-details', {
						username : ref.updatedusername
					});
				}
			})
			
			socket.on('user-details', (data) => {
				if(data.isDone){
					this.updatedusername = data.data.USER_NAME
					this.username = data.data.USER_NAME
					this.useremail = data.data.USER_EMAIL
					this.userPic = data.data.USER_PIC
				}
			})
			
			socket.on('MESSAGE', (data) => {
				this.messages = [...this.messages, data.msg];
				//this.messages = data;
				// you can also do this.messages.push(data)
				
				//this.CurrentUserMessages = []
				if(data && !this.noMessages){
					this.noMessages = false
					//this.CurrentUserMessages = [...this.CurrentUserMessages, data.data];
					//console.log(data)
					var date = new Date(data.date).toLocaleDateString('en-us',{month:'short', day:'numeric'})
					
					//date = ref.dateTime(new Date( date.getTime() + Math.abs(date.getTimezoneOffset()*60000) ))
					ref.CurrentUserMessages.push({
						index : this.CurrentUserMessages.length+1,
						user_id : data.userid, 
						msg : data.msg, 
						date: date, 
						time : data.time, 
						type : data.type,
						original_file_name : data.original_file_name
					})
					// console.log(ref.CurrentUserMessages)
					// setTimeout(() => {
						$(".msg_history").animate({ scrollTop: $(".msg_history")[0].scrollHeight }, "slow");
						//$(".msg_history").scrollTop($(".msg_history")[0].scrollHeight)
						
					// },0)
					//this.messages = data;
					// you can also do this.messages.push(data)
				}
			});
			// add new user
			socket.on('added_new_user', (data) => {
				this.messages = [...this.messages, data];
				// you can also do this.messages.push(data)
				
				
				socket.emit('get_friends', {});
				//create UI for this user
				//this.newUserAdded = true
			});
			// get list of friends
			socket.on('list_of_friends', (data) => {
				this.messages = [...this.messages, data]
				// console.log(data)
				this.friends_list = []
				if(data.isDone){
					$.each(data.data, function(key, value){
						ref.friends_list.push({
							email : value.USER_EMAIL
							,online_status : value.IS_ONLINE
							,photo : value.USER_PIC || ''
							,last_login : value.LAST_LOGIN || ''
						})
					})
				}
				
			});
			
			// get messages
			socket.on('message_list', (data) => {
				const ref = this
				this.CurrentUserMessages = []
				this.showMessageArea = true
				if(data.isDone)
				{
					//console.log(data)
					this.noMessages = false
					//this.CurrentUserMessages = [...this.CurrentUserMessages, data.data];
					var date;
					$.each(data.data, function(key, value){//console.log(value)
						//date_time = ref.dateTime(new Date(value.DATE_TIME))
						date= new Date(value.DATE).toLocaleDateString('en-us',{month:'short', day:'numeric'})
						//date_time = ref.dateTime(new Date( date_time.getTime() + Math.abs(date_time.getTimezoneOffset()*60000) ))
						//date_time = new Date(value.DATE_TIME).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
						
						let original_file_name = ""
						if(value.TYPE == 'document'){
							original_file_name = value.DOCUMENT_NAME.substring(0, value.DOCUMENT_NAME.lastIndexOf("_") + 0)
							original_file_name = original_file_name + /(?:\.([^.]+))?$/.exec(value.DOCUMENT_NAME)[0]	
						}
						
						ref.CurrentUserMessages.push({
							index : key, 
							user_id : value.USER_ID, 
							friendid : value.FRIEND_ID, 
							msg : value.MESSAGE, 
							documnt_name : value.DOCUMENT_NAME,
							original_file_name : original_file_name,
							date : date, 
							time: value.TIME,
							type : value.TYPE
						})
					})
					
					
					
					//this.messages = data;
					// you can also do this.messages.push(data)
				}
				else{
					this.noMessages = true
				}
				
				// focus on message box
				this.$nextTick(() => {
					this.focusMessageBox()
					$(".msg_history").animate({ scrollTop: $(".msg_history")[0].scrollHeight }, "slow");
					//$(".msg_history").scrollTop($(".msg_history")[0].scrollHeight)
					
				})
			});
			// add new friend error
			socket.on('added_new_user_error', (data) => {
				this.messages = [...this.messages, data];
				this.$dialog.alert(data.msg)
				
				// this.info.push(data)
				// setTimeout(() => {
				// 	this.info = [];
				// }, 5000);
				
				//this.messages = data;
				// you can also do this.messages.push(data)
				
			});
			
			
			// typing status
			socket.on('typing-status', (data) => {
				this.typing_status = data
				
				if(data.status) {
					window.clearTimeout(timer)
					var timer = setTimeout(() => {
							this.typing_status.status = false
						}, 2000);					
				}
			})
		},
		watch : {
			
			// Watching for changes in the message inbox box and emitting the either 'typing' or 'stopTyping' event
			newMessage(newValue) {
				newValue ? socket.emit('typing', {friendRoom : this.targetFriendDetails.email, status : true}) : socket.emit('typing', {friendRoom : this.targetFriendDetails.email, status : false})
				
            },
			updatesocketId(newValue/*, oldValue*/){
				//console.log(oldValue, newValue)
				
				this.socketId = newValue
			},
			updateuserId (newValue){
				this.userId = newValue
			},
			
			
		},
	}	
</script>