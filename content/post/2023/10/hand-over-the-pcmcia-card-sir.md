+++
date = "2023-10-06T10:00:00+01:00"
title = "Hand over the PCMCIA card, Sir"
slug = "2023/10/hand-over-the-pcmcia-card-sir"
author = "Alan Pope"
tags = ['tfts']
+++

This is the fifth in a series of Friday [Tales From Tech Support](https://popey.com/blog/tags/tfts/). Some stories from the past featuring broken computers and even more broken tech support operatives - mostly me.

## Scene setting

This is another story from my time working on the helpdesk for a large accounting & consulting organisation in central London. A slight difference though, this story is second hand, so take it with a pinch of salt. I was there, but I wasn't responsible for what occured, other people on the team were.

## A mishmash of hardware

The organisation is large, through hiring, acquisitions and mergers. There's a ton of staff working across multiple floors of a few buildings. The desk-bound people had typical desktop computers (more on that in a previous [tfts](https://popey.com/blog/tags/tfts/), "[Where's my hard drive?](/blog/2023/09/wheres-my-hard-drive)"), but the business consultants, analystis and accountants had portable devices.

I say 'portable', but they were more 'luggable' in some cases. There was a real mishmash of devices out in the field, that we had to support from the helpdesk. Typically a consultant would be out on the road as much as possible, then come into the office - perhaps only on a Friday - to write up their work, file expenses, and do other admin.

Some had the relatively modern, stylish, and desireable Toshiba 1910cs. Others, more muscular employees, might be blessed with the Compaq Portable III. This was a magnificent *beast* of a computer. A real keyboard on the end of a coiled cable, an orange phosphor display, and a massive handle. What's not to love! (back-ache)

There were many other devices out in the field, such as classic ThinkPads, but these two give you a sampling of what was common in the community of users.

## Networking

Nobody had WiFi. Wireless networking wasn't really a thing back then. Most desks had a trailing network cable poking up through a circular hole at the back. If they didn't, then users would have to rummage under the desk for a floor-trap containing a network port to attach to.

The majority of the portable computers didn't have any kind of onboard network adapter. Over time we acquired a variety of different network adapter types, so everyone could get on the network. 

Desktops obviously had onboard network cards. The chomky Compaq Portable III could also take a desktop network card. The problem wasn't with these, it was the variety of more svelte laptops like the Toshiba and friends. Or rather, their users. 

## Pocket adapters

There were two main types of portable network adapters in the wild. Broadly, they were cast as "good" ones, and the "bad" ones by their users. The good ones were usually PCMCIA 3Com Ethernet devices. Generally very reliable, small, fast and easy to plugin and get going. Most hide nicely inside a PCMCIA slot, with a natty white dongle to attach the network cable to. 

Then there was the *bad* kind. These are mostly Xircom Pocket Ethernet II devices. These attached to the parallel (printer) port on a computer, so were most useful where there was no ISA or PCMCIA slots. They were distinctively battleship grey, with a red rubber tank-track style strip to spin both screws into the parallel port at once. These required external power, either via a PSU or from the PS/2 keyboard/mouse port on the laptop.

When the laptop was booted up, a `config.sys` menu would appear, where you could choose which card you were using. That way it only loaded the right driver for the card you had installed. DOS was fun back then. It looked a bit like this:

```text
MS-DOS 6.22 Startup Menu
════════════════════════

     1. Xircom Pocket adapter
     2. 3Com PCMCIA adapter
     3. No network

  Enter a choice: 1





F5=Bypass startup files F8=Confirm each line of CONFIG.SYS and AUTOEXEC.BAT [N]
```

## Supply & demand

The problem was, there weren't enough cards of either type, for everyone. But that's fine, because on any ordinary day, the consultants would be out, making money. They generally had no need for the network adapters when visiting customers, because they'd never connect up to the to the customer LAN.

So we would keep all of the network adapters in the office, on a shelf of a cabinet located just inside the office door as you leave the lift (elevator). So on a Friday (or whatever day they're in), a consultant could enter the office, snag a card, then get working.

Everyone was expected to drop the card off to the cabinet at the end of the day, for the next person. Share and share alike, children!

## First come, first served

What's worse though, we had *way* more of *bad* (cheaper) Xircom parallel-port adapters than the *good* 3Com PCMCIA cards. So all the 3Com ones would go first to the early birds. If you got in late, tough shit, you get a crappy Xircom adapter. 

We started to get complaints that there were never any of the nicer PCMCIA cards in the morning. Even the early birds would call the helpdesk and complain asking where all the *good* cards went. We didn't have a good answer for this. 

Perhaps their colleagues were """""accidentally"""" leaving the PCMCIA card in their laptop, and """"oops"""" put the dongle in their laptop bag too. *Whoopsie!* 

More likely, we thought, people were doing this on purpose. Shocking behaviour, I know. 

## Slowly, slowly catchy cheeky monkey

We formed a plan. We summised that if people were indeed "accidentally on purpose" keeping hold of network cards, we should be able to spot this on the network. Every card has a unique MAC address. If someone has the same MAC multiple days in a row, that's either coincidence or deliberate card-hoarding.

So, a script was developed which ran regularly, capturing the MAC addresses of everyone on the network segment where this behaviour was observed. This data was correlated with user account names. 

It took days to build this evidence, of course, because we needed to target the repeat offenders first. As they didn't always come in to the office, we sometimes had a lack of 'streaks' in their network connections.

However, once we had enough data, we would build a list of the worst offenders and schedule a 🌟surprise🌟 courtesy call.

### 'ello 'ello 'ello sir, what's going on here then?

Armed with our printed evidence we'd head out to the desk of card-hoarding offenders. 

They all had different reactions. 

Some would get cross that they'd been caught, expressing frustration at the "crappy" cards they'd been "forced" to use when they got in late. 

Others would just turn red, fess up, and apologise for their *heinous* crimes.

Sometimes they were out of the office, so we couldn't have a conversation about it. We would speculatively open their pedestal drawers and find the PCMCIA card and dongle boldly sitting among pens, loose staples and crumbs. Busted!

We would always return the cards, good or bad, to their nightly resting place, in the cabinet by the door, ready for another day of intense networking after a good nights sleep.

After a while the hoarders got the message, and shared their toys, like good little girls and boys.
