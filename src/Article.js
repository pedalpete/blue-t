'use strict';

let ArticleStore = require('../store/articles');

let Articles = {};

/* 	Only validating the title and body and that the tags are in correct format
	Date is made in the constructor as is the id	
*/
let validateArticle = (a) => {
	let errors = {};
	if (typeof a.title !== 'string') errors.title ="Title must be a string";
	if (typeof a.body !== 'string') errors.body = "Body must be a string";
	if (a.tags && Array.isArray(a.tags)) errors.tags = "tags must be an array";
	return errors;
}

class Article {
	constructor(article) {
		article = article || {}; // no default params in Node v4
		let errors = validateArticle(article);
		if (Object.keys(errors).length > 0) return {error: errors};
		this.title = article.title;
		// Got date format from StackOverflow http://stackoverflow.com/questions/3066586/get-string-in-yyyymmdd-format-from-js-date-object
		this.date = new Date().toISOString().slice(0,new Date().toISOString().indexOf("T"));
		this.body = article.body;
		this.tags = article.tags ? article.tags.split(',') : []; // Did not assume tags are required
	}
	create () {
		return ArticleStore.create(this);
	}
}

module.exports = Article