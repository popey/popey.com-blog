+++
date = "2023-10-11T22:00:00+01:00"
title = "Updating snap packages: OBS Studio"
slug = "2023/10/updated-snap-packages-obs-studio"
author = "Alan Pope"
tags = ['ubuntu', 'snap', 'linux']
+++

tl;dr. The [OBS Studio snap](https://snapcraft.io/obs-studio) is now updated to the latest stable release, 29.1.3, after a "brief" hiatus.

Another day, another updated snap, which had been languishing a bit. I wrote about [updating Spot](https://snapcraft.io/spot) yesterday, and today, as per the title, it's [OBS Studio](https://snapcraft.io/obs-studio). As I mentioned [previously](/blog/2023/09/outdated-snap-packages), there's a bunch of outdated snaps in the store, and I want to help fix that. Hopefully, with these blog posts, others might learn how, and be motivated to either publish new applications or step up and update existing ones.

## Backstory

OBS Studio is a very popular application. It's pretty much the de-facto solution for anyone wanting to stream video content to any platform. Many people mistakenly think it's just for Twitch streamers, showing off their gaming prowess. The audience for OBS is **way** more diverse than that. I'll say no more than that. 

The OBS snap is currently installed on almost ninety thousand weekly active devices.

[![OBS Studio store stats](/blog/images/2023-10-11/obs-stats.png)](/blog/images/2023-10-11/obs-stats.png)

That published version is 27.1.3, which is a couple of years old now. As you can see, it still works, but it's missing a bunch of updated features and fixes you would expect.

[![OBS 27.1.3](/blog/images/2023-10-11/obs-27.1.3.png)](/blog/images/2023-10-11/obs-27.1.3.png)

I initially [started](https://github.com/snapcrafters/obs-studio/commit/525ab1f27e0640da584691fa21cd19c7f2acde52) the OBS Studio snap back in 2018. It was initially quite basic, as just a way to get the latest OBS Studio on Linux, without having to build it yourself. It was installable on Ubuntu 16.04, 18.04 and other interim releases, along with a bunch of other Linux distributions. 

Over the following couple of years, the package received some further updates and embellishments. OBS Studio is more than just the core application though. Many users augment it with a diverse array of plugins. 

Back then, when my (then) colleague, Martin, started streaming, he wanted a build of OBS that came with some popular, useful plugins. So he spent a bunch of time revising and updating the OBS snap to include a bunch of features, making it very much a 'batteries included' build.

## No updates

When Martin and I both left Canonical back in 2021, the package went mostly untouched. As you can see from the "Weekly active devices" graph above, the big solid blue chunk on the graph shows one single version with a relatively constant, but wavering number of users (and a notable drop over the Christmas period when people turn their computers off).  

I do think this is a genuine problem with the way snaps are published in the store. All software packaging can be hard, but I think we (speaking from when I worked at Canonical) made a bit of a rod for our own backs with this architecture.

There's a real perception in the snap store that *individuals* or *organisations* "own" the snaps they publish. We never successfully fostered a real community where people were welcomed to join in and contribute updates to these packages. Ideally anyone should have been able to update the OBS snap. 

Other Linux packing platforms like [Flathub](https://flathub.org/) and [Nix Packages](https://search.nixos.org/packages) with their [respective](https://github.com/orgs/flathub/repositories) [monorepos](https://github.com/NixOS/nixpkgs) have fostered a welcoming community where people are encouraged to contribute.

Maybe at the upcoming [Ubuntu Summit](https://ubuntu.com/blog/ubuntu-summit-2023) next month, the participants can figure out a plan to improve this situation. 

Aaanyway, back to OBS.

## OBS Portable

Over the last few months, Martin has been working on another project called [OBS Studio Portable](https://github.com/wimpysworld/obs-studio-portable), which is a bit of an evolution from the snap he worked on. 

It provides a similar 'batteries included' build of OBS Studio but in the form of easily consumable [release tarballs](https://github.com/wimpysworld/obs-studio-portable/releases). Just grab a tarball, unpack, get dependencies, and run OBS.

## Numbers

[![OBS distros](/blog/images/2023-10-11/distros.png)](/blog/images/2023-10-11/distros.png)

Nearly **six thousand** devices still have the OBS snap installed on **Ubuntu 18.04 LTS**, a release that came out over *five* years ago. Amazingly, over five hundred devices have the OBS Studio snap on **Ubuntu 16.04 LTS**, which came out seven years ago. Both releases are beyond standard support, but people still use them. 

It genuinely blows my tiny mind how many people stick on super old releases of Ubuntu. Around 6% of OBS Studio snap users are on 18.04, imagine what the total userbase of that release still is, in late 2023!

[![Dozens!](/blog/images/2023-10-11/dozenz.gif)](/blog/images/2023-10-11/dozenz.gif)

Also a couple of hundred on Linux Mint, where they actively *block* snapd out of the box, which is mildly amusing.

I find this information super motivating. Knowing the software is installed and potentially in use around the world, on thousands of computers makes me feel this should be kept up-to-date. 

## Update the snap

Today I decided that I'd take a look at updating the snap from 27.1.3 to something newer. The current stable upstream release of OBS Studio is 29.1.3. How hard could it be!?

I started by cloning the repo, and updating the OBS release version being pulled, and a few other dependencies and plugins - there are a lot. I iterated on it a few times, using some of the metadata for Martin's OBS Studio Portable project for reference.

I then went for a coffee break in the kitchen. Martin and I both rent space in an office, which I've [written about](/blog/2023/08/its-not-working-from-home/). So I mentioned over coffee to him that I thought I'd tackle OBS.

He had a lightbulb moment "You should just dump my OBS Studio Portable in the snap!".

Duh, of course. His builds are already made for Ubuntu 22.04, so I can consume them in a `core22` snap. I started with a fresh `snapcraft.yaml`, adding only a few necessary parts required to enable OBS to launch in a read-only confined environment. 

It took about two hours of the pair of us working through various tweaks and rebuilding the snap repeatedly. Building on `core22` (Ubuntu 22.04 LTS) meant we could use the already-updated dependencies from the Ubuntu repository, rather than build from source, as we previously did.

I tested the snap on both my laptop with an AMD GPU, and my desktop which has an nVidia GPU. GPU enablement in snaps has been a bit fraught over the years. But it's considerably easier to get working in `core22`, so I am hopeful users will be happy with what we've done.

What this also means, is that when Martin updates his OBS Studio Portable project to the next release, we can consume that directly in the snap, with almost no changes on our side. The old build of the OBS snap was quite overwhelming, with many interlocking moving parts. All that difficulty is now Martin's problem (again) but in a different project. 

So I am optimistic that now, the snap can be kept up-to-date with only minor changes required, which should mean it's more accessible to community contributions. Fingers crossed.

## Published

I've just pushed the OBS Studio 29.1.3 release to the stable channel in the store! We'll look at publishing the OBS Studio 30 beta release soon too.

```bash
alan@ziggy:~$ snap refresh obs-studio
obs-studio 29.1.3 from Snapcrafters✪ refreshed
```

[![OBS 29.1.3](/blog/images/2023-10-11/obs-29.1.3.png)](/blog/images/2023-10-11/obs-29.1.3.png)

Enjoy!