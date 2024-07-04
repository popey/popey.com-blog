+++
date = "2020-12-21T12:00:00-00:00"
title = "Blogging with Hugo"
slug = "2020/12/blogging-with-hugo"
author = "Alan Pope"
tags = ['software', 'hugo', 'linux']
+++

Some years ago I switched my blog from [Wordpress](https://wordpress.com/) to [Nikola](https://getnikola.com/). I wrote a [blog post](https://popey.com/blog/2017/04/switching-from-wordpress-to-nikola/) about the move, but within a year or so, I'd pretty much stopped blogging completely. 

More recently I discovered [Hugo](https://gohugo.io/), and used it for a couple of other sites I own. [popeyspades](https://popeyspad.es/) is a simple blog to promote a game server I was running at the time. 

![popeyspades site](/blog/images/2020-12-21/popeyspades.png)

[Make A Linux App](https://makealinux.app/) is a single-serving site that seeks to promote app development for Linux and discourage the proliferation of Linux distributions. 

![makealinuxapp site](/blog/images/2020-12-21/makealinuxapp.png)

Hugo is pretty versatile. I really like it.

When I set up [Make A Linux App](https://makealinux.app/), I put the site's source on [GitHub](https://github.com/popey/makealinux.app) and created some simple infrastructure to automate update publishing. I found Hugo's blogging part pleasant and the automation very easy to implement, so I decided to reboot my [popey.com/blog](https://popey.com/blog). 

Here's the basics of what I did to gets started, in case anyone else fancies running a blog on [Hugo](https://gohugo.io/). This is mostly a loose set of notes I made while setting up. Refer to the [Hugo documentation](https://gohugo.io/getting-started/) for more professional docs ;)

## tl;dr

In short, I create a blog post in markdown on my local PC, test that it works locally, proof-read, and if I'm happy I push it to GitHub and forget about it. A cron job on my VPS (provided by [Bitfolk](https://bitfolk.com/)) runs periodically to grab the code from GitHub, build the site and publish it. 

## Initial setup

On my laptop, desktop or wherever I want to blog:

### Install Hugo

`$ snap install hugo`

### Create a site

```text
$ mkdir ~/hugo/
$ cd ~/hugo
$ hugo new site popey.com-blog
```

### Add a theme

I went for [GhostWriter](https://github.com/roryg/ghostwriter), but there's tons of options if you browse the [Hugo themes](https://themes.gohugo.io/) site.

Grab the release tarball, and unpack it in `~/hugo/popey.com-blog/themes` such that there's now a folder `~/hugo/popey.com-blog/themes/ghostwriter` containing `theme.toml` among other assets.

### Configure Hugo

Edit `~/hugo/popey.com-blog/config.toml` and tweak as per the [Hugo documentation](https://gohugo.io/getting-started/configuration/). Here's some ideas for what mine looked like at this point:

```toml
baseurl = "https://popey.com/blog/"
title = "popey.com/blog"
languageCode = "en-gb"
theme = "ghostwriter"

[Params]
    mainSections = ["post"]
    intro = true
    headline = "Alan Pope's blog"
    description = "A bit of personal space for writing"
    github = "https://github.com/popey/popey.com-blog"
    twitter = "https://twitter.com/popey"
    email = "alan@popey.com"
    opengraph = true
    shareTwitter = true
    dateFormat = "Mon, Jan 2, 2006"

[Permalinks]
    post = "/:year/:month/:filename/"
```

### Testing

Hugo can serve the pages up locally, before any embarassing errors are published for the world to see. Simply run `hugo serve` in the directory:

```text
$ cd ~/hugo/popey.com-blog/
$ hugo serve
```

You'll get output like this, and can then visit the posted local URL (e.g. http://localhost:1313/blog/) in a browser to test.

```text
$ hugo serve --buildFuture
Start building sites … 

                   | EN   
-------------------+------
  Pages            | 101  
  Paginator pages  |   5  
  Non-page files   |   0  
  Static files     |  70  
  Processed images |   0  
  Aliases          |  40  
  Sitemaps         |   1  
  Cleaned          |   0  

Built in 91 ms
Watching for changes in /home/alan/hugo/popey.com-blog/{archetypes,content,static,themes}
Watching for config changes in /home/alan/hugo/popey.com-blog/config.toml
Environment: "development"
Serving pages from memory
Running in Fast Render Mode. For full rebuilds on change: hugo server --disableFastRender
Web Server is available at http://localhost:1313/blog/ (bind address 127.0.0.1)
Press Ctrl+C to stop

```

If you plan to post-date articles, add the `--buildFuture` flag to the `hugo serve` to ensure you see posts which haven't got to their publish date/time yet.

### Create posts

To create a post, use the `hugo new` command with the path to the blog post filename. I have arranged mine by year and month, and use markdown as my language of choice.

```text
$ hugo new post/2020/12/blogging-with-hugo.md
```

The file `./content/post/2020/12/blogging-with-hugo.md` will be created with boilerplate metadata:

```toml
---
title: "Blogging With Hugo"
date: 2020-12-21T21:18:38Z
draft: true
---
```

Start editing with your text editor. 

![Sublime Text](/blog/images/2020-12-21/st-preview_50.png)

Once you start maintaining content, the post should show up in your browser. The `hugo serve` command will dynamically rebuild the page each time the markdown file is saved, making it super easy to iterate on the content quickly.

![Browser preview](/blog/images/2020-12-21/browser_50.png)

### Adding images

I place images in `./static/images/` in a 'neat' directory hierarchy and then use this syntax to embed them in the posts.

```markdown
![Alt text description](/blog/images/2020-12-21/filename.png)
````

## Push changes

This isn't a git tutorial. Use whatever method you feel comfortable with to push your changes to a git repo somewhere. Personally I use [Sublime Merge](https://snapcraft.io/sublime-merge) which looks like this as I write this post.

![Sublime Merge and Preview](/blog/images/2020-12-21/sm-preview_50.png)

Other options include [GitKraken](https://www.gitkraken.com/), [GitHub Desktop](https://desktop.github.com/) and plenty of others. Or you could use `git` on the command line like an actual ~~animal~~ developer.

## Server config

I'm not going to cover how you set up the server because there are a billion guides online for setting up a VPS with Apache or whatever webserver you prefer. 

### Webserver

My web server is configured to serve from `/srv/<domain>/www` so, `/srv/popey.com/www/`. The blog lives under `/srv/popey.com/www/blog`.

### Cron job

I threw together this shell script, which updates a local directory from GitHub via a simple `git pull`. It then uses the `hugo` command to build the public pages in `public/`, which, if successful, is copied to the webserver directory.

```bash
#!/bin/bash

cd "/home/alan/blog/popey.com-blog"
rm -rf "/home/alan/blog/popey.com-blog/public/*"
/usr/bin/git pull
/snap/bin/hugo
if [[ "$?" == "0" ]]; then
/usr/bin/rsync -avz --delete public/* /srv/popey.com/www/blog/
fi
```

I have configured this cron job to run at 45 mins past each hour.

```text
45 * * * * cd /home/alan/blog && ./updateblog.sh
```

I can optionally `ssh` into the server and manually run that script if I want to update some content that has been pushed to the git repo immediately.

## Updating content

Typically, I'll clone the repo and go through the above process again to edit content. Alternatively, for ninja "in production" edits, I might use the web-based editor built into GitHub.

That's essentially it. I can schedule posts to appear on the site only at a particular date/time by setting a future time in the `date` field in each post meta-data. Of course, they're public in the git repo as soon as I push, but they'll only get publicly shown on the blog when the next cron job runs after the time specified. That's good enough for me! 

## Conclusion

I find Hugo to be a super friendly, well-documented, and easy-to-modify way to create and publish content on my own site. No PHP or MySQL is needed ;)
