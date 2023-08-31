+++
date = "2023-09-01T07:00:00-00:00"
title = "Full text content in Hugo"
slug = "2023/09/full-text-content-in-hugo"
author = "Alan Pope"
tags = ['hugo', 'blog', 'rss']
+++

tl;dr I've enabled full content text rather than summaries in the RSS feed for this blog. 

## History

I've used various tools for my blog over the years. Initially in the late 1990's it was hand-crafted HTML and some [FrontPage extensions](https://en.wikipedia.org/wiki/Microsoft_FrontPage). Later I used [Polarblog](http://polarblog.polarlava.com/) through the mid 2000's then dropped that in 2006 for [Drupal](https://www.drupal.org/) and subsequently [WordPress](https://wordpress.com/). 

Most recently I tried [Nikola](https://getnikola.com/) before "finally" settling on [Hugo](https://gohugo.io/). Originally my blog was hosted on some free webspace I got from my ISP. Later I self-hosted at home on a Linux server in my garage. Eventually I moved it onto a VPS form [Bitfolk](https://bitfolk.com/).

Most of the "modern" (HAH!) blogging platforms have had the ability to present content via [RSS](https://en.wikipedia.org/wiki/RSS) (Really Simple Syndication). I used to avidly view news in an RSS reader, but like many others, these have fallen out of favour. 

## Sidebar

I don't know for certain the cause for the lack of RSS use in the modern age, but we can ⭐speculate⭐. 

In part, I suspect many get their 'news' or 'content' through a third party social network such as Facebook or Twitter. This may make RSS a touch redundant. There is a propensity for these sites to try and keep eyeballs in-app, rather than let the user dare to leave the network to consume their content elsewhere.

Plus there's the problem that fewer people are actually blogging these days. I have no metrics to back that up, but anecdotally I rarely see any of my close friends writing long-form posts like these. On one incarnation of my blog I had a 'friend sidebar' which linked off to all the blogs my friends maintained.

Of the eighteen people in the list, one blogged once this year, one did last year, one in in 2018, one in 2017, and one in 2014. Indeed for most of them, their domains have lapsed, the content deleted, or the DNS isn't configured correctly anymore. Most of them are 'active' (by some definition) on one or more social networks, but all in short form comments, quips or exchanges. 

Not many people I personally know actually write a blog anymore. Perhaps people are tired of 'sharing'? Maybe they're outside 'touching grass'. Perhaps they just have better things to do with their lives and moved on from blog culture. 

Maybe everyone just realised writing is hard, and switched to doing podcasts, live streams, YouTube shorts, and TikToks? :D

There are of course exceptions. People like [Terence](https://shkspr.mobi/blog/) and professional writers like [Igor](https://www.dedoimedo.com/) and [John Gruber](https://daringfireball.net/) are cranking out interesting content constantly, which is delightful to see.

My silly blog of nonsense isn't in the same class as the luminaries and contemporaries I've linked to, clearly. Every so often I'll put out a post, or have a streak of posts. But then I lapse back into months tumbleweed rolling by. 

I'm trying to get better though, and share my stories widely. Indeed [one](blog/2023/08/i386-in-ubuntu-wont-die/) recently hit the front page of [hackernews](https://news.ycombinator.com/item?id=37280878), which is always 'fun'. It's fascinating to see the perspectives of the HN denizens. 

[![HN](/blog/images/2023-09-01/hn.jpg)](/blog/images/2023-09-01/hn.jpg)

Thankfully my little VPS from [Bitfolk](https://bitfolk.com/) survived just fine. Can you spot it? It was clearly a slow news Sunday.

[![Goaccess](/blog/images/2023-09-01/goaccess.png)](/blog/images/2023-09-01/goaccess.png)

## /Sidebar

Anyway, back to the point. Mine and many other people's blogs were or are accessed via an RSS reader of some kind. I know mine is, because I look at the logs, like a weirdo...

```bash
$ grep blog\/index.xml /srv/popey.com/logs/access_log | awk -F'"' '/GET/ {print $6}' | sort | uniq | wc -l
109
$ grep blog\/index.xml /srv/popey.com/logs/access_log | awk -F'"' '/GET/ {print $6}' | sort | uniq | head
Aggregator/2.22.000 (Android/13; exynos9611)
Akregator/5.24.0 (23.08.0); syndication
axios/0.26.1
Blogtrottr/2.0
Feedbin feed-id:1306543 - 3 subscribers
Feedbin feed-id:2000935 - 13 subscribers
Feedbin feed-id:9428 - 7 subscribers
FeedBurner/1.0 (http://www.FeedBurner.com)
FeedFetcher-Google; (+http://www.google.com/feedfetcher.html)
Feedly/1.0 (+http://www.feedly.com/fetcher.html; 134 subscribers; )
```

"Blogtrottr" sounds fun.

Previously my blog would only share a snippet of the post in the RSS feeds. I followed [this](https://jasonmurray.org/posts/2021/rssfulltexthugo/) helpful and easy to follow guide from [Jason Murray](https://jasonmurray.org/). Now the full content of each post is in the [RSS feed](/blog/index.xml). 

You're welcome.

