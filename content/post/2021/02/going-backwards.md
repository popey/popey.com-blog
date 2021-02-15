+++
date = "2021-02-15T12:00:00-00:00"
title = "Going Backwards"
slug = "2021/02/going-backwards"
author = "Alan Pope"
tags = ['software', 'linux', 'ubuntu', 'undanger']
+++

Yesterday I [wrote](/blog/2021/02/dont-use-proposed) about how I made a mistake by updating my primary Ubuntu computer to include the `proposed` pocket. I shouldn't have done this. So today I quickly hacked together a script to take any packages which came from `proposed` and "*downgrade*" them back to the `release` pocket. It's not pretty, but it worked, for me.

```
#!/bin/bash

TMPDIR=$(mktemp -d)
PACKAGES=$TMPDIR/packages
DOWNGRADE=$TMPDIR/downgrade

# Get list of all installed packages
dpkg -l | grep ^ii | awk -F ' ' '{ print $2}' > $PACKAGES

# Start the downgrade script
echo  "sudo apt install \\" > $DOWNGRADE

# For each package in the list of installed packages
while read p; do
  # Get the summary of where the package came from
  apt-cache policy $p > $TMPDIR/$p
  # Get the line after (grep -A 1 and tail -n 1) the highlighted one with 3 stars
  SOURCE=$(grep -A 1 "^\ *\*\*" $TMPDIR/$p | tail -n 1 | awk -F ' ' '{ print $3}' )
  # If that line suggests we got the package from proposed, add it to the script
  if [[ "$SOURCE" == *"hirsute-proposed"* ]]; then
    echo "$p/hirsute \\" >> $DOWNGRADE
  fi
done <$PACKAGES
# Tell the user what to run to actually do the downgrade
echo "Run sh $DOWNGRADE"
```

**Don't use this**. As they say on YouTube, this script is for educational purposes only. There's probably a thousand ways to make this more elegantly. Indeed I tried a suggestion on AskUbuntu which didn't work at all. 

All this does is check every package to see where it originated, and if it came from proposed, add it to a list of packages to be downgraded. That list is a shell script. Run that, and it downgrades the packages. 

There were a couple of tweaks I had to do to the resulting script. Specifically remove any mentions of kernel 5.10, and any other packages which were new in `proposed` and thus didn't have a version to downgrade to.

Running the script looks a bit like this. I have skipped a bunch of it, because it's very verbose, given there's nearly five hundred packages to download. 

```
Reading package lists...
Building dependency tree...
Reading state information...
The following packages were automatically installed and are no longer required:
  kate5-data kde-cli-tools kde-cli-tools-data kpeople-vcard ktexteditor-data
  kuserfeedback-doc libasync-mergepoint-perl libbasicusageenvironment1
  libboost-iostreams1.71.0 libboost-thread1.71.0 libcroco3 libdeflate0
  libdeflate0:i386 libeditorconfig0 libfakekey0 libfuture-perl libgroupsock8
  libio-async-loop-epoll-perl libio-async-perl libjs-sizzle libkf5people-data
  libkf5peoplebackend5 libkf5pulseaudioqt2 libkf5threadweaver5
  libkuserfeedbackcore1 libkuserfeedbackwidgets1 libkworkspace5-5
  liblinux-epoll-perl liblivemedia77 libmetrics-any-perl libnvpair1linux
  libqca-qt5-2 libqca-qt5-2-plugins libqt5multimediaquick5
  libqt5quickparticles5 libsereal-perl libsnmp35:i386 libstruct-dumb-perl
  libtest-metrics-any-perl libtest-refcount-perl libusageenvironment3
  libuutil1linux libxml-writer-perl libzfs2linux libzpool2linux node-jquery
  python3-sip python3-typing-extensions qml-module-org-kde-userfeedback
  qml-module-qt-labs-platform qml-module-qtmultimedia
  qml-module-qtquick-particles2 sshfs
Use 'sudo apt autoremove' to remove them.
```

We then move on to what was asked for:

```
The following additional packages will be installed:
  android-libselinux android-libsepol linux-headers-5.8.0-36-generic
  linux-image-5.8.0-36-generic linux-modules-5.8.0-36-generic
  linux-modules-extra-5.8.0-36-generic
Recommended packages:
  e2fsprogs-l10n libkf5filemetadata-bin libkf5globalaccel-bin
  libkf5iconthemes-bin qml-module-org-kde-newstuff libkf5parts-plugins
  qml-module-org-kde-purpose libkf5service-bin libkf5su-bin libkf5xmlgui-bin
  pipewire hplip crash kexec-tools kdeconnect tex-gyre
The following packages will be REMOVED
  kate kdeconnect ktexteditor-katepart libc-devtools libkf5people5
  libkf5peoplewidgets5 libkf5texteditor-bin libkf5texteditor5 libmd0:i386
  qml-module-org-kde-people ruby-rubygems
The following NEW packages will be installed
  android-libselinux android-libsepol linux-headers-5.8.0-36-generic
  linux-image-5.8.0-36-generic linux-modules-5.8.0-36-generic
  linux-modules-extra-5.8.0-36-generic
The following packages will be DOWNGRADED:
  acl acpica-tools adb anacron android-libadb android-libbacktrace
  android-libbase android-libcrypto-utils android-libcutils
  android-libext4-utils android-liblog android-libsparse android-libutils
  android-libziparchive android-sdk-platform-tools
  android-sdk-platform-tools-common appstream apt apt-config-icons
  apt-config-icons-hidpi apt-transport-https apt-utils base-passwd binutils
```

`---8<---`

```  
  systemd-sysv systemd-timesyncd tar tcpdump tex-common texlive-base
  texlive-extra-utils texlive-fonts-recommended texlive-formats-extra
  texlive-latex-base texlive-latex-extra texlive-latex-recommended
  texlive-luatex texlive-pictures texlive-plain-generic texlive-xetex thermald
  thin-provisioning-tools thunderbird thunderbird-gnome-support ubuntu-session
  udev update-notifier update-notifier-common wpasupplicant xdg-desktop-portal
  xterm xz-utils zfs-zed zfsutils-linux
0 to upgrade, 6 to newly install, 493 to downgrade, 11 to remove and 0 not to upgrade.
Need to get 660 MB/666 MB of archives.
After this operation, 293 MB of additional disk space will be used.
```

I let it run and got a bunch of this kind of "downgrading" message, which suggests it's working.

```
dpkg: warning: downgrading libaudit1:amd64 from 1:3.0-2ubuntu1 to 1:2.8.5-3ubuntu3      
Preparing to unpack .../10-libaudit1_1%3a2.8.5-3ubuntu3_amd64.deb ...                     
Unpacking libaudit1:amd64 (1:2.8.5-3ubuntu3) over (1:3.0-2ubuntu1) ...                    
Setting up libaudit1:amd64 (1:2.8.5-3ubuntu3) ...  
```

It ended with:

```
done.
```

Looks good, time to reboot and find out if it worked!
