+++
date = "2020-12-28T12:00:00-00:00"
title = "Notifications on Task Completion"
slug = "2020/12/notifications-on-task-completion"
author = "Alan Pope"
tags = ['software', 'ubuntu', 'terminal', 'linux']
+++

Like many in development-oriented roles, I'm frequently running long-executing tasks on my workstation, while I get on with a sword fight, or making a cup of coffee.

[![Compiling!](/blog/images/2020-12-28/compiling.png)](https://xkcd.com/303/)

More seriously, I do often leave a software build, or packaging script running, while I context-switch to answer support requests, proof-read a blog post, or prepare for a meeting. Sometimes it's nice to be reminded when that long-runner finishes, otherwise I might forget it's sat there, all lonely in another workspace somewhere on my computer. 

![Terminal](/blog/images/2020-12-28/terminal.png)

Enter [undistract-me](https://github.com/jml/undistract-me) by the ever-excellent [Jonathan Lange](https://github.com/jml). This solves the forgetfulness problem I have by pinging a desktop notification at me when a long-running task finishes in a terminal window somewhere on my machine. It's super simple, and very handy.

![Notification](/blog/images/2020-12-28/notification.png)

If you're afk getting a coffee, or just miss the notification while you're looking out the window, no matter, you can see it alongside all the other notifications in your desktop.

![Notifications](/blog/images/2020-12-28/notifications.png)

I install this on all of my Ubuntu desktop / laptop systems. You might want to as it's pretty handy. I know some other Linux distributions have this kind of feature baked into their out-of-the-box experience, but Ubuntu doesn't, so I install it myself.

## Install 

It's in the Ubuntu [repositories](http://packages.ubuntu.com/undistract-me), so a simple `apt install` will install it.

`$ sudo apt install undistract-me`

## Setup

If you're like me, and use `bash` as your default shell, this one line will setup undistract-me. 

`$ echo 'source /etc/profile.d/undistract-me.sh' >> ~/.bashrc`

That's it!

## Usage

Just use the terminal as you normally do. Any long running tasks will trigger a notification when they complete, if the terminal isn't focused. Simple. 

I personally find this great, as I'll frequently get distracted, doing some other crucial piece of work, while a terminal sits diligently waiting for me...

Now I won't forget about it!