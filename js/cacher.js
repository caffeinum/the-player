var Cacher = function () {
	var root = '';
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
		
		request.open('GET', root + '/server?url=' + encodeURI(track.url), true); 
		request.responseType = 'arraybuffer';
		request.onload = function () {
			console.log( request.response );
			
			_STORAGE.setItem(
				JSON.stringify(track.metadata),
				b64ab.encode( request.response )
			);
			track.cached = true;
			track.cachedBuffer = request.response; //base64
			cachedTracks.push( track );
			handler(track);
		};
		request.send();
	};
	this.getTrackBuffer = function ( track ) {
		var str;
		
		if ( str = _STORAGE.getItem( JSON.stringify(track.metadata) ) ) {
			//console.log(typeof(buffer));
			return b64ab.decode(str);
		}
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
	var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
	
	return base64String;

	
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}	

function _base64ToArrayBuffer(base64) {
	console.log(base64);
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}
var b64ab = {};
b64ab.encode = function(arraybuffer) {
	var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var bytes = new Uint8Array(arraybuffer),
    i, len = bytes.length, base64 = "";

    for (i = 0; i < len; i+=3) {
      base64 += chars[bytes[i] >> 2];
      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
      base64 += chars[bytes[i + 2] & 63];
    }

    if ((len % 3) === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }

    return base64;
  };

 b64ab.decode = function(base64) {
	var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var bufferLength = base64.length * 0.75,
    len = base64.length, i, p = 0,
    encoded1, encoded2, encoded3, encoded4;

    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }

    var arraybuffer = new ArrayBuffer(bufferLength),
    bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i+=4) {
      encoded1 = chars.indexOf(base64[i]);
      encoded2 = chars.indexOf(base64[i+1]);
      encoded3 = chars.indexOf(base64[i+2]);
      encoded4 = chars.indexOf(base64[i+3]);

      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return arraybuffer;
  };
