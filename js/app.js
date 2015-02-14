window.onload = function (artwork1, artwork2) {
	$ = document.querySelector.bind(document);
	
	artwork1 = $('#artwork-1');
	artwork2 = $('#artwork-2');
	
	mixer = new Mixer();
	rec = new Recommender();
	billy = new Track('/music/track2.mp3', null);
	next = new Track('/music/track3.mp3', null);
	
	mixer.load( billy );
	mixer.prepare( next );
	
	player = {
		like: rec.like,
		toggle: mixer.play,
		next: mixer.mix
	};
}