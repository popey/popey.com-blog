+++
date = "2021-02-11T12:00:00-00:00"
title = "Mastodon Instances, Everywhere"
slug = "2021/02/mastodon-instances-everywhere"
author = "Alan Pope"
tags = ['software', 'mastodon', 'social']
+++

[Mastodon](https://en.wikipedia.org/wiki/Mastodon_(software)) is interesting. It's "*free and open-source software for running self-hosted social networking services.*". To any normal personal that's "*Open Source Twitter*", largely. 

Anyone can grab the code and spin up their own Mastodon instance. I put one up a year or so ago, but unfortunately I didn't have the time or resources to maintain it, so I shut it down. Maybe it will return. 

Currently I'm using the [mastodon.social](https://mastodon.social/) instance, so that makes me [https://mastodon.social/@popey](https://mastodon.social/@popey) - but other instances are available. *Boy*, there are a lot of them!

I knew Mastondon was popular among the Free Software world, and I'm aware of individuals who run their own private or public instances. One thing I discovered is how these instances reveal themselves to website owners, like me! This isn't a secret, or 'hack' or whatever, I just found it interesting, so I'm sharing it.

When I publish a blog post, I tend to share it on [Twitter](https://twitter.com/popey), [Mastodon](https://mastodon.social/@popey), LinkedIn (sometimes) and Facebook (rarely). I don't use a tool for this, unless "my hands" and "the keyboard" are "tools" (they are). I basically type the entry on one site and paste it on the others. Yes, tedious, but it takes seconds, and I don't end up annoying people with stuff shared in a weird broken way that leaks back to another social network. 

I host my own blog, using [Hugo](https://gohugo.io/) on my fine, *fine* [Bitfolk](https://bitfolk.com) VPS (tell them I sent you). Sometimes, like a complete **dork** I follow the webserver logs while ssh'ed into that VPS. Yes, I also have tools to give me nice graphs, but sometimes I like watching logs scroll by just after sharing the post. "Look ma! I'm popular!".

Anyway, one interesting thing is when I share a post, a bunch of requests come from a pile of Mastodon instances which aren't the one that I am on. Yay! 🥳 Federation Celebration! 🥳

Here's what that looks like, with the IP addresses of clients redacted. Scroll right in this output to see the Mastodon instance hosts.

```shell
$ grep \(Mastodon /srv/popey.com/logs/access_log.1 | tail -n 4
x.x.x.x - - [10/Feb/2021:21:40:31 +0000] "GET /blog/2021/02/my-podcast-listening-list/ HTTP/1.1" 200 8749 "-" "http.rb/3.3.0 (Mastodon/2.9.0+glitch; +https://aleph.land/)"
x.x.x.x - - [10/Feb/2021:21:40:32 +0000] "GET /blog/2021/02/my-podcast-listening-list/ HTTP/1.1" 200 8311 "-" "http.rb/4.4.1 (Mastodon/3.3.0; +https://mastodon.cloud/) Bot"
x.x.x.x - - [10/Feb/2021:21:41:05 +0000] "GET /blog/2021/02/my-podcast-listening-list/ HTTP/1.1" 200 8749 "-" "http.rb/4.4.1 (Mastodon/3.3.0; +https://todon.nl/) Bot"
x.x.x.x - - [11/Feb/2021:06:09:31 +0000] "GET /blog/2021/02/my-podcast-listening-list/ HTTP/1.1" 200 8749 "-" "http.rb/4.4.1 (Mastodon/3.2.1; +https://mastodon.cc/) Bot"

```

There's a fair few of them.

```shell
$ grep \(Mastodon /srv/popey.com/logs/access_log.1 | awk -F '"' '{ print $6}' | sort | uniq | wc -l
108
```

These are just the ones I noticed yesterday, where I guess someone happens to follow me from an account on one of those instances. Here's a slightly longer list, without the cruft, making it easier to see.

```shell
$ grep \(Mastodon /srv/popey.com/logs/access_log.1 | awk -F '"' '{ print $6}' | sort | uniq | tail 
http.rb/4.4.1 (Mastodon/3.3.0; +https://tiny.tilde.website/) Bot
http.rb/4.4.1 (Mastodon/3.3.0; +https://todon.nl/) Bot
http.rb/4.4.1 (Mastodon/3.3.0; +https://toot.berlin/) Bot
http.rb/4.4.1 (Mastodon/3.3.0; +https://toot.cafe/) Bot
http.rb/4.4.1 (Mastodon/3.3.0; +https://toots.alirezahayati.com/) Bot
http.rb/4.4.1 (Mastodon/3.3.0; +https://writing.exchange/) Bot
http.rb/4.4.1 (Mastodon/3.3.0; +https://xarxamontgri.masto.host/) Bot
http.rb/4.4.1 (Mastodon/3.3.0+koyuspace; +https://koyu.space/) Bot
http.rb/4.4.1 (Mastodon/3.3.0rc3; +https://mastodon.sdf.org/) Bot
http.rb/4.4.1 (Mastodon/3.3.1+glitch; +https://im-in.space/) Bot
```

What I found super interesting, aside from the funny names, and creative domains people chose, is the dispirate versions of Mastodon people are running. (excuse the awful awking)

```shell
$ grep \(Mastodon /srv/popey.com/logs/access_log.1 | awk -F '"' '{ print $6}' | sort | uniq | awk -F '(' '{print $2}' | awk -F ';' '{print $1}' | uniq
Mastodon/2.3.3
Mastodon/2.6.5
Mastodon/2.9.0+glitch
Mastodon/2.9.4
Mastodon/3.0.0
Mastodon/3.0.1
Mastodon/3.1.1
Mastodon/3.1.2-cybre
Mastodon/3.1.2
Mastodon/3.1.3
Mastodon/3.1.5
Mastodon/3.2.0+glitch
Mastodon/3.2.0
Mastodon/3.2.1
Mastodon/3.2.2-cw1
Mastodon/3.2.2
Mastodon/3.3.0+glitch
Mastodon/3.3.0
Mastodon/3.3.0+koyuspace
Mastodon/3.3.0rc3
Mastodon/3.3.1+glitch
```

It makes me feel a ton better when I think back to how outdated my instance of Mastodon got before I nuked it from orbit. 💥

Carry on everyone. I'll be over here tailing my logs as I post this blog...