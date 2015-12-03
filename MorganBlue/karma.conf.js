'use strict';

/**
 * Module dependencies.
 */
var applicationConfiguration = require('./config/config');

module.exports = function(config) {
	config.set({
		frameworks: ['jasmine'],

		files: applicationConfiguration.assets.lib.js.concat(applicationConfiguration.assets.js, applicationConfiguration.assets.tests),

		reporters: ['progress'],

		port: 9876,

		colors: true,

		logLevel: config.LOG_INFO,

		autoWatch: true,

		browsers: ['PhantomJS'],

		captureTimeout: 60000,

		singleRun: true
	});
};
