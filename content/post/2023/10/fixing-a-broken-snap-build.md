+++
date = "2023-10-03T17:00:00+01:00"
title = "Fixing a broken snap build"
slug = "2023/10/fixing-a-broken-snap-build"
author = "Alan Pope"
tags = ['linux', 'ubuntu', 'snap', 'snapcraft', 'emulation', 'x16emu']
draft = "true"
+++

I thought I'd "live blog" (not live) my way through fixing a [snap](https://snapcraft.io/) which I noticed was broken this morning. How did I notice? I happened to look at the build page for it. I should really have some kind of alert that lets me know when this happens, but I currently don't. That sounds like a future blog post!

[![Broken build](/blog/images/2023-10-03/broken.png)](/blog/images/2023-10-03/broken.png)

## 10:05

Logged into the [snapcraft](https://snapcraft.io/) page to snoop around, and spotted the broken build. I don't have time to fix this now, so I'll look at it later. It's on my to-do list though.

## 16:42: have some time to fix it

picture

```
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
Traceback (most recent call last):
  File "/usr/lib/python3/dist-packages/lpbuildd/target/build_snap.py", line 265, in run
    self.pull()
  File "/usr/lib/python3/dist-packages/lpbuildd/target/build_snap.py", line 205, in pull
    self.run_build_command(
  File "/usr/lib/python3/dist-packages/lpbuildd/target/operation.py", line 62, in run_build_command
    return self.backend.run(args, cwd=cwd, env=full_env, **kwargs)
  File "/usr/lib/python3/dist-packages/lpbuildd/target/lxd.py", line 716, in run
    subprocess.check_call(cmd, **kwargs)
  File "/usr/lib/python3.8/subprocess.py", line 364, in check_call
    raise CalledProcessError(retcode, cmd)
```

16:44 Let's see if we need to update anything
https://github.com/popey/x16emu-snap - no versions specified, pull from main

16:45: lets look upstream
https://github.com/x16community/x16-emulator.git

last success was 3 days ago
(image of edge channel) and "3 days ago" thing (which I hate)

checking the log, it's not the emulator that's failing to build, it's the rom. https://github.com/x16community/x16-rom.git

16:55 Try building that on my workstation, which is 23.04, builds fine.

try on ubuntu 20.04, as it's a core20 snap in a container


lxc launch ubuntu:20.04 x16roms

lxc shell x16roms

git clone https://github.com/x16community/x16-rom.git
cd x16-rom
apt update ; apt install cc65 make

make

```
`build/x16/../../findsymbols build/x16/basic.sym -p basic_ chkcom cld10 crdo erexit error frefac frmadr frmevl getadr getbyt linprt nsnerr6` \
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

Let's see...

```
$ rmadison cc65
 cc65 | 2.16-2 | bionic/universe | source, amd64, arm64, armhf, i386, ppc64el, s390x
 cc65 | 2.18-1 | focal/universe  | source, amd64, arm64, armhf, ppc64el, riscv64, s390x
 cc65 | 2.19-1 | jammy/universe  | source, amd64, arm64, armhf, ppc64el, riscv64, s390x
 cc65 | 2.19-1 | lunar/universe  | source, amd64, arm64, armhf, ppc64el, riscv64, s390x
 cc65 | 2.19-1 | mantic/universe | source, amd64, arm64, armhf, ppc64el, riscv64, s390x
```

17:00 lets see what changed in cc65...

there was a release of cc64 - 2.19 - in November 2000, after the focal release of ubuntu came out https://github.com/cc65/cc65/releases/tag/V2.19

Consider my options

* Tell the x16-roms people that it fails to build on 20.04
* Fix my snap to use cc64 2.19 built from source
* Update my snap to build on core 22 - so ubuntu 22.04 which has cc65

Least resistance to everyone else is bump the snap, so let's do that

My options are now:

1 clone my repo and update is and build locally on my workstation to prove this
2 ninja edit core20 to core22 and hope it builds

2 is faster, but it might fail for other reasons, so let's do this "properly"

17:05

git clone https://github.com/popey/x16emu-snap
cd x16emu-snap
edit snap/snapcraft.yaml to replace core20 with core22

```
name: x16emu
base: core22
adopt-info: x16-emulator
summary: Commander X16 Emulator
```

I fully expect this to fail, because I have a bunch of stage packages which I suspect have bumped to new versions. But this doesn't take long to build, so let's iterate!

snapcraft --use-lxd --debug

Extension 'gnome-3-38' does not exist                                                                                                                                                        
Oof.

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

Aha! I need "gnome" not gnome-3-38, fix that and try again

17:08

17:14

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

```
    override-build: |
      make
      cp x16emu $SNAPCRAFT_PART_INSTALL
```

Here's what it says:

```
:: g++ -o x16emu build/x16emu/cpu/fake6502.o build/x16emu/memory.o build/x16emu/disasm.o build/x16emu/video.o build/x16emu/i2c.o build/x16emu/smc.o build/x16emu/rtc.o build/x16emu/via.o build/x16emu/serial.o build/x16emu/ieee.o build/x16emu/vera_spi.o build/x16emu/audio.o build/x16emu/vera_pcm.o build/x16emu/vera_psg.o build/x16emu/sdcard.o build/x16emu/main.o build/x16emu/debugger.o build/x16emu/javascript_interface.o build/x16emu/joystick.o build/x16emu/rendertext.o build/x16emu/keyboard.o build/x16emu/icon.o build/x16emu/timing.o build/x16emu/wav_recorder.o build/x16emu/testbench.o build/x16emu/files.o build/x16emu/cartridge.o build/x16emu/iso_8859_15.o build/x16emu/ymglue.o build/x16emu/extern/ymfm/src/ymfm_opm.o -lSDL2 -lm -lz -flto            
:: lto1: fatal error: bytecode stream in file ‘build/x16emu/cpu/fake6502.o’ generated with LTO version 11.2 instead of the expected 11.3                                                     
:: compilation terminated.                                                                                                                                                                   
:: lto-wrapper: fatal error: g++ returned 1 exit status                                                                                                                                      
:: compilation terminated.                                                                                                                                                                   
:: /snap/gnome-42-2204-sdk/current/usr/bin/ld: error: lto-wrapper failed                                                                                                                     
:: collect2: error: ld returned 1 exit status                                                                                                                                                
:: make: *** [Makefile:81: x16emu] Error 1                                                                                                                                                   
'override-build' in part 'x16-emulator' failed with code 2.
   
```

Well that's not good. I have no idea what's going on here.

Furious googling for "generated with LTO version 11.2 instead of the expected 11.3"

Given the error comes from the `ld` binary inside the gnome-42-2204-sdk package, at a complete guess, that snap (which mine is using via the extension gnome) is older than the ld g++ I'm using?


```
 snap info gnome-42-2204-sdk | tail -n 5
  latest/stable:    0+git.bfc92e4 2023-09-27 (217) 435MB -
  latest/candidate: 0+git.bfc92e4 2023-09-27 (217) 435MB -
  latest/beta:      ^                                    
  latest/edge:      0+git.bfc92e4 2023-09-27 (217) 435MB -
installed:          0+git.bfc92e4            (217) 435MB -

```


```
snapcraft-x16emu-on-amd64-for-amd64-38142451 ../project# ls -l /snap/gnome-42-2204-sdk/current/usr/bin/ld
lrwxrwxrwx 1 root root 19 Jun  4 06:49 /snap/gnome-42-2204-sdk/current/usr/bin/ld -> x86_64-linux-gnu-ld
snapcraft-x16emu-on-amd64-for-amd64-38142451 ../project# ls -l /snap/gnome-42-2204-sdk/current/usr/bin/x86_64-linux-gnu-ld
lrwxrwxrwx 1 root root 23 Jun  4 06:49 /snap/gnome-42-2204-sdk/current/usr/bin/x86_64-linux-gnu-ld -> x86_64-linux-gnu-ld.bfd
snapcraft-x16emu-on-amd64-for-amd64-38142451 ../project# ls -l /snap/gnome-42-2204-sdk/current/usr/bin/x86_64-linux-gnu-ld.bfd
-rwxr-xr-x 1 root root 1744376 Sep 27 16:37 /snap/gnome-42-2204-sdk/current/usr/bin/x86_64-linux-gnu-ld.bfd

```

```
# md5sum /usr/bin/x86_64-linux-gnu-ld.bfd /snap/gnome-42-2204-sdk/current/usr/bin/x86_64-linux-gnu-ld.bfd
22cc8673ef6f1dcee61d33b9f26559d9  /usr/bin/x86_64-linux-gnu-ld.bfd
8ee79eaebbb1f3c7bb4e52433aada8e1  /snap/gnome-42-2204-sdk/current/usr/bin/x86_64-linux-gnu-ld.bfd

```


HMMMMMM

17:29

Let's try building without the gnome extension and see if that works...

Quit out of the lxd container (because I ran snapcraft in --debug), edit the snapcraft yaml to remove the gnome extension and run a clean build...

```
apps:
  x16emu:
    #extensions: [ gnome ]
    command: x16emu -rom $SNAP/rom.bin

```

snapcraft clean --use-lxd

snapcraft --use-lxd --debug

*BIO BREAK*

I return to my desk to find it built fine.

```
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

17:37

Ok, let's see if that runs

```
$ snap install x16emu_b16509b_amd64.snap --dangerous
x16emu b16509b installed
alan@ziggy:~/Source/popey/x16emu-snap$ snap run x16emu
/snap/x16emu/x2/x16emu: error while loading shared libraries: libSDL2-2.0.so.0: cannot open shared object file: No such file or directory
```

Ok, that's because the gnome extension ships that library, and i removed the extension.

I'm going to stop the clock on this and decide that it *should* work with core22 *and* the gnome extension, but it's not my fault that it doesn't. Bold assertion to make, maybe. 

I think my options are:

1 Add back in all the libraries that are missing because I removed the gnome extension
2 Start a thread on the forum because in my mind this should work, and it's the extensions' fault.  

17:42

So, I will drive home from the office and consider my next option. 
