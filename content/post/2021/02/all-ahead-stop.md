+++
date = "2021-02-16T12:00:00-00:00"
title = "All Ahead Stop"
slug = "2021/02/all-ahead-stop"
author = "Alan Pope"
tags = ['software', 'linux', 'ubuntu']
+++

Well, things have escalated in Ubuntu-land since the posts I made on [Monday](/blog/2021/02/dont-use-proposed/) and [Tuesday](/blog/2021/02/going-backwards/)! The Ubuntu archive for Hirsute (the in-development version which will become 21.04) has been temporarily [frozen](https://lists.ubuntu.com/archives/ubuntu-devel/2021-February/041385.html). 

It seems there's a rather knarly [bug](https://bugs.launchpad.net/ubuntu/+source/fakeroot/+bug/1915250) in the tools used to build packages, which is causing them to be "mis-built" - i.e. broken. I (and others) [noticed](https://forum.snapcraft.io/t/snapd-from-hirsute-proposed-wont-allow-snaps-to-run/22733) this over the weekend, via a breakage in `snapd` - the daemon which mediates the installation and running of snaps.

*record scratch*

Rewinding slightly on this cascade of disaster. It all started for me some weeks back when I saw a friend - Andrew Hayzen - mention that their hard disk (SSD) went "read only" i.e. unusable after a period of time on a Dell XPS running Ubuntu. For them, being the only disk in the computer, their work was a little hosed, and they had to reboot. Upon reboot it was okay, then failed again after some time. 

I'd seen some similar behaviour recently on my desktop NUC. I had a slightly different experience though. My desktop has two disks, and the one that went RO was not the boot disk, but my home. Still a problem, but the system still ran, and I could poke about, but wihout my home directory being available, it wasn't a whole *lot* of use, so I'd end up rebooting anyway. For Andrew it was more catastrophic as it was the only disk in the system. 

I'd thought it might be a hardware issue, or some weird driver glitch. I hadn't looked into it too much because it happened so infrequently, only often enough I'd remember, but not enough to really annoy me or lose data. When I saw Andrew mention it on Telegram my interest was piqued, and perhaps we were seeing the same issue. 

I agreed to file a bug, which was easier for me because my system still "worked" whereas his was basically unusable when the issue occured. So I filed [bug 1910866](https://pad.lv/1910866) from my desktop which was running Ubuntu 20.10 (Groovy Gorilla) at the time. Andrew [followed up](https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1910866/comments/4) with more information from his Ubuntu 20.04 LTS system. 

Kai-Heng Feng, one of the kernel engineers at Canonical, was on the case helping Andrew to find out where the problem was located. Unfortunately I wasn't able to trigger the bug as often as Andrew, so he took over providing debugging information to Kai-Heng. I found it fascinating to follow along the conversation on that bug (somewhat helplessly) as Andrew and Kai-Heng exchanged suggestions and progress. I think it's actually a great example of how to identify where in the kernel an error started happening. 

By the end of January there was a fix in place for the 5.8 kernel update, prepared by the kernel team. This closes out the issue for Andrew on 20.04, and for anyone on 20.10 too. However, in the meantime, I decided to upgrade to Ubuntu Hirsute - 21.04 to-be. I figured it might be fun to run the very latest of everything prior to the new release in April. We're not compelled to do that in Canonical, but it's a good idea for as many people to run the development release as possible, and still do their job.

Then it hit me again on Sunday 14th February. I was on Hirsute with the 5.8 kernel, and had the dreaded "read-only" disk.

```shell
alan@robot:~$ touch foo
touch: cannot touch 'foo': Read-only file system
```

Ugh!

I was on kernel 5.8.0-38-generic, but the bug was fixed in 5.8.0-41.46, on 20.10 and 20.04 LTS. So it looks like I don't have the fix, on the (admittedly unsupported) development release. I had a brief chat with Andrew and captured some data, in case it might be useful for debugging. However we thought maybe it was better to jump to the 5.10 kernel which was being prepared in Hirsute. 

Now, at this point the 5.10 kernel was baking in the `proposed` pocket. See ["Don't Use Proposed"](/blog/2021/02/dont-use-proposed/) from Monday for why that's important. 

A hypothetical conversation went a bit like this, late on Sunday night - valentines day. Andrew and I know how to have a romantic night.

> Alan: I'm enabling proposed like a mad man and rebooting

> Andrew: lol

An hour later...

> Alan: Well, updating and rebooting didn't go well...

> Andrew: ruhroh

After rebooting to the 5.10 kernel I'd got from `proposed` (along with like, a *bazillion* other updates) the desktop came up fine, but half my desktop apps wouldn't launch. Unsurprisingly, many of the applications I rely on are packaged as snaps. Yeah, shocking, I know.

This is what happens with every snap launched:

```shell
alan@robot:~$ discord
need to run as root or suid
```

I started a [thread](https://forum.snapcraft.io/t/need-to-run-as-root-or-suid-on-all-snaps/22745) on the snapcraft forum, thinking this was a problem with something in Ubuntu Hirsute. 

Thankfully it was Sunday evening and I could change gear (lulz) and focus on more important things for a bit - [losing](https://www.youtube.com/watch?v=ZhD5aIuTN8A) at Hotshot Racing with my friends.

The forum thread was updated and it turned out I was [not](https://forum.snapcraft.io/t/snapd-from-hirsute-proposed-wont-allow-snaps-to-run/22733) alone. It seems there was a [known](https://bugs.launchpad.net/ubuntu/+source/fakeroot/+bug/1915250) issue with the snapd package in `proposed` on Hirsute. 

Well, it turns out this is a [wider issue](https://bugs.launchpad.net/ubuntu/+source/fakeroot/+bug/1915250) and not just limited to snapd. 

Thankfully xnox [provided](https://forum.snapcraft.io/t/snapd-from-hirsute-proposed-wont-allow-snaps-to-run/22733/12?u=popey) this useful advice:

*Enabling devel-proposed is not supported at all, as devel-proposed during release development is not meant for human consumption.*

Which is what led me to [Monday](/blog/2021/02/dont-use-proposed/) and [Tuesday](/blog/2021/02/going-backwards/), and now the archive being [frozen](https://lists.ubuntu.com/archives/ubuntu-devel/2021-February/041385.html).

Lesson learned. Don't use proposed. :)