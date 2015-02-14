var Track = function (url, metadata) {
	this.url = url;
	this.metadata = metadata;
	
	this.cache = function () {
		// local storage blah-blah
	}
};

Track.prototype = {
	metadata: "artist, blvcascad",
	cached: false,
	setURL: function (url) {
		this.url = url;
	},
	bpm: 110,
	beats: [
		0.113, .226, .339
	],
	raw: null
};
