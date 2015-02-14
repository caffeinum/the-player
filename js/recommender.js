var Recommender = function () {
	// constructor
	var TRACKS = this.tracks = [];
	
    var getAlbum = function (track, artist){
        var url = "http://ws.audioscrobbler.com/2.0"
        + "/?method=track.getInfo&api_key=ed03cd1154b880606783fb7d9dd35c75&artist="
        + artist + "&track="
        + track + "&format=json";
        jQuery.getJSON( url, function( data ) {
            //console.log( data );
            return data.track.album.title;
        });
    };
	this.like = function () {};
    
	this.pushNextTrack = function ( currentTrack ) {
		// get tracks
        var artist = currentTrack.metadata.artist.name;
        var track = currentTrack.metadata.name;
        var url =  "http://ws.audioscrobbler.com" + 
            "/2.0/?method=track.getsimilar&artist=" + artist +
            "&track=" + track +
            "&api_key=ed03cd1154b880606783fb7d9dd35c75&format=json";
        
        jQuery.getJSON( url, function( data ) {
            //console.log( data );
            var track = new Track;
            for(i=0;i++;i<5){
                track.metadata.artist.name = data.similartracks.track[i].artist.name;
                track.metadata.name = data.similartracks.track[i].name;
                track.metadata.album.name = getAlbum(track.metadata.name, metadata.artist.name);
                track.metadata.album.images = data.similartracks.track[i].images[3]["#text"];
                track.metadata.match = data.similartracks.track[i].match;
                track.liked.value = 0;
                TRACKS.push(track);
            };
        });
	};
    
    
};