+++
date = "2020-12-27T12:00:00-00:00"
title = "Double Your Network Speed with This One Trick"
slug = "2020/12/double-your-network-speed-with-this-one-trick"
author = "Alan Pope"
tags = ['hardware', 'tp-link', 'ethernet', 'rtfm']
+++

The trick: Read the manual.

I pay for 100Mb/s downstream Internet connection at home. For months I've been getting around 50Mb/s at my desk, and 100Mb/s over wifi on my phone, under optimal conditions. Here's how I 'fixed' the 'slow' Internet (essentially LAN speed) connection at my desk.

I use a bunch of TP-LINK "Powerline" adapters around the house to get wired networking to each room. 

*"Well, that's your first problem, Alan."*

Yeah, yeah, I know that they're not perfect, and I could get a faster WiFi access point, and flood the house with Cat 6 Ethernet cable. But I haven't, I use PowerLine adapters. I am where I am.

I have a combination of this [TP-Linux TL-PA8010PKIT 1200](https://geni.us/iu86k) Powerline starter kit, with some extra [TP-Link TL-PA8010KIT](https://geni.us/YOYG) ones too. Note the main difference being the former have pass-through sockets for our [glorious](https://www.youtube.com/watch?v=UEfP1OKKz_Q) 3-pin plugs, and the latter don't.

So the network at home is basically like this:

```
( Internet )
 └ Cable modem (onboard WiFi disabled)
  └ WiFi Router
   └ Power Line Adapter (attached to wall outlet)
```
Then at the other, opposite and of the house, on another floor:
```
PowerLine Adapter (attached to 6-way power strip)
 └ 1GiB Switch
  └ Desktop PC
```

I've had this setup for months, maybe even years actually. My Amazon purchase history shows I bought these TP-Link devices back in March 2017! Ever since, I've been thinking "Ah well, we all know powerline adapters aren't great, and you never get the bandwidth they advertise".

A little over a month ago, I started to question this, and wondered why I really was getting poor bandwidth in my office. I went through some effort to download and firmware update every one of the 6 TP-Link devices, to see if there was a software update in the intervening 3 years since purchase which may have helped. Nope, not that.

I resigned myself to having to always having poor Internet in my office. Then a couple of months back, [Joe](https://joeress.com/) mentioned to me that I had background noise on my audio recordings. For those not in the know, Joe is a podcast producer and audio expert of some repute. He has for over a year now, been receiving recordings made on my PC and turning them into [various](https://thenew.show/) [podcasts](https://ubuntupodcast.org/), so he's heard a *lot* of audio from my PC over the last year.

I didn't realise I had this background noise, so recorded some "silence" in Audacity, then cranked the volume up to hear it. Eeek! It's awful, electronic static-like noise. I spent ages trying to figure out where it was coming from. I moved my mixer, re-arranged wiring on my desk, updated software, then it struck me. Perhaps the audible noise was related to the poor network connection.

**Narrator:** It was.

You may have spotted the problem earlier in my awesome 'network diagram' above. Simply moving the powerline adapter from the 6-way extension lead, to being plugged directly into the wall fixed both problems. So it now looks like this.

```
PowerLine Adapter (attached to wall outlet)
 └ 1GiB Switch
  └ Desktop PC
```

I now get "full beans" Internet in my office. Hurrah.

![Zoom zoom zoom](/blog/images/2020-12-27/fast.png)

The moral of this story: [RTFM](https://en.wiktionary.org/wiki/RTFM). I have long known that powerline adapters work better when plugged directly into the wall outlet, but completly let that slip when debugging the problem. 

I feel very silly, obviously. But it's fixed now, so that's okay. 
