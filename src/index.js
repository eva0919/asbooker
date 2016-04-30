import React from 'react'
import { render } from 'react-dom'
import {createStore, compose} from 'redux';
import { Provider } from 'react-redux';
import {createHistory} from 'history';
// import {syncReduxAndRouter} from 'redux-simple-router';
import { syncHistoryWithStore } from 'react-router-redux'
// import {Router} from 'react-router';
import { Router, browserHistory } from 'react-router'

import routes from './routes'
import reducers from './reducers';

const initialState = window.__INITIAL_STATE__
// Add the reducer to your store on the `routing` key
const store = createStore(
  reducers, initialState
)


const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router routes={routes} history={history}/>
  </Provider>
, document.getElementById('container'));


// render(
//   <Router routes={routes} history={browserHistory}/>,
//   document.getElementById('container')
// )