var Auth = function () {
	
	
		this.getAccessToken = function ( handler ) {
			jQuery.getJSON('https://oauth.vk.com/access_token?' + 
						  'client_id=' + config.app_id +
						  '&client_secret=' + config.secret + 
						  '&v=5.1&grant_type=client_credentials',
						  handler);
            //https://oauth.vk.com/authorize?client_id=" + config.app_id + "&scope=PERMISSIONS&redirect_uri=REDIRECT_URI&display=DISPLAY&v=API_VERSION&response_type=token
            var newWin = window.open("http:fantlab.ru", "AuthForm", "");
            newWin.focus();
            


		};
};