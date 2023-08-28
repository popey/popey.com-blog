+++
date = "2023-01-05T09:00:00-00:00"
title = "Year of The Broken Desktop"
slug = "2023/01/year-of-the-broken-desktop"
author = "Alan Pope"
tags = ['ubuntu', 'nvidia', 'qa']
+++

This morning I attempted to start work on my desktop PC and couldn't. The screen is black, it doesn't want to wake up the displays. I used the old REISUB trick to restart, and it boots, but there's no output on the display. I did some investigation and this post is mainly to capture my notes and so others can see the problem and perhaps debug and fix it.

The setup is an Intel Skull Canyon NUC connected to an external GPU enclosure which contains an NVIDIA GeForce RTX 2060. I've previously [blogged](/blog/2020/12/multiple-gpus-in-a-skull-canyon-nuc/) about this weird machine, get more details there. I have since upgraded the GPU since that post, however.

There are three displays connected to the GPU, and no displays connected directly to the PC itself. I'm running Kubuntu 20.04.1. I did all my updates a couple of days ago, but have not rebooted since. 

## Prior Experience

I know the NVIDIA driver sometimes gets **uninstalled** 🪄magically🪄 by the usual updates from Ubuntu. This has happened before. 

I've also had the `/etc/X11/xorg.conf` file **disappear** 🪄magically🪄 when updates come from Ubuntu. 

Both of these can lead to a black screen on the desktop as the GPU driver won't load if it's not installed, and won't see the eGPU if the `Option         "AllowExternalGpus" "true"` line is missing from `/etc/X11/xorg.conf`. So I should check for those situations

## Things I tried

Reboot - duh - ALT+SysRQ + REISUB - came back to a black screen.

Get to a TTY to debug - CTRL+ALT+F1 through F5 - nothing happens.

I have SSH'ed into the desktop from my laptop - success. From here I can do more debugging.

## Things I have discovered

✅ The `/etc/X11/xorg.conf` exists and contains the `Option         "AllowExternalGpus" "true"` line I need. 

```bash
Section "Device"
    Identifier     "Device0"
    Driver         "nvidia"
    Option         "AllowExternalGpus" "true"
    VendorName     "NVIDIA Corporation"
EndSection

```

✅ The NVIDIA card is detected

```bash
alan@robot:~$ lspci | grep -i geforce
0c:00.0 VGA compatible controller: NVIDIA Corporation TU104 [GeForce RTX 2060] (rev a1)
```

✅ The NVIDIA driver is loaded on boot

```bash
alan@robot:~$ sudo dmesg | grep nvidia
[sudo] password for alan: 
[   17.438614] audit: type=1400 audit(1672909681.409:5): apparmor="STATUS" operation="profile_load" profile="unconfined" name="nvidia_modprobe" pid=1047 comm="apparmor_parser"
[   17.438618] audit: type=1400 audit(1672909681.409:6): apparmor="STATUS" operation="profile_load" profile="unconfined" name="nvidia_modprobe//kmod" pid=1047 comm="apparmor_parser"
[   18.507616] nvidia-nvlink: Nvlink Core is being initialized, major device number 506
[   18.508975] nvidia-nvlink: Unregistered Nvlink Core, major device number 506
[   19.370771] nvidia-nvlink: Nvlink Core is being initialized, major device number 505
[   19.372067] nvidia 0000:0c:00.0: enabling device (0006 -> 0007)
[   19.372217] nvidia 0000:0c:00.0: vgaarb: changed VGA decodes: olddecodes=io+mem,decodes=none:owns=none
[   21.391426] nvidia-modeset: Loading NVIDIA Kernel Mode Setting Driver for UNIX platforms  525.60.11  Wed Nov 23 22:49:17 UTC 2022
[   21.402180] [drm] [nvidia-drm] [GPU ID 0x00000c00] Loading driver
[   22.131624] [drm] Initialized nvidia-drm 0.0.0 20160202 for 0000:0c:00.0 on minor 2
[   22.169073] nvidia_uvm: module uses symbols from proprietary module nvidia, inheriting taint.
[   22.173171] nvidia-uvm: Loaded the UVM driver, major device number 503.
[   23.168324] nvidia-gpu 0000:0c:00.3: i2c timeout error e0000000
```

```bash
alan@robot:~$ lsmod | grep nvidia
nvidia_uvm           1363968  0
nvidia_drm             69632  1
nvidia_modeset       1208320  2 nvidia_drm
nvidia              56127488  88 nvidia_uvm,nvidia_modeset
i2c_nvidia_gpu         16384  0
drm_kms_helper        311296  3 amdgpu,nvidia_drm,i915
drm                   622592  13 gpu_sched,drm_kms_helper,nvidia,amdgpu,drm_ttm_helper,nvidia_drm,i915,ttm
```

✅ The NVIDIA driver has recently been updated (2 days ago)

```bash
alan@robot:~$ grep nvidia-driver /var/log/dpkg.log.1
2022-12-03 15:05:08 install nvidia-driver-525:amd64 <none> 525.60.11-0ubuntu0.22.04.1
2022-12-03 15:05:08 status half-installed nvidia-driver-525:amd64 525.60.11-0ubuntu0.22.04.1
2022-12-03 15:05:08 status unpacked nvidia-driver-525:amd64 525.60.11-0ubuntu0.22.04.1
2022-12-03 15:05:48 configure nvidia-driver-525:amd64 525.60.11-0ubuntu0.22.04.1 <none>
2022-12-03 15:05:48 status unpacked nvidia-driver-525:amd64 525.60.11-0ubuntu0.22.04.1
2022-12-03 15:05:48 status half-configured nvidia-driver-525:amd64 525.60.11-0ubuntu0.22.04.1
2022-12-03 15:05:48 status installed nvidia-driver-525:amd64 525.60.11-0ubuntu0.22.04.1
```

✅ Xorg is loading

```bash
alan@robot:~$ head /var/log/Xorg.0.log
[    18.618] (--) Log file renamed from "/var/log/Xorg.pid-1511.log" to "/var/log/Xorg.0.log"
[    18.619] 
X.Org X Server 1.21.1.3
X Protocol Version 11, Revision 0
[    18.619] Current Operating System: Linux robot 5.15.0-56-generic #62-Ubuntu SMP Tue Nov 22 19:54:14 UTC 2022 x86_64
[    18.619] Kernel command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-56-generic root=UUID=c212e9d4-a049-4da0-8e34-971cb7414e60 ro quiet splash vt.handoff=7
[    18.619] xorg-server 2:21.1.3-2ubuntu2.5 (For technical support please see http://www.ubuntu.com/support) 
[    18.619] Current version of pixman: 0.40.0
[    18.619] 	Before reporting problems, check http://wiki.x.org
	to make sure that you have the latest version.
```

❌ NVIDIA Xorg module is not

```bash
alan@robot:~$ grep -i nvidia /var/log/Xorg.0.log
[    18.631] (II) LoadModule: "nvidia"
[    18.632] (WW) Warning, couldn't open module nvidia
[    18.632] (EE) Failed to load module "nvidia" (module does not exist, 0)
[    23.834] (II) Applying OutputClass "nvidia" options to /dev/dri/card2
[    23.834] (II) Applying OutputClass "Nvidia Prime" options to /dev/dri/card2
[    23.885] (II) modeset(G1): glamor X acceleration enabled on NVIDIA GeForce RTX 2060/PCIe/SSE2
[    24.804] (II) config/udev: Adding input device HDA NVidia HDMI/DP,pcm=3 (/dev/input/event28)
[    24.804] (II) config/udev: Adding input device HDA NVidia HDMI/DP,pcm=7 (/dev/input/event29)
[    24.804] (II) config/udev: Adding input device HDA NVidia HDMI/DP,pcm=8 (/dev/input/event30)
[    24.805] (II) config/udev: Adding input device HDA NVidia HDMI/DP,pcm=9 (/dev/input/event31)
[    24.805] (II) config/udev: Adding input device HDA NVidia HDMI/DP,pcm=10 (/dev/input/event256)
[    24.805] (II) config/udev: Adding input device HDA NVidia HDMI/DP,pcm=11 (/dev/input/event257)
[    25.088] (II) Applying OutputClass "nvidia" options to /dev/dri/card2
[    25.088] (II) Applying OutputClass "Nvidia Prime" options to /dev/dri/card2
[    25.089] (II) modeset(G1): glamor X acceleration enabled on NVIDIA GeForce RTX 2060/PCIe/SSE2
[    25.976] (II) config/udev: Adding input device HDA NVidia HDMI/DP,pcm=3 (/dev/input/event28)
[    25.976] (II) config/udev: Adding input device HDA NVidia HDMI/DP,pcm=8 (/dev/input/event30)
[    25.977] (II) config/udev: Adding input device HDA NVidia HDMI/DP,pcm=9 (/dev/input/event31)
[    25.977] (II) config/udev: Adding input device HDA NVidia HDMI/DP,pcm=7 (/dev/input/event29)
[    25.977] (II) config/udev: Adding input device HDA NVidia HDMI/DP,pcm=11 (/dev/input/event257)
[    25.978] (II) config/udev: Adding input device HDA NVidia HDMI/DP,pcm=10 (/dev/input/event256)
```

So the card is okay, kernel driver is loaded, but Xorg won't start because some card-specific module is perhaps missing? 

I am aware that on Ubuntu the Xorg display system is broken up into a bunch of packages. I have 17 or so installed.

```bash
alan@robot:~$ dpkg -l xserver-xorg* | grep -c ^ii
17
```

✅ The NVIDIA binary Xorg module is installed

```bash
alan@robot:~$ dpkg -l xserver-xorg-video-nvidia-525 | grep ^ii
ii  xserver-xorg-video-nvidia-525 525.60.11-0ubuntu0.22.04.1 amd64        NVIDIA binary Xorg driver
```

✅ Which matches the version of the kernel module

```bash
alan@robot:~$ dpkg -l nvidia-driver-525 | grep ^ii
ii  nvidia-driver-525 525.60.11-0ubuntu0.22.04.1 amd64        NVIDIA driver metapackage
```

## Now what?

If you do any kind of search online for fixes, the typical response is "reinstall the driver and reboot". Ubuntu ships with a graphical tool to help install drivers, and a command line utility called `ubuntu-drivers`. As I can't get Xorg to load, I'll be using the command-line utility. Only... no I won't.

❌ Try to reinstall the NVIDIA driver

```bash
alan@robot:~$ ubuntu-drivers install
Traceback (most recent call last):
  File "/usr/bin/ubuntu-drivers", line 513, in <module>
    greet()
  File "/usr/lib/python3/dist-packages/click/core.py", line 1128, in __call__
    return self.main(*args, **kwargs)
  File "/usr/lib/python3/dist-packages/click/core.py", line 1053, in main
    rv = self.invoke(ctx)
  File "/usr/lib/python3/dist-packages/click/core.py", line 1659, in invoke
    return _process_result(sub_ctx.command.invoke(sub_ctx))
  File "/usr/lib/python3/dist-packages/click/core.py", line 1395, in invoke
    return ctx.invoke(self.callback, **ctx.params)
  File "/usr/lib/python3/dist-packages/click/core.py", line 754, in invoke
    return __callback(*args, **kwargs)
  File "/usr/lib/python3/dist-packages/click/decorators.py", line 84, in new_func
    return ctx.invoke(f, obj, *args, **kwargs)
  File "/usr/lib/python3/dist-packages/click/core.py", line 754, in invoke
    return __callback(*args, **kwargs)
  File "/usr/bin/ubuntu-drivers", line 413, in install
    command_install(config)
  File "/usr/bin/ubuntu-drivers", line 187, in command_install
    UbuntuDrivers.detect.nvidia_desktop_pre_installation_hook(to_install)
  File "/usr/lib/python3/dist-packages/UbuntuDrivers/detect.py", line 839, in nvidia_desktop_pre_installation_hook
    with_nvidia_kms = version >= 470
UnboundLocalError: local variable 'version' referenced before assignment
```

This is a known bug [#1993019](https://bugs.launchpad.net/ubuntu/+source/ubuntu-drivers-common/+bug/1993019).

## Other random things to try

Sometimes there's a "missing" package, which can happen if you're a bit overzealous when removing things. I use this command to re-install the *expected* things to be on a default install of Kubuntu. This attempts to install the 'task' `kubuntu-desktop` which will pull anything in which may have been erroneously removed in the recent past.

```bash
alan@robot:~$ sudo apt install kubuntu-desktop^
```

It re-installed a bunch of stuff:

```bash
The following additional packages will be installed:
  libsasl2-2:i386 libsasl2-modules:i386 libsasl2-modules-db:i386 libsasl2-modules-gssapi-mit
Suggested packages:
  libsasl2-modules-ldap libsasl2-modules-otp libsasl2-modules-sql libsasl2-modules-gssapi-mit:i386
  | libsasl2-modules-gssapi-heimdal:i386 libsasl2-modules-ldap:i386 libsasl2-modules-otp:i386
  libsasl2-modules-sql:i386 python-pylibacl-doc python3-pycurl python-tornado-doc thunderbird-gnome-support ttf-lyx
  libotr5
The following packages will be REMOVED
  libfam0 libkpmcore12 partitionmanager
The following NEW packages will be installed
  bup bup-doc gamin libgamin0 libkpmcore11 par2 plasma-discover-backend-snap python3-fuse python3-pylibacl
  python3-tornado thunderbird
The following packages will be upgraded:
  libsasl2-2 libsasl2-2:i386 libsasl2-modules libsasl2-modules:i386 libsasl2-modules-db libsasl2-modules-db:i386
  libsasl2-modules-gssapi-mit
7 to upgrade, 11 to newly install, 3 to remove and 17 not to upgrade.
Need to get 64.0 MB of archives.
After this operation, 238 MB of additional disk space will be used.
Do you want to continue? [Y/n] 
```

Most of which (e.g. Thunderbird, and the plasma snap backend) won't help, but you never know, worth a shot.

## Restart the display manager

Once that command finished, I restarted SSDM (the display manager):

```bash
sudo service sddm restart
```

Boom! Fixed!

![Working](/blog/images/2023-01-05/desktop.jpg)

Was it the packages I reinstalled? 
Was it just the delayed restart of sddm?
Who knows, it works now!

I hope this random waffle is useful to someone.