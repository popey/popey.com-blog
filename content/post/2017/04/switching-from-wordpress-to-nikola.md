+++
date = "2017-04-18T12:00:00-07:00"
title = "Switching from WordPress to Nikola"
slug = "2017/04/switching-from-wordpress-to-nikola"
+++


## Goodbye WordPress!

For a long while my personal [blog](https://popey.com/blog/) has been running [WordPress](https://wordpress.org/). Every so often I've looked at other options but never really been motivated to change it, because everything worked, and it was not too much effort to manage.

Then I got 'hacked'. ```:(```

I host my blog on a [Bitfolk VPS](https://bitfolk.com/). I had no idea my server had been compromised until I got a notification on [Boxing Day](https://en.wikipedia.org/wiki/Boxing_Day) from the lovely Bitfolk people. They informed me that there was a deluge of spam originating from my machine, so it was likely compromised. Their standard procedure is to shutdown the network connection, which they did.

At this point I had access to a console to diagnose and debug what had happened. My VPS had multiple copies of WordPress installed, for various different sites. It looks like I had an old theme or plugin on one of them, which the attackers used to splat their evil doings on my VPS filesystem.

Being the Christmas holidays I didn't really want to spend the family time doing lots of phorensics or system admin. I had full backups of the machine, so I requested that Bitfolk just nuke the machine from orbit and I'd start fresh.

Bitfolk have a really handy [self-service provisioning tool](https://tools.bitfolk.com/wiki/Self-serve_installer) for just these eventualities. All I needed to do was ssh to the console provided and follow the instructions on the wiki, after the network connection was re-enabled, of course.

However, during the use of the self-serve installer we unconvered a bug and a billing inconsistency. Andy at Bitfolk spent some time on Boxing Day to fix both the bug and the billing glitch, and by midnight that night I'd had a bank-transfer refund! He also debugged some DNS issues for me too. That's some above-and-beyond level of service right there!

## Hello Nikola!

Once I'd got a clean Ubuntu 16.04 install done, I had a not-so-long think about what I wanted to do for hosting my blog going forward. I went for [Nikola](https://getnikola.com/) - a static website generator. I'd been looking at Nikola on and off since talking about it over a beer with [Martin](http://ubuntu-mate.org/) in Heidelberg

![Beer in Heidelberg](/blog/images/2017-04-18/IMG_20160718_213929.jpg)

As I'd considered this before, I was already a little prepared. Nikola supports [importing](https://getnikola.com/handbook.html#importing-your-wordpress-site-into-nikola) data from an existing WordPress install. I'd already exported out my WordPress posts some weeks ago, so importing that dump into Nikola was easy, even though my server was offline.  

The things that sold me on Nikola were pretty straightforward.

Being static HTML files on my server, I didn't have to worry about php files being compromised, so I could take off my sysadmin hat for a bit, as I wouldn't have to do WordPress maintenance all the time.

Nikola allows me to edit offline easily too. So I can just open my text editor of choice start bashing away some markdown (other formats are supported). Here you can see what it looks like when I'm writing a blog post in todays favourite editor, [Atom](https://atom.io/). With the markdown preview on the right, I can easily see what my post is going to look like as I type. I imagine I could do this with WordPress too, sure.

![Writing this post](/blog/images/2017-04-18/atom.png)

Once posts are written I can easily preview the entire site locally before I publish. So I get two opportunities to spot errors, once in Atom while editing and previewing, and again when serving the content locally. It works well for me!

## Nikola Workflow

Nikola is configured easily by editing ```conf.py```. In there you'll find documentation in the form many comments to supplement the online [Nikola Handbook](https://getnikola.com/handbook.html). I set a few things like the theme, disqus comments account name, and configuration of the Bitfolk VPS remote server where I'm going to host it. With ssh keys all setup, I configured Nikola to deploy using rsync over ssh.

When I want to write a new blog post, here's what I do.

```
cd popey.com/site
nikola new_post -t "Switching from WordPress to Nikola" -f markdown
```

I then edit the post at my leisure locally in Atom, and enable preview there with ```CTRL+SHIFT+M```.

Once I'm happy with the post I'll build the site:-

```
nikola build
```

I can then start nikola serving the pages up on my laptop with:-

```
nikola serve
```

This starts a webserver on port 8000 on my local machine, so I can check the content in various browsers, and on mobile devices should I want to.

Obviously I can loop through those few steps over and again, to get my post right. Finally once I'm ready to publish I just issue:-

```
nikola deploy
```

This sends the content to the remote host over rsync/ssh and it's live!

## Conclusion

Nikola is great! The documentation is comprehensive, and the maintainers are active. I made a mistake in my config and immediately got a comment from the upstream author to let me know what to do to fix it!

I'm only using the bare bones features of Nikola, but it works perfectly for me. Easy to post & maintain and simple to deploy and debug.

Have you migrated away from WordPress? What did you use? Let me know in the comments below.
