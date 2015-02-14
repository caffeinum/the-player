var Mixer = function () {
    var context = new webkitAudioContext();

    // constructor
	this.current = null;
	this.next = null;
    
	var audio = null; // anything...
	
	this.play = function () {
        context.decodeAudioData(request.response, function(response) {
            source.buffer = response;
            //beatFind(source.buffer);
            
            source.start();
        }, function () { console.error('The request failed.'); } );
    };
    
	this.pause = function () {};
	this.load = function ( track ) {
        var source = context.createBufferSource();
        
        // use $.get !!
        var request = new XMLHttpRequest();
        
        request.open('GET', track.url, true); 
        request.responseType = 'arraybuffer';
        request.send();
	};
	
	this.prepare = function ( track ) {
		// load track into the deck2

    };
	
	this.mix = function () {
		// skips to the deck2
        
	};
};