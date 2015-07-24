![](headings/lesson_3.1.jpg)

# Introduction

In this lesson, you are going to learn the basics of the `audio` tag. It's very similar to the `video` tag we covered earlier, and at times it can be simpler as well. Open the file *audiobasics.html* to get started.

# Audio Tag Attributes

The `audio` tag works in the same way as the `video` tag. In the *media* folder we have sample audio in two formats: MP3 and Ogg.

Let's start with the simplest form of the tag:

```html
<div class="audio">
	<audio src="media/audio.mp3" autoplay></audio>
</div>
```

Now the audio plays as soon as the browser's is able to.

We can use other attributes just like with the `video` tag:

* `loop` so that the audio loops
* `muted` is so that the audio is muted by default
* `preload` with the values `none`, `metadata` or `auto`.
* `controls` to add controls to the element.

# Audio Formats

Add controls like this:

```html
<div class="audio">
	<audio src="media/audio.mp3" autoplay controls></audio>
</div>
```

Now, we can see that the browser adds its own sets of controls so we can play, pause, seek and change the volume of the audio. As with video, there are a variety of plugins that work with the `audio` tag; and we can develop custom controls using HTML, CSS and JavaScript.

There are two main formats supported by the browsers: MP3 and Ogg. It's safer to provide the two formats for the user and we do that by using the `src` tag:

```html
<div class="audio">
	<audio controls>
		<source src="media/audio.mp3" type="audio/mpeg3">
		<source src="media/audio.ogg" type="audio/ogg">
		<p>
			Your browser doesn't support HTML5 audio playback.
			<a href="media/audio.mp3">Download the file here</a>.
		</p>
	</audio>
</div>
```

The audio is now being served in two different formats. I've also provided fallback content inside the `audio` tag for browsers that do not support HTML5 audio playback.