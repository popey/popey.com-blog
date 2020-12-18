+++
date = "2017-05-01T15:22:25-07:00"
title = "OpenSpades Snap - pew pew"
slug = "2017/05/openspades-snap-pew-pew"
tags = ['ubuntu', 'snap', 'gaming']
+++


[OpenSpades](http://openspades.yvt.jp/) is a super-fun "Open-Source Voxel First Person Shooter". I've been playing it for a while both on my [GameOS](https://www.microsoft.com/en-gb/windows) desktop and under WINE on Linux. For whatever reason the upstream [OpenSpades on github](https://github.com/yvt/openspades) project had no Linux builds available for download, and I was lazy so I used WINE, which worked just fine.

This weekend though I decided to fix that. So I made a [snap](http://snapcraft.io/) of it and pushed it to the store. If you're on a Linux distro which [supports snaps](https://snapcraft.io/docs/core/install) you can install it with one command:-

    snap install openspades

That will install the current [stable release of openspades](https://github.com/yvt/openspades/releases) - 0.1.1c. If you'd rather test the latest github master build (as of yesterday) then use:-

    snap install openspades --edge

*Note*: OpenSpades needs a fairly decent video card. My poor Thinkpad T450 with its integrated Intel GPU isn't up to the job, so the game switches to software rendering. However on my more beefy nVidia-powered desktop, it uses the GPU for OpenGL funky stuff. 

![OpenSpades on Ubuntu](/blog/images/2017-05-01/ubuntu.png)

I tested this build on Ubuntu 16.04, Debian 9, elementary OS Loki, Lubuntu (i386), Fedora 25 and OpenSUSE Tumbleweed. One snap(*), lots of distros. Yeah baby! :D

![OpenSpades on OpenSUSE Tumbleweed](/blog/images/2017-05-01/opensuse.png)

![OpenSpades on Fedora 25](/blog/images/2017-05-01/fedora.png)

![OpenSpades on Debian 9](/blog/images/2017-05-01/debian.png)

(*) Technically four snaps. One per arch (32/64-bit) and one per release (stable/edge).

I [proposed my changes](https://github.com/yvt/openspades/pull/612) upstream to the OpenSpades project.

I used [Launchpad](http://launchpad.net/) to build the binaries for stable and edge on both i386 and amd64 architectures, for free. Thanks [Canonical](http://canonical.com/)!

I had to do a couple of interesting things to make OpenSpades work nicely across all these systems. I bundled in a few libraries, and wrapped the launching of the game in a script which sets up some environment variables. I just copy and pasted that part from other projects I've done in the past.

The only slightly kludgy thing I did was copy the Resources directory into a writable directory and modify the default configuration for first-launch. OpenSpades has an 'update check' feature which looks for game updates online, but it seems to me this doesn't work on Linux - probably due to there being no binary builds currently available. So rather than the user getting prompted to enable this feature, I enabled it by default, so the user just gets a notification that they're on the latest version, rather than being asked to enable a feature that won't work anyway. With snaps the user will get an update as soon as it's pushed to the store, so no need for the in-app update mechanism I think.

I also had to disable [EAX](https://en.wikipedia.org/wiki/Environmental_Audio_Extensions) (positional audio) because it crashes OpenAL on the i386 builds. Players on AMD64 systems can of course just re-enable this, as it's only the default I set, not permanently off. I might modify this default so it's only disabled on i386 builds in future.

So if you're in need of something fun to play on your Linux system. Give OpenSpades a try, and let me know if you get any problems with the snap!

Pew pew!
