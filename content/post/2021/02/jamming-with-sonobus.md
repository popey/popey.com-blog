+++
date = "2021-02-22T22:00:00-00:00"
title = "Jamming with Sonobus"
slug = "2021/02/jamming-with-sonobus"
author = "Alan Pope"
tags = ['software', 'sonobus', 'linux', 'snap']
+++

Before last week, I'd never heard of [SonoBus](https://sonobus.net/). While on holiday I'd packaged up Spot - a Gtk Spotify client, which I wrote about [recently](/blog/2021/02/spotty-connection/). The next day I made a snap of [SonoBus](https://snapcraft.io/sonobus) too! I did this because while there were binary builds for Windows and Mac, there was no binary release for Linux, other than in the [Arch User Repository](https://aur.archlinux.org/packages/sonobus/).

![SonoBus](/blog/images/2021-02-22/sonobus.png)

For those that, like me, didn't know about SonoBus, it's an "*SonoBus is an easy to use application for streaming high-quality, low-latency peer-to-peer audio between devices over the internet or a local network*". 

Launch SonoBus, create or join a private or public channel, or connect to another local instance, and start an audio collaboration. It's primarily targeted at musicians working remotely, looking for a really low-latency, but high audio-quality solution.

![Jamming](/blog/images/2021-02-22/jam.png)

In the above test I connected to a random room where strangers were playing piano and other instruments. I was pretty blown away by how clear it all was, and how the musicians were able to stay in sync.

I'm not even remotely musically talented, but I've used SonoBus for simple chatting with friends. Here I roped in [Martin](https://twitter.com/m_wimpress) and [Mark](https://twitter.com/marxjohnso) from the [Ubuntu Podcast](https://ubuntupodcast.org/) to try the application out for potential episode recording.

![Podcast](/blog/images/2021-02-22/podcast.png)

The application features flexible recording options, and a small selection of optional plugins for Noise Gate, Compression and Parametric EQ. SonoBus supports ALSA and Jack for managing audio devices, which was a bit of a challenge for snapping, but with some help from my friends Yannick and Martin, we got a working confined snap published.

While surfing the rooms I stumbled on some UK musicians just chatting. One - "Stu" was a keen user of SonoBus and other, similar applications. He mentioned a [Sonobus Discord](https://discord.gg/wm28tQdYTb) server which I jumped on. The SonoBus author - Jesse - was around and we engaged in some discussion of the Linux build I'd made. 

I offered to hand the snap over to Jesse, because in my opinion it's always better for the upstream developer to control the builds and releases of their own software. Jesse created a Snap Store account on Friday, and I requested the handover on the snapcraft forum this morning. By the afternoon it had been reassigned, and the upstream author can now release to the Snap Store at their leisure. 

I think this is one of the things I love most about the snapping process. I went from never having heard of SonoBus to collaborating on a snap with friends, publishing it and handing it over in just a few days. It could have been faster if I didn't go offline over the weekend, but I think under a week is a decent turnaround. 

Making snaps is my jam.