+++
date = "2021-01-13T12:00:00-00:00"
title = "null"
slug = "2021/01/null"
author = "Alan Pope"
tags = ['null', 'snap', 'linux']
+++

I quite like to break things. While I'm not a QA or security professional, I have developed a knack for doing "stupid" things with software which causes it to malfunction. Some developer friends of mine have lamented that they didn't show me software before they released it. Because I sometimes find annoying bugs immediately after they release. 

Here's some fun examples of pushing the boundaries of software, sometimes by doing things a little "out there", beyond what the developer expected or tested.

## Schrödinger's Bug

Back in 2013, Fedora 19 shipped with the [codename](https://fedoraproject.org/wiki/History_of_Fedora_release_names#Fedora_19_.28Schr.C3.B6dinger.27s_Cat.29) "Schrödinger's Cat". Using this name uncovered a [bug](https://bugzilla.redhat.com/show_bug.cgi?id=922433) in the bug reporting system that Fedora used. This bug has now been fixed, but at the time it was a frustrating, if amusing, issue for the distro.

In short, the distribution release codeame contained (forgive me non-en-GB people) "special" characters "'" and "ö".

This was the path that got me testing the pointy edges of software. 

## Launchpad 🍺🐧🐱 🦄

Where Fedora used BugZilla for issue tracking, Ubuntu uses [Launchpad](https://launchpad.net/). During the Fedora 19 issue above, someone on the LaunchPad team confidently suggested that the problem wouldn't occur on our infrastructure. I felt this was a bold assertion to make, and didn't believe this was fully tested.

So from that point onwards, I changed [my LaunchPad profile](https://launchpad.net/~popey) to have emoji in the friendly name field.

![Launchpad](/blog/images/2021-01-13/launchpad.png)

## Thunder 🐦

As Launchpad has a bug tracker, which sends emails, and I was an active bug reporter, developers would receive mails from me, via Launchpad. Those developers who used Thunderbird experienced something like this:

![Thunderbird](/blog/images/2021-01-13/thunderbird.png)

*I couldnt' find a screenshot someone sent me of their email client with my mails in it, so I used the above from [bug 1779569](https://bugs.launchpad.net/ubuntu/+source/thunderbird/+bug/1779569)*

This was a [bug](https://bugs.launchpad.net/ubuntu/+source/thunderbird/+bug/1761844) in Thunderbird, which has since been fixed. I find it fun to know that simply adding pretty emoji to your Launchpad profile has unintended consequences in seemingly unrelated software. Great success 🌈

## Repetitious Ringtail

I went through a phase a while back of holding down keys to see what they did. The premise for this is "What if a cat stands on a key?". There is [past](https://kernelcat.com/) [evidence](https://bugs.launchpad.net/ubuntu/+source/unity-greeter/+bug/1538615) that cats can indeed uncover issues.

### Mute Mute Mute Mute

My ThinkPads have a hardware microphone mute button in the top row. The button has an LED inside, so the user can see the state of mutedness. When the LED is on, the microphone is muted.

![Thinkpad](/blog/images/2020-12-25/external-keyboard.jpg)

I discovered that when holding down the mute button, it would auto-repeat. That's fair enough, but there was an indicator in the top right of the screen, showing the state of mutedness or not. Unfortunately after holding down mute for a second or two, the LED and the indicator would eventually get out of sync. The LED would suggest you're muted, but the indicator would show the opposite. This could be embarrassing!

### PrtScScScScSc

When you press the PrtSc (Print Screen) key with most operating systems (not you: MacOS), this triggers a capture of what's on the screen in some way. In Ubuntu there is a shutter effect, a flash of the screen, fade to black, and a sound effect to show this had been done. There's a little delay while the screenshot is taken, and the fade effect occurs between the keypress and the desktop coming back to being usable. 

I discovered the PrtSc key also repeated. This was a little more of a problem, because once the auto-repeat started, the repeated flashing and fade effect would max out the CPU, making subsequent screenshots take a very long time. It felt like the computer had locked up or entered a very bad state, as the screen was black and the CPU became busy, which typically caused the fan to spin up.

I had a conversation on IRC at the time with Seb and [Will](https://www.whizzy.org) from the desktop team. I probably should have warned Will before telling him what would happen. Here's a dramatic reconstruction of the events of the day.

```
<popey> Hey, anyone on latest release, if you hold down PrtSc, does the key auto-repeat?
<seb12> Why would you do that?
<willcooke> Hold on, let me test
<willcooke> ** Disconnected
<popey> Oops! I should have told Will, his screen will go black
```

This was also later fixed. 

## ∅

A year or so ago, at a company sprint I gave a lightning talk in which I wanted to make the tiniest possible snap. I "wrote" the talk about 30 minutes before giving it, and didn't fully test everything until I was on stage, in front of half the company.

For fun, in an interactive way with the audience, I made a snap called `null` with the intention of it being almost completely empty, hence the name. I set the name, description, summary, parts and other metadata to the string "null". The snap built and installed perfectly fine locally. So for extra fun, I registered the name `null` in the store, and then attempted to publish my creation for all to see.

While publishing, a spinner was shown (as expected) but ran for a lot longer than I expected for an essentially empty package. I was a little flummoxed, on stage, until someone from the Snap Store team in the audience grabbed a microphone and spoke up. Daniel said something like "*That's never going to finish, you've crashed the backend*". Whoopsie!

When snaps are uploaded, there are security and sanity checks which run against the snap. My use of the (probably reserved) word `null` seemed to fool the backend checks script, live on stage, in front of my peers. That's the way to end a lightning talk, I think!

The backend bug was reported by Daniel and fixed very promptly. My fun [null snap](https://snapcraft.io/null) is now successfully published, and unfathomably has almost 100 "users"!

![null](/blog/images/2021-01-13/null.png)

## The gift that keeps on giving

The fun thing about doing these things like setting emoji in your name, or naming things weirdly, is they don't tend to cause only one problem, once. 

### null by mail

Publishers of snaps get an email once a month titled "Your Month In Snaps" which gives them a summary of the number of active users for each of their snaps. 

![YMIS](/blog/images/2021-01-13/ymis.png)

I recently received one such summary mail which was truncated where it got to the `null` and stopped. This is 18 months after my lightning talk, long after the snap was published. It's a poisonous well of endless fun. 

I reported this to the team behind the emails, and it's now fixed.

### .. and giving

The Snap Store has a delightful open source web frontend, the source code for which is on [GitHub](https://github.com/canonical-web-and-design/snapcraft.io). I noticed that some parts of the UI wouldn't work when I was looking at the information for my (now published) [null snap](https://snapcraft.io/null). This turned out to be another [bug](https://github.com/canonical-web-and-design/snapcraft.io/issues/3320) which has been fixed now too.

I like the comment from Francisco "*Your null snap should be working now (Until next `null` issue)*". 

Excellent.

![Excellent](/blog/images/2021-01-13/excellent.gif)

## ~~Move fast and~~ break things

I feel like all of these are minor successes. I get that some people will throw their hands in the air and complain that none of this was tested properly before release. There certainly may have been some cases of that. But I don't think you can fully account for all the very stupid things people might do with your software. 

Me, I'm going to keep on holding down keys, clicking on the wrong thing, and naming things stupidly, so the next person who comes along, doesn't see that bug that we uncover. 