+++
date = "2024-08-30T13:00:00+01:00"
title = "Virtual Zane Lowe for Spotify"
slug = "2024/08/virtual-zane-lowe-for-spotify"
author = "Alan Pope"
tags = ['podcast', 'music', 'spotify', 'python', 'zane-lowe', 'NewMusicDaily']
+++

## tl;dr

I bodged together a Python script using [Spotipy](https://github.com/spotipy-dev/spotipy) (not a typo) to feed me [#NewMusicDaily](/blog/tags/newmusicdaily/) in a Spotify [playlist](https://open.spotify.com/playlist/5raANj8U2Lko959txpzzls?si=5dc326b784e64fa1). 

No AI/ML, all automated, "fresh" tunes every day. Tunes that I enjoy get preserved in a [Keepers](https://open.spotify.com/playlist/7a8MVSOopuC1JS3JrnEKMW?si=4645ed3452a54020) playlist; those I don't like to get relegated to the [Sleepers](https://open.spotify.com/playlist/2jLizvLBrWDCoApJeRxy1Q?si=9ca93c88ba074350) playlist. 

Any tracks older than eleven days are deleted from the [main playlist](https://open.spotify.com/playlist/5raANj8U2Lko959txpzzls?si=5dc326b784e64fa1), so I automatically get a constant flow of new stuff.

[![My personal Zane Lowe in a box](/blog/images/2024-08-30/spotify.png)](https://open.spotify.com/playlist/5raANj8U2Lko959txpzzls?si=5dc326b784e64fa1)

## Nutshell

1) The script automatically populates this [Virtual Zane Lowe](https://open.spotify.com/playlist/5raANj8U2Lko959txpzzls?si=5dc326b784e64fa1) playlist with semi-randomly selected songs that were released within the last week or so, no older (or newer).
2) I listen (exclusively?) to that list for a month, signaling songs I like by hitting a button on Spotify.
3) Every day, the script checks for 'expired' songs whose release date has passed by more than 11 days.
4) The script moves songs I don't like to the [Sleepers](https://open.spotify.com/playlist/2jLizvLBrWDCoApJeRxy1Q?si=9ca93c88ba074350) playlist for archival (and later analysis), and to stop me hearing them.
5) It moves songs I *do* like to the [Keepers](https://open.spotify.com/playlist/7a8MVSOopuC1JS3JrnEKMW?si=4645ed3452a54020) playlist, so I don't lose them (and later analysis).
6) Goto 1.

I can run the script at any time to "top up" the [playlist](https://open.spotify.com/playlist/5raANj8U2Lko959txpzzls?si=5dc326b784e64fa1) or just let it run regularly to drip-feed me new music, a few tracks at a time.

Clearly, once I have stashed some favourites away in the [Keepers](https://open.spotify.com/playlist/7a8MVSOopuC1JS3JrnEKMW?si=4645ed3452a54020) pile, I can further investigate those artists, listen to their other tracks, and potentially discover more new music.

Below I explain at some length how and why.

## NoCastAuGast

I spent an entire month without listening to a single podcast episode in August. I even unsubscribed from everything and deleted all the cached episodes. 

Aside: Fun fact: The Apple Podcasts app really doesn't like being empty and just keeps offering podcasts it knows I once listened to despite unsubscribing. Maybe I'll get back into listening to these shows again, but music is on my mind for now.

While this is far from a staggering feat of human endeavour in the face of adversity, it was a challenge for me, given that I listened to podcasts all the time. This has been detailed in various issues of my personal email [newsletter](https://newsletter.popey.com/), which goes out on Fridays and is [archived](https://newsletter.popey.com/archive) to read online or via [RSS](https://newsletter.popey.com/archive.xml). 

In August, instead, I re-listened to some audio books I previously enjoyed and re-listened to a lot of music already present on my existing Spotify playlists. This became a problem because I got bored with the playlists. Spotify has an *algorithm* that can feed me their idea of what I might want, but I decided to eschew their bot and make my own.

Note: *I pay for Spotify Premium, then leveraged their API and built my "application" against that platform. I appreciate some people have Strong Opinions™️ about Spotify. I have no plans to stop using Spotify anytime soon. Feel free to use whatever music service you prefer, or self-host your 64-bit, 192 kHz Hi-Res Audio from HDTracks through an Elipson P1 Pre-Amp & DAC and Cary Audio Valve MonoBlok Power Amp in your listening room. I don't care.*

I'll be here, listening on my Apple AirPods, or blowing the cones out of my car stereo. Anyway...

I spent the month listening to great (IMHO) music, predominantly released in the (distant) past on playlists I chronically mis-manage. On the other hand, my son is an expert playlist curator, a skill he didn't inherit from me. I suspect he "gets the aux" while driving with friends, partly due to his Spotify playlist mastery.

As I'm not a playlist charmer, I inevitably got bored of the same old music during August, so I decided it was time for a change. During the month of September, my goal is to listen to as much new (to me) music as I can and eschew the crusty playlists of 1990s Brit-pop and late-70s disco. 

*How* does one discover *new* music though? 

## Novel solutions

I wrote a Python script.

Hear me out. Back in the day, there was an excellent desktop music player for Linux called Banshee. One of the great features Banshee users loved was "Smart Playlists." This gave users a lot of control over how a playlist was generated. There was no AI, no cloud, just simple signals from the way you listen to music that could feed into the playlist. 

Watch a youthful Jorge Castro from 13 years ago do a quick [demo](https://www.youtube.com/watch?v=mEAYsxAyx9A).

[![Jorge Demonstrating the awesome power of Smart Playlists in Banshee (RIP in Peace)](/blog/images/2024-08-30/jorge.png)](https://www.youtube.com/watch?v=mEAYsxAyx9A)


Aside: *Banshee was great, as were many other Mono applications like Tomboy and F-Spot. It's a shame a bunch of blinkered, paranoid, noisy, and wrong Linux weirdos chased the developers away, effectively killing off those excellent applications. Good job, Linux community.*

Hey ho. Moving on. Where was I...

Spotify clearly has some built-in, cloud-based "smarts" to create playlists, recommendations, and queues of songs that its engineers and algorithm think I might like. There's a fly in the ointment, though, and her name is Alexa. 

## No, Alexa, NO!

We have a "Smart" speaker in the kitchen; the primary music consumers are not me. So "my" listening history is now somewhat tainted by all the Chase Atlantic & Central Cee my son listens to and Michael (fucking) Bublé, my wife, enjoys. She enjoys it so much that Bublé has featured on *my* end-of-year "Spotify Unwrapped" multiple times.

I'm sure he's a delightful chap, but his stuff differs from my taste.

I had some ideas to work around all this nonsense. My goals here are two-fold. 

1) I want to find and enjoy some new music in my life, untainted by other house members.
2) Feed the Spotify algorithm with new (to me) artists, genres and songs, so it can learn what else I may enjoy listening to. 

Obviously, I also need to do something to muzzle the Amazon glossy screen of shopping recommendations and stupid questions.

The bonus side-quest is learning a bit more Python, which I completed. I spent a few hours one evening on this project. It was a fun and educational bit of hacking during time I might otherwise use for podcast listening. The result is four hundred or so lines of Python, including comments. My code, like my blog, tends to be a little verbose because I'm not an expert Python developer. 

I'm pretty positive primarily professional programmers potentially produce petite Python.

Not me!

## Noodling

My script uses the Spotify API via [Spotipy](https://github.com/spotipy-dev/spotipy) to manage an initially empty, new, "dynamic" playlist. In a nutshell, here's what the python script does with the empty playlist over time:

* Use the Spotify [search API](https://developer.spotify.com/documentation/web-api/reference/search) to find tracks and albums released within the last eleven days to add to the playlist. I also imposed some simple criteria and filters.
  * Tracks must be accessible to me on a paid Spotify account in Great Britain.
  * The maximum number of tracks on the playlist is currenly ninety-four, so there's some variety, but not too much as to be unweildy. Enough for me to skip some tracks I don't like, but still have new things to listen to.
  * The maximum tracks per artist or album permitted on the playlist is three, again, for variety. Initially this was one, but I felt it's hard to fully judge the appeal of an artist or album based off one song (not you: Black Lace), but I don't want entire albums on the list. Three is a good middle-ground.
  * The maximum number of tracks to add per run is configurable and was initially set at twenty, but I'll likely reduce that and run the script more frequently for drip-fed freshness.
* If I use the "favourite" or "like" button on any track in the list before it gets reaped by the script after eleven days, the song gets added to a more permanent [keepers playlist](https://open.spotify.com/playlist/7a8MVSOopuC1JS3JrnEKMW?si=4645ed3452a54020). This is so I can quickly build a collection of newer (to me) songs discovered via my script and curated by me with a single button-press.
* Delete all tracks released more than eleven days ago if I haven't favourited them. I chose eleven days to keep it modern (in theory) and fresh (foreshadowing). Technically, the script does this step first to make room for additional new songs.

None of this is set in stone, but it is configurable with variables at the start of the script. I'll likely be fiddling with these through September until I get it "right," whatever that means for me. Here's a handy cut-out-and-keep block diagram in case that helps, but I suspect it won't.

```text
                    +-----------------------------+
                    |       Spotify (Cloud)       |
                    |   +---------------------+   |
                    |   |     Main Playlist   |   |
                    |   +---------------------+   |
                    |           |   |             |
                    |   Like    |   | Dislike     |
                    |           v   |             |
                    |   +---------------------+   |
                    |   |   Keeper Playlist   |   |
                    |   +---------------------+   |
                    |               |             |
                    |               v             |
                    |   +---------------------+   |
                    |   |   Sleeper Playlist  |   |
                    |   +---------------------+   |
                    +-------------+---------------+
                                  ^
                                  |
                                  v
                      +---------------------------+
                      |      Python Script        |
                      |  +---------------------+  |
                      |  |  Calls Spotify API  |  |
                      |  |  and Manages Songs  |  |
                      |  +---------------------+  |
                      +---------------------------+
```

## Next track

The expectation is to run this script automatically every day, multiple times a day, or as often as I like, and end up with a frequently changing list of songs to listen to in one handy playlist. If I don't like a song, I'll skip it, and when I *do* like a song, I'll likely play it more than once. and maybe click the "Like" icon. 

My theory is that the list becomes a mix between thirty and ninety artists who have released albums over the previous rolling week. After the first test search on Tuesday, the playlist contained 22 tracks, which isn't enough. I scaled the maximum up over the next few days. It's now at ninety-four. If I exhaust all the music and get bored of repeats, I can always up the limit to get a few new songs.

In fact, on the very first run of the script, the test playlist completely filled with songs from one artist who had just released a new album. That triggered the implementation of the three songs per artist/album rule to reduce that happening. 

I appreciate listening to tracks out of sequence, and a full album is different from the artist intended. But thankfully, I don't listen to a lot of [Adele](https://www.abc.net.au/news/2021-11-22/adele-spotify-play-shuffle-change/100638662), and the script no longer adds whole albums full of songs to the list. So, no longer a "me" problem.

## No AI

I said at the top I'm not using any "AI/ML" in my script, and while that's true, I don't control what goes on inside the Spotify datacentre. The script is entirely subject to the whims of the Spotify API as to which tracks get returned to my requests. There are some constraints to the search API query complexity, and limits on what the API returns. 

The [Spotify API documentation](https://developer.spotify.com/documentation/web-api/reference/search) has been excellent so far, as has the [Spotipy](https://github.com/spotipy-dev/spotipy) [docs](https://spotipy.readthedocs.io/en/2.24.0/).

Popular songs and artists often organically feature prominently in the API responses. Plus (I presume) artists and labels have financial incentives or an active marketing campaign with Spotify, further skewing search results. Amusingly, the API has an optional (and amusing) "hipster" tag to show the _bottom_ 10% of results (ranked by popularity). I did that once, didn't much like it, and won't do it again. 

It's also subject to the music industry publishing music regularly, and licensing it to be streamed via Spotify where I live. 

## Not quite

With the script as-is, initially, I did not get fresh new tunes every single day as expected, so I had a further fettle to increase my exposure to new songs beyond what's popular, trending, or tagged "new". I changed the script to [scan](https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks) the last year of my listening habits to find genres of music I (and the rest of the family) have listened to a lot. 

I trimmed this list down (to remove the genre taint) and then fed these genres to the script. It then randomly picks a selection of those genres and queries the API for new releases in those categories.

With these tweaks, I certainly think this script and the resulting playlist are worth listening to. It's fresher and more dynamic than the 14-year-old playlist I currently listen to. Overall, the script works so that I now see songs and artists I've not listened to—or even heard of—before. Mission (somewhat) accomplished.

Indeed, with the genres feature enabled, I could add a considerable amount of new music to the list, but I am trying to keep it a manageable size, under a hundred tracks. Thankfully, I don't need to worry about the script pulling "Death Metal," "Rainy Day," and "Disney" categories out of thin air because I can control which ones get chosen. Thus, I can coerce the selection while allowing plenty of randomness and newness.

I have limited the number of genre-specific songs so I don't get overloaded with one music category over others.

## Not new

There are a couple of wrinkles. One song that popped into the playlist this week is "Never Going Back Again" by Fleetwood Mac, recorded live at The Forum, Inglewood, in 1982. That's older than the majority of what I listened to in all of August! It looks like Warner Records Inc. released that live album on 21st August 2024, well within my eleven-day boundary, so it's technically within "The Rules" while also not being fresh, new music.

There's also the compilation complication. Unfresh songs from the past re-released on "TOP HITS 2024" or "DANCE 2024 100 Hot Tracks" also appeared in my search criteria. For example, "Talk Talk" by Charli XCX, from her "Brat" album, released in June, is on the "DANCE 2024 100 Hot Tracks" compilation, released on 23rd August 2024, again, well within my eleven-day boundary.

I'm in two minds about these time-travelling playlist interlopers. I have never knowingly listened to Charli XCX's "Brat" album by choice, nor have I heard live versions of Fleetwood Mac's music. I enjoy their work, but it goes against the "new music" goal. But it *is* new to *me* which is the whole point of this exercise.

The further problem with compilations is that they contain music by a variety of artists, so they don't hit the "max-per-artist" limit but will hit the "max-per-album" rule. However, if the script finds multiple newly released compilations in one run, I might end up with a clutch of random songs spread over numerous "Various Artists" albums, maxing out the playlist with literal "filler."

I initially allowed compilations, but I'm irrationally bothered that one day, the script will add "The Birdie Song" by Black Lace as part of "**DEUTSCHE TOP DISCO 3000 POP GEBURTSTAG PARTY TANZ SONGS ZWANZIG VIERUNDZWANZIG**". 

Nein.

I added a filter to omit any "album type: compilation," which knocks that bopping-bird-based botherer squarely on the bonce.

No more retro Europop compilation complications in *my* playlist. Alles klar.

## Not yet

Something else I had yet to consider is that some albums have release dates in the future. Like a fresh-faced newborn baby with an IDE and API documentation, I assumed that albums published would generally have release dates of today or older. There may be a typo in the release_date field, or maybe stuff gets uploaded and made public ahead of time in preparation for a big marketing push on `release_date.`

I clearly do not understand the music industry or publishing process, which is fine.

## Nuke it from orbit

I've been testing the script while I prototyped it, this week, leading up to the "Grand Launch" in September 2024 (next month/week). At the end of August I will wipe the slate (playlist) clean, and start again on 1st September with whatever rules and optimisations I've concocted this week. It will almost certainly re-add some of the same tracks back-in after the 31st August "Grand Purge", but that's as expected, working as designed. The rest will be pseudo-random genre-specific tracks.

I hope.

## Newsletter

I will let this thing go mad each day with the playlist and regroup at the end of September to evaluate how this scheme is going. Expect a follow-up blog post detailing whether this was a fun and interesting excursion or pure folly. Along the way, I did learn a bit more Python, the Spotify API, and some other interesting stuff about music databases and JSON. 

So it's all good stuff, whether I enjoy the music or not.

You can get further, more timely updates in my weekly email [newsletter](https://newsletter.popey.com/), or view it in the [newsletter archive](https://newsletter.popey.com/archive), and via [RSS](https://newsletter.popey.com/archive.xml), a little later.

Ken said he got "joy out of reading your newsletter". YMMV. E&OE. HTH. HAND.

## Nomenclature

Every good project needs a name. I initially called it my "Personal Dynamic Playlist of Sixty tracks over Eleven days," or [PDP-11/60](https://gunkies.org/wiki/PDP-11/60) for short, because I'm a colossal nerd. Since bumping the max-tracks limit for the playlist, it could be re-branded [PDP-11/94](https://gunkies.org/wiki/PDP-11/94). However, this is a relatively niche and restrictive playlist naming system, so I sought other ideas.

My good friend [Martin](https://wimpysworld.com/) coined the term "Virtual Zane Lowe" (Zane is a DJ from New Zealand who is apparently renowned for sharing new music). That's good enough for me. Below are links to all three playlists if you'd like to listen, laugh, live, love, or just look at them.

* [Virtual Zane Lowe Playlist on Spotify](https://open.spotify.com/playlist/5raANj8U2Lko959txpzzls?si=5dc326b784e64fa1). 
* [Keepers](https://open.spotify.com/playlist/7a8MVSOopuC1JS3JrnEKMW?si=4645ed3452a54020) 
* [Sleepers](https://open.spotify.com/playlist/2jLizvLBrWDCoApJeRxy1Q?si=9ca93c88ba074350)

*The "Keepers" and "Sleepers" lists will likely be relatively empty for a few days until the script migrates my preferred and disliked tracks over for safe-keeping & archival, respectively.*

## November approaches

Come back at the end of the month to see if:
My script still works.
The selections are good.
I'm still listening to this playlist, and most importantly.
Whether I enjoy doing so! 

If it works, I'll probably continue using it through October and into November as I commute to and from the office. If that happens, I'll need to update the playlist artwork. Thankfully, there's an [API](https://developer.spotify.com/documentation/web-api/reference/upload-custom-playlist-cover) for that, too!

I may consider tidying up the script and sharing it online somewhere. It feels a bit niche and requires a paid Spotify account to even function, so I'm not sure what value others would get from it other than a hearty chuckle at my terribad Python "skills." 

One potentially interesting option would be to map the songs in Spotify to another, such as Apple Music or even videos on YouTube. The YouTube API should enable me to manage video playlists that mirror the ones I manage directly on Spotify. That could be a fun further extension to this project.

Another option I considered was converting it to a web app, a service I (and other select individuals) can configure and manage in a browser. I'll look into that at the end of the month. If the current iteration of the script turns out to be a complete bust, then this idea likely won't go far, either.

Thanks for reading. AirPods in. Click "Shuffle".

