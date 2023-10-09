+++
date = "2023-10-09T19:00:00+01:00"
title = "Boot to BBC BASIC: Agon Edition"
slug = "2023/10/boot-to-bbc-basic-agon-edition"
author = "Alan Pope"
tags = ['retro', 'arcade', 'museum', 'basic', 'linux', 'agon', 'snapcraft']
+++

## Agon and Agon

Last month I [visited](blog/2023/09/touching-joysticks/) the [RMC Cave](https://www.retrocollective.co.uk/the-cave.php) where we got a sneak peek at the [Agon Console8](https://heber.co.uk/agon-console8/) from [Heber](https://heber.co.uk/). The Agon Console8 is a consolised version of the more general-purpose Agon8 Computer. They come in a natty retro case, and features twin 9-pin joystick ports.

[![Agon console8](/blog/images/2023-09-23/IMG_3419.heic.png)](/blog/images/2023-09-23/IMG_3419.heic.png)

I'd not heard about the [Agon](https://www.thebyteattic.com/p/agon.html) line of [Open Source](https://github.com/TheByteAttic) devices before, but they tickled something in me. I'm somewhat fascinated by computers that boot directly into BASIC. 

## Pi time

I wrote about this back in 2021 in [Raspberry Pi: Boot to BASIC](/blog//2021/01/raspberry-pi-boot-to-basic) where I configured a Raspberry Pi to boot directly into [BBC BASIC](https://www.bbcbasic.co.uk/index.html), by R.T. Russell.

![BBC SDL](/blog/images/2021-01-25/bbcsdl.jpg)

## 

Last week Noel, from [Noel's Retro Lab](https://www.youtube.com/@NoelsRetroLab) was sent an Agon computer to noodle around with. Noel made a detailed [video](https://www.youtube.com/watch?v=CQ_C_RvJJ9A) all about it, worth a watch - as are all of Noel's videos. He's good people, and is an [Amstrad CPC](https://en.wikipedia.org/wiki/Amstrad_CPC) fanboy like myself. 

I'm interested in these devices, but I'm currently trying my best to [get rid](https://www.ebay.co.uk/usr/popeydc?) of clutter, not [buy more](https://www.pcbway.com/project/gifts_detail/Agon_light_3f7ffaa8.html)! However, in the video, Noel mentioned there was an emulator for the Agon line of machines. My interest was piqued even further. 

**Interest²**

In an idle moment over the weekend, I stumbled on [Agon Light Emulator](https://github.com/astralaster/agon-light-emulator), then quickly discovered it's deprecated. There is another though, [Fab Agon Emulator](https://github.com/tomm/fab-agon-emulator) which appears to have gone from zero to functional in just a couple of weeks!

So I had a play with it, and it's rather neat! Imagine booting up a modern real hardware computer and being greeted with this! Wonderful 🥰

![Fab Agon Emulator](/blog/images/2023-10-09/f-a-e.png)

## LOAD"

You can type code in, save it out, and load it in from SD cards - on the real hardware - or in the emulator, to a "Virtual SD card" on your filesystem.

Common BBC basic IO commands like `*CAT`, `LOAD` and `SAVE` work with these real or virtual SD cards. It's all very clever. and familiar.

![Loading](/blog/images/2023-10-09/loading.png)

## RUN

Yeee-haw!

![M'lady](/blog/images/2023-10-09/mlady.png)

## Download

There's currently no binary build of Fab Agon Emulator available, so I made a snap, because of course I did.

{{< rawhtml >}}
<center><iframe src="https://snapcraft.io/fab-agon-emulator/embedded?button=black&channels=true&summary=true&screenshot=true" frameborder="0" width="100%" height="880px" style="border: 1px solid #CCC; border-radius: 2px;"></iframe></center>
{{</ rawhtml >}}

Quite looking forward to getting back into BBC BASIC with this. Maybe I'll write another [virus](/blog/2023/09/a-virus-for-the-bbc-micro/) for it. 😅