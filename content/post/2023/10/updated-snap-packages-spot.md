+++
date = "2023-10-10T22:00:00+01:00"
title = "Updating snap packages: Spot"
slug = "2023/10/updated-snap-packages-spot"
author = "Alan Pope"
tags = ['ubuntu', 'snap', 'linux']
+++

I recently [lamented](/blog/2023/09/outdated-snap-packages) that there's a bunch of broken and outdated snaps in the [snap store](https://snapcraft.io/). Well, some of them are my responsibility, so in the spirit of "be the change you want to see", let's get them fixed and updated. 

I thought I'd highlight one or two as I go through them, to highlight any important or interesting changes. Today I took a look at [Spot](https://snapcraft.io/spot), which is a very decent native GNOME Spotify client by [Alexandre Trendel](https://github.com/xou816).

[![Spot](/blog/images/2023-10-10/spot.png)](/blog/images/2023-10-10/spot.png)

As you can probably tell from the build records below, I abandoned this one in frustration over two years ago, in August 2021, and then revisited it yesterday.

[![Spot builds](/blog/images/2023-10-10/spot-builds.png)](/blog/images/2023-10-10/spot-builds.png)

If I recall correctly, back in 2021 I was using `base: core20` in this snap. That means the application is building from source inside an Ubuntu 20.04 LTS container or VM. The build will have access to the Ubuntu 20.04 repositories, which means whatever toolchain and library can be found in that release.

I was using the available release of GNOME at the time. The `snapcraft` tool can use an `extension` which, fairly closely matches the contemporary GNOME release. So in the apps section, the `extensions: [ gnome-3-38 ]` line will have used some GNOME 3x SDK components at build time  and a GNOME 3.38 runtime in the resulting snap. 

The upstream developer moved to the newer GNOME 4x release to build their application upon, at some point. Unfortunately at that time, there was no GNOME 4x stack available in the Ubuntu 20.04 repositories, and being 2021, Ubuntu 22.04 wasn't out yet. I wasn't prepared to build the entire GNOME universe for that snap, so gave up.

Some time has passed, and a couple of things happened. First, Ubuntu 22.04 was released in April 2022, and the Ubuntu Desktop Team created a new, updated extension. So yesterday I bumped from `core20` to `core22`. 

```diff
- base: core20
+ base: core22 
```

Now, there's a new GNOME extension, which *is* built on GNOME 4x. As such this simple one-line change in the `snapcraft.yaml` I made, will immediately bump the build-time SDK and runtime libraries to something usable for this snap.

```diff
-    extensions: [gnome-3-38]
+    extensions: [gnome]
```

I also had a problem with building the application using the rust nightly channel, so switched to the stable one. A simple fix but it was a bit of a head-scratcher, as I'm not a rust expert. So this was a bit of a lucky guess.

```diff
-      rustup toolchain install nightly
-      rustup default nightly
+      rustup toolchain install stable
+      rustup default stable
```

The rest of the changes were simple syntax updates in the `snapcraft` internal lifecycle processing, which come about as time goes on and `snapcraft` is actively developed.

```diff
-      snapcraftctl pull
+      craftctl default
```

[Here](https://github.com/popey/spot-snap/commit/355a4792e527ce6d45fc0980cf48a6a1a6cb43c9) is the full commit, showing all the above changes.

The final updates were to update the [store page](https://snapcraft.io/spot) with an updated description, new screenshots and a new icon.

[![Spot](/blog/images/2023-10-10/rick.png)](/blog/images/2023-10-10/rick.png)

Enjoy.

[![Get it from the Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-black.svg)](https://snapcraft.io/spot)
