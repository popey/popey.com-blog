+++
date = "2023-05-29T16:00:00-00:00"
title = "Simple RSS Mastodon Bot"
slug = "2023/05/simple-rss-mastodon-bot"
author = "Alan Pope"
tags = ['mastodon', 'bot', 'linuxmatters', 'rss']
+++

## Linux Matters

I recently started presenting [Linux Matters](https://linuxmatters.sh/) podcast with my friends [Martin Wimpress](https://linuxmatters.sh/host/mwimpress/) and [Mark Johnson](https://linuxmatters.sh/host/mjohnson/). 

In [episode 4](https://linuxmatters.sh/4/) (that link will only work once the episode is released) I briefly talked about some simple bots I setup on the [Ubuntu Social Mastodon](https://ubuntu.social/) instance (which, incidentally I talked about in [episode 1](https://linuxmatters.sh/1)).

This blog post accompanies episode 4. Linux Matters is part of the Late Night Linux (LNL) family. If you support us on the [LNL Patreon](https://patreon.com/latenightlinux), you'll often get the episode delivered early, as well as advert free. Thanks, if you already do.

## Background

The [Ubuntu Social Mastodon](https://ubuntu.social/) has a limited number of users. That's intentional because it's only for [Ubuntu Members](https://wiki.ubuntu.com/Membership) and "official" projects. As of writing there's only around 25 active accounts. That means the local timeline can be pretty quiet at times. 

So I decided to pipe some existing Ubuntu related content into the timeline via bots! This is what they can look like:

![AskUbuntu Mastodon Post](/blog/images/2023-05-29/aupost.png)

I created four bots. As mentioned in the show, some are more popular and some are more 'chatty' than others. Here's a snapshot of the numbers as I write this.

  * [AskUbuntu Bot](https://ubuntu.social/@askubuntu) (108 followers, 2.1K posts)
  * [Ubuntu Blog Bot](https://ubuntu.social/@ubuntublog) (73 followers, 27 posts)
  * [Ubuntu Weekly News Bot](https://ubuntu.social/@ubuntuweeklynews) (55 followers, 20 posts)
  * [Ubuntu Bugs](https://ubuntu.social/@ubuntubugs) (8 followers, 982 posts) 

## How to bot

Initially I used a poorly made shell script to scrape some sites, then I remembered RSS exists! 

I did a quick search to see if anyone else had made tools to gate RSS feeds to Mastodon posts, but discovered precious little. Then I stumbled upon [rss2masto](https://github.com/leoncowle/rss2masto) by [Leon Cowle](https://github.com/leoncowle/) - apparently their first open source project. Nice one Leon!

I cloned the repo, figured out how it works, and quickly had it taking the contents of an RSS URL, and turning each entry into a Mastodon post. Setting up is very easy. You just need an API key from your Mastodon account, and the RSS URL you want to follow. 

Run rss2masto regularly, and it will post to Mastodon under your account whenever it sees new content on the RSS feed. It keeps a local Sqlite database in which it tracks which items have already been posted, to eliminate duplicates. 

## Tweaks

I tweaked Leon's code to fit my requirements. By default rss2masto adds `FROM:`, `MAIN URL:` and `TITLE:` to posts, which I didn't want, so I stripped all that down.

When you run rss2masto, if you configured it correctly, it will post every article as a post. This is of course working as designed. However, if you aren't happy with the format of the posts, you may want to delete the posts, and do them again. If you have a lot of posts to delete, you may hit the Mastodon instance's rate limiting. Further, if the posts are already listed in the local Sqlite database, they won't post the second time. 

So I recommend commenting out the part of rss2masto which actually posts to Mastodon, and let it print the 'toots' out to the console, so you can debug and refine them first, before actually posting them. You can then delete the Sqlite database entirely, or just drop specific records, and run the script again.

There's a `debug = False` you can flip to `debug = True` to enable output printing.

For the AskUbuntu feed, where posts can be tagged with 'categories', I've extracted them and turned them into 'hashtags' in the Mastodon posts. This may help them show up in searches, or alongside other posts. 

I also wanted to tweak the output so that 'closed' questions didn't appear as new versions of the same post. So I stripped that out of the text. 

## Running the bot

I have a home HP Microserver, which is a general purpose dogsbody computer. I created cron jobs for each of the Mastodon bots to run at various times. Maybe I could do this differently, with systemtd timers - whatever they are - or some other method. But this works.

```shell
*/5 * * * * cd /home/alan/bots/aubot; python3 ./rss2masto.py
30 * * * * cd /home/alan/bots/ubuntublog; python3 ./rss2masto.py
*/5 * * * * cd /home/alan/bots/ubuntubugs; python3 ./rss2masto.py
45 * * * * cd /home/alan/bots/ubuntuweeklynews; python3 ./rss2masto.py
```

## My changes

If you're interested in my terribly bad Python tweaks, you'll find them in my [fork of rss2masto](https://github.com/popey/rss2masto).

## Conclusion

I found this a simple, fun project to bring some additional content to my Mastodon instance. The rss2masto tool was easy to setup, and not difficult to modify for my needs. 

10/10 - would bot again.
