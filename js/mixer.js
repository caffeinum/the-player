var Mixer = function () {
    var context = new webkitAudioContext();

    // constructor
	this.current = null;
	this.next = null;
    
	var request, source;
	var audio = null; // anything...
	
	this.load = function ( track ) {
        source = context.createBufferSource();    
        // use $.get !!
        request = new XMLHttpRequest();
        
        request.open('GET', track.url, true); 
        request.responseType = 'arraybuffer';
		request.onload = this.play;
        request.send();
	};
	
	this.play = function () {
		console.log( request );
        context.decodeAudioData(request.response, function(response) {
            source.buffer = response;
            //beatFind(source.buffer);
			console.log( source );
            
            source.start(0);
			source.connect( context.destination );
        }, function () { console.error('The request failed.'); } );
    };
    
	this.pause = function () {};
	this.prepare = function ( track ) {
		// load track into the deck2

    };
	
	this.mix = function () {
		// skips to the deck2
        
	};
};