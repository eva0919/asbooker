import React from  'react' ;
import {Route, IndexRoute} from  'react-router' ;
import App from  './components/app' ;
import Layout from './components/layout'
import Home from './components/home'

export default (
	<Route path="/" component={Layout}>
		<IndexRoute component={Home}/>
		<Route path="book" component={App}/>
	</Route>
) ;