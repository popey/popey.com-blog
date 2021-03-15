+++
date = "2021-03-15T11:00:00-00:00"
title = "Ubuntu Wiki Reboot"
slug = "2021/03/ubuntu-wiki-reboot"
author = "Alan Pope"
tags = ['software', 'ubuntu', 'wiki', 'moinmoin', 'mediawiki']
+++

It's time to replace the [Ubuntu Wiki](https://wiki.ubuntu.com/). In fact it was probably time to replace it a *few* years ago, but we are where we are.  It should be a reliable and useful resource for the Ubuntu community. It's failing at that. *We* have failed here.

Aside: There are actually *multiple* wikis in use in the Ubuntu project. The primary one is wiki.ubuntu.com, which has been in use since [forever](https://web.archive.org/web/20040923001032/http://wiki.ubuntu.com/) (in Ubuntu terms). It's the main topic of this post, but the others are certainly in need of some love too.

Most pages are meeting records, specifications, design & technical documents or team and personal pages. A lot of the pages are valuable to someone. I don't have access to data on how often pages are visited, but the [RecentChanges](https://wiki.ubuntu.com/RecentChanges) page shows how often they're edited. The wiki contains somewhere around eightysix thousand pages, and some of those get edited on most days. 

Over the years a few people (including myself) have looked at what it might take to update the wiki. However, time and motivation was lacking, so everything stayed the same. The Wiki is running [MoinMoin](http://moinmo.in/MoinMoinWiki) 1.9.8 (last I checked) with some tweaks.

## Problems

There's a bunch of problems, but I'll highlight just a few here.

### Performance

The wiki is tremendously slow. Logging in, editing pages, previewing, even viewing existing pages can be sluggish and thus frustrating. If a very simple edit, preview and commit takes many minutes (which it can), new contributors are not incentivised to continue or come back.

In the modern world, the GitHub generation is familiar with logging in, clicking an icon and starting to edit. The Ubuntu wiki performance is making that kind of workflow almost impossible.

## Cruft

The wiki contains a wealth of historical knowledge about the project. Much of it is no longer of interest to most people. Perhaps some of that could be removed. Who wants to stumble on a wireless debugging page from 2006 mentioning processes we don't even use anymore? Do we really need to keep every blueprint document for projects that never took off?

Cleaning up pages on the wiki is a painful process thanks to the performance problems.

### Spam

There's no effective anti-spam measures. As a result we've had people and bots create accounts and ruin pages, adding spammy links to dodgy sites. To mitigate this we added an ACL to only allow page edits from members of selected groups. 

Some developers, all Ubuntu Members and Canonical employees & a few other select groups are granted access. In addition an "Ubuntu Wiki Editors" group was added, which anyone not in the above groups must join in order to gain access.

This leads to the next problem.

### Access

A human review is required for anyone joining the Ubuntu Wiki Editors group on Launchpad, which is opaque, time consuming, and gatekeeping for genuine community members or new contributors who want to do 'drive by' edit. 

The time consuming part is for a someone to evaluate whether a new account is actually a human with good intent, a person with bad intentions or a bot. For a brand new account requesting access, it's somewhat hard to determine whether the person is a good or bad actor.

It's not even obvious *how* you get access to edit the wiki. It's almost like the instructions are on display in the bottom of a locked filing cabinet stuck in a disused lavatory with a sign on the door saying 'Beware of the Leopard'.

## Effect

The wiki doesn't behave like a *real* wiki, but more like a read-only website, which requires significant effort to update. It's not welcoming.

People stopped editing the wiki. It was too hard and too slow. Documentation became outdated. Meeting records stopped being kept. People stopped contributing. 

I'm not saying the problems with the wiki single handedly caused the downfall of civilisation, but I'm also not saying it *didn't* contribute to it! 

## Considerations

Some questions we should consider.

 * Should a new wiki be made? Or should we update the platform of the one we have? Throw hardware at it?
 * Should it be *scorched earth* "Start from scratch", or should it contain the exact same content on a new, better performing platform?
 * If content is kept, how much? Should only the *N* "most visited" and *M* "most edited" pages be retained?
 * Should the existing wiki be frozen in aspic, uneditable, with a brand new start made on a fresh wiki?

Given Canonical would likely end up hosting whatever comes next, they should be heavily involved in the process of selecting and provisioning the new system. This would need to be done alongside the other work the IS team already do, and would clearly be prioritised accordingly.

## My thoughts

We need to do *something* about this. Inaction is hurting us.

The current Wiki uses Ubuntu SSO for authentication, and whatever is used next, should ideally be capable of also using this. 

I'm in two minds on the best way forward here. 

Part of me thinks we should deploy a brand new, fresh instance of MediaWiki (for example) and freeze the existing wiki. New pages would be created on the new wiki. Perhaps an easy tool to migrate existing pages one-by-one could be made. This might however, lead to fragmentation, having some evergreen pages on the 'old' wiki leaving little motivation to re-create them on the new one. 

The other part of me thinks we should import everything from the old wiki to a new one, preserving structure, edit histories and attribution. All pages should redirect to their correct conterpart urls. After confirming everything moved, shut the old wiki down. Then, on a new, performant platform, users could be confident in removing pages which are no longer important, because the wiki would peform well enough to even be *able* to delete pages.

Then part of me thinks a hybrid approach is needed. Start a fresh new wiki, but only import pages of importance. How "importance" is measured is up for discussion, of course. But grabbing design documents, personal pages, team pages and actively edited and visited pages might be a good start. Perhaps a tarball of the old site could be made available, with personally identifying information removed, so anyone could cherry pick old pages and revive them.

Then there's the debate about what to replace MoinMoin with, or indeed whether to replace it at all. My gut feel is that the world standardized for better or worse on MediaWiki. It's familiar enough in multiple Linux distributions, and the odd other wiki out there (hello Wikipedia!) that people know the syntax, page layout and tools.

Then the defeatest in me says that maybe we should just eject the wiki into the sun and just use wiki pages in [discourse](https://discourse.ubuntu.com/) instead? I don't know.

But maybe there's something better, another option that I'm not aware of yet?

Whatever happens, this feels like quite the project. I'd love for us to bite the bullet and get this done though. The current wiki is frankly, embarrassing.