var Mixer = function () {
    var context = new webkitAudioContext();

    // constructor
	this.current = this.next = {
		gain: null,
		request: null,
		source: null
	};
    
	var request, source;
    this.current.gain	= context.createGain(), 
    this.next.gain		= context.createGain();
    this.current.gain.connect( context.destination );
    this.next	.gain.connect( context.destination );
	var audio = null; // anything...
	
	this.load = function ( track ) {
        this.current.source = context.createBufferSource();    
        // use $.get !!
        this.current.request = new XMLHttpRequest();
        
        this.current.request.open('GET', track.url, true); 
        this.current.request.responseType = 'arraybuffer';
        this.current.request.send();
		
		this.current.request.onload = this.play;
	};
	
	this.play = function () {
		if ( ! this.current ) return;
        context.decodeAudioData(this.current.request.response, function( response ) {
            this.current.source.buffer = response;
            //beatFind(source.buffer);
			
            this.current.source = source;            
            this.current.source.connect( gain_current );
            
            this.current.source.start(0);
        }, function () { console.error('The request failed.'); } );
    };
    
	this.pause = function () {};
	this.prepare = function ( track ) {
		// load track into the deck2
        this.next.source = context.createBufferSource();
        //buffer? cache?
		
		this.next.request = new XMLHttpRequest();
        
        this.next.request.open('GET', track.url, true); 
        this.next.request.responseType = 'arraybuffer';
        this.next.request.send();
		
        this.next.source.buffer = null;
        this.next.source.connect( gain_next );
    };
	
	this.mix = function () {
		// skips to the deck2
        //this.next.start(0);
        //gain_next.gain = 0;
        var int = setInterval(function(){
            this.current.gain.gain.value -= 0.002;
            this.next.gain.gain.value += 0.002;
			
			if ( this.current.gain.gain.value <= 0 ) {
    			this.current.source.stop(0);
				
				// interchange
				clearInterval( int );
			}	
		}, 10);
		
	};
    //change places;
};