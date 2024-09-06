+++
date = "2024-09-06T14:40:00+01:00"
title = "Windows 3.11 on QEMU 5.2.0"
slug = "2024/09/windows-3.11-on-qemu-5.2.0"
author = "Alan Pope"
tags = ['emulation', 'windows']
+++

This is mostly an informational PSA for anyone struggling to get Windows 3.11 working in modern versions of QEMU. Yeah, I know, not exactly a massively viral target audience. 

Anyway, short answer, use QEMU 5.2.0 from December 2020 to run Windows 3.11 from November 1993.

{{< rawhtml >}}
<center><a href="/blog/images/2024-09-06/win311.png"><img src="/blog/images/2024-09-06/win311.png" width="540" alt="Windows 3.11, at 1280x1024, running Internet Explorer 5, looking at a GitHub issue"></a></center>
{{</ rawhtml >}}

## An innocent beginning

I made a harmless [jokey reply](https://mastodon.social/@popey/113079171241665414) to a toot from [Thom](https://thomholwerda.com/) at [OSNews](https://www.osnews.com/), [lamenting](https://exquisite.social/@thomholwerda/113079153955604183) the lack of native Mastodon client for Windows 3.11.

When I saw Thom's toot, I couldn't resist, and booted a Windows 3.11 VM that I'd installed six weeks ago, manually from floppy disk images of MSDOS and Windows.

{{< rawhtml >}}
<center>
<iframe src="https://mastodon.social/@popey/113079171241665414/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="540" allowfullscreen="allowfullscreen"></iframe><script src="https://mastodon.social/embed.js" async="async"></script>
</center>
{{</ rawhtml >}}


I already had Lotus Organiser installed to post a little bit of nostalgia-farming on [threads](https://www.threads.net/@popey/post/C-GMXpGM4KR) - it's what they do over there.


{{< rawhtml >}}
<center>
<blockquote class="text-post-media" data-text-post-permalink="https://www.threads.net/@popey/post/C-GMXpGM4KR" data-text-post-version="0" id="ig-tp-C-GMXpGM4KR" style=" background:#FFF; border-width: 1px; border-style: solid; border-color: #00000026; border-radius: 16px; max-width:540px; margin: 1px; min-width:270px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"> <a href="https://www.threads.net/@popey/post/C-GMXpGM4KR" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%; font-family: -apple-system, BlinkMacSystemFont, sans-serif;" target="_blank"> <div style=" padding: 40px; display: flex; flex-direction: column; align-items: center;"><div style=" display:block; height:32px; width:32px; padding-bottom:20px;"> <svg aria-label="Threads" height="32px" role="img" viewBox="0 0 192 192" width="32px" xmlns="http://www.w3.org/2000/svg"> <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" /></svg></div> <div style=" font-size: 15px; line-height: 21px; color: #999999; font-weight: 400; padding-bottom: 4px; "> Post by @popey</div> <div style=" font-size: 15px; line-height: 21px; color: #000000; font-weight: 600; "> View on Threads</div></div></a></blockquote>
<script async src="https://www.threads.net/embed.js"></script>
</center>
{{</ rawhtml >}}


I thought it might be fun to post a jokey diary entry. I hurriedly made my silly post [five minutes after](https://mastodon.social/@popey/113079171241665414) Thom's [toot](https://exquisite.social/@thomholwerda/113079153955604183), expecting not to think about this again.

## Incorrect, brain

I shut the VM down, then went to get coffee, chuckling to my smart, smug self about my successful nerdy rapid-response. While the kettle boiled, I started pondering - "*Wait, if I really **did** want to make a Mastodon client for Windows 3.11, how would I do it?*"

I pondered and dismissed numerous shortcuts, including, but not limited to:

* Fake it with screenshots doctored in MS Paint
* Run an existing [DOS Mastodon Client](https://github.com/SuperIlu/DOStodon) in a Window
* Use the Windows Telnet client to connect insecurely to my laptop running the Linux command-line Mastodon client, [Toot](https://snapcraft.io/toot)
* Set up a proxy through which I could get to a Mastodon web page

I pondered a different way, in which I'd build a very simple proof of concept native Windows client, and leverage the [Mastodon API](https://docs.joinmastodon.org/api/). I'm not proficient in (m)any programming languages, but felt something like [Turbo Pascal](https://en.wikipedia.org/wiki/Turbo_Pascal) was time-appropriate and roughly within my capabilities.

## Diversion

My mind settled on [Borland Delphi](https://en.wikipedia.org/wiki/Delphi_(software)), which I'd never used, but looked similar enough for a silly project to [Borland Turbo Pascal 7.0 for DOS](https://en.wikipedia.org/wiki/Turbo_Pascal), which I had. So I set about installing Borland Delphi 1.0 from **fifteen** (virtual) floppy disks, onto my Windows 3.11 "Workstation" VM.

{{< rawhtml >}}
<center><a href="/blog/images/2024-09-06/delphi.png"><img src="/blog/images/2024-09-06/delphi.png" width="540" alt="Windows 3.11, with a Borland Delphi window open"></a></center>
{{</ rawhtml >}}

Thank you, whoever added the `change floppy0` option to the QEMU Monitor. That saved a lot of time, and was reduced down to a loop of this fourteen times:

```text
"Please insert disk 2"
CTRL+ALT+2
(qemu) change floppy 0 Disk02.img
CTRL+ALT+1
[ENTER]
```

During my research for this blog, I found a delightful, nearly decade-old video of [David Intersimone](https://www.linkedin.com/in/davidi99) ("David I") running [Borland Delphi 1 on Windows 3.11](https://www.youtube.com/watch?v=m_3K_0vjUhk). David makes it all look so easy. Watch this to get a moving-pictures-with-sound idea of what I was looking at in my VM.

Once Delphi was installed, I started pondering the network design. But that thought wasn't resident in my head for long, because it was immediately replaced with the reason why I didn't use that Windows 3.11 VM much beyond the original base install. 

The networking stack **doesn't work**. Or at least, it *didn't*.

That *could* be a problem.

## Retro spelunking

I originally installed the VM by following [this guide](https://computernewb.com/wiki/QEMU/Guests/Windows_3.1), which is notable as having additional flourishes like mouse, sound, and SVGA support, as well as TCP/IP networking. Unfortunately I couldn't initially get the network stack working as Windows 3.11 would hang on a black screen after the familiar OS splash image.

Looking back to my silly [joke](https://mastodon.social/@popey/113079171241665414), those 16-bit Windows-based Mastodon dreams quickly turned to dust when I realised I wouldn't get far without an IP address in the VM. 

## Hopes raised

After some digging in the depths of retro forums, I stumbled on a four year-old [repo](https://github.com/rtts/win311) maintained by [Jaap Joris Vens](https://github.com/JaapJoris). 

> Here's a fully configured Windows 3.11 machine with a working internet connection and a load of software, games, and of course [Microsoft BOB](https://en.wikipedia.org/wiki/Microsoft_Bob) 🤓

Jaap Joris published this ready-to-go Windows 3.11 hard disk image for QEMU, chock full of games, utilities, and drivers. I thought that perhaps their image was configured differently, and thus worked.

However, after downloading it, I got the same "black screen after splash" as with my image. Other retro enthusiasts had the same issue, and reported the details on [this issue](https://github.com/rtts/win311/issues/2), about a year ago.

> does not work, black screen.

> It works for me and many others. Have you followed the instructions? At which point do you see the black screen?

The key to finding the solution was a comment from Jaap Joris pointing out that the disk image "*hasn't changed since it was first committed 3 years ago*", implying it must have worked back then, but doesn't now.

## Joy of Open Source

I figured that if the original uploader had at least some success when the image was created and uploaded, it is indeed likely QEMU or some other component it uses may have (been) broken in the meantime.

So I went rummaging in the source [archives](https://download.qemu.org/), looking for the most recent release of QEMU, immediately prior to the upload. [QEMU 5.2.0](https://download.qemu.org/qemu-5.2.0.tar.xz) looked like a good candidate, dated 8th December 2020, a good month before 18th January 2021 when the `hda.img` file was [uploaded](https://github.com/rtts/win311/commit/293f4e6bc63690d1c01d482201067c21d8ed8ccf).

## If you build it, they will run

It didn't take long to compile QEMU 5.2.0 on my ThinkPad Z13 running Ubuntu 24.04.1. It went something like this. I presumed that getting the build dependencies for whatever is the current QEMU version, in the Ubuntu repo today, will get me most of the requirements.

```bash
$ sudo apt-get build-dep qemu
$ mkdir qemu
$ cd qemu
$ wget https://download.qemu.org/qemu-5.2.0.tar.xz
$ tar xvf qemu-5.2.0.tar.xz
$ cd qemu-5.2.0
$ ./configure
$ make -j$(nproc)
```

That was pretty much it. The build ran for a while, and out popped binaries and the other stuff you need to emulate an old OS. I copied the bits required directly to where I already had put Jaap Joris' `hda.img` and `start` script.

```bash
$ cd build
$ cp qemu-system-i386 efi-rtl8139.rom efi-e1000.rom efi-ne2k_pci.rom kvmvapic.bin vgabios-cirrus.bin vgabios-stdvga.bin vgabios-vmware.bin bios-256k.bin ~/VMs/windows-3.1/
```

I then tweaked the `start` script to launch the local home-compiled `qemu-system-i386` binary, rather than the one in the path, supplied by the distro:

```bash
$ cat start
#!/bin/bash
./qemu-system-i386 -nic user,ipv6=off,model=ne2k_pci -drive format=raw,file=hda.img -vga cirrus -device sb16 -display gtk,zoom-to-fit=on
```

This worked a treat. You can probably make out in the screenshot below, that I'm using Internet Explorer 5 to visit the GitHub [issue](https://github.com/rtts/win311/issues/2) which kinda renders when proxied via [FrogFind](http://www.frogfind.com/) by [Action Retro](https://www.youtube.com/ActionRetro).

{{< rawhtml >}}
<center><a href="/blog/images/2024-09-06/win311.png"><img src="/blog/images/2024-09-06/win311.png" width="540" alt="Windows 3.11, at 1280x1024, running Internet Explorer 5, looking at a GitHub issue"></a></center>
{{</ rawhtml >}}

## Share...

I briefly toyed with the idea of building a deb of this version of QEMU for a few modern Ubuntu releases, and throwing that in a [Launchpad](https://launchpad.net) [PPA](https://launchpad.net/~popey/+archive/ubuntu/qemu) then realised I'd need to make sure the name doesn't collide with the [packaged QEMU](https://packages.ubuntu.com/qemu) in Ubuntu.

I honestly couldn't be bothered to go through the pain of effectively renaming (forking) QEMU to something like OLDQEMU so as not to damage existing installs. I'm sure someone could do it if they tried, but I suspect it's quite a search and replace, or move the binaries somewhere under `/opt`. Too much effort for my brain.

I then started building a snap of qemu as oldqemu - which wouldn't require any "real" forking or renaming. The snap could be called `oldqemu` but still contain `qemu-system-i386` which wouldn't clash with any existing binaries of the same name as they'd be self-contained inside the compressed snap, and would be launched as `oldqemu.qemu-system-i386`. 

That would make for one package to maintain rather than one per release of Ubuntu. (Which is, as I am sure everyone is aware, one of the primary advantages of making snaps instead of debs in the first place.) 

Anyway, I got stuck with another technical challenge in the time I allowed myself to make the oldqemu snap. I might re-visit it, especially as I could leverage the [Launchpad Build farm](https://launchpad.net/builders) to make multiple architecture builds for me to share. 

## ...or not

In the meantime, the instructions are above, and also (roughly) in the [comment](https://github.com/rtts/win311/issues/2#issuecomment-2329820471) I left on the [issue](https://github.com/rtts/win311/issues/2), which has kindly been re-opened.

Now, about that Windows 3.11 Mastodon client...
