+++
date = "2021-03-24T11:00:00-00:00"
title = "GNOME OS 40 without GNOME Boxes"
slug = "2021/03/gnome-os-40-without-gnome-boxes"
author = "Alan Pope"
tags = ['software', 'gnome', 'os', 'vm', 'quickemu']
+++

The [GNOME](https://gnome.org/) team have announced [GNOME 40](https://forty.gnome.org/). Along with this there's a [GNOME OS](https://os.gnome.org/) image to play with. You can grab that from [here](https://os.gnome.org/download/40.0/gnome_os_installer_40.0.iso) with the [release notes](https://help.gnome.org/misc/release-notes/40).

The release announcement firmly (in bold) suggests "**Do not use any other version including the distro version. Only GNOME Boxes 3.38.0 from flathub is known to work.**".

Personally I've never managed to have much success with GNOME Boxes, so I thought I'd test using something I already have installed, QEMU! I have used QEMU for many years. 

Here's a screenshot of me running Windows XP, Windows 2000, NT Server, NT Workstation, Windows 98 and Windows 95, for lulz. This was all running on a Dell Inspiron XPS Gen 2 back in 2005 (15 years ago!). All under `qemu` on Ubuntu. How time flies.

[![Windows](/blog/images/2021-03-24/windows.png)](/blog/images/2021-03-24/windows.png)

More recently I've been using [qemu-virgil](https://snapcraft.io/qemu-virgil) to run virtual machines of all kinds. On top of that Martin Wimpress made a neat wrapper around qemu-virgil called [quickemu](https://github.com/wimpysworld/quickemu).

Here's what I did to run the new GNOME 40 on QEMU on my Ubuntu system.

### Get qemu-virgil

```bash
snap install qemu-virgil --edge
sudo snap connect qemu-virgil:kvm
```

### Get quickemu

```bash
git clone https://github.com/wimpysworld/quickemu
```

### Get GNOME OS 40

```bash
cd quickemu
wget https://os.gnome.org/download/40.0/gnome_os_installer_40.0.iso
```

### Configure quickemu

Create a `gnome40.conf` file containing this.

```
iso="./gnome_os_installer_40.0.iso"
disk_img="./gnome-40.qcow2"
boot="efi"
```
### Launch quickemu

```bash
./quickemu --vm gnome40.conf
```

Something like this will appear in the terminal.

```bash
alan@robot:~/quickemu$ ./quickemu --vm gnome40.conf
Starting gnome40.conf
 - QEMU:     /snap/bin/qemu-virgil v4.2.0
 - BOOT:     EFI
 - Guest:    Linux optimised
 - Disk:     ./gnome-40.qcow2 (64G)
             Just created, booting from ./gnome_os_installer_40.0.iso
 - Boot:     ./gnome_os_installer_40.0.iso
 - CPU:      4 Core(s)
 - RAM:      3G
 - Screen:   1664x936
 - Video:    virtio-vga
 - GL:       ON
 - Virgil3D: ON
 - Display:  SDL
 - smbd:     /home/alan will be exported to the guest via smb://10.0.2.4/qemu
 - ssh:      22227/tcp is connected. Login via 'ssh user@localhost -p 22227'
```

Then a qemu window pops up and GNOME boots. 

[![qemu](/blog/images/2021-03-24/qemu.png)](/blog/images/2021-03-24/qemu.png)

### Install GNOME 40

Wait a few seconds and...

[![GNOME installer](/blog/images/2021-03-24/gnomeinstaller.png)](/blog/images/2021-03-24/gnomeinstaller.png)

Choose the disk to install onto...

[![Choose disk](/blog/images/2021-03-24/choosedisk.png)](/blog/images/2021-03-24/choosedisk.png)

Time passess...

[![Installing](/blog/images/2021-03-24/installing.png)](/blog/images/2021-03-24/installing.png)

Great success...

[![Success](/blog/images/2021-03-24/success.png)](/blog/images/2021-03-24/success.png)

### Try out GNOME 40

Restart the VM

```bash
alan@robot:~/quickemu$ ./quickemu --vm gnome40.conf
```

Run through the initial setup wizard.

[![Firstrun 1](/blog/images/2021-03-24/firstrun1.png)](/blog/images/2021-03-24/firstrun1.png)

[![Firstrun 2](/blog/images/2021-03-24/firstrun2.png)](/blog/images/2021-03-24/firstrun2.png)

[![Firstrun 3](/blog/images/2021-03-24/firstrun3.png)](/blog/images/2021-03-24/firstrun3.png)

[![Firstrun 4](/blog/images/2021-03-24/firstrun4.png)](/blog/images/2021-03-24/firstrun4.png)

[![Firstrun 5](/blog/images/2021-03-24/firstrun5.png)](/blog/images/2021-03-24/firstrun5.png)

[![Firstrun 6](/blog/images/2021-03-24/firstrun6.png)](/blog/images/2021-03-24/firstrun6.png)

[![Firstrun 7](/blog/images/2021-03-24/firstrun7.png)](/blog/images/2021-03-24/firstrun7.png)

[![Firstrun 8](/blog/images/2021-03-24/firstrun8.png)](/blog/images/2021-03-24/firstrun8.png)

Done!

### Time to play

[![Playtime](/blog/images/2021-03-24/playtime.png)](/blog/images/2021-03-24/playtime.png)


### Conclusion

You don't necessarily need GNOME Boxes from Flathub to try out GNOME 40. Any decent VM system which supports EFI should work fine. 