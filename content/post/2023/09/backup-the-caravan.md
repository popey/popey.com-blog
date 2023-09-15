+++
date = "2023-09-15T09:00:00+01:00"
title = "Backup the caravan"
slug = "2023/09/backup-the-caravan"
author = "Alan Pope"
tags = ['tfts']
+++

Second in my series of [Tales From Tech Support](blog/tags/tfts/). Some stories from the past featuring broken computers and even more broken tech support operatives - mostly me.

In the early 1990s I worked as a Technician at a local college. I would set-up and tear down experiments for students. I'd also have to look for 'booby-traps' they'd set for us. But that's another story.

I would sometimes get called upon to perform technical support for external organisations. I was young, full of hope, and had a sunny disposition. So I was always happy to help. This is one of those occasions.

## Office space

I was told the local "Caravan Club" had a serious and urgent problem which needed prompt attention. I arrived on site with my interlocutor to uncover the source of the problem.

We entered a small shared office on the ground floor of a two-story 1970s red-brick building in the town centre. A few desks faced various walls, each with a worker at a nearby typewriter. There was only one computer in the office. The PC had its own dedicated desk behind a blue half-height partition in the corner. 

I was ushered over to the PC where the office manager explained the calamity.

___"The database is gone!"___

Every detail about the Caravan Club membership was catalogued on the computer at this desk. This was the most important computer in the world for the organisation. The three people in the office needed urgent access to the missing database, so this was a problem.

## External actor

An external contractor developed the software using dBase III. They had recently provided an update to the database on a floppy disk, which had been applied. After which, everything had gone a little awry.

I asked them to show me the issue. 

When the PC booted, a menu gave access to the application and some other utilities. When they chose to start the application a `Database not found` style error appeared, and we were dropped to the `C:\>` prompt. 

__"Can you fix it?"__

We shall see.

## Investigations

I had never seen this bespoke application before, so I needed to have a good rummage around on the disk to see what made it tick. 

It was essentially just a dBase III database, with some pretty (to me) forms, reports and additional management screens. 

There was indeed a file missing, one of the core database files. It wasn't a complex application, but it was now a database, without the data.

## Confidence

Next to the PC was a tape deck. A vertical side-loading one, that takes chunky tapes with a solid metal base, and transparent, thick, plastic tape cover. 

Hopefully, I inquired, __"I note you have a tape drive, do you do backups?"__.

The office manager beamed, __"Oh yes!"__ and produced a cardboard box with two-weeks worth of tapes, each individually labeled with the days of the week.

"This is gonna be easy", young and impetuous me thought to myself.

Narrator: It was not.

## Restore

Some more investigation revealed the backup software they'd used, and how they drove it. The DOS main menu had a simple option for backing up everything. 

I found and launched the backup software, inserted a tape, and figured out how to initiate a restore. 

The tape span up, an LED illuminated, and after a few minutes of whirring, the computer displayed:

`"Restore complete: 0 file(s) restored."`

Weird. Okay, "I'm not very familiar with this software" I thought to myself, and tried some other options.

`"Restore complete: 0 file(s) restored."`

I tried explicitly specifying the full path to the missing file.

`"Restore complete: 0 file(s) restored."`

Wildcards!?

`"Restore complete: 0 file(s) restored."`

Hm. Maybe this tape is bad. I went through every tape but couldn't find the missing database file. 

Now I changed tack, and tried restoring the entire tape to an empty temporary directory. 

`"Restore complete: 1 file(s) restored."`

Success?

I looked in the temporary folder. It was a log file of the backup. I tentatively opened the file.

`"Backup complete: 0 file(s) backed up."`

Uh-oh.

## Further inquiry

I turned to the office manager, who was sat nearby.

> Me: Uhm

> Manager: Yes!? All done?

> Me: Not quite. Mind if I ask you some questions?

> Manager: Sure.

> Me: How often do you backup?

At this point she beamed a big smile again and proudly answered __"Oh, every day!"__.

> Me: How long does it take

> Manager: Oh, not long, really quick actually.

> Me: When do you do the backup?

> Manager: At the end of the day, every day.

Now, remember this is the early 1990's. MSDOS, mechanical tapes, slow interfaces, slow tapes. This backup will not be fast, by any stretch. I continue my inquiry.

> Me: Oh, so you kick off the backup and go home, leaving it running?

> Manager: No! We start the backup, then put our coats on, and we're ready to leave when it finishes

Uhoh.

> Me: That's, really fast.

> Manager: Yeah, the IT guys from the office upstairs were surprised last Friday. They came in to ask if we wanted to go to the pub. When we said we needed to do a backup they said they wouldn't wait. But when they saw it finished they told us it was really fast!

She was clearly pleased with the performance of the backup.

I had to imagine their IT friends upstairs probably had an inkling that the backup wasn't working. But they didn't want to get dragged into it on a Friday night before the pub!

## The reveal

I had to break the news to them that the tapes were all *completely* empty, bar the log file. The backup software had been configured incorrectly. It had only ever been backing up an empty directory the whole time, every day.

No wonder it was quick!

Thankfully, the most recent software update from the external contractor had backed up the database to the floppy disk as part of the update process. 

I managed to piece together the database from the files on floppy disk to a point where they were up and running again. I also fixed the backup software, so it wasn't backing up an empty folder anymore!

## Epilog

About a week later, we got a call from the Caravan Club. They were *not* happy. 

Apparently, it was all my fault that their backups were now taking __"ages and ages!"__

__"Yes. Because now, it's actually backing stuff up!"__

They then asked if I could "fix" it. 

*(sigh)*

Please check your backups regularly.
