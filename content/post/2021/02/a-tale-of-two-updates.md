+++
date = "2021-02-24T12:00:00-00:00"
title = "A Tale of Two Updates"
slug = "2021/02/a-tale-of-two-updates"
author = "Alan Pope"
tags = ['ubuntu', 'mint', 'software', 'updates']
+++

Helping your users stay up to date on their workstation is something I believe OS vendors should endeavour to do, to the best of their ability. Some users aren't able to find time to install updates, or are irritated by update dialogs. Others are skeptical of their contents, some even block updates completely. 

No OS vendor wants to be "That Guy" featuring in the news as millions of their customers are found to be vulnerable on their watch. Equally, respecting the user, given it's *their* computing device, is vital too. It's a difficult balance to strike. Somewhere in between "*That Linux distro which nags me constantly to do updates*" and "*That distro which is outdated and insecure*" erring towards the former, is probably the sweet spot.

So when I read today in typical *El Reg* fashion that "*[Linux Mint users in hot water for being slow with security updates, running old versions](https://www.theregister.com/2021/02/23/linux_mint_team_berates_users/)*" I was reminded of an issue we had in Ubuntu a few years back. I'm going to muddy things a little to save engineer embarrassment, but you'll get the gist.

First though, a *small* **backstory**. 

Ubuntu has, for some time, shipped a graphical Software Update tool which periodically informs the user that there's new software to upgrade to. This may include bug fixes, security updates or - in the case of some packages - new releases. Users can manually run the tool, but if they don't, after a period it will popup. It looks a bit like this.

![Software Updater](/blog/images/2021-02-24/softwareupdate.png)

The idea is to nudge users gently to just hit the `Install Now` button and continue with their day. Updates on the Ubuntu desktop don't require a reboot to install, but may require a post-install reboot for the newly installed kernel (for example) to take effect.

Ubuntu has a repository divided into "pockets", `release`, `updates` and `security`. On release day the `release` pocket contains the packages contained on the install media, and more. Post-release (even on the day of release (so called day-zero updates)), any updates are delivered to the `updates` pocket, with security fixes going in `security` pocket. 

The typical `/etc/apt/sources.list` on an Ubuntu system will have all three enabled by default, so users get the default set of packages from `release`, and updates from the `updates` and security fixes from `security` pockets.

*Aside:* If a user truly never wanted any software updates, they could just remove references to `updates` and `security` lines in their `sources.list` and bingo, done! Obviously this isn't a good idea for an Internet-connected system, but hey, we provide you with the gun and bullets, it's up to you to load and fire it at your foot if you choose.

Yes, we also have a command-line tool `apt` / `apt-get` which more advanced users may use to manage updates on their system. You'd be surprised how many non-nerd users Ubuntu has though, who actually *like* using graphical tools to manage their updates. Yeah, who'd have thought it‽

Ubuntu also ships a slightly contentious utility called `whoopsie` which optionally sends crash reports to Canonical to `daisy` - yes, it's "Whoopsie-Daisy". The contentious part is that it punches users in the face with a dialog box when things crash, to ask *permission* to send the crash to Canonical. It looks like this, and some people *hate* it.

![Whoopsie!](/blog/images/2021-02-24/whoopsie.png)

*Aside:* No. Ubuntu isn't inherently more crashy than other Linux distributions, but it might look like it because we *show* the user the crash dialog, whereas other distros have no idea that applications are crashing on end-user systems.

We have made this a lot more friendly in recent releases such that it doesn't need to ask permission every single time now, where it did previously. The corrolary to the *aside* above, is that later releases of Ubuntu aren't necessarily more stable than previous ones, because you don't see the crash dialog so much. It's likely because you allowed it once in the past.

The crash dumps from `whoopsie` via `daisy`, after a data clean-up, end up in aggregate on [errors.ubuntu.com](https://errors.ubuntu.com/). Here's what the front page of that site looks like. 

[![errors](/blog/images/2021-02-24/errors.png)](https://errors.ubuntu.com)

*Aside:* It's mildly amusing and ironic that the number two crasher by occurrences when I took that screenshot is in `apport` - specifically `whoopsie-upload-all` - the tool which uploads crash reports to this very website. 🤦‍♂️

*Note:* There's more (non-personally-identifyable) data behind each line, which is only accessible to a limited set of developers and bug triagers. The source code for [whoopsie](https://code.launchpad.net/whoopsie), [daisy](https://code.launchpad.net/daisy) and [errors](https://code.launchpad.net/errors) are released under GNU Affero GPL v3.

Developers browse the site to see what's crashing a lot, so we can focus some attention on the issue either directly in Ubuntu or with he upstream software maintainers, where appropriate. You'll sometimes find bugs reported in upstream projects with a link to the crash reports here on errors.ubuntu.com. 

Often the errors are turned into bug reports, which you'll note from the numbers in the "Bug report" column on the right of the table at the bottom of the page. 

Ok, so that's the **backstory**.

In idle moments I might browse the site to see if there are any applications which are crashing a lot, which might need some attention from the Ubuntu or upstream developers. Usually I find myself browsing and finding others have already generated bug reports and started the process of triage. For some there may indeed already be fixes available. 

Whoopsie captures the package version along with the name and some other metadata when reporting a crash. Back in January 2018 I noticed a specific version of a popular pre-installed application was crashing a lot. I wasn't the only one to notice. There was already a bug open, and some discussion and confusion going back some months. 

The confusion was because the engineers believed the issue (a simple memory or file descriptor leak, as I recall) had already been fixed. Why was it still crashing for users in a way we've seen for months, and why that specific old version of the package? If we've fixed this, and the version had been replaced months ago, why are we still getting hundreds, or thousands of regular crashers?

As I previously mentioned, we have a dialog which pops up and tells users there are updates. Are there really that many users who *actively* avoid updating their system, or have configured their system not to update in some way? I didn't buy that. I get that there's a set of our more confident and experienced userbase who are willing to mess with the normal flow of updates, but I was pretty sure - with zero data - gut feel - that the majority of our users *do* install updates when prompted.

*Aside:* I have data to back up this gut feel, and I'll blog about that another day.

With a bit of investigation we found the smoking gun. Let me explain.

The `update-notifier` process prompts the user via `update-manager` (the GUI dialog you see at the top of this blog post) to nudge them to interactively update their system. There was logic in `update-notifier` to suppress this prompt under certain circumstances so it didn't appear too often. We didn't want to fatigue the user with constant update prompts. One factor was how recently the user had already updated the system.

There was a bit of a flaw in this logic though. In addition to `update-notifier`, there's also `unattended-upgrades`, a separate software package which seeks to automatically download and apply system updates. This was installed by default, configured to upgrade packages in the `security` pocket via a setting in `/etc/apt/apt.conf.d/50unattended-upgrades`. It was likely decided to only enable `security` automatically by default so users always get their security fixes promptly, which they did! However...

The `unattended-upgrades` job would wake up periodcally, check for, and apply `security` updates, but not updates from the `updates` pocket. The `update-notifier` would wake up periodically, see that an update had been performed, and go back to sleep. Rinse and repeat. The users were happily getting security updates but no application updates. Users could of course still use `apt` or manually launch `update-manager` to update their system, but many users just don't do that.

The guard-rails in `update-notifier` which suppress update notifications were weakened, but, that came in an update via the `updates` pocket. This presented a problem. Users were stuck with the `update-notifier` which kept sleeping on `unattended-upgrades` recent runs, with no way for us to force them to get the updated `update-notifier`.

Modern problems require modern solutions. The `update-notifier` update was copied from the `updates` pocket to the `security` pocket - not something we typically do for something that isn't *technically* a security fix. This worked though. The `unattended-upgrades` process woke up on affected systems, pulling down the new `update-notifier` from the `security` pocket. Soon after, `update-notifier` launched `update-manager` and told the user they had a *bunch* of updates to install.

Once that **first** update rolled out via `security`, users got the *real* **second** update to the popular desktop application which triggered all this research. We then saw a dramatic drop in the number of crashers of that type on [errors.ubuntu.com](https://errors.ubuntu.com/), confirming those systems had been updated successfully.

I believe there's no way we would have known this issue was happening, if we didn't have `whoopsie`, `daisy` and [errors.ubuntu.com](https://errors.ubuntu.com/) to inform us. Yes, those crash reports are useful to us, to you, and other Ubuntu users. Please stop telling people to disable it. Thanks.

When I read that Clem over at Linux Mint has been discovering his userbase are running old releases of his popular distro, colour me utterly unsurprised. Clem had to find this out via data from a third party. I expect this doesn't necessarily mean the Mint update system is massively flawed. It's more likely just users being users.

We already *know* from experience that users won't update their system unless you automate the process or literally punch them in the face with an assertive dialog box. Or preferably *both*.

Hard pill to swallow, but it's true.