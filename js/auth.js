var Auth = function () {
	
	VK = {
		getAccessToken: function ( handler ) {
			jQuery.getJSON('https://oauth.vk.com/access_token?' + 
						  'client_id=' + config.app_id +
						  '&client_secret=' + config.secret + 
						  '&v=5.1&grant_type=client_credentials',
						  handler);
		}
	};
};