+++
date = "2020-12-23T12:00:00-00:00"
title = "Snap Tips"
slug = "2020/12/snap-tips"
author = "Alan Pope"
tags = ['software', 'snap', 'snapcraft', 'linux', 'ubuntu']
+++

As you may or may not be aware, I work for [Canonical](https://canonical.com) on [Snapcraft](https://snapcraft.io/) and [Ubuntu](https://ubuntu.com/). I use Ubuntu as my daily driver, and spend a lot of time maintaining snap packages, and listening to developers and users talk about software packaging, publishing, delivery and use. 

Over time I've collected a bunch of virtual notes in my head. Much of it has been turned into documentation, but often the information is rather spread out. I wanted to "brain dump" a bunch of notes, for common things people ask me about snap, snapd and snapcraft. Here's the first set, about `snap` / `snapd`. A later post will focus on `snapcraft`. 

The source for this page is on [GitHub](https://github.com/popey/popey.com-blog/tree/main/content/post/2020/12/snap-tips.md), [PRs](https://github.com/popey/popey.com-blog/pulls) and [issues](https://github.com/popey/popey.com-blog/issues) welcome, within reason.

## The basics

### Searching for snaps

Search for snaps which are published for the *current architecture* using the words specified. 

*Note*: Results will vary because not all snaps are built and published for all architectures. That's up to the publisher to decide based on compatibility, availability and supportability, usually.

`$ snap find ohmygiraffe`

```
Name         Version  Publisher  Notes  Summary
ohmygiraffe  1.1.0a   popey      -      oh my giraffe
```

### Sections

Sections are like categories. Publishers can choose which section to put their application in, to make it easier for users to find.

#### List sections

`$ snap find --section`

```
No section specified. Available sections:
 * art-and-design
 * books-and-reference
 * development
 * devices-and-iot
 * education
 * entertainment
 * featured
 * finance
 * games
 * health-and-fitness
 * music-and-audio
 * news-and-weather
 * personalisation
 * photo-and-video
 * productivity
 * science
 * security
 * server-and-cloud
 * social
 * utilities
Please try 'snap find --section=<selected section>'
```

#### Search in sections

`$ snap find ohmygiraffe --section=games`

```
Name         Version  Publisher  Notes  Summary
ohmygiraffe  1.1.0a   popey      -      oh my giraffe
```

#### Show info about a snap

Includes application description, license and other, full metadata.

`$ snap info ohmygiraffe`

```
name:      ohmygiraffe
summary:   oh my giraffe
publisher: Alan Pope (popey)
store-url: https://snapcraft.io/ohmygiraffe
contact:   alan@popey.com
license:   Proprietary
description: |
  A game about a giraffe eating fruit while being chased by lions.
  
  oh my giraffe by Nico Prins (kneeko).
  
  Find out more, and get oh my giraffe for other platforms at
  https://www.ohmygiraffe.com/
snap-id: OZ7LxjGo2W76qWvpNpiklbRtCA4u84L3
channels:
  latest/stable:    1.1.0a 2020-11-04  (7) 40MB -
  latest/candidate: ↑                           
  latest/beta:      ↑                           
  latest/edge:      1.1.0a 2020-11-04 (10) 40MB -
```

#### Show channels used by a snap

Only shows the channel map.

`$ snap info ohmygiraffe | sed -n "/channels/,$ p"`

```
channels:
  latest/stable:    1.1.0a 2020-11-04  (7) 40MB -
  latest/candidate: ^                           
  latest/beta:      ^                           
  latest/edge:      1.1.0a 2020-11-04 (10) 40MB -
```

### Installing & Removing Snaps

#### Install

Install a snap from the stable channel.

`$ snap install ohmygiraffe`

```
ohmygiraffe 1.1.0a from Alan Pope (popey) installed
```

#### Install from a specific channel

`$ snap install emoj --edge`

#### Switch to a different channel

`$ snap switch ohmygiraffe --edge`

```
"ohmygiraffe" switched to the "latest/edge" channel
```

`$ snap refresh ohmygiraffe`

```
ohmygiraffe (edge) 1.1.0a from Alan Pope (popey) refreshed
```
*or*

`$ snap refresh ohmygiraffe --edge`

```
ohmygiraffe (edge) 1.1.0a from Alan Pope (popey) refreshed
```

#### Installing a classic snap

Classic confined snaps have no confinement. If you try to install them without specifying `--classic` you get some text describing the implication of installing it, and the choice to specify `--classic` and install, or to stop at that point.

`$ snap install snapcraft`

```
error: This revision of snap "snapcraft" was published using classic
       confinement and thus may perform arbitrary system changes outside of the
       security sandbox that snaps are usually confined to, which may put your
       system at risk.

       If you understand and want to proceed, repeat the command including
       --classic.

```

*Note*: In documentation, it's generally not recommended to add the `--classic` suffix even when needed, because users who copy-paste the command will never be empowered to make the choice of whether they *want* a classic snap installed or not, via the message above.

*Note*: Don't try to install a non-classic snap using `--classic`. It won't work, and isn't meant to.

`$ snap install snapcraft --classic`

```
snapcraft 4.4.4 from Canonical✓ installed
```

*Note*: The '✓' means the publisher is a verified developer.

#### Removing 

Removing a snap will automatically take a snapshot of the data created by the application in snap-related folders. Data created outside those places - such as on removable media, or in the user's home directory - will not be snapshotted. 

Only the data in `$HOME/snap/(snapname)/` and/or `/var/snap/(snapname)` (if used) are compressed as a zip into `/var/lib/snapd/snapshots`. The snapshot is kept in the event of an accidental removal deleting essential data such as browser bookmarks, which might otherwise be lost.

`$ snap remove ohmygiraffe`

```
ohmygiraffe removed
```

#### Remove without snapshot

Some snaps generate huge datasets (e.g. crypto nonsense) and may be too large, or not required for backing up. Purging the snap is exactly the same as removal, but it omits the snapshot.

`$ snap remove ohmygiraffe --purge`

```
ohmygiraffe removed
```

#### Reverting updates

If a snap fails to install, or an update is undesireable after it's been installed, the snap can be reverted with the following.

`$ snap revert zoom-client`

```
zoom-client reverted to 5.4.54779.1115
```

To further illustrate, here's the channel map for that snap, showing I'm tracking `latest/stable` but not running the version currently published there - revision 118 vs revision 125, at the time of writing.

```
tracking:     latest/stable
refresh-date: today at 19:34 GMT
channels:
  latest/stable:    5.4.57450.1220 2020-12-23 (125) 245MB -
  latest/candidate: 5.4.53350.1027 2020-10-31 (108) 157MB -
  latest/beta:      5.4.53350.1027 2020-10-31 (108) 157MB -
  latest/edge:      5.4.57450.1220 2020-12-22 (125) 245MB -
installed:          5.4.54779.1115            (118) 244MB -
```

### Reviewing changes

#### List of changes

To get a list of the most recent changes (installations, removals etc) of snaps, use this command.

`$ snap changes`

```
ID ID   Status  Spawn                     Ready                     Summary
  Status  Spawn                     Ready                     Summary
860  Done    today at 18:02 GMT        today at 18:02 GMT        Switch "ohmygiraffe" snap to channel "edge"
861  Done    today at 18:03 GMT        today at 18:03 GMT        Refresh "ohmygiraffe" snap
862  Done    today at 18:10 GMT        today at 18:10 GMT        Remove "snapcraft" snap
863  Done    today at 18:18 GMT        today at 18:18 GMT        Install "snapcraft" snap
864  Done    today at 18:20 GMT        today at 18:20 GMT        Remove "ohmygiraffe" snap
```

#### Get change detail 

To view all the steps performed during a task, use the following command, specifying the ID from the output above.

`$ snap change 864`

```
Status  Spawn               Ready               Summary
Done    today at 18:20 GMT  today at 18:20 GMT  Stop snap "ohmygiraffe" services
Done    today at 18:20 GMT  today at 18:20 GMT  Run remove hook of "ohmygiraffe" snap if present
Done    today at 18:20 GMT  today at 18:20 GMT  Disconnect interfaces of snap "ohmygiraffe"
Done    today at 18:20 GMT  today at 18:20 GMT  Save data of snap "ohmygiraffe" in automatic snapshot set #23
Done    today at 18:20 GMT  today at 18:20 GMT  Remove aliases for snap "ohmygiraffe"
Done    today at 18:20 GMT  today at 18:20 GMT  Make snap "ohmygiraffe" unavailable to the system
Done    today at 18:20 GMT  today at 18:20 GMT  Remove security profile for snap "ohmygiraffe" (10)
Done    today at 18:20 GMT  today at 18:20 GMT  Remove data for snap "ohmygiraffe" (7)
Done    today at 18:20 GMT  today at 18:20 GMT  Remove snap "ohmygiraffe" (7) from the system
Done    today at 18:20 GMT  today at 18:20 GMT  Remove data for snap "ohmygiraffe" (10)
Done    today at 18:20 GMT  today at 18:20 GMT  Remove snap "ohmygiraffe" (10) from the system
Done    today at 18:20 GMT  today at 18:20 GMT  Disconnect ohmygiraffe:desktop-legacy from snapd:desktop-legacy
Done    today at 18:20 GMT  today at 18:20 GMT  Disconnect ohmygiraffe:gnome-3-34-1804 from gnome-3-34-1804:gnome-3-34-1804
Done    today at 18:20 GMT  today at 18:20 GMT  Disconnect ohmygiraffe:sound-themes from gtk-common-themes:sound-themes
Done    today at 18:20 GMT  today at 18:20 GMT  Disconnect ohmygiraffe:desktop from snapd:desktop
Done    today at 18:20 GMT  today at 18:20 GMT  Disconnect ohmygiraffe:gsettings from snapd:gsettings
Done    today at 18:20 GMT  today at 18:20 GMT  Disconnect ohmygiraffe:opengl from snapd:opengl
Done    today at 18:20 GMT  today at 18:20 GMT  Disconnect ohmygiraffe:unity7 from snapd:unity7
Done    today at 18:20 GMT  today at 18:20 GMT  Disconnect ohmygiraffe:wayland from snapd:wayland
Done    today at 18:20 GMT  today at 18:20 GMT  Disconnect ohmygiraffe:x11 from snapd:x11
Done    today at 18:20 GMT  today at 18:20 GMT  Disconnect ohmygiraffe:gtk-3-themes from gtk-common-themes:gtk-3-themes
Done    today at 18:20 GMT  today at 18:20 GMT  Disconnect ohmygiraffe:icon-themes from gtk-common-themes:icon-themes
Done    today at 18:20 GMT  today at 18:20 GMT  Disconnect ohmygiraffe:audio-playback from snapd:audio-playback
```

### Manage warnings

#### Display warnings

As `snapd` updates in the background, warnings may not be seen by the user. So with the following command, it's possible to query any warnings which may have occured recently.

`$ snap warnings`

```
last-occurrence:  23 days ago, at 00:42 GMT
warning: |
  snap "standard-notes" is currently in use. Its refresh will be postponed for up to 7 days to wait
  for the snap to no longer be in use.
---
last-occurrence:  23 days ago, at 00:42 GMT
warning: |
  snap "slack" is currently in use. Its refresh will be postponed for up to 7 days to wait for the
  snap to no longer be in use.
```

In this case the two snaps listed were currently open. The `snapd` update was held back so as not to disrupt the application while running.

#### Acknowledge warnings

The warnings triggered by `snapd` are kept until acknowledged. Acknowledge them with the following command:

`$ snap okay`

The command produces no output. However, subsequently running `snap warnings` yields a new message:

```
No further warnings.
```

### Managing snapshots

#### List snapshots

Each snapshot is simply a root-owned zip file stored in `/var/lib/snapd/snapshots`.

`$ snap saved`

```
Set  Snap         Age    Version  Rev  Size    Notes
21   emoj         94.2m  v2.0.0   53     124B  auto
22   ohmygiraffe  92.2m  1.1.0a   x1    4176B  -
23   ohmygiraffe  2m60s  1.1.0a   10     122B  auto
```

#### Take snapshot

As well as automatic snapshots, the user can manually take a snapshot.

`$ snap save ohmygiraffe`

```
Set  Snap         Age    Version  Rev  Size    Notes
24   ohmygiraffe  104ms  1.1.0a   7      123B  -
```

#### Restore snapshot

Use `snap saved` to list snapshots, then use the ID number with `snap restore` to unpack the datafiles for the snap back to disk.

`$ snap restore 24`

```
Restored snapshot #24.
```

#### Delete snapshot forever

Any snapshot can be removed manually. In addition, they're automatically removed after 30 days, to recover space.

`$ snap forget 24`

```
Snapshot #24 forgotten.
```

## Tweaks

### Revisions kept

By default, `snapd` will retain 3 copies of every installed snap. This is to enable automatic and manual rollback via `snap rollback`. It's possible to override this, and keep more old versions of an application, or fewer, down to the minimum, 2.

`$ sudo snap set system refresh.retain=2`

The more revisions that are kept, the more disk space is consumed, so some users choose to reduce this setting. It also contributes to a cluttered `df` and `mount` output (see below) as both the currently active, and previous revision of all snaps are mounted.

### df

The output of `df` can be cluttered with the loopback mounts used by snaps. These can be suppressed by excluding all `squashfs` filetypes from the output.

`$ df -x squashfs`

```
Filesystem                1K-blocks      Used Available Use% Mounted on
tmpfs                       3275932      3620   3272312   1% /run
/dev/mapper/vgubuntu-root 958123168 432890148 476493284  48% /
tmpfs                      16379656    771360  15608296   5% /dev/shm
tmpfs                          5120         4      5116   1% /run/lock
tmpfs                          4096         0      4096   0% /sys/fs/cgroup
/dev/sda2                    721392    228528    440400  35% /boot
/dev/sda1                    523248      7984    515264   2% /boot/efi
tmpfs                       3275928      1908   3274020   1% /run/user/1000
```

Add this as an alias to your shell configuration.

`alias df="df -x squashfs"`

Use the following to override the alias.

`$ /bin/df`

### mount

The output of `mount` can be cluttered with the loopback mounts used by snaps. These can be supproessed by excluding all `squashfs` and `cgroup` mounts. I often extend the list with others I don't really care about.

`$ mount -t nosquashfs,nocgroup,nsfs,tmpfs,fuse`

```
sysfs on /sys type sysfs (rw,nosuid,nodev,noexec,relatime)
proc on /proc type proc (rw,nosuid,nodev,noexec,relatime)
udev on /dev type devtmpfs (rw,nosuid,noexec,relatime,size=16330552k,nr_inodes=4082638,mode=755)
devpts on /dev/pts type devpts (rw,nosuid,noexec,relatime,gid=5,mode=620,ptmxmode=000)
/dev/mapper/vgubuntu-root on / type ext4 (rw,relatime,errors=remount-ro)
securityfs on /sys/kernel/security type securityfs (rw,nosuid,nodev,noexec,relatime)
cgroup2 on /sys/fs/cgroup/unified type cgroup2 (rw,nosuid,nodev,noexec,relatime,nsdelegate)
pstore on /sys/fs/pstore type pstore (rw,nosuid,nodev,noexec,relatime)
efivarfs on /sys/firmware/efi/efivars type efivarfs (rw,nosuid,nodev,noexec,relatime)
none on /sys/fs/bpf type bpf (rw,nosuid,nodev,noexec,relatime,mode=700)
systemd-1 on /proc/sys/fs/binfmt_misc type autofs (rw,relatime,fd=28,pgrp=1,timeout=0,minproto=5,maxproto=5,direct,pipe_ino=34070)
hugetlbfs on /dev/hugepages type hugetlbfs (rw,relatime,pagesize=2M)
mqueue on /dev/mqueue type mqueue (rw,nosuid,nodev,noexec,relatime)
debugfs on /sys/kernel/debug type debugfs (rw,nosuid,nodev,noexec,relatime)
tracefs on /sys/kernel/tracing type tracefs (rw,nosuid,nodev,noexec,relatime)
/dev/mapper/vgubuntu-root on /snap/chrony/x7 type ext4 (ro,nodev,relatime,errors=remount-ro,x-gdu.hide)
fusectl on /sys/fs/fuse/connections type fusectl (rw,nosuid,nodev,noexec,relatime)
configfs on /sys/kernel/config type configfs (rw,nosuid,nodev,noexec,relatime)
/dev/sda2 on /boot type ext4 (rw,relatime)
/dev/sda1 on /boot/efi type vfat (rw,relatime,fmask=0077,dmask=0077,codepage=437,iocharset=iso8859-1,shortname=mixed,errors=remount-ro)
gvfsd-fuse on /run/user/1000/gvfs type fuse.gvfsd-fuse (rw,nosuid,nodev,relatime,user_id=1000,group_id=1000)
portal on /run/user/1000/doc type fuse.portal (rw,nosuid,nodev,relatime,user_id=1000,group_id=1000)
```

Add this as an alias to your shell configuration.

`alias mount="mount -t nosquashfs,nocgroup,nsfs,tmpfs,fuse"`

Use the following to override the alias.

`$ /bin/mount`

## Updates

Snaps update automatically in the background. Some don't like this, and would prefer more control. Here's the options to observe and control snap update behaviour.

### Review upcoming updates

`$ snap refresh --list`

```
All snaps up to date.
```

*or* (for example)

```
Name        Version    Rev   Publisher     Notes
dosbox-x    0.83.9     687   snapcrafters  -
hugo        0.79.1     9698  hugo-authors  -
lbry        0.49.1     162   popey         -
mindustry   121.4      1173  popey         -
simplenote  2.3.0      448   snapcrafters  -
starship    0.47.0     917   matankushner  -
wire        3.21.2936  205   snapcrafters  -
yakyak      1.5.11     96    snapcrafters  -
```

### Review upcoming change time

By default snap checks the store for updates 4 times a day. So if a publisher pushes a snap to a channel you're subscribed to, you'll get it within ~6 hours, assuming your computer is on, network connected and not on a metered connection (more on that below).

`$ snap refresh --time`

```
timer: 00:00~24:00/4
last: today at 18:24 GMT
next: tomorrow at 04:48 GMT
```

### Check if updates are held

By default they're not likely to be held, but if you choose to (see below) then this command is useful for checking the status. This is a global setting for all snaps, not specific to any one snap.

`$ sudo snap get system refresh.hold`

```
error: snap "core" has no "refresh.hold" configuration option
```

*or* (for example)

```
2021-01-21T17:30:01+00:00
```

### Hold updates

This command prevents `snapd` from checking the Snap Store for any updates to the system until the date and time specified. This example effectively pushes back all updates by 30 minutes. It doesn't print any output on success, so use the `sudo snap get system refresh.hold` command or `snap refresh --time` to see what the result was.

`$ sudo snap set system refresh.hold=$(date --iso-8601=seconds -d "30 minutes")`

In this example we programmatically get the date and just add a day to it. Deferring updates by one day.

`$ sudo snap set system refresh.hold="$(date --iso-8601=seconds --date=tomorrow)"`

This is fun. Setup a cron job as the `root` user which runs every day, pushing back the update window by 30 days.

`0 12 * * * /usr/bin/snap set system refresh.hold="$(/usr/bin/date --iso-8601=seconds -d '+30 days')"`

**Note**: `snapd` is [hard-wired](https://github.com/snapcore/snapd/blob/master/overlord/snapstate/autorefresh.go#L45) to ignore this, and update after 95 days. 

### Set refresh time

As well as holding updates, it's possible to define a specific time when updates should occur. This command forces updates to only happen between 4am and 7am.

`$ sudo snap set system refresh.timer=4:00-7:00`

### Set metered connection

You may wish to suppress updates if you're on a metered connection such as a MiFi or tethered to a cellphone with limited data allowance. Indeed, in some regions it may be desirable to rate-limit snapd on the default domestic wireless connection too due to cost or imposed data limits.

Modern desktop environments have options to configure networks to be 'metered'. Consult the documentation for your desktop to configure that setting. The snap system can be configured to respect the metered option or not.

Tell `snapd` not to refresh on metered connections

`$ sudo snap set system refresh.metered=hold`

To switch off this feature, use the command:

`$ sudo snap set system refresh.metered=null`


## Conclusion

I hope this braindump is useful. There's a lot of kinda random commands in this page. All of it is covered in more detail in the [snapcraft documentation](https://snapcraft.io/docs). 

The source for this page is on [GitHub](https://github.com/popey/popey.com-blog/tree/main/content/post/2020/12/snap-tips.md), [PRs](https://github.com/popey/popey.com-blog/pulls) and [issues](https://github.com/popey/popey.com-blog/issues) welcome, within reason.
