var Mixer = function () {
    var context = new webkitAudioContext();
	
	var Deck = function () {
		this.gain = context.createGain();
		this.gain.connect( context.destination );

		this.source = context.createBufferSource();
	};
	Deck.prototype = {
		load: function ( track ) {
			this.track = track;
		},
		cache: function () {
			var current = this;

			if ( ! this.track.url ) return console.log( 'Cant cache dont loaded' );

			current.request = new XMLHttpRequest();

			current.request.open('GET', this.track.url, true); 
			current.request.responseType = 'arraybuffer';
			current.request.onload = function () {
				context.decodeAudioData(current.request.response, function( response ) {
					current.source.buffer = response;
					current.source.connect( current.gain );
				}, function () { console.error('The request failed.'); } );
			};
			current.request.send();
		}
	};

	var current	= new Deck();
	var next	= new Deck();
	
	this.playing = false;
	
	this.load = function ( track ) {
		current.load( track );
		current.cache();
		
		return;
	};
	
	this.prepare = function ( track ) {
		// load track into the deck2
		next = new Deck();
		next.load( track );
		next.cache();
		
		return;		
    };
	
	this.play = function () {
		this.playing = true;
        current.source.start(0);
    };
	this.pause = function () {
		this.playing = false;
        current.source.stop(0);
	};
	
	this.toggle = function () {
		if ( this.playing )
			this.pause();
		else
			this.play();
	};
	
	this.mix = function () {
		// skips to the deck2

		next.source.start(0);
		next.gain.gain.value = 0;
		
		var int = setInterval(function(){
            current.gain.gain.value -= 0.002;
            next.gain.gain.value += 0.002;
			
			if ( current.gain.gain.value <= 0 ) {
    			current.source.stop(0);
				
				current = next;
				next = null;
				// interchange
				clearInterval( int );
			}	
		}, 10);
		
	};
};