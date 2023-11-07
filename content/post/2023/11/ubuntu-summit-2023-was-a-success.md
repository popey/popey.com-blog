+++
date = "2023-11-07T12:00:00+01:00"
title = "Ubuntu Summit 2023 was a success"
slug = "2023/11/ubuntu-summit-2023-was-a-success"
author = "Alan Pope"
tags = ['NaBloPoMo', 'ubuntu', 'summit', 'events']
+++

Last week, I [wrote](/blog/2023/11/heading-to-ubuntu-summit-2023) about my somewhat last-minute plans to attend the 2023 Ubuntu Summit in Riga, Latvia. The event is now over, and I'm back home collating my thoughts about the weekend.

The tl;dr: It was a great, well-organised and run event with interesting speakers.

Here's my "trip report".

## Logistics

The event was held at the Radisson Blu Latvija. Many of the Canonical staff stayed at the Raddison, while most (perhaps all) of the non-Canonical attendees were a short walk away at the Tallink Hotel. 

Everything kicked off with a "Welcome" session at 14:00 on Friday. That may seem like a weird time to start an event, but it's squashed on the weekend between an internal Canonical Product Sprint and an Engineering Sprint.

The conference rooms were spread across a couple of floors, with decent signage, and plenty of displays showing the schedule. It wasn't hard to plan your day, and make sure you were in the right place for each talk.

The talks were live streamed, and as I understand it, also recorded. So remote participants could watch the sessions, and for anyone who missed them, they should be online soon.

Coffee, cold drinks, snacks, cakes and fruit were refreshed through the day to keep everyone topped up. A buffet lunch was provided on Saturday and Sunday. 

A "Gaming" night was organised for the Saturday evening. There was also a party after the event finished, on the Sunday.

A bridged Telegram/Matrix chat was used during the event to enable everyone to co-ordinate meeting up, alert people of important things, or just invite friends for beer. Post-event it was also used for people to post travel updates, and let everyone know when they got home safely. 

An email was sent out early on at the start of each day, to give everyone a heads-up on the main things happening that day, and provide information about social events.

There were two styles of lanyard from which to hang your name badge. One was coloured diffierently to indicate the individual did not wish to be photographed. I saw similar at [Akademy](/blog/2018/08/akademy-2018-trip-report/) back in 2018, and appreciate this option.

## Sessions

There was one main room with a large stage used for plenary and keynote style talks, two smaller rooms for talks and two further workshop rooms. It was sometimes a squeeze in the smaller rooms when a talk was popular, but it was rarely 'standing room only'.

The presentation equipment that was provided worked well, for the most part. A few minor display issues, and microphone glitches occurred, but overall I could hear and see everything I was expected to experience. 

There was also a large open area with standing tables, where people could hang out between sessions, and noodle around with things - more on that later. A few sessions which left an impression on me are detailed below, with a conclusion at the end.

### Ubuntu Asahi

* [From Asahi Linux to Ubuntu: Running Linux on Apple Silicon](https://events.canonical.com/event/31/contributions/177/)

Tobias Heider (Canonical) was on stage, with a remote Hector Martin (Asahi Linux) via video link. They presented some technical slides about the MacOS boot process, and how Asahi is able to be installed on Apple Silicon devices. I personally found this interesting, understandable, and accessible. Hector speaks fast, but clearly, and covered plenty of ground in the time they had.

Tobias then took over to talk about some of the specifics of the [Ubuntu Asahi](https://ubuntuasahi.org/) build, how to install it, and some of the future plans. I was so interested and inspired that I immediately installed Ubuntu Asahi on my M1 Apple MacBook Air. More on that experience in a future blog post.

### MoonRay

* [From origins to open source: The journey of DreamWorks Animation's production path tracer, MoonRay](https://events.canonical.com/event/31/contributions/218/)

This was a great talk about the process of open sourcing a component of the video production pipeline. While that sounds potentially dull, it wasn't. Partly helped by plenty of cute rendered DreamWorks characters in the presentation, along with short video clips. We got a quick primer on rendering scenes, then moved into the production pipeline and finally to [MoonRay](https://openmoonray.org/). Hearing how and why a large movie production house like DreamWorks would open source a core part of the pipeline was fascinating. We even got to see [Bilby](https://en.wikipedia.org/wiki/Bilby_(film)) at the end.

### Ubuntu Core Desktop

* [Introducing Ubuntu Core Desktop](https://events.canonical.com/event/31/contributions/246/)

Oliver Smith and Ken VanDine presented Ubuntu Core Desktop Preview, from a laptop running the Core Desktop. I talked a little about this in [Ubuntu Core Snapdeck](/blog/2023/11/ubuntu-core-snapdeck/). 

{{< rawhtml >}}
<center><iframe src="https://aus.social/@jamesh/111347584247284874/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe><script src="https://staticcdn.aus.social/embed.js" async="async"></script></center>
{{< /rawhtml >}}

It's essentially the Ubuntu desktop packaged up as a bunch of snap packages. Very much like Fedora Silverblue, or SteamOS on the steamdeck, Ubuntu Core Desktop is an "immutable" system.

It was interesting to see the current blockers to release. It's already quite usable, but they're not quite ready to share images of Ubuntu Core Desktop. Not that they're hard to find if you're keen!

### Framework

* [What It's Like to Build an Open, Repairable Laptop](https://events.canonical.com/event/31/contributions/178/)

This was one of my favourite talks. Daniel Schaefer talks about the Framework laptops, their design and decisions made during their development. The talk straddled the intersection of hardware, firmware and software which tickles me. I was also pleased to see Daniel fiddle with parts of the laptop while giving a talk from it. Demonstrating the replacable magnetically attached display bezel and replacing the keyboard while using the laptop is a great demo and fun sight.


### Security

* [Improving FOSS Security](https://events.canonical.com/event/31/contributions/205/)

Mark Esler, from the Ubuntu Security Team gave a great overview of security best practices. They had specific, and in some cases simple, actionable things developers can do to improve their application security. We had a brief discussion afterwards about snap application security, which I'll cover in a future post.

### Discord

* [Ubuntu Hideout: Successful Community Building Insights](https://events.canonical.com/event/31/contributions/239/)

Some of the team behind the [Ubuntu Discord](https://discord.gg/ubuntu) presented stats about the sizable community that use Discord. They also went through their process for ensuring a friendly environment for support. 

## Hallway track

At all these kinds of events the so-called 'Hallway track' is just as important as the scheduled sessions. There were opportunities to catch-up with old friends, meet new people I'd only seen online before, and play with technology. 

Some highlights for me on the hallway track include:

### Kind words

Quite a few people approached and introduced themselves to me over the weekend. It was a great opportunity to meet people I've not seen before, only met online, or not seen since a, Ubuntu Developer Summit long ago.

A few introduced themselves then thanked me as I'd inspired them to get involved in Linux or Ubuntu as part of their career. It was very humbling to think those years were a positive impact on people's lives. So I greatly appreciated their comments. 

### UBports 

Previously known as Ubuntu Touch, the UBports project had a stand to exhibit the status of the project to bring the converged desktop to devices. I have a great fondness for the UBports project, having worked on the core apps for Ubuntu Touch. It always puts a smile on my face to see the Music, Terminal, Clock, Calendar and other apps I worked on, still in use on UBports today.

I dug out my OnePlus 5 when I got home, and might give UBports another play in a spare moment.

### Raspberry Pi 5

Dave Jones from Canonical had a Raspberry Pi 5 which he'd hooked up to a TV, keyboard and mouse, and was running Ubuntu Desktop. I'd not seen a Pi running the Ubuntu desktop so fluidly before, so I had a play with it. We installed a bunch of snaps from the store, to put the device through its paces, and see if any had problems on the new Pi. The collective brains of myself, Dave, Ogra and Martin solved a bug or two and sent the results over the network to my laptop to be pushed to Launchpad. 

{{< rawhtml >}}
<center><blockquote class="twitter-tweet"><p lang="en" dir="ltr">“Testing” the thermal limits of the <a href="https://twitter.com/Raspberry_Pi?ref_src=twsrc%5Etfw">@Raspberry_Pi</a> at the <a href="https://twitter.com/hashtag/UbuntuSummit?src=hash&amp;ref_src=twsrc%5Etfw">#UbuntuSummit</a> 🕹️ <a href="https://t.co/VxmIrS861l">pic.twitter.com/VxmIrS861l</a></p>&mdash; Alan Pope (@popey) <a href="https://twitter.com/popey/status/1721119564887392764?ref_src=twsrc%5Etfw">November 5, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></center>
{{< /rawhtml >}}

## Gaming Night

A large space was set aside for gaming night on the Saturday evening. Most people left the event, found food, then came back to 'game'. There were board games, cards, computers and consoles. A fair number of people were not actually gaming, but coding and just chatting. It was quite nice to have a bit of space to just chill out and get on with whatever you like. 

One part which amused me greatly was Ken VanDine and Dave Jones attempting to get the aforementioned Ubuntu Core Desktop Preview working on the new Raspberry Pi 5. They had the pi, cables, keyboard and mouse, but no display. There were however, projectors around the room. Unfortunately the HDMI sockets were nowhere near the actual projection screen. So we witnessed Dave, Ken and others burning calories walking back and forth to see terminal output, then call out commands across the loud room to the pi operator.

This went on for some time until I pointed out to Ken that Martin had a portable display in his bag. I probably should have thought about that before hand. Then someone else saved the day by walking in with a TV they'd acquired from somewhere. I've never seen so many nerds sat around a Raspberry Pi, reading logs from a TV screen. It's perfectly normal at events like this, of course.

## After party

Once the event was over, we all decamped to [Digital Art House](https://www.digitalarthouse.eu/) to relax over a beer or five. There were displays and projectors all around the venue, showing Ubuntu wallpapers, and the artworks of [Sylvia Ritter](https://www.sylvia-ritter.com/).  

{{< rawhtml >}}
<center><iframe src="https://ubuntu.social/@popey/111359096273227818/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe><script src="https://ubuntu.social/embed.js" async="async"></script></center>
{{< /rawhtml >}}

{{< rawhtml >}}
<center>
<iframe src="https://ubuntu.social/@popey/111359328031379477/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe><script src="https://ubuntu.social/embed.js" async="async"></script></center>
{{< /rawhtml >}}


## Conclusion

I think the organising committee nailed it with this event. The number of rooms and tracks was about right. There was a good mix of talks. Some were technical, and Ubuntu related, others were just generally interesting. The infrastructure worked and felt professionally run. 

I had an opportunity to meet a ton of people I've never met, but have spoken to online for years. I also got to meet and talk with some of the new people at Canonical, of which, there are many. 

I'd certainly go again if I had the opportunity. Perhaps I'll come up with something to talk about, I've got a year to prepare!