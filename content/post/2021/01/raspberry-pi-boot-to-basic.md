+++
date = "2021-01-25T12:00:00-00:00"
title = "Raspberry Pi: Boot to BASIC"
slug = "2021/01/raspberry-pi-boot-to-basic"
author = "Alan Pope"
tags = ['raspberrypi', 'basic', 'linux', 'linux', 'retro']
+++

## 10 REM TL;DR

My Raspberry Pi 400 boots from this:

![Pi 400](/blog/images/2021-01-25/piboot.jpg)

To this.

![BBC SDL](/blog/images/2021-01-25/bbcsdl.jpg)

BBC BASIC!

This blog post is what parts I smashed together to make this work and why.

## 20 PRINT "HELLO"

40 years ago this Christmas, I got my first "personal computer". It was a Sinclair ZX81 with 1KiB of RAM and a tape deck for storage. Every time I powered it on, like all '81 owners, I was greeted with this.

![ZX81](/blog/images/2021-01-25/zx81_1.png)

A couple of taps later, and I had written some code!

![ZX81](/blog/images/2021-01-25/zx81_2.png)

Ok, not a super auspicious creation, but it's a start. It's likely the same first program you wrote if you had one. Perhaps with rude words, who knows, they were fun times back in the '80s. Through the following years I had a [Sinclair](https://en.wikipedia.org/wiki/Sinclair_Research) [ZX Spectrum 16K](https://en.wikipedia.org/wiki/ZX_Spectrum) (later upgraded to 48K), a [Spectrum +2 128K](https://en.wikipedia.org/wiki/ZX_Spectrum#ZX_Spectrum_+2) and an [Amstrad](https://en.wikipedia.org/wiki/Amstrad) [CPC 464](https://en.wikipedia.org/wiki/Amstrad_CPC#CPC_464). All of which also booted directly to a programming language - [BASIC](https://en.wikipedia.org/wiki/BASIC).

After school, in 1988 I studied BTEC National Diploma in Computer Studies. We had some classes on a [Pr1meOS](https://en.wikipedia.org/wiki/PRIMOS) based system (yes, it's written with a "1" for an "I"), and other times we'd use [BBC Micro computers](https://en.wikipedia.org/wiki/BBC_Micro). 

In one class on [databases](https://en.wikipedia.org/wiki/DBase), we used genuine IBM PCs which is probably where my nostalgic [love](/blog/2020/12/keyboards-old-and-new/) of the Model M keyboard comes from. Often times we'd arrive before the lecturer. Each machine had two floppy disk drives, and no hard drive. The lecturer had the floppies, so we sat and waited, getting bored before the lesson started. 

IBM PCs back then had BASIC on ROM, much like the contemporary 8-bit microcomputers I'd had at home. So if there was no operating system found, such as on floppy or hard disk, you'd get this.

![BASIC](/blog/images/2021-01-25/basic.png)

I would often get so bored that I'd start coding something in BASIC while we waited for class to start. Most of the time I'd just create simple programs to display funky graphical patterns on the display. It was a brain exercise before the classes started, a creative outlet, and was fun too. 

On one occasion my friends - also bored - saw what I was doing and started suggesting I make changes. "Make the lines different colours!" - "*Make the lines bounce off the walls of the screen!*", "*Make it go slower/faster!*" etc. Rapidly channelling my classmates' requests into code was a fun coding challenge in the morning. 

Soon after that computers started shipping with hard disks by default, which contained operating systems instead of booting directly to a programming language. Having an on-board mass storage device, which could contain a myriad languages, made shipping one in ROM a bit pointless. But I miss those days of booting directly to a language and nothing else.

*"But Alan, Linux computers boot to a shell prompt, BASH, which you can program in and MacOS ships it too, and Windows has PowerShell etc*"

Shhh! While that's all true, no modern, mainstream operating system boots *to* a programming language, specifically not to BASIC. 

I *miss* computers that boot to BASIC. So I looked into how interesting it might be to make a desktop or laptop computer boot to BASIC in 2021.

Sure, I could hook up one of my many retro computers, or boot an old ThinkPad and load some BASIC interpreter, I wanted something new, and zeitgeisty!  Then it hit me, I have the perfect computer to do this, the Raspberry Pi 400! The Pi has a strong connection back to the original BBC Micros I used in the 80's. It even looks like an 80's computer. 

![Raspberry Pi 400](/blog/images/2021-01-25/pi400.jpg)

It's a travesty that it *doesn't* boot to BASIC out of the box (one might argue) 😀. So I set out on my goal of getting BASIC booting on the Pi. My key requirement was that it show me a traditional full-featured BASIC on boot, without having to login. I didn't want to have to wait for a full desktop environment to start, and didn't like the idea of logging in at the `console` / `TTY`. 

## 30 GOSUB 8086

The easy solution is to use an emulator of a system of yore, and just use the onboard BASIC which shipped on ROM. This seemed like cheating to me. Anyone can spin up an emulator on basically anything, that's not a challenge. So I dismissed emulation. 

![DOSBOX-X](/blog/images/2021-01-25/dosbox-x.png)

I did consider looking for the BASIC / BASICA / [GW-BASIC](https://en.wikipedia.org/wiki/GW-BASIC) binaries and try booting them somehow, but give they're not freely available, and more importantly are Intel 8086 machine code, and I'm using an ARM based Raspberry Pi, that wouldn't easily fly (without emulation).

I am not capable of writing a BASIC interpreter, but the good news is, other people have. I found a couple of "modern" re-implementations of BASIC which were good candidates, [PCBASIC](https://robhagemans.github.io/pcbasic/) by Rob Hagemans and [BBCSDL](http://www.bbcbasic.co.uk/index.html) by R. T. Russell. Both are excellent, open source, currently maintained projects! 

![BBC BASIC](/blog/images/2021-01-25/bbcbasic.png)

![PC-BASIC](/blog/images/2021-01-25/pcbasic.png)

Both of them have some platform requirements which are served well on traditional Linux distributions. The above screenshots were taken on my desktop while I tested the various interpreter options. There's other options like [QB64](https://www.qb64.org/portal/) which carefully reproduces the QBasic / QuickBasic of the late MS-DOS era. While I like QB64, it's not the aesthetic I was after.

![QB64](/blog/images/2021-01-25/qb64.png)

## 40 RETURN

For the operating system, something Linux based was the only real logical option here. I'm sure all the FreeBSD, RISCOS and other alternative OS freaks are tutting or closing this tab right now, sorry. I only really know Linux well, and for a quick fun hack project I didn't want to have to re-learn a new OS just for this. Another day, maybe.

I did briefly consider whether it might be possible to boot directly into BASIC without any operating system at all. That might be somewhat beyond my capabilities right now as I imagine I'd need to deal with re-implementing an awful lot of the graphics, input, sound and IO stack that's already well-done in Linux today.

I tried a whole bunch of distributions including [Diet Pi](https://dietpi.com/), [Tiny Core](http://www.tinycorelinux.net/) and [Raspbian](https://www.raspberrypi.org/software/operating-systems/). However I had some small but frustrating issues with all of them here and there, so decided to return to something I knew well. This was to isolate problems I was dealing with to the BASIC interpreters themselves and libraries, and not the OS too. I'm sure all of what I have done *can* be made to work on the above distros, I just chose another path.

I went for [Ubuntu](https://ubuntu.com/), duh. I didn't want to use the new [Ubuntu Desktop](https://ubuntu.com/blog/build-a-raspberry-pi-desktop-with-an-ubuntu-heart) image for Raspberry Pi because it has a ton of extra graphical packages installed which takes me away from my lean "Boot to BASIC" plan. Sure, I could rip all that out, but that's more time and effort. I wanted something quite lean from the get-go. There's two [options](https://ubuntu.com/download/raspberry-pi) available here, Ubuntu Server and Ubuntu Core.

Ubuntu Server is available as an image for the Raspberry Pi which can be blatted onto an microSD card via `ddrescue` or your favourite tool. Ubuntu Server is basically a command-line only minimal install of Ubuntu with a few server related things installed, no desktop. It uses the traditional `apt` package manager, and has support for `snap` too.

Ubuntu Core is also available for the Pi as an image. It is an immutable `snap` based super-minimal install of Ubuntu designed for IoT and applicance use cases. I think this would have been the ideal candidate. However, because Ubuntu Core doesn't have `apt` it isn't ideal for doing the iterative development and hacking. 

So I went for Ubuntu Server to hack and build on, and when I put this in "production" I'll migrate to Ubuntu Core, maybe. 😬

## 50 PEEK 2

PCBASIC is written in Python, and is already packaged in Ubuntu. I figured this would be an easy way forward as I could `apt install python3-pcbasic` then run `pcbasic`. That does indeed work in that you get a BASIC interpreter, but the default mode when no GUI is available is to run like any other curses-style console application. 

That's fine, and I could certainly configure the system to auto-login and run this console application, it's not quite right. The interpreter wouldn't be able to do any kinds of graphical operations, I'd *only* have text mode. That's be fun for sure, but not quite what I'm after.

In parallel I was also looking at BBCSDL which is written in C, and levergaes SDL2. With a bit of hacking I got it launching using Mir as a wayland compositor on top of Ubuntu Server. However the video output was corrupt.

![BBCSDL on Mir](/blog/images/2021-01-25/bbconmir.png)

After some discussion with the Mir team last week, it seems BBCSDL was trying to set a specific resolution and for whatever reason Mir didn't like this. BBCSDL works in a window under Mir on a GUI or Pi running a desktop environment. But when launched as an 'appliance' as the only graphical surface, I got the unusable display above. 

## 60 STOP

I took a break from fiddling with this toy project for a day or so. Then my colleague Oliver Grawert ([ogra](https://ograblog.wordpress.com/)) mentioned he'd played and had some success. He's been working on building some interesting SDL2 applications in snaps to run as full-screen appliances without X or Wayland on a Pi. More on those another day. I wasn't aware, but it's possible that SDL2 applications can draw graphics directly to the display, much like using the framebuffer on a PC.

He offered some patches to improve my snap. It works! Here's what it currently looks like. It's a bit slow, but that's mostly the Ubuntu side doing a bunch of Ubuntu things. Once it's booted though, it runs just like you expect. 

{{< rawhtml >}}
<iframe width="560" height="315" src="https://www.youtube.com/embed/be9b_a9pNzQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
{{< /rawhtml >}}

The snapcraft.yaml we used to build this snap is over on this [GitHub gist](https://gist.github.com/popey/02363a3768d0d01a0ad5c0abb759c7fe). I haven't published the snap in the Snap Store, I just built and installed it locally for now. The key takeaways from this are:

  * It builds armhf binaries, which can be installed on armhf (32-bit) or arm64 (64-bit) installs
  * We build and bundle [sdl2](https://github.com/spurious/SDL-mirror) specifically without building X11 or Wayland support 
  * ALSA is redirected to pulseaudio using the [snapcraft-alsa](https://github.com/diddlesnaps/snapcraft-alsa) work by [Daniel Llewellyn](https://github.com/diddlesnaps). Although currently I've not tested audio.
  * The [desktop helpers]( https://github.com/ubuntu/snapcraft-desktop-helpers) are used to configure a bunch of desktop-ish stuff like font caches
  * The [pi firmware](https://github.com/raspberrypi/firmware) enables us to draw pixels on the screen without X11 and Wayland
  * [BBCSDL](https://github.com/rtrussell/BBCSDL) is built without 
  * The snap needs `devmode` confinement (currently) because there's not an interface to get input from the keyboard without X11 or Wayland being present. I believe ogra is working on that.
  * The `bbcsdl` command is defined in the snap as a `daemon` which causes a systemd unit to be created and enabled on install, which launches the application on boot

This could certainly be cleaned up. But for a proof of concept, and a bit of fun on the weekend, I think it's pretty neat.

## RUN

So I now have a Raspberry Pi 400 which boots directly into BBC BASIC. Great success. What now?

Well, [learn](https://www.bbcbasic.co.uk/bbcwin/tutorial/index.html) (or re-learn) BBC BASIC!

There's room for improvement though. The boot process is quite long - certainly not instant-on like all the 8-bit computers of yore. Perhaps I can improve boot speed with some of these:

  * Use a faster SD card - this can make a tremendous difference
  * Stop / remove some services - I could disable networking or ssh if I'm not going to use them
  * Use `systemd-analyze blame` to find more things to remove or improve
  * Switch to a faster booting distro - I could maybe re-visit some of the lean distros like Diet Pi, now I have a working package

I haven't tested any IO (saving / loading) because I initially wanted the "raw" experience of typing code in from cold-start, without having the *luxury* of a storage device to hold my code. I'll maybe work on that so I can load in some of the great example code that BBCSDL ships with.

I may also re-visit PC BASIC now we have a working (albeit kinda kludgy) setup for launching full screen applications on the Pi without X11 or Wayland. Suggestions on what to do next, also welcome!

No, not Commodore BASIC. 🤮
