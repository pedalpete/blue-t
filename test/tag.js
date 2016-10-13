'use strict';

const expect = require('chai').expect;

const tagStore = require('../store/tags');

describe('tags', () => {
	it('should not add a tag without a valid article id', () => {
		let tag = tagStore.add('invalid', ["tag"]);
		expect(tag).to.have.keys('error');
		expect(tag.error.article).to.contain('could not get article of id')
	});

	it('should not add a tag if the tags are not in an array', () => {
		let tag = tagStore.add(0,"this is not an array");
		expect(tag).to.have.keys('error');
		expect(tag.error.tags).to.contain('invalid format for tags');
	});

	it('should error if id or tags not passed', () => {
		let tag = tagStore.add('invalid');
		expect(tag).to.have.keys('error');
		expect(tag.error.arguments).to.contain('article id and tags must be defined')
	});

	it('should add tags to object with id', () => {
		let tag = tagStore.add(0, ["Tag", "tag"]);
		expect(tag).to.contain('tag');
		expect(tag).not.to.contain('Tag');
	});

	it('should return an empty array if no related tags are found', () => {
		let relatedTags = tagStore.getRelatedTags('empty');
		expect(relatedTags.tags).to.be.empty;
	})

	it('should get related tags', () => {
		let relatedTags = tagStore.getRelatedTags('Tag');
		expect(relatedTags.tags).to.contain('tag');
		expect(relatedTags.tags).to.contain('related');
		expect(relatedTags.tags).not.to.contain('news');
	});

	it('should return no tags if nothing on that date', () => {
		let relatedTags = tagStore.getRelatedTags('Tag', "2015-05-05");
		expect(relatedTags.articles).to.be.empty
	});

	it('should return tags that match the date', () => {
		let date = new Date().toISOString().slice(0,new Date().toISOString().indexOf("T"));
		let relatedTags = tagStore.getRelatedTags('Tag', date);
		expect(relatedTags.articles).to.contain(2);
	});
});