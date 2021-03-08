+++
date = "2021-03-08T12:00:00-00:00"
title = "Learning Dart & Flutter"
slug = "2021/03/learning-dart-and-flutter"
author = "Alan Pope"
tags = ['ubuntu', 'linux', 'software', 'flutter', 'dart']
+++

I've said many times, I don't consider myself a software developer. Much like I don't consider myself a professional chef. I can write code, just as I can cook. What I make isn't ground breaking, but it won't *poison* anyone either, and I enjoy doing it.

Coding for me started on the [ZX81](blog/2021/03/fourty-years-on/) in BASIC then on to the Spectrum and other 8-bit microcomputers. I *dabbled* with Z80 and 6502 assembly language. At college I did COBOL, InfoBASIC and more Z80. When I eventually got a PC in 1990 I taught myself Pascal, via a free compiler for MS-DOS I got on a floppy disk in the post.

In my professional life I've written semi-decent code in SAP ABAP/4 (*shudder*), QtQML, Perl, Python and a bunch of awful scripts in Bash. Recently I've played with Go, Rust, and many others I've forgotten. This isn't intended to read like my résumé, but just show I'm more of a hobby coder than a professional software developer. I dabble, that's about it.

My employer, Canonical - recently [announced](https://ubuntu.com/blog/canonical-enables-linux-desktop-app-support-with-flutter) we're working with the [Flutter](https://flutter.dev/) developers to bring their platform to the Linux desktop. My interest was piqued.

Personally I like the concept of writing applications which can run on many platforms. I sometimes *dabble* with game development engines like Construct3, GDevelop, Unity & Godot which all have multiple export options for different platforms. Having similarly powerful, cross-platform and open source tools for building mobile and desktop (non-game) applications is welcome in my book. 

I appreciate there's a bunch of other tools which seek to do the same thing. I am aware that Qt and Gtk exist, that you can create cross-platform applications in Go and Rust. Indeed, with Electron many developers have been empowered to quickly throw together applications and publish them on numerous storefronts.

On that note, one of the things we always wanted with [snaps](https://snapcraft.io/) was to be language/framework/toolkit agnostic when publishing. The Snap Store doesn't care if your application is a Rust or Go binary, a bunch of Python or a full-size Electron application. We knew many Linux users want applications, and a large chunk of them frankly don't care one bit what the apps are written in. 

Sure, they *will* care if the application looks or performs badly, and some won't like visual inconsistency. But the majority don't seem to actually have that as a top priority. Whether it's the office suite, browser, music player, chat client or productivity application, so long as it works, most of the time, they're mostly happy. 

Granted, some users are polar opposite to this, and want every application to be perfectly consistent with every other application, a laudible goal. Meanwhile, back on Earth, that hasn't happened, for most people. Most people on the Linux desktop have a hodge-podge of Gtk, Qt and other random toolkit applications.

So when I dug into Flutter and Dart, I was intrigued. A cross-platform framework which promises to have a *native* look and feel, with code compiled down to bare metal binaries, I'm interested. 

Setting up the Flutter development environment was pretty straightforward. Hooking it up with Android Studio and VS Code was easy too. I followed the [Getting started with Flutter on Ubuntu](https://diddledan.com/getting-started-with-flutter-on-ubuntu/) blog post by [diddledan](https://diddledan.com/).

I grabbed a good value [course on Udemy](https://www.udemy.com/course/learn-flutter-dart-to-build-ios-android-apps), and have started to get stuck in! Looking forward to working my way through it, and turning my silly app ideas into Ubuntu Yaru themed desktop super stars. Or maybe flutter farts app, who knows.