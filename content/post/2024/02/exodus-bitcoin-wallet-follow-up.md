+++
date = "2024-02-23T08:30:00+01:00"
title = "Exodus Bitcoin Wallet: Follow up 2.0"
slug = "2024/02/exodus-bitcoin-wallet-follow-up"
author = "Alan Pope"
tags = ['ubuntu', 'snapcraft', 'crypto', 'scam', 'bitcoin', 'wallet', 'exodus']
+++

On Tuesday, I [blogged](/blog/2024/02/exodus-bitcoin-wallet-490k-swindle/) about a series of Bitcoin scam apps published in the Canonical Snap store. 

**Edit**: *This section updated on 2024-02-23 to include a Canonical response as two new forum posts from sabdfl (Mark Shuttleworth, CEO of Canonical).*

---- 

~~Two things!~~ Three things!

Zerothly, today we have a response from Canonical.

There are actually two new posts from Mark. One in response to the thread asking whether crypto apps should be banned from the Snap store, and the other an acceptance that identity verification might need to be stronger on the Snap store. Here they are in full:

From the [Should unverified cryptocurrency apps be banned?](https://forum.snapcraft.io/t/should-unverified-cryptocurrency-apps-be-banned/38919/4) thread, Mark gave his thoughts:

> I agree that cryptocurrency is largely a cesspit of ignoble intentions even if the mathematics are interesting.
>
>I see our mission as trying to improve the safety of Linux for its users. Obviously Ubuntu is a significant share of those, but we should think more broadly - our goal should be that anybody using snaps from the official snap store on any distro should be safer than if they were getting that software from other hosting platforms. We are increasingly living in a dangerous world where one is almost certain to want to run software from untrusted sources, whether that’s downloaded and installed apps, or web page scripts on a website at a link you just clicked on.
>
>While there are ultimately limits to what we can achieve, I think it’s fair to challenge ourselves to consider additional measures that raise the safety level even if they will never be perfect.
>
>In the design of snaps and the snap store we have mainly focused on technical confinement - the idea of safety being limited to ‘blast radius on the system’. We’ve built the best way in the world, imo, to constrain which files an app can access, which APIs or kernel services or network locations it can use and by extension attack, or be a vector for an attack. Those are measures for technical resilience.
>
>In this case, we need to think about social resilience - how to make running Linux safer for people who are themselves vulnerable to social engineering. This is a very hard problem but one I think we can and should engage in, otherwise we’re not helping a user to help themselves, even if ultimate responsibility does lie with those users.
>
>I don’t however think that banning cryptocurrency apps helps. If anything, it would make using Linux much worse.
>
>At least snaps have good, and over time increasingly good, mechanisms for technical confinement. Projects like Ubuntu and Debian and RHEL have relatively rigorous know-your-contributor processes, but apps can’t all be in the distro archives. The other Linux app distribution mechanisms (such as PPAs, Github builds and releases, OBS, or even the containerised ones like Flatpak) don’t have nearly the same technical measures for confinement that snaps do. If we ban cryptocurrency apps from the snap store then those users will simply get apps from those unconfined sources - and then the attacks will be even worse because the apps can go trawling all over the system, or do things like keylogging.
>
>At least with snaps we have more measures to limit attacks to social engineering, or defects in the kernel and related confinement code. So as much as I would not put my own money into a crypto account, and would strongly recommend others to avoid them, I don’t think banning those sorts of apps from the snap store is helping Linux users, it’s just forcing them to be even more exposed when they use cryptocurrencies.
>
>My colleagues have been fighting a quiet war with these malicious actors for the past few months, and are working to strengthen our hand on a number of fronts. They are working up a more formal statement and I won’t pre-empt it here, I just want to express the view that pushing our users to less-safe software distribution mechanisms isn’t helping them.


In addition, Mark started a new thread titled [Stronger identity verification for ALL publishers?](https://forum.snapcraft.io/t/stronger-identity-verification-for-all-publishers/39061):

> Hi folks
>
>We have seen a flurry of uploads of apps which trick users into revealing sensitive information. These are not attacking the system engineering, they are attacking the user through social engineering, so confinement rules cannot address the issue.
>
>The team is working on a range of initiatives to mitigate and reduce the risk of apps like this. However, my concern is that apps can be updated, so even if an app is comprehensively reviewed at initial publication, the same app could turn rogue at a later date.
>
>In the world of open source, we don’t generally have rigorous publisher information. Sites like github don’t tell you anything rigorous about who’s writing the code they host. In Ubuntu and Debian we take careful steps to know who’s uploading packages, but PPAs or OBS or Github or other build services will allow any anonymous person to build and publish packages.
>
>Our goal with snaps should be to be the safest way to get software for your Linux system, and that means we should consider measures that are novel or different to other package hosting sites.
>
>One thing we could do is require a more comprehensive proof of publisher identity for every publisher. We could require a credit card, and we could integrate the sort of ‘know your client’ technology that app-based banks are using to verify some sort of ID such as a passport. Typically these require something like a photograph of the passport together with a video of the person speaking. I think most banks use SAAS services for this KYC capability, and we could use the same services for Snapcraft publisher identity verification.
>
>I suspect there is a bit of an arms race right now between bad actors with generative AI video-creation capability and these KYC services, and it would be hard to know who’s winning, in other words whether such a service provides real assurance of identity. A credit card test could also be passed by a fraudulent actor with stolen card information. If we charged a fee and waited two months to see if the charge was revoked we might have more confidence that it was really the cardholder’s intent to be charged, but then we’d have a two month delay for any publisher going through that process. I don’t really want to ask free software publishers to pay a fee to share their software as snaps, but perhaps there would be support for that if it led to people having more confidence in the safety of the system as a whole.
>
>In the end, while it may not be perfect, we would have more data to share with law enforcement to try and bring the bad actors to justice.
>
>We’re definitely going to attack this problem, even if the solutions are unpalatable it feels worse to potentially host malware. I’m posting here to get feedback on the specific ideas of getting some sort of hard identity check, and / or credit card information and transaction fee, for publishers. Also to invite suggestions for better approaches to publisher identity.
>
> Thoughts?


It's great to see Mark diving into the thread here, and updating everyone with the internal plans. I'm glad to see Mark shares my negative sentiment about crypto nonsense. If anyone reading this has strong opinions on how these problems can be solved or the situation improved, I urge you to get involved in the conversation over on the [Snapcraft forum](https://forum.snapcraft.io).

----

**Edit**: *This following section was written on 2024-02-21.*

----

Firstly, I have [edited](https://github.com/popey/popey.com-blog/pull/48) [yesterday's blog](/blog/2024/02/exodus-bitcoin-wallet-490k-swindle/) to remove reference to [exchangerate-api](https://www.exchangerate-api.com). I had a few comments about this, and it would have been better not to mention them. They seem like fine upstanding people doing good work, and aren't involved in all this horribleness. Sincere apologies for mentioning them.

Second, one of the key messages I pushed yesterday was that the dodgy applications were still installed on client machines, even after the store pages had been quarantined.

One of my recommended actions for Canonical was that they should push out a 'clean' snap under the same name, to replace those dodgy snaps. Well...

![Good news everyone!](/blog/images/2024-02-21/good-news-everyone.gif)

Canonical heard the call, and have started pushing out empty snaps in place of the dodgy ones. Note the arbitrary high version number of "9.9.9". *I personally would have preferred "6.6.6" but we can't have everything* ;).

[![Exodus repaired in the Snap store](/blog/images/2024-02-21/exodus-fixed_50.png)](/blog/images/2024-02-21/exodus-fixed_100.png)

Anyone who has one of the dodgy ones should get an "over the air" update soon enough, to replace it with an empty package.

By empty, I do mean, empty. The latest revision is tiny compared to the ones packing malware.

```bash
alan@vm:~/temp$ ls -lh exodus_*.snap
-rw-rw-r-- 1 alan alan 26M Feb 21 12:31 exodus_1_amd64.snap
-rw-rw-r-- 1 alan alan 26M Feb 21 12:31 exodus_2_amd64.snap
-rw-rw-r-- 1 alan alan 12M Feb 21 12:31 exodus_3_amd64.snap
-rw-rw-r-- 1 alan alan 26M Feb 21 12:31 exodus_4_amd64.snap
-rw-rw-r-- 1 alan alan 16K Feb 21 12:32 exodus_5_amd64.snap
```

Let's unpack it and have a look:

```bash
alan@vm:~/temp$ unsquashfs exodus_5_amd64.snap 
Parallel unsquashfs: Using 8 processors
1 inodes (1 blocks) to write

[===================================================================|] 2/2 100%

created 1 file
created 3 directories
created 0 symlinks
created 0 devices
created 0 fifos
created 0 sockets
created 0 hardlinks
```

![Nothing to see here!](/blog/images/2024-02-21/nothing-to-see-here.gif)

```bash
alan@vm:~/temp$ tree squashfs-root/
squashfs-root/
└── meta
    ├── gui
    └── snap.yaml

3 directories, 1 file
```

Clean as a whistle!

```yaml
alan@vm:~/temp$ cat squashfs-root/meta/snap.yaml 
name: exodus
version: 9.9.9
summary: Empty snap
description: |
  This is my-snap's description. You have a paragraph or two to tell the
  most important story about your snap. Keep it under 100 words though,
  we live in tweetspace and your description wants to look good in the snap
  store.
architectures:
- amd64
base: core22
confinement: strict
grade: stable
environment:
  LD_LIBRARY_PATH: ${SNAP_LIBRARY_PATH}${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}
  PATH: $SNAP/usr/sbin:$SNAP/usr/bin:$SNAP/sbin:$SNAP/bin:$PATH
```

It's almost as small as my [null snap](https://snapcraft.io/null) I previously [blogged about](/blog/2021/01/null/).

Nice work Canonical!

Now, about those other [suggestions](/blog/2024/02/exodus-bitcoin-wallet-490k-swindle/)... :D