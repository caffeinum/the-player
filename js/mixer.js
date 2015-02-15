var Mixer = function () {
    var context = new webkitAudioContext();
	
	var Deck = function () {
		this.gain = context.createGain();
		this.gain.connect( context.destination );

		this.source = context.createBufferSource();
		this.bpm = null;
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
		},
		getBPM: function () {
			this.bpm = 110;
			
			
			return this.bpm;
		}
	};

	var current	= new Deck();
	var next	= new Deck();
	
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
        console.log( source );
        OfflineContext.oncomplete = function(e) {
            var filteredBuffer = e.renderedBuffer;    
            handler(filteredBuffer);
        }; 
  }
    
    function beatFind(FilteredBuffer){
        buffer = FilteredBuffer.getChannelData(0);
        var peaksArray = [];
        var length = buffer.length;
        threshold = 1;
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
            console.log(peaksArray);
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
        console.log(intervalCounts);
        for(var i = 0; i < intervalCounts.length; i++)
            if(intervalCounts[i].interval >= 1500 && intervalCounts[i].interval <= 5000) break;
        var BPM = (4*60000/intervalCounts[i].interval);
        return BPM;
	}
    
    
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
        low_rendering(current.source.buffer, function (filteredBuffer) {
            var BPM_current = beatFind(filteredBuffer);
            low_rendering(next.source.buffer, function (filteredBuffer) {
                var BPM_next = beatFind(filteredBuffer);
                next.source.playbackRate.value = BPM_current/BPM_next;
                var delta = BPM_next - BPM_current;
                var delta_n = delta/500;
                var int = setInterval(function(){
                    current.gain.gain.value -= 0.002;
                    next.gain.gain.value += 0.002;
                    current.source.playbackRate.value = BPM_current + delta_n;
                    next.source.playbackRate.value = BPM_current + delta_n;
                    if ( current.gain.gain.value <= 0 ) 
                        current.source.stop(0);
                    current = next;
                    next = null;
                    // interchange
                    clearInterval( int );
                }, 10);})
        })
		
	};
};