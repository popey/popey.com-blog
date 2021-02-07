+++
date = "2021-02-07T12:00:00-00:00"
title = "Chromium on Linux"
slug = "2021/02/chromium-on-linux"
author = "Alan Pope"
tags = ['software', 'linux', 'chromium']
+++

Rumours are swirling in Linux circles that some prominent distributions are preparing to remove the Open Source Chromium web browser from their archives. 

This appears to have come about because of a change being made by Google, which reduces functionality in third party chromium-based browsers. Chromium (perhaps unsurprisingly) falls into this category. While the proprietary Google Chrome is built on the same technology as the open source Chromium browser, they're not the same. 

On the [Chromium blog](https://blog.chromium.org/) it was [announced](https://blog.chromium.org/2021/01/limiting-private-api-availability-in.html) a couple of weeks back that some API calls which "are only intended for Google’s use" were indeed used by Chromium. This will be disallowed from March 15th - in a month or so. 

I can understand how software packagers around the world who have spent significant effort in making Chromium available to millions of Linux users, would be irritated about this. What I don't fully fathom is why they're trying to collectively eject Chromium from the corpus of available software.

Sure, it's unfortunate that a set of features in an application will go away. Yes, it's frustrating that the proprietary version of Google Chrome gets to keep those features. I have no idea how many users of Chromium there are, but I'd put a guess it's not insignificant. So that's many client machines checking into servers in the Google *cloud* to stash important user information, and enable features. 

I can maybe see the argument that packagers are doing the Chromium project a favour by packaging the software and distributing it to millions. So given Google, the main sponsor of the project is totally capable of doing *something* to undo this, and as yet haven't, is causing frustration for those packagers. The only way they have to express this is to "down tools" and walk away, effectively to go on strike.  

Is the hope of these packagers to irritate Google into reinstating the API and thus restore the missing functionality? How would that work if Google doesn't though? With fewer people using Chroimum if it is removed, surely those users will look for similar functionality elsewhere? Where would they possibly go? [Google Chrome](https://chrome.google.com/) maybe?

The packagers of the open source Chromium browser are almost certainly friends of Free and Open Source (FOSS) software, or they wouldn't be packaging it. If that's the case, they likely don't care for the proprietary sync service behind the API in the Google datacentre. But their users likely *do* value these features. So they are packaging Chromium "*For The Users*". How does it service the users to yoink the browser from the archives? It turns out, *we* know!

We've learned that when you make a significant change to a browser, indeed - [this browser](https://ubuntu.com/blog/chromium-in-ubuntu-deb-to-snap-transition) - communication is key. Months after we migrated the deb-based Chromium builds to snap, I still see people asking questions about why it was done, and speculating on reasons. With colleagues I wrote the above blog post, and [another](https://ubuntu.com/blog/snaps-how-we-got-here) detailing the rationale. 

I'd urge any distro considering removing Chromium from their official archives, to come up with a backup plan. Maybe someone else can take on the maintenance if the current maintainer is burned out by the issue. Alternatively, if no possible new maintainer can be found, do ensure there's a sane migration path for existing users of Chromium on your distro.

If all else fails, just tell your users to install the Chromium [snap](https://snapcraft.io/chromium) 🤣🤣🤣


