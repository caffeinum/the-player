window.onload = function (artwork1, artwork2) {
	$ = document.querySelector.bind(document);
	
	artwork1 = $('#artwork-1');
	artwork2 = $('#artwork-2');
	
	mixer = new Mixer();
	rec = new Recommender();
	billy = new Track('/music/track2.mp3', null);
	
	mixer.load( billy );
	
	player = {
		toggle: mixer.play
	};
}