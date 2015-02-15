var Auth = function () {
		var code;
		this.code = code;
	
		// save cookie
	
		this.getAccessToken = function ( handler ) {
            var token = '';
			
			if ( this.code ) {
				return handler( this.code );
			}/*
			jQuery.getJSON('https://oauth.vk.com/access_token?' + 
						  'client_id=' + config.app_id +
						  '&client_secret=' + config.secret + 
						  '&v=5.28',
						  handler);*/
            //
            var url = "https://oauth.vk.com/authorize?client_id=" + config.app_id + 
				"&scope=friends,audio" +
				"&redirect_uri=" +
				"http://the-player-caffeinum.c9.io/web/test/redirect.html" +
				"&display=popup&v=5.28&response_type=token";
            document.location = encodeURI( url );
		};
};