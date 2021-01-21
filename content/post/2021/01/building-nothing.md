+++
date = "2021-01-21T12:00:00-00:00"
title = "Building Nothing"
slug = "2021/01/building-nothing"
author = "Alan Pope"
tags = ['null', 'snap', 'linux']
+++

Last week I wrote a blog post titled [null](https://popey.com/blog/2021/01/null/) which did rather well! Note the giant (for my blog) spike on the right of this [goaccess](https://goaccess.io/) graph.

![Wheee](/blog/images/2021-01-21/goaccess.png)

That's the [Hackernews](https://news.ycombinator.com/item?id=25771953) effect. It was super to see the conversations over in the comments there. Quite proud to get 3 blog posts and one git repo on the front page of HN in the first month of the year. Don't expect me to keep that momentum up, but we'll come back to that another day.

In the "null" post I mentioned a [snap](https://snapcraft.io/null) I'd made for fun during a lightning talk - it's towards the end of the post if you haven't seen it. For those not in the know, a snap is a universal Linux software package that my employer - Canonical - developed, and I'm a Developer Advocate for. Hence why I tend to write about it quite a bit. It's my job ma'am. Also, it's fun.

One thing I didn't talk about in that post was how I actually made the null snap. But rather than write that up here, I figured as it was a 'day job' activity, I wrote a [post](https://snapcraft.io/blog/compact-and-bijou) titled "Compact and Bijou" (Mostyn!) over on the [snapcraft blog](https://snapcraft.io/blog). Enjoy.

The main difference between the example "tiny" snap in that post and my "null" snap is the contents of the shell script. Well, that and the backend-breaking "null" strings everywhere in mine! My null snap contains a shell script which has only one line, the shebang - `#!/bin/bash` and that's it. So technically, not completely "Null" if we're being strict about what null means. Let's not get picky though, I had to ship something to get it built and uploaded!

You can download the snap and poke about, and even rebuild it yourself. Check it out, here's an asciinema TikTok-duration video of how you can do it:

{{< rawhtml >}}
<script id="asciicast-CDcUkPZBUpIFQN0SXvVc9F2pd" src="https://asciinema.org/a/CDcUkPZBUpIFQN0SXvVc9F2pd.js" async></script>
{{< /rawhtml >}}

It's all very silly and fun. Do check out the [post](https://snapcraft.io/blog/compact-and-bijou) on the [snapcraft blog](https://snapcraft.io/blog) for more info.