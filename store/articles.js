'use strict';

/*
	Creating a basic store to put articles into an object.
	The idea being that this could easily be replaced with a 
	database, orm, etc without changing the model
*/

const store = {};

const ArticleStore = {
	create: (article) => {
		// there is a danger that this could be overwritten but is good for demo
		let id = Object.keys(store).length;
		store[id] = article;
		article.id = id;
		return article;
	},
	get: (id) => {
		return store[id] || {error: "could not get article of id " + id};
	}
};

module.exports = ArticleStore;

