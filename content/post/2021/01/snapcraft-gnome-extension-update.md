+++
date = "2021-01-26T12:00:00-00:00"
title = "Snapcraft GNOME Extension Update"
slug = "2021/01/snapcraft-gnome-extension-update"
author = "Alan Pope"
tags = ['linux', 'snapcraft', 'snap', 'gnome']
+++

This is an early PSA aimed at developers who publish snaps in the Snap Store. They can probably skip this preamble, but for anyone else here's some backstory in case you're ~~bored~~ interested.

## Preamble 

[Snaps](https://snapcraft.io/) are confined software packages for Linux. They were originally designed / intended for IoT use cases so are optimised for size, bundling dependencies, are compressed on disk and auto update. They can also be used to package server software, like [NextCloud](https://snapcraft.io/nextcloud), and desktop software like [Signal Desktop](https://snapcraft.io/signal-desktop). There's millions of desktops, routers, servers and other interesting devices with snaps installed.

There's a bunch of common components that snap publishers started bundling in their snaps which bloated them out a bit. Snaps have had (for some time) a concept of "shared content" such that one snap may consume assets from another snap. The reason we use the hand-wavy term "assets" and "content" is because while it could be binary programs and libraries which are shared between snaps, it's not just limited to that. A theme or bundle of themes can be shared too.

A few content snaps were created which could be used by snap publishers, to offload re-usable common components to another well-maintained package. One example, the GNOME Calculator (`gnome-calculator`) snap connects to and consumes a bunch of libraries from the GNOME Platform (`gnome-3-34-1804`) snap. Note the name of the platform snap indicates the project, version and release of Ubuntu it was built on, so GNOME 3.34 on Ubuntu 18.04. As a result the GNOME Calculator is 2MB on disk. 

These content snaps are very useful, and a bunch of publishers leveraged them to reduce their build time, snap size, security attack surface, startup time and up/download duration. While great, the downside is there's a bunch of common boilerplate required in the `snapcraft.yaml` to make it all work. A simple typo or omission would break the build or resulting snap, which is frustrating.

So a while back the snapcraft developers worked with the Ubuntu Desktop Team and Snap Team to develop a concept of "extensions". An extension is code in snapcraft which expresses all the necessary pieces to enable the above behaviour while removing the potential errors. Put simply, you add one line to your `snapcraft.yaml` rather than 20, and `snapcraft` does the rest.

Let's look at an example snippet, GNOME Calculator. The full source is in this [snapcraft.yaml](https://gitlab.gnome.org/GNOME/gnome-calculator/-/blob/master/snap/snapcraft.yaml) on GitLab. Here we can see an extension listed - `gnome-3-34`, and the `base` set to `core18`. 

```
confinement: strict
base: core18

apps:
  gnome-calculator:
    command: usr/bin/gnome-calculator
    extensions: [gnome-3-34]
    plugs:
      - gsettings
      - network
    desktop: usr/share/applications/org.gnome.Calculator.desktop
    common-id: org.gnome.Calculator.desktop
    environment:
      LD_LIBRARY_PATH: $LD_LIBRARY_PATH:$SNAP/lib/gnome-calculator
```

So once built, this snap will consume "content" (GNOME binaries and libraries) from a snap called `gnome-3-34-1804`. You can pull back the curtain and see what the `extensions` expands to with the `snapcraft expand-extensions` command. Let's see what that one line adds in the background at build time:

```
$ diff -y <(cat snap/snapcraft.yaml) <(snapcraft expand-extensions) | wc -l
143
```

Ok, Lots. I've put it [here](/blog/text/2021-01-26/expanded_snapcraft.yaml.diff) if you want to see. In short, it plugs interfaces to common resources that GNOME applications need, connects the necessary paths in this snap to the content snap(s) and sets the environment up so the application feels at home.

Just like the rest of `snapcraft` the code that makes these extensions work is open source, and lives in the [snapcraft github](https://github.com/snapcore/snapcraft/tree/master/extensions/desktop/gnome) if you're interested in seeing how all this works.

Back in the GNOME calculator snap, there's also a bit of a kludge down the bottom of that yaml which does a "cleanup" to ensure there absolutely aren't any duplicated files between the resulting `gnome-calculator` snap and the `gnome-3-34-1804` snap. That's wasteful, and can cause unexpected behaviour if the libraries get loaded from the "wrong" place.

```
  # Find files provided by the base and platform snap and ensure they aren't
  # duplicated in this snap
  cleanup:
    after: [gnome-calculator]
    plugin: nil
    build-snaps: [core18, gtk-common-themes, gnome-3-34-1804]
    override-prime: |
      set -eux
      for snap in "core18" "gtk-common-themes" "gnome-3-34-1804"; do
        cd "/snap/$snap/current" && find . -type f,l -name *.so.* -exec rm -f "$SNAPCRAFT_PRIME/{}" \;
      done
```

## Get to the point

"*Ok, so far so groovy, so what's the update Alan?*"

### The point

Glad you asked! You'll note above the references to `core18` and Ubuntu 18.04 LTS. If you're packaging an application which needs to be built against a newer LTS, this didn't help. The extensions need to be updated for each LTS, and thus each base. There's work going on between Ken from the Ubuntu Desktop Team and Sergio & Chris on the snapcraft side to update the extension. 

It's not completely ready yet, but you (snap publishers) can test drive it. As the extension is (*as I write this*) marked as experimental, you'll need a very new build of `snapcraft`. Here's what you need to do.

### Update snapcraft

Get the latest snapcraft from the edge channel, I used revision 6002 for my tests.

`snap refresh snapcraft --edge`

### Tweak your yaml

Update your snap to use `core20` as the base, and `gnome-3-38` as the extension name. If you're using a cleanup section like the example above, make sure to update references there too, to `core20` and `gnome-3-38-2004`.

Update any `stage-packages` which may have changed between one LTS and the next. You'll soon know which ones have changed when you try and build the snap, and packages aren't found. For example on one snap I had to update `libcurl3` to `libcurl4`. Use something like `apt search` or [https://packages.ubuntu.com/](https://packages.ubuntu.com/) to discover updated package names between releases.

### Build and test

Rebuild your snap, using the super special `--enable-experimental-extensions` option. This will use an Ubuntu 20.04 LTS container or VM in which to build your snap. It'll use the new extension which in turn will use the new GNOME 3.38 based content snap. 

### Examples

Here's [some](https://github.com/snapcrafters/xonotic/pull/8) [examples](https://github.com/snapcrafters/mattermost-desktop/pull/37) I [did](https://github.com/snapcrafters/discord/pull/97) [this](https://github.com/snapcrafters/signal-desktop/pull/50) [morning](https://github.com/snapcrafters/sdlpop/pull/11). 

The diffs are mostly just as I outlined above:

[![Xonotic diff](/blog/images/2021-01-26/diff.png)](https://github.com/snapcrafters/xonotic/pull/8/commits/8fa6ec9b41da5b75abcf080cf9a6ba86537ab47d)

### Danger Will Robinson

**Note:** As this *experimental* feature is only in the `edge` builds of `snapcraft`, you can't easily use this on the launchpad build system. I'm told it should land in a release soon though, and the more people who test it out the better. *nudge* *nudge*, *hint* *hint*

Try out the new extension, install your updated snap and test it out! Report any issues over on the [snapcraft forum](https://forum.snapcraft.io/).




