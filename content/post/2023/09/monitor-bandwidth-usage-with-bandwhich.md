+++
date = "2023-09-20T09:00:00-00:00"
title = "Monitor bandwidth usage with bandwhich"
slug = "2023/09/monitor-bandwidth-usage-with-bandwhich"
author = "Alan Pope"
tags = ['linux', 'bandwhich', 'network', 'bandwidth', 'snap', 'snapcraft']
+++

Back in 2020 I stumbled on [Bandwhich](https://github.com/imsnif/bandwhich), a "Terminal bandwidth utilization tool", written in Rust.

[![Bandwhich](/blog/images/2023-09-20/demo.gif)](https://github.com/imsnif/bandwhich)

More recently, I was looking for a tool to identify which processes on a box were using bandwidth, and how much. I remembered Bandwhich and took another look. I wanted an easy way to install Bandwhich on a variety of machines, running a variety of Linux distributions across different architectures.

So I built a [snap of bandwhich](https://snapcraft.io/bandwhich).

I thought I'd write up what I did in case anyone else wants to build a snap of a rust application. 

The upstream bandwidth developers are currently having a bit of a reorg, after the lead developer no longer has the ... bandwidth ... to maintain the application. If you're a rust developer, and have some time, perhaps you may be able to [contribute](https://github.com/imsnif/bandwhich/issues/275).

## Using bandwhich

If you just want to use bandwhich, then install the [snap of bandwhich](https://snapcraft.io/bandwhich) and run `sudo bandwhich`, no need to continue reading.

If you're interested in how the snap was made, read on.

## Pre-requisites

I'm using my home machine running Ubuntu 23.04 to build the snap and test it out. I'll be using `snapcraft` and `lxd`. Maybe one day I'll use [Incus](https://github.com/lxc/incus), but that's not today.

### Install tools

```bash
$ sudo snap install snapcraft --classic
$ sudo snap install lxd
```

### Setup LXD

This is mostly just 'press enter repeatedly' until it's done. The only deviation from this was saying 'none' when asked about ipv6 bridging. 

```bash
$ sudo lxd init
```

Reboot or logout/in so joining the `lxd` group is done. Or run `newgrp lxd` if you don't want to reboot right now.

### Fix networking

I had a problem where LXD would work, but break once I rebooted. I started a [thread](https://discourse.ubuntu.com/t/lxd-networking-breaking-after-a-reboot/38622?u=popey) on [Ubuntu Discourse](https://discourse.ubuntu.com/), where LXD support happens now. 

I got a prompt answer which was basically 'uninstall docker'. I don't recall why I had docker installed, and was happy to remove it. Never liked docker :D.

## Create snapcraft.yaml

I like to create a new folder to build in, and name the path to be the same as my github username.

```bash
$ mkdir ~/Source/popey/bandwhich-snap/snap
```
The `snapcraft.yaml` is used by the `snapcraft` command to build and package the application. By default it lives in that `snap/` folder.

### Metadata

The initial bones of a `snapcraft.yaml` are pretty straightforward:

```yaml
name: bandwhich                                                   # The snap name as seen in the store
base: core18                                                      # We build in an Ubuntu 18.04 environment
summary: Terminal bandwidth utilization tool
description: 
  This is a CLI utility for displaying current network utilization by process,
  connection and remote IP/hostname
grade: stable
confinement: strict                                               # Will be strictly confined
```

### Parts

There's only one part required here, for the `bandwhich` application itself. I've commented it a bit. It's very simple.

```yaml
adopt-info: bandwhich                                            # Get version info from the bandwhich part

parts:
  bandwhich:                                                     # Only one part needed
    plugin: rust                                                 # snapcraft knows how to build rust applications
    rust-revision: "1.70.0"                                      # bandwhich needs at least this version of rust
    source: https://github.com/imsnif/bandwhich.git              # Where the upstream source lives
    build-packages:	                                             # Requirements to compile bandwhich
    - build-essential
    - cargo
    override-pull: |                                             # After we pull the source, set the package version
      snapcraftctl pull
      snapcraftctl set-version $(git describe --tags --abbrev=0)
```

### Apps

This is how snap exposes the binary inside the snap to the world outside, on the host platform, and defines the resources it needs access to. The documentation for this can be found [here](https://snapcraft.io/docs/supported-interfaces).

* `network` - enables network access
* `network-bind` - operate as a network service
* `network-status` - access the NetworkingStatus service
* `network-control` - change low-level network settings

The first three are automatically connected by policy, when the snap is installed. However `network-control` is not. More on that further down.

```yaml
apps:
  bandwhich:                                                     # The binary name as it's seen by the host
    command: bandwhich                                           # The binary name as it's known inside the snap
    plugs:                                                       # Interfaces connected to allow access
    - network
    - network-bind
    - network-control
    - network-status
```

## Build locally

This builds the snap on the local machine.

```bash
$ snapcraft --use-lxd
```

This spins up a LXD container, then builds the snap inside it. Here's the bottom of the output from that command.

```bash
⋮
   Compiling pnet_transport v0.34.0
   Compiling trust-dns-resolver v0.23.0
    Finished release [optimized] target(s) in 44.12s
  Installing /root/parts/bandwhich/install/bin/bandwhich
   Installed package `bandwhich v0.21.0 (/root/parts/bandwhich/build)` (executable `bandwhich`)
info: This is the version for the rustup toolchain manager, not the rustc compiler.
info: The currently active `rustc` version is `rustc 1.70.0 (90c541806 2023-05-31)`
Staging bandwhich 
+ snapcraftctl stage
Priming bandwhich 
+ snapcraftctl prime
Snapping |     
Snapped bandwhich_v0.21.0.067b798_amd64.snap
```

## Test local build

Once the snap builds, we can test it.

The `--dangerous` tag is needed because the origin of the snap is unknown to `snapd`.

```bash
$ sudo snap install bandwhich_v0.21.0.067b798_amd64.snap --dangerous
bandwhich v0.21.0.067b798 installed
```

I mentioned that some of the interfaces are auto-connected, but `network-control` isn't. As a result, the application fails to start.

```bash
$ sudo bandwhich
Error: 

lo, wlp1s0, lxdbr0, zt44xdmaty: 
    Insufficient permissions to listen on network interface(s). You can work around
    this issue like this:

    * Try running `bandwhich` with `sudo`

    * Build a `setcap(8)` wrapper for `bandwhich` with the following rules:
        `cap_sys_ptrace,cap_dac_read_search,cap_net_raw,cap_net_admin+ep`
```

If we connect the interface, it works.

```bash
$ sudo snap connect bandwhich:network-control 
```

[![Bandwhich](/blog/images/2023-09-20/bandwhich.png)](/blog/images/2023-09-20/bandwhich.png)

## Publish

I created a [repo](https://github.com/popey/bandwhich-snap) and pushed my yaml to it.

In the snapcraft store build page, I hooked up that repo, then the builds started flowing.

[![Builds](/blog/images/2023-09-20/builds.png)](/blog/images/2023-09-20/builds.png)

Testing the store builds was simply a matter of running this on my machines.

```bash
$ sudo snap install bandwhich --edge
```

On my developer workstation I switched from the local build to the store one in a similar fashion.

```bash
$ sudo snap refresh bandwhich --edge --amend
```

## Store request

While it's possible for users to manually connect that interface, it may be preferable to have it auto-connected, like the other interfaces.

So I posted a [request](https://forum.snapcraft.io/t/auto-connection-request-bandwhich-network-control/36742?u=popey) on the [snapcraft forum](https://forum.snapcraft.io/).

There was a short discussion, and the approval was completed in the store around ten days later.

## Release

Once the store team approved the request for autoconnection, I then released the app to the stable channel.

[![Release](/blog/images/2023-09-20/release.png)](/blog/images/2023-09-20/release.png)

All done!

Now you can visit the [bandwhich store page](https://snapcraft.io/bandwhich) or just `snap install bandwhich` if you have `snapd` already.

There's currently six users of the Bandwhich snap - probably mostly me! Maybe this blog might change that!

[![Metrics](/blog/images/2023-09-20/metrics.png)](/blog/images/2023-09-20/metrics.png)

Enjoy.



