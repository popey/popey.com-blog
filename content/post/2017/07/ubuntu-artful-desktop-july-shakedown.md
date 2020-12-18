+++
date = "2017-07-17T07:00:00-07:00"
title = "Ubuntu Artful Desktop July Shakedown"
slug = "2017/07/ubuntu-artful-desktop-july-shakedown"
tags = ['ubuntu', 'event', 'community', 'artful', 'testing']
+++


## Ubuntu Artful Desktop July Shakedown

We’re mid-way through the [Ubuntu Artful development cycle](https://wiki.ubuntu.com/ArtfulAardvark/ReleaseSchedule), with the 17.10 release rapidly approaching on the horizon. Now is a great time to 
start exercising the new GNOME goodness that’s landed on our recent daily images! Please [download](http://cdimage.ubuntu.com/ubuntu/daily-live/) the ISO, test it out on your own hardware, and file 
bugs where appropriate. 

If you’re lucky enough to find any new bugs, please tag them with ‘julyshakedown’, so we can easily find them from this testing session.

![Ubuntu Artful Desktop](/blog/images/2017-07-17/desktop.png)

We recently switched the images to GDM as the login manager instead of LightDM, and GNOME Shell is now the default desktop, replacing Unity. These would be great parts of the system to exercise this 
early in the cycle. It’s also a good time to test out the Ubuntu on Wayland session to see how it performs in your use cases.

## Get started

  * Grab the latest daily image from [cdimage](http://cdimage.ubuntu.com/ubuntu/daily-live/).
  * Copy the ISO on a USB key using one of the guides for [macOS](https://tutorials.ubuntu.com/tutorial/tutorial-create-a-usb-stick-on-macos#0), 
[Windows](https://tutorials.ubuntu.com/tutorial/tutorial-create-a-usb-stick-on-windows#0) or [Ubuntu](https://tutorials.ubuntu.com/tutorial/tutorial-create-a-usb-stick-on-ubuntu#0)  
  * [Install](https://tutorials.ubuntu.com/tutorial/tutorial-install-ubuntu-desktop#0) Ubuntu!
  * [Report](https://askubuntu.com/a/5126/612) any bugs you find

## Suggested tests

This early in the cycle we’re not yet recommending full [ISO testing](https://wiki.ubuntu.com/Testing/ISO), but some exploratory tests on a diverse range of set-ups would be appropriate. There’s 
enough new and interesting stuff in these ISOs that make it worthwhile giving everything a good exercise. Here’s some examples of things you might want to run through to get started.

![Ubuntu on Wayland](/blog/images/2017-07-17/wayland_gdm.png)

  * Logging in using the ‘Ubuntu on Wayland’ session for your normal day to day activities
  * Suspend & resume and check everything still functions as expected
  * Attach to, and switch between wired and wireless networks you have nearby
  * Connect any bluetooth devices you have, especially audio devices, and make sure they work as expected
  * Plug in external displays if you have them, and ensure they work as usual

## Reporting issues

The Ubuntu Desktop Team are happy to help you with these ISO images. The team are available in [#ubuntu-desktop](http://webchat.freenode.net/?channels=%23ubuntu-desktop&uio=d4) on freenode IRC. If nobody is about in your timezone, you may need to wait until the European work day to find active developers.

Bugs are tracked in [Launchpad](https://launchpad.net/), so you’ll need an account there to get started. 

If you report defects that occur only when running a wayland session please add the tag ‘wayland’ to the bug report. 

Remember to use the 'julyshakedown' tag on your bugs so we can easily find them!

## Known issues

There is a known issue with using Bluetooth audio devices from the greeter.  This means that people won’t be able to use screenreaders over Bluetooth at the greeter.  Once in the session this should all work as normal though.

Issues specific to wayland:

  * [https://bugs.launchpad.net/ubuntu/+bugs?field.tag=wayland](https://bugs.launchpad.net/ubuntu/+bugs?field.tag=wayland)
  * [https://bugs.launchpad.net/ubuntu/+bugs?field.tag=wayland-session](https://bugs.launchpad.net/ubuntu/+bugs?field.tag=wayland-session)

We look forward to receiving your feedback, and results!

:)
