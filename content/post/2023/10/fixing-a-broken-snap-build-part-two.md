+++
date = "2023-10-05T20:00:00+01:00"
title = "Fixing a broken snap build - part two"
slug = "2023/10/fixing-a-broken-snap-build-part-two"
author = "Alan Pope"
tags = ['linux', 'ubuntu', 'snap', 'snapcraft', 'emulation', 'x16emu']
+++

I wrote [previously](/blog/2023/10/fixing-a-broken-snap-build) about debugging a broken [x16emu snap](https://snapcraft.io/x16emu). In short, something went wonky with `ld`. I started a [thread](https://forum.snapcraft.io/t/build-fail-with-gnome-extension-on-core22/37145?u=popey) on the [snapcraft forum](https://forum.snapcraft.io/) and [Ken VanDine](https://forum.snapcraft.io/u/kenvandine) came to my [assistance](https://forum.snapcraft.io/t/build-fail-with-gnome-extension-on-core22/37145/2) with an answer and a [pull request](https://github.com/popey/x16emu-snap/pull/8).

I grabbed that pr, and it did indeed build successfully..


```bash
$ snapcraft --use-lxd
Launching instance...
Executed: pull alsa-pulseaudio
Executed: pull gnome/sdk
Executed: pull x16-roms
Executed: pull x16-emulator
Executed: build alsa-pulseaudio
Executed: build gnome/sdk
Executed: build x16-roms
Executed: skip pull x16-roms (already ran)
Executed: skip build x16-roms (already ran)
Executed: stage x16-roms (required to build 'x16-emulator')
Executed: skip pull alsa-pulseaudio (already ran)
Executed: skip build alsa-pulseaudio (already ran)
Executed: stage alsa-pulseaudio (required to build 'x16-emulator')
Executed: build x16-emulator
Executed: skip stage alsa-pulseaudio (already ran)
Executed: stage gnome/sdk
Executed: skip stage x16-roms (already ran)
Executed: stage x16-emulator
Executed: prime alsa-pulseaudio
Executed: prime gnome/sdk
Executed: prime x16-roms
Executed: prime x16-emulator
Executed parts lifecycle
Generated snap metadata
Created snap package x16emu_b16509b_amd64.snap  
```

Even better, it's smaller. The build I had in the store was 6MB in size:

```bash
$ snap info x16emu | grep stable
  latest/stable:    r44     2023-09-21 (1030) 6MB -
```

This new build is a paltry 1MB:

```bash
$ ls -lh x16emu_b16509b_amd64.snap 
-rw-r--r-- 1 alan alan 1.3M Oct  5 19:06 x16emu_b16509b_amd64.snap
```

![Nice](/blog/images/2023-10-05/nice.gif)

Let's take a quick look at the PR and break down what Ken did to fix this, in case it's useful to someone else.

First up, we bump from `core20` to `core22` which means the snap will build on Ubuntu 22.04 LTS (Lunar) rather than Ubuntu 20.04 LTS (focal). There are a couple of knock-on effects of this. Any `stage-packages` will come from the newer archive, so will often be newer. That includes the build chain and other libraries. We need this, for the newer `cc65` I mentioned in the [previous blog post](/blog/2023/10/fixing-a-broken-snap-build)

```diff
  name: x16emu
- base: core20
+ base: core22
  adopt-info: x16-emulator
  summary: Commander X16 Emulator
  description: |
```

Here's another effect of the `core22` update. The `snapcraft` tool itself changes some behaviours and configuration options. Here we see a few such changes in the form of internal environment variables and commands. The change from `$SNAPCRAFT_*` to `$CRAFT_*` is a hint towards the universal nature of the new direction of `snapcraft`, not just building snaps anymore?

```diff
  layout:
-   /usr/lib/$SNAPCRAFT_ARCH_TRIPLET/alsa-lib:
-     bind: $SNAP/usr/lib/$SNAPCRAFT_ARCH_TRIPLET/alsa-lib
+   /usr/lib/$CRAFT_ARCH_TRIPLET/alsa-lib:
+     bind: $SNAP/usr/lib/$CRAFT_ARCH_TRIPLET/alsa-lib

```

```diff
        - libsdl2-dev
        - git
      override-pull: |
-       snapcraftctl pull
+       craftctl default
        last_committed_tag="$(git describe --tags --abbrev=0)"
        echo $last_committed_tag
        last_released_tag="$(snap info $SNAPCRAFT_PROJECT_NAME | awk '$1 == "latest/beta:" { print $2 }')"
```

Here's one of the main fixes to the snap. Adding the `PATH` will coerce the build to use `make` from the build system host, not from within the GNOME extension, which was the problem. This will prevent us from erroneously using the `ld` in the GNOME extension too.

```diff
-       make
-       cp x16emu $SNAPCRAFT_PART_INSTALL
+       PATH=/usr/bin:$PATH make
+       cp x16emu $CRAFT_PART_INSTALL
```

Here's a super useful chunk of deletions! This is likely the big contributor to shrinking the size of the resulting snap. These libraries are all in the GNOME extension snap or just not needed, so there's no point shipping them here too. 

One thing I've been guilty of in the past is to '[cargo-cult](https://en.wikipedia.org/wiki/Cargo_cult)' copy/paste a bunch of libraries I expect to be needed. What's better - and what Ken did here - is start with nothing, and repeatedly iterate, adding only what's needed.

The `prime` section explicitly spells out which files or groups of files will get 'primed' - that is, put forward to be packaged in the snap.

```diff
    stage-packages:
-       - libasound2
-       - libasound2-plugins
-       - libasyncns0
-       - libflac8
-       - libogg0
-       - libpulse0
+       - libdecor-0-0
-       - libsdl2-2.0-0
-       - libsndfile1
-       - libsndio7.0
-       - libvorbis0a
-       - libvorbisenc2
-       - libwayland-client0
-       - libwayland-cursor0
-       - libwayland-egl1
-       - libx11-6
-       - libxau6
-       - libxcb1
-       - libxcursor1
-       - libxdmcp6
-       - libxext6
-       - libxfixes3
-       - libxi6
-       - libxinerama1
-       - libxkbcommon0
-       - libxrandr2
-       - libxrender1
-       - libxss1
-       - libxxf86vm1
+ 
+     prime:
+       - usr/lib/*/libdecor*
+       - usr/lib/*/libSDL*
+       - usr/lib/*/libXss*
+       - x16emu
```

The final section bumps from the old `core20`-based `gnome-3-38` extension to the `core22`-based `gnome` extension - which provides a ton of functionality. The `snapcraft expand-extensions` command can be used to show exactly what the extension provides. The output is quite large, so I have attached it [here](/blog/text/2023-10-05/gnome-extension.yaml). 

```diff
  apps:
    x16emu:
-     extensions: [ gnome-3-38 ]
+     extensions: [ gnome ]
      command: x16emu -rom $SNAP/rom.bin
      environment:
-       LD_LIBRARY_PATH: "$SNAP/usr/lib/$SNAPCRAFT_ARCH_TRIPLET/pulseaudio"
        ALSA_CONFIG_PATH: "$SNAP/etc/asound.conf"
      plugs:
        - joystick
-       - x11
-       - opengl
        - audio-playback
        - audio-record
        - alsa
        - network
        - network-bind
        - home
        - removable-media
-       - wayland
```

I merged Ken's contribution, which triggered a new build, which was successful

[![Success](/blog/images/2023-10-05/success.png)](/blog/images/2023-10-05/success.png)

This got automatically published to the edge channel.

[![Releases](/blog/images/2023-10-05/releases.png)](/blog/images/2023-10-05/releases.png)

When the upstream project release a stable version, we'll get a build in the edge channel...

[![Now, we wait!](/blog/images/2023-10-05/and-now-we-wait.jpg)](/blog/images/2023-10-05/and-now-we-wait.jpg)

Thanks Ken!