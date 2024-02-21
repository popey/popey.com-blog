+++
date = "2024-02-21T13:00:00+01:00"
title = "Exodus Bitcoin Wallet: Follow up"
slug = "2024/02/exodus-bitcoin-wallet-follow-up"
author = "Alan Pope"
tags = ['ubuntu', 'snapcraft', 'crypto', 'scam', 'bitcoin', 'wallet', 'exodus']
+++

Yesterday I [blogged](/blog/2024/02/exodus-bitcoin-wallet-490k-swindle/) about a series of Bitcoin scam apps published in the Canonical Snap store. 

Two things!

Firstly, I have [edited](https://github.com/popey/popey.com-blog/pull/48) [yesterday's blog](/blog/2024/02/exodus-bitcoin-wallet-490k-swindle/) to remove reference to [exchangerate-api](https://www.exchangerate-api.com). I had a few comments about this, and it would have been better not to mention them. They seem like fine upstanding people doing good work, and aren't involved in all this horribleness. Sincere apologies for mentioning them.

Second, one of the key messages I pushed yesterday was that the dodgy applications were still installed on client machines, even after the store pages had been quarantined.

One of my recommended actions for Canonical was that they should push out a 'clean' snap under the same name, to replace those dodgy snaps. Well...

![Good news everyone!](/blog/images/2024-02-21/good-news-everyone.gif)

Canonical heard the call, and have started pushing out empty snaps in place of the dodgy ones. Note the arbitrary high version number of "9.9.9". *I personally would have preferred "6.6.6" but we can't have everything* ;).

[![Exodus repaired in the Snap store](/blog/images/2024-02-21/exodus-fixed_50.png)](/blog/images/2024-02-21/exodus-fixed_100.png)

Anyone who has one of the dodgy ones should get an "over the air" update soon enough, to replace it with an empty package.

By empty, I do mean, empty. The latest revision is tiny compared to the ones packing malware.

```bash
alan@vm:~/temp$ ls -lh exodus_*.snap
-rw-rw-r-- 1 alan alan 26M Feb 21 12:31 exodus_1_amd64.snap
-rw-rw-r-- 1 alan alan 26M Feb 21 12:31 exodus_2_amd64.snap
-rw-rw-r-- 1 alan alan 12M Feb 21 12:31 exodus_3_amd64.snap
-rw-rw-r-- 1 alan alan 26M Feb 21 12:31 exodus_4_amd64.snap
-rw-rw-r-- 1 alan alan 16K Feb 21 12:32 exodus_5_amd64.snap
```

Let's unpack it and have a look:

```bash
alan@vm:~/temp$ unsquashfs exodus_5_amd64.snap 
Parallel unsquashfs: Using 8 processors
1 inodes (1 blocks) to write

[===================================================================|] 2/2 100%

created 1 file
created 3 directories
created 0 symlinks
created 0 devices
created 0 fifos
created 0 sockets
created 0 hardlinks
```

![Nothing to see here!](/blog/images/2024-02-21/nothing-to-see-here.gif)

```bash
alan@vm:~/temp$ tree squashfs-root/
squashfs-root/
└── meta
    ├── gui
    └── snap.yaml

3 directories, 1 file
```

Clean as a whistle!

```yaml
alan@vm:~/temp$ cat squashfs-root/meta/snap.yaml 
name: exodus
version: 9.9.9
summary: Empty snap
description: |
  This is my-snap's description. You have a paragraph or two to tell the
  most important story about your snap. Keep it under 100 words though,
  we live in tweetspace and your description wants to look good in the snap
  store.
architectures:
- amd64
base: core22
confinement: strict
grade: stable
environment:
  LD_LIBRARY_PATH: ${SNAP_LIBRARY_PATH}${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}
  PATH: $SNAP/usr/sbin:$SNAP/usr/bin:$SNAP/sbin:$SNAP/bin:$PATH
```

It's almost as small as my [null snap](https://snapcraft.io/null) I previously [blogged about](/blog/2021/01/null/).

Nice work Canonical!

Now, about those other [suggestions](/blog/2024/02/exodus-bitcoin-wallet-490k-swindle/)... :D