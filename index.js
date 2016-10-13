'use strict';

const http = require('http');
const url  = require('url');
const Article = require('./src/Article');
const tagStore = require('./store/tags');
const articleStore = require('./store/articles');

let createArticle = (req, res) => {
	// this is more complicated without express or other 
	// came from http://stackoverflow.com/questions/4295782/how-do-you-extract-post-data-in-node-js
	let data = ''
	req.on('data', (chunk) => {
		data += chunk.toString()
	})

	return req.on('end', () => {
		data = JSON.parse(data);
		let article = new Article(data).create();
		article = JSON.stringify(article);
		res.writeHead(200, {
			'Content-Type': 'application/json'	
		})
		res.end(article);
	});
}

let errorRes = (req, res) => {
	res.writeHead(404, {
		'Content-Type': 'text/html'
	})
	res.end('Invalid Route');
}
let articles = (req, res, path) => {
	if (req.method === 'POST') {
		return createArticle(req, res);
	}
	
	if (!path[1] || req.method !== 'GET') return errorRes(req, res);
	let article = articleStore.get(path[1]);
	article = JSON.stringify(article);
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});
	return res.end(article);
}

let tags = (req, res, path) => {
	if (req.method !== 'GET' || path.length < 2) return errorRes(req, res);
	
	let relatedTags = tagStore.getRelatedTags(path[1], path[2]);

	let tagsObj = {
		tag: path[1],
		count: relatedTags.articles.length,
		articles: relatedTags.articles,
		related_tags: relatedTags.tags
	}
	res.writeHead(200, {
		'Content-Type': 'appication/json'
	});
	res.end(JSON.stringify(tagsObj));
}

let index = (req, res) => {

}


http.createServer((req, res) => {
	let path = req.url.split('/').filter(p => {
		return p.length > 0;
	});
	
	switch(path[0]) {
		case 'articles':
			articles(req, res, path);
			break;
		case 'tag':
			tags(req, res, path);
			break;
		case '':
			index(req, res);
			break;
		default:
			errorRes(req, res);
	}
}).listen(8080, '0.0.0.0');

