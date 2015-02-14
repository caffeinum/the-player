var Auth = function () {
	
	
		this.getAccessToken = function ( handler ) {
			/*jQuery.getJSON('https://oauth.vk.com/access_token?' + 
						  'client_id=' + config.app_id +
						  '&client_secret=' + config.secret + 
						  '&v=5.1&grant_type=client_credentials',
						  handler);*/
            //
            var newWin = window.open("https://oauth.vk.com/authorize?client_id=" + "4782453" + "&scope=friends,audio&redirect_uri=https://oauth.vk.com/blank.html&display=popup&v=5.28&response_type=token", "AuthForm", "width=200");
            
            
            console.log( newWin );
            //jQuery.getJSON('https://oauth.vk.com/blank.html', handler);

		};
};