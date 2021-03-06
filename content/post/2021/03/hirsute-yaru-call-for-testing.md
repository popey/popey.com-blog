+++
date = "2021-03-06T12:00:00-00:00"
title = "Hirsute Yaru Call for Testing"
slug = "2021/03/hirsute-yaru-call-for-testing"
author = "Alan Pope"
tags = ['ubuntu', 'theme', 'yaru', 'hirsute']
+++

Ubuntu [Hirsute](https://launchpad.net/ubuntu/hirsute) - the development release which will become 21.04 [enters](https://discourse.ubuntu.com/t/hirsute-hippo-release-schedule/18539) [User Interface Freeze](https://wiki.ubuntu.com/UserInterfaceFreeze) on March 18th! That's less than a fortnight away!

![Freakout](/blog/images/2021-03-06/freakout.gif)

However, with two weekends and plenty of evenings between now and then, its a great time to start testing the Yaru theme we ship in Ubuntu by default. The Yaru team have been busy and provided this short list of some of the main changes since the last release.


  * Default dark shell
  * Darker dark theme in GTK and shell
  * Flatter, more vibrant coloured control elements, especially in the dark theme


The Yaru team is mostly comprised of community contributors who volunteer their time and skills to bring us a beautiful experience. But it needs testing by a wider audience!

## Get Ubuntu Hirsute

Grab the desktop ISO from [cdimage](http://cdimage.ubuntu.com/ubuntu/daily-live/current/) - [hirsute-desktop-amd64.iso](http://cdimage.ubuntu.com/ubuntu/daily-live/current/hirsute-desktop-amd64.iso) specifically.

## Install Hirsute

If you're fortunate to have a *spare* computer on which you can install Ubuntu Hirsute, that's super helpful. If not, grab some Virtual Machine (VM) software and run it in that.

We have a [tutorial](https://ubuntu.com/tutorials/install-ubuntu-desktop#1-overview) for installing Ubuntu which should be sufficient to help here.

## Get Yaru 

While the daily image will contain an up-to-date build of the Yaru theme, you probably should try the very latest directly from GitHub. Here's the instructions needed, which should be run on Ubuntu Hirsute on bare metal, or in the VM.

```bash
sudo apt install libgtk-3-dev git meson sassc
git clone https://github.com/ubuntu/yaru.git
cd  yaru
meson build
cd  build
sudo ninja install
```

Logout & back in or reboot the machine or VM to make sure all the changes take effect.

## Get Testing

At this point you should start poking around the system. Especially focus on the default system user interfaces, dialogs and experience. Use it as you would any normal install too. Try the default applications, and install your favourite additional ones too. 

If you find any theme-specific issues, jump on the Yaru team GitHub [issue tracker](https://github.com/ubuntu/yaru/issues). They may already be filed, and if not, get reporting!
