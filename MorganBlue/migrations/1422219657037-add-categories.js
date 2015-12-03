/**
 * Created by Glenn on 3-12-2015.
 */
var async =  require('async'),
  request = require('request');

var data = [
  {'name': 'Fiets', 'description' : 'Toebehoren voor de fiets te onderhouden'},
  {'name': 'Body','description' : 'Zalven en accesoires'}
];

exports.up = function(next) {
  async.each(data,function(c,callback){
    var options = {
      method: 'post',
      body : c,
      json: true,
      url: 'http://localhost:3000/categories',
      auth: {
        user: 'admin',
        pass: 'password'
      }
    };

    request(options, function (err, response) {
      if (response.statusCode == 201) {
        callback();
      } else {
        callback(err);
      }
    });
  }, function(err) {
    if (err) {
      next(err);
    } else {
      next();
    }
  });
};

exports.down = function(next) {
  next();
};
