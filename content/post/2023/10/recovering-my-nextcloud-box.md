+++
date = "2023-10-10T20:00:00+01:00"
title = "Recovering my NextCloud Box"
slug = "2023/10/recovering-my-nextcloud-box"
author = "Alan Pope"
tags = ['nextcloud', 'ubuntu', 'wd', 'linux', 'core', 'snap']
+++

## NextCloud Box

I just stumbled on an old NextCloud Box in my loft. It's a quiet Sunday in the house, so I thought I'd see if it still works, and if there's any data on it. I'm pretty sure I did use it for a while, so there must be *something* on it.

Here's my NextCloud Box in a cardboard box labelled "NextCloud Box".

[![NextCloud Box Box](/blog/images/2023-10-01/boxbox.jpg)](/blog/images/2023-10-01/boxbox.jpg)

Here's what the NextCloud box looks like once installed.

[![NextCloud Box front](/blog/images/2023-10-01/front.jpg)](/blog/images/2023-10-01/front.jpg)

The rear doesn't look too bad, if you don't look at it too hard.

[![NextCloud Box rear](/blog/images/2023-10-01/rear.jpg)](/blog/images/2023-10-01/rear.jpg)

For those who weren't around, or missed the short-lived NextCloud Box, a short introduction is in order. As I recall this was a collaboration between the (now defunct) WD Labs - a division of Western Digital storage - and NextCloud. Canonical were involved too, I believe. 

The box was really just a two-part plastic case, barely big enough to hold a hard disk and Raspberry Pi. Mine contains a 1TB drive and a Raspberry Pi 2. It was a bit janky, to be fair. The cable routing was poorly done, with the Pi power lead leaking out of the case and back in. Not very elegant.

[![NextCloud Box](/blog/images/2023-10-01/box.jpg)](/blog/images/2023-10-01/box.jpg)

It looks worse in this picture because there is an ethernet cable and USB keyboard attached, without being routed. But you get the idea.

It was probably good enough for a small family of users, sharing data, and generally doing the whole self-hosting thing. But it struggled under any appreciable load. I'm aware that some people put a faster, later model Pi in theirs. 

## My NextCloud Box

I ordered mine on 16th September 2016. It cost £60 and shipped out a month later. I set it up and it was in use for a while. I used the NextCloud app on my phone at some point to sync my photos up to my box, rather than to DropBox, which I'd previously used.

I assume there's some data on my NextCloud box, and it may even be photos I don't have backed up anywhere else. So I thought I'd spend a bit of time today, trying to get at that data. 

The *easy* way to do it would be to just yank the micro SD card out of the Pi, and the hard disk from the box, and attach them with appropriate adapters to my laptop. That would be fast, easy and would result in zero blog posts. Can't have that!

## Boot the box

Thankfully I'd put all the pieces in the cardboard box before delegating it to the *loft of ancient things*. The power supply, cables, adapters and of course the Pi and disk were all nicely packaged up.

I started by plugging the device in without a network connection, thinking I could just login at the console or over SSH and get at the data. It booted just fine, and dropped me at a login prompt.

[![No network](/blog/images/2023-10-01/noip.png)](/blog/images/2023-10-01/noip.png)

However there's a flaw here. By default Ubuntu Core (which is the OS on the card) doesn't have any local user accounts you can log in to. On first-run it gathers SSH keys via Ubuntu One / Launchpad.net, enabling network login via SSH. But without a local login, you can't get in easily.

*"Just plug a serial cable into the GPIO header."* **No**, [ogra](https://launchpad.net/~ogra), I can hear you saying that to me now. No.

## Add a network

I decided it would be fine to plug this old thing onto my network. Once booted, the login screen appears, and I could try and get in over ssh.

[![IP](/blog/images/2023-10-01/ip.png)](/blog/images/2023-10-01/ip.png)

I pointed my browser at that IP address and after a short while, got a certificate error. This box hasn't been booted for years, so I am not surprised by this. I skip past this and get to a new (to me) error from NextCloud.

[![NextCloud error](/blog/images/2023-10-01/nextclouderror.jpg)](/blog/images/2023-10-01/nextclouderror.jpg)

The IP address it got was in the range of my home network `192.168.0.0/24`, but the sticker on the box shows `192.168.1.83` which is an old address range I no longer use. This became a bit of a problem.

## Take stock

So, where are we now?

* I can't get into NextCloud to view the data
* I can't login from the console to view files
* I can't SSH in, to remotely get to the files.

I decide that if I am to progress, getting into the filesystem over SSH would be best, as I can manage the device remotely, and look around the filesystem easily in a terminal.

## Fix missing key

The box has likely got an old SSH key referenced in the `/home/popey/.ssh/authorized_keys` file on the device. So old (from 2016-2017) that I no longer have the private half of that key to get in. So my solution is to take the SD card out of the Pi, mount it on my laptop, then edit `/home/popey/.ssh/authorized_keys` to add my public key.

So I triggered a reboot with CTRL+ALT+Delete on the attached USB keyboard, then pulled the power out as the Pi was about to start. I then yanked out the SD card - remembering that the Pi 2 had one of those nice spring-loaded micro SD slots I miss.

As soon as the card was in a reader on my laptop, GNOME auto-mounted it. There's one main partition on this Ubuntu Core system, called `writable` which has two folders inside, called `system-data` and `user-data`. They were mounted under `/media/alan/writable`.

I found the `authorized_keys` file in `/media/alan/writable/user-data/popey/.ssh`, and simply added a line for my laptop's SSH key.

## While we're here

While I had the filesystem mounted, i figured I would fix the trusted domain, and IP address for NextCloud.

Buried in `/media/alan/writable/system-data/var/snap/nextcloud/current/nextcloud/config` (so effectively `/var/snap/nextcloud/current/nextcloud/config` on the device), there was the `config.php` I needed to edit.

I found the `trusted_domains` section:

```php
  'trusted_domains' => 
  array (
    0 => '192.168.1.83',
    1 => 'nextcloud.popey.com',
  ),
```

Interesting that at some point I must have thought this box was worthy of a subdomain. Whether this was in action at any point is hard for me to recall at this time. I have a vague memory of using the nextcloud photo upload thing, which may have sent photos to this nextcloud box. We shall see.

Anyway, I changed the trusted_domains to include the new IP the box acquired.

```php
  'trusted_domains' => 
  array (
    0 => '192.168.1.83',
    1 => 'nextcloud.popey.com',
    2 => '192.168.0.112',
  ),
```

I also noted nearby, another setting which had the old IP. Time to change that too...

```php
  'overwrite.cli.url' => 'http://192.168.1.83',
```

```php
  'overwrite.cli.url' => 'http://192.168.0.112',
```


I then unmounted `umount /media/alan/writable /media/alan/system-boot` and popped the SD card back in the nextcloud box and booted it up again..

## NextCloud Admin

Once it booted again, I pointed a browser at the home page IP address and, success...

[![NextCloud login](/blog/images/2023-10-01/nextcloudlogin.png)](/blog/images/2023-10-01/nextcloudlogin.png)

Now I just need to remember my username as password.... Wait, it's in my password manager!

We're in!

[![NextCloud logged in](/blog/images/2023-10-01/nextcloudloggedin.png)](/blog/images/2023-10-01/nextcloudloggedin.png)

From here I could very, very slowly access the Photos in via the web UI. By "slowly" I actually mean "painfully slowly". The Pi2 really wasn't a great machine for NextCloud. 

Indeed after a very short time the web user interface became completely unresponsive. There was no way I would be able to get the pictures out of the system via the web UI. 

So SSH it is...

## SSH access

I should also be able to ssh in now I've dropped my key on there.

[![SSH success](/blog/images/2023-10-01/sshin.png)](/blog/images/2023-10-01/sshin.png)

`Welcome to Ubuntu Core 16`

[![Obi](/blog/images/2023-10-01/obi-wan-star-wars.gif)](/blog/images/2023-10-01/obi-wan-star-wars.gif)

Ooh! I haven't been here in a while...

`Last login: Thu Jun 15 09:18:14 2017 from 192.168.1.94`

That sounds about right!

Looks like we're on an ancient version of snap

```bash
popey@localhost:~$ snap version
snap    2.24
snapd   2.24
series  16
kernel  4.4.0-1030-raspi2
```

This thing has some super crusty snaps on it.

```bash
popey@localhost:~$ snap changes
ID   Status  Spawn                 Ready                 Summary
404  Done    2017-06-15T09:18:23Z  2017-06-15T09:18:23Z  Refresh all snaps: no updates
```

```bash
popey@localhost:~$ snap list
Name        Version       Rev   Developer  Notes
classic     16.04         17    canonical  devmode
core        16-2          1690  canonical  -
emoj        0.3.0         2     popey      -
nextcloud   11.0.3snap4   1542  nextcloud  -
pi2         16.04-0.17    29    canonical  -
pi2-kernel  4.4.0-1030-3  22    canonical  -
```

I find it amusing to see [emoj](https://snapcraft.io/emoj) on there. It's a command-line emoji search utility. I used to use it to test stuff. I can't imagine wanting to ssh into a Raspberry Pi 2, just to run a command to print a horse emoji.

```bash
alan@ziggy:~$ emoj horse
🐴  🐎  🏇  🎠
```

I actually updated the [emoj snap](https://snapcraft.io/emoj) quite recently, after a hiatus of it being broken. 

But we're getting distracted again!

## Get the data

Anyway, what I actually came for is the data - specifically the photos. A quick rummage shows that my user data is located on the 1TB hard disk under `/media/data/alan` - `alan` is my username on this NextCloud instance.

```bash
popey@localhost:~$ find /media/data/alan/ -type d
/media/data/alan/
/media/data/alan/Videos
/media/data/alan/Photos
/media/data/alan/Photos/2016
/media/data/alan/Photos/2016/12
/media/data/alan/Photos/2017
/media/data/alan/Photos/2017/06
/media/data/alan/Photos/2017/01
popey@localhost:~$ du -hs /media/data/alan/
744M	/media/data/alan/
```

Huh, not much there, but I'll grab it anyway. 

Back on my laptop, I thought I'd rsync the files over, but sadly Ubuntu Core 16 didn't ship with the `rsync` binary.

```bash
alan@ziggy:~/NextCloudBoxData$ rsync -avz popey@192.168.0.112:/media/data/alan .
bash: rsync: command not found
rsync: connection unexpectedly closed (0 bytes received so far) [Receiver]
rsync error: error in rsync protocol data stream (code 12) at io.c(231) [Receiver=3.2.7]
```

Ok! scp it is!

```bash
alan@ziggy:~/NextCloudBoxData$ time scp -rq popey@192.168.0.112:/media/data/alan .

real	2m5.615s
user	0m3.448s
sys	0m6.413s
alan@ziggy:~/NextCloudBoxData$ du -hs .
744M	.
```

Great success! 

Although having looked through the photographs, there's not a lot that's interesting. I'll leave you with this photograph of a lightsaber I made out of a cardboard tube back in 2016.

[![Lightsaber](/blog/images/2023-10-01/lightsaber.jpg)](/blog/images/2023-10-01/lightsaber.jpg)

Make your lightsaber noises NOW!

## Conclusion

I really should have just pulled the drive out, and slapped it in a caddy. That would have been way quicker and significantly less interesting.

I'd really like to get the software running again. But there's something rather unwell with the snap package on this thing. I'll post over on the [forum](https://forum.snapcraft.io/) about it, but suspect the answer will be 'reinstall it'.

What do you think I should do with this NextCloud Box now? Answers below, or wherever you think I'll see them.