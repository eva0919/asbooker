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
var app = express();

app.set( 'port' , process.env.PORT || 3001 );
app.use (logger( 'dev' ));
app.use (bodyParser.json());
app.use (bodyParser.urlencoded({ extended: false }));
app.use (express. static (path.join(__dirname, 'public' )));

app.use ( function (req, res)  {
  Router.run(routes, req.path, function (Handler)  {
    var html = React.renderToString(React.createElement(Handler));
    var page = swig.renderFile( 'public/index.html' , { html: html } );
    res.send(page);
  });
});
// app.get('/', function (req, res) {
// 	// var html = React.renderToString(React.createElement(Handler));
//   var page = swig.renderFile( 'public/index.html' , { html: html } );
// 	res.send(page);
// });


app.listen(app.get( 'port' ), function ()  {
  console.log( 'Express server listening on port ' + app.get( 'port' ));
});






// send all requests to index.html so browserHistory works

// app.get('*', (req, res) => {
//   // match the routes to the url
//   match({ routes: routes, location: req.url }, (error, redirectLocation, renderProps) => {
//     if (error) {
//       console.log('Error', error);
//       res.status(500).send(error);
//     } else if (redirectLocation) {
//       res.redirect(302, redirectLocation.pathname + redirectLocation.search);
//     } else if (renderProps) {
//       const devTools = (isDev) ? <DevTools /> : null;
//       const html = renderToString(
//         <RouterContext {...renderProps} />
//       );
//       res.render('index', { isProd: (!isDev), html: html });
//     } else {
//       res.status(404).send('Not Found');
//     }
//   })
// })

// function renderPage(appHtml) {
//   return `
//     <!doctype html public="storage">
//     <html>
//     <meta charset=utf-8/>
//     <title>My First React Router App</title>
//     <link rel=stylesheet href=/index.css>
//     <div id=app>${appHtml}</div>
//     <script src="/bundle.js"></script>
//    `
// }

// var PORT = process.env.PORT || 8080
// app.listen(PORT, function() {
//   console.log('Production Express server running at localhost:' + PORT)
// })