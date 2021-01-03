+++
date = "2021-01-03T12:00:00-00:00"
title = "Check for Outdated Snaps"
slug = "2021/01/check-for-outdated-snaps"
author = "Alan Pope"
tags = ['software', 'snapcraft', 'linux', 'script', 'bash']
+++

I don't consider myself a 'Developer' but I maintain a bunch of snaps in the Snap Store, and threw together a shell script which I'm sharing here in case it's useful to other publishers. The goal of the script is to go through each snap and check to see if there's a newer version of it upstream than currently published in the store. As such it's not meant for end-users, but for people like me who publish multiple snaps from different places, and want to keep on top of them.

As most applications (for better or worse) are hosted on GitHub, the script only has the ability to use their API to find out the latest tag or release, as published by the upstream. I could update this for GitLab, and likely will, if I publish apps whose source is hosted there. As it uses the GitHub API so you need an access token, which you can get for free from [here](https://github.com/settings/tokens). Put the token in a file, and point to it with `TOKENPATH` in the script.

I've put the script up as a gist which you'll find [here](https://gist.github.com/popey/53df8dccee70ac8806ba87a7705e23e2). It produces output like this:

```
Application            Publisher             Stable                   Upstream                 OK?(✔/✖)  Edge                     
Matterbridge           Alan.Pope.🐧.(popey)  1.20.0                   1.21.0                   ✖         1.21.0                   https://snapcraft.io/matterbridge/releases
Matterhorn             Alan.Pope.🐧.(popey)  50200.11.0-99-gbd3aacba  50200.11.0               ✖         50200.11.0-99-gbd3aacba  https://snapcraft.io/matterhorn/builds
Mindustry              Alan.Pope.🐧.(popey)  122.1                    122.1                    ✔         122.1                    
```

The OK column is the key thing to look for, indicating that there's a newer version upstream than published in the Snap Store. The ✖ indicates there is a newer tag or release than stable, whereas ✔ suggests the versions are the same. So I tend to run this script with `outdated_snaps.sh | grep ✖`. The url printed at the end is a convenience, which the publisher can click through to release a build from `edge` to `stable` (if it's already built) or trigger a build if it's not built yet.

The script is configured with a simple CSV file with entries like this:

```
LBRY,lbry,github,releases,lbryio,lbry-desktop
Matterbridge,matterbridge,github,releases,42wim,matterbridge
Matterhorn,matterhorn,github,releases,matterhorn-chat,matterhorn
```

The columns are `Friendly Name`, `Snap Name`, `Code host` (currently always github), `releases` or `tags`, `repo owner`, `repo name`.

Hope that's helpful to any other snap publishers. 🎉