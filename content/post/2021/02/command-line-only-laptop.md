+++
date = "2021-02-09T12:00:00-00:00"
title = "Command-Line only Laptop"
slug = "2021/02/command-line-only-laptop"
author = "Alan Pope"
tags = ['software', 'linux', 'terminal', 'ubuntu', 'thinkpad', 'x61s']
+++

Today, I'm following along from an earlier article "[The Allure of The Terminal](/blog/2021/02/the-allure-of-the-terminal/)" where I talked about how I love the terminal aesthetic. How much, well, one of my computers is a command-line only install. I thought I'd talk a bit about that setup. Firstly, it's not command-line only because it *can't* run a graphical environment, although it isn't a super modern system. It is certainly *capable* of running [Ubuntu MATE](https://ubuntu-mate.org/), for example, I just choose not to.

The machine I want to talk about today is one of my (many) ThinkPads, in this case, an X61s. It's got an Intel C2D L7500 CPU running at 1.6GHz, 6GiB RAM and a 240GB OCZ-Vertex 3 SSD. I installed Ubuntu Server 18.04 on it in October 2019, and kept it up to date since. I have upgraded it to Ubuntu 20.04 in the meantime. Here she is:

![ThinkPad X61s](/blog/images/2021-02-09/x61s.jpg)

Beautiful. 😘

I configured system for "daily use" - as much as I can. Bear in mind this is a fun project to see if it's reasonable to work from a non-gui machine. 

I actually gave a lightning talk presentation on this subject at OggCamp 19 called "*All GUIs Suck*" - "Use the terminal - be productive". I used this very laptop to present on a projector via VGA (no HDMI here!) and it seemed to go down well, for a bit of fun. Here's roughly what that looked like. 

![Presentation](/blog/images/2021-02-09/presentation.png)

It's my suggestion that it's still entirely possible to be productive and have fun in a command-line only environment. None of this will be surprising, I suspect, to anyone who has used Linux for more than about 15 years. If you were using Linux in anger before the early 2000's you probably knew the pain of having no GUI, or maybe even chose to do so, as I have here. So let's look at the broad categories of software and how they might be used. 

## The Basics

As mentioned, the install is a pretty standard Ubuntu ~~18.04~~ 20.04 LTS Server setup. I've installed a bunch of software from the Ubuntu archive, and some from the Snap Store. A fair number of snaps are ones I actually maintain. Here's the current list. We'll delve into some of these in more detail below.

![snaps](/blog/images/2021-02-09/snaps.png)

### Post-install

### Console font

I tweaked the font to be smaller text, so I can fit more in. On Ubuntu a quick `sudo dpkg-reconfigure console-setup` allows for this simple change.

### Wireless networking

The X61s has an ethernet port, and onboard wireless. Mine even has a cellular data option, which I've never used. Configuring the wireless network from the command-line used to be a pain. These days we have tools like `nmcli` and `nm-tui` which make that task easy.

![nmtui](/blog/images/2021-02-09/nmtui.png)

Testing the connection is easy with [fast](https://snapcraft.io/fast), an alternative to the commonly-known [speedtest-cli](https://www.speedtest.net/apps/cli). Great for testing the maximum throughput without needing a web browser.

```
alan@duotronics:~$ fast
 -> 102.36 Mbps
```

### Window management

On a graphical environment you can of course open numerous terminals and arrange, tile or tab them to keep numerous things open, and easily switch between them. I use the fabulous [byobu](https://www.byobu.org/) on my laptop to the same effect. Under the hood it uses [tmux](https://github.com/tmux/tmux/wiki), where it previously used [GNU Screen](https://www.gnu.org/software/screen/). 

Once byobu is installed, the online help and configuration is launched by pressing `[F9]`. 

![byobu](/blog/images/2021-02-09/byobu1.png)

As well as window management, byobu has configurable status bar notifications along the bottom of the screen. These can be individually flipped on and off. I usually have the battery gauge, CPU, disk usage, IP address and date & time. This leaves a little room to the left to show the list of windows.

![byobu](/blog/images/2021-02-09/byobu2.png)

### Launching applications

Byobu has some easy keyboard shortcuts including `[F2]` to launch a new window, and `[F3]` & `[F4]` to switch window. There's plenty more but those are the basics. When starting up the laptop, rather than loop through opening a window and launching an application, I scripted it to speed things up.

On boot I login, launch byobu then run my `apps` script which lives in `~/bin`. It is super simple and looks a little like this. Mine is way longer, listing ten or so applications, but you get the idea.

```
#!/bin/bash
tmux new-window irssi
tmux new-window newsboat
tmux new-window ncspot
```

Once I launch that, I grab a cup of tea and sip while everything starts up. Much like logging into your desktop and having all your gui apps launching, it can take a little while - seconds - not minutes. 

### Backups

I have previously [written](/blog/2020/12/straightforward-linux-backups-with-rsnapshot/) about my love for [rsnapshot](https://rsnapshot.org/), and I use it here, too. I bought [Sandisk 128GB USB key](https://geni.us/IL1Sxq) (affiliate link) which sneakily fits nicely in one of the free USB ports. 

I have formatted the USB stick partition on `/dev/sdb1` using ext4 and added a line to `/etc/fstab` to make sure it's mounted under `/mnt/backup`. The internal disk is `/dev/sda`.

```
alan@duotronics:~$ df -h
Filesystem      Size  Used Avail Use% Mounted on
udev            2.9G     0  2.9G   0% /dev
tmpfs           588M  1.7M  586M   1% /run
/dev/sda1       229G   87G  131G  40% /
tmpfs           2.9G   96K  2.9G   1% /dev/shm
tmpfs           5.0M  4.0K  5.0M   1% /run/lock
tmpfs           2.9G     0  2.9G   0% /sys/fs/cgroup
/dev/sdb1       113G   84G   23G  79% /mnt/backup
tmpfs           588M  8.0K  588M   1% /run/user/1000
```

I configured `rsnapshot` via `/etc/rsnapshot.conf` to use the USB stick for backups. 

```
snapshot_root   /mnt/backup
```

I check the log file in `/var/log/rsnapshot.log` periodically, and everything seems to be working okay. I have local backups going back months, and remote backups of data where needed.

## Applications

Many of the applications I use have been around a very long time. However there's a bit of a surge in new command line applications recently, a lot of which are written in Rust or Golang. A bunch are command-line ways to interact with modern web services via their official APIs. That's the case for the Mattermost, Slack, Spotify and Telegram options below.

### Chat

#### Mattermost

A large part of my work is talking to people. Everyone is different, and they use all manner of chat platforms. At work we use Mattermost for internal discussion, so I use [matterhorn](https://snapcraft.io/matterhorn). I can't show you a screenshot of that, because it's all internal chatter. Here's a screenshot from the [upstream project](https://github.com/matterhorn-chat/matterhorn).

![matterhorn](/blog/images/2021-02-09/matterhorn.png)

#### IRC

Yes, hipsters, some of us still use IRC. Get over it. Irssi is the best IRC client ever. I use that.

![irssi](/blog/images/2021-02-09/irssi.png)

#### Slack

Ugh, okay. I used to use [slack-term](https://github.com/erroneousboat/slack-term) for this, but something broke recently and I can no longer auth. I need to investigate this. I suspect it's because most of the slacks I'm in are free and have run over their limit of ten integrations, probably.

#### Telegram

I use Telegram on desktop and mobile quite a bit. There's a command line client called [tg](https://github.com/vysheng/tg) which I've used in the past, but since I always have my cellphone with me, I tend to just use that, rather than use the command line Telegram client.

### Email

I use two tools here, both have been around for many years. [OfflineIMAP](https://snapcraft.io/offlineimap) runs periodically to sync my email down to the laptop. It can run interactively, but I choose to have it sync in the background, otherwise I forget to run it, and then the email builds up and takes a while to sync. I configured OfflineIMAP to sync to `~/Mail` for two accounts work and personal in subdirectories `~/Mail/personal` & `~/Mail/work`.

To actually read and compose mail I use the venerable [Mutt](https://snapcraft.io/mutt). Mutt is a highly configurable email client. I launch two copies via my `apps` script, each pointing to a different configuration file. That way I have one window for personal mail and another for work. 

![Mutt](/blog/images/2021-02-09/mutt.png)

Mutt can be configured to send directly, via SMTP or IMAP, or it can put the mail in the 'outbox' and the next time OfflineIMAP runs, it can send it with any other pending mail.

## Presentation

I don't often give presentations in person these days, but I could use [presentty](https://pypi.org/project/presentty/), and indeed did for the lightning talk at OggCamp a while back. Presentty is available in the Ubuntu repository. The presentation file are RestructuredText which are easy to write in any text editor. Here's the first few 'slides' from the presentation I gave.

```
All GUIs Suck
=============

Use the terminal - be productive

Alan Pope (popey)

Why do GUIs suck (I)
=====================

They (often) have significant hardware requirements

.. container:: progressive

  * High spec CPU
  * Tons of RAM
  * Gobs and gobs of hard disk
  * Often hide advanced functions

Why do GUIs suck (II)
====================

They enable distractions via notifications and badges

.. container:: progressive

  * Software update 
  * Calendar reminders
  * Social media
  * Unread counts badges on icons
```

### Music

I like to listen to music while I work. Why not here too!? I have some music stored locally for disconnected listening, and with 250GB SSD, I have plenty of space for it. Cmus can play music locally just fine.

![cmus](/blog/images/2021-02-09/cmus.png)

Alternatively I can stream from my Spotify account with [ncspot](https://snapcraft.io/ncspot).

![ncspot](/blog/images/2021-02-09/ncspot.png)

### News

Catching up with RSS feeds is easy with [Newsboat](https://snapcraft.io/newsboat).

![newsboat](/blog/images/2021-02-09/newsboat.png)


### Documents

Text editors are ten-a-penny. I don't need to go here. Basically `nano`.

### File Transfer

Getting files on or off the device isn't a problem. It has a spare USB port or two, so I can easily copy files around with sneakernet. But I can also use traditional tools like `sftp` / `scp` and `rsync`. On top of that there's [Syncthing](https://syncthing.net/) which is a free-software dropbox-a-like to keep files on my desktop and laptop synchronised.

For large one-off file transfers, perhaps off-site, I also use [Wormhole](https://snapcraft.io/wormhole) which is great for quickly buzzing a file to a friend of co-worker without worrying about VPNs or firewalls. Very neat.

Finally [Serve](https://snapcraft.io/serve) is a super simple utility which spins up a webserver on port 8080, in whatever folder you're sat in. Handy if you want to get files off this machine over the network. Just point a browser at it and download. Clearly be careful what folder you're in when you do it, as it shares all files. You can add simple authentication user/pass, and even enable https.

### The Web

The web can be a little tricky on the command line. There's certainly browsers, [Links](https://snapcraft.io/links) and console based tools for searching [Google](https://snapcraft.io/googler) or [DuckDuckGo](https://snapcraft.io/ddgr). 

![Ubuntu](/blog/images/2021-02-09/ubuntu.png)

However, these days many pages are difficult or impossible to view in a text only command line browser, especially javascript heavy ones.. Sad times. Twitter doesn't work for example.

![Twitter](/blog/images/2021-02-09/twitter.png)

*Nothing of value was lost*.

## Fun Stuff

There's fun things you can do on the command line including games like [Dwarf Fortress](https://snapcraft.io/dwarf-fortress) and the ever popular [NetHack](https://snapcraft.io/nethack), but the pinacle of gaming in the terminal has to be [Antsy Alien Attack](https://github.com/wimpysworld/antsy-alien-attack)! 

![AAA](/blog/images/2021-02-09/aaa.png)

## Conclusion

While this is really just a bit of fun, there's a tremendous amount of productive work you can get done on the command line only Linux system in 2021. Have a look around, discover some old and new applications, and maybe save some CPU cycles and RAM here and there along the way, or just have some fun playing.
