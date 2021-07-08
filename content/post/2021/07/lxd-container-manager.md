+++
date = "2021-07-08T11:00:00-00:00"
title = "LXD - Container Manager"
slug = "2021/07/lxd-container-manager"
author = "Alan Pope"
tags = ['software', 'lxd', 'linux', 'containers']
+++

## Preamble

I recently started working for [InfluxData](https://www.influxdata.com/) as a Developer Advocate on [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/), an open source server agent to collect metrics. Telegraf builds from [source](https://github.com/influxdata/telegraf/) to [ship](https://github.com/influxdata/telegraf/releases) as a single Go binary. The latest - 1.19.1 was [released](https://github.com/influxdata/telegraf/releases/tag/v1.19.1) just yesterday.

Part of my job involves helping users by reproducing reported [issues](https://github.com/influxdata/telegraf/issues), and assisting developers by testing their [pull requests](https://github.com/influxdata/telegraf/pulls). It's fun stuff, I love it. Telegraf has an extensive set of [plugins](https://docs.influxdata.com/telegraf/v1.19/plugins/) which supports gathering, aggregating & processing metrics, and sending the results to other systems. 

Telegraf has a huge set of plugins, and there's super-diverse ways our users deploy Telegraf, sometimes I have to stand up one-off environments to reproduce reported issues. So I thought I'd write up the basics of what I do, partly for me, and partly for my co-workers who also sometimes need to do this. 

My personal and work computers both run Kubuntu 21.04. Sometimes issues are reported against Telegraf on other Linux distributions, or LTS releases of Ubuntu. In the past I'd use either VirtualBox or QEMU to create entire Virtual Machines for each Linux distribution or product I'm working with. Both can be slow to stand up clean machines, and take a fair chunk of disk space.

These days I prefer to use [LXD](https://linuxcontainers.org/lxd/introduction/). LXD is a system container manager, whose development is funded and led by [Canonical](https://canonical.com/), my previous employer. It's super lightweight, easy to use and fast to setup. So it's the tool I reach for most for these use cases.

Note that LXD can also launch [Virtual Machines](https://discuss.linuxcontainers.org/t/running-virtual-machines-with-lxd-4-0/7519) but I tend not to use that feature, preferring lightweight containers.

## Setup

### Install snapd

LXD is shipped as a snap for Linux, so snap support is required. On my Kubuntu system it's already installed. If not, the [Installing snapd](https://snapcraft.io/docs/installing-snapd) documentation should get you going. Typically that just means finding the `snapd` package in your distro repository and installing it.

It's also possible to install LXD from source, but that's too much like hard work for me. The LXD [Getting Started](https://linuxcontainers.org/lxd/docs/master/) docs cover all of the above in detail. 

On Windows there's a LXD client package in [Chocolatey](https://chocolatey.org/packages/lxc) and on MacOS it's is available in [Homebrew](https://formulae.brew.sh/formula/lxc) - but I've never tested those.

### Install LXD

The [LXD Snap Store](https://snapcraft.io/lxd) page has all the details about the snap and how to install, but here's the basics.

Installing LXD has multiple supported releases. I just use whatever the default, latest stable release is using this command:

```bash
$ sudo snap install lxd
```

Snaps by default will automatically update, so if the LXD publisher pushes a brand new major version to the latest/stable track/channel then you'll get that update next time your system refreshes. However, it's possible to request a specific 'track', to keep your machine on one major release. That can be done by specifying the track/channel on install. For example:

```bash
$ sudo snap install lxd --channel=4.15/stable
```

Use `snap info lxd` to get the full list of channels. As mentioned, personally I just use the default latest/stable track.

### Initial configuration

LXD has a bunch of options to twiddle on install, but I tend to use the defaults. It sets up some space for storing the containers, and configures a network bridge interface between the host and the containers. To configure LXD, run the following and follow the prompt:

```bash
$ sudo lxd init
```

Personally, as I accept the defaults these days, I use the `--auto` switch.

```bash
$ sudo lxd init --auto
```

Next up, logout and back in, and make sure your user is in the `lxd` group.

```bash
$ groups 
alan adm cdrom sudo dip plugdev lpadmin lxd sambashare
```

That's basically it. You can test that it's setup correctly by launching a container. The last parameter is the friendly name you give the container.

```bash
$ lxc launch ubuntu:18.04 testcontainer
Creating testcontainer
Starting testcontainer       
```

```bash
$ lxc list testcontainer
+---------------+---------+----------------------+----------------------------------------------+-----------+-----------+
|     NAME      |  STATE  |         IPV4         |                     IPV6                     |   TYPE    | SNAPSHOTS |
+---------------+---------+----------------------+----------------------------------------------+-----------+-----------+
| testcontainer | RUNNING | 10.55.242.139 (eth0) | fd42:dd92:7d3c:7de7:216:3eff:fe0c:a98 (eth0) | CONTAINER | 0         |
+---------------+---------+----------------------+----------------------------------------------+-----------+-----------+
```

## In use

### Launch

In my case I often launch LTS Ubuntu containers. However, there are base images for many other Linux distributions.

So for example to spin up a Fedora 34 image I'd use:

```bash
$ lxc launch images:fedora/34 fedora34
Creating fedora34
Starting fedora34
```

You can search for images from the command line too, and optionally filter based on distro and architecture.

```bash
$ lxc image list images: fedora amd64
+--------------------------+--------------+--------+----------------------------------+--------------+-----------------+----------+------------------------------+
|          ALIAS           | FINGERPRINT  | PUBLIC |           DESCRIPTION            | ARCHITECTURE |      TYPE       |   SIZE   |         UPLOAD DATE          |
+--------------------------+--------------+--------+----------------------------------+--------------+-----------------+----------+------------------------------+
| fedora/33 (3 more)       | a013a473bef8 | yes    | Fedora 33 amd64 (20210707_20:33) | x86_64       | CONTAINER       | 96.12MB  | Jul 7, 2021 at 12:00am (UTC) |
+--------------------------+--------------+--------+----------------------------------+--------------+-----------------+----------+------------------------------+
| fedora/33 (3 more)       | da42bb5122b9 | yes    | Fedora 33 amd64 (20210707_20:33) | x86_64       | VIRTUAL-MACHINE | 628.38MB | Jul 7, 2021 at 12:00am (UTC) |
+--------------------------+--------------+--------+----------------------------------+--------------+-----------------+----------+------------------------------+
| fedora/33/cloud (1 more) | 9f1fb6c3286f | yes    | Fedora 33 amd64 (20210707_20:33) | x86_64       | CONTAINER       | 113.02MB | Jul 7, 2021 at 12:00am (UTC) |
+--------------------------+--------------+--------+----------------------------------+--------------+-----------------+----------+------------------------------+
| fedora/33/cloud (1 more) | b04e9066a00e | yes    | Fedora 33 amd64 (20210707_20:33) | x86_64       | VIRTUAL-MACHINE | 626.81MB | Jul 7, 2021 at 12:00am (UTC) |
+--------------------------+--------------+--------+----------------------------------+--------------+-----------------+----------+------------------------------+
| fedora/34 (3 more)       | 7856e578e7a1 | yes    | Fedora 34 amd64 (20210707_20:33) | x86_64       | CONTAINER       | 97.20MB  | Jul 7, 2021 at 12:00am (UTC) |
+--------------------------+--------------+--------+----------------------------------+--------------+-----------------+----------+------------------------------+
| fedora/34 (3 more)       | dd03395d4eca | yes    | Fedora 34 amd64 (20210707_20:33) | x86_64       | VIRTUAL-MACHINE | 564.31MB | Jul 7, 2021 at 12:00am (UTC) |
+--------------------------+--------------+--------+----------------------------------+--------------+-----------------+----------+------------------------------+
| fedora/34/cloud (1 more) | 43b84c5fa2e8 | yes    | Fedora 34 amd64 (20210707_20:33) | x86_64       | VIRTUAL-MACHINE | 570.00MB | Jul 7, 2021 at 12:00am (UTC) |
+--------------------------+--------------+--------+----------------------------------+--------------+-----------------+----------+------------------------------+
| fedora/34/cloud (1 more) | 90951791da81 | yes    | Fedora 34 amd64 (20210707_20:33) | x86_64       | CONTAINER       | 115.11MB | Jul 7, 2021 at 12:00am (UTC) |
+--------------------------+--------------+--------+----------------------------------+--------------+-----------------+----------+------------------------------+
```

The first time you launch a new container it will take a little while to download the base image for whatever version you specify. You can see which images you've already downloaded with `lxc image list`

```bash
$ lxc image list
+-------+--------------+--------+---------------------------------------------+--------------+-----------+----------+------------------------------+
| ALIAS | FINGERPRINT  | PUBLIC |                 DESCRIPTION                 | ARCHITECTURE |   TYPE    |   SIZE   |         UPLOAD DATE          |
+-------+--------------+--------+---------------------------------------------+--------------+-----------+----------+------------------------------+
|       | 66f2b020b296 | no     | Debian sid amd64 (20210708_05:24)           | x86_64       | CONTAINER | 79.94MB  | Jul 8, 2021 at 7:31am (UTC)  |
+-------+--------------+--------+---------------------------------------------+--------------+-----------+----------+------------------------------+
|       | 682b2f9adae4 | no     | ubuntu 18.04 LTS amd64 (release) (20210604) | x86_64       | CONTAINER | 192.13MB | Jul 8, 2021 at 12:12pm (UTC) |
+-------+--------------+--------+---------------------------------------------+--------------+-----------+----------+------------------------------+
|       | 7856e578e7a1 | no     | Fedora 34 amd64 (20210707_20:33)            | x86_64       | CONTAINER | 97.20MB  | Jul 8, 2021 at 1:31am (UTC)  |
+-------+--------------+--------+---------------------------------------------+--------------+-----------+----------+------------------------------+
|       | 68077359fd53 | no     | Debian bullseye amd64 (20210707_05:24)      | x86_64       | CONTAINER | 98.82MB  | Jul 7, 2021 at 1:31pm (UTC)  |
+-------+--------------+--------+---------------------------------------------+--------------+-----------+----------+------------------------------+
```



### Shell access

To jump inside the container, I tend to just use `lxc shell`

```bash
$ lxc shell testcontainer
root@testcontainer:~# cat /etc/os-release 
NAME="Ubuntu"
VERSION="18.04.5 LTS (Bionic Beaver)"
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME="Ubuntu 18.04.5 LTS"
VERSION_ID="18.04"
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
VERSION_CODENAME=bionic
UBUNTU_CODENAME=bionic
```

```bash
$ lxc shell fedora34  
[root@fedora34 ~]# cat /etc/redhat-release 
Fedora release 34 (Thirty Four)
```

Once inside the container if I want to do things as a 'user' and not 'root' then I simply switch to the 'ubuntu' user:

```bash
root@testcontainer:~# su - ubuntu
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

ubuntu@testcontainer:~$ 
```

The container is configured to use `sudo` so, as the `ubuntu` user I can do all the usual things:

```bash
ubuntu@testcontainer:~$ sudo apt update
Hit:1 http://archive.ubuntu.com/ubuntu bionic InRelease
Get:2 http://archive.ubuntu.com/ubuntu bionic-updates InRelease [88.7 kB]                            
Get:3 http://archive.ubuntu.com/ubuntu bionic-backports InRelease [74.6 kB]                                    
Get:4 http://archive.ubuntu.com/ubuntu bionic/universe amd64 Packages [8570 kB]    
Get:5 http://security.ubuntu.com/ubuntu bionic-security InRelease [88.7 kB]        
Get:6 http://security.ubuntu.com/ubuntu bionic-security/main amd64 Packages [1784 kB]
Get:7 http://archive.ubuntu.com/ubuntu bionic/universe Translation-en [4941 kB]
Get:8 http://security.ubuntu.com/ubuntu bionic-security/main Translation-en [329 kB]           
Get:9 http://security.ubuntu.com/ubuntu bionic-security/restricted amd64 Packages [365 kB]            
Get:10 http://archive.ubuntu.com/ubuntu bionic/multiverse amd64 Packages [151 kB]               
Get:11 http://security.ubuntu.com/ubuntu bionic-security/restricted Translation-en [48.9 kB]
Get:12 http://security.ubuntu.com/ubuntu bionic-security/universe amd64 Packages [1130 kB]       
Get:13 http://archive.ubuntu.com/ubuntu bionic/multiverse Translation-en [108 kB]           
Get:14 http://archive.ubuntu.com/ubuntu bionic-updates/main amd64 Packages [2131 kB]            
Get:15 http://security.ubuntu.com/ubuntu bionic-security/universe Translation-en [256 kB]  
Get:16 http://security.ubuntu.com/ubuntu bionic-security/multiverse amd64 Packages [19.2 kB]     
Get:17 http://security.ubuntu.com/ubuntu bionic-security/multiverse Translation-en [4412 B]  
Get:18 http://archive.ubuntu.com/ubuntu bionic-updates/main Translation-en [422 kB]
Get:19 http://archive.ubuntu.com/ubuntu bionic-updates/restricted amd64 Packages [389 kB]
Get:20 http://archive.ubuntu.com/ubuntu bionic-updates/restricted Translation-en [52.8 kB]
Get:21 http://archive.ubuntu.com/ubuntu bionic-updates/universe amd64 Packages [1739 kB]
Get:22 http://archive.ubuntu.com/ubuntu bionic-updates/universe Translation-en [371 kB]
Get:23 http://archive.ubuntu.com/ubuntu bionic-updates/multiverse amd64 Packages [26.6 kB]
Get:24 http://archive.ubuntu.com/ubuntu bionic-updates/multiverse Translation-en [6792 B]
Get:25 http://archive.ubuntu.com/ubuntu bionic-backports/main amd64 Packages [10.0 kB]
Get:26 http://archive.ubuntu.com/ubuntu bionic-backports/main Translation-en [4764 B]
Get:27 http://archive.ubuntu.com/ubuntu bionic-backports/universe amd64 Packages [10.3 kB]
Get:28 http://archive.ubuntu.com/ubuntu bionic-backports/universe Translation-en [4588 B]
Fetched 23.1 MB in 4s (6506 kB/s)                                
Reading package lists... Done
Building dependency tree       
Reading state information... Done
20 packages can be upgraded. Run 'apt list --upgradable' to see them.
```

At this point I'll use the container for whatever issue-reproduction or pull-request-testing is needed.

### Stopping

The containers will continue running even once you are no longer in the guest shell. They're easy to stop though.

```bash
$ lxc stop testcontainer
```

### Removal

Getting rid of containers is super easy too.

```bash
$ lxc delete testcontainer
```

I tend to leave them lying around until I'm sure I no longer need them. But as they're so fast to stand up and shut down, it's also pretty quick to just nuke them and launch fresh every time I need one.

## Summary

This post just scratches the surface. The [LXD documentation](https://linuxcontainers.org/lxd/docs/master/) is comprehensive and easy to consume. There's an active [LXD Community](https://discuss.linuxcontainers.org/), and it helps that their lead developer - [Stéphane Graber](https://stgraber.org/) is a really engaged, excellent engineer.

I've been a big fan of LXD for some years now. I've found it a super fast, reliable way for me to spin up lightweight machines running random Linux distributions, and throw them away when done. It helps keep all those random and unstable pieces of software I'm testing nicely compartmentalised, and easy to nuke. 

I ❤ LXD.
