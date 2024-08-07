+++
date = "2024-07-28T10:28:00+00:00"
title = "Application Screenshots on macOS"
slug = "2024/07/application-screenshots-on-macos"
author = "Alan Pope"
tags = ['macos', 'bash', 'screenshot', 'scripting', 'streaming', 'newsletter-meta']
+++

I initially started typing this as *short* `-[ Contrafibularities ]-` segment for my free, weekly [newsletter](https://newsletter.popey.com/). But it got a bit long, so I broke it out into a blog post instead.

## About that newsletter

The newsletter is emailed every Friday - [subscribe here](https://newsletter.popey.com/subscription/form), and is [archived](https://newsletter.popey.com/archive) and available via [RSS](https://newsletter.popey.com/archive.xml) a few days later. I talked a bit about the process of setting up the newsletter on [episode 34](https://linuxmatters.sh/34/) of [Linux Matters Podcast](https://linuxmatters.sh/). Have a listen if you're interested.

[![Linux Matters 34](/blog/images/2024-02-20/linuxmatters-banner-3000x750_30.png)](https://linuxmatters.sh/34/)

*Patreon [supporters](https://linuxmatters.sh/support) of [Linux Matters](https://linuxmatters.sh/) can get the show a day or so early, and without adverts.* 🙏

## Going live!

I have a work-supplied M3 MacBook Pro. It's a lovely device with ludicrous battery endurance, great screen, keyboard and decent connectivity. As an ex-Windows user at work, and predominantly Linux enthusiast at home, macOS throws curveballs at me on a weekly basis. This week, screenshots.

I scripted a 'going live' shell script for my personal [live streams](https://www.youtube.com/@AlanPope/streams). For the title card, I wanted the script to take a screenshot of the running terminal, [Alacritty](https://github.com/alacritty/alacritty). I went looking for ways to do this on the command line, and learned that macOS has shipped a `screencapture` command-line tool for some time now. Amusingly the `man` page for it says:

```text
DESCRIPTION
     The screencapture utility is not very well documented to date.
     A list of options follows.
```

and..

```text
BUGS
     Better documentation is needed for this utility.
```

This is 100% correct.

## How hard can it be?

Perhaps I'm too used to [scrot](https://en.wikipedia.org/wiki/Scrot) on `X11`, that I have used for over [20 years](https://mastodon.social/@popey/112803904854241024). If I want a screenshot of the current running system, just run `scrot` and *bang* there's a PNG in the current directory showing what's on screen. Easy peasy.

On macOS, run `screencapture image.png` and you'll get a screenshot alright, of the desktop, your wallpaper. Not the application windows carefully arranged on top. To me, this is **somewhat** obtuse. However, it is also *possible* to screenshot a window, if you know the `<windowid>`. 

From the `screencapture` man page:

```text
     -l      <windowid> Captures the window with windowid.
````

There appears to be no straightforward way to actually *get* the `<windowid>` on macOS, though. So, to discover the `<windowid>` you might want the `GetWindowID` utility from [smokris](https://github.com/smokris/GetWindowID) (easily installed using Homebrew). 

That's fine and relatively straightforward if there's only one Window of the application, but a tiny bit more complex if the app reports multiple windows - even when there's only one. Alacritty announces multiple windows, for some reason.

```bash
$ GetWindowID Alacritty --list
"" size=500x500 id=73843
"(null)" size=0x0 id=73842
"alan@Alans-MacBook-Pro.local (192.168.1.170) - byobu" size=1728x1080 id=73841
```

*FINE*. We can deal with that:

```bash
$ GetWindowID Alacritty --list | grep byobu | awk -F '=' '{print $3}'
73841
```

You may then encounter the mysterious `could not create image from window` error. This threw me off a little, initially. Thankfully I'm far from the first to encounter this. 

Big thanks to this [rancher-sandbox](https://github.com/rancher-sandbox/), [rancher-desktop](https://github.com/rancher-sandbox/rancher-desktop/) [pull request](https://github.com/rancher-sandbox/rancher-desktop/pull/4900/files) against their [screenshot docs](https://github.com/rancher-sandbox/rancher-desktop/blob/main/screenshots/README.md). Through that I discovered there's a macOS security permission I had to enable, for the terminal application to be able to initiate screenshots of itself. 

A big thank-you to both of the above projects for making their knowledge available. Now I have this monstrosity in my script, to take a screenshot of the running Alacritty window:

```bash
screencapture -l$(GetWindowID Alacritty --list | \
	grep byobu | \
	awk -F '=' '{print $3}') titlecard.png
```

If you watch any of my [live streams](https://www.youtube.com/@AlanPope/streams), you may notice the title card. Now you know how it's made, or at least how the screenshot is created, anyway.
