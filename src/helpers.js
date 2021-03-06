'use strict';

module.exports.removeDupsAndLowerCaseTags = (tags) => {
	if (tags === undefined || tags.length === 0 ) return [];
	let tagsObj = {};
	tags.forEach(function(tag) {
		tagsObj[tag.toLowerCase()] = null;
	});
	return Object.keys(tagsObj);
}