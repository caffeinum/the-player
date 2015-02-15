window.onload = function (artwork1, artwork2) {
	$ = document.querySelector.bind(document);
	
	var auth = new Auth();
	auth.getAccessToken();
	
	artwork1 = $('#artwork-1');
	artwork2 = $('#artwork-2');
	
	cacher	= new Cacher();
	mixer	= new Mixer();
	rec		= new Recommender(auth);
	visual	= new Visualizer();
	
	billy = new Track('music/track3.mp3', {artist:{name:'billy talent'},name:'fallen leaves'});
	seven = new Track('music/track1.mp3', null);
	/*
	rec.pushNextTrack(billy);
	rec.getAudio(billy, mixer.load);
	*/
	tracks = [];
	for ( var i = 0; i < 5; i++ )
	tracks[i] = new Track( "music/track"+i+".mp3");
	
	//console.log = alert.bind(window);
	
	cacher.cache( billy, mixer.load );
	cacher.cache( seven, mixer.prepare );
	
	player = {
		like: rec.like.bind(rec, mixer.current),
		toggle: mixer.toggle.bind(mixer),
		next: mixer.mix.bind(mixer)
	};
}