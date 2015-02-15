var Visualizer = function () {
	var artistField	= document.getElementById('artistField');
	var trackField	= document.getElementById('trackField');
	var albumImage = document.getElementById('artwork-1');
	
	this.setTrack = function (track) {
		this.set(
			track.metadata.artist.name,
			track.metadata.name,
            track.metadata.album
		);
	};
	this.set = function (artist, track, image) {
		artistField.innerHTML = artist;
		trackField.innerHTML = track;
        albumImage.src = image;
	};
};