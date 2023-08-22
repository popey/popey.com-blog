+++
date = "2021-02-18T12:00:00-00:00"
title = "Spotty Connection"
slug = "2021/02/spotty-connection"
author = "Alan Pope"
tags = ['software', 'spot', 'snap', 'linux']
+++

I had a few days off work this week. It was very enjoyable to spend a bit *more* time with the family, doing some jobs around the house, going for walks, and generally nothing else, thanks to `The Event`. 

However, in the quiet moments I still find myself browsing around, stumbling on new software I know will be enjoyed by my friends on Linux, and feel compelled to package it up, as a snap. This time around I found a [post](https://www.reddit.com/r/gnome/comments/lkjg8o/some_progress_on_my_rustgtk_spotify_client/) on [/r/gnome](https://www.reddit.com/r/gnome/) about "[Spot](https://github.com/xou816/spot)" a Gtk/Rust Spotify client. 

[![/r/gnome](/blog/images/2021-02-18/reddit.png)](https://www.reddit.com/r/gnome/comments/lkjg8o/some_progress_on_my_rustgtk_spotify_client/)

It ticks some boxes for me:

   * Rust apps are easy to snap ✅
   * GNOME applications fit with my [desktop](https://ubuntu.com/) ✅
   * Not Electron (nothing against electron, but [y'know](https://twitter.com/popey/status/793399003463516160)) ✅
   * Spotify ✅
   * Leaner than the official client ✅
   * Not currently snapped ✅

So obviously I took a look at snapping it. It wasn't super challenging, having snapped a bunch of Rust and GNOME applications already. I won't go through the full `snapcraft.yaml` in detail because I've gone through them [before](/blog/2020/12/snap-along-with-me/), and there's only a few interesting differences here. Here's the full `yaml` though.

```yaml
name: spot
base: core20 # the base snap is the execution environment for this snap
adopt-info: spot
summary: Gtk/Rust native Spotify client for the Gnome desktop.
description: |
  Gtk/Rust native Spotify client for the Gnome desktop.

architectures:
  - build-on: amd64
  - build-on: arm64

grade: stable
confinement: strict

parts:
  spot:
    plugin: rust
    source: https://github.com/xou816/spot.git
    override-pull: |
      snapcraftctl pull
      snapcraftctl set-version "$(git describe --tag)"
    build-packages:
      - build-essential
      - pkg-config
      - meson
      - cargo
      - libssl-dev
      - libglib2.0-dev-bin
      - libgtk-3-dev
      - libasound2-dev
      - libpulse-dev
    override-build: |
      meson target -Dbuildtype=release -Doffline=false
      ninja -C target
      mkdir $SNAPCRAFT_PART_INSTALL/bin
      mkdir -p $SNAPCRAFT_PART_INSTALL/share/spot
      cp target/target/debug/spot $SNAPCRAFT_PART_INSTALL/bin
      cp target/src/spot.gresource $SNAPCRAFT_PART_INSTALL/share/spot

layout:
  /usr/local/share/spot/spot.gresource:
    symlink: $SNAP/share/spot/spot.gresource

slots:
  spot:
    interface: dbus
    bus: session
    name: dev.alextren.Spot
  spot-mpris:
    interface: mpris
    name: Spot

apps:
  spot:
    command: bin/spot
    extensions: [gnome-3-38]
    common-id: dev.alextren.Spot
    plugs:
      - audio-playback
      - network
      - x11
      - opengl
      - desktop
      - desktop-legacy
      - password-manager-service

```

A couple of interesting things to note though. I'm using the `gnome-3-38` extension which is currently *experimental* which means I can't use the automated build service right now. So I'm building this in an empty container on my laptop and publishing directly to the store. Once [Launchpad](https://launchpad.net/) is able to handle this extension, it'll build there. So that means the application isn't updated in lock step with the upstream repo, currently.

Also maybe of interest is the `layout` section I am using. Thanks to Ken from the Ubuntu Desktop Team for suggesting this. I'm using this because Spot looks for a `gresource` file in a location outside the scope of the contained snap. Layouts do some magic voodoo to remap at runtime to make the application think files are where they aren't. 

Once the snap was built, I requested the name `spot` from the store. Typically as a publisher I would just `snapcraft register spot` but on this occasion the name had already been taken by someone who had never published a snap. So I filed a dispute with the store team, who 'ruled' in my favour and handed me the snap name. It doesn't always go like that, so sometimes you need to contact the original registrant and have a conversation to cleanly hand over the name, or work to collaborate on the application, if applicable.

I filed the dispute at 17:32 on Tuesday 16th and was granted the name by the security team by 17:33, which is quick by any measure. After playing with the application for about 20 minutes or so, I decided to mention the snap online.

{{< rawhtml >}}
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Having a play with Spot, a GTK spotify client. Early days, so it&#39;s a bit unstable, but pretty well done so far. <a href="https://t.co/Rp8zrO1aim">https://t.co/Rp8zrO1aim</a> <a href="https://t.co/ObslcfOUDN">pic.twitter.com/ObslcfOUDN</a></p>&mdash; Alan Pope 🍺🐧🐱🇬🇧🇪🇺 (@popey) <a href="https://twitter.com/popey/status/1361736845789396992?ref_src=twsrc%5Etfw">February 16, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
{{< /rawhtml >}}

By this point the snap was still on my hard disk and not uploaded to the store. I fiddled with the snap a little and on Wednesday I tried uploading to the store, knowing it would fail. It uses a couple of features which require an initial manual review. Specifically the use of the dbus name `dev.alextren.Spot` and access to the `mpris` interface to enable media controls.

I knew this because I run the same `review-tools` against the snap before uploading. So I filed a [request](https://forum.snapcraft.io/t/requests-for-spot-snap/22812) on the snapcraft forum around lunchtime, asking the security team to allow my snap to use those features. 

Pretty soon after the requests were granted. While this was happening Joey at OMGUbuntu [wrote](https://www.omgubuntu.co.uk/2021/02/spot-gtk-spotify-client-for-linux) about the application after seeing my tweet above. I do like packaging *zeitgeisty* applications! 

The security team allowed my use of the dbus name and mpris, which enabled my uploads to be published. So I released a build to the `edge` channel and continued iterating and testing. I kept the build in the `edge` channel for now, until the upstream does a stable release.  

The Spotify developers don't have an arm build of the official application, so Raspberry Pi users can either use the web or [ncspot](/blog/2020/12/spotify-on-the-raspberry-pi-400/). While ncspot is awesome, some people prefer a graphical interface to their music. So I figured I'd try building an arm64 version of Spot. I did this directly on my Raspberry Pi 400, and then uploaded to the store, again to the `edge` channel. The tweet below shows the application running on my Pi.

{{< rawhtml >}}
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Added an arm64 build of Spot (Open Source Gtk Spotify app) to the Snap Store. Runs okay on my Raspberry Pi here. <a href="https://t.co/NXq7xqlKo2">https://t.co/NXq7xqlKo2</a> <a href="https://t.co/0VrYOJsnI1">https://t.co/0VrYOJsnI1</a> <a href="https://t.co/7yIEwQ2gD2">pic.twitter.com/7yIEwQ2gD2</a></p>&mdash; Alan Pope 🍺🐧🐱🇬🇧🇪🇺 (@popey) <a href="https://twitter.com/popey/status/1362401613151948801?ref_src=twsrc%5Etfw">February 18, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
{{< /rawhtml >}}

I'll likely automate these builds. They're Rust, so they take a while to run on any platform. I want to make sure the snap is kept up to date with the upstream development as much as possible. It's really great to see someone working on a native way to access Spotify on the GNOME desktop. So I'm really happy to help shine a light on this application. 

Grab a copy for your desktop, laptop or Raspberry Pi at the link below. It's only 6MB!

{{< rawhtml >}}
<iframe src="https://snapcraft.io/spot/embedded?button=black&channels=true&summary=true&screenshot=true" frameborder="0" width="100%" height="640px" style="border: 1px solid #CCC; border-radius: 2px;"></iframe>
{{< /rawhtml >}}