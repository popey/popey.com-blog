+++
date = "2021-02-14T12:00:00-00:00"
title = "Don't Use Proposed"
slug = "2021/02/dont-use-proposed"
author = "Alan Pope"
tags = ['software', 'linux', 'ubuntu', 'danger']
+++

This is a short and sweet post to remind *future me* (and anyone else reading) not to use the "proposed" pocket of the Ubuntu Archive, if you want a bug-free and safe experience. 

For those not "in the know", each Ubuntu release has a bunch of pockets. If you've ever fiddled with your `sources.list` you may have seen the names `updates`, `backports`, `security` and `proposed`. These are usually prefixed with the codename of the release, such as `hirsute-updates` and `hirsute-proposed` for the current in-development version of Ubuntu, to become the interim release 21.04.

A typical `sources.list` might look like this:

```shell
deb http://archive.ubuntu.com/ubuntu/ hirsute main restricted universe multiverse
deb-src http://archive.ubuntu.com/ubuntu/ hirsute main restricted universe multiverse

deb http://archive.ubuntu.com/ubuntu/ hirsute-updates main restricted universe multiverse
deb-src http://archive.ubuntu.com/ubuntu/ hirsute-updates main restricted universe multiverse

deb http://archive.ubuntu.com/ubuntu/ hirsute-backports main restricted universe multiverse
deb-src http://archive.ubuntu.com/ubuntu/ hirsute-backports main restricted universe multiverse

deb http://security.ubuntu.com/ubuntu hirsute-security main restricted universe multiverse
deb-src http://security.ubuntu.com/ubuntu hirsute-security main restricted universe multiverse
```

Where `hirsuite` is the `release` pocket (where the word `release` is actually omitted) and contains the packages in the archive at the point of release, so for hirsute that would be the snapshot as at the end of April 2021 on release day. The `updates` pocket contains newer versions of packages, which supercede the packages in the `release` pocket. So when bug fixes and other enhancements land, users get them via this pocket.

The `backports` pocket can contain packages which exist in a future (from our perspective) version of Ubuntu, but have been "backported" to work on this "older" release. Not much goes in here, I think because it's a bit of a headache to maintain, and the workload is already enough keeping everything else updated without backporting everything!

The `proposed` pocket is tha dangerzone here. The way I understand it, software which has been updated, lands in the `proposed` pocket *before* it lands in `updates`. This is so the person reporting a bug, or experiencing an issue, can install the update before it goes to the wider public userbase. If they report it works (via the Stable Release Updates (SRU) process) then it may migrate from `proposed` to `updates` and that update phases out to the userbase. The thing about `proposed` is that it's inherently untested, that's the point of it. 

The `proposed` pocket can also be used as a staging area. If there's a bunch of packages which need to land together, but take a long time to prepare and compile, they can be staged in `proposed`. Then, when ready, they can en-masse be copied to the `updates` pocket together. This prevents "archive skew" and unresolvable dependencies when these large changes occur.

It's generally a bad idea to enable `proposed` on any system. So don't do it. If you are instructed to in a bug report, the best thing might be to enable it, install the specific updates package you're interested in, then disable the pocket again, so you don't get extra surprises on your system.

Today I am running Ubuntu Hirsute and foolishly enabled the `proposed` pocket. This pulled in an untested release of a critical package. Good work, popey! So I had to faff about a bit to debug and fix it. The reason I enabled the pocket was to get an early look at kernel 5.10 on Ubuntu Hirsute. My system seems to behave badly on 5.8, so I thought as 5.10 was "on the way" I could grab it. However, the stupid thing was, I added `proposed` (because that's where 5.10 is baking) and upgraded all packages. Not just the kernel. Silly me.

So, this is a reminder to future popey! Don't do a popey. That is all. 