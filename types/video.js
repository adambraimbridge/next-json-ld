const image = require('./image');
const organization = require('./organization');
const ftData = require('../data/ft');

// https://en.wikipedia.org/wiki/ISO_8601#Durations
const duration = (ms) => {
	const date = new Date(ms);
	return `PT${date.getMinutes()}M${date.getSeconds()}S`;
};

module.exports = (content, rendition = {}) => ({
	'@context': 'http://schema.org',
	'@type': 'VideoObject',
	// Thing
	'url': content.url,
	'name': content.title,
	'description': content.standfirst,
	// CreativeWork
	'datePublished': content.publishedDate,
	'author': organization(ftData),
	'publisher': organization(ftData),
	'thumbnailUrl': content.mainImage.url,
	// MediaObject
	'width': rendition.frameWidth,
	'height': rendition.frameHeight,
	'playerType': 'HTML5',
	'duration': duration(rendition.videoDuration),
	'uploadDate': content.publishedDate,
	// VideoObject
	'thumbnail': image(content.mainImage)
});