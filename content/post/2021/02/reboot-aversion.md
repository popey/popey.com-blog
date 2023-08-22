+++
date = "2021-02-04T12:00:00-00:00"
title = "Reboot Aversion"
slug = "2021/02/reboot-aversion"
author = "Alan Pope"
tags = ['software', 'linux', 'ubuntu']
+++

I am not a fan of rebooting my computers. As you can see:

```shell
alan@robot:~$ for host in $(cat computers.txt); do ssh "$host" "uptime"; done
 20:24:53 up 117 days,  5:06, 10 users,  load average: 5.85, 6.07, 5.48
 20:24:55 up 113 days,  4:56,  7 users,  load average: 0.95, 0.68, 0.72
 20:24:56 up 66 days,  9:05,  5 users,  load average: 1.06, 0.58, 0.51
 20:24:57 up 2 min,  1 user,  load average: 0.60, 1.09, 0.51
 20:24:58 up 4 days,  7:05,  3 users,  load average: 1.83, 1.22, 0.77
 20:24:58 up 18 days, 21:31,  9 users,  load average: 1.86, 1.86, 2.00
 20:25:35 up 374 days,  1:18,  6 users,  load average: 1.01, 1.01, 1.11
```

One is a desktop, two are laptops and the others are headless servers. The servers tend to be left up mostly because I don't see any need to reboot them. However I'm also a little scared to, in case they don't come back and I end up having to faff about to fix them.

That's because three of the servers are in the loft, which is a faff to get to. I mean, it's not as much of a faff to get to as say [the](/blog/images/2021-02-04/maldives1.jpg) [Maldives](/blog/images/2021-02-04/maldives2.jpg), obviously, but you know, it's not "Walk over to the computer and press a button" easy. None have displays or HP [ILO](https://www.hpe.com/us/en/servers/integrated-lights-out-ilo.html) stuff either, so I'd have to cart a display up there.

I considered a few times that I should get a small USB powered VGA-connected display. It would likely just sit around doing nothing though. I could get a second hand old monitor and stick it up there, but I don't have any, maybe I'll look out for something suitably compact on fleabay sometime. 

Usually what happens each time a machine fails to boot, and I end up carrying an old TV up there, or "borrow" a monitor from somewhere. Thankfully it's so infrequent as to not be a major issue. Also, I don't reboot them, problem solved! 😀 Maybe I should test-reboot these things, but who has time for that when there's navel gazing blog posts to be written! 

I do have [Canonical Livepatch](https://ubuntu.com/security/livepatch) installed on the servers where it's supported. But I never look to see if there have been patches. I'm a *terrible* sysadmin, which is one reason why I don't run [Arch](https://twitter.com/archlinuxmemes/status/1286728740244819968) or [Gentoo](https://web.archive.org/web/20080830031318/http://funroll-loops.info/), I'm too lazy.

I also don't reboot my main desktop PC much. As you can see from the last 6 months uptime records.

```shell
alan@robot:~$ uprecords 
     #               Uptime | System                                     Boot up
----------------------------+---------------------------------------------------
     1    60 days, 04:14:19 | Linux 5.8.0-26-generic    Mon Nov  9 15:08:58 2020
     2    23 days, 12:00:19 | Linux 5.8.0-18-generic    Sun Sep 20 22:41:51 2020
->   3    18 days, 21:32:32 | Linux 5.8.0-38-generic    Sat Jan 16 22:53:00 2021
     4    15 days, 06:12:59 | Linux 5.4.0-42-generic    Mon Aug 24 12:15:47 2020
     5    12 days, 19:00:16 | Linux 5.8.0-25-generic    Tue Oct 27 19:13:44 2020
     6     7 days, 01:26:46 | Linux 5.4.0-47-generic    Sun Sep 13 21:14:37 2020
     7     7 days, 00:39:43 | Linux 5.8.0-34-generic    Fri Jan  8 19:34:25 2021
     8     6 days, 22:42:42 | Linux 5.4.0-42-generic    Mon Aug 17 12:40:31 2020
     9     5 days, 02:16:35 | Linux 5.4.0-47-generic    Tue Sep  8 18:29:39 2020
    10     4 days, 21:00:20 | Linux 5.8.0-23-generic    Sun Oct 18 11:54:00 2020
----------------------------+---------------------------------------------------
1up in     4 days, 14:27:48 | at                        Tue Feb  9 10:53:20 2021
no1 in    41 days, 06:41:48 | at                        Thu Mar 18 03:07:20 2021
    up   172 days, 22:33:34 | since                     Sat Aug 15 18:44:03 2020
  down     0 days, 04:07:55 | since                     Sat Aug 15 18:44:03 2020
   %up               99.901 | since                     Sat Aug 15 18:44:03 2020
```

I also don't reboot my ThinkPad T450 a lot. It had a much higher uptimes before I wiped it and installed Ubuntu a year or so back. Back then it had KDE Neon installed. I had the best uptimes on that distro.

```shell
alan@mcp:~$ uprecords
     #               Uptime | System                                     Boot up
----------------------------+---------------------------------------------------
     1    48 days, 11:41:40 | Linux 5.8.0-33-generic    Mon Dec 14 00:23:09 2020
     2    29 days, 14:37:17 | Linux 5.8.0-33-generic    Mon Dec 14 00:23:10 2020
     3    25 days, 02:30:34 | Linux 5.8.0-26-generic    Sun Nov  8 22:44:40 2020
     4    23 days, 02:27:51 | Linux 5.8.0-19-generic    Wed Sep 23 20:20:45 2020
     5    23 days, 00:37:31 | Linux 5.8.0-23-generic    Fri Oct 16 23:06:37 2020
     6    21 days, 21:47:23 | Linux 5.4.0-42-generic    Tue Aug 18 12:35:18 2020
     7    21 days, 07:53:09 | Linux 5.4.0-37-generic    Wed Jun 17 11:24:24 2020
     8    14 days, 07:50:45 | Linux 5.4.0-47-generic    Wed Sep  9 10:24:38 2020
     9     8 days, 06:07:15 | Linux 5.4.0-40-generic    Tue Jul 21 10:14:26 2020
    10     7 days, 22:08:56 | Linux 5.4.0-42-generic    Wed Jul 29 16:33:53 2020
----------------------------+---------------------------------------------------
->  14     4 days, 07:01:10 | Linux 5.8.0-36-generic    Sun Jan 31 13:19:46 2021
----------------------------+---------------------------------------------------
1up in     0 days, 17:48:35 | at                        Fri Feb  5 14:09:31 2021
t10 in     3 days, 15:07:47 | at                        Mon Feb  8 11:28:43 2021
no1 in    44 days, 04:40:31 | at                        Sun Mar 21 01:01:27 2021
    up   264 days, 07:30:02 | since                     Thu Jun 11 18:08:27 2020
  down  -26 days, -04:-17:- | since                     Thu Jun 11 18:08:27 2020
   %up              110.993 | since                     Thu Jun 11 18:08:27 2020
alan@mcp:~$ 

```

Indeed my aging ThinkPad X220 also has some decent uptimes, dating back years (although I had to boot it up to capture this):

```shell
alan@deep-thought:~$ uprecords
     #               Uptime | System                                     Boot up
----------------------------+---------------------------------------------------
     1    24 days, 17:18:39 | Linux 4.2.0-25-generic    Fri Jan 22 22:23:34 2016
     2    17 days, 03:54:17 | Linux 5.4.0-42-generic    Wed Jul 29 17:39:40 2020
     3    14 days, 02:39:56 | Linux 5.0.0-20-generic    Fri Jul 26 14:43:31 2019
     4    14 days, 00:08:15 | Linux 5.4.0-47-generic    Tue Sep  8 22:56:08 2020
     5    12 days, 16:09:02 | Linux 5.8.0-20-generic    Wed Oct 21 22:25:00 2020
     6    12 days, 14:58:00 | Linux 5.8.0-26-generic    Thu Nov  5 10:24:24 2020
     7    11 days, 04:17:12 | Linux 4.2.0-27-generic    Tue Feb 16 15:48:19 2016
     8     8 days, 06:48:33 | Linux 4.2.0-27-generic    Sun Mar  6 12:26:02 2016
     9     7 days, 16:35:45 | Linux 5.8.0-19-generic    Sun Sep 27 23:47:25 2020
    10     6 days, 22:52:05 | Linux 3.19.0-43-generic   Wed Jan  6 19:53:56 2016
----------------------------+---------------------------------------------------
->  87     0 days, 00:02:16 | Linux 5.8.0-31-generic    Thu Feb  4 20:21:58 2021
----------------------------+---------------------------------------------------
1up in     0 days, 01:00:00 | at                        Thu Feb  4 21:24:14 2021
t10 in     6 days, 22:49:50 | at                        Thu Feb 11 19:14:04 2021
no1 in    24 days, 17:16:24 | at                        Mon Mar  1 13:40:38 2021
    up   249 days, 05:35:10 | since                     Wed Dec 23 17:04:30 2015
  down  1620 days, 21:44:34 | since                     Wed Dec 23 17:04:30 2015
   %up               13.327 | since                     Wed Dec 23 17:04:30 2015

```

For laptops I tend to just slam the lid if they're not in a docking station, then open it up to carry on working. When in a dock, I'll usually leave them on and they may or may not suspend. The desktop however, tends to stay on all the time, day and night. Its the one at the top with the 60 day uptime at the top of `uprecords`. There's a few side effects from this. 

One, on the good side, I can just carry on doing whatever I was doing the day before with no delay. I don't have to wait for boot, login, applications start up, arranging windows or anything. Sure, your computer may do all of that near-instantly, but mine don't, it's a few minutes of restarting each day. I get that some people prefer to clean start each day, I don't. You will never convince me that it's a good idea to reboot every day. Feel free to try though.

Another potential upside is that I tend to uncover interesting bugs. A notable bug I experienced some years ago in the Unity desktop only manifested itself after ~42 days of runtime. That's quite hard for a developer to reproduce, unless they have a machine they can leave running permanently, which most don't. I'm that guy. I don't recall the details of the bug, but there was some internal counter somewhere which overflowed at a long runtime and killed the desktop. Fun times. 

Sometimes an application (or desktop) features a leak which can consume a lot of memory and end up either making the desktop unstable, or causing the kernel to go around killing things via the [OOM (Out Of Memory) Killer](https://www.kernel.org/doc/gorman/html/understand/understand016.html). I have partly mitigated this by putting a lot of memory in my systems, 16GiB in the X220, 32GiB in the T450, and the desktop NUC. 

I also sometimes have to manually restart applications when they get a bit... bloaty... in the memory department. My favourite tool for looking at memory hungry applications is [ps_mem.py](https://github.com/pixelb/ps_mem). Behold.

```shell
alan@robot:~$ sudo ~/bin/ps_mem.py | tail -n 20
165.8 MiB + 230.9 MiB = 396.7 MiB	steam (2)
177.7 MiB + 251.8 MiB = 429.6 MiB	Xorg [updated]
243.1 MiB + 301.7 MiB = 544.9 MiB	slack (7)
267.8 MiB + 303.0 MiB = 570.8 MiB	sublime_text
257.5 MiB + 320.3 MiB = 577.8 MiB	standard-notes (7)
289.5 MiB + 290.0 MiB = 579.5 MiB	mysqld
300.7 MiB + 305.7 MiB = 606.4 MiB	nautilus
302.6 MiB + 313.5 MiB = 616.2 MiB	session-desktop (5)
290.8 MiB + 337.2 MiB = 628.0 MiB	wire-desktop (8)
316.0 MiB + 332.7 MiB = 648.7 MiB	signal-desktop (5)
377.4 MiB + 411.6 MiB = 789.0 MiB	Discord (7)
432.9 MiB + 433.8 MiB = 866.7 MiB	snap-store
509.8 MiB + 521.5 MiB =   1.0 GiB	gnome-shell
471.6 MiB + 575.6 MiB =   1.0 GiB	steamwebhelper (7)
724.2 MiB + 741.7 MiB =   1.4 GiB	Telegram
803.5 MiB + 908.5 MiB =   1.7 GiB	mattermost-desktop (8)
  8.0 GiB +   8.5 GiB =  16.5 GiB	chrome (67)
---------------------------------
                         31.7 GiB
=================================
```

Hello web browsers, electron applications and chat apps. Welcome to my RAM, make yourself at home, help yourself. Nom nom nom.

Another unfortunate side-effect is that of system updates. After doing a bunch of software updates - which, on Ubuntu, are done while you're logged in - sometimes the system can get a little "unstable" shall we say. Yeah, I should consider rebooting at that point, but I typically do whatever I can to avoid it. If it's GNOME Shell that gets sluggish (it happens), I'll use the old `ALT+F2, r, Enter` trick to restart the shell. For applications (*cough* browsers in a window *cough*) I'll just restart them individually.

"*But Alan, these are all just coping mechanisms! You should restart your computer regularly!*"

Whatever.