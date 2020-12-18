+++
date = "2018-06-07T16:28:28-07:00"
title = "KDE Slimbook 2 Review"
slug = "2018/06/kde-slimbook-2-review"
tags = ['kde', 'slimbook', 'hardware', 'review']
+++


# KDE Slimbook 2 Review

![KDE Slimbook 2  Outside](/blog/images/2018-06-07/DSC_0043.JPG)

The kind folks at [Slimbook](https://slimbook.es/en/) recently sent me the latest generation of their ultrabook-style laptop line for review, the [KDE Slimbook 2](https://slimbook.es/en/kde-slimbook-2-ultrabook-laptop). You can hear my thoughts on the [latest episode](http://ubuntupodcast.org/2018/06/07/s11e14-the-fourteenth-goldfish/) of the [Ubuntu Podcast](https://ubuntupodcast.org/), released on June 7th 2018. 

Slimbook are a small laptop vendor based in Spain. All the laptops ship with KDE Neon as the default operating system. In addition to their hardware, they also contribute  to and facilitate [local Free Software events](https://linuxcenter.es/aprende/eventos-anteriores) in their area. I was sent the laptop only for review purposes. There's no other incentive provided, and Slimbook didn't see this blog post before I published it.

Being a small vendor, they don't have the same buying power with OEM vendors as other big name laptop suppliers. This is reflected in the price you pay. You're supporting a company who are themselves supporting Free Software developers and communities. 

If you're after the cheapest possible laptop, and don't care about its origin or the people behind the device, then maybe this laptop isn't for you. However, if you like to vote with your wallet, then the KDE Slimbook should absolutely be on your list to seriously consider.

## Specs

The device I was sent has the following technical specifications. 

  * Core i5-7200 @ 2.5GHz CPU
  * Integrated Intel HD 620 GPU
  * 16GB DDR4 RAM
  * 500GB Samsung 960 EVO SSD
  * Intel 7265 Wireless chipset
  * Bluetooth chipset
  * 1080p Matte finish
  * Full size SD card
  * Heaphone socket and built in mic
  * 720p webcam
  * 1 x USB 3.0 (USB3.1 Gen 1) (Type A), 1 x USB 3.0 (USB3.1 Gen 1) (Type C), 1 x USB 2.0 (Type A)
  * Spanish 'chiclet' style keyboard with power button in top right
  * 3-level keyboard backlight
  * Elan Synaptics touch pad
  * 46Wh battery, TPS S10
  * Power adpater with right-angle plug
  * USB-C dongle

As shipped, mine came in at around  ~1098EUR / 956GBP / 1267USD. Much of this can be tweaked, including the keyboard layout, although doing so may extend the lead time on receiving the device. There are plenty of options to tweak, and the site gives a running total as you adjust to taste. There's an i7 version, and I'm told it will soon be possible to order one with a black case, rather than the silver I was shipped. The laptop shipped with one drive, but has capacity for both an M.2 and traditional form factor drive too. So, fully loaded you could order this with 2x1TB SSDs if you're after extra disk space.

Notable is the lack of Ethernet port, which for some is a dealbreaker, even in these days of ubiquitous reliable wifi for many. The solution Slimbook went with is to provide two optional 'dongles'. One connects to USB3 Type A and presents an Ethernet port. The other option connects to the USB C port and provides 3 more USB 3 tradtional ports and an Ethernet socket. Slimbook shipped me the latter, which was super useful for connecting more USB devices, and a LAN cable.

The cable on the dongle is relatively short, but it feels solid, and I had no problems with it in infrequent daily use. One omission on the dongle is the lack of a pass-through USB C port. Once the dongle is attached to the laptop, you've used your only type-c connector. This might not be a problem if you're a luddite like me who had very few USB-C devices, but I imagine that'll be more of an issue going forward. This is an optional dongle though, and you could certainly choose not to get it, but purchase a differenty one to service your requirements.

## Software

![KDE Slimbook  2 Inside](/blog/images/2018-06-07/DSC_0038.JPG)

### Default install - KDE Neon

The laptop shipped with KDE Neon. It's no secret to listeners of the Ubuntu Podcast that I'm a bit of a KDE fanboy since I began testing Neon a few months back, and stuck with it on my ThinkPad T450. So I am a little biased in favour of this particular Linux distribution. So I felt very much at home on the Slimbook with KDE. 

On other computers I've tweaked the desktop in various ways - it's the KDE raison d'être to expose settings for everything, and I usually tweak a fair number. However on the Slimbook I wanted to try out the default experience. I found the default applications easy to use, well integrated and reliable. I'm writing this blog post in Kwrite, and have noticed features that I would have not expected here, such as the zoomed out code view and popup spelling completion.

I'm pleasantly surprised by the choices made on the software build here. KDE performs well & starts up and wakes from suspend quickly. Everything works out of the box, and the selection of applications is small, but wisely chosen. Unsurprisingly I've augmented the default apps with a few applications I use on a daily basis elsewhere, and they all fit in perfectly. I didn't feel any of the applications I use stood out as alien, or non-KDE originals. The theme and app integration is spot on. If I were a Slimbook customer, I'd happily leave the default install pretty much as-is and thoughouly enjoy the experience.

The software is delivered by the usual Ubuntu 16.04 (Xenial) archives, with the KDE Neon archive delivering updates to the KDE Plasma desktop and suite of applications. In addition two PPAs are enabled. One for TLP and another for screenfetch. Personally on a shipping laptop I'd be inclined not to enable 3rd party PPAs, but perhaps supply documentation which details how the user can enable them if required. PPAs are not stable, and can deliver unexpected updates and experiences to users. 

I should also mention in the pack was a tri-fold leaflet titled "Plasma Desktop & You". It details a little about KDE, the community and invites new users to not only enjoy the software, but get involved. It's a nice touch.

### Alternative options

Slimbook don't appear to offer other Linux distributions - and given the lid of the laptop has a giant KDE logo engraved on it, that wouldn't make a ton of sense anyway. 

However I tested a couple of distros on it via live USB sticks. With Ubuntu 18.04 everything worked, including the USB C Ethernet dongle. For fun I also tried out Trisquel, which also appeared to mostly work including wired network via the dongle, but wifi didn't function. I didn't attempt any other distros, but given how well KDE Neon (based on Ubuntu 16.04), Ubuntu 18.04 worked, I figure any distro-hoppers would have no hardware compatibility issues.

## Hardware

### Display & Graphics

The 1080p matte finish panel is great. I found it plenty bright and clear enough at maximum brightness. There are over 20 levels of brightness and I found myself using a balanced setting near the middle most of the time, only needing full brightness sometimes when outside. The viewing angles are fine for a single person using it, but don't lend well to having a bunch of people crouched round the laptop. 

I ran a few games to see how the integrated GPU performed, and it was surprinsgly okay. My usual tests involved running Mini Metro which got 50fps, Goat Simulator at 720 got me 25fps and Talos Principle at 1080p also clocked in 25fps. This isn't a gaming laptop but if you want to play a few casual games or even run some emulators between work, it's more than up to the task. 

### Performance

I use a bunch of fairly chunky applications on a daily basis including common electron apps and tools. I also frequently build software locally using various compilers. The Slimbook 2 was a super effective workstation computer for these tasks. It rarely broke into a sweat, with very few occasions where the fan span up. Indeed I can't really tell you how loud the fan is because I so rarely heard it.

It boots quickly, the session starts promptly and application startup isn't a problem. Overall as a workstation, it's fine for any of the tasks I do daily.

### Keyboard

![KDE Slimbook  2 Keyboard](/blog/images/2018-06-07/DSC_0042.JPG)

The keyboard is a common 'chiclet' affair, with a full row of function keys that double as media, wifi, touchpad, brightness hardware control buttons. The arrow cluster is bottom right with home/end/pgup/pgdown as secondary functions on those keys. The up/down arrows are vertically half-size to save space, which I quite like.

The "Super" (Windows) key sports a natty little Tux with the Slimbook logo beneath. Nice touch :)

### Touchpad

The touchpad is a decent size and works with single and double touch for click/drag and scrolling. I did find the palm rejection wasn't perfect in KDE. I sometimes found myself nuking chunks of a document while typing as my fat thumbs hit the touchpad, selecting text and overtyping it. 

I tried fiddling with the palm rejection options in KDE but didn't quite hit the sweet-spot. I've never been a fan of touchpads at all, and would likely just turn off the device (via Fn-F1) if this continued to annoy me, which it didn't especially.

### Audio

As with most ultrabook style laptops the audio is okay, but not great. I played my usual test songs and the audio reproduction via speakers lacked volume, was a bit tinny and lacked bass.

 With headphones plugged in, it was fine. I rarely use laptop speakers personally, but tend to use a pair of headphones. Nobody wants to hear what I'm listening to :). It's fine for the odd video conference though.

### Battery 

The model I had was supplied with a 46Wh battery, a small & lightweight ~40W charger and euro power cable & right angled barrel connector to the laptop. Under normal circumstances with medium workload I would get around 7 hours, sometimes more. 

Leaving the laptop on, connected to wifi, with KDE power management switched off and brightness at 30% the system lasted around 8 hours 40 mins. I'd anticipate with a variable workload, with KDE power management switched on, you'd get similar times.

I also tried leaving the laptop playing a YouTube video at 1080p, full screen with wifi switched on and power management suppresed by the browser. The battery gave out after around 5 hours. 

The battery takes around 4 hours to re-charge while the laptop is on. This is probably faster if you're not using the laptop at the time, but I didn't test that.

## Overall impressions

I've been really happy using the KDE Slimbook 2. The software choices are sensible, and being based on Ubuntu 16.04 meant I could install whatever else I needed outside the KDE ecosystem. The laptop is quiet, feels well built and was a pleasure to use. I'm a little sad to give it back, because I've got used to the form-factor now. 

I have only a couple of very minor niggles. The chassis case is a little sharp around the edges, much like the MacBook Air it takes design cues from. Secondly, when suspended the power LED is on the inside of the laptop, above the keyboard. So if like me, you suspend your laptop by closing the lid, you won't know if it suspended properly by looking at the slow blink of the power LED. It's a minor thing, but having been burned (literally) in the past by a laptop which unexpectedly didn't suspend, it's something I'm aware of. 

Other than that, it's a cracking machine. I'd be happy to use this on a daily basis. If you're in the market for a new laptop, and want to support a Linux vendor, this device should totally be on your list. Thanks so much to [Slimbook](https://slimbook.es/en/) for shipping the device over and letting me have plenty of time to play with it!

