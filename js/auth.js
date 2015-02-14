var Auth = function () {
	
	
		this.getAccessToken = function ( handler ) {
            var token = '';
			/*jQuery.getJSON('https://oauth.vk.com/access_token?' + 
						  'client_id=' + config.app_id +
						  '&client_secret=' + config.secret + 
						  '&v=5.1&grant_type=client_credentials',
						  handler);*/
            //
            var url = "https://oauth.vk.com/authorize?client_id=" + config.app_id + 
                "&scope=friends,audio&redirect_uri=/redirect.html&display=popup&v=5.28&response_type=code";
            var newWin = window.open(url, "AuthForm", "width=200");
            newWin.onload = function () {
                console.log( newWin );
            }
            token = '';
            
            handler( token );
            //jQuery.getJSON('https://oauth.vk.com/blank.html', handler);

		};
};