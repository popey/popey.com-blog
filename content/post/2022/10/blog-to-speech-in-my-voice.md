+++
date = "2022-10-11T10:00:00-00:00"
title = "Blog To Speech - In My Voice"
slug = "2022/10/blog-to-speech-in-my-voice"
author = "Alan Pope"
tags = ['accessibility', 'tts', 'mycroft']
+++

Recently my *Internet friend* [Terrence Eden](https://twitter.com/edent) crafted a blog post titled [Blog To Speech](https://shkspr.mobi/blog/2022/10/blog-to-speech/) which you might want to also read. It serves as an inspiration for this post.

In short, there's a trend in blogging (and on some news sites) to add an audio transcription of the page you're reading, usually at the top of the article. Mostly this is done semi-automatically using a bot to read in an "AI generated" voice such as Amazon Polly. 

I haven't seen many of these articles where the author themselves transcribed the text.

We **can** do that though, but using AI (kinda). Well, *I* can. 

There exists online, a synthesized version of my own voice, built into [mimic3](https://github.com/MycroftAI/mimic3) (licensed under the AGPL v3) by [MycroftAI](https://mycroft.ai/).

Here's (hopefully) that voice - **my** (synthetic) voice, reading the rest of this post.

{{< rawhtml >}}
    <audio controls src="https://popey.com/popeysings/blog-to-speech-in-my-voice.mp3"><a href="https://popey.com/popeysings/blog-to-speech-in-my-voice.mp3">Download audio</a></audio>
{{< /rawhtml >}}

## Origin Story

Back in 2015 the "[MyCroft - AI for everyone](https://web.archive.org/web/20151217182149/https://mycroft.ai/)" project was started, which aimed to be a fully functional Open Source digital assistant. Think of it as an open alternative to Amazon Alexa, Apple Siri, Microsoft's Cortana and Google Assistant. They have run a series of crowdfunding campaigns to generate revenue to build the software and a device.   

When MyCroft were first getting started, their Community Manager asked if I wanted to be the "voice of MyCroft". I was a little perplexed by this, but flattered. I suspect this simply came about as a result of them hearing my dulcet tones on the (now defunct) [Ubuntu Podcast](https://ubuntupodcast.org/) along with my co-presenters.

It sounded fun so I agreed to submit my voice, via a third party company - [VocalID](https://vocalid.ai/). This involved using a web interface to record short snippets of text which covered all the possible phenomes my voice might make.

I spent some hours recording (and re-recording) 3488 short sentences which could later be processed and used to synthesize my voice. Here'a an unflattering selfie taken on 1st April 2016 of me in my young Son's bedroom recording my voice using a Blue Snowball. 

![Recording Studio](/blog/images/2022-10-11/recording.jpg)

The Mycroft team took these snippets and did *something* to turn that into a dataset which could be used with their assistant software. You could essentially make it (me) say anything. The initial results weren't fantastic. It was clearly "my" voice, but it sounded robotic, bass-heavy and very much in the uncanny valley. 

## popey in a box

The initial *Mycroft Mark I* hardware units did eventually ship. I got sent one as a "Thank you" for my voice (no, I wasn't paid in any other way).

The large box it shipped in...

![Mycroft AI box](/blog/images/2022-10-11/mycroftbox.jpg)

The scary warning you got when opening the box...

![Mycroft AI scary](/blog/images/2022-10-11/mycroftscary.jpg)

The front of the Mycroft Mark I...

![Mycroft AI front](/blog/images/2022-10-11/mycroftfront.jpg)

Mycroft's rear

![Mycroft AI back](/blog/images/2022-10-11/mycroftback.jpg)

## What are beans

Once I'd unpacked the Mark I and setup the software, I tried asking it/them/me some questions. One which had a fun response was the classic "*What are beans?*". Enjoy:

{{< rawhtml >}}
<iframe width="560" height="315" src="https://www.youtube.com/embed/D5J7vVQNkCw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
{{< /rawhtml >}}

## Blame popey

Some people took the software and did fun things with it. For a while there was a website called "Blame popey" in which you could type any text (yes, anything) and have it turned into a WAV file of "me" saying it. How we laughed.

![Blame popey](/blog/images/2022-10-11/blamepopey.png)

## popey sings

Someone else took it a step further and set some of this to music as "popey sings". There exists audio of "me" sining Elton John's "Rocketman", Eminem's "Lose Yourself", "Jerusalem" and even Elvis "Love me Tender". They're [here](https://popey.com/popeysings/) in OGG and MP3 format if you're really interested in hearing what a robotic me sounds like "singing". Here's a sample of "me" singing Mr Sandman. I apologise. 

{{< rawhtml >}}
    <audio controls src="https://popey.com/popeysings/mp3/01-sandman.mp3"> <a href="https://popey.com/popeysings/mp3/01-sandman.mp3">Download audio</a></audio>
{{< /rawhtml >}}

## Pressed popey

We even went as far as pressing the songs above onto vinyl as a 9-track "Limited Edition EP" to give away as a "prize" at a live Ubuntu Podcast event. Someone, somewhere has one of these. I have no idea if they've ever actually been played on a genuine turntable. Probably not. 

![popey EP](/blog/images/2022-10-11/vinyl.jpg)

## popey Mark III

While the original audio used in the Mark I device was robotic and difficult to understand sometimes, improvements have been made. The new "Mimic 3" engine - which is available on [GitHub](https://github.com/MycroftAI/mimic3) sounds more like me, is less robotic, and more pleasant to listen to (assuming you don't mind it being *my* voice, of course!). 

It's pretty trivial to get the Mimic 3 engine running on a modern laptop or even Raspberry Pi, to play with it. 

![Mimic 3 web UI](/blog/images/2022-10-11/mimic3.png)

## Conclusion

I pasted a version of all this text into the Mimic 3 web interface, to see how it sounds. It's not excellent, for sure. It has trouble saying things like GitHub, "Mark I" and the headlines in this post. 

I could re-word parts to work around this, for example changing "Mark I" to "Mark 1" or "Mark One". The additional overhead of editing, re-editing and re-creating the audio might be time consuming and not worthwhile, if nobody listens.

While I did generate the audio manually using the web interface, there is also an API, so I could programmatically generate a new MP3 whenever the text on the page changes. 

Overall it was a fun exercise, but I don't think I'll be doing this for every post!