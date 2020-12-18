+++
date = "2020-12-18T12:00:00-00:00"
title = "Straightforward Linux Backups with rsnapshot"
slug = "2020/12/Straightforward Linux Backups with rsnapshot"
author = "Alan Pope"
tags = ['hardware', 'howto', 'ubuntu', 'backup', 'rsnapshot']
+++

*This article previously appeared on [listed.to](https://listed.to/@popey/18554/straightforward-linux-backups-with-rsnapshot). I've moved it here to consolidate my blogging*

I hang around in technical support back-alleys. All too often a new person turns up asking for urgent help. Their system is catastrophically broken and they have no easy way to fix it. With a bit of help they can usually come to a fork in the road. Do they wipe and re-install, or keep fighting with the computer to get it working. It's a knowledge, time, effort and convenience trade-off as old as technology itself.

One question we often ask the patient is *"Do you have backups?"*. It's a simple, innocuous question. But if they don't then it closes off one avenue, and focuses the attention on fixing the problem rather than nuking & paving, then restoring data. All too often the person with the problems says "no", they have no backups at all. I wish more people did back their systems up, but so many don't bother. I guess that's partly why "cloud" document editing, and "cloud" photo storage are so popular these days. Who needs backups when you can just throw the computer away, login from a new one and see all your data. It's a compelling convenience.

For those of us who actually store stuff on their PC though, backups are a Good Idea. Here's what I do, which may be useful to others. 

## Hardware

My desktop PC has an external hard disk attached. I have an [Inatek USB 3 dual-drive bay](https://geni.us/7wZVNU) into which I lobbed a [4TiB hard disk](https://geni.us/ujBf4A). It's attached over a standard USB cable which is supplied with the bay. It's powered on all the time, and sits quietly on a shelf near my computer. 

I formatted the 4TiB disk using the "Disk Utility" on Ubuntu using the ext4 filesystem. Other filesystems and formatting tools are available, but this works, and I know the ext4 filesystem can be read by most things. So if this machine catastrophically fails, I can get to the data by plugging the drive into basically anything.

I have the partition volume label as "backup" so when it's attached it shows up under `/media/alan/backup`. I like that it mounts under a human-readable name, and I can browse around it using the file manager.

## Software

I'm running Ubuntu 20.10 on my main machine. But this guide should work for any common Linux distro. Install rsnapshot from your archives. Rsnapshot is a rather neat backup system. It keeps a configurable number of old backups going back hours/days/weeks/months.

The thing to note is that rsnapshot doesn't make entire backups each time, only what's changed. It uses rsync under the covers, and uses hard links to avoid lots of file duplication. So you can end up with lots of backups where each successive one is only a small (or large) delta on top of the previous one. It's super clever, and means you can easily browse the directories in a file manager to find the file you need, from any of the historical backups. 

## Configuration

Once installed it needs a little configuration, but not much. The main thing to edit is `/etc/rsnapshot.conf`. Note though, that for some reason it requires tabs and not spaces between parameters. No, multiple spaces won't do, they must be tabs. It's somewhat annoying but you get used to it after editing the file and finding your backups don't run anymore :)

I typically set the following:

This is the main important one, where are the backups gonna go. My hostname is robot, so I put them in this handy folder. 

`snapshot_root /media/alan/backup/robot-rsnapshot`

no_create_root will ensure that if your disk becomes unmounted for some reason, then rsnapshot doesn't fill your internal disk up with a backup under the expected mount point. Been bitten by that a few times.

`no_create_root 1`

Retain is where you define how many and of which level backup you want to keep. These used to be called hourly, daily, weekly, monthly in older releases of rsnapshot, but were changed to alpha, beta, gamma, delta because the time interval between backups is arbitrary, so they were a bit meaningless.

So setting this means I end up with 6 backups which were done most recently, then one of those gets hived off to become the beta backup, which it keeps 7 of, one of which gets hived off as gamma, and so on. This means you have multiple alpha backups fairly recently, multiple older beta backups representing days then gamma representing weeks and delta backups going back months.

```
retain alpha 6
retain beta 7
retain gamma 4
retain delta 3
```

This makes way more sense if I just show you the result of this on disk. Here you can see the alpha backups were done over the last 24 hours. The alpha.5 backup was at some point made into beta.0 and all the beta backups were shuffled up one. Then at some point beta.6 became gamma.0 and the other gammas were rotated up with the oldest one becoming delta.0 (when that finally happens). If we come back in a year, I'll have a few delta backups going back a while.

```
alan@robot:~$ sudo ls -ltr /media/alan/backup/robot-rsnapshot/
total 68
drwxr-xr-x 3 root root 4096 Aug 23 04:00 gamma.3
drwxr-xr-x 3 root root 4096 Aug 30 04:02 gamma.2
drwxr-xr-x 3 root root 4096 Sep 6 04:00 gamma.1
drwxr-xr-x 3 root root 4096 Sep 13 04:01 gamma.0
drwxr-xr-x 3 root root 4096 Sep 16 04:07 beta.6
drwxr-xr-x 3 root root 4096 Sep 17 04:00 beta.5
drwxr-xr-x 3 root root 4096 Sep 18 04:00 beta.4
drwxr-xr-x 3 root root 4096 Sep 19 04:00 beta.3
drwxr-xr-x 3 root root 4096 Sep 20 00:01 beta.2
drwxr-xr-x 3 root root 4096 Sep 21 04:06 beta.1
drwxr-xr-x 3 root root 4096 Sep 22 08:00 beta.0
drwxr-xr-x 3 root root 4096 Sep 22 15:18 alpha.5
drwxr-xr-x 3 root root 4096 Sep 22 16:05 alpha.4
drwxr-xr-x 3 root root 4096 Sep 22 20:03 alpha.3
drwxr-xr-x 3 root root 4096 Sep 23 00:04 alpha.2
drwxr-xr-x 3 root root 4096 Sep 23 04:00 alpha.1
drwxr-xr-x 3 root root 4096 Sep 23 08:01 alpha.0
```

Finally the bit which tells rsnapshot what to backup. This is just a list of folders and where they get put in each of the folders above. These are the defaults, to which you can add folders which are important to you. I really only deeply care about my data in home and configuration in etc.

```
backup /home/ localhost/
backup /etc/ localhost/
backup /usr/local/ localhost/
```

Here's what that looks like on disk:

```
alan@robot:~$ sudo ls -ltr /media/alan/backup/robot-rsnapshot/alpha.0/localhost
total 20
drwxr-xr-x 3 root root 4096 Jul 31 17:28 usr
drwxr-xr-x 5 root root 4096 Aug 15 19:32 home
drwxr-xr-x 145 root root 12288 Sep 22 20:15 etc
```

There's plenty of other options, but really the only two I change are the first ones, and leave the rest as the default. 

Rsnapshot has a configtest option which validates the configuration:
```
alan@robot:~$ sudo rsnapshot configtest
Syntax OK
```
## Testing configuration

It's a good idea to run a test backup to make sure your configuration is all correct. The easiest way to do that is just like this:

`sudo rsnapshot -v alpha`

This will verbosely output to the terminal what it's doing while it runs. The first backup may take a long while, depending on how much data you have, how fast your disks are etc.

## Schedule

While it's possible to run rsnapshot manually. Most of the time you want to have a scheduled backup. I just use a cron job in the root account. To set that up, either run this:

`sudo crontab -e`

OR

Create `/etc/cron.d/rsnapshot` (which may already exist, depending on version and packaging of rsnapshot).

Here's what I paste in, or what was already pasted in.

```
0 */4	* * *	root	/usr/bin/rsnapshot alpha
30 3	* * *	root	/usr/bin/rsnapshot beta
0 3	* * 1	root	/usr/bin/rsnapshot gamma
30 2	1 * *	root	/usr/bin/rsnapshot delta
```

Every day, four times a day, the alpha backup is run. This is what actually does a backup. The rest technically don't.

Every day, at 3:30AM, a beta backup is run - which moves all the beta backups up one, and moves the oldest alpha to beta.0

Every Monday at 3:00AM a gamma backup is run - which moves all the gamma backups up one, and moves the oldest beta to gamma.0

Every 1st of the month at 2:30AM a delta backup is run - which moves all the delta backups up one, and takes the oldest gamma to become delta.0

Here's some extracts from my logs showing this happening:

### alpha:
```
[2020-09-23T08:00:01] /usr/bin/rsnapshot alpha: started
[2020-09-23T08:00:01] echo 3366612 > /var/run/rsnapshot.pid
[2020-09-23T08:00:01] /bin/rm -rf /media/alan/backup/robot-rsnapshot/alpha.5/
[2020-09-23T08:01:15] mv /media/alan/backup/robot-rsnapshot/alpha.4/ /media/alan/backup/robot-rsnapshot/alpha.5/
[2020-09-23T08:01:15] mv /media/alan/backup/robot-rsnapshot/alpha.3/ /media/alan/backup/robot-rsnapshot/alpha.4/
[2020-09-23T08:01:15] mv /media/alan/backup/robot-rsnapshot/alpha.2/ /media/alan/backup/robot-rsnapshot/alpha.3/
[2020-09-23T08:01:15] mv /media/alan/backup/robot-rsnapshot/alpha.1/ /media/alan/backup/robot-rsnapshot/alpha.2/
[2020-09-23T08:01:15] /bin/cp -al /media/alan/backup/robot-rsnapshot/alpha.0 /media/alan/backup/robot-rsnapshot/alpha.1
[2020-09-23T08:01:42] /usr/bin/rsync -a --delete --numeric-ids --relative --delete-excluded /home/ /media/alan/backup/robot-rsnapshot/alpha.0/localhost/
[2020-09-23T08:01:53] /usr/bin/rsync -a --delete --numeric-ids --relative --delete-excluded /etc/ /media/alan/backup/robot-rsnapshot/alpha.0/localhost/
[2020-09-23T08:01:53] /usr/bin/rsync -a --delete --numeric-ids --relative --delete-excluded /usr/local/ /media/alan/backup/robot-rsnapshot/alpha.0/localhost/
[2020-09-23T08:01:53] touch /media/alan/backup/robot-rsnapshot/alpha.0/
[2020-09-23T08:01:53] rm -f /var/run/rsnapshot.pid
[2020-09-23T08:01:53] /usr/bin/rsnapshot alpha: completed successfully
```

### beta:
```
[2020-09-21T03:30:01] /usr/bin/rsnapshot beta: started
[2020-09-21T03:30:01] echo 305636 > /var/run/rsnapshot.pid
[2020-09-21T03:30:02] mv /media/alan/backup/robot-rsnapshot/beta.5/ /media/alan/backup/robot-rsnapshot/beta.6/
[2020-09-21T03:30:02] mv /media/alan/backup/robot-rsnapshot/beta.4/ /media/alan/backup/robot-rsnapshot/beta.5/
[2020-09-21T03:30:02] mv /media/alan/backup/robot-rsnapshot/beta.3/ /media/alan/backup/robot-rsnapshot/beta.4/
[2020-09-21T03:30:02] mv /media/alan/backup/robot-rsnapshot/beta.2/ /media/alan/backup/robot-rsnapshot/beta.3/
[2020-09-21T03:30:02] mv /media/alan/backup/robot-rsnapshot/beta.1/ /media/alan/backup/robot-rsnapshot/beta.2/
[2020-09-21T03:30:02] mv /media/alan/backup/robot-rsnapshot/beta.0/ /media/alan/backup/robot-rsnapshot/beta.1/
[2020-09-21T03:30:02] mv /media/alan/backup/robot-rsnapshot/alpha.5/ /media/alan/backup/robot-rsnapshot/beta.0/
[2020-09-21T03:30:02] rm -f /var/run/rsnapshot.pid
[2020-09-21T03:30:02] /usr/bin/rsnapshot beta: completed successfully
```
### gamma:
```
[2020-09-21T03:00:01] /usr/bin/rsnapshot gamma: started
[2020-09-21T03:00:01] echo 273151 > /var/run/rsnapshot.pid
[2020-09-21T03:00:02] mv /media/alan/backup/robot-rsnapshot/gamma.2/ /media/alan/backup/robot-rsnapshot/gamma.3/
[2020-09-21T03:00:02] mv /media/alan/backup/robot-rsnapshot/gamma.1/ /media/alan/backup/robot-rsnapshot/gamma.2/
[2020-09-21T03:00:02] mv /media/alan/backup/robot-rsnapshot/gamma.0/ /media/alan/backup/robot-rsnapshot/gamma.1/
[2020-09-21T03:00:02] mv /media/alan/backup/robot-rsnapshot/beta.6/ /media/alan/backup/robot-rsnapshot/gamma.0/
[2020-09-21T03:00:02] rm -f /var/run/rsnapshot.pid
[2020-09-21T03:00:02] /usr/bin/rsnapshot gamma: completed successfully
```
### delta:
```
[2020-09-01T02:30:01] /usr/bin/rsnapshot delta: started
[2020-09-01T02:30:01] echo 1424983 > /var/run/rsnapshot.pid
[2020-09-01T02:30:01] /media/alan/backup/robot-rsnapshot/gamma.3 not present (yet), nothing to copy
[2020-09-01T02:30:01] rm -f /var/run/rsnapshot.pid
[2020-09-01T02:30:01] /usr/bin/rsnapshot delta: completed successfully
```
## Conclusion

It probably all looks more complex than it really is. In essence you just need to have a drive to backup to, point rsnapshot to it, run rsnapshot regularly and check the log file periodically to make sure it worked. This has saved my bacon a few times. I can rummage around on the disk to find files I accidentally (or intentionally) deleted, in backups dating back weeks or even months. If I nuke my machine I can be confident I have copies of my important files right at hand.

Hope that helps someone!