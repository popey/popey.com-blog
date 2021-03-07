+++
date = "2021-03-06T12:00:00-00:00"
title = "Finding Ubuntu Crash Reports"
slug = "2021/03/finding-ubuntu-crash-reports"
author = "Alan Pope"
tags = ['ubuntu', 'linux', 'software', 'crash']
+++

This post is more an *aide-mémoire* for myself, but may be useful to others. 

I recently [wrote](/blog/2021/02/a-tale-of-two-updates/) a little story about bugs, the crash reporter and errors website in Ubuntu. Sometimes a user will want to look for *their* crash reports, and in fact that question came up [today](https://discourse.ubuntu.com/t/how-to-add-more-info-to-an-uploaded-crash-report/21263?u=popey) on the [Ubuntu Discourse](https://discourse.ubuntu.com/).

Back when we shipped Unity desktop as the default desktop environment in Ubuntu, there was a simple button to take a user to their previously uploaded crash reports. There was also an easy, graphical way to disable crash reporting. 

I say *was* in the past tense, but Unity still exists in the Ubuntu repository. Indeed there's even a revived [Ubuntu Unity Remix](https://ubuntuunity.org/). So those of us who prefer Unity can still run it, despite it not getting a lot of new development or maintenance since 2017.

In fact on my ThinkPad X220 I have Unity installed on the Ubuntu 21.10 release, which still performs very nicely.

[![Unity](/blog/images/2021-03-07/unity.png)](/blog/images/2021-03-07/unity.png)

The settings dialog has the "Show Previous Reports" button I mentioned above.

[![Privacy settings](/blog/images/2021-03-07/privacy.png)](/blog/images/2021-03-07/privacy.png)

This takes the user to a web page at [errors.ubuntu.com](https://errors.ubuntu.com/) showing errors from their PC only. Here's what it looks like for me on my X220.

[![Errors](/blog/images/2021-03-07/errors.png)](/blog/images/2021-03-07/errors.png)

*Note:* clicking through to the details for any crash is limited to a small set of bug triage developers. 

In the transition from Unity to GNOME Shell in late 2017, this option was lost, or rather, never implemented anywhere in GNOME Control Center.

However, it's easy to find the reports for your own PC, whatever the desktop, with a simple command. This takes the unique system ID and adds it on the end of the url to the errors site and launches your default browser.

`xdg-open https://errors.ubuntu.com/user/$(sudo cat /var/lib/whoopsie/whoopsie-id)`

Here's what that looks like from my Ubuntu Hirsute (21.04) system.

[![Crashes](/blog/images/2021-03-07/crashes.png)](/blog/images/2021-03-07/crashes.png)

Hope that's helpful to someone. Maybe I'll remember it next time I'll remember it too! :D