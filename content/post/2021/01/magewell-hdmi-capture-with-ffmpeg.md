+++
date = "2021-01-27T12:00:00-00:00"
title = "Magewell HDMI Capture with ffmpeg"
slug = "2021/01/magewell-hdmi-capture-with-ffmpeg"
author = "Alan Pope"
tags = ['hardware', 'linux', 'hdmi', 'ffmpeg']
+++

Three years ago I bought a [Magewell USB HDMI capture device](https://geni.us/RWqQ) (affiliate link). It's a neat, reliable and well made, if expensive device. I use it to capture the output of computers, mostly to get pixel perfect bug reports, and to make some videos for YouTube. I prefer these hardware solutions over the software screencasting counterparts, as they tend to be more reliable, and don't consume resources on the computer being recorded.

[![Magewell USB HDMI capture device](/blog/images/2021-01-27/magewell.jpg)](https://geni.us/RWqQ)

*If you're looking for a cheaper alternative (which weren't around when I bought the above device) check out [How to Tweak a £10 HDMI to USB Capture Device](https://bigl.es/friday-fun-10-hdmi-to-usb-capture/) by [Les Pounder](https://bigl.es/).*

One end has an HDMI socket, the other has a USB 3.0 Type-A socket. Attach the output of the machine you want to capture to the HDMI port. Connect one end of the supplied USB cable to the device, and the other end to machine doing the capturing. That's how to "install" it. Simple.

I have the Magewell device permanently connected to my PC. It can get a little warm while powered up. Given I don't use it all the time, I attached it to the PC via a [USB 3.0 Hub](https://geni.us/pRns6) (affiliate link) with individual switches for each port. I simply turn the port off when the capture card isn't in use. Perhaps this prolongs the device lifetime, I don't know. But it certainly doesn't sit there wasting power getting hot anymore.

On Linux, no additional driver is needed. When attached to a USB port the Magewell device shows up under `/dev/video*` on Linux. There's a few software options available to capture the stream including VLC and OBS, but I prefer to use a little script. I call it `make_screencast` and it lives in my `/home/alan/bin` folder, on the machine capturing the video. The script is below.

When I first got the Magewell device it would sometimes just disappear from the USB bus. I have no idea why, nor whether this is a problem with the device, the kernel, my USB ports, cable or hub. I never investigated that in detail, but instead added a workaround. The `make_screencast` script uses a utility called `usbreset`. The source for that is at [this gist](https://gist.github.com/x2q/5124616) which I found via [this stackexchange post](https://raspberrypi.stackexchange.com/a/9265/21). I compiled it and dropped that in `/home/alan/bin` too.

The script uses some bits of that stackexchange post to enumerate the correct device to reset, then uses `usbreset` to reset it, under `sudo`. I added a delay in to give the device time to settle before it starts recording. I could probably remove all of that, and test the device out without resetting. I suspect it likely doesn't need to be reset so much now, as the device tends to be powered off most of the time, and is only powered back on to use it intermittently. 

Here's the full script in case it's useful to anyone else. Note the `USBID` field is specific to this device, and relates to the output you see in `lspci -n` when the capture card is attached.

```
#!/bin/bash

FFMPEGBIN="/usr/bin/ffmpeg"
RATE="60"
SIZE="1920x1080"
USBID="2935:0006"
OUTPUTDIR="$HOME/Videos"
FILE="Screencast-$(date +%Y-%m-%d-%H%M%S).mkv"
FILENAME="$OUTPUTDIR/$FILE"
VIDEODEVICE="/dev/video4"
WAITTIME="5"

DEVICEID=$(lsusb | grep "$USBID")
if [[ "$?" == "0" ]]; then
  echo "*** Found Magewell device, resetting"
  BUS=$(echo "$DEVICEID" | awk -F ' ' '{ print $2 }')
  DEV=$(echo "$DEVICEID"| awk -F ' ' '{ print $4 }' | tr -d ':')
  sudo /home/alan/bin/usbreset /dev/bus/usb/"$BUS"/"$DEV"
  echo "*** Waiting $WAITTIME seconds to settle"
  sleep "$WAITTIME"
else
  echo "*** Can't find Magewell device, exiting ***"
  exit 1
fi

read -p "*** Press Enter to start recording ***"
"$FFMPEGBIN" \
      -thread_queue_size 512 \
      -r "$RATE" \
      -f v4l2 \
      -video_size "$SIZE" \
      -i "$VIDEODEVICE" \
      -crf 0 \
      -c:v libx264 \
      -preset ultrafast \
      -threads 4  \
      "$FILENAME"

echo "$FILENAME"
```

Here's what it looks like when it runs. I have snipped out some of the chatty header of ffmpeg. Just press 'q' to stop the recording, at which point it prints the path to the recorded video.

```
*** Found Magewell device, resetting
Resetting USB device /dev/bus/usb/002/006
Reset successful
*** Waiting 5 seconds to settle
*** Press Enter to start recording ***
ffmpeg version 4.3.1-7ubuntu1 Copyright (c) 2000-2020 the FFmpeg developers
Input #0, video4linux2,v4l2, from '/dev/video4':
  Duration: N/A, start: 911487.880892, bitrate: 1990656 kb/s
    Stream #0:0: Video: rawvideo (YUY2 / 0x32595559), yuyv422, 1920x1080, 1990656 kb/s, 60 fps, 60 tbr, 1000k tbn, 1000k tbc                                                                                                             
Stream mapping:                                                                                                                
  Stream #0:0 -> #0:0 (rawvideo (native) -> h264 (libx264))                                                                                                     
Press [q] to stop, [?] for help                                                                                     
Output #0, matroska, to '/home/alan/Videos/Screencast-2021-01-27-120421.mkv':
Metadata:
    encoder         : Lavf58.45.100
    Stream #0:0: Video: h264 (libx264) (H264 / 0x34363248), yuv422p, 1920x1080, q=-1--1, 60 fps, 1k tbn, 60 tbc
    Metadata:
      encoder         : Lavc58.91.100 libx264
    Side data:
      cpb: bitrate max/min/avg: 0/0/0 buffer size: 0 vbv_delay: N/A
frame= 2649 fps= 60 q=-1.0 Lsize=   23495kB time=00:00:44.13 bitrate=4361.1kbits/s speed=   1x
video:23476kB audio:0kB subtitle:0kB other streams:0kB global headers:0kB muxing overhead: 0.081421%
/home/alan/Videos/Screencast-2021-01-27-120421.mkv
```

When no device is attacked, you get an image like this, so you can test with no external source attached.

![No source](/blog/images/2021-01-27/capture.jpg)

That's it. You get a nice 1080p60 video which can be uploaded to video sharing sites, or used in whatever video editor you prefer. 

The script could certainly be improved. For example it could detect if the device needs resetting somehow, and only do it when necessary. It might also be nice to put a little frontend together to select things like the framerate, resolution, codec etc. I haven't done that because I almost never change any of those settings. I typically just fire it off and press 'q' when done. 

Hope that's helpful to someone.
