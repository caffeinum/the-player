var Mixer = function () {
	// constructor
	this.current = null;
	this.next = null;
	
	var audio = null; // anything...
	
	this.play = function () {};
	this.pause = function () {};
	this.load = function ( track ) {
		this.current = track;
	};
	
	this.prepare = function ( track ) {
		// load track into the deck2
	};
	
	this.mix = function () {
		// skips to the deck2
	};
};