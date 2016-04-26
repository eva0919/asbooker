var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

var findRestaurants = function(db, callback) {
  var cursor =db.collection('booklist').find( );
  var returnData = [];
  cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         returnData.push( doc );
      } else {
         callback( JSON.stringify(returnData) );
      }
  });
};


var insertDocument = function(db, dataSet, callback){
	db.collection('booklist').insertOne(dataSet, function(err, result){
		assert.equal(err, null);
    callback();
	});
};


// define the home page route
router.get('/', function(req, res) {
  
  MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  findRestaurants(db, function(dataset) {
	      res.send(dataset);
	  });
	});
  
});

// define the about route
router.post('/insert', function(req, res) {
	// console.dir(req.body);
  MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  insertDocument(db, req.body,function() {
	      res.send('success');
	  });
	});
	// res.send('success');
});

// define the about route
router.get('/about', function(req, res) {
  res.send('About Api');
});

module.exports = router;