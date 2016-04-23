var babel = require('babel-core/register');
var express = require ( 'express' );
var path = require ( 'path' );
var logger = require ( 'morgan' );
var bodyParser = require ( 'body-parser' );
// import React from 'react'
// import { renderToString } from 'react-dom/server'
var React = require ( 'react' );
var Router = require ( 'react-router' );
// import { match, RouterContext } from 'react-router'
var routes = require ( './src/routes' );
var api_routes = require('./src/api_routes')
var app = express();

app.set( 'port' , process.env.PORT || 3001 );
app.use (logger( 'dev' ));
app.use (bodyParser.json());
app.use (bodyParser.urlencoded({ extended: false }));
app.use (express. static (path.join(__dirname, 'public' )));

app.use('/api', api_routes )

app.use ( function (req, res)  {
  Router.run(routes, req.path, function (Handler)  {
    var html = React.renderToString(React.createElement(Handler));
    var page = swig.renderFile( 'public/index.html' , { html: html } );
    res.send(page);
  });
});
// app.get('/', function (req, res) {
// 	// var html = React.renderToString(React.createElement(Handler));
//   // var page = swig.renderFile( 'public/index.html' , { html: html } );
// 	res.send('public/index222.html');
// });


app.listen(app.get( 'port' ), function ()  {
  console.log( 'Express server listening on port ' + app.get( 'port' ));
});



