+++
date = "2021-03-04T11:00:00-00:00"
title = "Unbreaking Unbootable Ubuntu"
slug = "2021/02/unbreaking-unbootable-ubuntu"
author = "Alan Pope"
tags = ['ubuntu', 'bug', 'luks', 'lvm']
+++

I run Ubuntu Hirsute - the development release which will become 21.04 - on a bunch of systems. It's a trade-off though, getting the latest crack each and every day. Being at the bleeding edge of new packages landing means I can experience brand new shiny bugs on my systems. Bugs like [1915579](https://pad.lv/1915579) which rendered my system unbootable. Nobody wants to see *this* on boot:

![initramfs prompt](/blog/images/2021-03-04/initramfs.png)

I had updated yesterday and clearly *something* went wrong. A colleague filed a [bug](https://pad.lv/1917676) as they'd seen the same thing recently. For them it was their primary machine so they nuked it from orbit. As I experienced the bug on my laptop, a *secondary* machine, I was fine with leaving it alone, in case I could get some debug information from it, or repair it. I confirmed the bug and went to bed, as it was getting late.

I woke to find 'our' bug had been marked as a duplicate of [1915579](https://pad.lv/1915579), along with a bunch of others. So it's clear other people are affected. There was some [discussion](https://irclogs.ubuntu.com/2021/03/03/%23ubuntu-release.html#t11:13) on IRC about it yesterday as developers worked quickly to undo the breakage before it hit more users.

Most Ubuntu users don't actually run the latest development release, probably a tiny fraction of one percent in total.  A bunch of us Canonical people do, [clearly](/blog/2021/02/dont-use-proposed/), and many community contributors and QA people do too. But it's not really a good idea in general to run a production machine on a development release of Ubuntu. We are where we are though.

The bug came about because (for some reason) the `/usr/share/initramfs-tools/hooks/lvm2` binary ended up not being executable. That's a problem when you have `LUKS` full disk encrypted drive which leverages [LVM](https://en.wikipedia.org/wiki/Logical_Volume_Manager_(Linux)). Thankfully a few helpful people contributed across the various duplicate bugs to provide instructions on how to fix the problem on an unbootable system. So here's what I did.

* On my primary machine, grab a supported Ubuntu Desktop [ISO](http://releases.ubuntu.com/20.10/) and chuck it on a USB stick with `ddrescue -d -D --force ubuntu-20.10-desktop-amd64.iso /dev/sda` (where `/dev/sda` is my empty USB key)
* Boot the broken system to the live environment on the USB key
* Make sure the system is attched to power, I don't want to be faffing round with boot stuff and the power go out
* Connect to the WiFi so I can read the instructions on [1915579](https://pad.lv/1915579)
* Open a terminal, and run the following commands

```bash
sudo -i
cryptsetup luksOpen /dev/sda3 sda3_crypt  # enter encryption passphrase when prompted
vgscan && vgchange -ay vgubuntu           # activate the lvm volume group
mount /dev/vgubuntu/root /mnt             # mount the root partition
mount /dev/sda2 /mnt/boot                 # mount the /boot partition
mount --bind /dev /mnt/dev                # bind mount directories needed to chroot in
mount --bind /sys /mnt/sys
mount --bind /proc /mnt/proc
cp /etc/resolv.conf /mnt/etc              # copy in the resolver config (needed this for DNS) 
                                          # to the mounted fs
chroot /mnt                               # chroot into the mounted filesystem, to fix it
chmod 755 /usr/share/initramfs-tools/hooks/lvm2 # fix the issue by making lvm2 executable
update-initramfs -u                       # rebuild the initramfs
^d                                        # exit the chroot
reboot                                    # cross fingers, pray, sacrifice a chicken etc
```

🤞

[![Phew!](/blog/images/2021-03-04/phew.png)](/blog/images/2021-03-04/phew.png)

Success! 🎉

I'm not sure what checks need to be put in place to prevent this kind of thing happening again, because it **really** *sucks* to dump people at `(initramfs)` on boot - even if it is on a *development* release. We need to do better here!