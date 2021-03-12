+++
date = "2021-03-12T12:00:00-00:00"
title = "The Old Desktop Switcheroo"
slug = "2021/03/the-old-desktop-switcheroo"
author = "Alan Pope"
tags = ['podcast', 'ubuntu']
+++

In August 2019, I [tweeted](https://twitter.com/popey/status/1158884858694897669) about how I'd been running KDE Neon for eighteen months, since February 2018, and how I was switching back to GNOME Shell on my primary laptop. In that thread I also [suggested](https://twitter.com/popey/status/1158884873769226241) I might switch back!

{{< rawhtml >}}
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Today I&#39;ve in-place upgraded from that 18.04 KDE Neon install to <a href="https://twitter.com/ubuntu?ref_src=twsrc%5Etfw">@ubuntu</a> 19.04 with <a href="https://twitter.com/gnome?ref_src=twsrc%5Etfw">@gnome</a>. I still love KDE of course, and will likely switch back at some point, or may install it on another machine - maybe my Thinkpad X220. But for now, I&#39;ve decided to have a play with GNOME.</p>&mdash; Alan Pope 🍺🐧🐱🇬🇧🇪🇺 (@popey) <a href="https://twitter.com/popey/status/1158884873769226241?ref_src=twsrc%5Etfw">August 6, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
{{< /rawhtml >}}

Well, I had a "play" with GNOME on my primary machine since then and another ~eighteen months have elapsed. I'm getting itchy eyeballs again, so today I issued the following command on my primary desktop and switched back the other way:


```bash
$ sudo apt install kubuntu-desktop^
```

A quick reboot and I'm back on KDE Plasma - A.K.A. "[Kubuntu](https://kubuntu.org/)", from the Ubuntu Hirsute (to be 21.04, soon) archives. 

One thing I really love about Ubuntu, is the diversity of packages in the archive. I didn't need to wipe and re-install, just tell `apt` to install one package (or task in this case), go and grab a coffee and it's mostly done. I think I had one question to answer during the install about whether I wanted to keep `gdm3` or switch to `sddm`, I chose the latter.

Once rebooted I was able to fiddle around a bit with defaults like the theme - Breeze Dark - default terminal font in Konsole - [IBM Plex Mono](https://www.ibm.com/plex/), and move the launcher to the correct location on the left.  I also fiddled around with some of the default keyboard shortcuts, as that muscle memory is well ingrained. That's mostly it!

[![Desktop](/blog/images/2021-03-12/desktop.png)](/blog/images/2021-03-12/desktop.png)

I still have all the same applications installed, most of which are 3rd party. I think the only GNOME applications I use reguarly are Calculator, Gedit and Rhythmbox. I suspect I'll switch to the KDE equivalents over time. I added a widget called [plasma-pstate](https://github.com/jsalatas/plasma-pstate) (bottom left in the above screenshot) to manage processor profiles. 

So far, so excellent. I'm loving this release of Plasma. I look forward to 18 months (*or more*) on KDE. We'll see!