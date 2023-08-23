+++
date = "2023-08-23T19:00:00-00:00"
title = "Only good vibes"
slug = "2023/08/only-good-vibes"
author = "Alan Pope"
tags = ['linux', 'podcast', 'linux-matters']
+++

Just a few thoughts about the origin of [Linux Matters](https://linuxmatters.sh) podcast.

[![Linux Matters](/blog/images/2023-08-23/linuxmatters-banner-3000x750.webp)](https://linuxmatters.sh)

## Prior art

Over the thirteen years of the [Ubuntu Podcast](https://ubuntupodcast.org/) the presenter lineup, format, duration and frequency changed here and there. In the early days, we would record a segment, have a cup of tea, and then record another one. It was a long and laborious process that took up most of a Sunday afternoon. After a little while we tweaked things and settled into our stride. Once we did, it helped us focus, and get episodes prepared and recorded with less stress. 

For various personal reasons, we stopped doing the show back in September 2021, and it was great to have a break from podcasting. 

## Scratching an itch

In January 2023, I got the podcasting itch again. As I no longer work at Canonical, but am still quite a Linux "enthusiast", and they all say "Talk about what you know", I wanted to do a Linux-y show.

Here's the brain dump I sent to friends to sound them out on the subject.

***'Podcast Idea. "Positively Linux". Only good news stories, and discussion topics. Goal is to "talk up" desktop and backend Linux usage. Success stories, no bitching and moaning, only good vibes. A bit like Ubuntu Podcast tried to be mostly, without the snark. I think a lot of people are kinda sick of the snark, negativity and moaning. Negative things (like some company getting hacked) can be spun as positive as you talk about the alternatives. Usual 30 mins max duration, similar format to Ubuntu Podcast did on the A episode - a few news items, and then a discussion or conversation about something that's happened this week/month. What do you think?'***

I got some interesting feedback, mostly around the fact that a "good news only" show won't work. It'll be boring and anodyne. Who wants to listen to people talk up everything? The viewership of news, current affairs and "true crime" shows suggests that maybe the answer is "nobody". 

After more thought, discussion and a delicious Mexican meal, Martin, Mark and Myself decided to go for it, but with some tweaks. 

## format c: /p

We agreed not to do any kind of topical news, and each presenter would come up with one topic to discuss each episode. 

That meant preparation time was cut dramatically. No need to go and read a bunch of news sites, dig into conversations on social media or install random software to research. Everyone brings one topic, and it's on each of us to research exactly one thing that we each choose, before recording.  

On the previous show, we'd have a document for each episode of show notes, which would be quite detailed. Sometimes there'd be a mad panic as one of us went through adding detail, while others were busy feeding their family or working. By carving things up so rigidly - "one topic per person, you're responsible for your own bit" - that all mostly went away. 

We also wanted to be able to talk about things that don't work, and shouldn't feel compelled to talk positively about everything. But we all were sure that there was no need for snark about current events. There's enough of that about.

## Naming things is hard

The name "Positively Linux" didn't work. 

I asked ChatGPT 3.5 to come up with a bunch of potential podcast names, as is the modern way of being creative. 

Here's the prompt I used and the first episodes it came up with.

> You are an expert at coming up with product names. The best product names are memorable, easy to say aloud, and can easily be registered as a good web domain. A group of three middle-aged men are planning to make a podcast. All of the men work in the technology industry. One is a programmer, another is a developer advocate, and the other a manager. The audio podcast will be recorded every two weeks and last for 40 minutes per episode. The content will be family-friendly, conversational, about topics and discoveries which directly or indirectly relate to Linux-based operating systems. The podcasters need a name for their show. The name should be unique among podcasts, and they would like "Linux" to be in the name, but no specific Linux distributions in the name. Come up with 10 names for the podcast which fulfill these requirements.

Here's the response:

> 1. Linux Lounge
> 2. The Linux Connection
> 3. Linux Unplugged
> 4. The Linux Insider
> 5. Linux Conversations
> 6. The Linux Loop
> 7. The Linux Liftoff
> 8. The Linux Scoop
> 9. Linux Currents
> 10. Linux Roundtable


Well, this is awkward. I had to point out a couple of those already exist.

> Linux Unplugged and The Linux Scoop are already shows. Please come up with the list again, with those options removed and some more options.

Here's the new list:

> Sure, here's a revised list of 10 names for the podcast:

> 1. Linux Central
> 2. Linux Matters
> 3. The Linux Huddle
> 4. Linux Talk Time
> 5. The Linux Nexus
> 6. Linux Innovations
> 7. Linux Discourse
> 8. The Linux Circuit
> 9. Linux Progressions
> 10. Linux Buzz

One jumped off the screen - [Linux Matters](https://linuxmatters.sh), which we all liked, and decided to use. I like the dual meaning of it. "Linux matters to people" and "Matters pertaining to Linux", I think it works. 

## Launch

In April we launched [Linux Matters Episode 1](https://linuxmatters.sh/1) where we discussed Mastodon, Linux Laptops and the Steam Deck. All very Linuxy, all pretty positive, and very easy for each of us to prep and talk about. 

In the previous show, we would each record our audio, send it off to Joe for ✨production✨ and he'd send back a flac. We had some scripts to convert, upload and publish everything in WordPress, YouTube and the social posts. It was all very **manual**.

One thing Martin was very keen on streamlining during early discussions was this publishing pipeline. We still send our audio over to Joe, for ✨production✨, but he immediately uploads it to a CDN - something he's familiar with from the rest of the [Late Night Linux](https://latenightlinux.com/) family.

The [Linux Matters website](https://linuxmatters.sh) is a static site built with [Hugo](https://gohugo.io/). Our episode show notes live in a private git repo as markdown, which we then use to build each public show post.

Some automated machinery in the ☁️cloud☁️ builds the site from that repo and publishes directly at the pre-determined release time. Most of the time that works pretty seamlessly. Sometimes it needs a poke, like when we got to episode ten (two digits) which broke something. 

Overall the production process has been super smooth for us and has led to less stress and site maintenance. Which is good for everyone concerned. 

___Once Martin put all the up-front work in, of course___

## Banked content

It's been four months since then, and we've recorded eleven episodes, published ten, and have plans for plenty more. 

There are a lot of Linux podcasts out there, all with slightly different formats. Some do news, others have guests or interviews. We have none of that, and I love it. We don't have to book guests, teach them good microphone technique, how to record and how to join our call. We all (kinda) know that and can join a call at 8pm on a Tuesday and start recording almost immediately (modulo turning off fans and having a sip of tea).

Our episodes aren't generally time-sensitive as we don't cover current events. As such we can record episodes a month in advance. This is quite liberating for us, as it means we can work around each other's availability without needing to call in guest presenters to fill in. 

Another thing I like about this format is everyone gets a chance to speak. I've never been a fan of podcasts where the presenters all talk over each other in a 'zoo' style. I'm also not a fan of shows where one or two dominant voices drown out the other presenters. I like everyone to get their opportunity to speak.

In our show, we each get a decent slot in the show. Sometimes one of us has an in-depth topic, whereas another week they may only have a short slot. It all works out in the end, I think.

The format isn't set in stone though. In [episode 9](https://linuxmatters.sh/9/) for example, we had one large topic - "backups" - but we each had a chunk of time to talk about our part. 

In the future we may make some other changes, but for now, we quite like this way of recording and publishing a show. It works for us. 
