+++
date = "2010-12-20T09:00:00-00:00"
title = "My Ubuntu Webcam Setup"
slug = "2010/12/20/my-ubuntu-webcam-setup"
author = "Alan Pope"
tags = ['ubuntu', 'webcam']
+++

For a few years I’ve owned a variety of webcams which I’ve used under Debian and Ubuntu on my desktop and laptop computers. As many others do, I’ve used them with the likes of Skype & Ekiga for video calls and camstream & guvcview for just capturing images. More often than not though, my webcam is pointing out into the garden, taking images and uploading them to my website. I frequently get asked how I set this up, so rather than explain lots of times, I figured I’d blog it.

You could see the webcam at popey.com/webcam which at the time of writing shows a lonely snowman I made with the kids over the weekend. The camera itself is propped up inside the house, hard up against the window looking out. It’s not nailed down so it sometimes moves or goes a bit crooked.

Webcams can be tricky on Ubuntu, indeed on all Linux distros. The first one I had great success with was the Philips TouCam 740K which uses the pwc driver on Linux, and gives a pretty good picture quality, unlike most of the el-cheapo webcams I’ve played with over the years. Back when I ran Debian there were issues with the pwc driver, with it being removed from the kernel then got added back in later which caused me a little pain, but that’s all in the long distant (2004/2005) past now :).

Sadly the Philips TouCam 740K is no longer available (unsurprising given it’s 6 years old), but I hear other pwc based webcams work well on Linux too.

My current webcam is a Logitech QuickCam Pro 9000 which goes up to 960×720 in 4:3 aspect ratio. When used with guvcview it’s easy to take stills and video which look great in pretty much all lighting conditions.

Apparently the Logitech QuickCam Pro 9000 for business does slightly higher resolutions, up to 1280×720, but I’ve not tried that one. Kinda kicking myself that I didn’t buy the “for business” one at the time.

For my setup I wanted an application which allows me to plug the camera into a ‘headless’ server which has no graphical environment installed. The command-line tool “Webcam” (part of the xawtv package) does this brilliantly. I’m using Webcam (the software) under Ubuntu 10.10 running on my Acer Aspire Revo 3600.

Once installed, Webcam needs configuring, and that’s easily done by maintaining a file called ‘.webcamrc’ in the user home directory. Here’s what the first part of that file looks like, with ‘hostname’, ‘user’ and ‘password’ redacted, those are the bits that need to be maintained along with the remote directory name in ‘dir’

```
[ftp]
host = example.com
user = webcamuser
pass = xxxxx
dir = /home/webcamuser/public_html/webcam
file = webcam.jpg
tmp = uploading.jpeg
passive = 0
debug = 3
auto = 1
local = 1
ssh = 1
```

The [ftp] section at the top deals with telling Webcam where to upload the images it takes to. Note that whilst it says “ftp” I’m actually using scp (note ssh = 1). Also note the password can be specified, but if you prefer to use ssh keys to logon/scp then that works too. To start the webcam software I tend to do this and leave it running inside screen/byobu:-

SSH to Revo – where the webcam is connected
ssh-agent – to load the agent for keyed logons
ssh-add – to load the ssh key
webcam

This could probably be streamlined/automated, suggestions on how I might do that are welcome!

Here’s what it looks like when webcam starts up:-

```
webcamuser@mrevo:~$ webcam
reading config file: /home/webcamuser/.webcamrc
video4linux webcam v1.5 - (c) 1998-2002 Gerd Knorr
grabber config:
size 960x720 [none]
input (null), norm (null), jpeg quality 95
rotate=0, top=0, left=0, bottom=720, right=960
ssh config [ftp]:
webcamuser@example.com:/home/webcamuser/public_html/webcam
uploading.jpeg => webcam.jpg
```

..and when it’s been running a while you get this:-

```
compare: max=59,avg=7
compare: max=79,avg=7
compare: max=127,avg=8
compare: max=92,avg=6
compare: max=91,avg=7
compare: max=74,avg=7
compare: max=111,avg=7
compare: max=114,avg=7
```

The second section of ~/.webcamrc is below and details the settings relating to the camera, picture quality, resolution, annotation, and local saving of the images taken.

```
[grab]
device = /dev/video0
text = popeycam %Y-%m-%d %H:%M:%S
fg_red = 255
fg_green = 0
fg_blue = 0
width = 960
height = 720
delay = 6
brightness = 100
rotate = 0
top = 0
left = 0
bottom = -1
right = -1
quality = 95
trigger = 100
once = 0
archive = /home/webcamuser/webcam/archive/%Y/%m/%d/snap%Y-%m-%d-%H-%M-%S.jpg
```

Note the ‘text’ and fg_* parameters which set the text you see in the corner of my webcam and the colour (fg meaning foreground). Here you can also set the resolution that pictures will be taken at with ‘width’ and ‘height’, and whether the image is cropped with the ‘top’, ‘bottom’, ‘left’ and ‘right’ parameters.

The main parameters I tend to fiddle with are ‘quality’ (the jpeg quality setting makes quite a difference to file size and resulting image) and ‘trigger’ which determines how much the picture needs to change from the last one before Webcam will save a new snapshot.

The ‘archive’ parameter sets where (locally on the Revo) that Webcam will store images. Be warned if you leave it running you can end up with quite a few images saved. For example one 24 hour period last week generated 3638 images totalling 451MB space. Now of course this could be reduced by dropping the resolution, quality or frequency with which images are taken, worth bearing in mind though.

The final fun thing to do is make a video out of the images. The videos can be tedious to watch, especially if there’s not much going on, but sometimes it can be fun. For example I have had the webcam running as snow falls, or whilst we’re out in the garden, and these can be “fun” to watch.

Here’s one I made the other day when we were outside building a snowman. It’s also available in Ogg Theora format for those without flash.

So how are these made? Very easily with mencoder. Here’s the command I use:-

`mencoder "mf:///home/webcamuser/webcam/archive/2010/12/13/*.jpg" -mf fps=25 -o /home/webcamuser/webcam/20101213.avi -ovc lavc -lavcopts vcodec=msmpeg4v2:vbitrate=1200`

This takes all the images for one day, in this case 13th December 2010 and smooshes them together to make an MP4 video. It takes a while for the little 1.6GHz Atom CPU inside the Revo to do this, but I’m in no hurry to generate them, and again, file size and duration are dictated by the resolution, quality and trigger settings mentioned before.

What you get out is one of these:-

`20101213.avi: RIFF (little-endian) data, AVI, 960 x 720, 25.00 fps, video: Microsoft MPEG-4 v2`

Which I convert to Ogg Theora with the ffmpeg2theora command.

`ffmpeg2theora -v 10 /home/webcamuser/webcam/20101213.avi -o /home/webcamuser/webcam/20101213.ogv`

Job done. Feel free to leave a comment with any questions.


