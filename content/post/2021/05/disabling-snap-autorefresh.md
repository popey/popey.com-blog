+++
date = "2021-05-26T11:00:00-00:00"
title = "Disabling snap Autorefresh"
slug = "2021/05/disabling-snap-autorefresh"
author = "Alan Pope"
tags = ['software', 'snap', 'snapcraft', 'bionic', 'focal']
+++

## Preamble

Until [recently](https://twitter.com/popey/status/1380139900108963848), I worked for Canonical on the Snap Advocacy Team. Some of the things in this blog post may have changed or been fixed since I left. It's quite a long post, but I feel it's neccessary to explain fully the status-quo. This isn't intended to be a "hit piece" on my previous employer, but merely information sharing for those looking to control their own systems. 

I've previously provided feedback in my previous role as Snap Advocate, to enable them to better control updates. However, a lot of this feedback was spread over forum threads and other online conversations. So I thought I'd put together some mitigations and the steps I take in one place.

At the end of this post I detail what I do on my systems to be in more control of snap updates. Skip to that if you know what you're doing.

## Backstory

Snaps are software packages for Linux. They've been developed by Canonical over the last ~[six years](https://github.com/snapcore/snapd/commit/d00bfa93d6c33c1a504342236761919386ba502e). There are thousands of snap packages in the Snap Store, in use by millions of users across 50+ Linux distributions.

One of the fundamental design goals of snaps is that they're kept up to date. At a high level, the `snapd` daemon running on end-user systems will check in with the Snap Store periodically, looking for new revisions of installed snaps. By default `snapd` does this every day, four times a day, at semi-random times. This seeks to ensure end-user systems have relatively up-to-date software.

If a developer publishes a new revision of a snap package in the Snap Store, they can be **relatively** confident that users will get the update soon after publication. Indeed as a snap publisher myself, I can see from the Snap Store metrics page a pretty graph showing the uptake of new versions.

[![ncspot metrics](/blog/images/2021-05-26/ncspot.png)](/blog/images/2021-05-26/ncspot.png)

In the above diagram you can see from the coloured bars that each new revision of the application almost completely replaces the previous versions in the field within a week. Indeed in the above example, I had released a new revision just a few days ago and already 80% of existing users have received it.

This helps to reduce the number of old versions of applications in the wild. So the publisher can be more confident that there's not insecure (as in "known-vulnerabilities I've already fixed") or unsupported (as in "old versions I no longer want to provide support for") revisions of my application.

So this is an attractive feature for *some* developers and *some* users. But as always in the software world, you can't please everyone, all the time.

## Feedback

Over the years since the introduction of snap as a packaging format, there have been numerous empassioned requests to change this default behaviour. There's a few very valid reasons why, including, but not limited to:

### Metered connection

Only having access to the Internet via metered or very low speed connection means a user may not want their expensive bits consumed in the background by large files being downloaded.

A user who doesn't connect often may find that when they do, `snapd` wakes up and eats their data allowance. Even in highly-networked Western nations, on a slow connection, such as in a coffee shop or on a train, `snapd` can slow down the ability to work while it beavers away in the background.

### Security

Some users & adminstrators would prefer to have visibility of software updates before they land on end-user systems. Organisations using Ubuntu for example, can 'gate' updates which come from the `apt` repository by hosting an internal repo. Software which has been fully tested can then be allowed through to their user community. Out of the box, this is not straightforward to implement with `snapd` because the daemon talks directly to the Snap Store.

### Stability

With `snapd` an application may refresh while a user is actively using it. This leads to some application instability as files disappear or move from underneath the program in memory. This can present as the fonts in the application suddenly becoming squares, or the application flat-out crashing. Users tend to prefer applications don't crash or become unusable while they're trying to use them. The [bug](https://bugs.launchpad.net/snapd/+bug/1616650) about this was filed in 2016, has numerous duplicates.

### Control

Many believe that their computer should be under their control. Having a daemon hard-wired to force updates on the user is undesireable for those who prefer to control package installation. A user may just want to keep a specific version of an application around because it has the features they prefer or have a workflow built around.

## Mitigations

The snapd and Snap Store teams have indeed listened to this feedback over the years. Sometimes it resulted in new developments which can mitigate the issues outlined. Sometimes it results in lengthy discussion with no user-discerable outcome. Below are some mitigations you can use, until those issues are addressed.

### Bypassing Store Refresh

Snaps installed via `snap install foo` directly from the store will automatically get updates per the schedule, when the publisher releases a new revision. Instead, it's possible to `snap download foo && snap install foo --dangerous` instead. This completely opts-out of automatic updates for that specific snap only.

Note: Do not `snap download foo` then `snap ack foo` as this will acknowledge the assertion from the store, and will enable auto update. 

### Deferring updates

The refresh of applications can be deferred with the [refresh.hold](https://snapcraft.io/docs/keeping-snaps-up-to-date#heading--refresh-hold) option. This can, for example, enable a user to defer updates to the weekend, overnight, or on a specific date/time.

### Detecting metered connections

If NetworkManager detects that a connection is metered, `snapd` can be configured to suppress updates via [refresh.metered](https://snapcraft.io/docs/keeping-snaps-up-to-date#heading--refresh-metered).

### Delta udpates

For users on low-speed or metered connections, delta updates may help. The Snap Store decides whether to deliver deltas of packages when `snapd` refreshes the installed snaps. The user doesn't need to opt-in as the Snap Store has algorithms which determine the delivery of a delta or full package each time.

### Preventing updates to running applications

In `snapd` 2.39 (released in [May 2019](https://github.com/snapcore/snapd/releases/tag/2.39) adds a `refresh-app-awareness` experimental [Work In Progress](https://forum.snapcraft.io/t/wip-refresh-app-awareness/10736) option which suppresses updates for applications which are currently running. This seeks to prevent application instability when it's updated while running. The option was blogged about in [February 2020](https://snapcraft.io/blog/experimental-feature-snap-refresh-awareness-and-update-inhibition) to raise awareness of it.

## Remaining gaps

While the snapd and Snap Store teams have worked hard to address some of the issues, there's still a few outstanding problems here.

### Refresh Awareness still experimental

The [refresh-app-awareness](https://snapcraft.io/blog/experimental-feature-snap-refresh-awareness-and-update-inhibition) is marked "experimental" which means it's not on by default, but requires the user to know about it, and use an arcane command line to enable it. This desparately needs attention from the team.

Worth noting though, in the event that the snap needs refreshing, and hasn't been done for more than fourteen days, it'll get refreshed anyway, even if it's running.

### Sixty day hard-limit

Even if a user chooses to defer updates via [refresh.hold](https://snapcraft.io/docs/keeping-snaps-up-to-date#heading--refresh-hold), they'll still happen "eventually". When is "eventually"? 60 days. As delivered, users **cannot** defer a `snap refresh` beyond the hard-wired 60-day limit.

## My Systems

There's three things I do on my systems. Two are pretty simple, one is a bit batty. Feel free to use these steps, or remix them to your own requirements.

### Enable (experimental) app refresh awareness

Prevent running applications from being refreshed. 

Run this command on every system. As per the [February 2020](https://snapcraft.io/blog/experimental-feature-snap-refresh-awareness-and-update-inhibition) blog post.

```bash
sudo snap set core experimental.refresh-app-awareness=true
```

In the event snap needs to be refreshed, a notification appears to let the user know it isn't going to happen:

[![Chromium notification](/blog/images/2021-05-26/chromium-notification.png)](/blog/images/2021-05-26/chromium-notification.png)

Further, running `snap refresh` for the application while it's running, will result in a message:

```bash
alan@robot:~$ snap refresh chromium
error: cannot refresh "chromium": snap "chromium" has running apps (chromium)
```

### Configure a time for updates

This reduces the chance of change while I'm working. 

I set my systems to update at 12:00 on Sunday. So there's no unexpected refreshes during the working week. You can of course pick a time suitable to yourself.

```bash
alan@robot:~$ snap refresh --time | grep ^timer
timer: sun,12:00
```

However, I don't actually even want the updates to happen every Sunday, so that's where the next option comes in.

### Constantly defer updates

In theory, if I use the above option to defer updates to a date six months hence, they'll still happen after the sixty-day hard-wired limit. Then they'll happen again back on the regular schedule. 

So I have a root `cron` job (other scheduling systems are available, apparently) which repeatedly defers updates by thirty days. I configured it for 12:30 as my system tends to be on at that time. This runs every day, constantly pushing the update window back thirty days.

```bash
alan@robot:~$ sudo crontab -l
30 12 * * * /usr/bin/snap set system refresh.hold="$(/usr/bin/date --iso-8601=seconds -d '+30 days')"
```

The result, when checked with `snap refresh --time` shows updates are held for a month.

```bash
alan@robot:~$ snap refresh --time | grep ^hold
hold: in 30 days, at 11:28 BST
```

You may be thinking *"But Alan, why bother with the "Sunday at 12:00" thing if you're also going to punt updates a month into the future!?"*. Good question. It's simply "Belt and braces". If my cron job failed, I'm still not going to get week-day updates.

### Use a patched snapd

This is the slightly batty part. 

The sixty-day limit on holding/deferring refreshes, and the fourteen-day limit on deferring running-apps updates are hard-wired in `snapd`, not options which can be configured. 

Well, `snapd` is Free Software so we can recompile and install it without those limits, or with different limits.

The `snapd` daemon is written in Golang. I'm (currently) not a Golang programmer, so the changes I've made might not make sense. But it works for me.

The script does the following:

  * Clone the source for snapd from github
  * Check out the same git commit as can be found of snapd in the `latest/candidate` channel in the store (configurable as `SNAPD_CHANNEL`)
  * Patch the sixty day maximum postponement to an arbitrary large number
  * Build amd64, armhf and arm64 snaps of snapd using launchpad via `snapcraft remote-build`

Once built, I `snap install snapd_2.50.1-dirty_amd64.snap --dangerous` (filename will vary of course). This will install the patched snapd, and won't itself get updated, due to being *side-loaded* locally. 

The `snapd` package doesn't get updated super often, so I don't run the script all the time. 

The script is called `build-snapd` and there's a copy [here](https://gist.github.com/popey/8dd8902f9e41f1ed5107a2cb7a013e9d), and I've pasted it at the bottom of this blog post.

If you want to do this, you'll need `snapcraft`, `git` and a [launchpad](https://launchpad.net/) account. You could build locally, in which case maybe use `lxd` or `multipass`. That's all in the [snapcraft docs](https://snapacraft.io/docs). The goal of this script is to build snapd quickly and efficiently. 


### Hold the snapd deb

Even with the patched `snapd` snap, it's possible a newer build of the `snapd` debian package from the Ubuntu archives might "sneak" in via `apt ugrade` or `unattended-upgrades` and undo the patches I've made above. So we can pin the deb to prevent that updating.

```bash
$ sudo apt-mark hold snapd
snapd set on hold.
```

In case you weren't aware, if you have the deb and the snap installed, whichever has the higher version number will be used. I build the snapd snap from source rather than the deb because there's an easy path to remotely build it. Alternatively I could build the deb, and remove the snap. But I suspect in the future I may be required to use the `snapd` snap as some other application may need it, and if that happens it may undo whatever I do with the patched deb.

## Summary

There are downsides to all of this, of course. I won't get security updates to snapd, core or any other application, until I manually choose to update them. I also have to manage my snap updates. That's pretty easy though, just like I've been udpating with `apt` forever.

It's a bit manual to setup, but only takes a few minutes to run the various commands. If inclined, I expect one could use a GitHub Action or similar cloud based job to automate the `snapd` build script. 

I hope that's helpful to someone.

```bash
#!/bin/bash
# Build snapd with longer time between forced refresh, effectively
# allowing systems to prevent any refreshes at all, "easily".

# While it's possible to defer updates to a later date, like this:
# $ sudo snap set system refresh.hold="$(/usr/bin/date --iso-8601=seconds -d '+30 days')"
# After 60 days, snapd will eventually force refresh, even if you run 
# the above command every day to push the refresh time back continuously.

# All this script does is build snapd with a way longer interval between
# 'forced' refreshes.

# To undo this, we patch snapd, rebuild and install it
# Allow us to push updates long into the future (1825 days, 5 years)
# Set maxPostponement = 1825 * 24 * time.hour
# Set maxInhibition = 1825 * 24 * time.Hour

# Patch only on Tuesday
# Set defaultRefreshSchedule = "tue,12:00"

# Temp dir to do the work in
WORKING_DIR="$PWD"
SNAPD_BUILDDIR=$(mktemp -d -p "$WORKING_DIR")

# What snap store channel should we yoink the snapd version from
SNAPD_CHANNEL="latest/candidate"

# Push updates back a ludicrous amount of time. Five years should do.
MAXPOSTPONEMENT="1825"
MAXINHIBITION="1825"

# When should refreshes happen, if they do
# Default is every day, four times a day
REFRESHTIME="tue,12:00"

# Get version in snap store from candidate, we build that
# That way we stay a little ahead of the stable channel, sometimes
CANDIDATE="$(snap info snapd | grep "$SNAPD_CHANNEL" | awk -F ' ' '{print $2}')"

# snap source is in github
SNAPD_SOURCE="https://github.com/snapcore/snapd.git"

# Clone the upstream source
cd "$SNAPD_BUILDDIR" || exit 8
if git clone -q $SNAPD_SOURCE; then
	echo "*** Cloned"
else
	echo "*** Failed to clone"
	exit 1
fi
cd snapd || exit 7
if git checkout -q "$CANDIDATE"; then
	echo "*** Checked out $CANDIDATE"
else
	echo "*** Failed to check out $CANDIDATE"
	exit 2
fi

# Patch things
if sed -i "s|const maxPostponement = 60|const maxPostponement = $MAXPOSTPONEMENT|" overlord/snapstate/autorefresh.go; then
	echo "*** Patched maxPostponement"
else
	echo "*** Failed to patch maxPostponement"
	exit 3
fi
if sed -i "s|const maxInhibition = 7|const maxInhibition = $MAXINHIBITION|" overlord/snapstate/autorefresh.go; then
	echo "*** Patched maxInhibition"
else
	echo "*** Failed to patch maxInhibition"
	exit 4
fi
if sed -i "s|00:00~24:00/4|$REFRESHTIME|" overlord/snapstate/autorefresh.go; then
	echo "*** Patched autorefresh default time"
else
	echo "*** Failed to patch autorefresh default time"
	exit 5
fi

# Build snapd remotely in the cloud!
# This means it'll build for whatever architecture you run this
# script on, and will not consume resources on your computer.
# In my experience when the builders aren't all busy, it takes
# ~30 minutes to build snapd
# Check it at https://launchpad.net/builders to see builder 'queue'
if snapcraft remote-build --launchpad-accept-public-upload --build-on amd64,armhf,arm64; then
    mv snapd_*.snap "$WORKING_DIR"
    mv snapd_*.txt "$WORKING_DIR"
    # Back from where we came
    cd "$WORKING_DIR" || exit 9
    # Remove the build temporary folder
    rm -rf "$SNAPD_BUILDDIR"
    ls -l1 snapd_*
else
	echo "Failed to build"
	exit 6
fi
```