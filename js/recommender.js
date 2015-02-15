var Recommender = function (auth) {
	// constructor
	var TRACKS = this.tracks = [];
	
    var getAlbum = function (track){
        var url = "http://ws.audioscrobbler.com/2.0"
        + "/?method=track.getInfo&api_key=ed03cd1154b880606783fb7d9dd35c75&artist="
        + track.metadata.artist.name + "&track="
        + track.metadata.name + "&format=json";
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
            for(var i = 0; i++; i < 5) {
				
            var track = new Track();
                
				track.metadata.artist.name	= data.similartracks.track[i].artist.name;
                track.metadata.name			= data.similartracks.track[i].name;
                track.metadata.album.name 	= getAlbum( track );
                track.metadata.album.images = data.similartracks.track[i].images[3]["#text"];
                
				track.metadata.match 		= data.similartracks.track[i].match;
                //track.liked = true;
                track.rating = /* Number(track.liked) */(track.metadata.match);
				
                TRACKS.push(track);
            };
        });
	};
    
    /*this.onLikeClicked = function(currentTrack){
        currentTrack.liked = currentTrack.liked;
    };*/
    
    this.sortByRating = function(){
        TRACKS.sort(function(track1, track2){
            return track2.rating - track1.rating;
        });
    };
    
    this.getAudio = function(track, handle){
        //query to VK API
		auth.request(
			'audio.search',
			{
				q: track.metadata.artist.name + ' ' + track.metadata.name,
				count: 3
			},
			function (data) {
				track.setURL( data.response[1].url );
				handle( track );
			}
		);
    };
    
};