+++
date = "2024-04-27T09:00:00+01:00"
title = "The Joy of Code"
slug = "2024/04/the-joy-of-code"
author = "Alan Pope"
tags = ['']
+++

A few weeks ago, in [episode 25](https://linuxmatters.sh/25/) of [Linux Matters Podcast](https://linuxmatters.sh/) I brought up the subject of 'Coding Joy'. This blog post is an expanded follow-up to that segment. Go and listen to that episode - or not - it's all covered here.

[![The Joy of Linux Torture](/blog/images/2024-02-20/linuxmatters-banner-3000x750_30.png)](https://linuxmatters.sh/25/)

## Not a Developer

I've said this many times - I've never considered myself a 'Developer'. It's not so much *imposter syndrome*, but plain facts. I didn't attend university to study software engineering, and have never held a job with 'Engineer' or Developer' in the title. 

(I do have Engineering Manager and Developer Advocate roles in my past, but in *popey's weird set of rules*, those don't count.)

I *have* written code over the years. Starting with BASIC on the Sinclair ZX81 and Sinclair Spectrum, I wrote stuff for fun and no financial gain. I also coded in Z80 & 6502 assembler, taught myself Pascal on my Epson 8086 PC in 1990, then [QuickBasic](https://en.wikipedia.org/wiki/QuickBASIC) and years later, [BlitzBasic](https://en.wikipedia.org/wiki/Blitz_BASIC), Lua (via [LÖVE](https://love2d.org/)) and more. 

In the workplace, I wrote some alarmingly complex utilities in Windows batch scripts and later Bash shell scripts on Linux. In a past career, I would write ABAP in SAP - which turned into an internal product mildly amusingly called "*Alan's Tool*".

These were pretty much all coding for fun, though. Nobody specced up a project and assigned me as a developer on it. I just picked up the tools and started making something, whether that was a sprite routine in Z80 assembler, an educational CPU simulator in Pascal, or a spreadsheet uploader for SAP BiW.

In 2003, three years before Twitter launched in 2006, I made a service called 'Clunky.net'. It was a bunch of PHP and Perl smashed together and published online with little regard for longevity or security. Users could sign up and send 'tweet' style messages from their phone via SMS, which would be presented in a reverse-chronological timeline. It didn't last, but I had fun making it while it did.

They were all fun side-quests.

None of this makes me a developer.

## Volatile Memories

It's rapidly approaching fifty years since I first wrote any code on my [first computer](/blog/2021/03/fourty-years-on/). Back then, you'd typically write code and then either save it on tape (if you were patient) or disk (if you were loaded). Maybe you'd write it down - either before or after you typed it in - or perhaps you'd turn the computer off and lose it all.

When I studied for a BTEC National Diploma in Computer Studies at college, one of our classes was on the IBM PC with two floppy disc drives. The lecturer kept hold of all the floppies because we couldn't be trusted not to lose, damage or forget them. Sometimes the lecturer was held up at the start of class, so we'd be sat twiddling our thumbs for a bit.

In those days, when you booted the PC with no floppy inserted, it would go directly into [BASICA](https://en.wikipedia.org/wiki/IBM_BASIC#IBM_Advanced_BASIC), like the 8-bit microcomputers before it. I would frequently start writing something, anything, to pass the time.

With no floppy disks on hand, the code - beautiful as it was - would be lost. The lecturer often reset the room when they entered, hitting a big red 'Stop' button, which instantly powered down all the computers, losing whatever 'work' you'd done.

I was probably a little irritated at the moment, just as I would when the [RAM pack](https://en.wikipedia.org/wiki/RAM_pack) wobbled on my ZX81, losing everything. You move on, though, and make something else, or get on with your college work, and soon forget about it.

Or you bitterly remember it and write a blog post four decades later. Each to their own.

## Sharing is Caring

*This part was the main focus of the conversation when we talked about this on the [show](https://linuxmatters.sh/25/).*

In the modern age, over the last ten to fifteen years or so, I've not done so much of the kind of coding I wrote about above. I certainly have done *some* stuff for work, mostly around packaging other people's software as snaps or writing noddy little shell scripts. But I lost a lot of the 'joy' of coding recently.

Why?

I think a big part is the expectation that I'd make the code available to others. The public scrutiny others give your code may have been a factor. The pressure I felt that I should put my code out and continue to maintain it rather than throw it over the wall wouldn't have helped. 

I think I was so obsessed with doing the 'right' thing that coding 'correctly' or following standards and making it all maintainable became a cognitive roadblock.

I would start writing something and then begin wondering, 'How would someone package this up?' and 'Am I using modern coding standards, toolkits, and frameworks?' This held me back from the joy of coding in the first place. I was obsessing too much over other people's opinions of my code and whether someone else could build and run it. 

I never *used* to care about this stuff for personal projects, and it was a lot more joyful an experience - for me. 

I used to have an idea, pick up a text editor and start coding. I missed that.

## Realisation

In January this year, [Terence Eden](https://shkspr.mobi/) [wrote](https://shkspr.mobi/blog/2024/01/rebuilding-foursquare-for-activitypub-using-openstreetmap/) about his escapades making a FourSquare-like service using ActivityPub and OpenStreetMap. When he first mentioned this on Mastodon, I grabbed a copy of the code he shared and had a brief look at it.

The code was surprisingly simple, scrappy, kinda working, and written in PHP. I was immediately thrown back twenty years to my terrible 'Clunky' code and how much fun it was to throw together. 

In February, I bumped into Terence at [State of Open Con](https://stateofopencon.com/) in London and took the opportunity to quiz him about his creation. We discussed his choice of technology (PHP), and the simple 'thrown together in a day' nature of the project.

At that point, I had a bit of a light-bulb moment, realising that I could get back to joyful coding. I don't have to share everything; not every project needs to be an Open-Source Opus.

I *can* open a text editor, type some code, and enjoy it, and that's *enough*.

## Joy Rediscovered

I had an idea for a web application and wanted to prototype something without too much technological research or overhead. So I created a folder on my home server, ran `php -S 0.0.0.0:9000` in a terminal there, made a skeleton `index.php` and pointed a browser at the address. Boom! Application created! 

I created some horribly insecure and probably unmaintainable PHP that will almost certainly never see the light of day.

I had fun doing it though. Which is really the whole point.

More side-quests, fewer grand plans.













