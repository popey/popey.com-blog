+++
date = "2022-10-12T13:00:00-00:00"
title = "Reading My Own Blog Posts (no bots!)"
slug = "2022/10/reading-my-own-blog-posts"
author = "Alan Pope"
tags = ['accessibility', 'tts', 'mycroft', 'mimic3']
+++

{{< rawhtml >}}
    <audio controls src="/blog/audio/audio_2022-10-12_11-33-47.mp3"><a href="/blog/audio/audio_2022-10-12_11-33-47.mp3">Download audio</a></audio>
{{< /rawhtml >}}

I had some fun when I [blogged](/blog/2022/10/blog-to-speech-in-my-voice/) about using a bot to read my blog post. While fun, it wasn't a particularly pleasant way to consume blog content. The audio is still a bit robotic, with little care for timing, ephasis and stress on words. So in my [next blog post](/blog/2022/10/setting-up-mimic3/), in which I detailed how to setup Mimic 3, I actually read the blog post out loud, recorded that and attached it as an MP3. 

Here's what I did, and didn't do.

## Go fast

I wanted to record the blog post as quickly as possible, with as little setup, processing or basic inconvenience to myself. The audio is an addendum to the post, not the focal point of it. Although this post now changes that, I guess.

## Minimise background noise

While I didn't want to setup a professional sound booth, I did want to reduce the audio noise a bit. I set my phone and tablet on airplane mode, muted my laptop, and unplugged a USB backup drive which made some noise. That's all. I didn't move to an acousticaly better room or throw blankets up. I recorded just as many people use voice notes on their mobile devices. 

## Use what's available

I have a decent microphone in another room, and even a great setup in my office, but decided I wanted to blog right now, and didn't want to make any changes to my environment. So I grabbed my iPhone 13 mini, launched the built-in audio recorder application and hit start. 

I used the built-in microphone on the phone, and held it about an inch or two from my face, then started reading the post. 

## The performance

I didn't prepare much, but dived right into reading. I skipped over lengthy pieces of terminal output, but read aloud a few of the commands. I don't think anyone wants to hear me read aloud entire log file snippets. I just wanted to get the gist of the post across. 

## Transferring results

Once I'd finished reading, I stopped, and sent the file to my Kubuntu laptop via Telegram. If I owned a Mac I could probably have AirDropped it over, but I had Telegram installed on both sides, and it's very easy to share directly from the audio recorder app. I could also have used WhatsApp or any other application, it largely doesn't matter. 

## Minor editing

I read the previous blog post out in one take with only one minor flub. I used Audacity to quickly clip that flub out, and "top and tail" the start and end of the audio file. So I did listen to the whole thing before exporting as MP3. I did no audio processing - no compression, no noise cancellation, nothing.

The original audio file was 2m33s in duration, and the resulting one published in the earlier blog post is 2m21. Not a lot was cut, and it only took two and a half minutes to record. Indeed, it takes me way longer to write the post than read it and edit it.

## Publishing

I use Hugo, the static site generator, to publish my blog. I commit each post to a git repo hosted on GitHub. A cron job on my VPS runs periodically to grab my site source, then build and publish it. I just had to make a new folder for audio files, drop the mp3 in and link to it at the top of the page with an HTML5 audio tag.

## Conculsion

Some audio purists may listen to the audio and be aghast at the mouth sounds, breaths, plusives, sound of a train going by, cat licking noises in the background or whatever else was happening. I agree. However, every step I could take to make it better would increase the amount of time taken to record and process the audio.

I could certainly do a few minor things to improve the audio. But it's not a podcast, and I don't have sponsors to please or people who will unsubscribe in disgust, so I don't care too much about that.

However, I'm reading *this* post and *will* do some minor audio processing, but likely just top and tail, noise reduction and compression. Let's see how that turns out.

Edit: I used noise reduction, compression and truncate silence in Audacity. I used all the default settings. That took the original audio from 4m45s to 3m33s. A large chunk of that was due to some silence I left in at tha start to facilitate noise reduction. 