+++
date = "2023-10-04T20:00:00+01:00"
title = "Game development in GitHub Codespaces"
slug = "2023/10/game-development-in-github-codespaces"
author = "Alan Pope"
tags = ['github', 'codespaces', 'love2d', 'pip', 'portable']
+++

Today I stumbled on a [question](https://www.reddit.com/r/love2d/comments/16yf8vz/portable_love2d/) in the [LÖVE](https://love2d.org/) [subreddit](https://www.reddit.com/r/love2d/), asking how to have a portable development environment when you have no control over the host PC.

> Quick question. Is it possible to download love onto a flash drive so i can make it portable. I'm asking because I can't download things at work on my work computer but I'm working on a love project in my spare time for a course I'm taking. I'm new to all this and appreciate any help.

The answers directly addressed the question with sensible and helpful ideas. I thought of another way of attacking this problem, and it seems to work!

Let's go .. to the 💫 cloud 💫

**Note**: There are some big images in this blog that are hard to read on small screens until you click through to them.

## Background

### LÖVE

For those that don't know [LÖVE](https://love2d.org/) is an easy-to-use game development framework for making 2D games. I've been playing with it for personal projects for years. Not released any games yet, but I'm working on that. 

[![LÖVE](/blog/images/2023-10-04/love.png)](https://love2d.org/)


### Codespaces

GitHub [Codespaces](https://github.com/features/codespaces) are like your own development machine in the cloud (yes, on someone else's computer). You can do everything in Codespaces in a browser, with no local software installation necessary. 

[![GitHub Codespaces](/blog/images/2023-10-04/codespaces.png)](https://github.com/features/codespaces)


### Make love

Typically developers will bundle their game code (written in Lua) with the LÖVE runtime. However, there's a tool called [makelove](https://github.com/pfirsich/makelove) which can use [Emscripten](https://emscripten.org/) to turn that code into JavaScript to run in a browser. This could be useful to us!

## Setup

### Create repo

I just created a new empty repository on my GitHub account called [bouncingbox](https://github.com/popey/bouncingbox). As soon as I did that, GitHub offered to "Start coding with Codespaces". 

[![New repo](/blog/images/2023-10-04/launch-codespaces.png)](/blog/images/2023-10-04/launch-codespaces.png)

So I hit the "Create a codespace" button, and landed here:

[![New repo](/blog/images/2023-10-04/create-codespace.png)](/blog/images/2023-10-04/create-codespace.png)


I then hit "Create new codespace". Within around ten seconds I'm dropped into a VSCode session in my repository. Below the empty code pane is a terminal. 

[![VSCode](/blog/images/2023-10-04/vscode.png)](/blog/images/2023-10-04/vscode.png)

### Sample code

For this demonstration, I wrote some simple LÖVE code in the repo. It's not a full game, just some simple code to display a coloured box bouncing around, for this blog post.

[![Code](/blog/images/2023-10-04/code.png)](/blog/images/2023-10-04/code.png)

I saved the code, then used the standard VSCode features to commit the changes. At this point, I hadn't committed my code to the repo. So the code changes only existed inside my Codespace. This could be useful if you're just trying out tutorials. But anything you want to keep should probably be committed to the reop, or downloaded.

You can see the code [here](https://github.com/popey/bouncingbox/blob/main/main.lua).

Now we have some code, we can run it.

### Install makelove

We're going to use [makelove](https://github.com/pfirsich/makelove) which is available via [pip](https://pypi.org/project/makelove/). So, in the terminal we just need to `pip install makelove`. This takes seconds to complete.

```bash
@popey ➜ /workspaces/bouncingbox (main) $ pip install makelove
Collecting makelove
  Obtaining dependency information for makelove from https://files.pythonhosted.org/packages/6d/a6/3d39a19d96e0e101d5c44ef2cdb63b0bb439e64972637d28b4b16e965c4d/makelove-0.0.12-py3-none-any.whl.metadata
  Downloading makelove-0.0.12-py3-none-any.whl.metadata (7.0 kB)
Requirement already satisfied: Pillow>=7.0 in /home/codespace/.local/lib/python3.10/site-packages (from makelove) (10.0.1)
Collecting appdirs>=1.4.3 (from makelove)
  Downloading appdirs-1.4.4-py2.py3-none-any.whl (9.6 kB)
Collecting toml>=0.10 (from makelove)
  Downloading toml-0.10.2-py2.py3-none-any.whl (16 kB)
Downloading makelove-0.0.12-py3-none-any.whl (27 kB)
Installing collected packages: appdirs, toml, makelove
Successfully installed appdirs-1.4.4 makelove-0.0.12 toml-0.10.2
@popey ➜ /workspaces/bouncingbox (main) $ 
```

Once installed, we can look at the help for the `makelove` command. 

```bash
@popey ➜ /workspaces/bouncingbox (main) $ makelove --help
usage: makelove [-h] [--init] [--config CONFIG] [-d {prebuild,postbuild,all}] [--force] [--resume] [--verbose] [-n VERSION] [--check] [--version] [targets ...]

positional arguments:
  targets               Options: win32, win64, appimage, macos, lovejs

options:
  -h, --help            show this help message and exit
  --init                Start assistant to create a new configuration.
  --config CONFIG       Specify config file manually. If not specified 'makelove.toml' in the current working directory is used.
  -d {prebuild,postbuild,all}, --disable-hook {prebuild,postbuild,all}
  --force               If doing a versioned build, specify this to overwrite a target that was already built.
  --resume              If doing an unversioned build, specify this to not rebuild targets that were already built.
  --verbose             Display more information (files included in love archive)
  -n VERSION, --version-name VERSION
                        Specify the name of the version to be built.
  --check               Only load config and check some arguments, then exit without doing anything. This is mostly useful development.
  --version             Output the makelove version and exit.
```

We will only be using `makelove` to build the JavaScript hostable version of our code. But it's interesting to note it can build binaries for Windows, Mac and Linux. It can also make a simple zip file containing the game and assets. This is useful if you want to save an archive in your git repo. Just check those builds into your GitHub directly from the codespaces container. 

## Build

This is easy. Just run `makelove lovejs`.


```bash
@popey ➜ /workspaces/bouncingbox (main) $ makelove lovejs
No config file found. Using default config.
Guessing project name as 'bouncingbox'
Could not find löve config file
Assuming default löve version '11.3'
Using default build directory 'makelove-build'
Using default love_files patterns: ['::git-ls-tree::', '-*/.*']
Building targets: lovejs
Assembling game directory..
Warning: Pattern '*/.*' does not match any files
Created makelove-build/love/bouncingbox.love
>> Building target lovejs
No love binaries specified for target lovejs
Love binaries already present in '/home/codespace/.cache/makelove/love-binaries/11.3/lovejs'
Target lovejs complete
```

We're going to make this accessible via a webserver, but need to re-unpack the packed JavaScript files. So just use `unzip` to unpack it.

```bash
@popey ➜ /workspaces/bouncingbox (main) $ unzip makelove-build/lovejs/bouncingbox-lovejs.zip
Archive:  makelove-build/lovejs/bouncingbox-lovejs.zip
 extracting: bouncingbox/index.html  
 extracting: bouncingbox/game.js     
 extracting: bouncingbox/game.data   
 extracting: bouncingbox/love.js     
 extracting: bouncingbox/love.wasm   
 extracting: bouncingbox/theme/love.css  
 extracting: bouncingbox/theme/bg.png  
```

## Run

Ok, now we're ready to spin up a simple webserver to make the files accessible in a browser, in a way emscripten likes.

We'll just use the tried and trusted `python` webserver. So I just run `python -m http.server --directory bouncingbox/` .

```bash
@popey ➜ /workspaces/bouncingbox (main) $ python -m http.server --directory bouncingbox/
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

VSCode notices there's now something running on port 8000 and offers to open that site in a browser. So we click the button....


[![Open port](/blog/images/2023-10-04/port.png)](/blog/images/2023-10-04/port.png)

We're taken to a private URL - that is, only you, logged in with your GitHub account, can get to it. In it, is our "game".


[![Box](/blog/images/2023-10-04/box.png)](/blog/images/2023-10-04/box.png)

Honestly, it does move! I have a [webm video](/blog/videos/2023-10-04/box.webm) of it!

{{< rawhtml >}}
   <center>
      <video  width="640" height="480" controls>
         <source
            src="/blog/videos/2023-10-04/box.webm"
            type="video/webm">
         </source>
      </audio>
   </center>
{{</ rawhtml >}}

**SUCCESS!**

Back in VSCode we can see the files that were served up from the codespace.

```bash
@popey ➜ /workspaces/bouncingbox (main) $ python -m http.server --directory bouncingbox/
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
127.0.0.1 - - [04/Oct/2023 18:57:35] "GET / HTTP/1.1" 200 -
127.0.0.1 - - [04/Oct/2023 18:57:35] "GET /theme/love.css HTTP/1.1" 200 -
127.0.0.1 - - [04/Oct/2023 18:57:35] "GET /game.js HTTP/1.1" 200 -
127.0.0.1 - - [04/Oct/2023 18:57:35] "GET /love.js HTTP/1.1" 200 -
127.0.0.1 - - [04/Oct/2023 18:57:35] "GET /theme/bg.png HTTP/1.1" 200 -
127.0.0.1 - - [04/Oct/2023 18:57:35] code 404, message File not found
127.0.0.1 - - [04/Oct/2023 18:57:35] "GET /favicon.ico HTTP/1.1" 404 -
127.0.0.1 - - [04/Oct/2023 18:57:35] "GET /love.wasm HTTP/1.1" 200 -
127.0.0.1 - - [04/Oct/2023 18:57:36] "GET /game.data HTTP/1.1" 200 -
127.0.0.1 - - [04/Oct/2023 19:02:03] "GET /game.js HTTP/1.1" 304 -
127.0.0.1 - - [04/Oct/2023 19:02:03] "GET /theme/love.css HTTP/1.1" 304 -
127.0.0.1 - - [04/Oct/2023 19:02:03] "GET /love.js HTTP/1.1" 304 -
127.0.0.1 - - [04/Oct/2023 19:02:03] "GET /theme/bg.png HTTP/1.1" 304 -
127.0.0.1 - - [04/Oct/2023 19:02:03] "GET /love.wasm HTTP/1.1" 304 -
```

Now I can iterate on the code, re-run the `makelove` and `unzip` commands, and playtest my game. All with zero software installed on my computer, other than a browser. Neat.

## Conclusion

I found this pretty straightforward to setup and run. For the whole demo, I was manually typing commands. I'm certain some of this can be automated, as CodeSpaces has the ability to customise the container on launch. Perhaps `makelove` could be pre-installed for example. VSCode can also be configured to have a hotkey run `makelove` and `unzip` to get the assets ready for hosting.

This could clearly be used to get started with game programming with only a browser and a GitHub account. Indeed, this could probably work just fine on a Chromebook, although I haven't test that. It isn't limited to LÖVE either. Anything that can generate JavaScript natively, like [Phaser](https://phaser.io/), or can be mashed through Emscripten, should be good enough.

I don't know if this will be suitable for the original poster over on Reddit, but I certainly learned a few things today. 