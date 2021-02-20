+++
date = "2021-02-20T11:00:00-00:00"
title = "Scanning Frustration"
slug = "2021/02/scanning-frustration"
author = "Alan Pope"
tags = ['hardware', 'software', 'linux', 'hp', 'cups', 'hplip']
+++

"*Printers are devices for causing pain and frustration. They also sometimes print stuff out.*"
	- Me, many times over the years.

I have an [HP LaserJet 100 MFP M175nw](https://support.hp.com/us-en/drivers/selfservice/hp-laserjet-pro-100-color-mfp-m175/4208157/model/4208024) networked laser printer / scanner / copier. I've had it since 2013 where it's generally worked okay most of the time. We don't print a ton of things in this house, but when we do, it's typically urgently required for work or school. It can drop off the network now and then, or just refuse to print sometimes. It's always useful when it works, and frequently frustrating when it doesn't. 

I had cause today to scan some documents. We don't scan things in very often at all, maybe a couple of times a year. But as always, when you need to, you need to. I launched the "Document Scan..." application on my Ubuntu Hirsute Hippo which starts searching for scanners.

![Searching](/blog/images/2021-02-20/searching.png)

A few seconds later, the HP scanner is found, and we're ready to start scanning!

![Found](/blog/images/2021-02-20/found.png)

So we load up the scanner with pages to be scanned, and hit the green "Scan" button. But, no, it was never going to be that easy. 

![Driver installer](/blog/images/2021-02-20/driver1.png)

I have HPLIP installed, but have never seen these dialogs before. I just follow the prompts.

![Driver installer](/blog/images/2021-02-20/driver2.png)

It was going so well, then this happened.

![Driver installer](/blog/images/2021-02-20/driver3.png)

For the benefit of search engines, it's titled "*HP Device Manager - Plug-in Installer*" and contains the text "*/home/alan/.hplip/hplip-3.20.11-plugin.run file does not match its checksum. File may have been corrupted or altered*" with no option but an "OK" button.

I tried a couple of times but the same thing happened each time. Thankfully I'm a nerd, so was able to resolve this issue, but I can't imagine what *normies* might do in this circumstance. So I've written up what I did in case it's useful to anyone.

The indicated file `/home/alan/.hplip/hplip-3.20.11-plugin.run` didn't exist on my system. Perhaps it never got downloaded, or maybe it did, but was cleaned up after things went wrong. So I did a search online for the filename, and found a result at [openprinting.org download site](https://www.openprinting.org/download/printdriver/auxfiles/HP/plugins/).

![Downloads](/blog/images/2021-02-20/downloads.png)

I figured I'd try manually downloading it, outside of the above wizard, assuming this would do whatever's necessary to make my scanner work with the document scanning thing on Ubuntu. 

Opening the file revealed it was a compressed shell script which looked like it might be reasonable. I trust it because it comes from [OpenPrinting.org](https://openprinting.org), where I ordinarily wouldn't just run random scripts I found online. I ran:

```
$ cd ~/.hplip
$ wget https://www.openprinting.org/download/printdriver/auxfiles/HP/plugins/hplip-3.20.11-plugin.run
$ chmod +x ./hplip-3.20.11-plugin.run
$ ./hplip-3.20.11-plugin.run
```

Here's what that looked like.

![Manual](/blog/images/2021-02-20/manual.png)

I had to agree to a license.

![License](/blog/images/2021-02-20/license.png)

Then it needed my password, to put files in the right places I assume. 

![sudo](/blog/images/2021-02-20/sudo.png)

It seemed to complete okay, the script ending with "Done.".

![Done](/blog/images/2021-02-20/done.png)

So I tentatively re-launched the "Document Scan..." application on my laptop, waited for it to find the scanner, then hit the green button. It worked!

![Scan](/blog/images/2021-02-20/scan.png)

Happy days. Hope that helps someone. I'll file a bug once I figure out where to file it.