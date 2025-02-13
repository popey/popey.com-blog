+++
date = "2025-02-13T11:00:00+01:00"
title = "Spotlighting Community Stories"
slug = "2025/02/spotlighting-community-stories"
author = "Alan Pope"
tags = ['syft', 'grype', 'webinar', 'megalinter', 'zoom']
+++

tl;dr I'm hosting a [Community Spotlight Webinar](https://anchore.zoom.us/j/84874186657) today at [Anchore](https://anchore.com/) featuring [Nicolas Vuilamy](https://www.linkedin.com/in/nicolas-vuillamy/) from the [MegaLinter](https://megalinter.io/latest/) project. [Register here](https://anchore.zoom.us/j/84874186657).

---

Throughout my career, I've had the privilege of working with organizations that create widely-used open source tools. The popularity of these tools is evident through their impressive download statistics, strong community presence, and engagement both online and at events.

During my time at [Canonical](https://canonical.com/), we saw the tremendous reach of [Ubuntu](https://ubuntu.com/), along with tools like [LXD](https://canonical.com/lxd), [cloud-init](https://cloud-init.io/), and yes, even [Snapcraft](https://snapcraft.io/). 

At [Influxdata](https://www.influxdata.com/), I was part of the [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/) team, where we witnessed substantial adoption through downloads and active usage, reflected in our vibrant [bug tracker](https://www.repotrends.com/influxdata/telegraf).

Now at [Anchore](https://anchore.com/), we see widespread adoption of [Syft](https://github.com/anchore/syft) for [SBOM](https://anchore.com/sbom) generation and [Grype](https://github.com/anchore/grype) for [vulnerability](https://anchore.com/container-vulnerability-scanning/) scanning.

What makes Syft and Grype particularly exciting, beyond their permissive licensing, consistent release cycle, dedicated developer team, and [distinctive](https://en.wikipedia.org/wiki/List_of_computing_mascots#/media/File:Syft_mascot.svg) [mascots](https://en.wikipedia.org/wiki/List_of_computing_mascots#/media/File:Grype_mascot.svg), is how they serve as building blocks for other tools and services.

Syft isn't just a standalone SBOM generator - it's a library that developers can integrate into their own tools. Some organizations even build their own SBOM generators and vulnerability tools directly from our open source foundation!

```bash
$ docker-scout version
      ⢀⢀⢀             ⣀⣀⡤⣔⢖⣖⢽⢝
   ⡠⡢⡣⡣⡣⡣⡣⡣⡢⡀    ⢀⣠⢴⡲⣫⡺⣜⢞⢮⡳⡵⡹⡅
  ⡜⡜⡜⡜⡜⡜⠜⠈⠈        ⠁⠙⠮⣺⡪⡯⣺⡪⡯⣺
 ⢘⢜⢜⢜⢜⠜               ⠈⠪⡳⡵⣹⡪⠇
 ⠨⡪⡪⡪⠂    ⢀⡤⣖⢽⡹⣝⡝⣖⢤⡀    ⠘⢝⢮⡚       _____                 _
  ⠱⡱⠁    ⡴⡫⣞⢮⡳⣝⢮⡺⣪⡳⣝⢦    ⠘⡵⠁      / ____| Docker        | |
   ⠁    ⣸⢝⣕⢗⡵⣝⢮⡳⣝⢮⡺⣪⡳⣣    ⠁      | (___   ___ ___  _   _| |_
        ⣗⣝⢮⡳⣝⢮⡳⣝⢮⡳⣝⢮⢮⡳            \___ \ / __/ _ \| | | | __|
   ⢀    ⢱⡳⡵⣹⡪⡳⣝⢮⡳⣝⢮⡳⡣⡏    ⡀       ____) | (_| (_) | |_| | |_
  ⢀⢾⠄    ⠫⣞⢮⡺⣝⢮⡳⣝⢮⡳⣝⠝    ⢠⢣⢂     |_____/ \___\___/ \__,_|\__|
  ⡼⣕⢗⡄    ⠈⠓⠝⢮⡳⣝⠮⠳⠙     ⢠⢢⢣⢣
 ⢰⡫⡮⡳⣝⢦⡀              ⢀⢔⢕⢕⢕⢕⠅
 ⡯⣎⢯⡺⣪⡳⣝⢖⣄⣀        ⡀⡠⡢⡣⡣⡣⡣⡣⡃
⢸⢝⢮⡳⣝⢮⡺⣪⡳⠕⠗⠉⠁    ⠘⠜⡜⡜⡜⡜⡜⡜⠜⠈
⡯⡳⠳⠝⠊⠓⠉             ⠈⠈⠈⠈



version: v1.13.0 (go1.22.5 - darwin/arm64)
git commit: 7a85bab58d5c36a7ab08cd11ff574717f5de3ec2

$ syft /usr/local/bin/docker-scout | grep syft
 ✔ Indexed file system /usr/local/bin/docker-scout
 ✔ Cataloged contents f247ef0423f53cbf5172c34d2b3ef23d84393bd1d8e05f0ac83ec7d864396c1b
   ├── ✔ Packages                        [274 packages]
   ├── ✔ File digests                    [1 files]
   ├── ✔ File metadata                   [1 locations]
   └── ✔ Executables                     [1 executables]
github.com/anchore/syft     v1.10.0     go-module
```

*(I find it delightfully meta to discover syft inside other tools using syft itself)*

{{< rawhtml >}}
<center><a href="/blog/images/2025-02-13/scooby-doo-meme.png"><img src="/blog/images/2025-02-13/scooby-doo-meme.png" width="540" alt="A silly meme that isn't true at all :)"></a></center>
{{</ rawhtml >}}

This collaborative building upon existing tools mirrors how [Linux](https://linuxmint.com/) distributions often build upon other [Linux distributions](http://ubuntu.com/). Like Ubuntu and Telegraf, we see countless individuals and organizations creating innovative solutions that extend beyond the core capabilities of Syft and Grype. It's the essence of open source - a multiplier effect that comes from creating accessible, powerful tools.

While we may not always know exactly how and where these tools are being used (and sometimes, rightfully so, it's not our business), there are many cases where developers and companies want to share their innovative implementations.

I'm particularly interested in these stories because they deserve to be shared. I've been exploring public repositories like the GitHub network dependents for [syft](https://github.com/anchore/syft/network/dependents), [grype](https://github.com/anchore/grype/network/dependents), [sbom-action](https://github.com/anchore/sbom-action/network/dependents), and [scan-action](https://github.com/anchore/scan-action/network/dependents) to discover where our tools are making an impact.

The adoption has been remarkable!

I reached out to several open source projects to learn about their implementations, and [Nicolas Vuilamy](https://www.linkedin.com/in/nicolas-vuillamy/) from [MegaLinter](https://megalinter.io/latest/) was the first to respond - which brings us full circle.

Today, I'm hosting our first [Community Spotlight Webinar](https://anchore.zoom.us/j/84874186657) with Nicolas to share MegaLinter's story. [Register here](https://anchore.zoom.us/j/84874186657) to join us!

If you're building something interesting with [Anchore Open Source](https://github.com/anchore) and would like to share your story, please [get in touch](https://popey.me/). 🙏