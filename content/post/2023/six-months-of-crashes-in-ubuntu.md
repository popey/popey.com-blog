+++
date = "2023-08-28T09:00:00-00:00"
title = "Six months of crashes in Ubuntu"
slug = "2023/08/six-months-of-crashes-in-ubuntu"
author = "Alan Pope"
tags = ['ubuntu', 'linux', 'crash', 'whoopsie']
+++

tl;dr: I downloaded the application crash data for my work Laptop. To probably nobody's surprise, Zoom is the most crashy thing in the last six months on my laptop.

## New laptop

When I joined [Axiom](https://axiom.co/) at the end of 2022, I was given some budget to buy a work laptop. My friend and co-presenter of [Linux Matters Podcast](https://linuxmatters.sh), [Martin Wimpress](https://wimpysworld.com/) was looking for a new company laptop around the same time. He [wrote up](https://wimpysworld.com/posts/why-i-chose-the-thinkpad-z13-as-my-linux-laptop/) his thoughts on why he chose a ThinkPad Z13, and we discussed it on [episode 1](https://linuxmatters.sh/1/) of the podcast, back in April. 

I'm lazy, and trust Martin's evaluation of the options. So, I also bought a ThinkPad Z13. However, unlike Martin, I bought the one with a higher-resolution touch-screen. It's a pretty gorgeous device.

[![ThinkPad Z13!](/blog/images/2023-08-28/z13_1.jpeg)](/blog/images/2023-08-28/z13_1.jpeg)

## OOTB

I ordered directly from Lenovo and selected to have Ubuntu pre-installed. Gotta show support to these Linux laptop vendors, y'know. It arrived with Ubuntu 20.04 LTS installed. I upgraded from 22.04 LTS through 22.04 LTS, then onwards to 22.10 and finally 23.04. I've been running Ubuntu 23.04 for some months now. 

## Whoopsie

I've [previously](https://popey.com/blog/2021/03/finding-ubuntu-crash-reports/) [written](https://popey.com/blog/2021/02/a-tale-of-two-updates/) about the Ubuntu crash reporting system and why I think it's a valuable resource for the developers. Users have mixed opinions on the familiar crash dialog.

![Whoopsie!](/blog/images/2021-02-24/whoopsie.png)

Some users even resort to switching the entire thing off. Each to their own. I leave it switched on, but the crash reporter rarely appears on screen as I've told my system to "Remember this in future." The crash reports silently get submitted in the background.

## Who died?

I was recently curious about what had crashed in the last six months or so that I've been using the laptop. So I went digging. If you're running Ubuntu, you could do the same and see what's crashing for you. It might be enlightening. Or it might just reinforce already-existing beliefs that a particular culprit will feature in the list.

I wrote up how to find historical crash reports in my post [finding ubuntu crash reports](https://popey.com/blog/2021/03/finding-ubuntu-crash-reports/).

`xdg-open https://errors.ubuntu.com/user/$(sudo cat /var/lib/whoopsie/whoopsie-id)`

You should be taken to a web page similar to this, but with your crash reports. 

Note: This image is old crash data from a previous blog post, not from my current machine.

[![Crashes](/blog/images/2021-03-07/crashes.png)](/blog/images/2021-03-07/crashes.png)

If there's none then you're either very lucky, or you probably turned off the crash reporting tool.

## Leaderboard

I copied the data into a spreadsheet, generated a chart and here's the result. 

[![Crashes](/blog/images/2023-08-28/crashes.png)](/blog/images/2023-08-28/crashes.png)

Here's that data in tabular form

|Application|Crashes|
|--------|-----|
|zoom	|7|
|microsoft-edge-stable	|6|
|discord	|4|
|bottom	|4|
|gnome-shell	|3|
|gjs	|3|
|code	|3|
|xserver-xorg-core	|2|
|wireplumber	|2|
|kdenlive	|2|
|xwayland	|1|
|xdg-desktop-portal-gnome	|1|
|slack-desktop	|1|
|screen-slayer	|1|
|packagekit	|1|
|kwin-x11	|1|
|kio	|1|
|gnome-settings-daemon	|1|
|gamin	|1|
|fontconfig-config	|1|
|apport-gtk	|1|
|/usr/lib/x86_64-linux-gnu/libexec/drkonqi	|1|
|/usr/bin/xembedsniproxy	|1|
|/usr/bin/gmenudbusmenuproxy	|1|

## Good or bad

In an ideal world, none of these applications would crash. But the software is complex, and my laptop setup and usage probably differ from developers of these applications in such a way they didn't or cannot test.

What is a little curious is there are sometimes multiple crashes within the same minute. Possibly due to me re-launching the application immediately after it dies, whereupon it crashes again. Not sure about this. Maybe it's a bug in the crash reporter.

### Zoom

|Occurred	|Received|	Problem Type|	Program|
|--------|-----|--|--|
|2023-08-09 15:08	|2023-08-09 14:08 UTC	|Crash	|zoom|
|2023-08-03 20:08	|2023-08-03 22:08 UTC	|Crash	|zoom|
|2023-08-03 20:08	|2023-08-03 19:08 UTC	|Crash	|zoom|
|2023-08-01 22:08	|2023-08-01 21:08 UTC	|Crash	|zoom|
|2023-07-20 15:07	|2023-07-20 17:07 UTC	|Crash	|zoom|
|2023-07-17 17:07	|2023-07-17 16:07 UTC	|Crash	|zoom|
|2023-03-16 23:03	|2023-03-17 02:03 UTC	|Crash	|zoom|

I'm somewhat surprised the Zoom number isn't higher, as it feels like the application crashes daily for me. 

At [work](https://axiom.co/) we use a mix of Slack huddles for internal small meetings, and Zoom for 'all company' and external conversations. Previously we used Discord quite a bit for calls, but we don't so much anymore. Maybe our use of Slack is helping me not experience these Zoom blunders.

Zoom crashes for me when I switch workspace while a call is happening, and someone is sharing their screen. Zoom minimizes down to a little window on my new workspace. When I try and pop that back out to a big window, Zoom dies. It's somewhat random, but has happened enough that I do my best not to switch workspaces during calls. 

### Edge

|Occurred	|Received|	Problem Type|	Program|
|--------|-----|--|--|
|2023-06-29 17:06	|2023-06-29 16:06 UTC	|Crash	|microsoft-edge-stable|
|2023-05-01 13:05	|2023-05-01 12:05 UTC	|Crash	|microsoft-edge-stable|
|2023-04-26 11:04	|2023-04-26 11:04 UTC	|Crash	|microsoft-edge-stable|
|2023-04-26 10:04	|2023-04-26 09:04 UTC	|Crash	|microsoft-edge-stable|
|2023-01-18 01:01	|2023-02-17 14:02 UTC	|Crash	|microsoft-edge-stable|
|2023-01-31 12:01	|2023-02-17 14:02 UTC	|Crash	|microsoft-edge-stable|

I use Microsoft Edge as my primary browser. Sure, other browsers are available, but this is the one I use. I'm not sure if these crashes are the browser itself or just extensions/plugins. I'm sure we all abuse our browsers a little bit. Given I have tons of tabs open, and a bunch of extensions, I am inclined to forgive these crashes. 

### Discord

|Occurred	|Received|	Problem Type|	Program|
|--------|-----|--|--|
|2023-05-12 13:05	|2023-05-12 13:05 UTC	|Crash	|discord|
|2023-05-12 13:05	|2023-05-12 12:05 UTC	|Crash	|discord|
|2023-04-19 09:04	|2023-04-19 08:04 UTC	|Crash	|discord|
|2023-02-08 21:02	|2023-02-17 14:02 UTC	|Crash	|discord|

I don't know what's going on here as I don't consider myself a 'power' Discord user but have it open all day. I do sometimes notice it's not running anymore. 

I don't think there's any particular trigger I've seen to cause it.

### Bottom

First of the open source applications, [bottom](https://github.com/ClementTsang/bottom) is (like top) a system resource monitor. Here it is in action, in case you've not seen it before.

[![bottom](/blog/images/2023-08-28/bottom.png)](/blog/images/2023-08-28/bottom.png)

|Occurred	|Received|	Problem Type|	Program|
|--------|-----|--|--|
|2023-04-26 11:04	|2023-04-26 10:04 UTC	|Crash	|bottom|
|2023-04-26 10:04	|2023-04-26 09:04 UTC	|Crash	|bottom|
|2023-04-04 16:04	|2023-04-04 16:04 UTC	|Crash	|bottom|
|2023-02-07 17:02	|2023-02-17 14:02 UTC	|Crash	|bottom|

Last year, before these crash reports, I was able to reliably trigger crashes in bottom. I filed an [issue](https://github.com/ClementTsang/bottom/issues/773), which was promtly addressed by the upstream developer. I imagine if I was able to trigger these myself, I'd be able to engage upstream again.

## Conclusion

I'm not really surprised at Zoom and Edge being at the top of the list. They're two complex and chonky applications that I use daily. I presume (but haven't researched) that both of these applications can report upstream when crashes occur. 

I have no idea why all the various GNOME and KDE internal gubbins crash. Those things don't appear to have adversely affected me in any way that I recall.

I assume someone at Canonical is still regularly looking at the highly ranked errors bubbling up on [errors.ubuntu.com](https://errors.ubuntu.com/). Ideally they should be turned into bug reports either within Ubuntu or within the upstream projects (or both), and resolved. 

[![errors.ubuntu.com](/blog/images/2023-08-28/errors.png)](/blog/images/2023-08-28/errors.png)

In my experience, these crash reports have been useful for developers but perhaps less so for us end-users. I'll still keep this feature turned on though as I think it's a worthwhile set of data.

An honorable mention must go to the crash on 18th January when `apport-gtk` crashed. The crash reporting tool crashed. Wonderful.