+++
date = "2023-10-03T22:30:00+01:00"
title = "Fixing a broken snap build"
slug = "2023/10/fixing-a-broken-snap-build"
author = "Alan Pope"
tags = ['linux', 'ubuntu', 'snap', 'snapcraft', 'emulation', 'x16emu']
+++

I thought I'd "live blog" (not live) my way through fixing a [snap](https://snapcraft.io/) which I noticed was broken this morning. How did I notice? I happened to look at the build page for it. Maybe my spidey sense was tingling, because I wouldn't ordinarily have zoned in on this particular snap.

I could have some kind of alert that lets me know when this happens, but I currently don't. I might use my new-found love of [GitHub Actions](/blog/2023/09/publishing-hugo-site-via-github-actions), but that sounds like a future blog post!

## 10:05

For some reason, this morning I logged into the [snapcraft](https://snapcraft.io/) page to snoop around, and spotted the broken build. 

[![Broken build](/blog/images/2023-10-03/broken.png)](/blog/images/2023-10-03/broken.png)

Incidentally, I **detest** these "about 19 hours ago" and "13 days ago" date formats that became popular on the web about five years ago. They need to die in a fire. I don't want "A week last Tuesday", I'd like YYYY-MM-DD HH:MM:SS please.

I don't have time to fix this now, so I'll look at it later. It's on my to-do list though. The snap contains the X16 Emulator which is a software emulator for the new X16 computer popularised by The 8-bit Guy on YouTube.

## 16:42

Ok, now I have some time to fix it. I'm currently using the snapcraft build service - which is technically the [launchpad.net](https://launchpad.net/builders) build farm under the covers. You can see from the edge channel that we've recently had successful builds of the tip of git. As recently as last week in fact.

[![Builds](/blog/images/2023-10-03/builds.png)](/blog/images/2023-10-03/builds.png)

But more recently, it's failing.

[![Broken build](/blog/images/2023-10-03/broken.png)](/blog/images/2023-10-03/broken.png)

We can click on a failed build, and scroll through this page, or click the "View raw" button to go directly to the [build log](https://launchpadlibrarian.net/690090458/buildlog_snap_ubuntu_focal_armhf_5ab406df654dd49ff014a45da042ea16_BUILDING.txt.gz).

[![Fail](/blog/images/2023-10-03/fail.png)](/blog/images/2023-10-03/fail.png)

Here's a snippet from the log. This looks interesting and unfamiliar to me. I know the x16emulator uses cc65 to compile the ROM used by the emulator itself. Something awry with that perhaps.

```text
ld65 -C build/x16/cfg/bannex-x16.cfg build/x16/kernsup/kernsup_bannex.o build/x16/bannex/basic_far.o build/x16/bannex/main.o build/x16/bannex/renumber.o build/x16/bannex/sleep_cont.o build/x16/bannex/screen_default_color_from_nvram.o build/x16/bannex/help.o build/x16/bannex/splash.o build/x16/bannex/locate.o build/x16/bannex/dos.o -o build/x16/bannex.bin -m build/x16/bannex.map -Ln build/x16/bannex.sym \
`build/x16/../../findsymbols build/x16/basic.sym basic_fa chrgot crambank curlin facho index index1 index2 poker rencur reninc rennew renold rentmp rentmp2 txttab valtyp vartab verck` \
`build/x16/../../findsymbols build/x16/basic.sym -p basic_ chkcom crdo error frefac frmadr frmevl getadr getbyt linprt` \
`build/x16/../../findsymbols build/x16/kernal.sym mode`
ld65: Warning: build/x16/cfg/bannex-x16.cfg(50): Segment 'ZPBASIC' does not exist
ld65: Warning: build/x16/cfg/bannex-x16.cfg(50): Segment 'BVARS' does not exist
ld65: Warning: build/x16/cfg/bannex-x16.cfg(50): Segment 'ZPMATH' does not exist
ld65: Warning: build/x16/cfg/bannex-x16.cfg(50): Segment 'FPVARS' does not exist
ld65: Warning: build/x16/cfg/bannex-x16.cfg(50): Segment 'BVARSB0' does not exist
ld65: Warning: Address size mismatch for 'chkcom': Exported from basic_far.o, bannex/basic_far.s(35) as 'absolute', import in renumber.o, bannex/renumber.s(17) as 'zeropage'
Segmentation fault (core dumped)
make: *** [Makefile:369: build/x16/bannex.bin] Error 139
Failed to run 'override-build': Exit code was 2.
Build failed
```

## 16:44 

Let's start by seeing if my snap is consuming outdated packages. Sometimes I'll point my snap at a particular build of a library, compiler or other dependency. Maybe there's been an update.

The x16emu snap builds from config in [this git repo](https://github.com/popey/x16emu-snap). Looking at the [snapcraft.yaml](https://github.com/popey/x16emu-snap/blob/master/snap/snapcraft.yaml), it seems I'm pulling `x16-roms` and `x16-emulator` then doing some shennaigans to find out if there's been a stable release since the last version published in the beta channel.

If there is, we checkout that release and build it. If there hasn't been a new release since the last one in the beta channel, then we just build whatever was in the tip of git. That's what's happening today. I am not specifying a particular git commit or release. 

Given the snap built fine a few days ago, and I haven't touched the yaml for three weeks, we can safely say "someone else broke this". 

## 16:45: 

Let's look at the upstream project repo, to see if there have been any changes which may have broken things since the last good builds a few days ago.

[![Upstream changes](/blog/images/2023-10-03/changes.png)](https://github.com/X16Community/x16-emulator/commits/master)

{{< rawhtml >}}
<center><iframe width="560" height="315" src="https://www.youtube.com/embed/2FYjduk3sZM?si=QmHlrYvU-_aEd2zh" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></center>
{{< /rawhtml >}}

Looking deeper at the [build log](https://launchpadlibrarian.net/690090458/buildlog_snap_ubuntu_focal_armhf_5ab406df654dd49ff014a45da042ea16_BUILDING.txt.gz) it's not actually the emulator that's faily to build, but the ROM. Here's the start of the section which ends with the failure above. Note the announcement from snapcraft itself that it's building the x16-roms part.

```text
Building x16-roms 
+ make
git diff --quiet && /bin/echo -n $( (git rev-parse --short=8 HEAD || /bin/echo "00000000") | tr '[:lower:]' '[:upper:]') > build/x16/../signature.bin \
|| /bin/echo -n $( /bin/echo -n $(git rev-parse --short=7 HEAD || echo "0000000") | tr '[:lower:]' '[:upper:]'; /bin/echo -n '+') > build/x16/../signature.bin
ca65 -I inc -D CPU_65C02=1  -g -D MACHINE_X16=1 --cpu 65SC02 -l build/x16/kernal/declare.lst kernal/declare.s -o build/x16/kernal/declare.o
ca65 -I inc -D CPU_65C02=1  -g -D MACHINE_X16=1 --cpu 65SC02 -l build/x16/kernal/vectors.lst kernal/vectors.s -o build/x16/kernal/vectors.o
ca65 -I inc -D CPU_65C02=1  -g -D MACHINE_X16=1 --cpu 65SC02 -l build/x16/kernal/kbdbuf.lst kernal/kbdbuf.s -o build/x16/kernal/kbdbuf.o
```

The source for the rom is also on github, in [this repo](https://github.com/x16community/x16-rom.git)

[![Upstream ROM changes](/blog/images/2023-10-03/romchanges.png)](https://github.com/X16Community/x16-rom/commits/master)

## 16:55 

Ok, let's take a step back and consolidate. So far we have made no changes that I'm aware of to the snap, but the ROM is failing to build. If we look at the snap configuration, it's not hard to see that the ROM build is very simple:

```yaml
  x16-roms:
    plugin: make
    source: https://github.com/x16community/x16-rom.git
    build-packages:
      - cc65
    override-build: |
      make
      install build/x16/rom.bin $SNAPCRAFT_PART_INSTALL/
```

So let's just try cloning that repo on my ThinkPad running Ubuntu 23.04 and see if the code builds outside of the snap environment, or if the main branch is just broken.

```bash
sudo apt install cc65 make
git clone https://github.com/x16community/x16-rom.git
cd x16-rom
make
ls -lh build/x16/rom.bin 
-rw-rw-r-- 1 alan alan 208K Oct  3 21:02 build/x16/rom.bin
```

Ok, so the main branch on github is fine, it seems. However, the snap builds against `core20` which is effectively Ubuntu 20.04. So let's do the same build but using the Ubuntu 20.04 toolchain.

We can do that by quickly spinning up an Ubuntu 20.04 container.

```bash
lxc launch ubuntu:20.04 x16roms
lxc shell x16roms
git clone https://github.com/x16community/x16-rom.git
cd x16-rom
apt update ; apt install cc65 make
make
```

Time passes...

```text
build/x16/../../findsymbols build/x16/basic.sym -p basic_ chkcom cld10 crdo erexit error frefac frmadr frmevl getadr getbyt linprt nsnerr6` \
`build/x16/../../findsymbols build/x16/kernal.sym mode`
ld65: Warning: build/x16/cfg/bannex-x16.cfg(50): Segment 'ZPBASIC' does not exist
ld65: Warning: build/x16/cfg/bannex-x16.cfg(50): Segment 'BVARS' does not exist
ld65: Warning: build/x16/cfg/bannex-x16.cfg(50): Segment 'ZPMATH' does not exist
ld65: Warning: build/x16/cfg/bannex-x16.cfg(50): Segment 'FPVARS' does not exist
ld65: Warning: build/x16/cfg/bannex-x16.cfg(50): Segment 'BVARSB0' does not exist
ld65: Warning: Address size mismatch for 'chkcom': Exported from basic_far.o, bannex/basic_far.s(44) as 'absolute', import in renumber.o, bannex/renumber.s(17) as 'zeropage'
Segmentation fault (core dumped)
make: *** [Makefile:369: build/x16/bannex.bin] Error 139
```

Ahah!

Let's see whether Ubuntu 20.04 (Focal) has a different version of the `cc65` compiler than my Ubuntu 23.04 laptop.

```bash
$ rmadison cc65
 cc65 | 2.16-2 | bionic/universe | source, amd64, arm64, armhf, i386, ppc64el, s390x
 cc65 | 2.18-1 | focal/universe  | source, amd64, arm64, armhf, ppc64el, riscv64, s390x
 cc65 | 2.19-1 | jammy/universe  | source, amd64, arm64, armhf, ppc64el, riscv64, s390x
 cc65 | 2.19-1 | lunar/universe  | source, amd64, arm64, armhf, ppc64el, riscv64, s390x
 cc65 | 2.19-1 | mantic/universe | source, amd64, arm64, armhf, ppc64el, riscv64, s390x
```

## 17:00 

I wonder what changed in cc65. There was a [release](https://github.com/cc65/cc65/releases/tag/V2.19) of cc65 - 2.19 - in November 2020, after the focal release of ubuntu came out.

Ok, so the current state of play is:

* x16-roms fails to build on Ubuntu 20.04 (cc65 2.18), but builds on 23.04 (cc65 2.19)
* The snap currently builds against 20.04
* Ubuntu 22.04 (Lunar) also has cc65 2.19

I consider my options:

1. Tell the x16-roms people that it fails to build on 20.04
2. Fix my snap to use cc65 2.19 built from source
3. Update my snap to build on core 22 - so Ubuntu 22.04 (Lunar) which has cc65 2.19

The first option is unfair, because it's likely not their fault, as far as I can tell. The second option makes my snap more complex, but might be an option. Perhaps the path of least resistance to everyone else is bump the snap, so let's do that.

*foreshadowing*

My options are now:

1. Clone my snap build recipe and update it to core22 then build locally on my workstation to prove this
2. Ninja edit core20 to core22 in the repo and hope it builds in the snapcraft build system

Option 2 is faster, but it might fail for other reasons, so let's do this "properly".

## 17:05

```bash
git clone https://github.com/popey/x16emu-snap
cd x16emu-snap
```

I then edit `snap/snapcraft.yaml` to replace `core20` with `core22`:

```yaml
name: x16emu
base: core22
adopt-info: x16-emulator
summary: Commander X16 Emulator
```

I fully anticipate this will fail, because I have a bunch of stage packages which I guess have bumped to new versions. But it wont take long to build, so let's try it and iterate!

```bash
snapcraft --use-lxd --debug
```

I get an error that `gnome-3-38` extension does not exist.
                                                                            
Oof. It's right:

```bash
snapcraft list-extensions

Extension name    Supported bases
----------------  ----------------------
flutter-beta      core18
flutter-dev       core18
flutter-master    core18
flutter-stable    core18
gnome             core22
gnome-3-28        core18
gnome-3-34        core18
gnome-3-38        core20
kde-neon          core18, core20, core22
ros1-noetic       core20
ros2-foxy         core20
ros2-humble       core22        
```

I need `gnome` not `gnome-3-38`, so I fix that in the yaml and try again.

## 17:14

Build finished - and failed

```bash
$ snapcraft  --use-lxd --debug
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
'override-build' in part 'x16-emulator' failed with code 2.
Review the scriptlet and make sure it's correct.
Launching shell on build environment...     
```

But differently! This snippet failed! 

```yaml
    override-build: |
      make
      cp x16emu $SNAPCRAFT_PART_INSTALL
```

Here's what it says:

```text
:: g++ -o x16emu build/x16emu/cpu/fake6502.o build/x16emu/memory.o 
build/x16emu/disasm.o build/x16emu/video.o build/x16emu/i2c.o 
build/x16emu/smc.o build/x16emu/rtc.o build/x16emu/via.o build/x16emu/serial.o 
build/x16emu/ieee.o build/x16emu/vera_spi.o build/x16emu/audio.o 
build/x16emu/vera_pcm.o build/x16emu/vera_psg.o build/x16emu/sdcard.o 
build/x16emu/main.o build/x16emu/debugger.o build/x16emu/javascript_interface.o 
build/x16emu/joystick.o build/x16emu/rendertext.o build/x16emu/keyboard.o 
build/x16emu/icon.o build/x16emu/timing.o build/x16emu/wav_recorder.o 
build/x16emu/testbench.o build/x16emu/files.o build/x16emu/cartridge.o 
build/x16emu/iso_8859_15.o build/x16emu/ymglue.o build/x16emu/extern/ymfm/src/ymfm_opm.o
 -lSDL2 -lm -lz -flto            
:: lto1: fatal error: bytecode stream in file ‘build/x16emu/cpu/fake6502.o’ 
generated with LTO version 11.2 instead of the expected 11.3                                                     
:: compilation terminated.                                                       
:: lto-wrapper: fatal error: g++ returned 1 exit status
:: compilation terminated.
:: /snap/gnome-42-2204-sdk/current/usr/bin/ld: error: lto-wrapper failed
:: collect2: error: ld returned 1 exit status
:: make: *** [Makefile:81: x16emu] Error 1
'override-build' in part 'x16-emulator' failed with code 2.   
```

Well that's not good. I have no idea what's going on here! 

*Cue rapid googling for "generated with LTO version 11.2 instead of the expected 11.3".* 

Nothing seems to make sense, and nothing to do with anything I'm using.

I think that, the error comes from the `ld` binary inside the `gnome-42-2204-sdk package`. So as a complete guess, that snap (which mine is using via the extension gnome) is older or somehow incompatible with the `ld` or `g++` I'm using?

According to this, inside my lxd container, I'm using gnome-42-2204-sdk from the stable channel, which was updated a few days ago.

```bash
 snap info gnome-42-2204-sdk | tail -n 5
  latest/stable:    0+git.bfc92e4 2023-09-27 (217) 435MB -
  latest/candidate: 0+git.bfc92e4 2023-09-27 (217) 435MB -
  latest/beta:      ^                                    
  latest/edge:      0+git.bfc92e4 2023-09-27 (217) 435MB -
installed:          0+git.bfc92e4            (217) 435MB -
```

Compare the ld binaries between the two packages maybe?

```text
snapcraft-x16emu-on-amd64-for-amd64-38142451 ../project# ls -l /snap/gnome-42-2204-sdk/current/usr/bin/ld
lrwxrwxrwx 1 root root 19 Jun  4 06:49 /snap/gnome-42-2204-sdk/current/usr/bin/ld -> x86_64-linux-gnu-ld
snapcraft-x16emu-on-amd64-for-amd64-38142451 ../project# ls -l /snap/gnome-42-2204-sdk/current/usr/bin/x86_64-linux-gnu-ld
lrwxrwxrwx 1 root root 23 Jun  4 06:49 /snap/gnome-42-2204-sdk/current/usr/bin/x86_64-linux-gnu-ld -> x86_64-linux-gnu-ld.bfd
snapcraft-x16emu-on-amd64-for-amd64-38142451 ../project# ls -l /snap/gnome-42-2204-sdk/current/usr/bin/x86_64-linux-gnu-ld.bfd
-rwxr-xr-x 1 root root 1744376 Sep 27 16:37 /snap/gnome-42-2204-sdk/current/usr/bin/x86_64-linux-gnu-ld.bfd

```

Maybe this will enlighten me?

```bash
# md5sum /usr/bin/x86_64-linux-gnu-ld.bfd /snap/gnome-42-2204-sdk/current/usr/bin/x86_64-linux-gnu-ld.bfd
22cc8673ef6f1dcee61d33b9f26559d9  /usr/bin/x86_64-linux-gnu-ld.bfd
8ee79eaebbb1f3c7bb4e52433aada8e1  /snap/gnome-42-2204-sdk/current/usr/bin/x86_64-linux-gnu-ld.bfd

```

Ok, so they differ. No idea why.

## 17:29

Let's try building without the gnome extension and see if that works...

I quit out of the lxd container I'm in because I ran `snapcraft` in `--debug`, edit the snapcraft yaml to remove the gnome extension and run a clean build...

```yaml
apps:
  x16emu:
    #extensions: [ gnome ]
    command: x16emu -rom $SNAP/rom.bin

```

```bash
snapcraft clean --use-lxd
snapcraft --use-lxd --debug
```

☕ *BIO BREAK* 🚽

I return to my desk to find it built fine.

```bash
$ snapcraft  --use-lxd --debug
Launching instance...
Executed: pull alsa-pulseaudio
Executed: pull x16-roms
Executed: pull x16-emulator
Executed: build alsa-pulseaudio
Executed: build x16-roms
Executed: skip pull x16-roms (already ran)
Executed: skip build x16-roms (already ran)
Executed: stage x16-roms (required to build 'x16-emulator')
Executed: skip pull alsa-pulseaudio (already ran)
Executed: skip build alsa-pulseaudio (already ran)
Executed: stage alsa-pulseaudio (required to build 'x16-emulator')
Executed: build x16-emulator
Executed: skip stage alsa-pulseaudio (already ran)
Executed: skip stage x16-roms (already ran)
Executed: stage x16-emulator
Executed: prime alsa-pulseaudio
Executed: prime x16-roms
Executed: prime x16-emulator
Executed parts lifecycle
Generated snap metadata
Lint warnings:
- library: libjacknet.so.0: unused library 'usr/lib/x86_64-linux-gnu/libjacknet.so.0.1.0'. (https://snapcraft.io/docs/linters-library)                                                       
- library: libjackserver.so.0: unused library 'usr/lib/x86_64-linux-gnu/libjackserver.so.0.1.0'. (https://snapcraft.io/docs/linters-library)                                                 
- library: libpulse-simple.so.0: unused library 'usr/lib/x86_64-linux-gnu/libpulse-simple.so.0.1.1'. (https://snapcraft.io/docs/linters-library)                                             
- library: libsndio.so.7: unused library 'usr/lib/x86_64-linux-gnu/libsndio.so.7.1'. (https://snapcraft.io/docs/linters-library)                                                             
Created snap package x16emu_b16509b_amd64.snap 
```

Ok, so in summary

* Building against core22 is good, because that gets us a newer cc65
* Building with the gnome extension specified fails
* Removing the gnome extension works

## 17:37

I'm going to stop the clock on this after about an hour, and decide that it *should* work with core22 *and* the gnome extension, but it's not the fault of my snap config it doesn't. Bold assertion to make, maybe. 

I think my options are:

1. Add back in all the libraries and other features that are missing because I removed the gnome extension
2. Start a thread on the forum because in my mind this should work, and it's the extensions' fault.  

Option 1 doesn't appeal, because the whole point of the gnome extension is to make it easier to build snaps, and have some de-duplication of libraries.

## 17:42

So, I will drive home from the office and consider my next option. 

## 21:46

I decided to start a [thread](https://forum.snapcraft.io/t/build-fail-with-gnome-extension-on-core22/37145?u=popey) on the [snapcraft forum](https://forum.snapcraft.io). 

We shall wait and see what a solution might look like.