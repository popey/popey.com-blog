+++
date = "2021-01-12T12:00:00-00:00"
title = "Digital Hoarding: Ubuntu Mirror"
slug = "2021/01/digital-hoarding-ubuntu-mirror"
author = "Alan Pope"
tags = ['ubuntu', 'linux', 'mirror', 'packages', 'deb']
+++

I have a bunch of Ubuntu machines on my local network at home. They all periodically need to check for updates then download & install them. Rather than have them all reach out to the official mirrors externally to my network, I decided to run my own mirror internally. This post is just a set of notes for anyone else who might be looking to do something similar.

I also do a lot of software building, and re-building, which pulls all kinds of random libraries, compilers and other packages from the archive. Having it local saves me repeatedly downloading from the 'net while the kids are on ~~Netflix~~ School Zoom classes.

Don't do this if you're on a super slow connection because the mirror will probably never finish building. Also probably don't do it if you have a per-byte billing arrangement with your provider. This will chew quite a bit of bandwidth, especially the first run. But even subsequent runs can do too, depending on how much chrurn in the Ubuntu Archive there's been since it was last executed.

## Get a big box

I host my mirror on a rather aged HP Microserver hidden away in a cupboard. It sports an AMD Turion(tm) II Neo N40L Dual-Core Processor with 8GiB RAM and a pair of 500GiB disks for `/`, and a pair of 2TiB drives for `/srv`, where the mirror will live. I use `mdraid` to mirror each pair.

```
$ cat /proc/mdstat 
Personalities : [linear] [multipath] [raid0] [raid1] [raid6] [raid5] [raid4] [raid10] 
md0 : active raid1 sda2[0] sdb1[1]
      483266560 blocks super 1.2 [2/2] [UU]
      bitmap: 2/4 pages [8KB], 65536KB chunk

md127 : active raid1 sdd1[1] sdc1[0]
      1953382464 blocks super 1.2 [2/2] [UU]
      bitmap: 1/15 pages [4KB], 65536KB chunk

unused devices: <none>
```

According to `/var/log/installer/media-info` I used the `Ubuntu-Server 16.04.2 LTS "Xenial Xerus" - Release amd64 (20170215.8)` media to install the OS on it. I've subsequently upgraded to Ubuntu 18.04 LTS

```
$ lsb_release -a
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 18.04.5 LTS
Release:        18.04
Codename:       bionic
```

There's not a lot special about this install. I created an `mdraid` array for `/` during install then made a further array for `/srv` using the two 2TiB disks. All pretty standard. 

## Install software

### Mirror scripts

There's various ways to mirror the Ubuntu archive. I'm currently using `ubumirror` which you can get from [Launchpad](https://launchpad.net/ubumirror). The code hasn't been touched for a few years, but I doubt the structure of an Ubuntu mirror changes much either. This works.

`$ bzr branch lp:ubumirror`

I just ran that in my home directory, so I have the scripts to hand there. I could possibly have "installed" it to somewhere standardised I guess like `/opt` or `/usr/local`, but it doesn't really matter to me.

### Webserver

There's a bunch of different webservers available. As this is just going to be hosting files, nothing complicated, I just installed Apache. Obviously if you prefer some other webserver, use that.

`$ sudo apt install apache2`

There's not a lot to configure, and there's plenty of guides online to setup Apache (or whatever server you choose), so I won't cover that here. Just have the webserver serve up the content from the directory you're putting the mirror in.

## Configure

The configuration file for `ubumirror` is `/etc/ubumirror.conf`. Here's what mine looks like. Importantly set the `UBUARC_DIR` which points to the 2TiB drives mounted under `/srv`. `UBUARC_EXCLUDE` is useful to prevent mirroring stuff you don't want, like `powerpc` architecture binaries. I also set the `EMAIL` field so I get funky emails when there's a problem. I tend to only update overnight when everyone is asleep, so don't slow the mirror down with the `SPEED` setting. I just let it go full-tilt.

```
#
# ubumirror.conf - configuration file for the ubumirror scripts.
#                           

# Please set the variables below to fit your site.                                
# Which email address/user that will receive failure notices.   
EMAIL=alan@popey.com                                 
                                                      
# Server's FQDN.                                        
#HOSTNAME=$(hostname -f)                                 
HOSTNAME=$(hostname)                                        

# Bandwidth limit for all mirror scripts - set to 0 for no limit.
SPEED=0                                                             
                                                                      
# I/O timeout for all mirror scripts - defaults to 600 seconds.
IO_TIMEOUT=600                                     
                                               
# Set to 1 to prefer IPv6 over IPv4                        
IPV6=0
                                                           
# UBUARC_DIR is the destination for the base of the archive directory
# The script won't run if this variable isn't set
UBUARC_DIR="/srv/mirror/ubuntu"                            

# UBUCDI_DIR is the destination for the base of the cdimage directory
# The script won't run if this variable isn't set                     
UBUCDI_DIR="/srv/mirror/ubuntu-cdimage"                   
                                                   
# UBUREL_DIR is the destination for the base of the releases directory
# The script won't run if this variable isn't set          
UBUREL_DIR="/srv/mirror/ubuntu-releases"
                   
# UBUPOR_DIR is the destination for the base of the ports directory
# The script (ubuports) won't run if this variable isn't set
UBUPOR_DIR="/srv/mirror/ubuntu-ports"            
#                                                            
# UBUCLOUD_DIR is the destination for the base of the cloud-image directory
# The script (ubucloudimage) won't run if this variable isn't set
UBUCLOUD_DIR="/srv/mirror/ubuntu-cloud-images" 
 
# LOGDIR is the destination directory of all the logs           
LOGDIR="/var/log/ubumirror/"

# UBU{ARC,CDI,REL}_MIRROR is the rsync path in the form of host::directory/ of the
# upstream mirrors where the ubumirror scripts will mirror from.
UBUARC_MIRROR=rsync://rsync.archive.ubuntu.com/ubuntu
UBUCDI_MIRROR=rsync://rsync.cdimage.ubuntu.com/cdimage
UBUREL_MIRROR=rsync://rsync.releases.ubuntu.com/releases
UBUPOR_MIRROR=rsync://rsync.ports.ubuntu.com/ubuntu-ports
UBUCLOUD_MIRROR=rsync://cloud-images.ubuntu.com/cloud-images

# UBU{ARC,CDI,REL}_EXCLUDE is what things you want to exclude    
UBUARC_EXCLUDE=" --exclude binary-powerpc/ --exclude binary-sparc/ \
 --exclude daily-installer-powerpc/ --exclude daily-installer-sparc/ \
 --exclude installer-powerpc/ --exclude installer-sparc/ \     
 --exclude *_powerpc.deb --exclude *_powerpc.udeb \
 --exclude *_sparc.deb --exclude *_sparc.udeb \
 --exclude Contents-powerpc.gz --exclude Contents-sparc.gz"
      
UBUCDI_EXCLUDE=" --exclude *-powerpc.* --exclude *-sparc.*"
# --exclude source/ \                                                
                                                 
UBUREL_EXCLUDE=" --exclude *-powerpc.* --exclude *-sparc.*"

UBUPOR_EXCLUDE=" --exclude binary-powerpc/ --exclude binary-sparc/ \ 
 --exclude daily-installer-powerpc/ --exclude daily-installer-sparc/ \
 --exclude installer-powerpc/ --exclude installer-sparc/ \
 --exclude *_powerpc.deb --exclude *_powerpc.udeb \
 --exclude *_sparc.deb --exclude *_sparc.udeb \                       
 --exclude Contents-powerpc.gz --exclude Contents-sparc.gz"
                                        
UBUCLOUD_EXCLUDE=""

```

## First run

I'd recommend running `sudo ./ubuarchive` manually at least the first couple of times to make sure it works. You should see output like this in the logs, which are in `/var/log/ubumirror`

```
Wed, 16 Dec 2020 02:00:01 +0000: Initiating Ubuntu archive mirror operations...
Wed, 16 Dec 2020 02:00:01 +0000: Lock established for process 6701.
Wed, 16 Dec 2020 02:00:01 +0000: Initiating Ubuntu archive pool sync...
This is an Ubuntu mirror - treat it kindly

./
ls-lR.gz
.trace/
.trace/ubuntu-aerodent
pool/main/a/apache2/
pool/main/a/apache2/apache2-bin_2.4.46-2ubuntu1_amd64.deb
pool/main/a/apache2/apache2-bin_2.4.46-2ubuntu1_i386.deb
pool/main/a/apache2/apache2-data_2.4.46-2ubuntu1_all.deb
pool/main/a/apache2/apache2-dev_2.4.46-2ubuntu1_amd64.deb
pool/main/a/apache2/apache2-dev_2.4.46-2ubuntu1_i386.deb
⋮
```

Ending like this:

```
⋮
sent 10,726,615 bytes  received 4,973,222,876 bytes  8,097,399.66 bytes/sec
total size is 66,086,898,888  speedup is 13.26
Wed, 16 Dec 2020 02:21:29 +0000: Ubuntu archive dists and indices sync completed.
Wed, 16 Dec 2020 02:21:29 +0000: Removing soft-links from mirror...
Wed, 16 Dec 2020 02:21:31 +0000: Releasing lock file...
Wed, 16 Dec 2020 02:21:31 +0000: Time-stamping trace file...
Wed, 16 Dec 2020 02:21:31 +0000: Ubuntu archive mirror operations completed.
```

Looks good! Also, yikes at that traffic.

Visiting the site in a browser should work as a quick check to make sure the site is configured correctly.

![mirror](/blog/images/2021-01-12/mirror.png)


## Configure clients

For each machine on the LAN which needs access to the mirror, configure the `/etc/apt/sources.list` accordingly, adjusting the codename as required, and the hostname for the mirror box. All my machines are named after computers from science fiction. This one is `robby` named after [Robby](https://en.wikipedia.org/wiki/Robby_the_Robot).

Note: I keep the `security.ubuntu.com` repo, so I get security updates promptly directly from the upstream server.

```
$ cat /etc/apt/sources.list
deb http://robby.local/ubuntu/ groovy main restricted universe multiverse
deb-src http://robby.local/ubuntu/ groovy main restricted universe multiverse
deb http://robby.local/ubuntu/ groovy-updates main restricted universe multiverse
deb-src http://robby.local/ubuntu/ groovy-updates main restricted universe multiverse
deb http://robby.local/ubuntu/ groovy-backports main restricted universe multiverse
deb-src http://robby.local/ubuntu/ groovy-backports main restricted universe multiverse
deb http://security.ubuntu.com/ubuntu groovy-security main restricted universe multiverse
deb-src http://security.ubuntu.com/ubuntu groovy-security main restricted universe multiverse
```

Test that it works:

![apt update](/blog/images/2021-01-12/apt-update.png)

Looking good so far, let's see if we can install a package.

![apt install](/blog/images/2021-01-12/apt-install.png)

## Scheduled updates

Now it's all working, I setup a cron job on the server.

```
# crontab -l
0 2 * * * cd /home/alan/ubumirror && ./ubuarchive
```

So at 2AM every day the server grabs all the latest updates into my mirror, and deletes old packages, to keep it nicely trim! 

As you can see it's really busy at that time, and then not much else. I could potentially update multiple times during the day, but I don't that's necessary

```
$ sudo vnstat -h -i enp3s0
 enp3s0                                                                   15:46 
  ^                                r                                            
  |                                r                                            
  |                                r                                            
  |                                r                                            
  |                                r                                            
  |                                r                                            
  |                                r                                            
  |                                r                                            
  |                                r                                            
  |                                r                                            
 -+---------------------------------------------------------------------------> 
  |  16 17 18 19 20 21 22 23 00 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15    
                                                                                
 h  rx (MiB)   tx (MiB)  ][  h  rx (MiB)   tx (MiB)  ][  h  rx (MiB)   tx (MiB) 
16       17.4       22.1 ][ 00       16.5       23.7 ][ 08       30.5       28.2
17       20.1       23.1 ][ 01       54.8       24.6 ][ 09       29.5       27.5
18       17.8       22.7 ][ 02    7,712.5      204.0 ][ 10       31.1       36.1
19       17.4       22.7 ][ 03       62.6       33.5 ][ 11       28.0      205.3
20       21.6      218.1 ][ 04       51.5       30.9 ][ 12       31.8      207.9
21       69.0      502.7 ][ 05       17.3       23.8 ][ 13       20.4      242.2
22       16.4       23.7 ][ 06       22.8       24.3 ][ 14       18.5      145.7
23       28.3      387.1 ][ 07       31.4       23.9 ][ 15       15.4       84.0

```

The disks are getting a bit full. It's not just a mirror, there's all manner of crap on that machine! We're "*Digital Hoarding*" remember!

```
$ df -h /srv
Filesystem      Size  Used Avail Use% Mounted on
/dev/md127      1.9T  1.5T  395G  79% /srv
```

Might have to prune them. I'm currently mirroring all supported releases. If I start running out of space, I'll probably cull the older releases that aren't in use much in my house these days.

```
$ sudo du -hs /srv/mirror/ubuntu/dists/*
1.1G    /srv/mirror/ubuntu/dists/precise
1.8M    /srv/mirror/ubuntu/dists/precise-backports
3.9G    /srv/mirror/ubuntu/dists/precise-proposed
66M     /srv/mirror/ubuntu/dists/precise-security
3.9G    /srv/mirror/ubuntu/dists/precise-updates
767M    /srv/mirror/ubuntu/dists/trusty
1.4M    /srv/mirror/ubuntu/dists/trusty-backports
2.9G    /srv/mirror/ubuntu/dists/trusty-proposed
324M    /srv/mirror/ubuntu/dists/trusty-security
3.1G    /srv/mirror/ubuntu/dists/trusty-updates
1.6G    /srv/mirror/ubuntu/dists/xenial
6.3M    /srv/mirror/ubuntu/dists/xenial-backports
3.6G    /srv/mirror/ubuntu/dists/xenial-proposed
1.3G    /srv/mirror/ubuntu/dists/xenial-security
4.0G    /srv/mirror/ubuntu/dists/xenial-updates
2.0G    /srv/mirror/ubuntu/dists/bionic
4.7M    /srv/mirror/ubuntu/dists/bionic-backports
6.5G    /srv/mirror/ubuntu/dists/bionic-proposed
2.1G    /srv/mirror/ubuntu/dists/bionic-security
6.5G    /srv/mirror/ubuntu/dists/bionic-updates
2.7G    /srv/mirror/ubuntu/dists/focal
4.9M    /srv/mirror/ubuntu/dists/focal-backports
2.5G    /srv/mirror/ubuntu/dists/focal-proposed
660M    /srv/mirror/ubuntu/dists/focal-security
1.2G    /srv/mirror/ubuntu/dists/focal-updates
2.1G    /srv/mirror/ubuntu/dists/groovy
4.5M    /srv/mirror/ubuntu/dists/groovy-backports
1.2G    /srv/mirror/ubuntu/dists/groovy-proposed
401M    /srv/mirror/ubuntu/dists/groovy-security
434M    /srv/mirror/ubuntu/dists/groovy-updates
4.2G    /srv/mirror/ubuntu/dists/hirsute
1.1M    /srv/mirror/ubuntu/dists/hirsute-backports
679M    /srv/mirror/ubuntu/dists/hirsute-proposed
1.1M    /srv/mirror/ubuntu/dists/hirsute-security
1.1M    /srv/mirror/ubuntu/dists/hirsute-updates
```

So that's it. I basically don't touch it anymore. The cron job runs and keeps it up to date. If I install a new machine, I point it at that mirror, configure automatic updates, and I'm done.