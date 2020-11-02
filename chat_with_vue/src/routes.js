// routes.js

// import components

import Login from './components/Login.vue';
import Homepage from './components/homepage.vue';
import About from './components/About.vue';
import Profile from './components/Profile.vue';
import PageNotFound from './components/PageNotFound.vue';
import VerifyUser from './components/VerifyUser.vue';
// import Loader from './components/Loader.vue';

const pageTitle = 'chat app | ';

const routes = [
	{
		name : 'root',
		path : '/', 
		isPublic: false,
		pageTitle: pageTitle,
		meta : {
			isPublic: true
		}
	},
	{
		name : 'login',
		path : '/login', 
		component : Login,
		isPublic: true,
		pageTitle: pageTitle + 'Login',
		meta : {
			isPublic: true
		}
	},
	{
		name: 'homepage',
		path: '/homepage', 
		component: Homepage,
		isPublic: false,
		pageTitle: pageTitle + 'Welcome',
	},
	{
		name: 'about',
		path: '/about', 
		component: About,
		isPublic: false,
		pageTitle: pageTitle + 'About',
	},
	{
		name: 'profile',
		path: '/profile', 
		component: Profile,
		isPublic: false,
		pageTitle: pageTitle + 'Profile',
	},
	{
		name: 'verifyuser',
		path: '/verifyuser', 
		component: VerifyUser,
		isPublic: true,
		pageTitle: pageTitle + ' verifyYourself',
	},
	// {
	// 	name: 'Filesharing',
	// 	path: '/filesharing', 
	// 	component: Filesharing,
	// 	isPublic: false,
	// 	pageTitle: pageTitle + 'Files added',
	// },
	{
		name: 'PageNotFound',
		path: '*', 
		component: PageNotFound,
		isPublic: false,
		pageTitle: pageTitle + 'Invalid navigation occured',
	},
];

export default routes;