+++
date = "2023-09-09T00:00:00+01:00"
title = "Code page 437 aesthetic"
slug = "2023/09/codepage-437-aesthetic"
author = "Alan Pope"
tags = ['design', 'dos', 'dbaseIII']
+++

At [Axiom](https://axiom.co/), our design team has recently come up with a "new" (to us) 🌟aesthetic🌟 for some of our online content. It shows up in posts & ads on social media and in featured images on [blog posts](https://axiom.co/blog/introducing-cloudflare-logpush-app). [Here](https://twitter.com/AxiomFM/status/1684215435254812672) is an example.

{{< rawhtml >}}
<center><blockquote class="twitter-tweet"><p lang="en" dir="ltr">Announcing distributed tracing support<br><br>└ Visualize traces in a new waterfall view.<br>└ New dashboards to explore your services.<br>└ No sampling, no compromise.<br>└ All your traces, all the time.<br><br>Find out more →</p>&mdash; Axiom (@AxiomFM) <a href="https://twitter.com/AxiomFM/status/1684215435254812672?ref_src=twsrc%5Etfw">July 26, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></center>
{{< /rawhtml >}}

It's the lines, the boxes, the drop-shadow for me. 

It's all very [Code Page 437](https://en.wikipedia.org/wiki/Code_page_437). Beautiful. I love it.

[![Code Page 437](/blog/images/2023-09-09/Codepage-437.png)](/blog/images/2023-09-09/Codepage-437.png)

As a DOS user in the 1990s, this tingled some nostalgic memories for me. 

## College

At college in the early 90's, I learned a bit of database theory. What database you ask? Well, the fantastic [dBase](https://en.wikipedia.org/wiki/DBase) III from [Ashton Tate](https://en.wikipedia.org/wiki/Ashton-Tate) Corporation, later [Borland](https://en.wikipedia.org/wiki/Borland).

Look at this. Beautiful 😍

[![dbase III](/blog/images/2023-09-09/dbaseIII.png)](/blog/images/2023-09-09/dbaseIII.png)

It came on floppy disks, in a cardboard box!

[![dbase III](/blog/images/2023-09-09/disk1.png)](/blog/images/2023-09-09/disk1.png)

Every time I watch [Office Space](https://en.wikipedia.org/wiki/Office_Space), this scene makes me smile.

[![Office Space](/blog/images/2023-09-09/officespace.png)](/blog/images/2023-09-09/officespace.png)

Obviously, other scenes also make me smile. This one does because it makes me do this.

[![Leonardo, pointing](/blog/images/2023-09-09/leo.jpg)](/blog/images/2023-09-09/leo.jpg)

## Actual work

After I finished my education at the college, I got a job at the same faculty, but in another department. Most of my time was as a technician, setting up experiments for the students. I also managed the departments' small collection of personal computers. 

My reputation for computer enthusiasm spread. I got roped into helping *another* department with a database migration project. 

## Not at work

This work was actually for a boutique hotel in Knightsbridge, London. I forget which hotel it was, but I do recall visiting once and seeing a famous actor checking out. It was quite posh and very out of my comfort zone as a 23-year-old nerd.

The hotel had a database of customers on a PC located at the hotel. On April 16th, 1995 the UK had "[PhONEday](https://en.wikipedia.org/wiki/PhONEday)", where most phone numbers had to change to accommodate more customer capacity.

The hotel needed the customer database to be updated, essentially modifying every record to replace old, incorrect phone numbers with the new format. For some reason, this work came to me. How a college in Farnborough ended up helping a posh hotel in London with some dbaseIII work I do not know. 

## Privacy?

I managed to get a subset of the database sent over on a floppy disk. I could then write some dBase code to do the migration on this snapshot. In those days it seemed perfectly normal to put your entire customer database on a floppy disk and post it to some random 23-year-old nerd. How times change!

The goal was for me to write the migration script, validate the output, then do the actual data migration on-site. I had plenty of time to write the code, but there was a hard deadline for the actual migration to happen before [PhONEday](https://en.wikipedia.org/wiki/PhONEday).

I don't remember how many records were in the database, but it was in the region of some thousands. It wasn't a massive hotel. Having a copy of the database also meant I could run the migration repeatedly until I got it right. I did this on my own PC, an IBM PS/2 Model 50Z. 

## Coding

It didn't take long to figure out the various `.SELECT` `.UPDATE` (or whatever the syntax was) commands to reliably run the migration. 

My 1.0 MVP would just sit there until the database was migrated. I only had a subset of the data though, and didn't know what speed the computer they had was, so I had no idea how long it would run for. Something had to be done!

## Finesse

I spent hours writing a user interface for the migration tool, way more hours than the core code to convert phone numbers. I added calculations to determine the number of records in the database, the start time of the migration, and how far through the database we had progressed. 

From that I could build something to show the user how far we'd got and an estimated completion time. Here's a rough mockup of what that might have looked like:

```text
         ┌─────────────────────────────────────────────────────────────────────────┐
         │                                                                         │
         │                Hotel database PhONEday number migration                 │
         │                                                                         │
         │                                                                         │
         │      ┌─────────────────────────────────────────────────────────┐        │
         │      │▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│        │
         │      └─────────────────────────────────────────────────────────┘        │
         │     0%                                                         100%     │
         │                    2500 of 12300 records processed                      │
         │                                                                         │
         │                                                                         │
         │                             Start: 10:15:00                             │
         │                               Now: 11:10:00                             │
         │                  Estimated finish: 14:23:21                             │
         │                                                                         │
         └─────────────────────────────────────────────────────────────────────────┘
```

Something like that, anyway. It constantly updated the time and records processed. 

Now, the 'user' in this case was me. I didn't trust anyone else to run this code properly, especially not directly on their production database!

__Note: I say "production" as if there was any other database. There was not.__

I put a smart(ish) suit on, and travelled to London with my colleague to do the migration myself. Every so often, a member of staff (or my colleague) would look over my shoulder and see what the ETA was. As I recall, they were all very impressed with the system, and the timing was pretty accurate. It finished when it said it would. 

Overall I think I spent no more than thirty minutes on the actual migration code. However long I spent on this Codepage 437 style user interface, was hours. I have a real soft spot for the old DOS style user interfaces. So it was the most fun part of the whole thing though!

That, and going to a swanky hotel in London.

I think this probably explains why I'm really enjoying the current design 🌟aesthetic🌟 we're using at [Axiom](https://axiom.co/). By the way, we're [hiring](https://axiom.co/company#careers) - check out the [open positions](https://axiom.co/company#jobs). 

## Not dead yet

Finally, a fun fact for you. dBase still exists as [dBASE CLASSIC™](https://dbaseclassic.com/). Yours for the low, low price of [$99](https://store.dbase.com/ProductDetails.asp?ProductCode=DBCLASSIC&CartID=1)!

[![dBASE CLASSIC](/blog/images/2023-09-09/dbase_classic_screen.png)](/blog/images/2023-09-09/dbase_classic_screen.png)

Yes, they should probably have open-sourced it, about twenty years ago.

