+++
date = "2023-08-29T12:00:00-00:00"
title = "Why use Microsoft Edge on Linux"
slug = "2023/08/why-use-microsoft-edge-on-linux"
author = "Alan Pope"
tags = ['ubuntu', 'linux', 'microsoft', 'edge', 'browser']
+++

Yesterday, I [wrote](2023/08/six-months-of-crashes-in-ubuntu) a little about the applications I've seen crash on my Ubuntu Linux laptop over the last six months.

Some people questioned why I use Microsoft Edge as my primary web browser on Ubuntu. I thought I'd write up why, and how a couple of the built-in features are appealing to me. 

tl;dr it's multiple profiles, stability, speed, tab sleep, and vertical tabs.

## Multiple personality ~~dis~~order

I have tried to keep work and personal browser profiles separate for some years now. There are two main reasons I do this. Firstly, my work-related search history, recent tabs and other activities are confined to one browser personality. My personal stuff like shopping, email, social media and other fun stuff is sectioned off from work. Secondly, by having work in its own profile, I can just close that profile at the end of the day.

**"But Alan, just turn off your work computer or walk away from it."**

Well, like many people in tech, I often use one machine for work and personal activites. I haven't gone to a company-owned office where I'm assigned a single work PC which is 100% dedicated to business activities for many years. I have a laptop which I use primarily for work, and partly for fun. 

One reason why I separate profiles is because I have multiple accounts on each online service for both personal and work-related activites. For example I have a personal Mastodon account, and a work one, a personal YouTube channel, and a work one. I don't want to have to keep logging out/in, or switching accounts when I can just alt-tab between browsers to achieve the same thing.

Work and personal aren't the only profiles I keep. I have a separate profile for the [podcast](https://linuxmatters.sh) which is signed into all kind services, and one for an old GMail account I use to access things my own Google Apps account can't get to.

All the major modern browsers have the capability to separate work and personal profiles. Firefox has two methods: profiles and [multi-account containers](https://support.mozilla.org/en-US/kb/containers). The former has been around 'forever' (in browser terms), whereas the latter only arrived fairly recently.

[![Firefox profile manager](/blog/images/2023-08-29/firefoxprofile.png)](/blog/images/2023-08-29/firefoxprofile.png)

I used Firefox for many years on Windows at work, and on Linux at home. I've never been very happy with the multiple profile support, as it's quite janky and poorly integrated. So I ended up having separate browsers. Firefox for work, Chrome for personal stuff. While this is common and a straightforward split, this is just messy. 

When multi-account container tabs arrived in Firefox, I was pretty happy. I could separate, to some degree, the various online personalities I needed. It wasn't perfect, as I'd have some tabs of one type (personal) and some of another type (work) all mixed together in one window. I prefer the full window context switch. Having them all jumbled up was a bit messy.

The fun didn't last, though.

## Firefox is on fire

On quite a few occasions, Firefox would crash, and it would take out all my profiles and all my containers. By "take out" I mean, it nuked them. I would restart the browser and it would have no memory of any previous tabs I'd opened, the history, cookies, or anything. All gone.

I tried to debug the problem and even restored my profiles from backups, but it never quite worked. Something was missing or broken, so the browser would need a clean start with a fresh profile.

## White out

Another thing that used to happen with Firefox sometimes was tab white-out. The browser would suddenly decide one day that it wouldn't render anything at all. Every single tab I'd bookmarked became a bright white space of nothingness. I tried debugging this whenever it happened by removing extensions and fiddling with settings. Nothing worked. I'd have to start again with a fresh profile.

This happened enough for me to eject the Firefox browser into the sea and use something else.

## Perfect profile permutation

I switched to Google Chrome. It was more stable and didn't appear to eat my profiles on a regular basis like Firefox did. I also tried Chromium and had much the same experience as Chrome. The two worked pretty much identically. 

In Chrom{e|ium}, the mechanism to create and switch profiles is very well integrated into the UI. Just a couple of clicks and you can create as many new profiles as needed. Each one has its own set of browser history, cookies, bookmarks, extensions etc.

Here are three separate browser windows, all Chrome, each with its own profile.

[![Chrome Profiles](/blog/images/2023-08-29/chromeprofiles.png)](/blog/images/2023-08-29/chromeprofiles.png)

When switching, each one is a separate window. This mental model of 'One window for work, one window for personal' resonates with me. I also move the windows onto separate workspaces to further reinforce 'This workspace (and all windows within it) are work-related, the others are not'. 

I use this workflow on Linux and MacOS. Windows 10 also has multiple workspaces/desktop/tasks, but I don't use Windows for work. Windows is basically a game launcher OS.

Once I started using the profile switcher in Chrome, it was pretty certain I was never going back to Firefox. 

## Extension rebellion

At some point Chrome started to get very unhappy with some extensions I used, and would crash. 

I'd often have a bunch of tabs open at once. This led to a lot of wasted CPU utilisation as random javascript or other dynamic stuff happens in tabs I'm not looking at. I've used extensions to put tabs to 'sleep' when they're not in use.

On Chrome I used one for a long while. Multiple times the extension failed in some way and lost every tab I had open. 

I would remove or find replacement extensions. But it always felt like I was chasing a 'unicorn' stable browser with all the features I needed added via extensions. I got a little irritated by the instability, and went looking for another browser.

## Brave dabbling

I tried [Brave](https://brave.com/) which offered built-in privacy features and advert blocking by default, meaning fewer extensions were required. It worked fine, but then it started getting full of crypto-bullshit. So I dumped it. 

## On the edge

In late 2020, Microsoft [announced](https://blogs.windows.com/msedgedev/2020/10/20/microsoft-edge-dev-linux/) preview dev builds of their Chromium-based Edge browser for Linux. I thought I'd give it a try. It worked out, and has now been my default browser on Linux, Windows, and MacOS for three years.

There's a stable build, easily installed via a downloadable deb for Ubuntu. There's also an rpm, if that's your jam. They also have beta and dev builds, if you like to ride that train. Once you install the deb, it adds a `sources.list` entry. That means you get updates via the usual command line or graphical software update tools.

```bash
alan@nuc:~$ apt search microsoft-edge
Sorting... Done
Full Text Search... Done
microsoft-edge-beta/stable 117.0.2045.9-1 amd64
  The web browser from Microsoft

microsoft-edge-dev/stable 118.0.2048.1-1 amd64
  The web browser from Microsoft

microsoft-edge-stable/stable 116.0.1938.62-1 amd64 [upgradable from: 116.0.1938.54-1]
  The web browser from Microsoft
```

I found Microsoft Edge to be faster and more stable than either Firefox or Chrom{e|ium}. That matters quite a bit to me; over and above all the other nonsense in this blog, speed and stability are essential.

## Profile support

Edge has essentially the same profile management as Chrome, which makes me very happy. Big *tick* there.

## Tab sleep

I mentioned I like the capability to put tabs I'm not using to sleep. Microsoft Edge has this [built in](https://www.microsoft.com/en-gb/edge/features/sleeping-tabs-at-work?form=MT00D8).

[![Sleeping tabs](/blog/images/2023-08-29/sleepytabs.png)](/blog/images/2023-08-29/sleepytabs.png)

No need for janky extensions. This feature works well. Tabs get 'dimmed' when they're sleeping. 

## Vertical tabs

If you have a lot of tabs open they can often be hard to find in the tab bar. With each new tab opened, the amount of space for the page title shrinks. Vertical tabs solves this, as your open websites are listed down the side of the browser, not along the top. This makes total sense in the widescreen world. Still plenty of room for page content, even with some of the user interface taken up with page titles.

This is vertical tabs, where you can read at least part of each page title.

[![Vertical tabs](/blog/images/2023-08-29/verticaltabs.png)](/blog/images/2023-08-29/verticaltabs.png)

Here's horizontal tabs where the favicon and maybe a few letters are visible. 

[![Horizontal tabs](/blog/images/2023-08-29/horizontaltabs.png)](/blog/images/2023-08-29/horizontaltabs.png)

This makes a big difference if you have a bunch of tabs open on one site, for example multiple documentation pages, or pull requests.

**But Alan, just close some tabs.**

No. I'm not using a 4MB Chromebook with a Celeron CPU. I am capable of having a few more tabs open.

Also, no extension needed.

## Web apps

A carry-over from Chrome, but implemented better in Edge is the web app.

For those not in the know, a web app (as far as I am concerned) is a website running in its own browser window as if it were an application. You can do this to any website, but it makes sense to do this for things you might think of as "applications". I use it for Mastodon, YouTube, Spotify, WhatsApp, Notion, Linear and my banking website, no need for an additional app.

It's super easy to set up. Just go to whatever site you want to turn into an app, then click the kebab menu -> Apps -> Install this site as an app. Here's what it looks like:

[![Twitch webapp](/blog/images/2023-08-29/twitchwebapp.png)](/blog/images/2023-08-29/twitchwebapp.png)

Edge then pops that out as a separate window. A desktop file is created so you can launch it from your desktop menu/launcher/search. The icon is placed in your launcher, and you can alt-tab or click on it, just like any other application. None of this is revolutionary, it's just a really nice little productivity tip that I use on all my machines: Linux, MacOS, and Windows. 

To illustrate, here's my Ubuntu desktop launcher at the bottom of the screen. Eight of these are just web apps. Spotify is a great example. It can play music just fine in a browser window. So there is no need for the fat knacker that is the Spotify desktop app.

[![Webapps](/blog/images/2023-08-29/webapps.png)](/blog/images/2023-08-29/webapps.png)

Three dots under the Edge icon on the far left also show that I've got multiple windows as different profiles open. 

Some have suggested I could just open the website in a new window. It's not the same experience.

## Imperfection

No browser is perfect, of course. This popup menu that appears when you highlight some text on a page needs to die in a fire, for one! I disable it every time I create a new browser profile. 

[![Clippy 2.0](/blog/images/2023-08-29/hilight.png)](/blog/images/2023-08-29/hilight.png)

This stupid Bing sidebar can also get in the sea.

[![Clippy 3.0](/blog/images/2023-08-29/bingsidebar.png)](/blog/images/2023-08-29/bingsidebar.png)

Hide it with the button above the cog, in the lower right corner.

## Reasons not to use Edge

"Eww, Micro$oft"

Ok, whatever. That's not a reason.

## Firefox! Freedom

**"But Alan! Firefox is the embodiment of freedom! What about (insert reason why Mozilla is the saviour of the open web)..."**

Get back to me when Mozilla refocuses on making a decent browser †.

† and add better multi-profile support ‡ 

‡ and tab-sleep ⹋

⹋ and vertical tabs...

Until then, I'll use Edge, because it works for me. If something else works for you, that's awesome. 