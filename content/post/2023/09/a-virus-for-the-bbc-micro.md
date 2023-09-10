+++
date = "2023-09-10T10:30:00+01:00"
title = "A virus for the BBC Micro"
slug = "2023/09/a-virus-for-the-bbc-micro"
author = "Alan Pope"
tags = ['retro', 'bbc', 'virus']
+++

About a year ago, I left a comment on a [Nostalgia Nerd](https://www.nostalgianerd.com/) video about Viruses. It's a good video, worth a watch, like most of their content.

{{< rawhtml >}}
<iframe width="560" height="315" src="https://www.youtube.com/embed/_2E6dLCLKo8?si=reiThYmZaVsF8AeI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
{{< /rawhtml >}}

Here's my silly comment.

[![Internet comment](/blog/images/2023-09-10/comment.png)](/blog/images/2023-09-10/comment.png)

At 1.7K 👍, it's my most upvoted comment on YouTube, ever. I do enjoy free Internet points. 

Some of the replies to me on YouTube were quite 🌟fun🌟.

> "Any chance you made a back up? I'd love to look at the source code"

> "Your mother must be so proud of you, cangrats on going to the darkside."

> "I felt like you made this up as a Joke. I think your being serious but I feel like your lying to try and sound cool but are actually making us who are knowledgeable cringe in laughter.  On a side note I raise you the coincidence that my name is Aaron Turner, founder of the Church of Marijuana to which I was considered PopePotHead.... to a relatively well known community. They often called me Pope or Aaron Pope for short. Close coincidence of similar names. Or too close..... Alan Pope or is that your real name..... hmmm I too once made a fool of myself to the hat community when I thought I knew what I was talking about but all I truly knew was how to make an ass of myself and honestly wish I could apologize for my shameful ignorant coding past."

My absolute favourite:

> "You should definitely be prosecuted for this: The Computer Misuse Act 1990 was preceded by preliminary legislation 15 months prior affecting England and Wales only. Just because a crime's historic it does not nullify it."

Uh, ok, Mister Party Pooper.

In short, no, I'm not making it up, I did make a virus back in 1990. I don't have the source code, unfortunately, for two reasons. It was over thirty years ago. I'm a chronic hoarder, but seemingly not that chronic. The floppy discs containing the code were confiscated.

No, my mum wasn't proud, indeed she didn't even know about this episode at the time, and still doesn't. Not that she'd understand what a computer virus is, even if I attempted to explain it to her. 

## Why?

Because I can.

I was in education at the time, so I was learning all about computer architecture and programming. I was eighteen and had near-limitless time to screw around with the computers at my disposal. I had a real 'hacker' mentality to play with things, trying understand how they worked. Also, I hadn't discovered girls yet.

## How?

Now you're asking! This was over thirty years ago, and I didn't document what I did. This blog is all from memory and isn't a complete how-to. I may make some mistakes down here, but here goes anyway.

I was studying at a local college where they had three labs in the computer suite. One room contained IBM PC-XTs. Another room held the IBM-AT class of computers. The third contained around sixteen to twenty BBC Microcomputers. 

For anyone unfamiliar with the popular BBC Micro from [Acorn](https://en.wikipedia.org/wiki/Acorn_Computers), go [here](https://en.wikipedia.org/wiki/BBC_Micro) online or [here](https://www.computinghistory.org.uk/) in person (they have a room full of them). Also, if you can find the docu-drama [Micro Men](https://en.wikipedia.org/wiki/Micro_Men) somewhere, watch that. It's fun.

Note that according to [Wikipedia](https://en.wikipedia.org/wiki/BBC_Micro)

___"While nine models were eventually produced with the BBC brand, the phrase "BBC Micro" is usually used colloquially to refer to the first six (Model A, B, B+64, B+128, Master 128, and Master Compact); subsequent BBC models are considered part of Acorn's Archimedes series."___

The BBC Micros were amazing machines. They were well-designed inside and out, with tons of ports for expandability. I am pretty sure I wrote the virus on a BBC Master, rather than an older BBC Model B.

## A short aside

__Skipping forward from this story in 1990 to 2016 for a brief aside.__

After a week of work away from home, I boarded a [plane](https://www.flightradar24.com/data/flights/ba190) from Austin, Texas to London, UK. I managed to snag a front seat in 'economy plus' next to the window, and started unpacking my personal crap into the pocket attached to the bulkhead in front of me. 

Another chap got on and started unpacking and sorting himself out in the seat next to me. As is typical for Brits in public, we acknowledged each other but not much more conversation than that. 

I noticed he had a ThinkPad tucked in the pocket, and at some point glanced over and saw some [ARM](https://arm.com/) branding on something. I assumed he worked in tech in some way, so figured I might try and have a chat to pass the time.

I think I tried to start a conversation about his ThinkPad, guessing the model number - which is a stupid nerdy thing I do when I spot one. I got it right and then he noticed the book I was reading. It was [The Soul of a New Machine](https://en.wikipedia.org/wiki/The_Soul_of_a_New_Machine) by [Tracy Kidder](https://en.wikipedia.org/wiki/Tracy_Kidder). The book was used in production of [Halt and Catch Fire](https://en.wikipedia.org/wiki/Halt_and_Catch_Fire_(TV_series)) which is worth a watch.

He asked where I got the book, because he hadn't seen his copy for a long time. I mentioned I'd got it second-hand on [Amazon](https://geni.us/PAfKjD9), so I don't think it was his lost copy. 

That got us talking about computers from the past, which, for men of a certain age, with particular interests, will always be a topic we can chat about anywhere, at length. 

Part-way through the conversation, I mentioned the BBC Micro. He knew a lot about this topic, because it turned out he was Chris Turner, previously Chief Engineer, employee number one at Acorn, the people who designed the BBC Micro (among other things).

I was *somewhat* starstruck. We spent the entire nine-hour flight quaffing red wine and chatting about the BBC Micro, the Micro Men documentary, the Domesday project and more. You could say the time *flew* by. One of the most enjoyable flights of my life. A lovely man who was happy to chat for hours about past achievements. 

You can find a video interview with Chris over on the Computing History channel [here](https://www.youtube.com/watch?v=GKHEsp8MYTM).

## How again?

Ok, back to 1990 with some more background information. 

### Sideways RAM

The BBC Micro architecture is based around the 6502 CPU, an 8-bit unit that can address 64KiB of memory. However, in some models, you can add more memory in sockets to expand beyond 64KiB. That could be RAM or ROM. 

The memory could be used for more storage space for your own programs in RAM, or to add functionality to the device via ROM. It was common in those days to buy software on ROMs, plug them in, and get additional programming language support, compilers and applications. 

### Reboot & reset

The BBC had a built-in power supply, and a massive switch on the back. To power on (or off) the device, you'd reach around to the back of the unit, and flip the switch. Here's a video I made in 2017 after fixing the power supply on my BBC Micro. I am clearly quite excited that the new capacitors worked.

[![BBC Booting](/blog/images/2023-09-10/bbcboot.jpg)](/blog/videos/2023-09-10/bbcboot.mp4)

Booting like that effectively clears the memory by powering it down. 

However, you can also soft-reset the BBC with the keyboard combo `[CTRL]+[BREAK]`. This does *not* clear all the memory. 

### !BOOT

Another crucial keyboard combo is `[SHIFT]+[BREAK]` which is commonly used to boot from the first floppy disk. Many people had 5.25" floppy drives with their BBC Micro, and this easily-pressed combination of keys made loading and launching from disk quick and easy.

The DFS (Disc Filing System) would look for a file called `!BOOT` on the floppy disc, load it into memory and execute it, or paste it in as text and run it. There are a lot more details about this, which aren't super important, but that's the boot process in a nutshell.

### Polling ROMs

When the system is powered on or reset (for example, with `[CTRL]+[BREAK]`), the BBC MOS (Machine Operating System) will 'poll' each installed sideways ROM (and RAM!) to see if there's anything there. MOS would page in each bank, examine some bytes at the start then optionally jump to (that is start to execute) from a 'Service address' specified early in the ROM (note: or RAM).

This process is documented on the [Beebwiki](https://beebwiki.mdfs.net/Paged_ROM#API), but I've no idea how I worked this out back in 1990 because Wikis weren't a thing then. I probably borrowed a book from the local library.

Here's what a typical (emulated) BBC looks like once booted up. I used the rather excellent [b2](https://github.com/tom-seddon/b2) BBC emulator by [Tom Seddon](https://github.com/tom-seddon) to take this.

[![BBC Boot](/blog/images/2023-09-10/boot.png)](/blog/images/2023-09-10/boot.png)

Installed ROMs will often 'announce' themselves with a banner at the top of the screen when the BBC boots up. Here's an (emulated) BBC Micro with an [Opus Challenger](https://beebwiki.mdfs.net/Opus_Challenger) ROM installed, which gets announced at boot time due to the polling done by the MOS at startup.

[![BBC Boot](/blog/images/2023-09-10/opus.png)](/blog/images/2023-09-10/opus.png)

There are some examples on the [Code_header](https://beebwiki.mdfs.net/Code_header#ROM_type_byte) page on the wiki which further explains this boot polling by the MOS.

### Accessing disks

I don't remember how I did this. There's clearly going to be some functions in the DFS (Disk Filing System) ROM I could call to get the disk catalog, writable status of the disk and so-on. Given my age and experience at the time, I presume I did minimal error checking, and just brute-force renamed files and wrote the virus to disk.

## Putting it together

It was possible to build a simple "virus" using the above knowledge.

My plan for the "proof of concept" was as follows:

* 'Hide' the virus code in a sideways RAM block
* Masquerade as a ROM
* On each boot, look for a disk in drive 0
* If a disk is inserted, read the `!BOOT` file
* If the contents of `!BOOT` are not 'me' then rename it to another file
* Write 'me' out to `!BOOT`, with a chain loader to pull in the 'real' (renamed) `!BOOT` file
* On reset, increment a counter inside the virus RAM
* When the counter gets to 32, display a message to print "Hello world" in double-height mode 7 font

That's it. It doesn't delete files (other than monkeying with whatever was in `!BOOT`), and doesn't mess with the system. Here's roughly what it looked like after 32 resets.

[![Virus](/blog/images/2023-09-10/virus.png)](/blog/images/2023-09-10/virus.png)

I wrote the code on paper and hand-assembled it to poke into the sideways RAM bank directly. A short BBC BASIC program would read the assembled code from `DATA` statements. 

One downside was of course if the computer was turned off completely, the virus code was lost. That's why it always searched for `!BOOT` files to replicate itself. In those days people rarely powered the machine off during use. It was way more common to just stab `[CTRL]+[BREAK]` to reset the system.

I tested this on a couple of BBC Masters in the college. After a bit of debugging, it worked. It would happily replace the `!BOOT` file on an inserted disk, if the user hit `[CTRL]+[BREAK]` or `[SHIFT]+[BREAK]`. I then powered off the computers and went home.

One of the rules in the computer suite was that discs couldn't come or go from the lab. We had to hand our boxes in to the reception staff as we left. Someone told the staff what I was doing, or they overheard me talking about it, and refused to let me have my discs back the next day.

I don't think I got 'punished' other than losing my box of discs, which also contained a bunch of games and other projects. Sad times.

One day I would love to take the time to re-create the virus in an emulator. It's not tremendously complicated and isn't going to infect any computers. There are just some file operations required, which I'm sure I can easily find documentation online for. 

Maybe I could do it on a live stream at some point. Would anyone watch that?

While it wouldn't really be useful to anyone, it would be a nice trip down evil-memory lane for me.