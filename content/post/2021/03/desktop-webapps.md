+++
date = "2021-03-09T12:00:00-00:00"
title = "Desktop Webapps"
slug = "2021/03/desktop-webapps"
author = "Alan Pope"
tags = ['ubuntu', 'linux', 'software', 'webapp', 'desktop']
+++

I appreciate many people already know how to do this, but I'm surprised how many don't, or don't realise what it does. Forgive me if you know about this feature of Google Chrome. 

A little while back I managed to win two separate eBay auctions for 16GiB DDR3 SODIMMs to install in my ThinkPad T450. This took it from the previously installed 16GiB to the *expansive* 32GiB.

*Then I opened Google Chrome.*

So the joke goes.

Well, for me, yes, the browser is indeed a chunky beast. That's partly my own fault though. I'm a bit of a tab-hoarder, but I'm trying to improve. Right now I have five pinned tabs in a personal browser session, and nine pinned in a work browser session. In addition there's any number of *dynamically* opened tabs in both sessions. 

I used to keep many tens of tabs open, such that you could barely even make out the favicon for each one, and would have to guess at which tab was which. Not an efficient way to work, I know. So I have trimmed things down and try to use fewer tabs.

What actually took more RAM on my system was the plethora of Electron applications I'd use. I would often have a selection of [Slack](https://snapcraft.io/slack), [Discord](https://snapcraft.io/discord), [Spotify](https://snapcraft.io/spotify), [Mattermost](https://snapcraft.io/mattermost-desktop), [Caprine](https://snapcraft.io/caprine), Element (nee Riot), [VS Code](https://snapcraft.io/code), [Standard Notes](https://snapcraft.io/standard-notes), [Signal](https://snapcraft.io/signal-desktop) and more open. All are [chonkers](https://reddit.com/r/chonkers). Indeed I have opined this problem before:

{{< rawhtml >}}
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I am in 6 slack channels. 1.5GB RAM consumed by the desktop app. In 100+ IRC channels. 25MB consumed by irssi. The future is rubbish.</p>&mdash; Alan Pope 🍺🐧🐱🇬🇧🇪🇺 (@popey) <a href="https://twitter.com/popey/status/793399003463516160?ref_src=twsrc%5Etfw">November 1, 2016</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
{{< /rawhtml >}}

More recently I have tried to reduce my use of these [heckin chonkers](https://www.reddit.com/r/Chonkers/comments/acqbd4/heres_a_chart_to_help_classify_your_chonker/) and seek alternatives, but have the same functionality I enjoy or have to use.

For some, I can use a leaner option such as [ncspot](https://snapcraft.io/ncspot) - the lean and fast command-line Spotify client written in Rust. For others, I have eschewed the Electron app for a webapp. Many have told me "Just use a tab in a browser" for those applications. While true, the usability problem I have is that those applications are then extra-clicks away from a typical context switch.

I'm of the "Alt-Tab" generation. I stab the familiar key-combo to alternate between the two primary applications I'm working on at the moment. That's typically a pairing of code editor and terminal, a code editor and browser or some other combination. As mentioned I also tend to leave a bunch of applications open, and then Alt-Tab-Tab-Tab until I hit the app I want. 

Sometimes I'll use the Super+Numeral to fast-switch to a specific app from the launcher. Maybe I'll also click a specific icon in the launcher to bring it to the front. But predominantly I'm a creature of habit, and that habit is Alt-Tab-Tab-Tab, Shift-Tab to sail past the application I want, stamp on the brakes and go back to the one I need.

So having all my favourite applications as tabs doesn't fit my *workflow* (as I believe they call it). Pressing Alt-Tab then clicking a tab, or Alt-Tab then Alt-Num - especially when I have more than 10 tabs open - isn't gonna work for me. I like to see the familiar icon of an application, and switch to it directly, not via a Alt-Two-Step. 

Aside: Worse still is the pinky-buster Alt-Tab, Alt-Grave combo to bring all the windows of an application to the front *then* switch to the right one. Hate that with a passion. Demented behaviour.

So, I have a better compromise, Web Apps. Not new, they've been around forever, but they've had a resurgence on my computers as I bin the fatty applications and replace them with a browser window.

Here's how it works. Open the website in question to be *webappified*, for example [Tweetdeck](https://tweetdeck.twitter.com/). In Google Chrome (for this is the web browser I use primarily), hit the three dots (kebab menu) -> More tools -> Create shortcut. 

![Chrome menu](/blog/images/2021-03-09/chrome.png)

In the popup, give the application/website a name, and tick the box.

![App name](/blog/images/2021-03-09/name.png)

Click the "Create" button. 

That's it. You'll get a new icon in your desktop launcher which you can pin to your favourites. It's easy and fast to launch and close like any other application, and can be Alt-Tabbed to. I have setup a ton of these on my machine for all manner of websites, but also to replace those *chonker* electron applications I used to use.

It's better than it was, that's for sure...

![ps_mem.py](/blog/images/2021-03-09/ps_mem.png)

More work to do though, clearly!