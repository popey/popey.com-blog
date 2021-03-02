+++
date = "2021-03-02T12:00:00-00:00"
title = "Updating Snap Bases"
slug = "2021/03/updating-snap-bases"
author = "Alan Pope"
tags = ['software', 'linux', 'snap', 'snapcraft']
+++

This is a bit of a [dayjob](https://snapcraft.io/) post, but as I maintain a bunch of snaps in my own time, I figured it's not out of place here. 

Typically when I (or indeed any developer) uses `snapcraft` to build a snap, a `snapcraft.yaml` drives the process. I'll integrate some kind of CI or build system, and start publishing to the Snap Store. Usually, once created, the yaml doesn't need much in the way of changes. Back when we first started building snaps, we were using Ubuntu 16.04 LTS systems. At runtime the snap would leverage the `base` of `core`. The `core` snap is a super minimal Ubuntu 16.04 LTS runtime environment. 

Since then we've had releases of `core18` based on Ubuntu 18.04 LTS and more recently, `core20` based off Ubuntu 20.04 LTS. The observant will note the original base `core` isn't called `core16` which is a shame, but hey-ho. In the early days it wasn't necessary to specify a `base` in the `snapcraft.yaml` because it was assumed to always be `core`. Indeed I don't think early releases of `snapcraft` even *had* a `base` option.

Since then `snapcraft` has been re-engineered and restructured such that specifying `base` makes it behave differently than if you don't specify one at all. Effectively not specifying a `base` gives backwards-compatibility so existing snaps continue to build. However the newer features and optimisations that land in `snapcraft` are only in the codepath where a `base` *is* specified.

So to get access to these juicy features, we reccommend developers migrate their snaps from not specifying a base, to specifying one, specifically one newer than Ubuntu 16.04 LTS. Specifying a newer `base` like `core18` or `core20` means that as well as *newer* `snapcraft`, the publisher also gets access to updated packages from the Ubuntu 18.04 or 20.04 archives.

Sadly it's *not* just a case of adding `base: core20` and you're done. There's a few other things that need adjusting. We're working on comprehensive documentation to cover all of the.. uh.. bases, but below you'll find a taster. 

I noticed the [cointop](https://snapcraft.io/cointop/) snap wasn't using a `base`. By "noticed", I grepped:

```bash
alan@robot:~$ snap install cointop
cointop 0a0530d from Miguel Mota (miguelmota) installed
alan@robot:~$ grep ^base /snap/cointop/current/meta/snap.yaml
alan@robot:~$
```

No `base` found implies `core` which is Ubuntu 16.04 LTS based, as mentioned earlier. So what did I do to update it? Here's the diff.

```diff
-version: master
-version-script: git -C parts/cointop/build rev-parse --short HEAD
+adopt-info: cointop
 summary: Interactive terminal based UI application for tracking cryptocurrencies
 description: |
   cointop is a fast and lightweight interactive terminal based UI application for tracking and monitoring cryptocurrency coin stats in real-time.
 grade: stable
 confinement: strict
+base: core20
 
 parts:
-  go:
-    source-tag: go1.14
   cointop:
-    after: [go]
     source: .
     plugin: go
-    go-importpath: github.com/miguelmota/cointop
+    build-packages:
+      - git
+    override-pull: |
+      snapcraftctl pull
+      snapcraftctl set-version $(git rev-parse --short HEAD)
 
 apps:
   cointop:
-    command: cointop
+    command: bin/cointop
     plugs:
       - network
       - network-bind
```

Let's break it down! 

The `version-script` option is deprecated, replaced by `adopt-info` and `snapcraftctl set-version` inside the `override-pull` section.

```diff
-version: master
-version-script: git -C parts/cointop/build rev-parse --short HEAD
+adopt-info: cointop
```

The `override-pull` is a series of commands which can be run to *override* the *pull* stage of the `snapcraft` lifecycle. Here we yoink the git revision and use that as the version number on the built snap.

```diff
+    override-pull: |
+      snapcraftctl pull
+      snapcraftctl set-version $(git rev-parse --short HEAD)
```

The `go` plugin pulls in a newer golang, so we don't need to have a separate part which forces us to get a newer `go` binary than shipped in Ubuntu 16.04 LTS. Further, the `go-importpath` is no longer required, simplifying this section.

```diff
-  go:
-    source-tag: go1.14
   cointop:
-    after: [go]
     source: .
     plugin: go
-    go-importpath: github.com/miguelmota/cointop
```

Somehow the old version of `snapcraft` or maybe the `go` part was pulling in a `git` binary from somewhere. We try not to automagically do stuff that is unexpected. So I need to be *explicit* that we need the `git` build package as part of the build. So I added that.

```diff
+    build-packages:
+      - git
```

The newer `snapcraft` code-path is more strict on explicitly specifying binary locations in the `apps` section. As the `cointop` binary ends up in `$SNAP/bin` we just need to prepend `bin/` to solve this.

```diff
-    command: cointop
+    command: bin/cointop
```

Oh, and we need to actually add the new `base`.

```diff
+base: core20
```

That's it. I submitted this as a [pr](https://github.com/miguelmota/cointop/pull/94) on the upstream project. 

Other snaps will certainly require more invasive changes, but I thought this would be a good example of a simple snap which only needed a few updates to bring it up to spec.