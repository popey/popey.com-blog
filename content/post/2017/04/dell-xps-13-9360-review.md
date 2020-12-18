+++
date = "2017-04-13T12:46:10-07:00"
title = "Dell XPS 13 9360 Review"
slug = "2017/04/dell-xps-13-9360-review"
tags = ['ubuntu', 'hardware', 'dell', 'review']
+++

# Dell XPS 13 9360 Review

On the ['Tasty Different Cow'](http://ubuntupodcast.org/2017/04/13/s10e06-tasty-different-cow/
) (don't ask) episode of the [Ubuntu Podcast](http://ubuntupodcast.org) - we reviewed the latest [Dell XPS 13 9360 Laptop](http://www.dell.com/uk/business/p/xps-13-9360-laptop/pd?ref=PD_OC
) shipping with Ubuntu.

Dell kindly sent us the review unit for a couple of weeks, and while we talked all about it on the podcast, I thought I'd jot some notes down here in case I missed anything or it's not clear in the audio version.

Turns out I made more notes than I thought! Scroll to the very bottom to read my conclusion.

## Hardware

First up, what did I get? Dell have a ton of different laptops available, shipping with Ubuntu out of the box, this is the one I got. I didn't get to choose it, they just sent me this unit, which I suspect has done the rounds to a few proper journalists before I got my grubby mits on it.

### Specs

 * i5-7200U 2.5GHz
 * 8GB RAM
 * 256GB SSD
 * Atheros QCA6174A 802.11ac wireless
 * 1080p matte screen
 * SD slot
 * Combined headset/mic port
 * 2xUSB 3 (one each side)
 * 1xUSB-C peripheral and charging port
 * US keyboard layout
 * 60Wh design battery - model RNP726B

Mine also shipped with a very dinky 45W charger which terminates in a barrel connector. The power socket on this Dell is on the left side at the back, next to the USB C port. I didn't try charging via USB C because I don't have a high enough wattage charger - my OnePlus Dash charger wasn't sufficient. I also don't have any USB C peripherals, so couldn't test that port at all.

The laptop feels premium, very sturdy to hold, like it would stand up to some abuse, but I think a prior journalist has tested that a bit too far. My review unit was a bit bent, so rocked on the desk when typing. I can't imagine brand new factory models have this issue though, so it didn't colour my review.

## Software

The Dell shipped with a relatively up to date install of Ubuntu 16.04 LTS. It didn't have the latest [HWE stack](https://wiki.ubuntu.com/Kernel/LTSEnablementStack) installed, but that's not a big problem.

The install wasn't an out of the box experience, but had a password stuck on the box, which again, I assume is not normal ;) but for the journalists using this review unit.

### Differences from stock Ubuntu

Once I logged in, there were a few things I noticed which differ from the standard Ubuntu 16.04 install I'm used to on my ThinkPad T450. This may be old news to those of you who have tried a Dell XPS 'Sputnik' laptop in the past, but it was new to me, a die-hard ThinkPad fanboy :)

There's a Dell PPA enabled by default, and some of the packages installed on the system came from there. I expect this was to support the hardware or known issues Dell customers had. Good to see, so long as it's maintained and doesn't break upgrades, in my opinion.

The Windows 'Super' key doesn't work by default. This was a bit of a shock to me, as I use the Super key on Unity all the time to launch applications and find files. Having to move my hand from the keyboard to the trackpad or mouse and move it all the way over to the top left is super inefficient and breaks the keyboard-centric nature of Unity. Thankfully this mis-feature can be disabled, Andrew Hayzen wrote some [notes about his laptop](http://www.ahayzen.com/docs/installs/devices/dell_9360
) (a similar model) detailing how.

The base software shipped on the laptop is different from a stock install too. With both Google Chrome and Chromium installed and listed in the launcher. Firefox isn't installed at all on this image. I don't know if the motivation is user-centric or financial, but I had no problem with this change, as I've used Google Chrome as my default browser for some time now. Others may prefer Firefox, and of course that can easily be installed.

The combined headphone/headset port was interesting to me because while I have the same on my ThinkPad, the behaviour was different. Plugging headphones into the port presented a popup dialog asking the user what type of device was attached. A handy dialog the first time I saw it, but it got a bit annoying every single time I plugged my headphones in.

### Dell Recovery

One of the applications shipped from the Dell PPA is the "Dell Recovery" tool. It can make recovery USB sticks, and reboot into a recovery tool which resets the laptop back to factory defaults. This is a most welcome addition to the Ubuntu install im my mind. I've often wanted to nuke a laptop back to initial install and start fresh. I'm sure many other people have too. Having the tool built in rather than having to download an ISO and put it on a USB stick is a bonus. The downside is that the recovery media eats a chunk of your precious laptop disk space. In my mind, this is worth having.

I tested the recovery tool a couple of times, initially to see if the version of Ubuntu I had been shipped installed was the same as the out of the box one from Dell. It was. The tool worked perfectly each time, and got me back to factory install in a few minutes, with little interaction from me, just a confirmation and password prompt.

The ability to make a recovery USB stick - tailored for Dell devices - which has the PPA enabled, and the customisations mentioned previously, is also a welcome bonus. In fact my good friend and colleague [Martin Wimpress](http://ubuntu-mate.org) made use of this on my review laptop to make a USB stick to reset *his* Dell back to factory defaults. More manufacturers of Linux machines should do this kind of customisation, it's fantastic.

## Daily uses

Overall the laptop 'feels' really fast, especially when building software or other intense things. The fan did spin up a bit on heavy load, which was pretty audible, but I didn't hear the famous 'coil whine' that others have reported with previous models.

I had the 1080p matte screen version. I don't think I'd go for a hidpi, touch or reflective version. 1080p seems the right resolution for the 13" screen.

The keyboard has only a short travel, but that didn't present a problem when I was typing on it. I did however find myself feeling cramped using the laptop on a desk. The tiny bezel makes the 13" model look and feel pretty tiny and a bit cramped.

As mentioned, the laptop I got has a US layout, which also has the modifier keys in a strange (to me) layout. The order from bottom left is Ctrl, Fn, Win, Alt. I'm more used to having Fn in the far left, I'm sure I'd get used to this, but it threw me initially, having Ctrl farther away for my left thumb than I'm used to.

As with most laptops of the day, the Fuction keys (F1-F12) double up as media device control keys. The Fn key in the bottom left corner of the keyboard is both a 'shift' (hold-and-press) key *and* a toggle (tap to change mode) key. The problem here is there's no indication to tell you which mode you're in before you press a function key. The ThinkPad lines have a little light on the key itself so you know if you're in "function key" or "device control" mode, but the Dell doesn't, which is a little odd and takes getting used to.

The tiny bezel does however make my ThinkPad look like it was made in 1984. The Dell looks like a modern, premium device, not something fabricated in an eighties Soviet nuclear bunker.

The downside of having nearly no bezel is *that* camera location. Having been on plenty of hangouts with friends and colleagues who own this device, I now know what the insides of their nostrils look like. Not a great look.

I noticed some flicker in Google Chrome, which I've also seen on my ThinkPad, so I suspect it's either a software issue with Chrome, Unity or Compiz, or perhaps a GPU driver bug. I never got to the bottom of it on my ThinkPad, and haven't seen it on non-Intel machines. ```¯\_(ツ)_/¯ ```

Initially the Ubuntu battery gauge says 9h battery life on a full charge after boot up. I did a bit of 'work' on it and the fan spun up a bit, whereupon the battery gauge went down to 4.5h left. Once the workload was comlpete, the fan eventually span down and estimated battery life shot back back up to 7 hours. So 9h is "doing nothing" battery life, 4 hours could be considered "quite busy" battery life. Real life I found, somewhere in between, doing the usual workload of typing docs, browsing, a bit of audio and the odd game. Clearly this will vary greatly on your workload. I can't see how anyone can get more than about 7-8 hours under real world conditions though.

### Media

I use Spotify for my music these days, and am not any kind of audiophile. I am usually happy listen to music on my OnePlus3T headphones, or a bluetooth speaker. So whatever I say about audio quality has to be taken with a pinch of salt.

I initially listened to 3 'test' tracks on the laptop, Sparks - "This Town Aint Big Enough", XTC - "Making Plans for Nigel" and Jean-Michel Jarre - "Equinoxe Pt 5", as they're all songs I'm likely to listen to in my regular playlist.

Unsurprisingly the speakers are exactly what you'd expect from non-Apple laptop units. Basically "okay", but not "great" by any stretch. They're alright for background music, watching a talky YouTube video or listening to the radio, but not for rocking out with. I had to dial down the volume a bit for most tracks as they're too loud in mid range. As expected, when using headphones, it was a different story. No problem at all, but nothing I'd rave about.

### Steam / Gaming

I installed steam from the Ubuntu repo with a simple ```apt install steam``` and launched it from the dash. It did the usual update dance and all worked fine, no problem. I installed a bunch of games including [Mini Metro](http://store.steampowered.com/app/287980/), [Goat Simulator](http://store.steampowered.com/app/265930/) and [Talos Principle](http://store.steampowered.com/app/257510/).

[Mini Metro](http://store.steampowered.com/app/287980/) ran perfectly, unsurprisingly as it's not a massively demanding game. You should buy it though, it's great fun if you're even remotely a train nerd, or like the aesthetic of [London Undergroud maps](https://en.wikipedia.org/wiki/Tube_map).

[Goat Simulator](http://store.steampowered.com/app/265930/) defaulted to 720p (on a 1080p panel) and was *just* about playable, but at 20fps, with the fan blasting out, I don't think I'd recommend it. Perhaps dialling down some detail or reducing the resolution even further might have helped, but I gave up after a few minutes.

[Talos Principle](http://store.steampowered.com/app/257510/) however was excellent. On first launch I got around 30fps at 1080p which for a pretty puzzle game was fine. I played this quite a bit, and had no issue with the actual game itself. However at one point I tried to take a screenshot and the laptop froze for a minute or so. I alt-tabbed out and found a GPU hang in dmesg. So I guess that's an Intel video driver or mesa issue. I only had it happen once though.

I did try updating to the latest [HWE stack](https://wiki.ubuntu.com/Kernel/LTSEnablementStack) and latest Mesa drivers which made no discernable difference to any of the games I tried, nor the flickering in Chrome.

I did a firmware update via GNOME Software. "XPS 13 9360 System Update 66306" which says "Updating the system firmware improves performance" and (in red) "Device cannot be used during update". If I click it there is "No update description available" which doesn't inspire confiidence. However, if I click "Restart and install" it flickers and then I get the usual Ubuntu shut down dialog, so I clicked "Restart". After reboot the Dell logo appeared and then it proceeded to apply the update successfully then rebooted back into Ubuntu. So well done Dell & GNOME Software developers for making firmware updates easy on Linux!

### Benchmarking

I used [phoronix test suite](https://www.phoronix-test-suite.com/) to run a batch of tests. Here's the [results](http://openbenchmarking.org/result/1703174-RI-20170317050). Unfortunately I did this on the base 16.04 install, and not with the HWE stack, perhaps someone else who has updated to the latest HWE / Mesa can re-run them and compare. Leave a comment below if you have.

## Questions

We asked some listeners of [Ubuntu Podcast](http://ubuntupodcast.org/) in our [Telegram Chat](http://ubuntupodcast.org/telegram) if they wanted me to test anything, and here's what they said:-

Andrew Hayzen, who has the fully loaded version offered his notes up [http://www.ahayzen.com/docs/installs/devices/dell_9360/](http://www.ahayzen.com/docs/installs/devices/dell_9360/)

John Lenton asked, *"does it sleep or suspend? What does powertop say it eats when on battery, noodling around? (run a ```powertop --calibrate``` first, but note that takes a while and you can't use it)"*

It suspends. After calibartion, 6.6w with just terminal open doing nothing much,  down to 5.9 if I lower the brightness nearly all the way.

Sturmflut asked *" does the external display come back after suspend?"*

I have no usb c to display cable - so can't test as it has no VGA or HDMI. Andrew has one though and says it does!

Joe Ressington asked *"does everything work in trisquel?"*

Unfortunately I couldn't get Trisquel to boot at all, so couldn't test this.

Andre Bacao asked a 'battery' of questions, *"Battery time? Time to charge? How is the charger? Small? Bulky? Full load noise? Does it heats up by being plugged?"*

Battery life was betwen 4 and 9 hours depending on load. I didn't get a chance to time the charge, but it didn't take long. It was quite warm but not unpleasantly hot.

André Bação then asked *"Charger watts and power cord lenght? Suitable or lacking in range?"*

It's a small non-bulky 45W model. There was a pretty long cable on it too, so I didn't feel I was stretching it to get to a mains outlet.

Joe Ressington also asked *"Oh straight connector or right angle? Seems minor but means the difference between longevity and a quickly broken power jack"*

It's a straight barrel connector with a light on the connector itself so you know it's plugged into the mains under the desk.

Finally, André Bação asked *"Keyboard feel? Does the keys touch the screen when closed? Hate when the screen has keys marks"*

I certainly found it different to type on than my T450. The lack of travel was certainly notiable initially, but I soon got used to it. I couldn't see any marks on the screen from the keys.

Thanks for the questions!

## Conclusion

Overall I'd have to say my experience with this laptop has made me re-think my opinion of Dell laptops. I've been a ThinkPad (X220 then T450) user for some years, and had a Apple MacBook Pro before that. When I bought all of those laptops, I'd looked at Dell and relegated them to 3rd or 4th place in my shopping list. This laptop changed that. This has pushed the Dell XPS to the top of my list despite it not having a [TrackPoint](https://en.wikipedia.org/wiki/Pointing_stick), which I've usually used as an excuse to stay on the ThinkPad train. The only thing I'd probably consider is getting a physically larger display such as the 15" version.
