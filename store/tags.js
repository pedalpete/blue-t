'use strict';

const articleStore = require('./articles');
const helpers = require('../src/helpers');
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

const addTag = (id, tag) => {
	tag = tag.toLowerCase();
	if (store[tag] && store[tag].indexOf(id) > -1) return {error: "tag already exists for this article"};
	if (!store[tag]) store[tag] = [];
	store[tag].push(id);
	return tag;
}
const TagStore = {
	add: (id, tags) => {
		let errors = validateParams(id, tags);
		if (Object.keys(errors).length > 0) return {error: errors};
		tags = helpers.removeDupsAndLowerCaseTags(tags); 
		return tags.map(function(tag) { return addTag(id, tag)});
	},
	getRelatedTags: (tag, date) => {
		let articleIds = store[tag.toLowerCase()];
		if (!articleIds) return {articles: [], tags: []};
		let articles = articleIds.map(articleStore.get);
	
		if (date) articles = articles.filter(a => {
			return a.date === date;
		});
		let articleTags = [].concat.apply([], articles.map(function(a) {
			return a.tags
		}));
		return {
			articles: articles.map(a => { return a.id}),
			tags: helpers.removeDupsAndLowerCaseTags(articleTags)
		};
	}
};

module.exports = TagStore;