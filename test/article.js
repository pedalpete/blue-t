'use strict';

const expect = require('chai').expect;

const Article = require('../src/Article');
const articleStore = require('../store/articles');

describe('Article', () => {
	it('should error if there is no title or body', () =>  {
		let article = new Article();
		expect(article).to.have.all.keys('error');
	});

	it('should error if there is a title but no body', () =>  {
		let article = new Article({title: "new article"});
		expect(article).to.have.all.keys('error');
	});

	it('should return an id when an article is saved', () =>  {
		let article = new Article({
				title: "Save Article",
				body: "I have saved an article"
			}).create();
		expect(article.id).to.be.equal(0);
	});

	it('should add a 2nd article with tags', () =>  {
		let article = new Article({
			title: "2nd article",
			body: "I'm another article",
			tags: "news, math"
		}).create();
		expect(article.id).to.be.equal(1);
	});

	it('should prevent an article from being added twice', function() {
		let article = new Article({
			title: "only add once",
			body: "don't add twice",
			tags: "tag, related"
		}).create();
		expect(article.id).to.be.equal(2);
		let article2 = article.create();
		expect(article.id).to.be.equal(2);
	});

	it('should error if no id provided to get', () =>  {
		let article = articleStore.get();
		expect(article).to.have.keys('error');
	});

	it('should error if an invalid or non-existent id provided', () =>  {
		let article = articleStore.get('non-existent');
		expect(article).to.have.keys('error');
	});

	it('should return the article by id', () =>  {
		let article = articleStore.get(1);
		expect(article).to.have.all.keys('body', 'title', 'date', 'id', 'tags');
	});

	it('should add only the correct tags', () => {
		let article = new Article({
			title: 'check tags',
			body: 'checking that the correct tags are returned',
			tags: "Tag, tag, taG"
		}).create();
		expect(article.tags).to.contain('tag');
		expect(article.tags).not.to.contain('Tag');
		expect(article.tags).not.to.contain('taG');
	});
});