window.onload = function (artwork1, artwork2) {
	$ = document.querySelector.bind(document);
	
	artwork1 = $('#artwork-1');
	artwork2 = $('#artwork-2');
	
	mixer = new Mixer();
	rec = new Recommender();
	billy = new Track('/music/track3.mp3', null);
	seven = new Track('/music/track4.mp3', null);
	
	mixer.load( billy );
	mixer.prepare( seven );
	
	player = {
		like: rec.like.bind(rec, mixer.current),
		toggle: mixer.toggle.bind(mixer),
		next: mixer.mix.bind(mixer)
	};
}