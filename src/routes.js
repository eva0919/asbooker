import React from  'react' ;
import {Route, IndexRoute} from  'react-router' ;
import App from  './components/app' ;
import Layout from './components/layout'

export default (
	<Route path="/" component={Layout}>
		<IndexRoute component={App}/>
	</Route>
) ;