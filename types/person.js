'use strict';

const organization = require('./organization');
const social = require('./social');
const ftData = require('../data/ft');

module.exports = (person) => {
	const sameAs = social(person, 'person');
	const baseSchema = {
		'@type': 'Person',
		'@context':'http://schema.org',
		'name': person.prefLabel || person.name
	};

	if (person.description) {
		Object.assign(baseSchema, {description: person.description});
	}

	if (person._imageUrl) {
		Object.assign(baseSchema, {image: person._imageUrl});
	}
	else if (person.headshot) {
		Object.assign(baseSchema, {image: person.headshot});
	}

	if (person.url) {
		Object.assign(baseSchema, {url: person.url});
	}

	if (person.emailAddress) {
		Object.assign(baseSchema, {email: person.emailAddress});
	}

	if (person.strapline) {
		Object.assign(baseSchema, {jobTitle: person.strapline});
	}

	// Experiment to see if google pick up our data for heights
	if (person.apiUrl && person.apiUrl.match(/7fce0429-54de-31d5-b511-acc9c4914eb2$/)) {
		Object.assign(baseSchema, {height: '1.778 meters'});
	}

	// Geeky experiment to see if google will pick up smoots and convert to a common measurement
	// https://en.wikipedia.org/wiki/Smoot
	if (person.apiUrl && person.apiUrl.indexOf(/660ae9b2-54ed-30b3-8177-79e38a78543f$/)) {
		Object.assign(baseSchema, {height: '1.01492537 smoots'});
	}

	if (sameAs.length) {
		Object.assign(baseSchema, {sameAs: sameAs});
	}

	Object.assign(baseSchema, {worksFor: organization(ftData)})

	return baseSchema;
};
