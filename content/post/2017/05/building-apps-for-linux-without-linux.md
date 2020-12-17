+++
date = "2017-05-17T14:00:00-07:00"
title = "Building Apps for Linux without Linux"
slug = "2017/05/building-apps-for-linux-without-linux"
+++



It's now super easy to build Linux software packages on your Windows laptop. No VM required, no need for remote Linux hosts.

I spend a lot of my day talking to developers about their Linux software packaging woes. Many of them are using Linux desktops as their primary development platform. Some aren't, and that's their (or their employers) choice. For those developers who run Windows and want to target Linux for their applications, things just got a bit easier.

Snapcraft now runs on Windows, via Bash on Windows (a.k.a Windows Subsystem for Linux).

![Snapcraft on Windows](/images/2017-05-16/snapcraft.png)

Microsoft updated their [Windows Subsystem for Linux](https://msdn.microsoft.com/en-gb/commandline/wsl/install_guide) to include Ubuntu 16.04.2 LTS as the default image. When WSL first [launched](http://blog.dustinkirkland.com/2016/03/ubuntu-on-windows.html) a year ago, it shipped 14.04 to early adopters and developers.

Snapcraft is available in the Ubuntu 16.04 [repositories](http://packages.ubuntu.com/snapcraft), so is install-able inside WSL. So developers on Windows can easily run [Snapcraft](http://snapcraft.io/) to package their software as snaps, and push to the store. No need for virtual machines, or separate remote hosts running Linux.

I made a quick video about it [here](https://www.youtube.com/watch?v=7JKavx9Vpzk). Please share it with your Windows-using developer friends :)

<iframe width="560" height="315" src="https://www.youtube.com/embed/7JKavx9Vpzk" frameborder="0" allowfullscreen></iframe>

If you already have WSL setup with Ubuntu 14.04 the easiest way to move to 16.04.2 is to delete the install and start again. This will remove the installed packages and data in your WSL setup, so backup first. Open a command prompt window in Windows and run:-


```
lxrun /uninstall
```

To re-install, which will pull down Ubuntu 16.04.2 LTS:-

```
lxrun /install
```

![Re-installing Ubuntu](/images/2017-05-16/reinstall.png)

Once you've got Ubuntu 16.04.2 LTS in WSL, launch it from the start menu then install snapcraft from the Ubuntu repositories with:-

```
sudo apt install snapcraft
```

Once that's done, you can either launch snapcraft within Bash on Windows, or directly from a Window command prompt shell with ```bash -c snapcraft```. Here's a [video](https://www.youtube.com/watch?v=tuA-FG8-G0s) showing me building the Linux version of storjshare using [this configuration](http://bazaar.launchpad.net/~popey/+junk/storjshare-master/view/head:/snap/snapcraft.yaml) on my Windows 10 desktop from a standard command prompt window. I sped the video up because nobody wants to watch 8 minutes of shell scrolling by in realtime. Also, my desktop is quite slow. :)

<iframe width="560" height="315" src="https://www.youtube.com/embed/tuA-FG8-G0s" frameborder="0" allowfullscreen></iframe>

You can find out more about snapcraft from our [documentation](http://snapcraft.io/docs), [tutorials](http://tutorials.ubuntu.com), and the [videos](http://youtube.com/snapcraftio). We also have a [forum](http://forum.snapcraft.io) where we'd love to hear about your experience with snapcraft.
