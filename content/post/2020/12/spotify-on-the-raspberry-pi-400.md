+++
date = "2020-12-17T15:00:00-00:00"
title = "Spotify on the Raspberry Pi 400"
slug = "2020/12/spotify-on-the-raspberry-pi-400"
+++

I recently ordered a [Raspberry Pi 400](https://geni.us/A7doLdy), I couldn't resist. I've bought a few Raspberry Pi's over the years, with a few installed around the house. The Pi 400 struck me as quite the game-changer though, with a built in keyboard-enclosure and accessible connectors. The fact it reminded me of my youth with memories of the Sinclair Spectrum where everything is housed inside the keyboard helped a bit. 

One omission which struck me as odd was the lack of audio jack. I'm sure there's sensible cost or logical, technical reasons for it, but it's a bit of a pain for me. Neither of the displays my Pi 400 is connected to have any kind of speaker or audio jacks. I don't often need the audio output, but sometimes I'm testing applications which require an audio device. 

A quick search led me to this [Plugable USB Audio Adapter](https://geni.us/31ZAy) which has a USB plug on one end, and headphone & microphone ports at the other. I rather hastily slapped the "Buy Now" button and it arrived safely through my letter box today. 

![USB Device in packaging](/blog/images/2020-12-17/IMG_20201217_130747.jpg)

Once I got it out of the easy-opened blister-pack I realised my mistake. It's a bit of a chonky adapter, wider than your average USB device. If plugged into the left USB port it obscures the middle one, and the power socket. In the middle USB port it obscures the left and right ports. On the right USB socket it covers the middle port and the Ethernet port. D'oh!

![USB Device in Pi 400](/blog/images/2020-12-17/IMG_20201217_161135.jpg)

For my use, this isn't a massive dealbreaker. I rarely attach USB devices to the Pi 400, other than the mouse. I tend to use WiFi rather than Ethernet, so that's not a big deal either. However, I should really have done my research rather than drunkenly late-night ordering whatever audio device showed up at the top of search results ;).

I can probably work around this issue with a [short USB extension cable](https://geni.us/E8lxZc), which I probably have kicking around somewhere. Alternatively I could add a small [USB hub](https://geni.us/p7BdHhh) which will give me more USB sockets of course. 

More importantly though, does the audio device work? **Yes**. 

I'm running [Ubuntu 20.10](https://ubuntu.com/blog/ubuntu-20-10-on-raspberry-pi-delivers-the-full-linux-desktop-and-micro-clouds) on my Pi, which detected and enabled audio as soon as I attached the device. I plugged some headphones into the green socket. Using the GNOME Settings "Sound" applet I tested the audio output, and sure enough "Front Right" and "Front Left" work perfectly.

![Sound Settings](/blog/images/2020-12-17/2020-12-17_13-13-50.png)

The application I actually wanted to test is [ncspot](https://snapcraft.io/ncspot), an awesome command-line Spotify client written in Rust. I help maintain and publish the snap, which is built from the upstream source you'll find on [GitHub](https://github.com/hrkfdn/ncspot). Install with `snap install ncspot`, launch with `ncspot`, sign into your Spotify account, and you're done. 

![Sound Settings](/blog/images/2020-12-17/2020-12-17_13-23-15.png)

While I use ncspot on my x86-68 based desktop PC, I wanted to be sure the arm64 build works well too, hence needing this audio device for my Pi 400. Well, it works perfectly. Indeed I got a little distracted, playing all kinds of tracks, to fully "test" the application and interface.

If you don't mind the chonkyness of the device, it's good, it works.

