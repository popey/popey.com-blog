+++
date = "2020-12-26T12:00:00-00:00"
title = "My 'Must-Have' GNOME Extensions"
slug = "2020/12/my-must-have-gnome-extensions"
author = "Alan Pope"
tags = ['software', 'gnome', 'extension', 'linux', 'desktop', 'ubuntu']
+++

I currently run [Ubuntu 20.10](https://ubuntu.com/download) on my main desktop PC. GNOME Shell is the default desktop, and while it's great, one very useful feature is the ability to supplement or alter the default behaviour with extensions and other add-ons. Ubuntu ships with a couple of extensions by default, but I've added a few on top, and this blog post details what they are and how to get them, in no particular order...

## Sound Switcher Indicator

I have multiple input and output audio devices on my computer. A USB-attached [Focusrite Scarlett Solo mixer](https://geni.us/Iuy8e) enables my to attach an XLR-connected microphone and headphones to the PC. I have a small desktop speaker which I use when I'm tired of wearing headphones. I also often have a [Magewell HDMI capture card](https://geni.us/8qJn), [Logitech C920](https://geni.us/V3qb) webcam, and a [Canon EOS M100](https://geni.us/ZGlnO) mirrorless camera. They also show up as audio capture devices.

As such I frequently want to quickly switch between the various input output devices, depending on what I'm doing. This is where "Sound Switcher Indicator" comes handy. It quietly sits in the indicator area at the top right of the screen, and with two clicks I can easily switch input or output devices. Here's what it looks like in use.

![Sound Switcher Indicator](/blog/images/2020-12-26/iss.png)

It's super easy to use, highly recommended - if you have mutliple audio devices attached as I do.

[Install Sound Switcher Indicator](https://yktoo.com/en/software/sound-switcher-indicator/)

## Snap Manager

You may be surprised to hear that I have a lot of snaps installed on my system. A lot get updated fairly frequently. The Snap Manager extension adds an icon to my indicator area which makes managing snaps easy.

![Snap Manager Extension](/blog/images/2020-12-26/snap-manager.png)

Some of the main features include (along with their equivalent commands):

* List installed snaps - `snap list`
* Show recent snap updates - `snap changes`
* Show pending updates - `snap refresh --list`
* Install / Remove a snap - `snap install (snapname)`
* Refresh installed snaps - `snap remove (snapname)`

It also exposes a bunch of settings and tweaks which require more complex command lines. These include deferring updates, enabling and disabling snaps, connecting and disconnecting interfaces, and more. This indicator makes managing snaps so much easier than having to remember command line options.

Many of the options will popup a terminal window to display their output, or accept input. In the future it might be nice for that to be made prettier, but for now, it's functional, and easy to use.

![Snap Manager Extension output](/blog/images/2020-12-26/snap-output.png)

I recommend this if you'd like to have more control over the snap packages you have installed on your system, especially if you're keen on holding back updates, or better understanding what updated and when.

[Install Snap Manager Extension](https://extensions.gnome.org/extension/3715/snap-manager/)

## Hue Lights

I have a bunch of [Philps Hue lights](https://geni.us/qmyA2C) around the house. Often I control them via the official app on my phone, but also shout at a [lady cylinder](https://geni.us/Lndnb) to get her to operate my lighting too. However, when sat at my desk, sometimes it's nice to flip the outside light on for an approaching visitor without saying a word, or pulling out my phone. Enter Hue Lights Extension!

![Hue Lights Extension](/blog/images/2020-12-26/hue-lights.png)

Once installed and configured, it enumerates the lights in your house, and provides a simple interface to both toggle them off and on. There's also a sub-menu for each light, which lets you pick from the colours supported by the lamp. It's super easy to use, and not difficult to setup either. 

On first install you need to pair it with your [Philips Hue Bridge](https://geni.us/cFb8Xbl), which it discovers on the network. That's it, done. There's some additional settings, but I've not had to touch those. The defaults work fine for me.

![Hue Lights Extension Settings](/blog/images/2020-12-26/hue-settings.png)

If you use Hue Lights, this is an easy 'Must-Have'. If my hand is already on the mouse, it's super ~~lazy~~ easy to flip lights on and off, and adjust their lighting with barely any effort.

[Install Hue Lights Extension](https://extensions.gnome.org/extension/3737/hue-lights/)

## CPU Power Manager

I installed this extension because I had a problem with heat and fan noise on my computer. During times when I was recording podcasts, I didn't want the noise to affect my audio. Once installed it's easy to flip between profiles "High Performance", "Multimedia", "Quiet", and "Energy Saver" with a simple click. 

![CPU Power Manager](/blog/images/2020-12-26/cpu-power-manager.png)

The extension can behave differently on mains power than when powered from batteries. Personally I don't need this as the computer is a desktop, but if I put this on my laptop, it could be beneficial.

![CPU Power Manager Settings](/blog/images/2020-12-26/cpu-power-manager-settings-1.png)

These behaviour of the profiles can be easily configured in the supplied settings dialog.

![CPU Power Manager Settings](/blog/images/2020-12-26/cpu-power-manager-settings-2.png)

There's a little post-install configuration required, but it's pretty starightforward and you're guided through it by the application.

![CPU Power Manager Settings](/blog/images/2020-12-26/cpu-power-manager-settings-3.png)

[Install CPU Power Manager](https://extensions.gnome.org/extension/945/cpu-power-manager/)

## Conclusion

Out of the box GNOME Shell on Ubuntu is a super productive environment. However with just a few extensions it's possible to customise the environment to your needs. I hope this inspires others to blog about the extensions they use. Maybe we can all learn about additional features we didn't know existed as a result...