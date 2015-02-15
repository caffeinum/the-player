var Cacher = function () {
	var root = 'http://the-player-caffeinum.c9.io';
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
		
		request.open('GET', root + '/base64?url=' + encodeURI(track.url), true); 
		request.responseType = 'arraybuffer';
		request.onload = function () {
			_STORAGE.setItem(
				JSON.stringify(track.metadata),
				_arrayBufferToBase64(request.response)
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
			return _base64ToArrayBuffer(buffer);
		else
			console.log( 'Sorry, this track is not cached' );
		return;
	};
	var _STORAGE = this.storage = 
		
		//(typeof(sessionStorage) == undefined) ?
		//(typeof(localStorage) == undefined) ? 
		
		{
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
    }
	
	//: localStorage : sessionStorage;
};


// thanks to http://stackoverflow.com/users/1925574/luke-madhanga 
function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}	

function _base64ToArrayBuffer(base64) {
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}
