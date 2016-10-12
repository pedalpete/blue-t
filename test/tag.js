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
});