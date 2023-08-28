+++
date = "2022-11-18T12:00:00-00:00"
title = "Find Your Twitter Friends on Mastodon"
slug = "2022/11/find-your-twitter-friends-on-mastodon"
author = "Alan Pope"
tags = ['twitter', 'mastodon', 'twitodon']
+++

Depending on who you speak to, [Twitter](https://en.wikipedia.org/wiki/Twitter) is (or isn't) in turmoil, and [Mastodon](https://en.wikipedia.org/wiki/Mastodon_(software)) is (or isn't) here to supplant (or backup (or not)) the *"de facto town square"*.

Whether any of that is true or not, there's been a surge in people signing up, and trying out the Mastodon experience.

[![Mastodon growth](/blog/images/2022-11-18/mastogrowth.jpeg)](https://twitter.com/estebanmoro/status/1590002956103188480) (via [this tweet](https://twitter.com/estebanmoro/status/1590002956103188480))

For those who aren't familiar with all this, learn more about Mastodon over at the friendly-looking main [Join Mastodon](https://joinmastodon.org/) site.

[![Join Mastodon](/blog/images/2022-11-18/joinmastodon.png)](https://joinmastodon.org/)

## Oh so lonely

Joining Mastodon can be a little like arriving at a massive theme park, knowing some of your friends are also there, but not knowing where. 

You'll certainly see posts from people nearby, but you likely want to reconnect with friends you made over on "birdsite" (as it's known by some in the Mastodon world).

Mastodon has a decentralised nature, with many "instances" rather than just one central one. As a result your friends could be on any of those instances, and may have a different username, depending on what's available, and how consistent they are :)

Many people put a link to their Mastodon account in a recent tweet, and others put it in their Twitter profile. I did both.

[![popey on twitter](/blog/images/2022-11-18/popeybanner.png)](https://twitter.com/popey)

So it's always a good idea to look there first, especially for your most *favourite* friends.

That can be time consuming and not everyone has filled in their profile like this though.

Fear not, dear cyberspace traveller!

## Enter Twitodon

[Twitodon](https://twitodon.com/) by my friend [Dani Llewellyn](https://github.com/diddledani) is an open source web tool which may help you.

It securely connects to both Twitter and Mastodon using your account (but without having to know your password). 

Twitodon then scans the list of people you follow on Twitter and tries to match them up with other Twitodon users, to provide you a correlated list. 

The list is a CSV file you can easily import into your Mastodon account. Boom, you're now following a bunch of people you were tracking on Twitter.

At a high level, these are the steps you need to do. This assumes you have both a Twitter and Mastodon account already. You should probably do this on a PC rather than mobile device, but your mileage may vary.

* Sign into Twitter on Twitodon
* Sign into Mastodon on Twitodon
* Wait while Twitodon processes your following list
* Download the CSV file
* Import the CSV file into Mastodon

At this point you're kinda done. However, the more people who use Twitodon, the better the matching process. So you could promote Twitodon to your friends, then come back later, and repeat the above process, to catch any more people who used the site since you last checked. (relatively) Easy!

Ok, let's go through it with my account.

### Go to Twitodon

* Visit [Twitodon](https://twitodon.com/).

### Sign into Twitter

* Click the **"Step 1. Login With Twitter."** link

If you're not logged into Twitter in the browser, you'll need to do that.

![Twitter Login](/blog/images/2022-11-18/twitterlogin.png)

Once logged into Twitter, you'll see something like this, but with your account details (duh!).

![Twitter Authentication](/blog/images/2022-11-18/twitterauth.png)

Click the "Authorize app" button, after reading the notes, obviously!

![Legalspeak](/blog/images/2022-11-18/twitterperms.png)

If succesful, you'll be taken back to Twitodon, but with that step crossed out, to indicate you've successfully done it.

*"Step 1. ~~Login With Twitter~~ Done. (Logged in as: @popey)."*

### Sign into Mastodon

As I previously mentioned, there's a ton of Mastodon instances (servers, basically) and Twitodon doesn't know which one you're on. So in the next step, you need to provide it.

* Paste the instance hostname into the box.

For me, I'm [https://ubuntu.social/@popey](https://ubuntu.social/@popey), so I just paste `https://ubuntu.social/` in the box then press the **"Login"** button.

Like this:

![Mastodon hostname](/blog/images/2022-11-18/mastodonhost.png)

If you're not already logged into Mastodon, you'll need to do that first.

![Mastodon login](/blog/images/2022-11-18/mastodonlogin.png)

Once logged in, or if you already are, you'll see something like this.

![Mastodon login](/blog/images/2022-11-18/mastodonauth.png)

* Click the "Authorize" button.

If successful, you'll come back to Twitodon again, but once more, with that step crossed out, as you've done it.

*"Step 2. ~~Login With Mastodon by entering your Mastodon host's web address:~~ Done. (Logged in as: @popey@ubuntu.social)"*

### Please wait...

You'll notice the text under Step 2 starts by reading:-

*We have scanned 0 of 0 users you follow on Twitter and discovered 0 Twitter users on Mastodon who have previously linked their Twitter and Mastodon accounts.*

It'll soon change to show a count of those people Twitodon has found:-

*We have scanned 224 of 4552 users you follow on Twitter and discovered 1 Twitter users on Mastodon who have previously linked their Twitter and Mastodon accounts.*

These numbers will vary of course, depending on how many people you follow over on Twitter, how many have already used Twitdon, and how many matches were found. Just wait for this, it can take a while.

Here's what mine looked like once the process finished.

*We have scanned 4552 of 4552 users you follow on Twitter and discovered 112 Twitter users on Mastodon who have previously linked their Twitter and Mastodon accounts.*

### Download the CSV

Once complete, you'll get a download link.

*Step 3. Download matching users in CSV format to import into your Mastodon account.*
*Click Here to download the CSV file*

* Click the link

You'll get a file called `new_mastodon_follows.csv`. Keep that safe for the next step!

### Import (and merge)

Now we get to the bit where you add those lovely friends to your Mastodon.

* Open a new browser tab
* Login to your Mastodon instance
* Click the little cog/setting icon above your profile

![Mastodon settings icon](/blog/images/2022-11-18/mastodonsetting1.png)

* Click "Import & Export" in the menu, then "Import" below that

![Mastodon import menu item](/blog/images/2022-11-18/mastodonsetting2.png)

* Ensure "Import Type" has "Following list" selected
* Ensure "Merge" button is selected
* Click the "Choose file" button and locate the downloaded CSV from earlier

![Mastodon import following list](/blog/images/2022-11-18/mastodonsetting3.png)

* Click the big "Upload" button.
* Once the upload is done, you should get a green banner:

![Mastodon import following list](/blog/images/2022-11-18/mastodonsetting4.png)

### Docking complete!

That's it. You'll probably start getting followed back from those friends on Mastodon now.

### ...and finally

Please share this blog post, and/or a link to [Twitodon](https://twitodon.com/) with your Twitter friends, so more people can find eachother on Mastodon.

## Thanks

Thanks to [Dani Llewellyn](https://github.com/diddledani) for making this super handy tool. Consider [sponsoring](https://github.com/sponsors/diddledani?o=esb) their valuable work!

See you on the fediverse!

