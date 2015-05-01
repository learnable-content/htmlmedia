window.onload = function() {
	var mediaPlayer = function(playerid) {
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

		//set data-fullscreen to false
		mediaPlayer.dataset.fullscreen = false;

		//set the seek slider to 0 and volume slider to 1
		seek.value = 0;
		volume.value = 1;

		//hide the fullscreen button if kind of media is audio
		//if the tag name is audio hide the fullscreen button and stretch the seek slider to cover its space
		if(mediaType == 'audio') {
			fullscreen.style.display = "none";
			seek.style.width = "79%";
		}

		/*
		-- Event listeners for the buttons
		*/

		//checks if the media is playing
		var isPlaying = function() {
			if(media.paused) {
				return false;
			} else {
				return true;
			}
		}

		//this function sets the correct class for the play button
		var configPlayPauseButton = function() {
			if(isPlaying()) {
				//set classes to show the pause button
				playPause.className = "controls button controls-play-pause face-pause";
			} else {
				//set classes to show the play button
				playPause.className = "controls button controls-play-pause face-play";
			}
		}

		//set event listener for the play / pause button
		playPause.addEventListener("click", function() {
			//here we'll check the "paused" property of the media
			if(!isPlaying()) {
				//play the media
				media.play();
			} else {
				//pause the media
				media.pause();
			}

			configPlayPauseButton();
		});

		//set event listener for the media so the button changes not only when the button is pressed, but in others like seeking
		media.addEventListener('play', function() {
			configPlayPauseButton();
		});
		media.addEventListener('playing', function() {
			configPlayPauseButton();
		});
		media.addEventListener('pause', function() {
			configPlayPauseButton();
		});

		/*
		-- Seek slider setup
		*/

		//set event listener for the seek slider
		//different from the buttons we'll use the "change" event here
		seek.addEventListener("change", function() {
			//determine the user-chosen time by discovering the percentage of the slider value multiplied by the duration of the media
			var selectedTime = media.duration * (this.value/100);

			//set the current time
			media.currentTime = selectedTime;
		});

		//to move the slider along with the media, set the event listener for the timeupdate event
		media.addEventListener("timeupdate", function() {
			//get the percentage of the video elapsed
			var percentageElapsed = (media.currentTime/media.duration)*100;

			//set the value to the seek slider
			seek.value = percentageElapsed;
		});

		//to prevent stuttering, pause the media while moving the slider
		seek.addEventListener("mousedown", function() {
			media.pause();
		});

		//resume the playback when the handle is set
		seek.addEventListener("mouseup", function() {
			media.play();
		});

		/*
		-- Mute Button Setup
		*/

		//correctly sets up the mute button to reflect current media volume
		var configMuteButton = function() {
			if(currentVolume <= 0 || media.muted) {
				mute.className = "controls button controls-play-pause face-vol-mute";
			} else if(currentVolume > 0 && currentVolume < 0.6) {
				mute.className = "controls button controls-play-pause face-vol-mid";
			} else {
				mute.className = "controls button controls-play-pause face-vol-full";
			}
		}

		//set event listener for the mute button
		mute.addEventListener("click", function() {
			//here we'll check the "muted" property of the media
			if(media.muted) {
				//unmute the media
				media.muted = false;

				//set the value of the volume slider to the stored currentVolume
				volume.value = currentVolume;
			} else {
				//store the current volume for later
				currentVolume = volume.value;

				//mute the media
				media.muted = true;

				//set volume slider to 0
				volume.value = 0;
			}

			configMuteButton();
		});

		/*
		-- Volume slider setup
		*/

		//set the event listener for the volume slider
		//the value of the slider was already set from 0 to 1 (in steps of 0.05), so we just set the value directly here
		volume.addEventListener("change", function() {
			//store volume in variable
			currentVolume = this.value;

			//set the volume value accordingly
			media.volume = this.value;

			//configure mute button
			configMuteButton();
		});

		//set event listener so the volume button is corretly configured when the volume changes
		media.addEventListener('volumechange', function() {
			configMuteButton();
		});

		/*
		-- Fullscreen Button Setup
		*/

		//auxiliary functions
		//source: https://developer.mozilla.org/en-US/Apps/Build/Audio_and_video_delivery/cross_browser_video_player

		//first, a function to check if a browser is currently full screen
		var isFullScreen = function() {
			//if it's audio, return false
			if(mediaType == 'audio') {
				return false;
			}

			return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
		}

		//this function sets the fullscreen button to the correct class
		var configFullScreenButton = function() {
			if(!isFullScreen()) {
				//set classes to show the expand button
				fullscreen.className = "controls button controls-fullscreen face-expand";
			} else {
				//set classes to show the restore button
				fullscreen.className = "controls button controls-fullscreen face-restore";
			}
		}

		//this function sets the data-fullscreen attribute of the media player
		var setFullscreenData = function(state) {
			//if it's audio, return false
			if(mediaType == 'audio') {
				return false;
			}
			
			//set data-fullscreen attribute
			mediaPlayer.dataset.fullscreen = state;

			//set button to correct state
			configFullScreenButton();
		}

		//then a function to set the video to full screen
		var setFullScreen = function() {
			//if it's audio, return false
			if(mediaType == 'audio') {
				return false;
			}

			if(!isFullScreen()) {
				console.log('media is not in fullscreen');
				//enable fullscreen
				//here we'll test for the requestFullscreen method. Older versions of Firefox and Webkit browsers will use their proprietary versions with "moz" and "webkit" prefixes
				if (mediaPlayer.requestFullscreen) {
					mediaPlayer.requestFullscreen();
				} else if (mediaPlayer.mozRequestFullScreen) {
					mediaPlayer.mozRequestFullScreen(); // Firefox
				} else if (mediaPlayer.webkitRequestFullscreen) {
					media.webkitRequestFullscreen(); // Chrome and Safari
				} else if(mediaPlayer.msRequestFullscreen) {
					mediaPlayer.msRequestFullscreen();
				}

				//set the data-fullscreen attribute of the media player
				setFullscreenData(true);
			} else {
				console.log('media is in fullscreen');

				//cancel fullscreen
				if(document.exitFullscreen) {
					document.exitFullscreen();
				} else if(document.webkitCancelFullScreen) {
					document.webkitCancelFullScreen();
				} else if(document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if(document.msExitFullscreen) {
					document.msExitFullscreen();
				}

				//set the data-fullscreen attribute of the media player
				setFullscreenData(false);
			}
		}

		//set event listener for the fullscreen button
		fullscreen.addEventListener("click", function() {
			setFullScreen();
		});

		//set event listeners for each browser, so the fullscreen button responds to other changes, like the user pressing ESC to exit full screen
		document.addEventListener('fullscreenchange', function(e) {
		   setFullscreenData((document.fullScreen || document.fullscreenElement));
		});
		document.addEventListener('webkitfullscreenchange', function() {
		   setFullscreenData(document.webkitIsFullScreen);
		});
		document.addEventListener('mozfullscreenchange', function() {
		   setFullscreenData(document.mozFullScreen);
		});
		document.addEventListener('MSFullscreenChange', function() {
		   setFullscreenData(!!document.msFullscreenElement);
		});
		
	}

	//set up media players
	mediaPlayer('mediaplayer1');
	mediaPlayer('mediaplayer2');
}