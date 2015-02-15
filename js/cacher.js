var Cacher = function () {
	var cachedTracks = this.cachedTracks = [];
	this.cache = function ( track, handler ) {
		/*var scr = document.createElement('img');
		//document.appendChild( scr );
		scr.src = track.url;
		scr.onload = alert.bind(window);
		scr.preload = 'auto';
		return scr;
		
		var req = new Audio();
			req.src = track.url;
			req.autoplay = true;
			req.onload = function ( event ) {
				console.log ( event );
				_STORAGE.setItem(
				JSON.stringify(track.metadata),
					req
				);
				handler(req);
			};
		*///return req;
		var request = new XMLHttpRequest();
		
		request.open('GET', track.url, true); 
		request.responseType = 'arraybuffer';
		request.onload = function () {
			_STORAGE.setItem(
				JSON.stringify(track.metadata),
				request.response
			);
			track.cached = true;
			cachedTracks.push( track );
			handler(track);
		};
		request.send();
	};
	this.getTrackBuffer = function ( track ) {
		var buffer;
		
		if ( buffer = _STORAGE.getItem( JSON.stringify(track.metadata) ) )
			return buffer;
		else
			console.log( 'Sorry, this track is not cached' );
		return;
	};
	var _STORAGE = this.storage = (typeof(sessionStorage) == undefined) ?
		(typeof(localStorage) == undefined) ? {
			getItem: function(key){
				return this.store[key];
			},
			setItem: function(key, value){
				this.store[key] = value;
			},
			removeItem: function(key){
				delete this.store[key];
			},
			clear: function(){
				for (var key in this.store)
				{
					if (this.store.hasOwnProperty(key)) delete this.store[key];
				}
			},
			store:{}
    } : localStorage : sessionStorage;
};