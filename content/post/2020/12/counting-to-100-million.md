+++
date = "2020-12-20T12:00:00-00:00"
title = "Counting to 100 Million"
slug = "2020/12/counting-to-100-million"
author = "Alan Pope"
tags = ['hardware', 'perl', 'linux']
+++

*This article previously appeared on [listed.to](https://listed.to/@popey/17544/counting-to-100-million). I've moved it here to consolidate my blogging*

About 10-15 years ago, back in the heady days of [Hampshire Linux User Group](http://www.hants.lug.org.uk/), we had a [Wiki](http://www.hants.lug.org.uk/wiki). It ran a heavily patched version of [UseModWiki](http://www.usemod.com/cgi-bin/wiki.pl) that we'd modified to add anti-spam and anti-abuse protection. We'd affectionately called it "[AbuseMod](http://www.hants.lug.org.uk/wiki/AbuseMod)". It's still kinda there, but I don't think the content is ever [touched](http://www.hants.lug.org.uk/wiki/RecentChanges).
We used it to co-ordinate meetings, take notes, and some other fun sillyness. One such fun was [Hugo's Random Benchmark](http://www.hants.lug.org.uk/wiki/HugoRandomBenchmark) (Note: Not a benchmark). It was a single line we'd each run on our computers to see whose was fastest (Note: Again, not a good benchmark). It did this by counting to 100 Million in Perl. It's a super simple single-line shell script which just times how long the computer takes for perl to go from 1 to 1e8 (100 million).

Here's the "script":

`time perl -e 'for($i=0;$i<1e8;$i++) { }'`

Here's the resulting output, as produced on a typical Linux system:
```
real 0m2.868s
user 0m2.828s
sys 0m0.016s
```
Again, not a benchmark. It's a single threaded count, so typically won't get any faster if you had a dual core, or many core system. But back in those days, a lot of the systems only had one anyway, so the point is moot. It also doesn't "measure" any other part of the system. It's fun though.

Over time we'd add our own systems to the table on the [page](http://www.hants.lug.org.uk/wiki/HugoRandomBenchmark). Some (such as myself) would strive to run the "benchmark" on ever faster systems. Others aimed for the bottom of the table, and some went for esoteric or imaginary systems.

With each newer system that was measured, the amount of time shrank a tiny bit. Getting from double-digit times to single-digit was a milestone. Further reducing the total number of seconds by a little with each update. 

The page hasn't really been updated for over 10 years now. It was fun at the time, but many of those people have moved on from the LUG, and the site isn't super accessible to edit anymore. It's a little sad, but I do sometimes still go back and grab the script and run it on modern systems, just to see if it's got any quicker.

The output above came from an Intel i7-6820HK running Ubuntu 20.04 under WSL in Windows 10. I don't think back then I'd have envisaged running the benchmark on a system like this. 

I do wonder what the fastest time we can get out of the not-a-benchmark in 2020 might be? Can you get it under a second?

