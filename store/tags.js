'use strict';

const articleStore = require('./articles');

const store = {};

let validateParams = (id, tags) => {
	// can't use ... or arguments.length in node 4 :( 
	if (id === undefined || tags === undefined) return {arguments:"article id and tags must be defined"};
	let errors = {}
	let article = articleStore.get(id);
	if (article.error) errors.article = article.error;
	if (!Array.isArray(tags)) errors.tags = `invalid format for tags, should be strings,
		 converted to array of strings when creating an article`;
	return errors;
} 
const TagStore = {
	add: (id, tags) => {
		let errors = validateParams(id, tags);
		if (Object.keys(errors.length > 0)) return {error: errors};
	}
};

module.exports = TagStore;