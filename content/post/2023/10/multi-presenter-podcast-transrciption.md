+++
date = "2023-10-02T14:00:00+01:00"
title = "Multi-presenter podcast transcription"
slug = "2023/10/multi-presenter-podcast-transrciption"
author = "Alan Pope"
tags = ['linux', 'ubuntu', 'podcast', 'transcription', 'accessibility', 'ai']
+++

For the last six months, I've been a presenter on [Linux Matters](https://linuxmatters.sh/). Prior to that, I spent thirteen years presenting the now-defunct [Ubuntu Podcast](https://ubuntupodcast.org). Both shows have/had multiple presenters, 

We record every other week, and send our individual audio files to [Joe](https://joeress.com/). He does all the magic post-recording production including editing, audio processing and mastering. That file is then uploaded and eventually makes its way into the [Patreon](https://www.patreon.com/LateNightLinux) "all episodes" ad-free feed, then to our feed a day or so later.

Over the years on both shows, we have wanted to have a robust way to create text transcriptions of what we say. We've never found a great solution for this, until now, perhaps. 

With 🌟AI🌟.

## Why

There's four main reasons for transcribing the podcast episodes into text form. 


### Accessibility

People with limited or no hearing are unable to consume our shows. If they are available in plain text form, then our content is available to more people. 

All the presenters are from England, so speak in British English. Some people for whom English isn't their first language may have difficulty understanding some words, phrases or colloquialisms.


### Readability

Some people just prefer to read text rather than listen to audio. We have had this feedback from members of our [Telegram](https://linuxmatters.sh/telegram) and [Discord](https://discord.com/invite/wgQsshhrWW) chat groups.


### Searchability

We also get requests from listeners to produce copious show notes or repeat in detail some of the products or services we may mention in passing on the show.

It would be significantly easier for everyone if there were text versions of our show, so people could easily search for answers to these questions.

Indeed, it would be useful for us also, to go back and reference something we said in a previous episode without having to re-listen to it again.


### SEO (maybe)

It's arguably useful to have a corpus of text on pages of our website, which contain keywords that people may search for. But this isn't the highest of the priorities on the list. It's more of a "nice to have" if it does happen.

## Manual transcription

Manual transcription of podcast episodes is a thing. Many years ago we tried doing this with episodes of the Ubuntu Podcast. There is software available that can play the audio and provides an editor in which a transcriber can type out what they hear.

This process is slow, tedious and error-prone. We gave up on it pretty quickly.

## Automate it

Every so often we will revisit the topic of transcription, and see if there are automated tools out there to solve the problem. We've looked at a bunch of them over the years. The ones we have looked at haven't been suitable for a few reasons

### Challenges

#### Accuracy

Some of the tools we've looked at just aren't accurate enough. Especially when we talk about technical subjects with brand names, command line tools to mention and other 'unusual' vocabulary. 

#### Live transcription

There are a few tools that can 'listen in' while you're recording the podcast (or having a meeting) and create the transcription on the fly. This doesn't work for us.

We record an episode as a bunch of separate audio files, which we send to Joe for processing. We don't want to transcribe the pre-processed audio at recording time. Because that's not the audio users will hear. It makes no sense to transcribe audio which doesn't match the published show.

It also means the transcription will need editing just like the audio does, to remove 'umms' and other vocal artifacts. We also often restart sentences when we flub them. We may also say the odd naughty word. We're a family-friendly show, and don't want that in our feed, or on the site.

We could edit the transcription down to match the edited audio, but that's even more work.

[![Ain't nobody got time for that](/blog/images/2023-10-02/aint-nobody-got-time-for-that-kimberly-wilkins.gif)](/blog/images/2023-10-02/aint-nobody-got-time-for-that-kimberly-wilkins.gif)

#### Discerning multiple voices

There are an awful lot of 'plain voice to text' systems that can take a single recorded voice and create a text file from it. Most will put timestamps in the metadata, and some modern tools have incredibly accurate vocabularies. 

Our shows have multiple voices. In the days of Ubuntu Podcast, we had guest presenters, call-ins, interviews and sometimes audio inserts. None of the tools we had looked at were able to cope with this. They almost all required us to do a significant amount of post-processing to get the names right.

## Enter 🌟AI🌟

The topic came up again in our backroom [secret squirrel](https://en.wikipedia.org/wiki/Secret_Squirrel) podcast chat room yesterday. I figured I'd ask [ask the audience](https://millionaire.fandom.com/wiki/Ask_the_Audience) over on [Mastodon](https://ubuntu.social/@popey), to see if someone else has ideas.

{{< rawhtml >}}
<center><iframe src="https://ubuntu.social/@popey/111159495379945888/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe><script src="https://ubuntu.social/embed.js" async="async"></script></center>
{{</ rawhtml >}}

Rather quickly I got [two](https://social.vivaldi.net/@heronheart/111162641874358355) [endorsements](https://mastodon.social/@benev/111164903348284707) for [Otter.ai](https://otter.ai/), which I'd not heard of before. So today I took a look. 

As [@heronheart](https://social.vivaldi.net/@heronheart/111162641874358355) pointed out, it's not obvious from the [Otter.ai](https://otter.ai/) website that it can do what we're after. 

The Otter.ai marketing is mostly towards businesses requiring transcriptions of meetings held on platforms like Zoom and Google Meet, which isn't what I'm after.

[![Otter.ai](/blog/images/2023-10-02/otterai.png)]((/blog/images/2023-10-02/otterai.png))

However, once you sign up, and get past the whole introduction wizard - which incidentally doesn't behave well if you choose "Other" at this stage..

[![Oops](/blog/images/2023-10-02/oops.png)]((/blog/images/2023-10-02/oops.png))

... you find an "Import" button.

[![Import](/blog/images/2023-10-02/import.png)]((/blog/images/2023-10-02/import.png))

So I grabbed the [most recent episode](https://linuxmatters.sh/12) and uploaded it.

[![Linux Matters Episode 12](/blog/images/2023-10-02/lmp12.png)]((/blog/images/2023-10-02/lmp12.png))

Within a few minutes, it presented a transcription of our show. It didn't know the names of each presenter, but it did delineate one person from another. Telling Otter which presenter said which part was stupidly simple. Just click the unknown presenter, type their name - **once** - and do the same for the others. 

[![Presenter](/blog/images/2023-10-02/presenters.png)]((/blog/images/2023-10-02/presenters.png))

Once you've done that once, it 'recognises' each presenter through the entire episode. In addition, Otter creates a 'tag cloud' of keywords used in the episode. For episode 12 it came up with this lot, automatically, which is pretty neat. 

```text
moodle, work, running, containers, deck, steam, linux, retro, bit, people, php, 
vps, box, vle, forked, contribution, find, test, project, virtual machines
```

Otter also came up with a summary of the show, with timestamps. This could be useful for people who do actually want to listen, but want to jump to a particular segment. It's not perfect, but it's a great start!

[![Summary](/blog/images/2023-10-02/summary.png)]((/blog/images/2023-10-02/summary.png))


Finally, and perhaps the best part, all the content is easily exportable. The transcription is available in plain text format, as is the summary. Here's a short snippet from episode 12.

```text
Mark Johnson  5:14  
is what I would do. But it depends on why you don't like it.

Martin Wimpress  5:18  
And other container runtimes are available. Yeah.

Mark Johnson  5:21  
Is it that you don't like containers? Or is it specifically something 
about Docker that you don't like doing stuff with it, and you'd be happy 
building a container in a similar way. But running on something else?

Alan Pope  5:32  
I don't know is that the mental model of Docker? Docker is a bit weird 
for me, because it's kind of inside a thing that's a bit like a VM. But 
it's not a full VM. And I've had problems with it in the past where I 
couldn't, I couldn't quite grok. What was inside and what was outside?

Mark Johnson  5:49  
Yeah, I certainly had that problem at first. Yes. Right.
```

I then uploaded two more episodes and processed them. 

[![Two more episodes](/blog/images/2023-10-02/twomoreepisodes.png)]((/blog/images/2023-10-02/twomoreepisodes.png))

Otter 'knows' our voices now, so it made a good attempt at figuring out who was speaking and when. It had a few problems with technical jargon, character names and products. But it did an excellent first pass at transcription.

## Conclusion

Overall I'm very impressed at what we've got so far. Having the entire show as a single text file, hosted on our own website is very compelling. We could potentially add these to a public git repo, so if people do spot errors, they can easily be corrected. A typo here and there is much easier to motivate people to correct than "please transcribe this entire episode".

The elephant in the room though, is payment. The free plan allowed me to upload three files. I hit that limit already. The [paid options](https://otter.ai/pricing) allow for many more uploads, multiple team members (so it's not all on one person to do this), an expanded vocabulary, and other features we're less likely to use. 

After playing with [Otter.ai](https://otter.ai/) I'd love to get all the episodes transcribed, and published on the site, but I need to talk that over with Mark, Martin and Joe to see if there's anything I've missed.