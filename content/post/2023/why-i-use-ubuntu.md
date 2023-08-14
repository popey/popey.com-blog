+++
date = "2023-08-13T23:00:00-00:00"
title = "Why I use Ubuntu"
slug = "2023/08/why-i-use-ubuntu"
author = "Alan Pope"
tags = ['ubuntu', 'podcast', 'opinion']
+++

It's Sunday afternoon, and I'm cooking the family dinner, so I'm also listening to a podcast. I just listened to the latest [episode](https://linuxdowntime.com/linux-downtime-episode-78/) of [Linux Downtime](https://linuxdowntime.com/). In it, Amolith, Gary and Joe discuss why they use the Linux distributions they do. While the food cooks, I thought I'd take 20 minutes to bang out a blog post mulling why I (still) use Ubuntu.

However, this turned more into a bit of a trip down memory lane and certainly didn't get banged out in 20 mins. Sorry about that. Probably scroll to the bottom for the actual answers.

tl;dr:

* I like it
* It works
* Familiarity
* Security
* Software availability
* Consistency

## Previous Linux Distributions

I think I started exploring Linux in 1995 with a Caldera CD that came with a massive book. I had two computers at the time, a Pentium II 400Mhz, which replaced an aged OG Pentium 200Mhz that I used for noodling around with stuff like Linux.

I didn't switch full-time until around 2001. By then I'd started using Red Hat Linux. I used to get pretty annoyed with the 'RPM Hell' so when my good friend Hugo suggested I take a look at Debian which didn't have this problem, I was interested. 

I switched to Debian for a while. However, I got annoyed when kernel updates would break my Phillips webcam. The Philips webcam driver would require recompiling with each kernel update. I recall at the time the maintainer refused to allow it into Debian proper as it has some license questions. 

Again, my friend Hugo, from the local [Linux User Group](https://lug.org.uk/) suggested I look at Ubuntu, as they kept the pwc kernel driver in the distro, no recompilation needed by me. 

So I switched to Ubuntu around the start of 2005, enjoyed the experience, and have used it ever since, on whatever my primary device is.

## The elephant on the payroll

Some readers are likely aware that I've been a contributor to Ubuntu over the years, and have even worked for Canonical (the commercial sponsor (and owner of the trademarks) of Ubuntu). 

So some might say "Well, there's your answer, he's a shill for Canonical, and therefore that's the end of the question 'Why I use Ubuntu'". But I don't think that's everything - worth mentioning though. 

In 2006 I had a job where I 'enjoyed' almost no responsibilities and a lot of free time each day. I started answering Ubuntu technical support questions on [Launchpad Answers](https://answers.launchpad.net/~popey). I was (and still am) no 'core developer' or uber expert on Linux - or Ubuntu specifically. But I enjoyed answering those questions I could. 

In May 2007 there was an [Ubuntu Developer Summit](https://wiki.ubuntu.com/UDS-Sevilla) in Seville, Spain. I took a week off work and paid my own way to attend. It seemed like a good way to hang out with some of the friends I'd made in the Ubuntu community over the previous year.

I spent a lot of time in the Ubuntu community, taking on roles which had some level of responsibility. For a while I was on the Ubuntu Membership Board, the Local Community Council, and the Ubuntu Community Council. I'd also applied for a couple of jobs at Canonical but wasn't successful. Some say you need to apply for at least three or four roles at Canonical before you get offered one. That certainly felt like the case back then.

I enjoyed all of the community activity, but by 2011 I was spreading myself a bit thin, so stepped down from the volunteer roles which were taking too much of my brain capacity and energy.

Shortly after, in September 2011, I got a DM on IRC from Mark Shuttleworth (SABDFL) in which we discussed my going to work at Canonical. It took a little while - the recruiting process was a little slow (although nothing like the new hiring process), and I eventually started in November 2011. My first day was flying out to Florida for another Ubuntu Developer Summit.

Good times.

I left Canonical in April 2021, after nearly ten years. 

So yeah, Canonical and Ubuntu involvement represent nearly a decade of my long life. 

## Heterogenous environments

I don't *only* use Ubuntu though. I'm typing this blog post in Sublime Text on an Apple MacBook Air running OSX, for example. I also have a PC with Windows installed, so I can play my favourite games which don't work on Linux. But in general, on the whole, my main full-time computer has run Ubuntu. 

I use mainstream Android or Apple phones like anyone else. I've owned consoles from Microsoft and Nintendo. I also have Raspberry Pi running Raspbian. So I'm by no means a Free Software Foundation follower. I'm more of a pragmatic computer user. I use what's best for me and the situation at hand.

My current in-use hardware list is as follows:

| Device | Use | OS|
|--------|-----|---|
| ThinkPad Z13 | Work-supplied laptop | Ubuntu 23.04|
| Intel Hades Canyon NUC | Personal desktop "Gaming/Streaming" PC | Dual boot Windows 11 / Ubuntu 23.04|
| Apple M1 MacBook Air | Personal laptop | MacOS|
| Raspberry Pi | ADSB Radio | Raspbian |
| HP Microserver | Backups and stuff| Ubuntu 22.04 |
| Bitfolk VPS | Website| Ubuntu 18.04 (ahem)|

## Ok, but Y tho

### I like it

This is easily number one. I enjoy my computing experience when using Ubuntu. Whether it's just using the computer for usual human things, noodling with new software from source, or getting new hardware working. It's fun. I don't find Windows or MacOS fun, at all. They work, but they're not fun.

Admittedly Ubuntu isn't as fun as it used to be. I'm not sure if that's me getting old, jaded, or just the world right now. But it's changed in the last decade. Still, fun *enough* for me. :) 

### It works

My Ubuntu systems are reliable. They don't ever randomly break (much). I had one fun thing a while ago where an nvme disk in my desktop would randomly go read-only. Never quite figured that out. Reboot made it work again. 

But usually, I can boot my systems, and be pretty sure nothing broke while I was sleeping. That's important.

Ubuntu works basically the same way it has since 2004. There's a new version every six months, and a Long Term Supported release every two years. Some releases are better than others, but in general, on the whole, it works. What more can I need?

### Familiarity

I've been using Ubuntu now for eighteen years. I know (roughly) how it works. I am familiar with the release cadence and set my expectations accordingly. I can manage to upgrade from one release to another without the sky falling in. When something does go wrong, I'm able to fix it or find out how to. I rarely 'nuke and pave' a system, even if it seems beyond repair. 

### Security

I appreciate the Ubuntu Security Team at Canonical. I like that I'm running a distro which takes heed of CVEs, and publishes prompt security updates for critical packages. 

### Software availability

As Ubuntu is the most popular traditional`*` desktop Linux distribution, software availability is not a problem for me. 

`*` **Yes, the word "traditional" is doing some heavy lifting here. ChromeOS is clearly #1. Ubuntu is next. Whatever.**

If I need something over and above what's available in the Ubuntu repositories, there's the vast Snap and Flatpak repos and AppImages a-plenty. If something is super new, and not packaged anywhere, then I can just grab the source and build, where typically Ubuntu instructions are available, or guessable.

Getting software for *me* is not a problem. Other people getting software from trusted, reliable sources may be an issue that isn't completely solved yet, for sure. I don't have this issue `¯\_(ツ)_/¯`.

I don't ever find myself needing the absolute bleeding edge versions of software, typically. So rolling distros aren't for me. 

### Consistency

As you can see from my heterogenous list of devices, the majority run Ubuntu. So being able to try something on my laptop, and then be able to run the exact same command on my server, is pretty handy. Even though they all run different releases of Ubuntu, most of my systems are able to run the same software.

Sure, I could run any distro and then use something like distrobox to spin up Ubuntu containers. I don't need to though, that feels like a solution for someone-else's-problem, not mine.

## Why not Fedora, Arch, Debian, Pop!!!!?

Of any of those listed, I think Debian is the only one I'd go for if Ubuntu stopped existing. For obvious familiarity reasons. Given I used Debian before Ubuntu, going back to it would be pretty straightforward.

I'm sure Fedora and Arch are awesome, and everyone who uses them regularly says so. My experience has been different. 

I was put off Arch when I was deep in the Ubuntu community when people in the Arch IRC channels would 'raid' the Ubuntu channels just to troll us, and waste our time repeatedly. That honestly poisoned my thoughts of Arch. Yes, I'm aware that a few juvenile anonymous IRC users don't represent a distro. But that really tainted it for me. 

Also, whenever someone tells me that Arch never breaks, "You just have to read the blog". Uh, okay. No thanks. I'm not reading all the latest news about *any* other device I allow updates to. I'm not starting that nonsense in my fifties. 

Obviously, I have some history with Ubuntu, having started using it in my thirties, and I'm now in my fifties. Something has to have a very compelling reason for me to switch. RPM-Hell got me to switch from Red Hat, and missing drivers made me switch from Debian to Ubuntu. 

Nothing so far has been compelling enough to make me switch. 

## Reasons not to be cheerful

With all that said there are things about Ubuntu I'm not happy about.

* Adverts in the terminal are crass and always have been
* Canonical (on my watch) mishandled the migration from deb to snap of Chromium
* Canonical didn't listen to users on important issues like application startup performance and automatic updates
* Canonical have taken their eye off the ball with snaps, as *many* in the store are outdated or abandoned with no obvious commitment to fix this

All of those are Canonical problems, as in, people at Canonical are making these decisions and controlling these things.

I still use Ubuntu though. I still like Ubuntu itself, despite Canonical, and because of Canonical.



