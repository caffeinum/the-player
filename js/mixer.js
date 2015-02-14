var Mixer = function () {
    var context = new webkitAudioContext();

    // constructor
	this.current = null;
	this.next = null;
    
	var request, source;
    var gain_current  = context.createGain(), 
        gain_next = context.createGain();
    gain_current.connect( context.destination );
    gain_next.connect( context.destination );
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
            this.current = source;
            
            this.current.connect( gain_current );
            
            this.current.start(0);
        }, function () { console.error('The request failed.'); } );
    };
    
	this.pause = function () {};
	this.prepare = function ( track ) {
		// load track into the deck2
        this.next = context.createBufferSource();
        //buffer? cache?
        this.next.buffer = ;
        this.next.connect( gain_next );
    };
	
	this.mix = function () {
		// skips to the deck2
        this.next.start(0);
        gain_next.gain = 0;
        setInterval(function(){
            gain_current.gain -= 0.002;
            gain_next.gain += 0.002;
	}, 10)
    this.current.stop(0);
    //change places;
};