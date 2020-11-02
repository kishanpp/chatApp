import routes from './routes.js'
import store from './store'
import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)
function guardRoute (to, from, next) {

// next(false) - abort the current navigation. If the browser URL was changed (either manually by the user or via back button), it will be reset to that of the from route.

	//store.commit('getValidationsCookies')
	store.dispatch('getValidatedToken')
	const auth = store.getters.validUser
	//console.log(auth)
	if(!auth){
		next({
			path: '/login',
			query: {
				redirect: to.fullPath
			}
		})
	}
	else if(to.name === 'root'){
		next({
			path: '/homepage',
			replace: true
		})
	}
	else{
		next()
	}
}

export default new VueRouter({
	base: process.env.BASE_URL,
	mode : 'history',
	routes: routes.map(route => ({
		name: route.name,
		path: route.path,
		component: route.component,
		beforeEnter: (to, from, next) => {
			document.title = route.pageTitle
			// Auth navigation guard.
			
			if (!route.isPublic) return guardRoute(to, from, next)
			
			store.dispatch('getValidatedToken')
			const auth = store.getters.validUser
			console.log(auth)
			if(!auth)
				next()
			else
				next({path:'/homepage', replace: true})
		},
		/*beforeUpdate: (to, from, next) => {
			
		}*/
	}))
});