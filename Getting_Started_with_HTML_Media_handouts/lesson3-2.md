![](headings/lesson_3.2.jpg)

# Introduction

In this step, I'm going to show you some software and JavaScript plugins that can be used with the `audio` tag.

# Freemake Audio Converter

When we embed audio using the `audio` tag, it's important to provide two file formats, MP3 and Ogg. For this course I've used free program called Freemake Audio Converter. When installing it, just be careful not to install unnecessary software, which these kinds of free programs will try to do at every corner.

Unlike its Video Converter counterpart, Audio Converted do not have an HTML5 option. Instead, we have to manually convert an audio file to MP3 and then to Ogg. If you already have an MP3 file, then just convert it to Ogg and you're good to go.

# Audio.js Plugin

Now, we are going to take a look at some plugins that improve on the `audio` tag and also provide fallback players for older browsers. The first plugin is called Audio.js. It's a very simple plugin but its advantage is that it's relatively small, around 20 kilobytes.

Open the *audiojs.html* file to test it. Loading Audio.js is very simple:

```js
<script src="audiojs/audio.min.js"></script>
<script>
audiojs.events.ready(function() {
	var as = audiojs.createAll();
});
</script>
```

Opening the file in the browser, you can already see the Audio.js player in action. It's a very basic player that doesn't have volume control, but it can be useful in some cases.

# MediaElement.js Plugin

The next plugin is the same that we used for the `video` tag called MediaElement.js. When downloading it and extracting it, use the files that are in the *build* folder. These files are already present in the *mediaelement* folder in the course files.

First include CSS and JS files for the MediaElement player:

```html
<link rel="stylesheet" href="mediaelement/mediaelementplayer.min.css">
<script src="mediaelement/mediaelement-and-player.min.js"></script>
```

Now execute the initialization function like this:

```html
<script>
$('video, audio').mediaelementplayer();
</script>
```

Check that in your browser.