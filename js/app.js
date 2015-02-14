window.onload = function () {
	$ = document.querySelector.bind(document);
	
	mixer = new Mixer();
	rec = new Recommender();
	
	mixer.prepare();
	mixer.mix();
	
	player = {
		deck1: deck1,
		deck2: deck2,
		next: next,
		skip: skip,
		play: play,
		pause: pause,
		toggle: toggle
	};
}