window.onload = function (artwork1, artwork2) {
	$ = document.querySelector.bind(document);
	
	artwork1 = $('#artwork-1');
	artwork2 = $('#artwork-2');
	
	mixer = new Mixer();
	rec = new Recommender();
	billy = new Track('music/track5.mp3', null);
	seven = new Track('music/track1.mp3', null);
	
	tracks = [];
	for ( var i = 0; i < 5; i++ )
	tracks[i] = new Track( "music/track"+i+".mp3");
	
	
	mixer.load( billy );
	mixer.prepare( seven );
	
	player = {
		like: rec.like.bind(rec, mixer.current),
		toggle: mixer.toggle.bind(mixer),
		next: mixer.mix.bind(mixer)
	};
}