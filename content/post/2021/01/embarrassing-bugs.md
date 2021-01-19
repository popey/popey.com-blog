+++
date = "2021-01-18T12:00:00-00:00"
title = "Embarrassing Bugs"
slug = "2021/01/embarrassing-bugs"
author = "Alan Pope"
tags = ['ubuntu', 'linux', 'steam', 'proton', 'gaming']
+++

Well, this is embarrassing! I recently filed a bug against an open source project because I genuinely thought it was broken. It was (almost, probably, entirely) my fault. I thought I'd fess up and explain what happened. It might be useful for others.

As I mentioned [yesterday](/blog/2021/01/upgrading-ubuntu/), I recently upgraded my Ubuntu machines, including my main desktop. It's a funky [Skull Canyon NUC](/blog/2020/12/multiple-gpus-in-a-skull-canyon-nuc/) with a weird hybrid Intel / AMD GPU setup and an external nVidia card in an enclosure.

I sometimes use this system for playing games in the evenings. The thing I've been really playing a lot recently is [Hotshot Racing](https://store.steampowered.com/app/609920/Hotshot_Racing/) which is "*a blisteringly fast arcade-style racing game fusing drift handling, razor-sharp retro visuals and an incredible sense of speed to create an exhilarating driving experience.*" according to their Steam blurb. It's great, I love it.

[![Hotshot Racing!](/blog/images/2021-01-19/hotshot.jpg)](https://store.steampowered.com/app/609920/Hotshot_Racing/)

Anyway, I was playing this happily via Steam using Proton as it's a Windows-only game, on my Ubuntu 20.10 system. I upgraded on Friday last week and then it "broke". I could no longer play the game. Steam launched, the game attempted to launch, then died on its arse. I tried other games, which worked fine, but they were native Linux binaries, not Windows games enabled via Proton. So it wasn't a system-wide issue, but something maybe Proton-specific.

I did some investigation and asked around with friends running Ubuntu Hirsute (21.04) to see if this was a "known" issue. I know that GPU drivers can be a bit weird on Linux. I'd recently attached a Razer Core external GPU enclosure to the computer, and installed the nvidia binary driver. Perhaps this was the cause? Nobody I asked had any data to suggest this was known.

I ripped out the nvidia driver, unplugged the eGPU, rebooted, and sacrificed a chicken in a pentagram. None of this helped. I rummaged in various log files, but couldn't turn up anything definitive. As it was limited to only proton games, I thought it was about time to file an [issue](https://github.com/ValveSoftware/steam-runtime/issues/348) against the upstream [Valve project](https://github.com/ValveSoftware/steam-runtime) on [Saturday evening](https://github.com/ValveSoftware/steam-runtime/issues/348#issue-787573206). You can of course go and read the issue, and learn the spoilers that you'd get from this blog post, or read on for my perspective 😜

Firstly, it's worth noting that the Steam Runtime project has a nice bug reporting template, as you can see below.

```
#### Your system information

* Steam Runtime Version: 
* Distribution (e.g. Ubuntu 18.04): 
* Link to your full system information (Help -> System Information) in a [Gist](https://gist.github.com/): 
  <!-- Please wait for the extended system infomation to be collected by Steam -->
* Have you checked for system updates?: [Yes/No]
* Are you using the Steam Linux Runtime compatibility tool?: [Yes/No]

#### Please describe your issue in as much detail as possible:
<!-- Describe what you _expected_ should happen and what _did_ happen. Please link any large code pastes as a [Github Gist](https://gist.github.com/) -->

<!--
If you are using the Steam Linux Runtime compatibility tool, please
provide the information requested here:
https://github.com/ValveSoftware/steam-runtime/blob/master/doc/reporting-steamlinuxruntime-bugs.md
-->

#### Steps for reproducing this issue:

1. 
2. 
3. 
```

I tried following this as best I could. I got a little confused by the question "Are you using the Steam Linux Runtime compatibility tool?". I mean, maybe, I dunno, am I? I always knew the thing that lets me run Windows games in Steam as "Proton", but maybe "Steam Linux Runtime" is the new or public branding for it? 🤷‍♂️

The rest was pretty easy, just attaching logs via GitHub gists, and detailing what happened. Quite a smooth process for filing an issue upstream. 

`Good job Valve & GitHub developers, would file again! ⭐⭐⭐⭐⭐`

Within 24 hours I received a friendly [reply](https://github.com/ValveSoftware/steam-runtime/issues/348#issuecomment-761842577) from [TTimo](https://github.com/TTimo) with suggestions, questions and request for more logs / data. I was keen to get this fixed so promptly [replied](https://github.com/ValveSoftware/steam-runtime/issues/348#issuecomment-761846823) with the requested data. We then bounced back and forth over the next few hours. 

Then the clanger. TTimo found this in a log:

`"messages" : "Unknown option: signal\nUnknown option: kill-after\nUsage:\n\ttimeout [-t timelimit] [-m memlimit] [-x hertz] command [arguments ...]\n\nDied at /home/alan/bin/timeout line 29.\n"`

What on earth is it looking in `/home/alan/bin` for? Also, what did it find‽

So the `~/bin` folder isn't created by default on Ubuntu systems, and never has been. However, for a long time (perhaps forever), *if* the folder exists, it gets added to your path, thanks to this section in your `/etc/skel/.profile` which ships as part of the `bash` package.

```
# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/bin" ] ; then
    PATH="$HOME/bin:$PATH"
fi
```

So on my system that folder exists, I made it, and it is my little dumping ground for scripts I may use here and there. One of the scripts in there is called `timeout` which originated from [this git repo](https://github.com/pshved/timeout), and is "*a resource monitoring program for limiting time and memory consumption of black-boxed processes under Linux.*". I must have grabbed it back in November (based on the file timestamp) and forgotten about it. 

Turns out there's *another* timeout binary out there on my system, which comes from the `coreutils` package.

```
alan@robot:~$ which timeout
/usr/bin/timeout
alan@robot:~$ dpkg -S $(which timeout)
coreutils: /usr/bin/timeout
```

When Steam was launching Hotshot Racing, at some point in the bowels of Proton, the `timeout` command was being executed. But because "my" `timeout` in `/home/alan/bin` was being found first, and didn't like the parameters passed to it, it failed printing usage, which was captured in the log and found by TTimo above. 

The "fix" was simply to move the `/home/alan/bin/timeout` binary out of the way - I renamed it `_timeout`. As soon as I did that, the game launched.

How embarrassing! 🤣

As for why this worked on Ubuntu 20.10 and didn't after the upgrade to Ubuntu 21.04, I have no idea! I'm not motivated to find out, because I've got [too many](/blog/2021/01/digital-hoarding-gaming-edition/) video games to play! 🏎

