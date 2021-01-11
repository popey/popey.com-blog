+++
date = "2021-01-07T12:00:00-00:00"
title = "Hush Keyboards with Hushboard"
slug = "2021/01/hush-keyboards-with-hushboard"
author = "Alan Pope"
tags = ['software', 'hushboard', 'ubuntu', 'linux', 'snap']
+++

Yesterday while surfing the ASCII highways of IRC (yes, IRC) a URL linking to a MacOS application scrolled by my screen. [Unclack](https://unclack.app/) is a small MacOS utility which silences the microphone of the user when they're typing. The purpose is to prevent the noise of typing being passed through to other participants when on a Zoom / Skype / Jitsi call. Neat. 

They don't make a Linux version, and I couldn't see anything similar, so I did what I usually do in this instance, throw the idea towards my friendly local coder, Stuart Langridge. He was, as ever, initially bemused and then dismissive. 

Here's a simulated, completly hyothetical conversation between us:


> Alan: I reckon that's an app which could exist on linux - unclack.app - "Unclack is the small but mighty Mac utility that mutes your keyboard while you type!"

> Stuart: But my keyboard doesn't make any noise?

> Alan: ...

> Stuart: Oh haha! it mutes the mic

> Stuart: I thought: the answer here is don't be popey with the stupid noisy keyboard ;)


He has a [point](/blog/2020/12/keyboards-old-and-new/). Hypothetically I might have suggested:

> Alan: I reckon a little python thing that sits in the corner and can be toggled on/off would be neat

> Stuart: Is this an attempt to nerd-snipe me into building it? :)


*Rumbled!*

> Stuart: Ok, if i get a chance I'll look into it!

![15 minutes later](/blog/images/2021-01-07/15.png)

Stuart provided me with the first iteration, able to detect keypresses, you know, like a keylogger. We spent approximately 30 seconds brainstorming a name. I came up with `automute` and `unkeeb`. Stuart expressed with some vigor that `unkeeb` was under no circumstances going to be the name. 

A short while later, `unkeeb` was born!

![Unkeeb](/blog/images/2021-01-07/unkeeb.png)

By late afternoon Stuart had the basics of the utility working. We tested over a Google Meet. It would detect keypresses, mute and unmute the microphone, and display the status in the indicator area. This smelled like a Minimum Viable Product! 

With Stuarts veto on the `unkeeb` name, as the Ideas Man, I had to think of something else. I checked a thesaurus and came up with `calm-ivories` which was even dumber than `unkeeb`. Then it hit me!

[![Hushboard](/blog/images/2021-01-07/hushboard.png)](https://kryogenix.org/code/hushboard/)

30 seconds of Internet due diligence later, and the name was settled. "**Hushboard**" it is. Who says naming things is hard? Stuart does. All the time. That's why he relies on me for these parts of the project lifecycle. That, and packaging. We were getting close to sharing the creation with the world. We decided, with no surprise to anyone, to make a snap!

So here's what I did to package what's essentially a tiny bit of python, and a few dependencies as a snap, so Stuart could build and [publish](https://snapcraft.io/hushboard) it in the Snap Store.

## Metadata

This is straightforward. The `version` tag uses `git` so whenever a build is published, you can refer back to the tag which it was built from. It's going to be strictly confined. We don't want it doing anything narfarious with all those keypresses it's collecting!

**Note**: For the humour-challenged, this is a joke. It does **not** collect keypresses.

We're using `core18` which means it's using packages from Ubuntu 18.04 for `stage-packages` later, which are older than the packages used when we tested on our 20.04 / 20.10 systems. *Foreshadowing*

```
name: hushboard
base: core18
version: 'git'
summary: Mute your microphone while typing
description: |
  Save your friends and colleagues from the noise of your keyboard while on
  audio or video calls. Hushboard detects keypresses and automatically mutes
  your microphone, unmuting shortly after you finish typing.

grade: stable
confinement: strict
```

## Parts

First is hushboard itself. As I plan to land this in the upstream repo, the `source` is `.` - the current directory. I'm not using the `python` plugin, because the project doesn't have all the necessary python bits like a `setup.py`. We're literally dumping the python files into the snap and running them.

We're staging `gir1.2-appindicator3-0.1` so it can place a little indicator icon in the top right of the screen, so you can see what the app is doing. We also need `python3-xlib` which is needed by Hushboard to hook into X11 to detect keypresses. Yes, this uses X11, no, it hasn't been tested on Wayland. No, it almost certainly won't work there. Patches may be welcome, so long as it doesn't break X11 stuff. 

The `prime` section is pretty neat. This means "only put these things in the snap, and nothing else". That way we strip the snap down to the absolute minimum needed to make it run. The Xlib library is about the biggest thing in the snap, which ends up being under 200K in size.

```
parts:
  hushboard:
    plugin: dump
    source: .
    stage-packages:
      - gir1.2-appindicator3-0.1
      - python3-xlib
    prime:
      - usr/lib/girepository-1.0/AppIndicator3-0.1.typelib
      - usr/lib/*/libappindicator3.so.*
      - usr/lib/python3/dist-packages/*
      - hushboard/*
      - bin/*
```

We bundle a launcher script so we need a part to pull that in.

```
  launcher:
    plugin: dump
    source: snap/local/
```

Here's the launcher script. All it does is ensure python can find the dependencies we bundled (xlib) and launches the application. I could probably move the `PYTHONPART` line to the `apps` section as an `environment` stanza, and may well have done by the time you read this.

```
#!/bin/bash
PYTHONPATH=$SNAP/usr/lib/python3/dist-packages:$PYTHONPATH
cd $SNAP
/usr/bin/python3 -m hushboard
```

## Apps

Here we specify the binary we are going to expose to the outside world as `hushboard`, which in fact launches `$SNAP/bin/launcher`, that we just saw above. I definitely should add that `PYTHONPATH` to the `environment` section. Hang on. Ok, [done](https://github.com/stuartlangridge/hushboard/pull/5).

We're leveraging the GNOME extension here. It means a ton of stuff is done and bundled for us. 

```
apps:
  hushboard:
    extensions: [gnome-3-34]
    environment:
      LD_LIBRARY_PATH: $SNAP/usr/lib/$SNAPCRAFT_ARCH_TRIPLET/pulseaudio
    command: bin/launcher
    plugs:
      - x11
      - audio-playback
```

That's it. I threw a PR over to Stuart who hooked it all up to the snapcraft build system. Within an hour or so 

## Challenges

### Segfaults

When I first built the snap, the yaml looked pretty much as it does now, but without the `prime` section. This caused a library conflict between GNOME libraries in the GNOME Platform Snap (gnome-3-34) and what was pulled in by my `stage-packages` definition. Thanks to Ken VanDine on the Ubuntu Desktop Team and Chris Patterson from the Snapcraft team at work for helping me better understand this. We ndeeded to bundle the appindicator library, but didn't want all the other dependencies, which caused the conflict. Using the `prime` section we could allowlist only the things we want, which has a side-effect that the snap is nice and tight.

### Architectures

When Stuart first landed the yaml and hooked up the snapcraft build service, we had build failures on the s390x and ppc64el architecture builders. That's because the `gnome-3-34-1804-sdk` component used at build time isn't built for those architectures. So I added an [architectures](https://github.com/stuartlangridge/hushboard/commit/d70afd117ad8d4e8b65f43213c3416605e1cc266) stanza to limit the builds we'd support. Now the build service doesn't even try to build s390x, ppc64el. Sorry all of you doing video calls on your IBM mainframes!

### Python 3.7

At one point in development, once snapped, hushboard would crash with a traceback:

```
$ snap run hushboard                                                              
Gtk-Message: 16:12:36.769: Failed to load module "canberra-gtk-module"                                              
Traceback (most recent call last):                                                                                                                                                                                                      
  File "/usr/lib/python3.6/runpy.py", line 193, in _run_module_as_main                                                                                                                                                                  
    "__main__", mod_spec)                                                                                                                                                                                                               
  File "/usr/lib/python3.6/runpy.py", line 85, in _run_code                                                                                                                                                                             
    exec(code, run_globals)                                                                                                                                                                                                             
  File "/snap/hushboard/x19/hushboard/__main__.py", line 204, in <module>                                  
    HushboardIndicator().run()                                                                                      
  File "/snap/hushboard/x19/hushboard/__main__.py", line 150, in __init__                            
    self.queue = queue.SimpleQueue()                      
AttributeError: module 'queue' has no attribute 'SimpleQueue'
```

A quick search online revealed SimpleQueue which Stuart used in hushboard, was introduced in Python 3.7. We're building on Ubuntu 18.04 due to the use of `core18` as a `base` (callback). I worried this might be a significant problem. Stuart pointed out it was a [one line fix](https://github.com/stuartlangridge/hushboard/commit/9164e35c323d949a4e78c5ecba3203b00b0a3c65) to use a different method to achieve the same thing, and be compliant with the features in Python 3.6. Awesomesauce!

## Testing

I had a couple of meetings today in which I could test the newly minted [hushboard](https://snapcraft.io/hushboard). Hushboard has an internal timer which essential starts whenever the user presses a key and the microphone is muted. If you don't press anything for a certain period, you're unmuted. We initially settled on 2 seconds as the delay. But this seemed weird, as the typer would have to wait 2 seconds after typing to be able to say anything. It stilted conversations. 

We tried [150ms](https://github.com/stuartlangridge/hushboard/commit/672bb1f38c7bcdfb4a7ec0ee586fe92c5581af9a) but that was seen as too short a time. People in the meeting could hear my microphone strobing off and on as I typed, because I don't necessarily type super fast all the time. We finally settled on [250ms](https://github.com/stuartlangridge/hushboard/commit/f7cdf96048523d4edce9d8e3b094aeb3845f618b) but I expect Stuart is open to [feedback](https://github.com/stuartlangridge/hushboard/issues) on this topic 😃.

## Conclusion

This was a fun little project. Within about 24 hours we went from idea to prototype, implementation, testing, building for multiple architectures, [publishing](https://snapcraft.io/hushboard), made a tutorial video and a promotional blog post about this simple little utility. Do feel free to [install](https://kryogenix.org/code/hushboard/) it and let us know your [thoughts](https://twitter.com/sil/status/1347270732473114631). 