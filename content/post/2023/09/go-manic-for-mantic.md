+++
date = "2023-09-18T20:00:00+01:00"
title = "Go manic for mantic"
slug = "2023/09/go-manic-for-mantic"
author = "Alan Pope"
tags = ['ubuntu', 'linux', 'upgrade']
+++

Earlier today I posted a poll on Mastodon.

{{< rawhtml >}}
<center><iframe src="https://ubuntu.social/@popey/111085667325800160/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe><script src="https://ubuntu.social/embed.js" async="async"></script></center>
{{</ rawhtml >}}

As I write this, there are fifteen hours left on the poll, and it looks like this with around a hundred votes:

[![Poll](/blog/images/2023-09-18/poll.png)](/blog/images/2023-09-18/poll.png)

Most people seems to think I should wait for a month. That result may change overnight, of course, but I can't wait! I've got a blog post to write, and time on my hands! 

So let's upgrade now!

*Also, nobody seemed to spot that I got the releases round the wrong way. 23.04 is Lunar, and 23.10 is Mantic. I edited the post, but kept the above screenshot in)*

## Upgrades work

So I'm upgrading one of the machines now. I will only upgrade my personal desktop Intel NUC, not the work laptop. For now, at least.

I've long had the opinion that Ubuntu upgrades are generally reliable. On the whole, for most people, most of the time, the upgrade tool from one release to the next, will result in a working system.

Sometimes it doesn't! Let's see what happens when I upgrade the desktop from Ubuntu 23.04 (Mantic) to Ubuntu Lunar Lobster, which will become 23.10 next month.

**What could possibly go wrong!?**

*(foreshadowing)*

## RTFM

This blog post is *not* an upgrade guide. *Don't* follow blog guides telling you how to upgrade your operating system. That's foolish. 

Go to the official documentation. Let's do a search online. [UpgradeNotes](https://help.ubuntu.com/community/UpgradeNotes) community documentation sounds about right. Wait a minute...

[![Upgrade Notes](/blog/images/2023-09-18/docs1.png)](/blog/images/2023-09-18/docs1.png)

___"From 16.04 LTS (or 17.10) to 18.04 LTS"!?___ or ___"From 19.04 to 19.10"___, __"last edited 2019-10-27 07:37:02"__. Well that's not right. Oh, wait, it has a link to [https://ubuntu.com/getubuntu/upgrading](https://ubuntu.com/getubuntu/upgrading)...

[![404](/blog/images/2023-09-18/404.png)](/blog/images/2023-09-18/404.png)

Hm. There's got to be some documentation around here somewhere... Our favourite search engine found [this tutorial](https://ubuntu.com/tutorials/upgrading-ubuntu-desktop#1-before-you-start), which looks promising. But it's really aimed at people upgrading to the next supported release, not development releases. Remember, 23.10 isn't out yet!

I put my big-boy pants on and searched harder, finding [this askubuntu question](https://askubuntu.com/q/12909/612) from the past, which still appears to have accurate answers. 

The answers are `sudo do-release-upgrade -d` or `update-manager -d`. The `-d` meaning to upgrade to the development release.

Ok, let's go.

## Preparation

### Backup. 

After discussing backups on [episode 9](https://linuxmatters.sh/9/) of [Linux Matters](https://linuxmatters.sh/), I now backup my desktop using [BorgBackup](https://www.borgbackup.org/). I get an email every hour, too!

[![Mutt](/blog/images/2023-09-18/mutt.png)](/blog/images/2023-09-18/mutt.png)

I have tested these, and the backups work, unlike the [caravan club](/blog/2023/09/backup-the-caravan/).

### Updates

Before we begin the actual upgrade, it's always a wise idea to have all the latest updates installed for the release I'm running.

```bash
alan@nuc:~$ sudo apt update -qq
48 packages can be upgraded. Run 'apt list --upgradable' to see them.
W: https://packagecloud.io/slacktechnologies/slack/debian/dists/jessie/InRelease: 
Key is stored in legacy trusted.gpg keyring (/etc/apt/trusted.gpg), 
see the DEPRECATION section in apt-key(8) for details.
```

Whatever, I should do something about that warning someday.

*Future popey here to point out that I don't need to do anything about this, because the upgrade will automagically disable the third party reposistory, making this warning **vanish**.*

```bash
alan@nuc:~$ sudo apt full-upgrade -qq
The following packages were automatically installed and are no longer required:
  grub-pc-bin linux-headers-6.2.0-20
Use 'sudo apt autoremove' to remove them.
The following packages will be upgraded:
  code cups cups-bsd cups-client cups-common cups-core-drivers cups-daemon
  cups-ipp-utils cups-ppdc cups-server-common curl google-chrome-stable
  libcups2 libcupsimage2 libcurl3-gnutls libcurl4 libnss-systemd
  libpam-systemd libsystemd-shared libsystemd0 libsystemd0:i386 libudev-dev
  libudev1 libudev1:i386 libwebp7 libwebp7:i386 libwebpdemux2 libwebpmux3
  libwebpmux3:i386 microsoft-edge-stable mutt openssh-client openssh-server
  openssh-sftp-server systemd systemd-oomd systemd-resolved systemd-sysv
  systemd-timesyncd telegraf thunderbird thunderbird-gnome-support
  thunderbird-locale-en thunderbird-locale-en-gb thunderbird-locale-en-us
  thunderbird-locale-zh-hant udev zerotier-one
48 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
26 standard LTS security updates
Need to get 490 MB of archives.
After this operation, 16.8 MB of additional disk space will be used.
Do you want to continue? [Y/n] 
⋮
blah blah blah
⋮
Processing triggers for hicolor-icon-theme (0.17-2) ...
Processing triggers for gnome-menus (3.36.0-1.1ubuntu1) ...
Processing triggers for libc-bin (2.37-0ubuntu2) ...
```

Ok, we're up to date on 23.04.

## Upgrade

Time to upgrade.

I'm a terminal nerd (geddit?) so I will use a command-line interface for my upgrade. Even though I'm on a graphical desktop! What a *maverick* *meerkat*!

```text
alan@nuc:~$ sudo do-release-upgrade -d
Checking for a new Ubuntu release

= Welcome to Ubuntu 23.10 'Mantic Minotaur' =

The Ubuntu team is proud to announce Ubuntu 23.10 'Mantic Minotaur'.

To see what's new in this release, visit:
  https://wiki.ubuntu.com/ManticMinotaur/ReleaseNotes

Ubuntu is a Linux distribution for your desktop or server, with a fast
and easy install, regular releases, a tight selection of excellent
applications installed by default, and almost any other software you
can imagine available through the network.

We hope you enjoy Ubuntu.

== Feedback and Helping ==

If you would like to help shape Ubuntu, take a look at the list of
ways you can participate at

  http://www.ubuntu.com/community/participate/

Your comments, bug reports, patches and suggestions will help ensure
that our next release is the best release of Ubuntu ever.  If you feel
that you have found a bug please read:

  http://help.ubuntu.com/community/ReportingBugs

Then report bugs using apport in Ubuntu.  For example:

  ubuntu-bug linux

will open a bug report in Launchpad regarding the linux package.

If you have a question, or if you think you may have found a bug but
aren't sure, first try asking on the #ubuntu or #ubuntu-bugs IRC
channels on Libera.Chat, on the Ubuntu Users mailing list, or on the
Ubuntu forums:

  http://help.ubuntu.com/community/InternetRelayChat
  http://lists.ubuntu.com/mailman/listinfo/ubuntu-users
  http://www.ubuntuforums.org/


== More Information ==

You can find out more about Ubuntu on our website, IRC channel and wiki.
If you're new to Ubuntu, please visit:

  http://www.ubuntu.com/


To sign up for future Ubuntu announcements, please subscribe to Ubuntu's
very low volume announcement list at:

  http://lists.ubuntu.com/mailman/listinfo/ubuntu-announce


Continue [yN] 

```

I do *love* how the release notes mention *IRC*, the Ubuntu Users *Mailing List*, and *Ubuntu Forums*. It's like 2005 all over again.

I press "Y" to continue.

```text
Get:1 Upgrade tool signature [819 B]                                           
Get:2 Upgrade tool [1,265 kB]                                                  
Fetched 1,266 kB in 0s (0 B/s)                                                 
authenticate 'mantic.tar.gz' against 'mantic.tar.gz.gpg' 
extracting 'mantic.tar.gz'

Reading cache

Checking package manager
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
Hit http://gb.archive.ubuntu.com/ubuntu lunar InRelease                        
Hit http://gb.archive.ubuntu.com/ubuntu lunar-updates InRelease                
Hit http://gb.archive.ubuntu.com/ubuntu lunar-backports InRelease              
Hit http://gb.archive.ubuntu.com/ubuntu lunar-security InRelease               
Hit http://packages.microsoft.com/repos/code stable InRelease                  
Hit https://repos.influxdata.com/debian stable InRelease                       
Hit http://download.zerotier.com/debian/bookworm bookworm InRelease            
Hit https://repo.steampowered.com/steam stable InRelease                       
Hit https://apt.syncthing.net syncthing InRelease                              
Hit https://packages.microsoft.com/repos/edge stable InRelease                 
Hit https://dl.google.com/linux/chrome/deb stable InRelease                    
Hit https://download.sublimetext.com apt/stable/ InRelease                     
Hit https://packagecloud.io/slacktechnologies/slack/debian jessie InRelease    
Fetched 0 B in 0s (0 B/s)                                                      
Reading package lists... Done    
Building dependency tree... Done 
Reading state information... Done
Fetched 0 B in 0s (0 B/s)                                                      

Checking for installed snaps

Calculating snap size requirements

Updating repository information

Third party sources disabled 

Some third party entries in your sources.list were disabled. You can 
re-enable them after the upgrade with the 'software-properties' tool 
or your package manager. 

To continue please press [ENTER]
```

I press `[ENTER]`.

```text
Get:1 http://gb.archive.ubuntu.com/ubuntu mantic InRelease [255 kB]            
Get:2 http://gb.archive.ubuntu.com/ubuntu mantic-updates InRelease [90.7 kB]   
Hit https://repo.steampowered.com/steam stable InRelease                       
Get:3 http://gb.archive.ubuntu.com/ubuntu mantic-backports InRelease [90.7 kB] 
Hit https://repos.influxdata.com/debian stable InRelease                       
Get:4 http://gb.archive.ubuntu.com/ubuntu mantic-security InRelease [90.7 kB]  
Hit https://apt.syncthing.net syncthing InRelease                              
Get:5 http://gb.archive.ubuntu.com/ubuntu mantic/main amd64 Packages [1,406 kB]
Get:6 http://gb.archive.ubuntu.com/ubuntu mantic/main i386 Packages [1,043 kB] 
Get:7 http://gb.archive.ubuntu.com/ubuntu mantic/main Translation-en [516 kB]  
Hit https://download.sublimetext.com apt/stable/ InRelease                     
Get:8 http://gb.archive.ubuntu.com/ubuntu mantic/main amd64 DEP-11 Metadata [465 kB]
Get:9 http://gb.archive.ubuntu.com/ubuntu mantic/main DEP-11 48x48 Icons [106 kB]
Get:10 http://gb.archive.ubuntu.com/ubuntu mantic/main DEP-11 64x64 Icons [156 kB]
Get:11 http://gb.archive.ubuntu.com/ubuntu mantic/main DEP-11 64x64@2 Icons [21.1 kB]
Get:12 http://gb.archive.ubuntu.com/ubuntu mantic/main amd64 c-n-f Metadata [30.4 kB]
Get:13 http://gb.archive.ubuntu.com/ubuntu mantic/restricted i386 Packages [37.7 kB]
Get:14 http://gb.archive.ubuntu.com/ubuntu mantic/restricted amd64 Packages [167 kB]
Get:15 http://gb.archive.ubuntu.com/ubuntu mantic/restricted Translation-en [24.8 kB]
Get:16 http://gb.archive.ubuntu.com/ubuntu mantic/restricted amd64 c-n-f Metadata [520 B]
Get:17 http://gb.archive.ubuntu.com/ubuntu mantic/universe amd64 Packages [14.8 MB]
Get:18 http://gb.archive.ubuntu.com/ubuntu mantic/universe i386 Packages [8,043 kB]
Get:19 http://gb.archive.ubuntu.com/ubuntu mantic/universe Translation-en [5,955 kB]
Get:20 http://gb.archive.ubuntu.com/ubuntu mantic/universe amd64 DEP-11 Metadata [3,772 kB]
Get:21 http://gb.archive.ubuntu.com/ubuntu mantic/universe DEP-11 48x48 Icons [3,699 kB]
Get:22 http://gb.archive.ubuntu.com/ubuntu mantic/universe DEP-11 64x64 Icons [7,734 kB]
Get:23 http://gb.archive.ubuntu.com/ubuntu mantic/universe DEP-11 64x64@2 Icons [75.0 kB]
Get:24 http://gb.archive.ubuntu.com/ubuntu mantic/universe amd64 c-n-f Metadata [303 kB]
Get:25 http://gb.archive.ubuntu.com/ubuntu mantic/multiverse amd64 Packages [240 kB]
Get:26 http://gb.archive.ubuntu.com/ubuntu mantic/multiverse i386 Packages [116 kB]
Get:27 http://gb.archive.ubuntu.com/ubuntu mantic/multiverse Translation-en [114 kB]
Get:28 http://gb.archive.ubuntu.com/ubuntu mantic/multiverse amd64 DEP-11 Metadata [31.5 kB]
Get:29 http://gb.archive.ubuntu.com/ubuntu mantic/multiverse DEP-11 48x48 Icons [55.1 kB]
Get:30 http://gb.archive.ubuntu.com/ubuntu mantic/multiverse DEP-11 64x64 Icons [185 kB]
Get:31 http://gb.archive.ubuntu.com/ubuntu mantic/multiverse DEP-11 64x64@2 Icons [904 B]
Get:32 http://gb.archive.ubuntu.com/ubuntu mantic/multiverse amd64 c-n-f Metadata [8,388 B]
Get:33 http://gb.archive.ubuntu.com/ubuntu mantic-updates/main amd64 c-n-f Metadata [108 B]
Get:34 http://gb.archive.ubuntu.com/ubuntu mantic-updates/restricted amd64 c-n-f Metadata [116 B]
Get:35 http://gb.archive.ubuntu.com/ubuntu mantic-updates/universe amd64 c-n-f Metadata [112 B]
Get:36 http://gb.archive.ubuntu.com/ubuntu mantic-updates/multiverse amd64 c-n-f Metadata [116 B]
Get:37 http://gb.archive.ubuntu.com/ubuntu mantic-backports/main amd64 c-n-f Metadata [112 B]
Get:38 http://gb.archive.ubuntu.com/ubuntu mantic-backports/restricted amd64 c-n-f Metadata [116 B]
Get:39 http://gb.archive.ubuntu.com/ubuntu mantic-backports/universe amd64 c-n-f Metadata [116 B]
Get:40 http://gb.archive.ubuntu.com/ubuntu mantic-backports/multiverse amd64 c-n-f Metadata [116 B]
Get:41 http://gb.archive.ubuntu.com/ubuntu mantic-security/main amd64 c-n-f Metadata [112 B]
Get:42 http://gb.archive.ubuntu.com/ubuntu mantic-security/restricted amd64 c-n-f Metadata [116 B]
Get:43 http://gb.archive.ubuntu.com/ubuntu mantic-security/universe amd64 c-n-f Metadata [116 B]
Get:44 http://gb.archive.ubuntu.com/ubuntu mantic-security/multiverse amd64 c-n-f Metadata [116 B]
Fetched 49.6 MB in 0s (0 B/s)                                                  

Checking package manager
Reading package lists... Done    
Building dependency tree... Done 
Reading state information... Done

Calculating the changes

Calculating the changes

Do you want to start the upgrade? 


8 packages are going to be removed. 113 new packages are going to be 
installed. 1620 packages are going to be upgraded. 

You have to download a total of 2,570 M. This download will take 
about 8 minutes with a 40Mbit connection and about 1 hour 8 minutes 
with a 5Mbit connection. 

Fetching and installing the upgrade can take several hours. Once the 
download has finished, the process cannot be canceled. 

 Continue [yN]  Details [d]
```

Details, shmetails...

[![Punch it](/blog/images/2023-09-18/star-wars-hans-solo.gif)](/blog/images/2023-09-18/star-wars-hans-solo.gif)

I press "Y".

Time passes...

A lot of this happens...

[![Downloading](/blog/images/2023-09-18/downloading.png)](/blog/images/2023-09-18/downloading.png)

Followed by tons of this...

[![Unpacking](/blog/images/2023-09-18/unpacking.png)](/blog/images/2023-09-18/unpacking.png)

Then oodles of this...

[![Installing](/blog/images/2023-09-18/installing.png)](/blog/images/2023-09-18/installing.png)

All very much the same as any other release upgrade.

Computer go brrr.

[![Brr](/blog/images/2023-09-18/brr.png)](/blog/images/2023-09-18/brr.png)

## Black screen of doom

It was at this moment he knew, he f'ed up.

All three screens suddenly went black, and I was left with just a flashing cursor. Here's a simulation of what that looked like:

```text
_




```

My first reaction was "Oh gosh, this seems suboptimal", or words to that effect. 


[![Mild shock](/blog/images/2023-09-18/mildshock.gif)](/blog/images/2023-09-18/mildshock.gif)


The disk light was still flickering like mad though, so I assumed upgrade things were still happening. I wandered off to find a laptop so I could SSH in to have a poke around.

## Check the logs

Once in, I looked in `/var/log/dist-upgrade` and found stuff still being written to `main.log` and `apt.log`.

In previous releases, if GNU screen was installed, the upgrade tool would automatically launch inside a screen session. I would have been able to reconnect to the process, and see what was going on.

Unfortunately, that didn't seem to be the case with my upgrade, and I didn't manually launch it inside a `screen` or `tmux` session. So I couldn't reconnect to it.

However, looking at the main.log, it looks like we may be finished, probably at the stage where the upgrade tool is asking for confirmation to remove packages that are no longer required.

```text 
2023-09-18 20:42:44,774 DEBUG package 'gir1.2-soup-2.4' produces an
unwanted removal 'fonts-tlwg-typo-otf', skipping 
2023-09-18 20:42:48,344 DEBUG 'gir1.2-soup-2.4' scheduled for remove 
but not safe to remove, skipping
2023-09-18 20:42:48,344 DEBUG Finish checking for obsolete pkgs 
2023-09-18 20:42:48,433 DEBUG The following packages are marked for removal: 
libgdal32 liborcus-parser-0.17-0 fonts-tlwg-mono fonts-thai-tlwg
linux-modules-nvidia-535-6.2.0-27-generic g++-12 fonts-tlwg-kinnari
libsdl-image1.2 libgtkmm-2.4-1v5 libblockdev-part2 libdmapsharing-3.0-2
linux-modules-nvidia-535-6.2.0-26-generic fonts-tlwg-garuda libgeos3.11.1
fonts-tlwg-typo-otf grub-pc-bin fonts-tlwg-typo-ttf libblockdev-fs2
gconf-service-backend libmujs2 python3-reportlab
linux-objects-nvidia-535-6.2.0-26-generic gir1.2-webkit2-4.0 libcamd2
fonts-tlwg-typo libsoup-gnome2.4-1 libcholmod3 ubuntu-wallpapers-lunar
libblockdev-part-err2 linux-signatures-nvidia-6.2.0-27-generic liborcus-0.17-0
libumfpack5 fonts-tlwg-laksaman libpoppler126 linux-headers-6.2.0-27-generic
gconf-service libswscale6 liblc3-0 linux-signatures-nvidia-6.2.0-26-generic
system-config-printer fonts-khmeros-core libparted-fs-resize0 gir1.2-soup-2.4
linux-image-6.2.0-27-generic fonts-tlwg-loma fonts-dejavu-extra libraw20
fonts-sil-abyssinica fonts-tlwg-umpush nvidia-firmware-535-535.86.05
fonts-tlwg-laksaman-ttf libccolamd2 libstdc++-12-dev
```

## Kill it with fire

The only thing I can do at this point is kill the upgrade, and then cleanup manually - which isn't hard.

The upgrade tool has the name of the release in it, so I look for the process.

```bash 
root@nuc:~# ps aux | grep mantic
root     3561731 11.4  0.6 554192 226416 pts/16  Sl+  20:06
5:57 /usr/bin/python3 -s /tmp/ubuntu-release-upgrader-shc9u51x/mantic --mode=server
--frontend=DistUpgradeViewText --devel-release 
```

[![Kill him](/blog/images/2023-09-18/killhim.gif)](/blog/images/2023-09-18/killhim.gif)

`root@nuc:~# kill -9 3561731`

**Do an accurate lightsaber noise, NOW!**

## Cleanup

This `dpkg` command can often be used to finish off some in-flight package shennanigans.

```bash
alan@nuc:~$ sudo dpkg --configure -a
alan@nuc:~$ sudo apt autoremove
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following packages will be REMOVED:
  chromium-codecs-ffmpeg-extra fonts-kacst fonts-kacst-one fonts-khmeros-core
  fonts-lao fonts-lklug-sinhala fonts-sil-abyssinica fonts-sil-padauk
  fonts-thai-tlwg fonts-tibetan-machine fonts-tlwg-garuda fonts-tlwg-garuda-ttf
  fonts-tlwg-kinnari fonts-tlwg-kinnari-ttf fonts-tlwg-laksaman
  fonts-tlwg-laksaman-ttf fonts-tlwg-loma fonts-tlwg-loma-ttf fonts-tlwg-mono
  fonts-tlwg-mono-ttf fonts-tlwg-norasi fonts-tlwg-norasi-ttf fonts-tlwg-purisa
  fonts-tlwg-purisa-ttf fonts-tlwg-sawasdee fonts-tlwg-sawasdee-ttf
  fonts-tlwg-typewriter fonts-tlwg-typewriter-ttf fonts-tlwg-typist
  fonts-tlwg-typist-ttf fonts-tlwg-typo fonts-tlwg-typo-ttf fonts-tlwg-umpush
  fonts-tlwg-umpush-ttf fonts-tlwg-waree fonts-tlwg-waree-ttf g++-12
  gir1.2-javascriptcoregtk-4.0 gir1.2-soup-2.4 gir1.2-webkit2-4.0 grub-pc-bin
  libamd2 libavutil57:i386 libblockdev-crypto2 libblockdev-fs2
  libblockdev-loop2 libblockdev-part-err2 libblockdev-part2 libblockdev-swap2
  libblockdev-utils2 libblockdev2 libcamd2 libccolamd2 libcholmod3
  libcodec2-1.0:i386 libcolamd2 libdmapsharing-3.0-2 libevent-2.1-7a
  libevent-core-2.1-7a libfuse2 libgdal32 libgeos3.11.1 libgtkmm-2.4-1v5
  libgupnp-igd-1.0-4 libixml10 libjavascriptcoregtk-4.0-18 liblc3-0 liblua5.3-0
  libmetis5 libmujs2 liborcus-0.17-0 liborcus-parser-0.17-0
  libparted-fs-resize0 libpoppler126 libraw20 libsdl-image1.2
  libsoup-gnome2.4-1 libspatialite7 libstdc++-12-dev libsuitesparseconfig5
  libsuperlu5 libumfpack5 libupnp13 libwebkit2gtk-4.0-37 linux-headers-6.2.0-20
  linux-headers-6.2.0-27 linux-headers-6.2.0-27-generic
  linux-image-6.2.0-27-generic linux-modules-6.2.0-27-generic
  linux-modules-extra-6.2.0-27-generic
  linux-modules-nvidia-535-6.2.0-27-generic
  linux-objects-nvidia-535-6.2.0-27-generic
  linux-signatures-nvidia-6.2.0-27-generic nvidia-firmware-535-535.86.05
  python3-async-generator python3-llfuse python3-renderpm
  python3-reportlab-accel
0 upgraded, 0 newly installed, 98 to remove and 1 not upgraded.
After this operation, 1,406 MB disk space will be freed.
Do you want to continue? [Y/n] 
```

Which ended normally.

```text
Warning: os-prober will be executed to detect other bootable partitions.
Its output will be used to detect bootable binaries on them and create new boot entries.
Found Windows Boot Manager on /dev/nvme0n1p1@/efi/Microsoft/Boot/bootmgfw.efi
Adding boot menu entry for UEFI Firmware Settings ...
done
Removing linux-modules-extra-6.2.0-27-generic (6.2.0-27.28) ...
Removing linux-modules-6.2.0-27-generic (6.2.0-27.28) ...
Removing linux-objects-nvidia-535-6.2.0-27-generic (6.2.0-27.28+1) ...
Removing nvidia-firmware-535-535.86.05 (535.86.05-0ubuntu0.23.04.1) ...
Removing python3-async-generator (1.10-4) ...
Removing python3-renderpm:amd64 (4.0.4-11) ...
Removing python3-reportlab-accel:amd64 (4.0.4-11) ...
Processing triggers for libc-bin (2.38-1ubuntu4) ...
Processing triggers for man-db (2.11.2-3) ...
Processing triggers for fontconfig (2.14.2-4ubuntu1) ...
alan@nuc:~$ 
```

One last check that we're up to date:

```bash
alan@nuc:~$ sudo apt update ; sudo apt full-upgrade
Hit:1 http://gb.archive.ubuntu.com/ubuntu mantic InRelease
Hit:2 http://gb.archive.ubuntu.com/ubuntu mantic-updates InRelease                                                                                                               
Hit:3 http://gb.archive.ubuntu.com/ubuntu mantic-backports InRelease                                                                                                             
Hit:4 http://gb.archive.ubuntu.com/ubuntu mantic-security InRelease                                                                                                              
Hit:5 https://repos.influxdata.com/debian stable InRelease                                                                                                                       
Hit:6 https://repo.steampowered.com/steam stable InRelease                                                                                               
Hit:7 https://apt.syncthing.net syncthing InRelease                                                                               
Hit:8 https://download.sublimetext.com apt/stable/ InRelease                    
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
1 package can be upgraded. Run 'apt list --upgradable' to see it.
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
Calculating upgrade... Done
The following packages were automatically installed and are no longer required:
  gconf-service gconf-service-backend gconf2-common libappindicator1 libc++abi1-15 libdbusmenu-gtk4 libgconf-2-4 libunwind-15
Use 'sudo apt autoremove' to remove them.
The following packages will be REMOVED:
  discord libc++1 libc++1-15
0 upgraded, 0 newly installed, 3 to remove and 0 not upgraded.
After this operation, 231 MB disk space will be freed.
Do you want to continue? [Y/n] n
Abort.
```

Good enough!

## Reboot and pray

Success!

[![Success](/blog/images/2023-09-18/success.png)](/blog/images/2023-09-18/success.png)

See, I told you Ubuntu upgrades work. 

:) 


