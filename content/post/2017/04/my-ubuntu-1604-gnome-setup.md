+++
date = "2017-04-15T21:50:00-07:00"
title = "My Ubuntu 16.04 GNOME Setup"
slug = "2017/04/my-ubuntu-1604-gnome-setup"
+++


## My Ubuntu 16.04 GNOME Setup

This is a post for friends who saw my desktop screenshot and anyone else who likes Unity and is looking at alternatives. A big thanks to [Stuart Langridge](https://www.kryogenix.org/days/2017/04/05/making-gnome-shell-feel-like-unity/) and [Joey Sneddon](http://www.omgubuntu.co.uk/2017/04/make-gnome-shell-look-feel-like-unity) whose linked posts inspired some of this.

The [recent news](http://www.omgubuntu.co.uk/2017/04/ubuntu-18-04-ship-gnome-desktop-not-unity) that upcoming versions of [Ubuntu](http://ubuntu.com/) will use [GNOME](https://www.gnome.org/) as the default desktop rather than Unity, made me take another look at the GNOME desktop

If you're not interested in my opinion but just want to know what I did, then jump to "Migration from Unity to GNOME" below.

## Why Unity?

I'm quite a Unity fan - yes, we exist! I've used it on my laptops and desktops my daily desktop pretty much since it came out, long before I worked at Canonical. I've tried a few other desktop environments, usually for no more than a week or so before getting frustrated and running back to Unity.

Here's what my typical desktop looks like on Ubuntu 16.04

![Unity as I use it](/blog/images/2017-03-28-19-07-30-unity.png)

At this point I'm sure there are a few people reading this and wondering why I like Unity, incredulous that anyone would. I get this from time to time. Some  people seem to bizzarely think *"I don't like Unity, therefore nobody does."* which is ludicrous, but very obviously happening.

Anecdotally, I still see way more Unity screenshots than other desktops in random non-Linux videos on YouTube, on stranger's laptops on trains & on [*"millions of dollars"*](http://www.omgubuntu.co.uk/2017/01/dell-talk-linux-laptops-distros-sales) worth of laptops sold by Dell, System76 etc. I've also been told in person by people who like it, but don't like speaking up for fear of unwanted confrontation. ```¯\_(ツ)_/¯ ```

But it's a vocal minority of Linux users who tell me what desktop I (and everyone else) shouldn't use. Screw them, it's my PC, I'll run what I like. ```:)```

However, that said, Unity is [*"dead"*](https://arstechnica.co.uk/information-technology/2017/04/ubuntu-unity-is-dead-back-to-gnome/), apparently, despite it having a few years of support left on the 16.04 LTS release. So I thought I'd take a fresh look at GNOME to see if I can switch to it easily and keep the parts of the Linux desktop I like, change the things I don't and tolerate the things I can't.

For me, it's not one single feature that made me come back to Unity time and time again, but a variety of reasons. Here's a non-exhaustive list of features I enjoy:-

  * Dash - Single button + search to launch apps and find files
  * HUD - Single button + search to find application features in menus
  * Launcher - Quick access via keyboard (or mouse) to top 10+ apps I use, always on screen
  * Window controls - Top left is their rightful place
  * Menus - In the titlebar or top bar (global)
  * App & Window switch behaviour via Alt+Tab & Alt+(key-above-tab)
  * App Spread - Super+S and Super+W to see all windows, or all windows of an app
  * Focus follows mouse - Initially global menu [broke](https://bugs.launchpad.net/unity/+bug/674138) this but it was fixed

Much of this comes down to *"is really well managed with just a keyboard"* which is amusing given how many people tell me Unity (before Unity 8) is awful because it's designed for touch screens.

The things I think could be improved in Unity comprise a pretty short list, and if I thought really hard, I might expand this. If I did they'd probably only be papercut nit-picks rather than significant issues. So, I would have liked these things to have been fixed at some point, but that probably won't happen now ```:(```

  * [Memory footprint](https://flexion.org/posts/2014-03-memory-consumption-of-linux-desktop-environments/) - It would be nice if the RAM usage of Unity was lower.
  * CPU/GPU overhead - Sometimes it can take a second or two to launch the dash, which should be near-instant all the time
  * Incompleteness - There were interesting designs & updates which never really got finished in Unity7
  * Cross distro support - It would have been nice to have Unity on other distros than just Ubuntu

So let's say a fond farewell to my primary desktop for over 6 years and make the switch.

## Migration from Unity to GNOME

With that said, to move from Unity to GNOME on my ThinkPad T450 running Ubuntu 16.04 LTS I did the following:-

### Install GNOME

I decided to go with the GNOME version shipping in the archive. People have suggested I try PPAs, but for my primary desktop I'd rather keep using the archive builds, unless there's some *really* compelling reason to upgrade.

So I backed up my laptop - well, I didn't - my laptop is backed up automatically every 6 hours, so I just figured if anything went belly-up I'd go back to the earlier backup. I then installed GNOME using this command:-

```
sudo apt install ubuntu-gnome-desktop^
```

Logout from Unity, choose GNOME at the login screen and we're in.

![Default GNOME Desktop](/blog/images/2017-04-15-21-30-59-gnome1.png)

![Default GNOME Desktop](/blog/images/2017-04-15-21-31-06-gnome2.png)


### First impresssions

These are the things that jump out at me that I don't like and how they're fixed. One thing that's pretty neat about GNOME Shell is the ability to modify it via extensions. For most of the things I didn't like, there was an extension to change the behaviour.

Some are just plain extensions installed via [GNOME Extensions](https://extensions.gnome.org), but some needed extra fiddling with Tweak Tool.

#### Activites hot corner

I find this too easily triggered, so I used [No TopLeft Hot Corner](https://extensions.gnome.org/extension/118/no-topleft-hot-corner/). Later, I also discovered the [Hide Activtes Button](https://extensions.gnome.org/extension/744/hide-activities-button/) which helps even more by moving the window controls to the very top left, without the "Activities" in the way. I can still use the Super key to find things, with Activities hidden.

#### No Launcher

GNOME hides the launcher until you press Activites or the Super key. I fixed that with [Dash to Dock](https://extensions.gnome.org/extension/307/dash-to-dock/).

In Tweak Tool, Dash to Dock settings -> Position and size -> tick "Panel mode: extend to the screen edge". I set "Intelligent Autohide" off, because I never liked that feature in Unity, although it had some vocal fans. Also I set the pixel size to 32px. In the Launchers tab I set "Move the applications button at the beginning of the dock".

#### Legacy indicators

Apparently developers are terrible people and haven't updated their indicators to some new spec, so they get relegated to the **"Lower Left Corner of Shame"**. This is dumb. I used [TopIcons Plus](https://extensions.gnome.org/extension/1031/topicons/) to put them where $DEITY intended, and where my eyes are already looking, the top right corner.

#### Volume control

In Unity I'm used to adjusting the master volume with the mouse wheel while the sound indicator is clicked. I fixed this with [Better Volume Indicator](https://extensions.gnome.org/extension/759/better-volume-indicator/)

#### Giant titlebars

GNOME always feels *to me* like it's designed to waste vertical space with titlebars so I added [Pixel Saver](https://extensions.gnome.org/extension/723/pixel-saver/).

#### Missing Rubbish Bin

I like having the Trash / Rubbish Bin / Recycle Bin / Basket on screen. In Unity it's at the bottom of the launcher. I couldn't find an extension which did this so I used [trash](https://extensions.gnome.org/extension/48/trash/) extension to move it to the top panel indicator area.

#### Slow animations

Some things felt a bit sluggish to me, so it was recommend that I install the [Impatience](https://extensions.gnome.org/extension/277/impatience/) extension, which seems to have helped my perception, if nothing else.

### Remaining niggles

Things I haven't figured out yet. If you have any suggestions, do let me know in the comments below.

  * How to hide the clock completely
    * I frequently record screencasts of my laptop and the time jumping around in the recording can be distracting. So I just hide the clock. I don't see an easy way to do that yet.
  * Make accelerator keys work in alt+space window menu
    * For many years I have used the accelerators in the window controls menu accessed via Alt+space to do things like maximize the window. Alt+Space,x is welded in my muscle memory. I don't understand why they were disabled in GNOME Shell (they work in other desktops).
  * Alt-Tab behaviour is broken (by design (IMHO))
    * All windows of an application come to front when Alt+Tabbed to, even if I only want one window. I have to dance around with Alt+Tab & Alt+Grave.

### Reader Suggestions

In the comments below, the following addtional extensions have been suggested.

Greg suggested the [Alt Tab List First Window](https://extensions.gnome.org/extension/878/alt-tab-list-first-window/) Extension which on initial play seems to fix the Alt-Tab issue listed above! Many thanks Greg!

Alif mentioned [Status Area Horizontal Spacing](https://extensions.gnome.org/extension/355/status-area-horizontal-spacing/) which is great for compressing the gaps out of the indicator area in the top right, to use the space more efficiently. Thanks Alif!

The Internet's ever-fantastic [Stuart Langridge](https://www.kryogenix.org/) created [Clock override](https://extensions.gnome.org/extension/1206/clock-override/) which allows me to hide the clock, or change it to any arbitrary text or date format. Thank's Stuart!

### Conclusion

So this is now my desktop, and I'm quite pleased with it! Massive thanks to the GNOME team, the Ubuntu GNOME flavour team, and all the extension authors who made this possible.

![My new Ubuntu GNOME Desktop](/blog/images/2017-04-15-21-10-14-gnomity.png)

![My new Ubuntu GNOME Desktop](/blog/images/2017-04-15-21-32-25-gnomity2.png)

Initially I was a bit frustrated by the default behaviour of GNOME Shell. I've been pleasantly surprised by the extent and functionality of extensions available. Without them, there's no way I'd use this on a daily basis, as it's just too irritating. I'm sure somebody loves the default behaviour though, and that's great :)

I realise I'm running an 'old' version of GNOME Shell (3.18) coming directly from the Ubuntu 16.04 (LTS) archive. It may be there's additional features or fixes that are going to improve things further. I won't be upgrading to 16.10, 17.04 or 17.10 however, and likely won't use a GNOME PPA for my primary desktop. I'll stick with this until 18.04 (the next Ubuntu LTS) has baked for a while. I don't want to upgrade to 18.04 and find extensions break and put me backwards again.

I've had this setup for a few days now, and I'm pretty pleased with how it went. Did you try this? Any other changes you made? Let me know in a comment below! Thanks. ```:D```
