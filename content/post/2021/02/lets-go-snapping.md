+++
date = "2021-02-03T12:00:00-00:00"
title = "Let's Go Snapping"
slug = "2021/02/lets-go-snapping"
author = "Alan Pope"
tags = ['software', 'linux', 'snapcraft', 'golang', 'ticker', 'how-to']
+++

Last year ( 😄 ) I wrote an article called [Snap Along With Me](/blog/2020/12/snap-along-with-me/) in which I detailed how I approached snappnig a rust application called t-rec. Well, I'm back with another "Snap Along", this time we're snapping an application written in Golang.

During a meeting to on-board a new member of the team at work today, I went through a similar process as my last blog post. This time I chose a different application, so I thought I'd write it up here. I've previously [explained](/blog/2020/12/snap-along-with-me/) how I browse the various [GitHub Trending](https://github.com/trending) pages for each language. Today was no different, we browsed the [trending rust projects](https://github.com/trending/rust) then moved on to [trending Go projects](https://github.com/trending/go).

![Trending Go Projects](/blog/images/2021-02-03/trendinggo.png)

Right near the top I spotted [ticker](https://github.com/achannarasappa/ticker) by [Ani Channarasappa](https://github.com/achannarasappa) which is a *Terminal stock ticker with live updates and position tracking*. It looks great, is easy to use and it's *[zeitgeisty](https://www.google.com/search?q=gme)*! The project was only created ten days ago. Here's what it looks like.

![ticker](/blog/images/2021-02-03/ticker.png)

First things first, let's look around the project and make sure it's a good candidate.

![ticker project](/blog/images/2021-02-03/tickerproject.png)

It's a command line Go application, which tend to snap up very well. We typically end up with a small standalone binary, which will compress down nicely on disk, and won't usually need many additional libraries to be bundled. I checked the existing [issue tracker](https://github.com/achannarasappa/ticker/issues) and [pull requests](https://github.com/achannarasappa/ticker/pulls) to see if anyone had already made a start. I also checked the snap store to ensure there wasn't already a snap of this published. I had a good gut feeling from the screenshots that the application would likely only need network access to pull stock prices and display them on the screen. No weird permissions would likely be needed, so it could be strictly confined and published quickly. 

All good, looks like a fine candidate to snap. Let's get started.


Now, recall I mentioned I'm only doing this as a demo to a new team member, so they can see the process I go through when snapping a new thing. This was intended just as a demo, but *future me* can tell you (spoiler alert) I already successfully snapped it and it's published in the store under the [ticker](https://snapcraft.io/ticker) name.

{{< rawhtml >}}
 <iframe src="https://snapcraft.io/ticker/embedded?button=black&channels=true&summary=true&screenshot=true" frameborder="0" width="100%" height="730px" style="border: 1px solid #CCC; border-radius: 2px;"></iframe>
{{< /rawhtml >}}

First we make a folder in which to do our prototyping.

```
$ cd ~/Source/popey
$ mkdir ticker
$ cd ticker
```

In the folder I issued the usual `snapcraft init` which creates a template `snap/snapcraft.yaml`.

```
$ snapcraft init
Created snap/snapcraft.yaml.
Go to https://docs.snapcraft.io/the-snapcraft-format/8337 for more information about the snapcraft.yaml format.
```

Here's what the bare-bones template looks like.

```
name: my-snap-name # you probably want to 'snapcraft register <name>'
base: core18 # the base snap is the execution environment for this snap
version: '0.1' # just for humans, typically '1.2+git' or '1.3.2'
summary: Single-line elevator pitch for your amazing snap # 79 char long summary
description: |
  This is my-snap's description. You have a paragraph or two to tell the
  most important story about your snap. Keep it under 100 words though,
  we live in tweetspace and your description wants to look good in the snap
  store.

grade: devel # must be 'stable' to release into candidate/stable channels
confinement: devmode # use 'strict' once you have the right plugs and slots

parts:
  my-part:
    # See 'snapcraft plugins'
    plugin: nil
```

This is all boilerplate we can replace as we go. Let's start with the metadata.

I replace it with data from the upstream [git repo](https://github.com/achannarasappa/ticker), and specify we're going to use the `base` of `core20` which means it'll build in an Ubuntu 20.04 LTS container. I use `adopt-info` to specify the version should come from the `ticker` part we'll define in a moment.

```
name: ticker
base: core20
adopt-info: ticker
summary: Terminal stock watcher and stock position tracker
description: |
  Features:
  Live stock price quotes
  Track value of your stock positions
  Support for multiple cost basis lots
  Support for pre and post market price quotes
```

I'm anticipating this can be strictly confined, so we set that next in the `snapcraft.yaml`.

```
confinement: strict
```

We also know the i386 architecture (32-bit Intel) is no longer supported as an install arch for Ubuntu 20.04 LTS, so we're going to build `ticker` for every arch except that one. Here's how we do that. Yes, you will be able to check your portfolio on your S390 mainframe. Sweet.

```
architectures:
  - build-on: amd64
  - build-on: arm64
  - build-on: s390x
  - build-on: ppc64el
  - build-on: armhf
```

There's only one part to this snap, and that's the `ticker` project itself. Snapcraft has a `go` plugin and it thus knows how to build a project made with Golang, so not much to specify there. I specified a `source-tag` which I got from the upstream project [releases](https://github.com/achannarasappa/ticker/releases) page. As I write this v2.1.0 is current - thirteen hours ago. Later I'll remove that line so it builds the latest tip of master, rather than releases. So aventurous users can try the latest commits directly from the `edge` channel in the Snap Store.

The `snapcraftctl` lines simply pull the source then set the version for the snap which gets consumed by `adopt-info` earlier in the yaml.

```
parts:
  ticker:
    plugin: go
    source: https://github.com/achannarasappa/ticker.git
    source-tag: "v2.1.0"
    override-pull: |
      snapcraftctl pull
      snapcraftctl set-version "$(git describe --tags | sed -e 's/^v//')"
```

Finally we have an `apps` stanza to expose the `bin/ticker` binary to the outside world on the computer the snap is installed on. I took a guess that the `ticker` binary would land in `$SNAP/bin` and that it only needs the `network` plug.

```
apps:
  ticker:
    command: bin/ticker
    plugs:
      - network
```

I tried building with snapcraft in a lxd container, with options to halt inside the container whether the build fails (`--debug`) or succeeds (`--shell-after`).

```
$ snapcraft  --use-lxd --debug --shell-after
```

After removing some of the verbose cruft, the highlights of the build include something that looks a bit like this

```
Launching a container.
Installing build dependencies: git=1:2.25.1-1ubuntu3 git-man=1:2.25.1-1ubuntu3 libbrotli1=1.0.7-6ubuntu0.1 libcurl3-gnutls=7.68.0-1ubuntu2.4 liberror-perl=0.17029-1 libnghttp2-14=1.40.0-
1build1 libpsl5=0.21.0-1ubuntu1 librtmp1=2.4+20151223.gitfa8646d.1-2build1 libssh-4=0.9.3-2ubuntu2.1
Pulling ticker
+ snapcraftctl pull
Cloning into '/root/parts/ticker/src'...           
remote: Enumerating objects: 515, done.            
remote: Counting objects: 100% (515/515), done.    
remote: Compressing objects: 100% (271/271), done. 
remote: Total 515 (delta 234), reused 461 (delta 180), pack-reused 0                                                    
Receiving objects: 100% (515/515), 172.91 KiB | 917.00 KiB/s, done.                                                     
Resolving deltas: 100% (234/234), done.               
++ git describe --tags                                
++ sed -e 's/^v//'                                    
+ snapcraftctl set-version 2.1.0
Building ticker                                       
+ snapcraftctl build                                  
+ go mod download                                     
+ go install -p 8 -ldflags -linkmode=external ./...   
Staging ticker                                        
+ snapcraftctl stage                                  
Priming ticker                                        
+ snapcraftctl prime                                  
Snapping |                                            
Snapped ticker_2.1.0_amd64.snap 
```

I'd expected and kinda hoped the snap to fail to build so we could work through it, but "whoops", it built successfully first time. So I exited the container with a `^D` and installed the snap.

```
$ snap install ticker_2.1.0_amd64.snap --dangerous
```

Then ran it.

```
$ ticker
Error: Invalid config: No watchlist provided
Usage:
  ticker [flags]

Flags:
      --config string       config file (default is $HOME/.ticker.yaml)
  -h, --help                help for ticker
  -i, --interval int        refresh interval in seconds
      --show-fundamentals   display open price, high, low, and volume for each quote
      --show-separator      layout with separators between each quote
      --show-tags           display currency, exchange name, and quote delay for each quote
  -w, --watchlist string    comma separated list of symbols to watch

Invalid config: No watchlist provided

```

Easy!

Knowing the snap is strictly confined, without the `home` interface, I am aware it won't be able to see any files in my `$HOME` directory (and even if I did specify it, the snap can't see `$HOME/.ticker`), I put a config file in `$HOME/snap/ticker/common` where the snap *can* see. I used the sample `ticker.yaml` from the upstream repo:

```
$ cat snap/ticker/common/ticker.yaml 
show-tags: true
show-fundamentals: true
show-separator: true
interval: 10
watchlist:
  - NET
  - TEAM
  - ESTC
  - BTC-USD
lots:
  - symbol: "ABNB"
    quantity: 35.0
    unit_cost: 146.00
  - symbol: "ARKW"
    quantity: 20.0
    unit_cost: 152.25
  - symbol: "ARKW"
    quantity: 20.0
    unit_cost: 145.35

```

Running the application, pointing to the configuration file works fine.

```
$ ticker --config ~/snap/ticker/common/ticker.yaml
```

Boom!

![ticker](/blog/images/2021-02-03/ticker.png)

Ok, so I figured given the snap works, I might as well upload it to the store. I used `snapcraft register ticker` to claim the application name. I then built the snap for all the popular architectures using the `remote-build` feature:

```
$ snapcraft remote-build
All data sent to remote builders will be publicly available. Are you sure you want to continue? [y/N]: y
snapcraft remote-build is experimental and is subject to change - use with caution.
Building snap package for amd64, arm64, armhf, ppc64el, and s390x. This may take some time to finish.
Build status as of 2021-02-03 11:52:34.926743:                                                             
        arch=amd64      state=Uploading build                                                              
        arch=arm64      state=Currently building                                                           
        arch=armhf      state=Currently building
        arch=s390x      state=Currently building
        arch=ppc64el    state=Currently building
```

Time passes, and I end up with a bunch of snaps

```
$ ls -l ticker_2.1.0_*.snap
-rw-rw-r-- 1 alan alan 5824512 Feb  3 14:25 ticker_2.1.0_amd64.snap
-rw-rw-r-- 1 alan alan 5210112 Feb  3 14:25 ticker_2.1.0_arm64.snap
-rw-rw-r-- 1 alan alan 5144576 Feb  3 14:25 ticker_2.1.0_armhf.snap
-rw-rw-r-- 1 alan alan 5189632 Feb  3 14:25 ticker_2.1.0_ppc64el.snap
-rw-rw-r-- 1 alan alan 5533696 Feb  3 14:25 ticker_2.1.0_s390x.snap
```

I upload these to the store, releasing them to the candidate channel for further testing. That kicks off looking like this.

```
$ for f in ticker_2.1.0_*.snap; do snapcraft upload $f --release=candidate; done
Preparing to upload 'ticker_2.1.0_amd64.snap'.
After uploading, the resulting snap revision will be released to 'candidate' when it passes the Snap Store review.
Running the review tools before pushing this snap to the Snap Store.
```

Note that last line where snapcraft uses the `review-tools.snap-review` command to do some sanity checks on each snap before they get uploaded to the store. The store performs the exact same checks on upload, this allows us to save time by not uploading something that will ultimately fail on the store side.

After each snap gets uploaded, a channel map for that architecture is printed, showing the incremental snap revision number of the snap in each channel

```
Uploading 'ticker_2.1.0_amd64.snap' [=========================================] 100%
Processing...|                                          
released                                                
Revision 11 of 'ticker' created.                        
Track    Arch    Channel    Version            Revision 
latest   amd64   stable     -                  -        
                 candidate  2.1.0              11       
                 beta       ↑                  ↑        
                 edge       ↑                  ↑ 
```

I can at this point test the snap on a bunch of machines, distros and architectures, and once I'm happy, release it to the stable channel. the releases page in the Snap Store looks like this.

![ticker releases](/blog/images/2021-02-03/releases.png)

Finally I pushed my changes to a personal [git repo](https://github.com/popey/ticker-snap) and connect that up to the build process, so each time the application is updated, a new release is built and pushed to the edge channel. Here's what that looks like.

![ticker builds](/blog/images/2021-02-03/builds.png)

I can hit the "Trigger new build" button to manually force a build.

Lastly I will file an issue and pull request against the [upstream project](https://github.com/achannarasappa/ticker), offering the developer to have the snap name transferred to them, with the configuration created above. I'd way rather the upstreams for projects had their own snaps under their name rather than me publish them. But if they don't want to, that's fine too.

Hope that's a useful walk through to someone. 