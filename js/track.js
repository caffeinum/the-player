var Track = function (url, metadata) {
	this.url = url;
	url = this.url;
	this.metadata = metadata;
	
	if ( ! url )
		rec.getAudio( this, function (data) {
			url = data.url;
		});
	this.cache = function (cacher) {
		cacher.cache( this );
		// local storage blah-blah
	}
};

Track.prototype = {
	metadata: {
		artist : {
			name: ''
		},
		name : ''
	},
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
