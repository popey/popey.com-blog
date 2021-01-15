+++
date = "2021-01-16T12:00:00-00:00"
title = "Distrowatch is Not a Measure of Popularity"
slug = "2021/01/distrowatch-is-not-a-measure-of-popularity"
author = "Alan Pope"
tags = ['distrowatch', 'linux', 'rant']
+++

Here's a fun blog post where I get possibly irrational annoyed by people who use a web page incorrectly. Let me get this off my chest and then move on to better topics tomorrow.

[Distrowatch](https://distrowatch.com/) is a popular website among Linux enthusiasts. The main page consists of reverse-chronological news articles of interest to Linux users. Often this consists of new stable and development release [announcements](https://distrowatch.com/11130), [reviews](https://distrowatch.com/weekly.php?issue=20210111#pakos) and [weekly roundups](https://distrowatch.com/weekly.php?issue=20210104).

![Home page](/blog/images/2021-01-15/homepage.png)

In addition, there are boxes surrounding the content highlighting the latest Linux distributions, podcasts, software packages and some advertising. Much of the non-advertising content is also served via RSS feeds so enthusiasts can keep up to date with the content. Finally there's a large "Page Hit Ranking" on the right-side of the main content. This is the main focus of this blog post.

![PHR 6-month](/blog/images/2021-01-15/6-month.png)

Distrowatch maintains a separate page for many Linux distributions. Not every distro has a page, some are pending in a queue to be reviewed. So a fly-by-night distro which has no users, no support infrastructure, and will likely be gone tomorrow, doesn't get featured. But a distro which meets the [criteria](https://distrowatch.com/dwres.php?resource=submit), will eventually get listed.

![Waiting list](/blog/images/2021-01-15/waitlist.png)

You can visit the page for any distro by clicking it. Most pages, news articles, and announcements will link directly to the distro pages. For example The article [Distribution Release: Linux Mint 20.1](https://distrowatch.com/11128) (shown below) links directly to the page for [Linux Mint](https://distrowatch.com/mint) via the url https://distrowatch.com/mint.

![Mint release](/blog/images/2021-01-15/mint-release.png)

The page for that distro contains a wealth of useful information, which may be useful to the new user, or any interested researcher.

![Mint](/blog/images/2021-01-15/mint.png)

The Page Hit Ranking shows a long list of Linux distributions with a "Rank" and the "HPD" (Hits Per Day). By default it shows the stats for the last 6 months, with a drop-down to allow selection of other time periods. There's also a dedicated "[popularity](https://distrowatch.com/dwres.php?resource=popularity)" page which explains the stats, and shows multiple tables in parallel. 

It's worth highlighting this section of the explanation from the popularity page:

"*The DistroWatch Page Hit Ranking statistics are a light-hearted way of measuring the popularity of Linux distributions and other free operating systems among the visitors of this website. They correlate neither to usage nor to quality and should not be used to measure the market share of distributions. They simply show the number of times a distribution page on DistroWatch.com was accessed each day, nothing more.*"

So it's clear here, the tables show the ranking of hits per day for each distro, based on visitors to the distro pages on-site, both referred internally *and* externally. So what's the problem here? In and of itself, nothing. Distrowatch has a wealth of curated content which helps new users choose a distro, and distrohoppers to learn about the next shiny thing.

The issue is that a significant number of commentators and Linux enthusiasts don't appear to have read the section of text on the popularity. Over the last few years I've seen numerous blog posts, YouTube videos and conversations suggesting the HPD / popularity tables is an indicator of which Linux distros are popular. They're very **wrong**.

Yes, I suffer from xkcd 386. Sorry, also, not sorry.

[![Duty Calls](/blog/images/2021-01-15/duty_calls.png)](https://xkcd.com/386/)

Again, Distrowatch in and of itself is a great resource for people wanting to know what's new in the world of Linux software packages, Linux distributions, releases and other news. However, Distrowatch is a terrible measure of which Linux distributions have most marketshare or are trending online or in the real world. 

"*But Alan, it doesn't claim to show that!*"

*I* **know** this! But nobody seems to read that quoted text above, or they do, and still seem intent on using it as a barometer for which distros are popular or trending. Let's show how the HPD page rank works, and how it totally isn't that, it's super simple.

Visit [Distrowatch](https://distrowatch.com/) and change the Page Hit Ranking to "[Trending past 7 days](https://distrowatch.com/index.php?dataspan=trending-1)" and hit the Go button. You'll see something similar to this, which will differ depending on when you look at it, clearly. Note we have a selection of Linux distributions, with their rank, and the trend. These are distros which, over the last 7 days have had their pages visited the most. Nothing more.

![Trending](/blog/images/2021-01-15/trending.png)

Now look at the "Latest Distributions" side bar. This is a feed of new releases. Each distro name links to the internal page inside Distrowatch, and the version number links to the release ISO (typically). Visitors who click these are driving up the Hits Per Day for those distros. Nothing to do with how popular those distros are.

![Latest Distributions](/blog/images/2021-01-15/latest-panel.png)

Eight out of ten of the links on the "Latest Distributions" panel - *Alpine, Bluestar, Raspberry Pi OS, CloudReady, Redcore, Q4OS, Live Razio* and *Snal* - have a link to their on-site distro pages, **and** are *all* driving traffic which pushes the "Trend" upwards. The Latest Distributions panel is the the most prominent one (after an advert) on the top left of the site.

Now look through the news articles in the centre of the page. The most [recent article](https://distrowatch.com/11130) (at the time of writing) is driving the most trending distro this week - Alpine. The next article - [Distrowatch Weekly 899](https://distrowatch.com/weekly.php?issue=20210111) links (some way down) to the 13th most trending this week - a relatively unknown PakOS.

![Latest News](/blog/images/2021-01-15/latest-news.png)

This is easily and reliably repeatable on any day. Whatever distro is mentioned in the most recent news or latest distributions panel, will be trending upwards. 

What's also fun, is the Page Hit Ranking table is self-sustaining. Why do you think MX Linux is at the top all the time? Is it because MX has more users than any other distro? No. It's at the top, because it's at the top. Clicking an entry in the table takes you to the page for that distro, driving traffic, keeping it at the top! 🤯

![PHR 6-month](/blog/images/2021-01-15/6-month.png)

There are other factors in play, external to the site. Users hunting for information about Linux distributions on their favourite search engine will often find Distrowatch pages in the results. This is very useful, because the distro pages have a wealth of content about each distro, as a stepping stone. But each of those clicks will drive the HPD up. 

While this is a more "genuine" reflection of interest in a distro, it's also heavily skewed by the search engine results. For any Linux distro with a decent web presence of their own home page, developer resources, wikipedia entry, user forums, and enthusiast news sites, Distrowatch will be lower in the search results. 

Take for example MX Linux - the current number one distro on the page ranking table. Use whatever search engine you prefer, and you'll likely find one result for MX's own home page, maybe some video content, but very near the top, on the front page of search results, is the Distrowatch page. This is a strong "well done" for Distrowatch, as they're going to capture some of those eyeballs, and driving up the HPD.

![Ask](/blog/images/2021-01-15/ask.png)

"*Why is MX Linux So Popular?*" - "*MX Linux is really gaining momentum on the Linux desktop. I'm attempting to explain why - and why now?*". 🤯🤯

So, in conclusion, the Page Hit Ranking is a bit of fun internal metrics on the Distrowatch site, and not a lot more. It's easily gamed by any distro that cranks out releases or publishes regular news. It favours distros which have poor SEO, or little web presence, as Distrowatch pages show up in search engine results. 

Things you may be thinking:

"*Alan, you're just salty because Ubuntu isn't number one, lol!*".

No. 

"*Alan, Canonical used to quote Ubuntu being at the top of Distrowatch, you hypocrite*"

I know. Those were unenlightened times, before I joined 😜

"*Alan, why do you care, it's just some website with a fun table!?*"

Because people cite these as facts that one distro has more users than another. They are wrong, and again, [Xkcd 386](https://xkcd.com/386/).

"*Alan, you're wrong, MX Linux is the most popular distro!*"

MX Linux is a fine distro. The people who work on it are excellent individuals. I have nothing against any distro on the list, at all. *Other than of course that I feel people should stop making more Linux distros and [Make Apps](https://makealinux.app/) instead.*

"*Alan, this is the only metric we have, there's no public stats, so we have to rely on this*"

🤦 Bad metrics are worse than no metrics. Do better.

Again, nothing against Distrowatch at all. They're fine people spreading the good word. But journalists, bloggers, YouTubers, please, stop citing Distrowatch as the source for which distro's are popular. 