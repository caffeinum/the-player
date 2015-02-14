window.onload = function (artwork1, artwork2) {
	$ = document.querySelector.bind(document);
	
	artwork1 = $('#artwork-1');
	artwork2 = $('#artwork-2');
	
	mixer = new Mixer();
	rec = new Recommender();
	
	mixer.prepare();
	mixer.mix();
	
	player = {
		
	};
}