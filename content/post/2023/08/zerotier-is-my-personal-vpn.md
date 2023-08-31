+++
date = "2023-08-31T07:00:00-00:00"
title = "ZeroTier is my personal VPN"
slug = "2023/08/zerotier-is-my-personal-vpn"
author = "Alan Pope"
tags = ['vpn', 'steamdeck', 'linux', 'windows', 'macos', 'iphone', 'ubuntu']
draft = 'false'
+++

Back in July, [Martin](https://wimpysworld.com/) introduced us to [ZeroTier](https://www.zerotier.com/) on the [Linux Matters](https://linuxmatters.sh/) podcast, [episode 8](https://linuxmatters.sh/8/). He detailed why he's using the tool and how. Worth a listen. 

Per their website, [ZeroTier](https://www.zerotier.com/) ***"lets you build modern, secure multi-point virtualized networks of almost any type. From robust peer-to-peer networking to multi-cloud mesh infrastructure, we enable global connectivity with the simplicity of a local network."***

Interesting marketing, but do I need this though?

## Computing setup

I have three main computers, and some other devices I use regularly. By 'regularly' I mean 'at least once a week, maybe more'. 

I do not count this bad boy, as a 'main' computer, for example:

[![Compaq](/blog/images/2023-08-31/compaq.jpeg)](/blog/images/2023-08-31/compaq.jpeg)

But I *am* including this ~~Steam Deck~~ *Gabe Gear*

[![Compaq](/blog/images/2023-08-31/steamdeck.jpeg)](/blog/images/2023-08-31/steamdeck.jpeg)

My current in-use hardware list is as follows:

| Device | Use | OS|
|--------|-----|---|
| ThinkPad Z13 | Work-supplied laptop | Ubuntu 23.04|
| Intel Hades Canyon NUC | Personal desktop "Gaming/Streaming" PC | Dual boot Windows 11 / Ubuntu 23.04|
| Apple M1 MacBook Air | Personal laptop | MacOS|
| Raspberry Pi | ADSB Radio | Raspbian |
| HP Microserver | Backups and stuff| Ubuntu 22.04 |
| Bitfolk VPS | Website| Ubuntu 18.04 (ahem)|
| Gabe Gear | Games | SteamOS |
| iPhone | Everything| iOS |

**Edit**: Added my iPhone because I've added ZeroTier onto it, so I can access stuff at home from my phone too. Forgot about that when I first made the list. It shows up on iOS as a VPN.

## Computing locations

I have three main locations that I might 'compute' from.

1. Home
2. Office
3. Anywhere else

Yes, "anywhere else" is a touch broad. I'm currently sat in The Hoxton, Shoreditch, like the beardy MacBook Air toting hipster I clearly want to be. But I also compute from hotels, conference centres, the local pub, trains, and even the bathroom of a truck-stop if the photo above is to be believed. 

Wherever the Internet can be found, a popey can compute. 

## Why ZeroTier

I've used [Tailscale](https://tailscale.com/) at a [previous employer](https://www.influxdata.com/) to access internal resources, and a generic OpenVPN setup at a [previous, previous employer](https://canonical.com). At the moment I don't *need* a VPN at my [current employer](https://axiom.co/). 

So my use cases are personal, not for work purposes. I never considered using Tailscale - or indeed any other VPN system - for these tasks. It just dawned on me when we discussed ZeroTier on the [podcast](https://linuxmatters.sh/8/), that it might be handy.

## Home, sweet home

Sometimes when I'm away from the mothership, I'll want to access a resource back home. That usually means grabbing files off the home server, which is a bit of a data dumping ground. Previously I've opened an SSH port to home, and setup a [dynamic DNS](https://afraid.org/) hostname to ensure I can get in if my home IP address changes. 

I might also want to launch a long-running task at home, such as kicking off a Torrent (or other large) download. I have plenty of disk space at home, a decent connection, so it's handy to start these things while I'm away, possibly on a dodgy connection.

I don't actually *like* having a permanently open port to an SSH daemon at home. So the idea that I can get rid of it with ZeroTier pleases me somewhat.

## Boss! It's the plane!

I have a Pi at home running [adsb.fi](https://adsb.fi/) and other services to track the planes above my house, and feed that data to community-driven flight trackers. It's fun! The software runs locally inside my house on the Pi in my loft. The web user interface isn't exposed to the outside world. Except with ZeroTier installed on the Pi, now I can spot all those lovely planes from anywhere. 😍

[![Planes, faasands of 'em](/blog/images/2023-08-31/planes.png)](/blog/images/2023-08-31/planes.png)

Not only can I look at the planes, it also lets me check that the Pi is functioning correctly, of course.

## Overcoming office obstructions

I've previously written about how I'm now [renting office space](/blog/2023/08/its-not-working-from-home), to improve the mental headspace of work/home separation. So this use case is very similar to one Martin talked about in the [show](https://linuxmatters.sh/8/). Unsurprisingly perhaps, given we're renting space in the same office.

The network in the office is configured such that devices cannot connect directly to eachother. So if I take my Steam Deck into the office, I can't ssh into it from my laptop. Why might I want to do this? Reasons. We'll talk about that on an upcoming [episode](https://linuxmatters.sh) (you should subscribe).

The point being, once ZeroTier is [installed](https://wimpysworld.com/posts/install-zerotier-on-steamdeck) on the Steam Deck, I can very easily SSH or otherwise connect between the machines in the office. It's 🌟magic🌟.

## Conclusion

This isn't a how-to, or install guide. There's plenty of good documentation to setup and use ZeroTier. I just wanted to echo the sentiment Martin voiced on the podcast (spoiler) that ZeroTier is a great product. It's easy to setup and administer, solves real problems, and doesn't get in the way.





