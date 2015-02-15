var Auth = function () {
	var token_search = /^#access_token=([\w\d]+)/.exec( document.location.hash );
	var token = (token_search) ? token_search[1] : null;

	if ( config.access_token )
		this.token = config.access_token;
	else
	// if cookie

	if ( token ) {
	// save cookie
		this.token = token;
		config.access_token = token;
	} else
		this.getAccessToken();

	this.getAccessToken = function () {
		if ( this.token ) {
			return this.token;
		}
		
		var url = "https://oauth.vk.com/authorize?client_id=" + config.app_id + 
			"&scope=friends,audio" +
			"&redirect_uri=" +
			"http://the-player-caffeinum.c9.io/web/test/redirect.html" +
			"&display=popup&v=5.28&response_type=token";
		
		document.location = encodeURI( url );
	};
	
	this.request = function (method, params, handler) {
		params.access_token = this.token;
		jQuery.getJSON(
			"https://api.vk.com/method/" + method + 
			'?callback=?',
			params,
			handler
		);
	};
};