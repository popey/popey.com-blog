+++
date = "2018-08-22T10:25:30-07:00"
title = "Akademy 2018 Trip Report"
slug = "2018/08/akademy-2018-trip-report"
tags = ['kde', 'akademy', 'events', 'vienna']
+++


I recently had the opportunity to attend [Akademy](https://akademy.kde.org/) - the annual world summit of KDE. This blog post covers my experience of the event, and is mostly a brain-dump memory aide. Akademy attracts KDE developers, enthusiast users and others from the wider Qt, KDE and distro communities. The event is a week-long in-person combination of talks and BoF (Birds of a Feather) sessions. This year Akademy was held at TU Wein in Vienna, Austria.

I'd never attended Akademy before, as I am not a KDE developer, and only recently starting running Plasma on my ThinkPad T450. My employer - Canonical - is a sponsor of the KDE project, and a silver level sponsor of Akademy.  A recent reorganisation inside Canonical meant I was able to take someone else's place at the last minute. So I booked travel and accomodation to attend from  Saturday to Tuesday. 

<center><blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Who&#39;s who at <a href="https://twitter.com/hashtag/Akademy2018?src=hash&amp;ref_src=twsrc%5Etfw">#Akademy2018</a>.<a href="https://t.co/54zSoKq8Nx">https://t.co/54zSoKq8Nx</a> <a href="https://t.co/U6kqrN9VP2">pic.twitter.com/U6kqrN9VP2</a></p>&mdash; Akademy (@akademy) <a href="https://twitter.com/akademy/status/1029382766184615936?ref_src=twsrc%5Etfw">August 14, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></center>

I understand many of the talks / sessions were recorded, and may appear on the [KDE Community YouTube Channel](https://www.youtube.com/channel/UCF3I1gf7GcbmAb0mR6vxkZQ/) at some point. 

## Day 0

Akademy kicks off with a pre-event meet-and-greet with drinks and buffet food on the Friday night. This was a great opportunity to put names to faces, get a better understanding of the week's structure from regular attendees and have some delicious nibbles and [Club Mate](https://twitter.com/popey/status/1028005720346832896).  The event has a dedicated [micro-site](https://akademy.kde.org/2018) which covers all the details including schedules, venue details, social events and travel recommendations. Bookmark [that site](https://akademy.kde.org/2018), and you're set for the week.

<center><blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">You know you&#39;re at a geek event when .. <a href="https://t.co/LGnbbOg0nH">pic.twitter.com/LGnbbOg0nH</a></p>&mdash; Alan Pope 🇪🇺🇬🇧 (@popey) <a href="https://twitter.com/popey/status/1028005720346832896?ref_src=twsrc%5Etfw">August 10, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></center>

## Day 1 & 2

[Saturday](https://conf.kde.org/en/Akademy2018/public/schedule/1) and [Sunday](https://conf.kde.org/en/Akademy2018/public/schedule/2) are mostly talks / discussions / reports. These are some notes I took from the ones I attended. Here begins the brain dump.

<center><blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">The <a href="https://twitter.com/kdecommunity?ref_src=twsrc%5Etfw">@kdecommunity</a> <a href="https://twitter.com/akademy?ref_src=twsrc%5Etfw">@akademy</a> delegates get a choice of lanyard. One lets other people know they don&#39;t want to be photographed. Not seen this at many events. <a href="https://t.co/HFcBeE5Y5K">pic.twitter.com/HFcBeE5Y5K</a></p>&mdash; Alan Pope 🇪🇺🇬🇧 (@popey) <a href="https://twitter.com/popey/status/1028224623509479424?ref_src=twsrc%5Etfw">August 11, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></center>

Akademy proper starts on the Saturday morning  with a set of talks & presentations and finally reports from KDE Working Groups. The keynote from Dan Bielefeld was titled "Mapping Crimes Against Humanity in North Korea with FOSS", and was both upsetting and fascinating. It detailed the work the [TJWG](https://en.tjwg.org/) (Transitional Justice Working Group) do in South Korea to gather data regarding crimes against humanity occuring in North Korea. Dan outlined the group, their work and highlighted some data they've gathered, then went on to discuss the Open Source tools they use to do their job. I'd recommend reading the report available as a [PDF](https://en.tjwg.org/TJWG_Report-Mapping_Crimes_Against_Humanity_in_North_Korea(July2017)-Eng_Final.pdf) from the [TJWG website](https://en.tjwg.org/). 

<center><blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">A little light reading in the bath this evening.<br>Seriously, these people do amazing work. Check it out, the pdf is in their website. <a href="https://t.co/5uxeazLFk0">https://t.co/5uxeazLFk0</a> <a href="https://t.co/MslooKKglU">pic.twitter.com/MslooKKglU</a></p>&mdash; Alan Pope 🇪🇺🇬🇧 (@popey) <a href="https://twitter.com/popey/status/1028336977710653441?ref_src=twsrc%5Etfw">August 11, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></center>

Next up was a set of talks from developers across the KDE community who work on all parts of the stack, from plasma desktop to PIM (Personal Information Manager) to Plasma Mobile. Each gave some detail from their project about how they all work in tandem to highlight how privacy is important to KDE developers and users. We heard that KDE Software doesn't 'leak' data, to promise users a better experience. 

One highlight here was from  Volker Krause who talked about the intrusive work large companies do analyse emails for travel information. In a section titled "Does Google really need to read your emails so you know when your next flight is?", Volker outlined why these features are problematic for users who value privacy. He also went on to introduce features landing in KDE PIM 18.04/18.08 which will gather flight data and render usable boarding cards, while respecting user freedom and privacy. This introduced a talk later in the week which would go into this in more detail.

Also in this session were details of how KMail will make it easier for users to send/receive and store GNUGP encrypted mail, but have the capability to search inside the mails without decrypting each one. In addition the KMail developers plan to make it easier to validate mails without user intervention, automatically discover keys for encrypted mails and derive trust based on communication history, so users don't need to choose which key to use.

Finally in this session, Bushan Shah talked about Plasma Mobile, and how it differs (from a privacy perspective) from the encumbent mobile OS vendors. He reiterated that with KDE 'your data is safe with us' as with Plasma Mobile 'your data is safe in *your* hands'. He also briefly talked about how they plan to keep software updated on the Plasma Mobile platform. 

Neofytos Kolokotronis presented next with his experience of "Streamlining Onboarding of new Contributors" within the KDE community. With KDE being a diverse community with dozens of projects & hundreds of contributors, there's not a central process for onboarding new contributors. So Neofytos covered his experience in building a better onboarding process, and highlighted numerous suggestions for how KDE projects can imrove the on-ramp for new people. I found this talk very engaging, with plenty of useful information which could apply to any open source distributed project.

In the afternoon some shorter talks stood out for me. David Faure ran a session on "Running without installing" - detailing how developers can test and develop KDE applications without messing up their host installation. This dovetailed nicely with the morning talk about onboarding new users. Often times new contributors only have one computer, and don't want to mess it up with random rebuilt libraries and other components to test if a bug they reported is fixed. David covered some of the things he's learned about separating out the things you're testing, which I feel could be useful for other projects too.

Lays Rodrigues gave her first talk (which went very well) about [Atelier](https://atelier.kde.org/) - a KDE application for managing 3D printers. This was interesting to me as I recently acquired a 3D printer, and was keen to learn of tools I can use to manage prints. I'd not heard of Atelier (and Atcore) before, so this was a great primer for me. It's early days in the project but they already support numerous 3D printer standards and can remotely monitor them via webcam. It even supports setups with muliple printers, such as organisations who print for a fee on demand.

Zoltan Padrah gave demo and some history of the [KTechLab](https://en.wikipedia.org/wiki/KTechLab) project, which I'd also never heard of before. It's a ciruit simulator, enabling users to drag and drop electronic components onto a layout and hook them up with wires. It's a great little tool which would appeal to a younger audience who are getting started with electronics. KTechLab has been around for quite a while, but hasn't had a lot of contributors recently. Unfortunately the application isn't available in many distributions, partly because it still uses some KDE 3 technologies. Zoltan is hoping to get more contributors so they can move the application forward to newer frameworks. 

At the end of the first day was a series of reports from various KDE Working Groups. I understand this was a relatively new concept in KDE. 5 Working Groups were setup as System Admin, Fundraising, Finance, Community and Advisory. Representatives from each WG gave a brief report to the audience.  These were relatively short, mostly detailing the impacts of their work as user/contributor numbers go up, or work gets done. 

The number individual supporting members (sponsors) rose from 540 (last year) to 597 with 109 paying members (up from 99 last year). As a new attendee I was surprised to learn that KDE e.V. itself has only 3 'staff', one who manages accounting, travel booking etc and two Marketing Contractors who work on the KDE Promo Team. Akademy 2019 is not yet organised as no venue has been selected. This work is ongoing, but the KDE folks could do with help identifying a potential host. KDE received a significant ($200K) donation from 'Pineapple Fund', some of  which was used to fund travel to Akademy. The project are still figuring out what to do with the rest. Previously KDE e.V. has been very cautious about how they spend funds, but there is a desire to change that. Perhaps hiring people / contractors to accelerate projects.

<center><blockquote class="twitter-tweet" data-lang="en"><p lang="und" dir="ltr"><a href="https://t.co/Jb3yt3GkpL">pic.twitter.com/Jb3yt3GkpL</a></p>&mdash; Alan Pope 🇪🇺🇬🇧 (@popey) <a href="https://twitter.com/popey/status/1028658765074243585?ref_src=twsrc%5Etfw">August 12, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></center>

One of my favourite talks of the weekend was from Nate Graham titled "Konquering the world - A 7 step plan to KDE world domination". In it Nate covered very clearly 7 areas the KDE project needs to improve, and suggested improvements and their intended outcomes. This was a superbly positive talk, despite it raising some issues that have clearly been a problem for KDE for some time. I transcribed the notes, and shared via [Twitter]( https://twitter.com/popey/status/1028658765074243585) and [Mastodon]( https://mastodon.social/@popey/100537865834983077).

The final slot on the second day was for "Akademy Awards". Members of the KDE community were given public recognition for their contributions over the last year. This was a nice touch, a direct "thank you" goes a long way.

## BoFs

Starting on Monday, the much of the rest of the week was occupied with working and BoF sessions. 

### KDE Promo BoF

I was keen to sit on on this session as there's some overlap between my day job on Snapcraft and what the KDE Promo team are doing. We discussed the Debian PopCon (popularity contest) numbers for Plasma desktop, and how they are on the way upwards. It was noted that the Ubuntu PopCon is no longer functional.

We discussed social media strategies for promoting various KDE initiatives and releases. One of the KDE PIM developers was looking for assistance promoting the application, and finding new contributors. We discussed options including making appearances on technical podcasts to put out calls for contributors. 

Overall an interesting session which made me want to get more involved in the promotion side of KDE. I've joined the KDE Promo Telegram & IRC channel to keep up to date with what's going on, and be aware of upcoming promotions which I can share or be involved in.

### KDE Distro BoF

This was less of a BoF and more of a presentation round for each of the leading distribtions with some discussion afterwards. There were presentations from a few distros including Kannolo, Chakra, NXOS, LiMux, KDE Neon and others. It was interesting to hear the perceived unique selling point of each distro. We had a short discussion afterwards. Notably we discussed the ways in which distros deal with bugs and crash reports from users. I passed on some of our experience using the whoopsie crash reporter in (K)ubuntu, and our bug tracking activites in Launchpad. 

### Flatpak & Snap BoF

This session covered a lot of ground, mostly relating to improving support for the new packaging formats du jour. We discussed the support for Snaps and Flatpak in Plasma Discover - the graphical storefront for apps. There was a lot of detailed discussion regarding KDE runtimes, and how and where they may be built. Buildstream seemed like a possible candidate. KDE are keen not to have too much duplication of work to build multiple runtimes for the various new packaging systems. We discussed improving the documentation for building new packages, and I've committed to updating our documentation for building KDE snaps.

### KDE Neon

The final (and longest) BoF I attened was the KDE Neon planning session. Harald led the session with a set of discussion points and planning activities for the KDE Neon project. A lot of the discussion was technical build system engineering, release planning and identifying progress blockers.

One highlight for me included discussion of when to sunset KDE Neon  based on Ubuntu 16.04, and when to anticipate people to have moved to Neon based on 18.04. Given no expectations had been set in the user community, it was felt the devs could give a relatively short support window for Neon 16.04. Thanks to the snap store metrics for the pre-installed kde-frameworks-5, they were able to get a good handle on how many users were already moving to pre-release 18.04. This data will enable the Neon developers to gauge how well their "You should upgrade now" promotional work is going, and how many users are sticky on the older release.

We also discussed snap support in KDE Neon. The KDE Neon developers have limited time to work on creating & maintaining application snaps for Neon and other distros. We (Canonical) regularly catch up with the KDE developers, but we need to dedicate some more time to help debug and accelerate the building of the latest KDE leaf applications for their users. We've already started on this, but there's  a lot to do, so will spread it over the coming weeks.

### Final thoughts

As I left to catch my flight on Tuesday, I said my goodbye's to new friends and old at Akademy. As this was my first attendance, I wasn't exactly sure what to expect, but whatever those expectations were, they were exceeded. The KDE community is a warm, friendly, diverse and welcoming bunch of people. Everything was very well organized, relaxed and methodical. We have good notes to cover everyone's actions and can track progress on the plans for the coming months. 

It reminded me of Ubuntu Developer Summits from  10 years ago. I absolutely [loved](https://twitter.com/popey/status/1029404614528000007) spending time at Akademy, and would love to go again to a future event. 

<center><blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">The <a href="https://twitter.com/kdecommunity?ref_src=twsrc%5Etfw">@kdecommunity</a> <a href="https://twitter.com/akademy?ref_src=twsrc%5Etfw">@akademy</a> initiation ceremony begins like this <a href="https://t.co/C36KKwdIRA">pic.twitter.com/C36KKwdIRA</a></p>&mdash; Alan Pope 🇪🇺🇬🇧 (@popey) <a href="https://twitter.com/popey/status/1029404614528000007?ref_src=twsrc%5Etfw">August 14, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></center>


