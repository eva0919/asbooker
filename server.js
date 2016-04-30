// var babel = require('babel-core/register');
// var express = require ( 'express' );
// var path = require ( 'path' );
// var logger = require ( 'morgan' );
// var bodyParser = require ( 'body-parser' );
// // import React from 'react'
// // import { renderToString } from 'react-dom/server'
// var React = require ( 'react' );
// var Router = require ( 'react-router' );

// var routes = require ( './src/routes' );
// var api_routes = require('./src/api_routes')

import express from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { Router, match, RouterContext, createMemoryHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './src/routes'
import api_routes from './src/api_routes'
import counterApp from './src/reducers'

var app = express();

app.set( 'port' , process.env.PORT || 3001 );
app.use (logger( 'dev' ));
app.use (bodyParser.json());
app.use (bodyParser.urlencoded({ extended: false }));
app.use (express. static (path.join(__dirname, 'public' )));

app.use('/api', api_routes )

// app.use ( function (req, res)  {
// 	console.dir( req.path )
// 	console.dir( routes )
//   Router.run(routes, req.path, function (Handler)  {
//     var html = React.renderToString(React.createElement(Handler));
//     var page = swig.renderFile( 'public/index.html' , { html: html } );
//     res.send(page);
//   });
// });

app.get('*', (req, res) => {
	const store = createStore(counterApp)
	const memoryHistory = createMemoryHistory(req.url)
	const history = syncHistoryWithStore(memoryHistory, store)
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    // in here we can make some decisions all at once
    if (err) {
      // there was an error somewhere during route matching
      res.status(500).send(err.message)
    } else if (redirect) {
      // we haven't talked about `onEnter` hooks on routes, but before a
      // route is entered, it can redirect. Here we handle on the server.
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      // if we got props then we matched a route and can render
      const appHtml = renderToString(<Provider store={store}><Router routes={routes} history={history}/></Provider>)
      const initialState = store.getState()
      res.send(renderPage(appHtml,initialState))
    } else {
      // no errors, no redirect, we just didn't match anything
      res.status(404).send('Not Found')
    }
  })
})

function renderPage(appHtml, initialState) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  	<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.rawgit.com/twbs/bootstrap/v4-dev/dist/css/bootstrap.css">
    
    <link rel="stylesheet" type="text/css" href="./vender/lib/css/materialize.min.css">
    <title>My First React Router App</title>
    <div id="container">${appHtml}</div>
    <script src="https://code.jquery.com/jquery-2.2.3.min.js" integrity="sha256-a23g1Nt4dtEYOj7bR+vTu7+T8VP13humZFBJNIYoEJo=" crossorigin="anonymous"></script> 
  <script type="text/javascript" src="./vender/lib/js/materialize.min.js"></script>
    <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
    <script src="./js/bundle.js"></script>
   `
}
// app.get('/', function (req, res) {
// 	// var html = React.renderToString(React.createElement(Handler));
//   // var page = swig.renderFile( 'public/index.html' , { html: html } );
// 	res.send('public/index222.html');
// });


app.listen(app.get( 'port' ), function ()  {
  console.log( 'Express server listening on port ' + app.get( 'port' ));
});



