+++
date = "2024-08-07T10:00:00+01:00"
title = "Text Editors with decent Grammar Tools"
slug = "2024/08/text-editors-with-grammar-tools"
author = "Alan Pope"
tags = ['newsletter-meta', 'text-editors', 'open-source']
+++

This is another blog post lifted wholesale out of my weekly [newsletter](https://newsletter.popey.com/). I do this when I get a bit verbose to keep the newsletter brief. The newsletter is becoming a blog incubator, which I'm okay with.

## A reminder about that newsletter

The newsletter is emailed every Friday - [subscribe here](https://newsletter.popey.com/subscription/form), and is [archived](https://newsletter.popey.com/archive) and available via [RSS](https://newsletter.popey.com/archive.xml) a few days later. 

I talked a bit about the process of setting up the newsletter on [episode 34](https://linuxmatters.sh/34/) of [Linux Matters Podcast](https://linuxmatters.sh/). Have a listen if you're interested.

[![Linux Matters 34](/blog/images/2024-02-20/linuxmatters-banner-3000x750_30.png)](https://linuxmatters.sh/34/)

*Patreon [supporters](https://linuxmatters.sh/support) of [Linux Matters](https://linuxmatters.sh/) can get the show a day or so early and without adverts.* 🙏

## Multiple kind offers

Good news, everyone! I now have a crack team of fine volunteers who proofread the text that lands in your inbox/browser cache/RSS reader. Crucially, they're doing that review before I send the mail, not after, as was previously the case. Thank you for volunteering, mystery proofreaders.

## popey dreamland

Until now, my newsletter "workflow" (such as it was) involved hoping that I'd get it done and dusted by Friday morning. Then, ideally, it would spend some time "in review", followed by saving to disk. But if necessary, it would be ready to be opened in an emergency text editor at a moment's notice before emails were automatically sent by lunchtime. 

I *clearly* don't know *me* very well. 

## popey reality

What actually happened is that I would continue editing right up until the moment I sent it out, then bash through the various "post-processing" steps and schedule the emails for "5 minutes from now." Boom! Done.

This often resulted in typos or other blemishes in my less-than-lovingly crafted emails to fabulous people. A few friends would ping me with corrections. But once the emails are sent, reaching out and fixing those silly mistakes is problematic.

Someone should investigate over-the-air updates to your email. Although zero-day patches and DLC for your inbox sound horrendous. Forget that.

In theory, I could tweak the archived version, but that is not straightforward.

## Tool refresh?

*Aside: Yes, I know it's not the tools, but I should slow down, be more methodical and review every change to my document before publishing. I [agree](/blog/2024/04/today-is-my-birthday-i-got-adhd/). Now, let's move on.*

While preparing the newsletter, I would initially write in [Sublime Text](https://www.sublimetext.com/) (my desktop text editor of choice), with a [Grammarly](https://www.grammarly.com/referrals/redeem?key=pub119oyaqhvc82o)† (affiliate link) LSP extension, to catch my numerous blunders, and re-word my clumsy English.

Unfortunately, the Grammarly extension for Sublime [broke](https://github.com/znck/grammarly) a while ago, so I no longer have that available while I prepare the newsletter. 

I could use Google Docs, I suppose, where Grammarly still works, augmenting the built-in spell and grammar checker. But I really like typing directly as Markdown in a lightweight editor, not a big fat browser. So I guess I need to figure something else out to check my spelling and grammar prior to the awesome review team getting it to save at least some of my blushes.

I'm not looking for suggestions for a different text editor—or am I? Maybe I am. I *might* be. 

Sure, that'll fix it.

## ZX81 -> Spectrum -> CPC -> edlin -> Edit -> Notepad -> TextPad -> Sublime -> ?

I've used a variety of text editors over the years. Yes, the ZX81 and Sinclair Spectrum count as text editors. Yes, I am old.

I love Sublime's minimalism, speed, and flexibility. I use it for all my daily work notes, personal scribblings, blog posts, and (shock) even authoring (some) code. 

I also value Sublime's data-recovery features. If the editor is "accidentally" terminated or a power-loss event occurs, Sublime reliably recovers its state, retaining whatever you were previously editing.

I regularly use Windows, Linux, and macOS on any given day across multiple computers. So, a cross-platform editor is also essential for me, but only on the laptop/desktop, as I never edit on mobile‡ devices. 

I typically just open a folder as a "workspace" in a window or an additional tab in one window. I frequently open many folders, each full of files across multiple displays and machines.

All my notes are saved in folders that use [Syncthing](https://syncthing.net/) to keep in sync across machines. I leave all of those notes open for days, perhaps weeks, so having a robust sync tool combined with an editor that auto-reloads when files change is key.

Their notes are separately backed up, so cloud storage isn't essential for my use case. 

## Something else?

Whatever else I pick, it's really got to fit that model and requirements, or it'll be quite a stretch for me to change. One option I considered and test-drove is [NotepadNext](https://github.com/dail8859/NotepadNext). It's an open-source re-implementation of Notepad++, written in C++ and Qt. 

A while back, I packaged up and published it as a [snap](https://snapcraft.io/notepadnext), to make it easy to install and update. It fits many of the above requirements already, with the bonus of being open-source, but sadly, there is no Grammarly support there either.

I'd prefer no :::: W I D E - L O A D :::: electron monsters. Also, not Notion or Obsidian, as I've already tried them, and I'm not a fan. In addition, no, not Vim or Emacs.

Bonus points if you have a suggestion where one of the selling points *isn't* "AI"§.

Perhaps isn't a great plain text editor that fulfills all my requirements. I'm open to hearing suggestions from readers of this [blog](https://popey.com/) or the [newsletter](https://newsletter.popey.com/). My contact details are here [somewhere](https://popey.me/).

----

† - Please direct missives about how terrible Grammarly is to `/dev/null`. Thanks. Further, suggestions that I shouldn't rely on Grammarly or other tools and should just "Git Gud" (as the youths say) may be inserted into the A1481 on the floor.

‡ - I know a laptop is technically a "mobile" device.

§ - Yes, I know that "Not wanting AI" and "Wanting a tool like Grammarly" are possibly conflicting requirements.

◇ - For *this* blog post I copy and pasted the entire markdown source into a Google doc, used all the spelling and grammar tools, then pasted it back into Sublime, pushed to git, and I'm done. Maybe that's all I need to do? Keep my favourite editor, and do all the grammar in one chunk at the end in a tab of a browser I already had open anyway. Beat that!