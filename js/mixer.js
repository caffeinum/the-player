var Mixer = function () {
	
    function low_rendering(buffer, handler){
		var OfflineContext = new webkitOfflineAudioContext(1, buffer.length, buffer.sampleRate);
		var source = OfflineContext.createBufferSource();
		source.buffer = buffer;

		var lowpass = OfflineContext.createBiquadFilter();
		lowpass.type = "lowpass";
		source.connect(lowpass);
		lowpass.connect(OfflineContext.destination);
		OfflineContext.startRendering();
		source.start(0);
		OfflineContext.oncomplete = function(e) {
			var filteredBuffer = e.renderedBuffer;    
			handler(filteredBuffer);
		}; 
	}
    
    function beatFind(FilteredBuffer){
        var buffer = FilteredBuffer.getChannelData(0);
        var peaksArray = [];
        var length = buffer.length;
        var threshold = 1;
        do{
            for(var i = 0; i < length; i++) {
                if (buffer[i]*buffer[i] > threshold) {
                    peaksArray.push((i+5000)/44.1);
                    i += 10000;
                }
                i++;
            }
            threshold -= 0.05;
        } while(peaksArray.length < 140)
        var intervalCounts = [];
        peaksArray.forEach(function(peak, index) {
            for(var i = 0; i < 10; i++) {
                var interval = peaksArray[index + i] - peak;
                var foundInterval = intervalCounts.some(function(intervalCount) {
                    if (intervalCount.interval === interval)
                        return intervalCount.count++;
                });
                if (!foundInterval) {
                    intervalCounts.push({
                        interval: interval,
                        count: 1
                    });
                }
            }
        });
      
        intervalCounts.sort(function(a,b){return b.count - a.count});
        for(var i = 0; i < intervalCounts.length; i++)
            if(intervalCounts[i].interval >= 1500 && intervalCounts[i].interval <= 5000) break;
        var BPM = (4*60000/intervalCounts[i].interval);
        return BPM;
	}
    
    var context = new webkitAudioContext();
	
	var Deck = function () {
		this.gain = context.createGain();
		
        this.doppler = context.createPanner();
        this.gain.connect( this.doppler );
        this.doppler.connect( context.destination );
		this.source = context.createBufferSource();
		this.bpm = null;
	};
	Deck.prototype = {
		load: function ( track ) {
			this.track = track;
			
			if ( ! this.track ) return console.log( 'No track given' );
			if ( ! this.track.cached ) {
				cacher.cache( this.track );
				return console.log( 'Track is not cached, caching' );
			}
			
			var source = this.source;
			context.decodeAudioData(cacher.getTrackBuffer( this.track ), function(audioData) {
				source.buffer = audioData;
			});
			this.source.connect( this.gain );
			this.getBPM();


		},
		cache: function () {
			var current = this;

			current.source.buffer = cacher.getTrackBuffer( this.track );

			if ( ! current.source.buffer )
				return console.log( 'Cant cache dont loaded' );

			current.request = new XMLHttpRequest();

			current.request.open('GET', this.track.url, true); 
			current.request.responseType = 'arraybuffer';
			current.request.onload = function () {
				context.decodeAudioData(current.request.response, function( response ) {
					current.source.buffer = response;
				}, function () { console.error('The request failed.'); } );
			};
			current.request.send();
		},
		getBPM: function () {
			//this.bpm = 110;
			var current = this;
			if ( this.bpm ) return this.bpm;
			else console.log( 'BPM calculation in progress' );
			
			low_rendering(current.source.buffer, function (filteredBuffer) {
				current.bpm = beatFind(filteredBuffer);
				console.log( current.track.url + " bpm is " + current.bpm );
			});
		}
	};

	var current	= new Deck();
	var next	= new Deck();
    
	this.playing = false;
	
	this.load = function ( track ) {
		if ( ! track.cached ) return console.log( 'Need track to load!' );
		current = new Deck();
		current.load( track );
		//current.cache();
		
		return;
	};
	
	this.prepare = function ( track ) {
		if ( ! track.cached ) return console.log( 'Track not cached!' );
		// load track into the deck2
		next = new Deck();
		next.load( track );
		
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
	this.getInfo = function () {
		console.log(current, next);
		console.log(current.track, next.track);
	};
	this.mix = function () {
		// skips to the deck2
		if ( ! next ) return console.log( 'No next track prepared!' );
		if ( ! next.bpm ) return;
		next.source.start(0);
		next.gain.gain.value = 0;
		/*
		
        low_rendering(current.source.buffer, function (filteredBuffer) {
            var BPM_current = beatFind(filteredBuffer);
            low_rendering(next.source.buffer, function (filteredBuffer) {
                var BPM_next = beatFind(filteredBuffer);*/
		var v = 10;
		current.doppler.setVelocity(-v,0,0);
		
		next.source.playbackRate.value = current.getBPM() / next.getBPM();
        next.doppler.setVelocity(v,0,0);
        v_n = v/500;
		var delta = 1 - next.source.playbackRate.value;//next.bpm - current.bpm;
		var delta_n = delta/500;
		
		var crossfade = setInterval( function () {
			current	.gain.gain.value -= 0.002;
			next	.gain.gain.value += 0.002;
			
		//	current	.source.playbackRate.value = next.bpm + delta_n;
			
			if ( current.gain.gain.value <= 0 ) {
				current.source.stop(0);
				
				current = next;
				next	= new Deck();
			
				console.log( current.source.playbackRate.value, delta_n );
				var equalize = setInterval( function () {
                    v -= v_n;
                    current.doppler.setVelocity(-v,0,0);
                    next.doppler.setVelocity(v,0,0);
					current.source.playbackRate.value += delta_n;
					
					if ( Math.abs( 1 - current.source.playbackRate.value ) < Math.abs(delta_n) ) 
					{
						current.source.playbackRate.value = 1;
						clearInterval( equalize );
					}
				}, 20);
				// interchange
				clearInterval( crossfade );
			}
		}, 10);
/*        })*/
		
	};
};