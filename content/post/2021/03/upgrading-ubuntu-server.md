+++
date = "2021-03-16T11:00:00-00:00"
title = "Upgrading Ubuntu Server"
slug = "2021/03/upgrading-ubuntu-server"
author = "Alan Pope"
tags = ['software', 'ubuntu', 'server', 'bionic', 'focal']
+++

I have a few old and crusty [HP MicroServers](https://n40l.fandom.com/wiki/HP_MicroServer_N40L_Wiki) in the loft at home. I started out with one when HP did a cashback offer, making them very affordable. Over time I've acquired a couple more. One, named [colossus](https://en.wikipedia.org/wiki/Colossus:_The_Forbin_Project) is running `rsnapshot` to provide [backups](/blog/2020/12/straightforward-linux-backups-with-rsnapshot/) of my other machines. Another, called [shirka](https://en.wikipedia.org/wiki/List_of_fictional_computers#1980s) is a [Plex Media Server](https://snapcraft.io/plexmediaserver) and the last, [robby](https://en.wikipedia.org/wiki/Robby_the_Robot) is a general purpose box running various jobs and reports. All run Ubuntu Server as the OS.

They're getting a bit long in the tooth now. I should probably consider replacing them before they start failing. Ideally I'd replace all three with something a bit beefier and put everything in containers. I have considered that for a while, just not got round to it all the while they work fine. But like I say, they're old, here's the specs:

  * AMD Turion™ II Neo N40L Dual-Core Processor
  * 8GiB - 2x 4GiB DIMM Synchronous 1333 MHz (0.8 ns)
  * 2x500GB - 2x Hitachi HDP725050GLA360 - Ubuntu 18.04 Server
  * 2x2TB - 2x SAMSUNG HD204UI - Storage

What triggered the release upgrade today was that `robby` has been running a few python scripts for a long while now, and one needed updating. Unfortunately the upstream script needs a newer version of Python than Ubuntu 18.04 ships with. I could have monkeyed around getting the newer python and all the modules, but I figured it's easier to just update Ubuntu. So I thought "No problem, let's upgrade!". 

**Narrator**: *It was not "No problem", as Alan thought.*

The upgrade process for Ubuntu Server is basically to run `do-release-upgrade` and follow the prompts. So that's what I did. Initially it told me I hadn't rebooted since the last package update - which is true, as I've [written](/blog/2021/02/reboot-aversion/) before, I'm reboot-averse. So I rebooted, and crossed my fingers that it would come back okay. It's in the loft, and I didn't fancy going up there doing remote-hands on a ladder. 

*please come back, please come back*

```shell
From 192.168.1.71 icmp_seq=182 Destination Host Unreachable
From 192.168.1.71 icmp_seq=183 Destination Host Unreachable
From 192.168.1.71 icmp_seq=184 Destination Host Unreachable
From 192.168.1.71 icmp_seq=185 Destination Host Unreachable
```

It came back though, thankfully.

```shell
64 bytes from 192.168.1.8: icmp_seq=186 ttl=64 time=2256 ms
64 bytes from 192.168.1.8: icmp_seq=187 ttl=64 time=1240 ms
```

*Phew!*

I then re-ran the upgrade tool. The first question I get is more informational. As I've [mentioned](/blog/2021/01/digital-hoarding-ubuntu-mirror/) before I run an Ubuntu mirror, actually on this very host, serving other Ubuntu machines on the LAN. 

```shell
Updating repository information

No valid mirror found 

While scanning your repository information, no mirror entry for the 
upgrade was found. This can happen if you run an internal mirror or 
if the mirror information is out-of-date. 

Do you want to rewrite your 'sources.list' file anyway? If you choose 
'Yes' here, it will update all 'bionic' to 'focal' entries. 
If you select 'No', the upgrade will cancel. 

Continue [yN] 
```

The `/etc/apt/sources.list` just points to the local IP address of this machine. Here's what my `sources.list` looks like.

```shell
alan@robby:~/tmp$ cat /etc/apt/sources.list
deb http://192.168.1.8/ubuntu/ bionic main restricted universe multiverse
deb-src http://192.168.1.8/ubuntu/ bionic main restricted universe multiverse

deb http://192.168.1.8/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://192.168.1.8/ubuntu/ bionic-updates main restricted universe multiverse

deb http://192.168.1.8/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://192.168.1.8/ubuntu/ bionic-backports main restricted universe multiverse

deb http://security.ubuntu.com/ubuntu bionic-security main restricted
deb-src http://security.ubuntu.com/ubuntu bionic-security main restricted
deb http://security.ubuntu.com/ubuntu bionic-security universe
deb-src http://security.ubuntu.com/ubuntu bionic-security universe
deb http://security.ubuntu.com/ubuntu bionic-security multiverse
deb-src http://security.ubuntu.com/ubuntu bionic-security multiverse
```

When running `do-release-upgrade` it checks the `sources.list` and updates it from the old release codename to the new one. It has figured out that I'm using a "non-standard" mirror, but offers the option to just ninja the codename, which it does fine.

Next warning is that the upgrade will disable some additional repositories which I'd enabled. I think I only really used the [Syncthing](https://syncthing.net/) repo which I can easily re-enable later. 

This whole disabling third party sources is a good thing anyway, as Ubuntu Server (and desktop) upgrades are never tested with them enabled, so the outcome can be unpredictable. 


```shell
Third party sources disabled 

Some third party entries in your sources.list were disabled. You can 
re-enable them after the upgrade with the 'software-properties' tool 
or your package manager. 

To continue please press [ENTER]
```

Then it failed. As part of the pre-upgrade checks, the tool found out that I don't have much space in `/boot`. 

```shell
Not enough free disk space 

The upgrade has aborted. The upgrade needs a total of 140 M free 
space on disk '/boot'. Please free at least an additional 2,986 k of 
disk space on '/boot'. You can remove old kernels using 'sudo apt 
autoremove' and you could also set COMPRESS=xz in 
/etc/initramfs-tools/initramfs.conf to reduce the size of your 
initramfs. 
```

This is likely my fault. When I first installed Ubuntu on this box in August 2017, I used the Ubuntu Server 16.04.2 LTS ISO image on a USB key. I manually configured two 500GB disks in an `mdraid` mirror `/dev/md0` for `/dev/sdb1` and `/dev/sda2` for the root partition, and `/dev/sda1` unmirrored for `/boot`. There was likely some logic to this in my head at the time. 

Unfortunately I only made the `/dev/sda1` partition as ~226MB, and the rest for `/dev/md0` RAID 1 array. The system has been running fine for nearly four years, and has been upgraded from 16.04 to 18.04 in the meantime. 

```shell
alan@robby:~$ df -h /boot
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1       226M   79M  132M  38% /boot
```

But sadly there's not quite enough space to upgrade to 20.04. Maybe the suggestion to `apt autoremove` will get rid of some cruft.


```shell
alan@robby:~$ sudo apt autoremove
Reading package lists... Done
Building dependency tree       
Reading state information... Done
0 to upgrade, 0 to newly install, 0 to remove and 0 not to upgrade.

```shell
Nope. The other suggestion to enable xz compression in `/etc/initramfs-tools/initramfs.conf` seems neat. Not sure it would actually be beneficial enough though. So let's take the current initrd and do a quick test. I took the initrd image, un-gzipped it then xz'ed it. It was 58MB when gzipped, 165MB uncompressed and only 35MB when xz compressed. 

That would give me an extra 23MB of space. I had 132MB and the installer suggested I need 140MB free, so I think that could work! However, it's late in the day, and I'm not futzing around with that at 11pm, I need my beauty sleep.

So I'll quit the upgrade, which resets everything back to how it was before I started.

```shell
Restoring original system state

Aborting
Reading package lists... Done    
Building dependency tree          
Reading state information... Done
=== Command detached from window (Tue Mar 16 22:24:31 2021) ===
=== Command terminated with exit status 1 (Tue Mar 16 22:24:41 2021) ===
```

I'll revisit this another day! But as I said at the start, I really should replace these machines with one big one and containerise all the things. Not sure what I would replace it with though. Thoughts on that most welcome. No, I don't want a 43U rack in my loft. 