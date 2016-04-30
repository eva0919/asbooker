/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _path = __webpack_require__(2);

	var _path2 = _interopRequireDefault(_path);

	var _morgan = __webpack_require__(3);

	var _morgan2 = _interopRequireDefault(_morgan);

	var _bodyParser = __webpack_require__(4);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _redux = __webpack_require__(6);

	var _reactRedux = __webpack_require__(7);

	var _server = __webpack_require__(8);

	var _reactRouter = __webpack_require__(9);

	var _reactRouterRedux = __webpack_require__(10);

	var _routes = __webpack_require__(11);

	var _routes2 = _interopRequireDefault(_routes);

	var _api_routes = __webpack_require__(19);

	var _api_routes2 = _interopRequireDefault(_api_routes);

	var _reducers = __webpack_require__(22);

	var _reducers2 = _interopRequireDefault(_reducers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = (0, _express2.default)(); // var babel = require('babel-core/register');
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

	app.set('port', process.env.PORT || 3001);
	app.use((0, _morgan2.default)('dev'));
	app.use(_bodyParser2.default.json());
	app.use(_bodyParser2.default.urlencoded({ extended: false }));
	app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

	app.use('/api', _api_routes2.default);

	// app.use ( function (req, res)  {
	// 	console.dir( req.path )
	// 	console.dir( routes )
	//   Router.run(routes, req.path, function (Handler)  {
	//     var html = React.renderToString(React.createElement(Handler));
	//     var page = swig.renderFile( 'public/index.html' , { html: html } );
	//     res.send(page);
	//   });
	// });

	app.get('*', function (req, res) {
	  var store = (0, _redux.createStore)(_reducers2.default);
	  var memoryHistory = (0, _reactRouter.createMemoryHistory)(req.url);
	  var history = (0, _reactRouterRedux.syncHistoryWithStore)(memoryHistory, store);
	  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (err, redirect, props) {
	    // in here we can make some decisions all at once
	    if (err) {
	      // there was an error somewhere during route matching
	      res.status(500).send(err.message);
	    } else if (redirect) {
	      // we haven't talked about `onEnter` hooks on routes, but before a
	      // route is entered, it can redirect. Here we handle on the server.
	      res.redirect(redirect.pathname + redirect.search);
	    } else if (props) {
	      // if we got props then we matched a route and can render
	      var appHtml = (0, _server.renderToString)(_react2.default.createElement(
	        _reactRedux.Provider,
	        { store: store },
	        _react2.default.createElement(_reactRouter.Router, { routes: _routes2.default, history: history })
	      ));
	      var initialState = store.getState();
	      res.send(renderPage(appHtml, initialState));
	    } else {
	      // no errors, no redirect, we just didn't match anything
	      res.status(404).send('Not Found');
	    }
	  });
	});

	function renderPage(appHtml, initialState) {
	  return '\n    <!doctype html public="storage">\n    <html>\n    <meta charset=utf-8/>\n    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>\n  \t<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">\n    <link rel="stylesheet" href="https://cdn.rawgit.com/twbs/bootstrap/v4-dev/dist/css/bootstrap.css">\n    \n    <link rel="stylesheet" type="text/css" href="./vender/lib/css/materialize.min.css">\n    <title>My First React Router App</title>\n    <div id="container">' + appHtml + '</div>\n    <script src="https://code.jquery.com/jquery-2.2.3.min.js" integrity="sha256-a23g1Nt4dtEYOj7bR+vTu7+T8VP13humZFBJNIYoEJo=" crossorigin="anonymous"></script> \n  <script type="text/javascript" src="./vender/lib/js/materialize.min.js"></script>\n    <script>\n          window.__INITIAL_STATE__ = ' + JSON.stringify(initialState) + '\n        </script>\n    <script src="./js/bundle.js"></script>\n   ';
	}
	// app.get('/', function (req, res) {
	// 	// var html = React.renderToString(React.createElement(Handler));
	//   // var page = swig.renderFile( 'public/index.html' , { html: html } );
	// 	res.send('public/index222.html');
	// });

	app.listen(app.get('port'), function () {
	  console.log('Express server listening on port ' + app.get('port'));
	});
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("react-router-redux");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(9);

	var _app = __webpack_require__(12);

	var _app2 = _interopRequireDefault(_app);

	var _layout = __webpack_require__(17);

	var _layout2 = _interopRequireDefault(_layout);

	var _home = __webpack_require__(18);

	var _home2 = _interopRequireDefault(_home);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createElement(
		_reactRouter.Route,
		{ path: '/', component: _layout2.default },
		_react2.default.createElement(_reactRouter.IndexRoute, { component: _home2.default }),
		_react2.default.createElement(_reactRouter.Route, { path: 'book', component: _app2.default })
	);

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _bookList = __webpack_require__(13);

	var _bookList2 = _interopRequireDefault(_bookList);

	var _activedBook = __webpack_require__(16);

	var _activedBook2 = _interopRequireDefault(_activedBook);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var App = function (_Component) {
	  _inherits(App, _Component);

	  function App() {
	    _classCallCheck(this, App);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
	  }

	  _createClass(App, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_bookList2.default, null),
	        _react2.default.createElement(_activedBook2.default, null)
	      );
	    }
	  }]);

	  return App;
	}(_react.Component);

	exports.default = App;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(7);

	var _redux = __webpack_require__(6);

	var _selectBook = __webpack_require__(14);

	var _selectBook2 = _interopRequireDefault(_selectBook);

	var _initialBookList = __webpack_require__(15);

	var _initialBookList2 = _interopRequireDefault(_initialBookList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BookList = function (_Component) {
	  _inherits(BookList, _Component);

	  function BookList() {
	    _classCallCheck(this, BookList);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(BookList).apply(this, arguments));
	  }

	  _createClass(BookList, [{
	    key: 'renderList',
	    value: function renderList() {
	      var _this2 = this;

	      return this.props.books.map(function (book) {
	        return _react2.default.createElement(
	          'li',
	          {
	            key: book._id,
	            onClick: function onClick() {
	              return _this2.props.selectBook(book);
	            },
	            className: 'list-group-item' },
	          book.name
	        );
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      $.get('/api/', function (result) {
	        this.props.initialBookList(JSON.parse(result));
	      }.bind(this));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'ul',
	        { className: 'list-group col-sm-4' },
	        this.renderList()
	      );
	    }
	  }]);

	  return BookList;
	}(_react.Component);

	function mapStateToProps(state) {
	  // Whatever is returned will show up as props
	  // inside of BookList
	  return {
	    books: state.books
	  };
	}

	function mapDispatchToProps(dispatch) {
	  // Whenever selectBook is called, the result shoudl be passed
	  // to all of our reducers
	  return (0, _redux.bindActionCreators)({ selectBook: _selectBook2.default, initialBookList: _initialBookList2.default }, dispatch);
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(BookList);

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (book) {
	  // selectBook is an ActionCreator, it needs to return an action,
	  // an object with a type property.
	  return {
	    type: 'BOOK_SELECTED',
	    payload: book
	  };
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (booklist) {
	  // selectBook is an ActionCreator, it needs to return an action,
	  // an object with a type property.
	  return {
	    type: 'BOOKLIST_SET_INITIAL',
	    payload: booklist
	  };
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(7);

	var _redux = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ActivedBook = function (_Component) {
	  _inherits(ActivedBook, _Component);

	  function ActivedBook() {
	    _classCallCheck(this, ActivedBook);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ActivedBook).apply(this, arguments));
	  }

	  _createClass(ActivedBook, [{
	    key: 'renderContents',
	    value: function renderContents() {
	      var key = 0;
	      return this.props.activedBook.contents.map(function (contentSet) {
	        key += 1;
	        var keyString = "contentKey" + key;
	        return _react2.default.createElement(
	          'span',
	          { key: keyString },
	          _react2.default.createElement(
	            'p',
	            null,
	            contentSet.question
	          ),
	          _react2.default.createElement(
	            'p',
	            null,
	            contentSet.content
	          )
	        );
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.props.activedBook) {
	        return _react2.default.createElement(
	          'div',
	          { className: 'active-book-block col-sm-8' },
	          _react2.default.createElement(
	            'h2',
	            null,
	            this.props.activedBook.name
	          ),
	          _react2.default.createElement(
	            'div',
	            null,
	            this.renderContents()
	          )
	        );
	      } else {
	        return _react2.default.createElement('div', { className: 'active-book-block col-sm-8' });
	      }
	    }
	  }]);

	  return ActivedBook;
	}(_react.Component);

	function mapStateToProps(state) {
	  // Whatever is returned will show up as props
	  // inside of BookList
	  return {
	    activedBook: state.activedBook
	  };
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(ActivedBook);

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Layout = function (_Component) {
		_inherits(Layout, _Component);

		function Layout() {
			_classCallCheck(this, Layout);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Layout).apply(this, arguments));
		}

		_createClass(Layout, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'nav',
						null,
						_react2.default.createElement(
							'div',
							{ className: 'nav-wrapper' },
							_react2.default.createElement(
								'a',
								{ href: '#', className: 'brand-logo right' },
								'說書先生'
							),
							_react2.default.createElement(
								'ul',
								{ id: 'nav-mobile', className: 'left hide-on-med-and-down' },
								_react2.default.createElement(
									'li',
									null,
									_react2.default.createElement(
										_reactRouter.Link,
										{ to: '/book' },
										'書評總表'
									)
								),
								_react2.default.createElement(
									'li',
									null,
									_react2.default.createElement(
										'a',
										{ href: 'badges.html' },
										'關於我們'
									)
								),
								_react2.default.createElement(
									'li',
									null,
									_react2.default.createElement('a', { href: 'collapsible.html' })
								)
							)
						)
					),
					_react2.default.createElement(
						'div',
						null,
						this.props.children
					)
				);
			}
		}]);

		return Layout;
	}(_react.Component);

	exports.default = Layout;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Home = function (_React$Component) {
	  _inherits(Home, _React$Component);

	  function Home() {
	    _classCallCheck(this, Home);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Home).apply(this, arguments));
	  }

	  _createClass(Home, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'alert alert-info' },
	        'Hello from Home  Component'
	      );
	    }
	  }]);

	  return Home;
	}(_react2.default.Component);

	exports.default = Home;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(1);
	var router = express.Router();

	var MongoClient = __webpack_require__(20).MongoClient;
	var assert = __webpack_require__(21);
	var ObjectId = __webpack_require__(20).ObjectID;
	var url = 'mongodb://localhost:27017/test';

	var findRestaurants = function findRestaurants(db, callback) {
	  var cursor = db.collection('booklist').find();
	  var returnData = [];
	  cursor.each(function (err, doc) {
	    assert.equal(err, null);
	    if (doc != null) {
	      returnData.push(doc);
	    } else {
	      callback(JSON.stringify(returnData));
	    }
	  });
	};

	var insertDocument = function insertDocument(db, dataSet, callback) {
	  db.collection('booklist').insertOne(dataSet, function (err, result) {
	    assert.equal(err, null);
	    callback();
	  });
	};

	// define the home page route
	router.get('/', function (req, res) {

	  MongoClient.connect(url, function (err, db) {
	    assert.equal(null, err);
	    findRestaurants(db, function (dataset) {
	      res.send(dataset);
	    });
	  });
	});

	// define the about route
	router.post('/insert', function (req, res) {
	  // console.dir(req.body);
	  MongoClient.connect(url, function (err, db) {
	    assert.equal(null, err);
	    insertDocument(db, req.body, function () {
	      res.send('success');
	    });
	  });
	  // res.send('success');
	});

	// define the about route
	router.get('/about', function (req, res) {
	  res.send('About Api');
	});

	module.exports = router;

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("mongodb");

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("assert");

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _redux = __webpack_require__(6);

	var _reactRouterRedux = __webpack_require__(10);

	var _books = __webpack_require__(23);

	var _books2 = _interopRequireDefault(_books);

	var _activedBook = __webpack_require__(24);

	var _activedBook2 = _interopRequireDefault(_activedBook);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var reducers = {
	  books: _books2.default,
	  activedBook: _activedBook2.default
	};

	var rootReducer = (0, _redux.combineReducers)(_extends({}, reducers, {
	  routing: _reactRouterRedux.routerReducer
	}));

	exports.default = rootReducer;

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function () {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case 'BOOKLIST_SET_INITIAL':
	      return action.payload;
	  }

	  return state;
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function () {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case 'BOOK_SELECTED':
	      return action.payload;
	  }

	  return state;
	};

/***/ }
/******/ ]);