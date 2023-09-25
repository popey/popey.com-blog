+++
date = "2023-09-25T18:00:00+01:00"
title = "AMD GPU blob crashing"
slug = "2023/09/amdgpu-blob-crashing"
author = "Alan Pope"
tags = ['ubuntu', 'thinkpad', 'linux', 'amdgpu']
+++

My work computer is a ThinkPad Z13. It's on most of the time, including overnight and during the weekend. I'm one of those horrible people who like to just wiggle their mouse, unlock, and get working. I often leave a ton of windows open, so I quite like to sit down and start working without having to wait for boot up, and subsequent app launch. 

[![Uprecords](/blog/images/2023-09-25/uprecords.png)](/blog/images/2023-09-25/uprecords.png)

So when I arrive at my desk on a Monday and discover my GPU has crashed, that's a poor start to the week. The GPU crashing doesn't completely kill the machine, just my desktop session and all the applications that were open. 😭

I see this kind of thing in the output of `dmesg -Tw | grep amdgpu`.

```text
[Mon Aug 14 08:06:06 2023] [drm:amdgpu_job_timedout [amdgpu]] *ERROR* ring gfx_0.0.0 timeout, signaled seq=5346515, emitted seq=5346517
[Mon Aug 14 08:06:06 2023] [drm:amdgpu_job_timedout [amdgpu]] *ERROR* Process information: process Xorg pid 3456 thread Xorg:cs0 pid 3464
[Mon Aug 14 08:06:06 2023] amdgpu 0000:63:00.0: amdgpu: GPU reset begin!
```

I use Xorg instead of Wayland on my laptop. I've tried Wayland, but it's never been great for the software I use on a daily basis, and the hardware combination I'm using. I use two external monitors, attached via a USB-C docking thing. So my desk looks a bit like this.

[![ThinkPad Z13 with two external screens on](/blog/images/2023-09-25/on.jpg)](/blog/images/2023-09-25/on.jpg)

Although, more accurately, like this, when the GPU driver dies.

[![ThinkPad Z13 with two external screens off](/blog/images/2023-09-25/off.jpg)](/blog/images/2023-09-25/off.jpg)

This crash happened on a second Monday morning in succession. So I figured it was time to file a bug. I ran `ubuntu-bug linux` and followed the prompts. That got me a bug [2031289](https://pad.lv/2031289). 

Within a couple of days, I got a [reply](https://bugs.launchpad.net/ubuntu/+source/linux/+bug/2031289/comments/2) from [Juerg Haefliger](https://launchpad.net/~juergh) on the [Ubuntu Kernel Team](https://launchpad.net/~ubuntu-kernel-team) offering this suggestion.

> "There are some AMD FW updates in lunar-proposed linux-firmware 20230323.gitbcdcfbcf-0ubuntu1.6. Can you give that a try?"

It's [not a good idea](/blog/2021/02/dont-use-proposed/) to enable the proposed pocket. So instead, I just grabbed the deb via [packages.ubuntu.com](https://packages.ubuntu.com/lunar-updates/all/linux-firmware/download), then did the old `sudo apt install ./linux-firmware_20230323.gitbcdcfbcf-0ubuntu1.6_all.deb` dance to install it.

Four days later, the following Monday, I arrived at the office with all my fingers and toes crossed.

[![Launchpad comment](/blog/images/2023-09-25/success.png)](https://bugs.launchpad.net/ubuntu/+source/linux/+bug/2031289/comments/5)

Great success 🥳

Juerg followed up [asking](https://bugs.launchpad.net/ubuntu/+source/linux/+bug/2031289/comments/6) if we could close the bug. I left it until today, another Monday to make sure, then [confirmed](https://bugs.launchpad.net/ubuntu/+source/linux/+bug/2031289/comments/7). Bug closed! 

I'm awarding one hundred Internet points to Juerg for the quick and friendly bug interaction. Plus more points for doing the upload of that package in the first place, according to the [changelog](http://changelogs.ubuntu.com/changelogs/pool/main/l/linux-firmware/linux-firmware_20230323.gitbcdcfbcf-0ubuntu1.6/changelog).

As I understand it, what I have done here is update a binary blob of GPU firmware on my machine, in the hope that it fixed a crasher. I always understood that the bad, evil, horrible people at nVidia made nasty binary blobs, but the Godlike do-no-wrong people at AMD only made saintly open source stuff. 

Seems we still need that horrid non-free stuff, even for the "good" kind of GPU. I went looking for more info and found a [thread](https://www.reddit.com/r/Amd/comments/950g8r/will_we_be_able_to_game_anytime_soon_using_amd/e3qgqp3/) on Reddit (spit!) from the past, with a [post](https://www.reddit.com/r/Amd/comments/950g8r/will_we_be_able_to_game_anytime_soon_using_amd/e3ri7vu/) from an [AMD person](https://www.reddit.com/user/bridgmanAMD), explaining this situation.

[![Reddit comment](/blog/images/2023-09-25/reddit.png)](https://www.reddit.com/r/Amd/comments/950g8r/will_we_be_able_to_game_anytime_soon_using_amd/e3ri7vu/)

Today, I learned.

