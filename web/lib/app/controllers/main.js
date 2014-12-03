exports.index = function *(next) {
	this.body = this.jade('index');
}

exports.subscribe = function *(next) {
	var _this = this;

	if (/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(this.request.body.email)) {
		
		_this.body = {success: true, error: null}
		var MongoClient = require('mongodb').MongoClient,
			url 		= 'mongodb://localhost:27017/soch';

		MongoClient.connect(url, function(err, db) {
			var collection = db.collection('subscribers');
			collection.insert({
				email 		: _this.request.body.email,
				timestamp 	: Date.now()
			}, function(err, result) {
				console.log("SUCCESS");
			});

			db.close();
		});
	}
	else { 
		this.body = {success: false, error: "Please enter a valid email!"}
	}
}