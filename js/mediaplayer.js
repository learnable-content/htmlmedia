function mediaPlayer(playerid) {
	if(!playerid) {
		return false;
	}

	//assign media player to variable
	var mediaPlayer = document.getElementById(playerid);

	if(!mediaPlayer) {
		return false;
	}

	//assign buttons ans sliders to variables
	var playPause = mediaPlayer.querySelector('.controls-play-pause');
	var seek = mediaPlayer.querySelector('.controls-seek');
	var mute = mediaPlayer.querySelector('.controls-mute');
	var volume = mediaPlayer.querySelector('.controls-volume');
	var fullscreen = mediaPlayer.querySelector('.controls-fullscreen');

	//assign media controls to variable
	var controls = mediaPlayer.querySelector('.media-player-controls');

	//assign selected media to variable
	var target = mediaPlayer.dataset.target;
	var media = document.getElementById(target);

	//assign media type to variable
	var mediaType = media.tagName.toLowerCase();

	//declare variable for current volume
	var currentVolume = 1;
	
	/*
	-- Initialization
	*/

	// hide the default controls
	media.controls = false;

	//set the seek slider to 0 and volume slider to 100
	seek.value = 0;
	volume.value = 100;

	//hide the fullscreen button if kind of media is audio
	//if the tag name is audio hide the fullscreen button and stretch the seek slider to cover its space
	if(mediaType == 'audio') {
		fullscreen.style.display = "none";
		seek.style.width = "79%";
	}
	
}

//set up media players
mediaPlayer('mediaplayer1');
mediaPlayer('mediaplayer2');