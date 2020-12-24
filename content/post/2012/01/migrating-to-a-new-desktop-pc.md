+++
date = "2012-01-02T18:47:31-07:00"
title = "Migrating to a New Desktop PC"
slug = "2012/01/02/migrating-to-a-new-desktop-pc"
tags = ['ubuntu', 'hardware', 'pc']
+++

A little while ago I bought a [Zoostorm](http://www.zoostorm.com/) PC from [Ebuyer](http://www.ebuyer.com/). It's a farily basic (but powerful) i7 based system with 8GB RAM and a 1TB hard disk. This is to replace my older (but still fully working) [Mesh](http://www.meshcomputers.com/) PC. The newer one is more power efficient, quieter, a lot faster, and all Intel inside - the previous desktop was nVidia based.

![Zoostorm PC](/blog/images/2012-01-02/P0271629_C0000191_P0000000.jpg)

I wanted to migrate from the install on my old Mesh PC to a new clean install on the Zoostorm. I could have just yanked the disk out of the Mesh and put it in the Zoostorm, but I did it slightly differently. I'm typing it up here for my own notes but also to find out how other people do it, and to get any tips.

So the goal was to have a clean install of Ubuntu Precise (which will become 12.04 LTS in April) and keep all my existing files and folders intact. I wanted to keep all my home files but didn't want to keep the applications I had built up over several install/upgrades on that machine. Time for a fresh start.

The old Mesh has a single 120GB SSD and the Zoostorm has a 1TB Hard disk and I added a 120GB SSD to that too. My idea was to do a clean install on the Zoostorm SSD, and use the 1TB hard disk for my /home directory. That way I get the super zippy performance of an SSD for loading apps, but the slow(er) hard disk for loading my files. I'm happy with this tradeoff in speed/capacity.

Here's the steps I went through. 

* Clean install of Ubuntu Precise on the Zoostorm with / and swap on SSD, /home on HDD. Use a hostname of 'zoo' so as not to conflict on the network with the hostname 'wopr' used by the Mesh PC
* Boot into new installation and make sure everything works
* Boot Mesh PC but don't login, so none of my personal files are open/changing
* Use rsync on the new install to copy files from Mesh to Zoostorm over the network
```
$ cd /home
$ rsync -avz -e ssh wopr:/home/alan .
````

* Shutdown the old Mesh PC
* Edit /etc/hosts and /etc/hostname to change host from 'zoo' to 'wopr'
* Reboot the Zoostorm PC to 'Bring the WOPR on-line' as they say

I think that's about it. I now have all my personal stuff, work, config on the new computer, and can consider things to do with the old one. I think I might install [GameOS](http://windows.microsoft.com/) on it until Valve get around to porting Steam (and all the games) to Linux. :D

![Precise desktop](/blog/images/2012-01-02/precise2-300x168.png)

Things to consider:-

* I could probably have sped this up a bit by taking the disk out of the Mesh PC and putting it in the Zoostorm, then partition up the 1TB disk and move my /home directory over to it, edit fstab, remount /home and logout/in. That seemed like more effort in my mind, so I went for the approach above
* I now have a whole load of packages I need to install because my Zoostorm is a clean installation. So the first thing I did was to get the basic things I need. I will apt-get any missing bits as and when I need them. I have a decent connection so it doesn't bother me that I'm missing critical stuff at the moment.
* Copying only /home means I may have missed out some stuff in other places like /usr/local, /root and /etc. I have full backups of my old machine, so I am not to worried about missing stuff here or there, I can get them if I really need to

Hope that's useful to someone, and if you have any comments, do let me know.