+++
date = "2023-11-03T13:00:00+02:00"
title = "Ubuntu Core Snapdeck"
slug = "2023/11/ubuntu-core-snapdeck"
author = "Alan Pope"
tags = ['NaBloPoMo', 'ubuntu', 'core', 'snap', 'steamdeck']
+++

At the Ubuntu Summit in Latvia, Canonical have just announced their plans for the Ubuntu Core Desktop. I recently played with a preview of it, for fun. Here's a nearby computer running it right now.

[![Ubuntu Core Desktop Development Preview on a SteamDeck](/blog/images/2023-11-03/snapdeck.jpg)](/blog/images/2023-11-03/snapdeck.png)

Ubuntu Core is a *"a secure, application-centric IoT OS for embedded devices"*. It's been around a while now, powering IoT devices, kiosks, routers, set-top-boxes and other appliances. 

Ubuntu Core Desktop is an immutable, secure and modular desktop operating system. It's (apparently) [coming](https://www.omgubuntu.co.uk/2023/05/immutable-all-snap-ubuntu-desktop) to a desktop near you next year.

In case you weren't aware, the [SteamDeck](https://www.steamdeck.com/) is a portable desktop PC running a Linux distribution from Valve called "SteamOS".

As a tinkerer, I thought "I wonder what Ubuntu Core on the SteamDeck looks like". So I went grubbing around in GitHub projects to find something to play with. 

I'm not about to fully *replace* SteamOS on my SteamDeck, of course, at least, not yet. This was just a bit of fun, to see if it worked. I'm told by the team that I'm likely the only person who has tried this so far.

Nobody at Canonical asked me to do this, and I didn't get special access to the image. I just stumbled around until I found it, and started playing. You know, for fun.

Also, obviously I don't speak for Canonical, these are my own thoughts. This also isn't a how-to guide, or a recommendation that you should use this. It isn't ready for prime time yet.

## Snaps all the way down

Let's get this out of the way up front. Ubuntu Core images are all about snaps. The kernel, applications, and even the desktop itself is a snap. Everything is a snap. Snap, snappity, snap snap! 🐊

So it has the features that come with being snap-based. Applications can be automatically updated, reverted, multiple parallel versions installed. Snaps are strictly confined using container primitives, seccomp and AppArmor.

This is not too dissimilar to the way many SteamDeck users add applications to the immutable SteamOS install. On SteamOS they use Flatpak, whereas on Ubuntu Core, Snap is used.

They achieve much the same goal though. A secure, easily updated and managed desktop OS.

## Not ready yet

The image is currently described as *"Ubuntu Core Desktop Development Preview"*. 

Indeed the wallpaper makes this very clear. Here be dragons. 🐉

[![Ubuntu Core Desktop Development Preview wallpaper](/blog/images/2023-11-03/wallpaper.png)](/blog/images/2023-11-03/wallpaper.png)

This is not ready for daily production use as a primary OS, but I'm sure some nerds like me will be running it soon enough. It's fun to play with stuff like this, and get a glimpse of what the future of Ubuntu desktop might be like.

I was pleasantly surprised that the developer preview exceeded my expectations. Here's what I discovered. 

## Installation

I didn't want to destroy the SteamOS install on my SteamDeck - I quite like playing games on the device. So I put the Ubuntu Core image on a USB stick, and ran it from that. The current image doesn't have an 'installer' as such.

On first boot, you're greeted with an Ubuntu Core logo while the various snaps are setup and configured. Once that completes, a first-run wizard pops up to walk though the initial setup.

[![Initial setup](/blog/images/2023-11-03/initial-setup.png)](/blog/images/2023-11-03/initial-setup.png)

This is the usual configuration steps to setup keyboard, locale, first user and so on. 

## Pre-installed applications

Once installed, everything was pretty familiar. 

There's a browser - Firefox, and a small set of default GNOME applications such as Eye of GNOME, Evince, GNOME Calculator, Characters, Clocks, Logs, Weather, Font Viewer and Text Editor. There's also a graphical Ubuntu [App Centre](https://snapcraft.io/snap-store) (more on that in a moment).

There's also *three* terminal applications.

* GNOME Terminal - which is a *little bit* useless because it's strictly confined. 

* Console - also GNOME Terminal, but is unconfined, so can be used for system administration tasks like installing software.

* [Workshops](https://snapcraft.io/workshops) - which provides a [Toolbox](https://github.com/containers/toolbox) / [Distrobox](https://github.com/89luca89/distrobox) like experience for launching LXD containers running Ubuntu or another Linux distribution. The neat part about this is there's full GPU passthrough to the containers. 

So on a suitably equipped desktop with an nVidia GPU, it's possible to run CUDA workloads inside a container on top of Ubuntu Core.

## Automatic updates

When I initially played with this a week or two back, I noticed that the core image shipped with a build of GNOME 42.

[![GNOME 42](/blog/images/2023-11-03/gnome-42.png)](/blog/images/2023-11-03/gnome-42.png)

One major feature of snaps is their ability to do automatic updates in the background. At some point between October 19th and today, an update brought me GNOME 45!

[![GNOME 45](/blog/images/2023-11-03/gnome-45.png)](/blog/images/2023-11-03/gnome-45.png)

I doubt that a final product will jump users unceremoniously from one major desktop release to another, but this is a *preview* remember, so interesting, exciting and frightening things happen. 

## Installing apps

The "traditional" (read: deb-based) Ubuntu Desktop recently shipped with a new software store front. This application, built using Flutter, makes it easy to find and install snaps on the desktop.

I tested this process by installing Steam, given this is a SteamDeck!

[![Installing Steam](/blog/images/2023-11-03/install-steam.png)](/blog/images/2023-11-03/install-steam.png)

This process was uneventful and smooth. Installing additional apps on the Ubuntu core desktop preview works as expected. However, so-called "classic" (unconfined) snaps are not yet installable. So applications like VSCode, Sublime Text and Blender can't currently be easily installed. 

## Kernel switcheroo

Did I mention everything is a snap? This includes the Linux kernel. That means it's possible to quickly switch to a completely different kernel, trivially easily, with one `snap refresh` command.

[![Switching kernel](/blog/images/2023-11-03/switch-kernel.png)](/blog/images/2023-11-03/switch-kernel.png)

It's just as simple to `snap revert` back to the previous kernel, or try kernels specifically optimised for the hardware or use cases, such as gaming, or resource constrained computers.

## Steam snap

The snap of Steam has been [around](https://snapcraft.io/steam) for a while now, to install on the traditional Linux desktop. As a snap, it's installable on this core desktop preview too. 

The Steam snap also [bundles](https://discourse.ubuntu.com/t/steam-snap-status-improvements/39796?u=popey) some additional tools you might find on the SteamOS shipped on the SteamDeck, like MangoHUD.

Launching Steam on Ubuntu Core on the SteamDeck works just like it does on a traditional desktop. The SteamDeck is a desktop PC at its heart, after all.

Here's a few screenshots, but this isn't super remarkable, but neat nonetheless. The controller works, and the games I tested run fine. I didn't install anything huge like GTA5, because this was all running off a USB stick. Ain't nobody got time for that.

[![Steam](/blog/images/2023-11-03/steam1.png)](/blog/images/2023-11-03/steam1.png)

I didn't try using the new Steam UI as seen on the SteamOS official builds. But I imagine it's possible to get that working.

[![Steam](/blog/images/2023-11-03/steam2.png)](/blog/images/2023-11-03/steam2.png)

Audio doesn't work in the Ubuntu Core image on the SteamDeck for me, so the whole game playing experience is a *little* impacted by that.

[![Steam](/blog/images/2023-11-03/steam3.png)](/blog/images/2023-11-03/steam3.png)

[![Steam](/blog/images/2023-11-03/steam4.png)](/blog/images/2023-11-03/steam4.png)

As you can see, this doesn't really look any different to running a traditional desktop Linux distribution.

[![Steam](/blog/images/2023-11-03/steam5.png)](/blog/images/2023-11-03/steam5.png)

[![Steam](/blog/images/2023-11-03/steam6.png)](/blog/images/2023-11-03/steam6.png)

## Unworking things

Not everything is smooth - this is a developer *preview* remember! I have fed back these things to the team - over beer, last night. I'm happy to help them debug these issues.	 

On my SteamDeck, I had no audio, at all. I suspect this is likely due to something missing in the Ubuntu kernel. As shown above, I did try a different, newer kernel, to no avail.

Bluetooth also didn't work. In GNOME Settings, pressing the bluetooth enable button just toggled it back off again. I didn't investigate this deeply, but will certainly file a bug and provide logs to the team.

Running `snap refresh` in the console doesn't finish, when there's an update to the desktop itself. I suspect this is a byproduct of Ubuntu Core usually being an unattended IoT device where it would normally do an automatic reboot when these packages are updated. You clearly don't want a desktop to do random reboots after updates, so that behaviour seems to be supressed. 

I've not commented at all on performance, because it's a little unfair, given this is a preview. That's not to say it's slow, but I _am_ running it on a USB stick, not the internal nvme drive. It's certainly *more* than usable, but I didn't measure any performance benchmarks yet.

## The future

While the SteamDeck is a desktop "PC", it's a little quirky. There's no keyboard, only one USB port, has weird audio chipset, and the display initially boots rotated by 90 degrees. It's not really the target for this image.

I would expect this Ubuntu Core Developer Preview to be more usable on a traditional laptop or desktop computer. I haven't tried that, but I know others have. Over time, more people *will* need to play with this platform, to find the sharp edges, and resolve the critical bugs before this ships for general use. 

I can envisage a future where laptops from well-known vendors ship with Ubuntu Core Desktop by default. These might target developers initially, but I suspect eventually 'normie' users will use Ubuntu Core Desktop.

It's pretty far along already though. For some desktop use cases this is perfectly usable today, just probably not on your primary or only computer. In five months, when the next Ubuntu release comes out, I think it could be a very compelling daily driver. 

Worth keeping an eye on this!