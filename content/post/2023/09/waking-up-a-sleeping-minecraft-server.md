+++
date = "2023-09-24T17:00:00+01:00"
title = "Waking up a sleeping Minecraft server"
slug = "2023/09/waking-up-a-sleeping-minecraft-server"
author = "Alan Pope"
tags = ['minecraft']
+++

Today I dusted off a Minecraft server backup to see if it would still work, to explore and remind myself what was there.

**tl;dr** The world still works in Minecraft, and I can even generate a nicely rendered map from it. There's not a tremendous amount to actually *see* on the map. A lot of work went on **underground**. There's also little nostalgia value other than for the sixty people who played on it back then. But it was fun getting it working.

Maybe this will be interesting or useful to someone.

[![Minecraft map](/blog/images/2023-09-24/minecraft-map.png)](https://popey.com/~alan/minecraft/)

## Background

According to their API, I first installed Minecraft and created a Mojang account at this time: `2010-10-19T21:42:36Z`. I used to play Minecraft back in 2011 with friends and my children.  

I ran a few Minecraft servers on old computers at my house for a while. The computers were [Acer Aspire Revos](https://en.wikipedia.org/wiki/Acer_AspireRevo). They're not highly specced machines but had just enough oomph to allow a few players to enjoy the blocky environment.

## Hoarding worlds

When we all stopped playing, I backed up the server world files and stashed them away. These are the tarballs, still taking up a little space on my home server. As with all my systems, the hostnames came from lists of [Computers from Science Fiction](https://en.wikipedia.org/wiki/List_of_fictional_computers), and characters (specifically robots) from Futurama.

```text
140M angelyne_snapshot-2011-11-20-19-19-43.tgz
163M angelyne_snapshot-2011-12-21-16-46-05.tgz
281M calculon_snapshot-2011-12-21-16-46-28.tgz
316M hactar-snapshot-2011-09-14-22-57-30.tgz
100M oldclamps_snapshot-2011-12-21-16-22-05.tgz
1.4M snapshot-2011-09-14-22-57-30.tgz

```

You may be asking yourself, *"Who keeps backups of old Minecraft servers from a decade ago!?"*.

Hello! 👋

I thought it might be time to dust them off, spin them up, and have a poke around. 

## Installing Minecraft

Getting the game working is pretty easy these days. Back then, on Linux, I would download a `.jar` file and launch `java -jar ./minecraft.jar`. Indeed, back then, my Daughter once saw me do this and thought it was super weird I didn't just click an icon. 

Today, I just grabbed the Minecraft deb package from https://www.minecraft.net/en-us/download. This required me to remember my Microsoft account details. Installing the Minecraft deb is as simple as any other application.

`sudo apt install ./Minecraft.deb`

In-game, I signed into the same Microsoft account then hit play. It downloaded the latest version of Minecraft (1.20.2). 

[![First run](/blog/images/2023-09-24/firstrun.png)](/blog/images/2023-09-24/firstrun.png)

I wanted to make sure Minecraft worked, so I created a "Test World".

[![BAAAA!](/blog/images/2023-09-24/1.20.2.png)](/blog/images/2023-09-24/1.20.2.png)

So far so good!

## Insert world

I then exited out of the game, and copied the unpacked `hactar-snapshot-2011-09-14-22-57-30.tgz` tarball to `~/.minecraft/saves/Hactar`, so Minecraft could it. Launching Minecraft 1.20.2 wouldn't open the world, as it was in an old format that needed conversion.

[![Conversion required part one](/blog/images/2023-09-24/conversionrequired1.png)](/blog/images/2023-09-24/conversionrequired1.png)

Further, 1.20.2 wouldn't convert it, so I'd have to go back in time.

[![Needs 1.6.4](/blog/images/2023-09-24/needs1.6.4.png)](/blog/images/2023-09-24/needs1.6.4.png)

Thankfully the Minecraft launcher is able to download and manage older versions of the game. This is handy if someone has an old server, like mine, or if the user wants to run some version-specific mods.

## Roll back the clock

In Minecraft Launcher go to Installations -> New installation -> 

Create the new installation as 1.16.4.

**Note:** The eagle-eyed among you will spot that I made a mistake here, picking **1.16.4** rather than **1.6.4**. It worked though. 🤷

[![Install an older version](/blog/images/2023-09-24/olderversion.png)](/blog/images/2023-09-24/olderversion.png)

In theory I could click the green "Play" button, open the world, and subsequently convert it.

[![Play older version](/blog/images/2023-09-24/playolderversion.png)](/blog/images/2023-09-24/playolderversion.png)

So, I clicked Play, then chose the old world. 

[![Conversion required](/blog/images/2023-09-24/conversionrequired2.png)](/blog/images/2023-09-24/conversionrequired2.png)

Clicking this next "I know what I'm doing!" button should have worked.

[![Conversion required](/blog/images/2023-09-24/conversionrequired3.png)](/blog/images/2023-09-24/conversionrequired3.png)

However, on my main workstation, Minecraft just sat there, never opening the world. Indeed, it eventually went unresponsive, so I killed it with extreme [prejudice](https://en.wikipedia.org/wiki/Xkill).

Using the exact same method on my M1 MacBook Air worked perfectly. So I did the conversion of the world there, and then used `scp` over [ZeroTier](https://popey.com/blog/2023/08/zerotier-is-my-personal-vpn/) back to my workstation.

## Enter the past

Once I'd copied the world over, I relaunched Minecraft 1.16.4 and...

[![Conversion required](/blog/images/2023-09-24/pyramid.png)](/blog/images/2023-09-24/pyramid.png)

Great success!

I spent a little time wandering around, thinking about the times we spent digging holes, building pyramids, laying railway lines and constructing castles. Happy memories.

## Map men, map men, map map map men men

Back in 2011, I used to regularly generate and host a web-accessible world map. This enabled players to look around the discovered world and see what others had built. I used Minecraft Overviewer to do that, back then. 

I thought I might try again, but the original [Minecraft Overviewer](https://github.com/overviewer/Minecraft-Overviewer) I'd used has since gone [unmaintained](https://github.com/overviewer/Minecraft-Overviewer/commit/13c1bddaf65dfaaf6c4c7a396c94db75bed4c089). Given I'm only running it for fun, and don't plan to ask for support, I went down the rabbit hole of trying to get it working against this world.

I wasted a little time on this before switching to a more modern fork found at [The Minecraft Overviewer](https://github.com/GregoryAM-SP/The-Minecraft-Overviewer/releases/tag/v1.20.3). I grabbed it, installed the prerequisites on my Ubuntu desktop, and then pointed it at my newly updated Minecraft world.

Another great success. It chugged away for twenty minutes, building all the tiles and map. I've put a copy online for now, which you can get to [here](https://popey.com/~alan/minecraft) or by clicking the image below. Note the pyramid and sphinx are those shown in the screenshot above.

[![Minecraft map](/blog/images/2023-09-24/pyramidmap.png)](https://popey.com/~alan/minecraft/#/-435/64/616/-2/world/world-lighting)

## Sights

This is far from peak Minecraft architecture and design. It was mostly a bunch of little houses made by some friends online in a safe world.

### Spawn

Everyone initially started building right near the spawn point until we all branched out a little further afield. The spawn features a large rail terminus, with tracks branching out all over the map. There's a pirate ship, because of course there is. 

I enjoyed seeing the terrarium (bottom right) being created, as well as the hot and cold taps, without their handles. 

[![Spawn](/blog/images/2023-09-24/spawn.png)](https://popey.com/~alan/minecraft/#/-276/64/105/-2/world/world-lighting)

### Our house

My kids (who were eight and five years old at the time) enjoyed playing on the map. We started building a simple wooden home. There was a farm next door. We also had a collaboratively made maze just outside.

[![popey's house](/blog/images/2023-09-24/popeyshouse.png)](https://popey.com/~alan/minecraft/#/413/64/158/-1/world/world-lighting)

### Unfinished Antesher

We cleared some space to re-create the city of Antesher, which was the setting in the Sinclair Spectrum game [Ant Attack](https://worldofspectrum.org/files/large/de182362909c85e).

[![Unfinished Antesher](/blog/images/2023-09-24/antesher.png)](https://popey.com/~alan/minecraft/#/-448/64/-132/-2/world/world-lighting)

### Chinnybob's place

I remember liking the design of Chinnybob's place when they built it. 

[![Chinnybob's place](/blog/images/2023-09-24/chinnybob.png)](https://popey.com/~alan/minecraft/#/-407/64/265/max/world/world-lighting)

## Happy memories

Spinning this up, wandering around in the world, and showing it to a few people who played there has brought back some happy memories. Weird how a previously dormant Minecraft world from a decade ago can do that. 

Brains are fun.