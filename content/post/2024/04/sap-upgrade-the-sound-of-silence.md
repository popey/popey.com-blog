+++
date = "2024-04-05T14:00:00+00:00"
title = "SAP Upgrade: The Sound of Silence"
slug = "2024/04/sap-upgrade-the-sound-of-silence"
author = "Alan Pope"
tags = ['tfts']
+++

This is the seventh in an increasingly infrequent series of Friday [Tales From Tech Support](/blog/tags/tfts/). Some stories from the past featuring broken computers and even more broken tech support operatives - mostly me.

## London. Summer 2002

In the early 2000s I worked as a SAP Technical Consultant which involved teaching courses, advising customers, and doing SAP installations, upgrades and migrations. 

This story starts on a typical mid-summer, warm and stuffy day in London. I arrive for the first and only time to a small, second-floor office in a side road, just off Regent Street, in the centre of town. The office was about the size and shape of Sherlock's flat in the modern hit BBC TV show of the same name, and was clearly previously residential accomodation, lightly converted.

The company was a small SAP Consultancy whose employees were mostly out of the office, clocking up billable hours on-site with their customers. Only a few staff remained in the office, including the CEO, an office administrator, and one consultant.

In the main lounge area of the office were three desks, roughly arranged. A further, larger desk was located in an adjoining office, likely previously a bedroom, where the CEO sat. Every desk had the typical arrangement office desk phone, Compaq Laptop PC, trailing cables and stationery.

In addition, dominating the main office, in the middle of the floor, was an ominous, noisy, and very messily populated 42U rack. It had no doors, and there was no air conditioning to speak of. The traditional sash windows were open, allowing the hot air from outside the flat to mix with the hotter air within. 

It was like a sauna in there.

## Rack space

My (thankfully) single-day job was to perform some much-needed software upgrades on a server in the rack. Consultancies like these often had their own internal development SAP systems which they'd use to prototype on, make demos, or develop entire solutions with. 

Their SAP system was installed on enormous Compaq Proliant server, mounted in the middle of the rack. It featured the typical beige Compaq metalwork with an array of drives to hold the OS, database, application and data. Under that was a DLT 40-80 tape drive for doing backups, and a pile of tapes.

There was a keyboard and display in the rack, which was powered off, and disconnected. I was told the display would frequenly get "borrowed" to give impromptu presentations in the CEOs office. So they tended to use VNC or RDP into Windows to remotely administer the server, whether via the Internet, or locally from their desk in the office.

Some assorted networking and other random gear that I didn't recognise was scattered around a mix of cables in the rack.

## Time is ticking

There was clearly some pressure to get the software upgrades done promptly, ready for a customer demo or something I wasn't privy to the details of. I was just told to "upgrade the box, and get it done today."

I got myself on the network and quickly became familiar with the setup, or so I thought. I started a backup, like a good sysadmin, because from what I could tell, they hadn't done one recently. (*See [tfts passim](/blog/tags/tfts/) for further backup-related tales.*)

I continued with the upgrade, which required numerous components to be updated and restarted, as is the way. Reboots, updates, more reboots, patches, SAP System Kernel updates, SAP Support Packages, yadda yadda. 

## Trouble brewing

While I was immersed in my world of downloading and patching, something was amiss. The office administrator and the CEO were taking calls, transferring calls, and shouting to eachother from the lounge office to the bedroom office. There was an air of frustration in the room, but it was none of my business.

Apparently some Very Important People were supposed to be having High Level conversations on the phone, but they kept getting cut off, or the call would drop, or something. Again, none of my business, just background noise while I was working to a deadline.

Except it was made my business.

After a lot of walking back-and-forth between the the offices, shouting, and picking up and slamming down phones, the CEO came to me and bluntly asked me:

> What did you **do**?

This was an *excellent* question, that I didn't have a great answer for besides:

> I dunno, what **did** I do?

## Greensleeves

It turns out the whole kerfuffle was because I had *unwittingly* **done** *something*.

I was unaware that not only was the server running the very powerful, very complex, and very important SAP Enterprise Resource Planning software. 

It also ran the equally important and business critical application and popular MP3 player: WinAmp.

There was a sound card in the server. The output of which was sent via an innocuous-looking audio cable to the telephony system. 

The Important People were calling in, getting transferred to the CEOs phone, then upon hearing silence, assumed the call had dropped, and hang up. They would then call back, with everyone getting increasingly frustrated in the process.

The very familiar yellow 'lightning bolt' WinAmp icon, which nestled in the Windows ~~System Tray~~ Notification Area had gone completely unnoticed by me. 

When I had rebooted the server, WinAmp didn't auto-start, so no music played out to telephone callers who were on hold. At best they got silence, and at worst, static or 50Hz mains hum.

The now-stroppy CEO stomped over to the rack and wrestled with the display to re-attach it, along with a keyboard & mouse to the server. He then used them to log-in to the Windows 2000 desktop, launch WinAmp manually, load a playlist, and hit play. 

I apologised, completed my work, said goodbye, and thankfully for everyone involved, never went back to that London hot-box again.
