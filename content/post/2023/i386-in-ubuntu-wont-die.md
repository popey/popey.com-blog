+++
date = "2023-08-27T07:00:00-00:00"
title = "i386 in Ubuntu won't die"
slug = "2023/08/i386-in-ubuntu-wont-die"
author = "Alan Pope"
tags = ['ubuntu', 'linux', 'ubiquity', 'subiquity', 'steam']
+++

(yet)

**tl;dr** In a recent [thread](https://fosstodon.org/@that_leaflet/110950714518054456) on Mastodon, it was revealed that Ubuntu 23.04 users can't install the Steam deb package from the Ubuntu archive without jumping through some technical hoops. It turns out this was a [mistake](https://mastodon.social/@vorlon/110958106498930456), a [bug](https://bugs.launchpad.net/subiquity/+bug/2033170) was filed, and future builds shouldn't have this problem. 

It's not immediately apparent whether the (currently 'broken') ISO images for Ubuntu 23.04 will be rebuilt (unlikely) or if this will stay broken in 23.04, and users will need to 'cope'.

To check if you're affected in Ubuntu 23.04 on a 64-bit (x86_64) installation, run this command:

`arch && dpkg --print-foreign-architectures`

If the result is as follows, you're all fine:

```bash
x86_64
i386
```

If you only get `x86_64` returned, then run this command to re-add i386 support:

```bash
sudo dpkg --add-architecture i386
sudo apt update
```

Alternative fix, install the Steam deb from [Valve](https://store.steampowered.com/about/), not the Ubuntu version. Read on... 

## Background

In 2019, at an internal company product sprint, a proposal was made to remove i386 support from Ubuntu. This was the culmination of [plenty](https://web.archive.org/web/20190701115957/https://bryanquigley.com/pages/papers/ubuntu-drop-i386.html) of discussion. This step would go beyond simply removing the 32-bit x86 ISO images from the build system. It meant no longer even building any i386 deb packages at all. This was [announced](https://lists.ubuntu.com/archives/ubuntu-announce/2019-June/000245.html) a little while later, in June. 

There was some [internal](https://discourse.ubuntu.com/t/results-of-testing-3rd-party-applications-on-64-bit-only-eoan-19-10/11353) and much [external](https://twitter.com/Plagman2/status/1142262103106973698) pushback, so a new path forward was charted and [announced](https://canonical.com/blog/statement-on-32-bit-i386-packages-for-ubuntu-19-10-and-20-04-lts). The reason for pushback is that removing i386 packages from the archive would impact the ability to easily install and run 32-bit software on a 64-bit x86 install. 

Steam - the game store/launcher from Valve requires a bunch of 32-bit libraries to function. Many of the games that Steam installs also require many of these various libraries. These older games are likely never going to get updated to have 64-bit clean builds. 

Game developers often move on from completed projects and do not typically re-visit an old codebase to add support for new architectures. The exception to this is when they add support for new devices (e.g. Nintendo Switch), which have a potential monetary reward via increased sales. In addition, Valve considers every game as sacred, and once purchased, should (in theory) always be runnable by the customer. It's an admirable goal. Ubuntu without i386 would break that.

Steam isn't the only consumer of 32-bit i386 packages on desktop Linux. Plenty of other pieces of software such as WINE only work when 32-bit libraries are installed on a 64-bit system. Steam just happens to be a widely installed and used example.

## Alternate path

Canonical heard the feedback. They decided the Ubuntu project would [crowdsource](https://discourse.ubuntu.com/t/community-process-for-32-bit-compatibility/12598) an 'allowlist' of i386 deb packages, which would continue to be built and provided in the Ubuntu archive. The list was pulled together, and now Launchpad (the Ubuntu build system) ensures those specific i386 packages exist in Ubuntu.

While not perfect, this satisfied the needs of most. Gamers could still install Steam and their favourite games from the past. That assumes the package manager `dpkg` had `i386` configured on the host system as a "foreign architecture".

## New installer

With some [fanfare](https://ubuntu.com/blog/how-we-designed-the-new-ubuntu-desktop-installer), recent releases of Ubuntu ship with a brand-new Flutter-based installer. The older, Python-based [Ubiquity](https://wiki.ubuntu.com/Ubiquity) installer has been around a long while and has been kept going with sticky tape and twine for years. 

It seems 32-bit support on the installed image was inadvertently [overlooked](https://bugs.launchpad.net/subiquity/+bug/2033170/comments/3) by the foundations team. No problem, mistakes happen, and now this bug in the process of being fixed. 

## Eyes off the ball

I find it a little surprising nobody reported this before, given it's been a problem since the 23.04 release in April this year. Personally, I didn't notice, because on my 23.04 laptop, I'd upgraded from an older release, which would already have had the i386 'foreign' architecture enabled. 

I have done a clean install of 23.04 on my desktop very recently. It's possible on my recently installed desktop PC, I just knew how to fix it, and did it. But I don't find the `dpkg` incantation in my `bash` history. Also, I installed Steam from the [Valve](https://store.steampowered.com/about/) website, not the Ubuntu archive version. 

I wondered if perhaps the upstream Steam deb magically adds the 32-bit architecture in the background during installation.

***Narrator: It does.***

```bash
$ wget https://cdn.cloudflare.steamstatic.com/client/installer/steam.deb
$ dpkg -x steam.deb steam/
$ grep -r "add-architecture" steam/*
steam/usr/lib/steam/bin_steamdeps.py:        cp = run_subprocess(['dpkg', '--add-architecture', 'i386'])
``` 
Ok, so this only affects people who try to install Steam from the archive using `apt`, it seems. 

## Assume good intent

If the Steam deb shows as 'unavailable' because the i386 architecture is not present, then alternatives might be shown to the user. 

One alternative is the [Steam snap](https://snapcraft.io/steam) package. I haven't tested, but in theory, the snap would not be affected by this issue, as the package bundles necessary libraries rather than depending on the host having them installed.

The thread on Mastodon brought up an expected thought process, though. The conspiracy theory-minded might (reasonably) think ***"This is Canonical breaking the deb, so you're forced to use the snap"***. But that [doesn't](https://mastodon.social/@vorlon/110958106498930456) appear to be the case. 

It's just a simple mistake that is fixed, and now (a selected set of) i386 packages will be easily accessible again.

Until the next time... 