+++
date = "2021-06-14T11:00:00-00:00"
title = "Adrift"
slug = "2021/06/adrift"
author = "Alan Pope"
tags = ['software', 'game', 'ubuntu', 'podcast']
+++

Over the weekend I participated in [FOSS Talk Live](https://fosstalk.com/). Before **The Event** this would have been an in-person shindig at a pub in London. A bunch of (mostly) UK-based podcasters get together and record live versions of their shows in front of a "studio audience". It's mostly an opportunity for a bunch of us middle-aged farts who speak into microphones to get together, have a few beers and chat. 

Due to **The Event**, this year it was a virtual affair, done online via YouTube. Joe Ressington typically organised the in-person events, but with a lack of skills in video streaming, Martin Wimpress and Marius Quabeck stepped in to run the show behind-the-scenes. 

{{< rawhtml >}}

{{< /rawhtml >}}

There was representation from [Linux Lads](https://linuxlads.com/) (Shane, Mike and Conor), [Late Night Linux](https://latenightlinux.com/) (Joe, Graham, Felim and Will), [Ubuntu ~~Podcast~~ Voltage](https://ubuntupodcast.org/) (Myself, Martin, Mark and Stuart (borrowed from Bad Voltage - hence the reband (yes, we considered calling it "Bad Podcast"))), and [The New Show](https://thenew.show/) (Me again with Joe and Dan).

During our section (which you can find 2 hours and 20 mins into [the live stream](https://youtu.be/udyq7-SCJrQ?t=8411)), we presented four creations based on the following premise:

*"Make a thing (program, game, hardware device, whatever) that is controlled by one button. Once your thing is running it can only accept a single button with a pressed and not pressed state (this could be a physical button, a keyboard key, or a software UI button) as input until it stops running"*

We then provided an opportunity for the audience to vote for the best one on Twitter. 

{{< rawhtml >}}
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Who wins the <a href="https://twitter.com/hashtag/UbuntuVoltage?src=hash&amp;ref_src=twsrc%5Etfw">#UbuntuVoltage</a> Single Button Challenge?<br>Vote now, you have 10 minutes!</p>&mdash; Ubuntu Podcast (@ubuntupodcast) <a href="https://twitter.com/ubuntupodcast/status/1403814651490672640?ref_src=twsrc%5Etfw">June 12, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
{{< /rawhtml >}}

Spoiler: I won! 

I made a game which I called Adrift. The idea is you're in a failing space ship. If your hull integrity or life support gets to zero, the ship explodes and you all die, or support systems fail, and you die. Keep the ship in working order by re-charging the systems by holding down the space key, and releasing in one of four quadrants of the controls. Here's what it looks like :)

![Adrift screenshot](/blog/images/2021-06-14/adrift.png)

In addition if the shield gauge gets low, the hull will fail faster. If engines get low, everything fails faster. The weapons are used to kill enemies who come on screen from the left. They currently don't shoot you, so there's no jeopardy from them, because it's unfinished.

You can install the one I showed off in the live stream from the [Snap Store](https://snapcraft.io/adrift) and [Itch.io](https://popey.itch.io/adrift). I only published a 64-bit X86 build for Linux. I haven't built a binary for Windows or MacOS yet. This is a Linux *exclusive* "game"! ;)

It is *very* much a prototype / work in progress / game jam affair. That is to say, there's a ton of stuff missing from it. I managed to pull together an MVP (Minimum Viable Product) that I could video and demo on the show, but that's about it.

This is actually the first game I have ever made and released publicly, so you can understand why it's a bit awful. It was also done under a time pressure (I believe they call this "crunch" in the games industry ;) ). It's also the first thing I've made in Blitz for a very, very long time.

There was some amusing "controversy" from the viewers in the live chat (you can see it if you watch the video linked above) about my entry. This revolved around how many buttons were being used. We were only supposed to use one button for the game. In Adrift, only the spacebar does any game-related activities. However I'd added a few options including P to pause, and some function keys to enable me to debug the code. 

I only added the pause button to enable me record the video you see in the stream, and pause the gameplay so I could talk over it. Sure, I could have used a video editor, but there was a bit of a time pressure, and it was actually quicker for me to add a pause function. My video was made at 16:05 on Saturday, with our deadline being 17:00, and the whole event starting at 19:00. Time was of the essence!

I removed all the additional keys from the build that's published online, however. :) 

During the live stream, we only really had a few minutes to discuss our projects. On the Ubuntu Podcast we'll have an in-depth segment soon, where all four of us will go into more detail. We can also answer any questions from the audience, should they come in. 

I don't want to go into full detail about the development in this post, but use this as an opportunity to gloat over my co-presenters, and give out the links so people can download and try out my pretty terrible attempt at a "game". :D 

I kept a bit of a diary / devblog which I'll use to follow up with another blog post, in a few weeks. But for now, that's it. Feel free to grab the game from the following places.

{{< rawhtml >}}
<iframe frameborder="0" src="https://itch.io/embed/1088627" width="552" height="167"><a href="https://popey.itch.io/adrift">Adrift by Alan Pope</a></iframe>
{{< /rawhtml >}}

{{< rawhtml >}}
<iframe src="https://snapcraft.io/adrift/embedded?channels=true&summary=true&screenshot=true" frameborder="0" width="100%" height="590px" style="border: 1px solid #CCC; border-radius: 2px;"></iframe>
{{< /rawhtml >}}
