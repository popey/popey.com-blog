+++
date = "2006-02-14T16:02:00-00:00"
title = "More busted computers fixed"
slug = "2006/02/more-busted-computers-fixed"
author = "Alan Pope"
tags = ['hardware', 'windows']
+++

This is a long post which started life as a letter to my Dad explaining what I had done to fix his broken computer. I figured it wouldn't hurt to paste it in here.

My Dad dropped off his PC to me. It's an ASUS motherboard based generic PC with a 1GHz CPU, 256MiB RAM, 30GB and 40GB disks, and a CD burner. It has a Matrox 450 video card, a Pinnacle DV500 ieee1394 capture card, a sound card, some USB ports and a PCI modem. It runs Microsoft Windows 2000, but as it has only been on a dialup connection in its life, it had virtually no updates installed.

Upon cold boot of PC a dialog box containing the error "Explorer.exe has generated errors and will be shutdown", a Dr Watson log is generated. When cancelling the dialog box the PC can get stuck in a loop repeatedly crashing explorer and generating logs. In addition, the mouse was non operational.

My target was to resolve the "explorer crashing on bootup" problem, clean off any nasty software, update the anti-virus package to the latest definitions/engine, scan the machine, update Windows with all available security patches, and install anything else I could think of that might make a difference to the life of the PC.

In order to get the box updated, download drivers and the like I decided to install an ethernet device in the machine so that I could get it on my (firewalled) network. I used a Netgear MA-301 PCI network card which was automatically detected by Windows 2000, drivers were installed and the card obtained an IP address from my DHCP server.

After each successive reboot windows explorer was still crashing. This was to be expected as nothing had changed.

Once booted I started windows task manager using the key combination CTRL+SHIFT+ESC. Using the "New Task" button I was able to start a command prompt window "CMD". This allowed me to navigate around using DOS commands, and start certain windows applications and tools without having to use the (broken due to explorer crashing) start menu.

I navigated to the directory where Internet Explorer is installed (C:\program files\internet explorer\) and ran iexplorer.exe from the command line. This spawned IE but I could not connect to the net because the proxy settings in IE (Tools --> Internet Options --> Connection --> Lan Settings) was set to 127.0.0.1. This is the IP address of the local machine - a so-called "loopback address". This led me to believe that there was a local proxy server which was caching requests. This was indeed the case, Tiscali Slipstream web accelerator was found. I disabled the proxy settings to bypass the Slipstream software as it would yield no benefit via my broadband connection and wouldn't function anyway as I am not with Tiscali.

Later on I chose to completely remove Tiscali Slipstream broadband accelerator but you can install it again from the Tiscali CDROM if required as I don't believe it was actually responsible for the problems on the machine.

I have my own web site on my network where I keep copies of software that I frequently need to install on Windows machines. I keep this up to date with the latest software for exactly this kind of situation.

I therefore now pointed IE at my local intranet and proceeded to download various utilities to your PC for later installation. In order to accelerate some of my later activities I deleted all the locally cached files from IE using the menu Tools --> Internet Options --> General (tab) --> Delete Files (button) --> Delete all offline content (tickbox) --> OK. I didn't anticipate this solving any problems, but it would mean less files to scan.

Once online the first thing I did was update Norton Anti-virus online to its latest definitions and engine. I then kicked off a virus scan which found a few viruses, which were removed.

Next to install was [f-force](http://www.f-secure.com/tools/f-force.zip) and the latest updates from [f-secure](http://www.f-secure.com/) which is a command line tool for removing many of the most common "malware" software programs (malware being a general term for "bad" software). I kicked off a scan which took some considerable time as it had to check quite a large number of files. It found a couple of nasties which were removed.

Next I downloaded and installed Ad-Aware which detects and removes a large number of spyware products.

Finally because I'm never 100% trusting one product I installed SpyBot-Search & Destroy; which does much the same as Ad-Aware.

Next came Windows 2000 Service Pack 4. After installation of SP4 I rebooted as required. During startup before the desktop appeared Windows issued a STOP (blue screen) with the error message IRQL_NOT_LESS_OR_EQUAL. I read an [article](http://www.microsoft.com/resources/documentation/Windows/2000/server/reskit/en-us/Default.asp?url=/resources/documentation/Windows/2000/server/reskit/en-us/prork/prhd_exe_igcc.asp) on the Microsoft website which indicated that it was possibly a hardware conflict which caused the STOP. I proceeded to remove each card from the machine until I could boot the PC without the STOP message appearing. It didn't take long to figure out it was the Pinnacle DV500 card. Further digging on the Pinnacle support website indicated that the DV500 card has issues when it is in a machine that has a number of cards - especially so under Windows 2000. Windows 2000 supports ACPI (basically power and resource management) in a particular way that it forces devices in a computer to share IRQs (interrupt request lines). This is okay normally, but the Pinnacle card is picky about who it shares its IRQ with.

The resolution (problem ID 245 on the Pinnacle support site) to this was a bit of a tricky one, namely to disable ACPI. To do this in Windows is no mean feat. I had to access the device manager applet in control panel and force Windows not to use an ACPI driver. To get to control panel (remembering that the explorer.exe crashes were still occuring - not fixed that yet!) I opened a command prompt window using the task manager trick I used earlier. In the command prompt window I typed "sysdm.cpl" and pressed [ENTER]. This started the system properties applet that you get to through control panel usually. In device manager I selected the ACPI device and chose to update driver. I chose the driver "Standard PC" which in effect tells the PC that you don't want to use the ACPI drivers anymore, and you want to treat the PC as a non-ACPI compliant machine. This required a reboot. As the machine rebooted I tapped the [DEL] key as the memory was being counted. In the BIOS I changed an option to tell the PC that a non-plug-and-play (APM/ACPI) operating system was installed. This would mean that the ACPI interfaces to the hardware would no longer be presented to Windows when it boots. The result of this is that Windows would boot but would redetect all the hardware because it has never seen it all before through a non-ACPI interface.

This indeed did happen, all the hardware devices including chipsets on the mother board, the sound card, video card and so on were re-detected by Windows 2000 as new devices and were installed correctly.

I reinserted the DV500 card only to find the machine blue screen again on reboot. I removed it again and updated the drivers for the DV500 card to version 4.5 from the Pinnacle website. Upon the next reboot with the card in it all worked fine with no blue screens. There is one slight downside with the removal of ACPI and that is that Windows can't shut the PC down properly. When you shut the PC down from the start menu it will go through the motions and then ask you to turn the computer off rather than shut itself down. This is because the ability to power down the PC is done by an ACPI call, having no ACPI driver means no way to switch off the PC in software. I figured that was a minor inconvenience and hope you don't mind.

I still had the explorer.exe crashing issue though. I decided to persevere with the updates to the machine though to make sure I had it all up to date before I could start pointing the finger at anything. I visited the Windows Update site and downloaded and installed all available security updates. I also updated Windows with Media Player 9 and DirectX 9. I figured that as you're on dial-up these monster downloads would never happen for you, so it pays to take advantage of my broadband connection.

Finally I updated the drivers for your Matrox video card which I obtained from the Matrox site.

I tried a couple of bits of software that I knew would be key for you. The main one I tried was Adobe Premiere 6.0 which I guessed from the fact you have a DV card in the machine, you'd probably use for video editing. It crashed in a spectacular fashion. I haven't seen many applications that can crash a machine running a fully patched Windows 2000 install. This was quite a doozy! Premiere would load up to a point then reboot the entire machine with no warning. Pop!

Still explorer.exe crashed. I started to search the net for answers to this one and found one [hit](http://support.microsoft.com/kb/255758/) that made me think. The Microsoft knowledge base article states that under certain conditions explorer crashes in the way it had been for you. The conditions under which it happens are that a certain Norton product is installed. I took the decision to temporarily remove Norton from the machine and reboot a few times. Since I removed Norton the explorer.exe crashing problem hasn't occurred at all. I consider Norton to blame for that problem.

As I didn't want to give you back a PC with no Anti-Virus software I downloaded and installed a product called AVG from [Grisoft](http://free.grisoft.com/). It's a free AV product which works very well in my experience. It's unobtrusive, gets on and does the job of scanning files and emails in the background with no fuss. It will update itself either when it notes some time has passed since the last update, or when you force it to by clicking on the little square coloured icon. Worth noting that after installing AVG instead of Norton the PC not only boots faster, but AVG found two viruses that Norton didn't.

I know a lot of people get very religious about their anti-virus packages, indeed telling someone they bought a crap one is almost as bad in some peoples eyes as telling someone they have a shit car! I have just had good personal experiences with AVG for the last 5 or so years. The experience I've had with Norton on your PC have only decreased my already-low opinion of Norton.

Since removing Norton it's also worth noting that Adobe Premiere no longer crashes.

As the PC was a little slow I took a moment to find out what the maximum amount of memory the motherboard could take. According to [this](http://www.motherboard.cz/mb/asus/CUSL2-C.htm) site it can take a maximum of 512MiB of PC133 RAM. You already had one stick of 256MiB and two spare slots. I had a rummage around and found a 512MiB PC133 stick sitting in an old machine that was no longer being used. I swapped out the 256 and put the 512MiB in and booted it up. It seems quite a bit quicker now.

As a test I did actually put the 256MiB and the 512MiB in together but the manual was right, 512MiB is the maximum that your motherboard will "see". I hope you don't mind I kept hold of the 256MiB.

All in all this took somewhere in the region of 4-6 hours solid work with some reboots and soak tests in between. I'm no Windows expert so this whole process may well have been speeded up if someone with more expertise had been involved. I do my best to avoid Windows wherever possible, but when family or someone daft enough to pay me has a problem I'll help where I can. In this case I would say that this was a successful resolution, even if somewhat time consuming and frustrating for me.

Hope that all makes sense.
