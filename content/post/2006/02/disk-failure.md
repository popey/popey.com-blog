+++
date = "2006-02-14T08:32:00-00:00"
title = "Disk failure"
slug = "2006/02/disk-failure"
author = "Alan Pope"
tags = ['linux', 'hardware', 'ubuntu']
+++

As regular readers of my blog may recall, I recently gave my brother a PC running Ubuntu Linux. He uses it for surfing the web, getting email and chatting online. He also has an HP PSC 1610 printer/scanner/copier which works under Linux pretty well. He has a Dlink WAP/Modem/Router providing his ADSL connection via wired ethernet.

I had a phone call from him a week or so ago telling me the PC was broken. To cut a long story short he had difficulty getting a disc removed from the CDROM drive and eventually resorted to pulling the power cable out. This resulted in filesystem errors when he rebooted. I've not had many of these types of problems so don't have a huge amount of experience in the area. So I talked him through removing the hard disk (which was easy because the PC he has is very modular) and he sent it to me.

I have a machine at home which is identical to his, so I put the disk in that and ran fsck on it as per the recommendations on the bootup error. There were no more than half a dozen errors which fsck fixed. I rebooted and that was it. Job done.

I'm thinking that it would have been easier if I could have done this remotely. It has been suggested that I might want to send my brother a bootable Linux CD (knoppix/dsl/ubuntu or similar) and some basic instructions to get it online. I could then ssh to the box from home, mount the hard disk and fix it myself remotely.

I may need to burn a special CD which could be used for this purpose, requiring little or no intervention from the user. One issue is that I have moved ssh to a port other than 22 which wouldn't be the standard on a normal bootable CD. Any suggestions welcome.

Oh, and my brother dropped by at the weekend and picked up the disk. He installed it himself and was up and running pretty quickly. One minor flaw that I will have to remember for the future is that his disk retained DNS settings from when it was on my LAN, so name resolution failed until I could SSH in and fix it by editing /etc/resolv.conf on his machine. I have also since mailed him informing him that he can eject media using a right click of the device on the desktop and "unmount" or "eject" in Gnome on Ubuntu.