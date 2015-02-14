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
        var context = new webkitAudioContext();

        var source = context.createBufferSource();
        var request = new XMLHttpRequest();
        request.open('GET', track.url, true); 
        request.responseType = 'arraybuffer';
        request.onload = function() {
            context.decodeAudioData(request.response, function(response) {
                source_s.buffer = response;
                beatFind(source_s.buffer);
            }, function () { console.error('The request failed.'); } );
        }
        request.send();
    };
	
	this.mix = function () {
		// skips to the deck2
        
	};
};