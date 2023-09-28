+++
date = "2023-09-29T10:00:00+01:00"
title = "Where's my hard drive?"
slug = "2023/09/wheres-my-hard-drive"
author = "Alan Pope"
tags = ['tfts']
+++

This is the fourth in a series of Friday [Tales From Tech Support](https://popey.com/blog/tags/tfts/). Some stories from the past featuring broken computers and even more broken tech support operatives - mostly me.

## Scene setting

Today's story is another belter from my stint on the helpdesk for a large accounting & consulting organisation in central London. It's around 1995 and I'm a happy-go-lucky, young, free and single tech support operative. Always happy to help, and generally enjoying the work. That can change though.

Over time, the various offices had many different computing devices available to users. The most common among office-bound workers were [IBM PS/ValuePoint](https://en.wikipedia.org/wiki/IBM_PS/ValuePoint) desktops. Many of them sat on the desks of PAs (Personal Assistants) to the Partners. 

These desktops ran [Windows 3.11](https://en.wikipedia.org/wiki/Windows_3.1x) and whatever the contemporary version of Microsoft Office was at the time, probably 3.0 or 4.0. These were connected via a [Token-Ring](https://en.wikipedia.org/wiki/Token_Ring) network to servers, where users were told to store their important data.

*Foreshadowing*

## Office crash

One such user had constant problems with Microsoft Word. It would crash frequently, losing documents, wasting time and generally causing frustration. I had been out to visit this PA a bunch of times. We tried a few things including cleanups, reinstalling Office, and whatever other magic packages of DLLs we could find.

Eventually, when we got what seemed like the hundredth call from the user, the helpdesk manager uttered the magic words "**Format the fucker!**". Let me translate. What he meant by that was "*Please restore the computer to a last known good state*".

Now, you have to understand the tools at our disposal in 1995 weren't great. We didn't (yet) have imaging systems like [Ghost](https://en.wikipedia.org/wiki/Ghost_(disk_utility)) or [CloneZilla](https://en.wikipedia.org/wiki/Clonezilla). What we tended to do was 'clone' a nearby system which worked properly. Then we would personalise the system with whatever configuration or additional applications were required for that user.

## Colourful cables

What we *did* have was [Laplink](https://en.wikipedia.org/wiki/Laplink)! Essentially a floppy disk containing the Laplink software, and a yellow or blue cable. The blue cable had two connectors on each end, to support both 9 pin D-sub and 25 pin serial ports. The yellow cable was the one you wanted though. It had a 25 pin D-sub for connecting two computers via their parallel interfaces. The yellow cable was much faster.

I vaguely recall a triple-headed Laplink cable, but I don't know what colour that was, and I certainly wasn't *worthy* enough to wield one.

## format c: /s

So I went out to visit the user to arrange a time when I could come back with the disk and cable to reset her machine. I warned her that she needed to back everything up, and it might take a while. So I planned to visit her the next day at lunch-time. She left for lunch with her desk-neighbour, Kim, while I worked.

I scrambled around under both adjacent desks to get the cables connected, then started Laplink on each end. I wiped the problematic hard disk then started the transfer of everything from the neighbour's PC with my glorious yellow cable. While I waited, the Snake game on my [Nokia 2140](https://www.gsmarena.com/nokia_2110-24.php) kept me busy.

When the transfer was finished, I unplugged the cables and put everything back under the desk, added applications the user needed and configured everything for them. All done. 

They came back from lunch and got on with the rest of their day. I left, knowing I'd likely not hear from them again!

*Additional Foreshadowing*

## Friendly follow-up

We didn't get any further calls on the helpdesk about the crashing PC. Maybe a week or so later, I happened to be passing their desk, and checked in. It did not go as I expected.

> Me: "Heya, how's your PC? Word still crashing?"

> PA: "Hi! No, that's all fixed now, no problem. Just one question..."

> Me: "Sure, whassup?"

> PA: "Where's my hard drive?"

> Me: "Eh?"

I was a little puzzled by this question. I wasn't sure if she meant *conceptually* where is it, or *physically* where inside the computer her hard drive could be found.

The PA turned her 17" CRT display towards me. Windows File Manager was open, showing her `C:` drive. 

> PA: "This is Kim's hard drive, where's mine?"

Kim turned her display towards me too, also showing Windows File Manager. The contents of the displays were uncannily, and unsurprisingly identical.

> Me: "Uh, well, it's gone, isn't it?"

> PA: "What!?"

## Shaken, not stirred

At this point the PA starts visibly shaking. She's holding her head in her hands, not knowing where to look.

> Me: "Remember, last week, I said I needed to wipe it, and install fresh. Why?"

The PA was getting *very* agitated by now. With every word from her mouth she shook more.

> PA: "No. It can't be! No! It's GONE!"

I'm now informed, the PA's boss, a Partner in the organisation, was writing a book. He'd verbally dictate the content onto a tape and the PA would type it up. The only existing electronic copy of his book was saved on the local hard drive on her PC.

**Awkward**.

> Kim: "I think you better leave."

I left and then explained to my boss at the helpdesk what happened. This was clearly terribly unfortunate for the PA, although her PC wasn't crashing anymore! So, silver lining, and all that. 

## Floppy finder

I later discovered the PA and Kim had initiated a clandestine project to get the book back, without her boss knowing it was ever missing. 

They'd remembered at some point a copy of the book had been saved on a floppy so the boss could review it. However, they didn't know which disk. So they hoovered up all the disks on that floor of the building. 

There were probably a hundred people or more who gave up all their disks on the off chance one had been re-used. The pair of them went through every disk until they found it.

I'm told they eventually found an old copy on a random disk in the office! Phew! All's well that ends well. Although I did feel it prudent to avoid that department for a bit.

## Epilog

Months later, it was the Christmas party. The company would hire out a rather nice hotel in central London for us to all drink too much and be silly. 

I was standing with my colleagues, enjoying a drink, when, during an interlude in the music a loud female voice yelled "**HEY!**" while pointing in my direction, from the other side of the room...

"**HE FORMATTED MY HARD DRIVE!!**"

Oh dear. That happened at every office party. 
