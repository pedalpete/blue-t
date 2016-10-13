'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;


const app = 'http://localhost:8080';
chai.use(chaiHttp);

describe('articles', () => {
	before((done) =>  {
		chai.request(app)
			.post('/articles')
			.send({title: 'mock', body: "first article", tags: "news, math, sports"})
			.end( (err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.id).to.exist;
			});
		chai.request(app)
			.post('/articles')
			.send({title: 'mock', body: "2md article", tags: "sports, running"})
			.end( (err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.id).to.exist;
			});
		chai.request(app)
			.post('/articles')
			.send({title: 'mock', body: "2md article", tags: "comedy, fatal"})
			.end( (err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.id).to.exist;
				done();
			});
	})
	it('should error if no title', done => {
		chai.request(app)
			.post('/articles')
			.send({body: "no title"})
			.end( (err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.error.title).to.exist;
				expect(res.body.error.body).not.to.exist;
				done();
			});
	});

	it('should create a new article', done => {
		chai.request(app)
			.post('/articles')
			.send({title: 'api add', body: "with title"})
			.end( (err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.id).to.exist;
				done();
			});
	});

	it('should get an article by id', done => {
		chai.request(app)
			.get('/articles/0')
			.end( (err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.date).to.exist;
				done();
			});
	});

	it('should error if invaid artice id', done => {
		chai.request(app)
			.get('/articles/1000')
			.end( (err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.error).to.exist;
				done();
			});
	});
});

describe('tags', done => {
	it('should return empty if tag not found', done => {
		chai.request(app)
			.get('/tag/none')
			.end( (err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.tag).to.be.equal('none');
				expect(res.body.count).to.be.equal(0);
				expect(res.body.articles.length).to.be.equal(0);
				expect(res.body.related_tags.length).to.be.equal(0);
				done();
			});
	});

	it('should return tags and related', done => {
		chai.request(app)
			.get('/tag/sports')
			.end( (err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.tag).to.be.equal('sports');
				expect(res.body.count).to.be.at.least(2);
				expect(res.body.articles.length).to.be.equal(res.body.count);
				expect(res.body.related_tags.length).to.be.equal(4);
				done();
			});
	});

	it('should return tags filtered by date',  done => {
		chai.request(app)
			.get('/tag/sports/2000111')
			.end( (err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.tag).to.be.equal('sports');
				expect(res.body.count).to.be.equal(0);
				expect(res.body.articles.length).to.be.equal(res.body.count);
				expect(res.body.related_tags.length).to.be.equal(0);
				done();
			});
	});

	it('should return tags and related', done => {
		let date = new Date().toISOString().slice(0,new Date().toISOString().indexOf("T"));
		chai.request(app)
			.get('/tag/sports/' + date)
			.end( (err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.tag).to.be.equal('sports');
				expect(res.body.count).to.be.at.least(2);
				expect(res.body.articles.length).to.be.equal(res.body.count);
				expect(res.body.related_tags.length).to.be.equal(4);
				done();
			});
	});
});