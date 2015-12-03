var async = require('async'),
	request = require('request'),
	_ = require('lodash');

var categoryIDs = {
	1: 'Fiets',
	2: 'Body'

};

var data = [
  "'Poetsen,1,1,'Poetsproducten voor de fiets',10,10,0,10,0",
  "'Pro Kit,1,1,'Kits van profploegen',10,10,0,10,0",
  "'Smeren',1,1,'Smeermiddelen voor de fiets',10,10,0,10,0",
  "'Montagevetten',1,1,'Fietsvet',10,10,0,10,0",
  "'Bescherming',1,1,'Fietsbeschermingsproducten',10,10,0,10,0",
  "'Accessoires',1,1,'Accesoires om de fiets te helpen kuisen',10,10,0,10,0",
  "'Massage',2,1,'Massageolieën',10,10,0,10,0",
  "'Compressie',2,1,'Compressiekousen',10,10,0,10,0",
  "'Travel kit',2,1,'Reiskit',10,10,0,10,0"
	];

exports.up = function(next) {

	var options = {
		method: 'get',
		json: true,
		url: 'http://localhost:3000/categories',
    auth: {
      user: 'admin',
      pass: 'password'
    }
	};

	request(options, function (err, response) {
		if (response.statusCode == 200) {
			saveProducts(response.body, next);
		} else {
			next('error getting categories');
		}
	});
};

exports.down = function(next){
  next();
};

function saveProducts(categories, next) {
	async.each(data, function(d, callback) {

		var tokens = d.split(',');
		var categoryName = categoryIDs[tokens[2]];
		var categoryMongoID = _.result(_.find(categories, { 'name': categoryName }), '_id');
		var product = {
			'name' : tokens[0].slice(1, tokens[0].length - 1),
			'category' : categoryMongoID,
			'quantityPerUnit' : tokens[2],
			'unitPrice' : tokens[4],
			'unitsInStock' : tokens[5],
			'unitsOnOrder' : tokens[6],
			'discontinued' : tokens[8].trim()
		};

		var options = {
  			method: 'POST',
  			body: product,
  			json: true,
  			url: 'http://localhost:3000/products',
  			auth: {
		      user: 'admin',
		      pass: 'password'
		    }
		};

		request(options, function (err, response) {
			if (response.statusCode == 201) {
				callback();
			} else {
				callback('error');
			}
		});
	}, function(err) {
		if (err) {
			next(err);
		} else {
			next();
		}
	});
}
