+++
date = "2023-09-30T21:00:00+01:00"
title = "RetroDECK > EmuDeck"
slug = "2023/09/retrodeck-is-better-than-emudeck"
author = "Alan Pope"
tags = ['steamdeck', 'retrodeck', 'emudeck', 'linux']
+++

## Goodbye EmuDeck

I've had my ~~GabeGear~~ Steam Deck for over a year now, and I *love* it. When it first arrived, I considered using it to play retro games - via emulators. But a terribad experience with EmuDeck soured my opinon of retro gaming on the deck. 

The whole EmuDeck installation and configuration was less than straightforward, indeed somewhat cumbersome. I found it to be a loosely connected, and poorly integrated bag of spanners. Surprising for a project seemingly [awash](https://graphtreon.com/creator/dragoonDorise) with community supporters and funding!

![EmuDeck developers, probably](/blog/images/2023-09-30/laying-down-money.gif)

Reecently, I wiped & factory reset my Steam Deck, then discovered [RetroDECK](https://retrodeck.net/). Now I'm playing more of the older games than ever! If you've never heard of, or tried RetroDECK, I strongly recommend you do.

It even works on desktops, there's no need to fork out for a Steam Deck! But you should, if you can, because they're..

![They're great](/blog/images/2023-09-30/frosted-flakes-tony-the-tiger.gif)

## Making friends

We talked about RetroDECK on [episode 12](https://linuxmatters.sh/12/) of [Linux Matters](https://linuxmatters.sh/) podcast. Have a listen to hear more in-depth what Martin and I think about the project.

As I understand it, the RetroDECK project builds on and contributes to the [EmulationStation Desktop Edition](https://es-de.org/) project, which is the main frontend you see in RetroDECK.

RetroDECK is super easy to install, setup, and use. Though the project team have plans to make the configuration and maintenance even better. After we published the show, a RetroDECK developer even got in touch to kindly point out errors and omissions in our show. 

## Get RetroDECK

RetroDECK is available as a flatpak on [flathub](https://flathub.org/apps/net.retrodeck.retrodeck). The package has all the emulators, themes and support files required to get started. You just need to provide the ROMs to get going.

When you first run RetroDECK, you'll be walked through a few simple dialogs to get up and running. Pop-ups like the following will guide you through the initial setup process. 

[![Deck configuration](/blog/images/2023-09-30/deck1.png)](/blog/images/2023-09-30/deck1.png)

I expect these basic dialogs to be replaced in the future. But for now, they're functional and are likely only to be seen once, on first setup.

## Get ROMs

Put your grown-up pants on and find these somewhere. Put them in `~/retrodeck/roms`

## Metadata scrape

Having the games is only part of the fun of RetroDECK. The other part is all the beautiful themes and metadata you can add to embellish the experience. RetroDECK ships with a functional and decent themes.

[![Stock theme](/blog/images/2023-09-30/stocktheme.png)](/blog/images/2023-09-30/stocktheme.png)

It's easy to add new beautiful themes to customise the experience. 

[![Theme downloader](/blog/images/2023-09-30/themedownloader.png)](/blog/images/2023-09-30/themedownloader.png)

I'm using thie CoinOP theme at the moment.

[![CoinOP theme](/blog/images/2023-09-30/coinoptheme.png)](/blog/images/2023-09-30/coinoptheme.png)

Augment this with metadata from [screenscraper.fr](https://www.screenscraper.fr/) or [TheGamesDB](https://thegamesdb.net/), and you end up with a pretty way to launch games.

## Favourites & filters

RetroDECK enables you to tag your favourite games within any particular emulator. You can also filter out games you're less interested in, so you can more easily find those you do enjoy.

## Conclusion

Overall, the RetroDECK experience is really well done. I find myself opening up RetroDECK, grabbing a virtual console, and spinning up my favourite game when I have a few minutes spare. I'd stronly recommend giving [RetroDECK](https://retrodeck.net/) a look, it's easily the best frontend to all the modern emulators. 