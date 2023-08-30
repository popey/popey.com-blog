+++
date = "2023-08-30T06:00-00:00"
title = "Silly brain"
slug = "2023/08/silly-brain"
author = "Alan Pope"
tags = ['printing', 'meatbag', 'distraction', 'shiny', 'wsl']
+++

A re-enactment of an event yesterday evening.

I was just leaving an online game =when I noticed a conversation among the [Late Night Linux](https://latenightlinux.com/) Telegram group about printing. One person quipped that people don't print much anymore. Someone else suggested that they print more these days than they used to.

My brain saw this and thought **"Huh, I wonder how many pages my printer has completed in its lifetime. I imagine that's easy to find out."**

## Step 1: Guess the IP

I remember at some point the IP address of the printer on the LAN was 192.168.0.222, so I visit that in my browser. No, not that. 

## Step 2: Find the IP

Think about whether I could find the IP out from the OS system settings, or if it's easier to go to the printer and fumble around there. Remember that the printer is around three feet behind me. 

I turn around and note the IP is displayed on the laser display screen. 

## Step 3: Open the admin tool

[![HP Web Admin Tool](/blog/images/2023-08-30/hpadmin.png)](/blog/images/2023-08-30/hpadmin.png)

## Step 4: Noodle around for the page count

After some minutes, I don't find the page count, but I do discover this screen.

[![HP Web Services](/blog/images/2023-08-30/webservices.png)](/blog/images/2023-08-30/webservices.png)

Wait, what's that device on the left!?

Select, crop, zoom... 

[![Device](/blog/images/2023-08-30/device.png)](/blog/images/2023-08-30/device.png)

Is that some kind of Blackberry!?

## Step 5: Find that device

[![Google image search](/blog/images/2023-08-30/imagesearch.png)](/blog/images/2023-08-30/imagesearch.png)

Ok, it's an HP device, that makes total sense given it's an HP printer.

## Step 6: Find out more!

I am now invested in this [HP iPAQ Glisten](https://www.gsmarena.com/hp_ipaq_glisten-3036.php) - which I'd not heard of before. Sure, I've heard of the HP iPAQ brand of devices, just not this one. Huh, announced in 2009. Here it is on my printer admin tool in 2023. 

Wait, when did I get this printer!?

## Step 7: Find the receipt

Search my email and discover I bought it off an eBay seller in 2013. 

[![Google image search](/blog/images/2023-08-30/ebay.png)](/blog/images/2023-08-30/ebay.png)

I had no idea this lump of plastic and metal has been sat in our house eating toner and sometimes printing things for coming up to a decade. Does everyone keep their printer that long?

Decide this is a question for the masses. I'll write it up as a mildly humorous blog post.

## Step 8: Reboot or not

As we started our tale, I'm in Windows, exiting an online (Windows only) game. 

Do I reboot to Linux where all my blog related tooling is setup?

Of course not, that would be far too easy. We shall plough on and write the blog here in Windows.

## Step 9: Fire up WSL

Thankfully at least I must have installed WSL at some point in the past, so I can quickly clone the [repo](https://github.com/popey/popey.com-blog) my [blog](https://popey.com/blog) source code lives in.

Sure, I could clone the repo in Windows directly. But my brain knows git and Linux stuff in the terminal, and WSL is here already.

## Step 10: Install Hugo

My blog uses the static site generator [Hugo](https://gohugo.io/) which has binary builds for lots of platforms. Don't be like me, and download the arm64 build for your amd64 WSL image. That's silly.

[![WSL](/blog/images/2023-08-30/wsl.png)](/blog/images/2023-08-30/wsl.png)

I eventually found the amd64 deb package and installed that.

## Step 11: Install Sublime Text & Merge

(Even though I have Visual Studio Code already installed here for some reason)

I really like [Sublime Text](https://www.sublimetext.com/3) and [Sublime Merge](https://www.sublimemerge.com/), and even have a paid license for each. So I go and download them both and install them, and find the license keys in my email from 2020 and apply them too!

[![Sublime Text licensed](/blog/images/2023-08-30/st.png)](/blog/images/2023-08-30/st.png) [![Sublime Merge licensed](/blog/images/2023-08-30/sm.png)](/blog/images/2023-08-30/sm.png)

Fun fact, you can remove the license from each of these products in the Help menu. That's useful to know if you want to add the license key back in, so you can take a screenshot of the "Thank you" dialog for a blog post. Good to know! 

I probably don't need Sublime Merge, as I could push my changes with git on the WSL command line. But I really prefer a GUI for git.

## Step 12: Find where WSL puts files

This is neat! Windows exposes the Linux filesystem in the Explorer, under this little Tux icon. I like this. Previous releases of WSL required you to rummage around in folders. 

[![Windows explorer](/blog/images/2023-08-30/explorer.png)](/blog/images/2023-08-30/explorer.png)

## Step 13: Create the blog post

I could be deliciously "meta" here and add recurive steps one through twelve of writing a blog post, but I think that's needlessly painful.

I just used Sublime Text and Hugo as I usually do.

## Step 14: Learnings

What have we learned here:

 * Alan gets easily distracted by pointless questions
 * Alan is fascinated by seemingly ancient technology in web admin tools
 * Alan is too lazy to take two minutes to reboot into Linux to write a blog post, but will happily spend 10 minutes setting up his environment in Windows to write that blog post
 * Sublime Text and Sublime Merge can have their licenses easily removed and re-added
 * Windows explorer makes it easy to get at the WSL Linux filesystem
 * Oh, and it was an HP iPAQ Glisten on the admin page

## Conclusion

I'm not sure we have one. Two and a half hours have passed, by the way.

----  

Is this ADHD?

It takes about two years to get an [adult diagnosis for ADHD](https://adhdaware.org.uk/what-is-adhd/getting-nhs-diagnosis/) on the NHS. Privately it's hundreds to thousands of pounds for weeks to months of waiting for an appointment. 

Also, seriously, does everyone keep their printer for a decade or more.

Also, also, how can I get the lifetime page count from my HP LaserJet 100 colorMFP M175nw.

Thanks.