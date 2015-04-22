'use strict';

/**
 * Module dependencies.
 */
var main = require('../../app/controllers/main.server.controller');

module.exports = function(app) {

	app.route('/inflo/api/autoComplete')
		.get(main.autoComplete);	

	app.route('/inflo/api/search')
		.get(main.searchByCountyState);		

};
