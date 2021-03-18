+++
date = "2021-03-17T11:00:00-00:00"
title = "Actually Upgrading Ubuntu Server"
slug = "2021/03/actually-upgrading-ubuntu-server"
author = "Alan Pope"
tags = ['software', 'ubuntu', 'server', 'bionic', 'focal']
+++

[Yesterday](/blog/2021/03/upgrading-ubuntu-server/) I wrote about my attempt to upgrade one of my HP Microservers, running Ubuntu 18.04 LTS to Ubuntu 20.04 LTS. Well, today I had another go. Here's what happened. 

I followed the recommendation from yesterday, to compress the `initrd.img` using xz compression rather than the previous default gzip. Previously the upgrade failed because it needed 140M disk space in `/boot`. With the change to the compression scheme, I now have 154M, which should be enough to start the upgrade.

```bash
alan@robby:~$ df -h /boot
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1       226M   57M  154M  27% /boot
```

Well, I started the upgrade with `sudo do-release-upgrade` and once again had to reboot, then started the upgrade again. 

Just like last time I needed to okay the change to the `sources.list` and accept that third party repositories were disabled.

```
Updating repository information

No valid mirror found 

While scanning your repository information, no mirror entry for the 
upgrade was found. This can happen if you run an internal mirror or 
if the mirror information is out-of-date. 

Do you want to rewrite your 'sources.list' file anyway? If you choose 
'Yes' here, it will update all 'bionic' to 'focal' entries. 
If you select 'No', the upgrade will cancel. 

Continue [yN] y

Third party sources disabled 

Some third party entries in your sources.list were disabled. You can 
re-enable them after the upgrade with the 'software-properties' tool 
or your package manager. 

To continue please press [ENTER]


```

Okay, so we got past the size check of `/boot`. That's good. As usual we get a summary of what's going to happen. Some things removed, some upgraded and some new things to come. It's estimating the speed of download based on the fact I have a local mirror. 

```

Do you want to start the upgrade? 


15 installed packages are no longer supported by Canonical. You can 
still get support from the community. 

18 packages are going to be removed. 252 new packages are going to be 
installed. 960 packages are going to be upgraded. 

You have to download a total of 729 M. This download should take 
about 1 minute with your connection. 

Installing the upgrade can take several hours. Once the download has 
finished, the process cannot be cancelled. 

 Continue [yN]  Details [d]
```

Let's hit "d" for fun. Normally I just hit "y" and let it rip. We have some packages which are no longer supported:

```
No longer supported: bzr dh-python dnsutils geoip-database ifenslave 
  ifupdown libdumbnet1 libegl1-mesa libncurses5 libncursesw5 
  libtinfo5 nmap python-dateutil uidmap vlan 

```

Some which will be removed...

```
Remove: dstat libapt-inst2.0 libapt-pkg5.0 libcupscgi1 libcupsmime1 
  libcupsppdc1 libpolkit-backend-1-0 libsnmp30 
```

```
Remove (was auto installed) libldb1 libmailutils5 libpython-stdlib 
  libsensors4 python python-keyrings.alt python-ldb python-minimal 
  python-samba python-tdb 

```

... and a bunch which will be installed ...

```
Install: alsa-topology-conf alsa-ucm-conf amd64-microcode 
  bind9-dnsutils bind9-libs bolt brz chafa cpp-9 cryptsetup-initramfs 
  cryptsetup-run finalrd fonts-urw-base35 fwupd fwupd-signed g++-9 
  gcc-10-base gcc-9 gcc-9-base gir1.2-packagekitglib-1.0 
  golang-1.13-go golang-1.13-race-detector-runtime golang-1.13-src 
  guile-2.2-libs intel-microcode iucode-tool kpartx libaio1 
  libappstream4 libapt-pkg6.0 libarchive13 libargon2-1 
  libarray-intspan-perl libasan5 libasync-mergepoint-perl 
  libboost-filesystem1.71.0 libboost-iostreams1.71.0 
  libboost-thread1.71.0 libbrotli1 libcanberra0 libcapnp-0.7.0 
  libcapture-tiny-perl libcbor0.6 libchafa0 libcommon-sense-perl 
  libconst-fast-perl libcontextual-return-perl libcpanel-json-xs-perl 
  libcrypt-dev libcrypt1 libctf-nobfd0 libctf0 libdbus-glib-1-2 
  libdevel-size-perl libdigest-bubblebabble-perl libdns-export1109 
  libefiboot1 libefivar1 libevent-2.1-7 libffi7 libfido2-1 
  libfile-find-rule-perl libfl2 libfont-ttf-perl libfuture-perl 
  libfwupd2 libfwupdplugin1 libgcab-1.0-0 libgcc-9-dev libgcc-s1 
  libgdbm6 libgfortran5 libgitlab-api-v4-perl libglib2.0-bin 
  libgpg-error-l10n libgstreamer1.0-0 libgutenprint-common 
  libgutenprint9 libhash-fieldhash-perl libhogweed5 
  libhttp-tiny-multipart-perl libicu66 libilmbase24 libimagequant0 
  libio-async-loop-epoll-perl libio-async-perl libio-prompter-perl 
  libip4tc2 libip6tc2 libisc-export1105 libisl22 libjs-sphinxdoc 
  libjs-underscore libjson-c4 libjson-maybexs-perl libjson-perl 
  libjson-xs-perl libldb2 liblinear4 liblinux-epoll-perl 
  liblist-someutils-perl liblist-someutils-xs-perl libllvm11 liblmdb0 
  liblog-any-adapter-screen-perl liblog-any-perl liblouis20 
  liblouisutdml9 liblvm2cmd2.03 libmagickcore-6.q16-6 
  libmagickcore-6.q16-6-extra libmagickwand-6.q16-6 libmailutils6 
  libmoox-aliases-perl libmoox-struct-perl libmysqlclient21 
  libncurses6 libncursesw6 libnet-dns-sec-perl libnettle7 libnftnl11 
  libntfs-3g883 libobject-id-perl libonig5 libopenexr24 libopenjp2-7 
  libpackagekit-glib2-18 libpcre2-8-0 libperl4-corelibs-perl 
  libperl5.30 libplymouth5 libpoppler-cpp0v5 libpoppler97 libprocps8 
  libprotobuf-lite17 libprotobuf17 libpython2-stdlib libpython3.8 
  libpython3.8-minimal libpython3.8-stdlib libqpdf26 librdmacm1 
  libre-engine-re2-perl libre2-5 libreadline8 libreadonly-perl 
  libref-util-perl libref-util-xs-perl libregexp-pattern-perl libsane 
  libsensors-config libsensors5 libsereal-decoder-perl 
  libsereal-encoder-perl libsereal-perl libsgutils2-2 libsmbios-c2 
  libsnmp35 libstdc++-9-dev libstemmer0d libstring-shellquote-perl 
  libstruct-dumb-perl libterm-readkey-perl libtest-fatal-perl 
  libtest-refcount-perl libtinfo6 libtorrent21 libtss2-esys0 
  libtype-tiny-perl libtype-tiny-xs-perl libtypes-serialiser-perl 
  libubsan1 libuchardet0 libunbound8 liburcu6 libuv1 libvorbisfile3 
  libvulkan1 libwant-perl libxcb-randr0 libxkbfile1 
  libxml-writer-perl libxmlb1 linux-generic linux-headers-5.4.0-67 
  linux-headers-5.4.0-67-generic linux-image-5.4.0-67-generic 
  linux-image-generic linux-modules-5.4.0-67-generic 
  linux-modules-extra-5.4.0-67-generic logsave lua-lpeg 
  lxd-agent-loader lz4 mesa-vulkan-drivers multipath-tools 
  nmap-common node-normalize.css packagekit packagekit-tools pci.ids 
  perl-modules-5.30 python-configparser python-entrypoints 
  python-is-python2 python2 python2-minimal python3-blinker 
  python3-breezy python3-crypto python3-deprecated python3-distro 
  python3-dnspython python3-dulwich python3-entrypoints 
  python3-fastimport python3-future python3-github python3-gitlab 
  python3-hamcrest python3-jwt python3-keyring python3-kiwisolver 
  python3-launchpadlib python3-lazr.restfulclient python3-lazr.uri 
  python3-ldb python3-markdown python3-oauthlib python3-packaging 
  python3-pexpect python3-ptyprocess python3-pygments python3-samba 
  python3-secretstorage python3-simplejson python3-talloc python3-tdb 
  python3-wadllib python3-wrapt python3.8 python3.8-minimal 
  sbsigntool secureboot-db sg3-utils sg3-utils-udev 
  sound-theme-freedesktop systemd-timesyncd thermald 
  thin-provisioning-tools tpm-udev usb.ids 
```

With a load being upgraded too...

```
Upgrade: accountsservice acl acpid adduser adwaita-icon-theme apache2 
  apache2-bin apache2-data apache2-utils apparmor apport 
  apport-symptoms apt apt-transport-https apt-utils at at-spi2-core 
  attr avahi-daemon base-files base-passwd bash bash-completion bc 
  bcache-tools bind9-host binutils binutils-common 
  binutils-x86-64-linux-gnu bsdmainutils bsdutils btrfs-progs 
  build-essential busybox-initramfs busybox-static byobu bzip2 bzr 
  ca-certificates ca-certificates-java cloud-guest-utils 
  cloud-initramfs-copymods cloud-initramfs-dyn-netconf cockpit-bridge 
  cockpit-pcp colord colord-data command-not-found console-setup 
  console-setup-linux coreutils cpio cpp cpp-7 cron cryptsetup 
  cryptsetup-bin cups cups-browsed cups-client cups-common 
  cups-core-drivers cups-daemon cups-filters 
  cups-filters-core-drivers cups-ipp-utils cups-ppdc 
  cups-server-common curl dash dbus dbus-user-session dbus-x11 
  dconf-gsettings-backend dconf-service dctrl-tools debconf 
  debconf-i18n debianutils debmirror devscripts dh-python diffstat 
  diffutils dirmngr distro-info-data dmeventd dmidecode dmsetup 
  dns-root-data dnsmasq-base dnsutils dos2unix dosfstools dpkg 
  dpkg-dev dput e2fslibs e2fsprogs e2fsprogs-l10n ed eject ethtool 
  fakeroot fdisk file findutils fontconfig fontconfig-config 
  fonts-lyx fonts-noto-mono fonts-ubuntu-console 
  fonts-ubuntu-font-family-console friendly-recovery ftp fuse g++ 
  g++-7 gawk gcc gcc-7 gcc-7-base gcc-8-base gcr gddrescue gdisk 
  geoip-database gettext gettext-base ghostscript gir1.2-glib-2.0 git 
  git-man glances glib-networking glib-networking-common 
  glib-networking-services gnupg gnupg-l10n gnupg-utils 
  golang-docker-credential-helpers golang-go 
  golang-race-detector-runtime golang-src 
  google-cloud-print-connector gpg gpg-agent gpg-wks-client 
  gpg-wks-server gpgconf gpgsm gpgv grep groff-base grub-common 
  grub-legacy-ec2 grub-pc grub-pc-bin grub2-common 
  gsettings-desktop-schemas gtk-update-icon-cache guile-2.0-libs gzip 
  hdparm hostname htop ibverbs-providers iftop ifupdown imagemagick 
  imagemagick-6-common imagemagick-6.q16 info init 
  init-system-helpers initramfs-tools initramfs-tools-bin 
  initramfs-tools-core install-info intltool-debian iotop iperf 
  iproute2 iptables iputils-arping iputils-ping iputils-tracepath 
  irqbalance isc-dhcp-client isc-dhcp-common iso-codes iw java-common 
  jq kbd keyboard-configuration klibc-utils kmod krb5-locales 
  landscape-common language-pack-en language-pack-en-base 
  language-selector-common less libaccountsservice0 libacl1 
  libalgorithm-diff-perl libalgorithm-diff-xs-perl libapparmor-perl 
  libapparmor1 libapr1 libaprutil1 libaprutil1-dbd-sqlite3 
  libaprutil1-ldap libapt-pkg-perl libarchive-zip-perl libargon2-0 
  libasan4 libasn1-8-heimdal libasound2 libasound2-data libassuan0 
  libatk-bridge2.0-0 libatk-wrapper-java libatk-wrapper-java-jni 
  libatk1.0-0 libatk1.0-data libatm1 libatomic1 libatspi2.0-0 
  libattr1 libaudit-common libaudit1 libavahi-client3 
  libavahi-common-data libavahi-common3 libavahi-core7 libavahi-glib1 
  libb-hooks-endofscope-perl libb-hooks-op-check-perl libbinutils 
  libblas3 libblkid1 libbluetooth3 libbsd0 libbz2-1.0 libc-bin 
  libc-dev-bin libc6 libc6-dev libcairo-gobject2 libcairo2 libcap-ng0 
  libcap2 libcap2-bin libcc1-0 libcephfs2 libcgi-fast-perl 
  libcgi-pm-perl libcilkrts5 libclass-method-modifiers-perl 
  libclass-xsaccessor-perl libclone-perl libcolord2 libcolorhug2 
  libcom-err2 libcomerr2 libcroco3 libcrypto++-dev libcrypto++6 
  libcryptsetup12 libcups2 libcupsfilters1 libcupsimage2 
  libcurl3-gnutls libcurl4 libdaemon0 libdatrie1 libdb5.3 libdbus-1-3 
  libdconf1 libdebconfclient0 libdevel-callchecker-perl 
  libdevmapper-event1.02.1 libdevmapper1.02.1 libdigest-hmac-perl 
  libdistro-info-perl libdjvulibre-text libdjvulibre21 libdpkg-perl 
  libdrm-amdgpu1 libdrm-common libdrm-intel1 libdrm-nouveau2 
  libdrm-radeon1 libdrm2 libdumbnet1 libedit2 libegl-mesa0 libegl1 
  libegl1-mesa libelf1 libepoxy0 liberror-perl libexif12 libexpat1 
  libexporter-tiny-perl libext2fs2 libfakeroot libfcgi-perl libfdisk1 
  libfftw3-double3 libfile-basedir-perl libfile-copy-recursive-perl 
  libfile-fcntllock-perl libfile-homedir-perl libfile-which-perl 
  libflac8 libfontconfig1 libfontembed1 libfontenc1 libfreetype6 
  libfribidi0 libfuse2 libgbm1 libgc1c2 libgcc-7-dev libgcc1 
  libgck-1-0 libgcr-base-3-1 libgcr-ui-3-1 libgcrypt20 libgd3 
  libgdbm-compat4 libgdk-pixbuf2.0-0 libgdk-pixbuf2.0-bin 
  libgdk-pixbuf2.0-common libgeoip1 libgetopt-long-descriptive-perl 
  libgfortran4 libgif7 libgirepository-1.0-1 libgit-wrapper-perl 
  libgl1 libgl1-mesa-dri libgl1-mesa-glx libglapi-mesa libglib2.0-0 
  libglib2.0-data libglvnd0 libglx-mesa0 libglx0 libgmp10 
  libgnutls-openssl27 libgnutls30 libgomp1 libgpg-error0 libgpgme11 
  libgphoto2-6 libgphoto2-l10n libgphoto2-port12 libgraphite2-3 
  libgs9 libgs9-common libgsasl7 libgssapi-krb5-2 libgssapi3-heimdal 
  libgtk-3-0 libgtk-3-bin libgtk-3-common libgtk2.0-0 
  libgtk2.0-common libgudev-1.0-0 libgusb2 libharfbuzz0b 
  libhcrypto4-heimdal libheimbase1-heimdal libheimntlm0-heimdal 
  libhtml-form-perl libhtml-parser-perl libhtml-tagset-perl 
  libhtml-tree-perl libhttp-cookies-perl libhttp-daemon-perl 
  libhttp-date-perl libhttp-message-perl libhttp-negotiate-perl 
  libhx509-5-heimdal libibverbs1 libice-dev libice6 libidn11 
  libidn2-0 libieee1284-3 libijs-0.35 libio-pty-perl 
  libio-socket-ssl-perl libio-stringy-perl libipc-run-perl 
  libipc-system-simple-perl libiptc0 libisns0 libitm1 libiw30 
  libjansson4 libjbig2dec0 libjpeg-turbo8 libjq1 libjs-jquery 
  libjson-glib-1.0-0 libjson-glib-1.0-common libk5crypto3 
  libkeyutils1 libklibc libkmod2 libkrb5-26-heimdal libkrb5-3 
  libkrb5support0 libkyotocabinet16v5 liblapack3 liblcms2-2 
  libldap-2.4-2 libldap-common liblist-moreutils-perl libllvm10 
  liblocale-gettext-perl liblog-agent-perl liblouis-data 
  liblouisutdml-bin liblouisutdml-data liblsan0 libltdl7 liblua5.2-0 
  liblua5.3-0 liblwp-mediatypes-perl liblwp-protocol-https-perl 
  liblz4-1 liblzma5 liblzo2-2 libmagic-mgc libmagic1 
  libmailtools-perl libmaxminddb0 libmbim-glib4 libmbim-proxy 
  libmirclient9 libmircommon7 libmircore1 libmirprotobuf3 libmm-glib0 
  libmoo-perl libmount1 libmpdec2 libmpfr6 libmpx2 libmspack0 
  libncurses5 libncursesw5 libndp0 libnet-dns-perl libnet-http-perl 
  libnet-ip-perl libnet-libidn-perl libnet-ssleay-perl 
  libnetfilter-conntrack3 libnetplan0 libnewt0.52 libnfnetlink0 
  libnghttp2-14 libnl-3-200 libnl-genl-3-200 libnl-route-3-200 libnm0 
  libnpth0 libnspr4 libnss-mdns libnss-systemd libnss3 libntlm0 
  libnuma1 libogg0 libp11-kit0 libpackage-stash-perl 
  libpackage-stash-xs-perl libpam-modules libpam-modules-bin 
  libpam-runtime libpam-systemd libpam0g libpango-1.0-0 
  libpangocairo-1.0-0 libpangoft2-1.0-0 libpaper-utils libpaper1 
  libparams-classify-perl libparams-util-perl libparams-validate-perl 
  libparse-debianchangelog-perl libparted2 libpath-iterator-rule-perl 
  libpath-tiny-perl libpcap0.8 libpci3 libpciaccess0 libpcp-gui2 
  libpcp-import1 libpcp-mmv1 libpcp-pmda-perl libpcp-pmda3 
  libpcp-trace2 libpcp-web1 libpcp3 libpcre3 libpcsclite1 
  libperlio-gzip-perl libpfm4 libpipeline1 libpixman-1-0 libpng16-16 
  libpolkit-agent-1-0 libpolkit-gobject-1-0 libpopt0 libproxy1v5 
  libpsl5 libpthread-stubs0-dev libpulse0 libpython2.7 
  libpython2.7-minimal libpython2.7-stdlib libpython3-stdlib 
  libqmi-glib5 libqmi-proxy libquadmath0 librados2 libreadline5 
  libregexp-pattern-license-perl librest-0.7-0 libroken18-heimdal 
  librole-tiny-perl librsvg2-2 librsvg2-common librtmp1 
  libsane-common libsane1 libsasl2-2 libsasl2-modules 
  libsasl2-modules-db libseccomp2 libsecret-1-0 libsecret-common 
  libselinux1 libsemanage-common libsemanage1 libsepol1 libsigsegv2 
  libslang2 libsm-dev libsm6 libsmartcols1 libsndfile1 libsnmp-base 
  libsocket6-perl libsort-key-perl libsoup-gnome2.4-1 libsoup2.4-1 
  libsqlite3-0 libss2 libssh-4 libssl-dev libssl-doc libssl1.1 
  libstdc++-7-dev libstdc++6 libstrictures-perl 
  libstring-copyright-perl libsub-identify-perl libsub-name-perl 
  libsub-quote-perl libsystemd0 libtalloc2 libtasn1-6 libtcl8.6 
  libtdb1 libteamdctl0 libtevent0 libtext-charwidth-perl 
  libtext-iconv-perl libtext-wrapi18n-perl libthai-data libthai0 
  libtiff5 libtimedate-perl libtinfo5 libtk8.6 libtokyocabinet9 
  libtsan0 libubsan0 libudev1 libunbound-dev libunicode-utf8-perl 
  libunistring2 libunwind8 liburi-perl libusb-0.1-4 libusb-1.0-0 
  libutempter0 libuuid1 libvariable-magic-perl libvorbis0a 
  libvorbisenc2 libwayland-client0 libwayland-cursor0 libwayland-egl1 
  libwayland-egl1-mesa libwayland-server0 libwbclient0 
  libwind0-heimdal libwmf0.2-7 libwrap0 libwww-perl 
  libwww-robotrules-perl libx11-6 libx11-data libx11-dev libx11-doc 
  libx11-xcb1 libx86-1 libxau-dev libxau6 libxcb-dri2-0 libxcb-dri3-0 
  libxcb-glx0 libxcb-present0 libxcb-render0 libxcb-shape0 
  libxcb-shm0 libxcb-sync1 libxcb-xfixes0 libxcb1 libxcb1-dev 
  libxcomposite1 libxcursor1 libxdamage1 libxdmcp-dev libxdmcp6 
  libxext6 libxfixes3 libxft2 libxi6 libxinerama1 libxkbcommon0
  libxml-libxml-perl libxml-parser-perl libxml-sax-expat-perl 
  libxml-sax-perl libxml-simple-perl libxml2 libxmlrpc-core-c3 
  libxmlsec1 libxmlsec1-openssl libxmu6 libxmuu1 libxrandr2 
  libxslt1.1 libxss1 libxtables12 libxxf86dga1 libxxf86vm1 
  libyaml-0-2 libyaml-libyaml-perl libzstd1 licensecheck lintian 
  linux-base linux-firmware linux-headers-generic linux-libc-dev 
  lm-sensors locales login logrotate lsb-base lsb-release lshw lsof 
  ltrace lvm2 lynx lynx-common mailutils mailutils-common make 
  makedev man-db manpages manpages-dev mawk mdadm mime-support 
  mlocate modemmanager mosh motd-news-config mount mtr-tiny mutt 
  mysql-common nano ncdu ncurses-base ncurses-bin ncurses-term 
  neofetch net-tools netbase netcat-openbsd netdiscover nethogs 
  netplan.io network-manager network-manager-pptp networkd-dispatcher 
  nmap nmon ntfs-3g open-iscsi open-vm-tools openjdk-8-jdk 
  openjdk-8-jdk-headless openjdk-8-jre openjdk-8-jre-headless 
  openssh-client openssh-server openssh-sftp-server openssl os-prober 
  overlayroot p0f parted passwd pastebinit patch pciutils pcp 
  pcp-conf perl perl-base perl-openssl-defaults pinentry-gnome3 
  pkg-config plymouth plymouth-theme-ubuntu-text pm-utils pngquant 
  policykit-1 pollinate poppler-data poppler-utils popularity-contest 
  postfix powermgmt-base ppp pptp-linux printer-driver-gutenprint 
  procps psmisc publicsuffix python-apt-common python-asn1crypto 
  python-cffi-backend python-crypto python-cryptography 
  python-dateutil python-dbus python-dnspython python-enum34 
  python-gi python-httplib2 python-idna python-ipaddress 
  python-keyring python-matplotlib-data python-oauth 
  python-pkg-resources python-simplejson python-six 
  python-zope.interface python2.7 python2.7-minimal python3 
  python3-apport python3-apt python3-asn1crypto python3-attr 
  python3-automat python3-bottle python3-certifi python3-cffi-backend 
  python3-chardet python3-click python3-colorama 
  python3-commandnotfound python3-configobj python3-constantly 
  python3-cryptography python3-cycler python3-dateutil python3-dbus 
  python3-debconf python3-debian python3-distro-info 
  python3-distupgrade python3-distutils python3-docker 
  python3-dockerpycreds python3-gdbm python3-gi python3-gpg 
  python3-httplib2 python3-hyperlink python3-idna python3-incremental 
  python3-influxdb python3-lib2to3 python3-magic python3-matplotlib 
  python3-minimal python3-netifaces python3-newt python3-numpy 
  python3-olefile python3-openssl python3-pam python3-pcp python3-pil 
  python3-pkg-resources python3-ply python3-problem-report 
  python3-psutil python3-pyasn1 python3-pyasn1-modules 
  python3-pycryptodome python3-pycurl python3-pyparsing python3-pysmi 
  python3-pysnmp4 python3-pystache python3-requests 
  python3-requests-unixsocket python3-serial python3-service-identity 
  python3-six python3-software-properties python3-systemd python3-tk 
  python3-twisted python3-twisted-bin python3-tz python3-unidiff 
  python3-update-manager python3-urllib3 python3-websocket 
  python3-xdg python3-yaml python3-zope.interface qpdf 
  readline-common rename resolvconf rsync rsyslog rtorrent samba 
  samba-common samba-common-bin samba-dsdb-modules samba-libs 
  samba-vfs-modules sane-utils screen sed sensible-utils sgml-base 
  shared-mime-info smartmontools snap-confine snapd 
  software-properties-common sosreport squashfs-tools ssh-import-id 
  strace sudo systemd systemd-sysv sysvinit-utils t1utils tar tasksel 
  tasksel-data tcpd tcpdump tdb-tools telnet tmux tree tzdata 
  ubuntu-advantage-tools ubuntu-cloudimage-keyring 
  ubuntu-core-launcher ubuntu-keyring ubuntu-minimal ubuntu-mono 
  ubuntu-release-upgrader-core ubuntu-server ubuntu-standard ucf udev 
  ufw uidmap unattended-upgrades unrar unzip update-inetd 
  update-manager-core update-notifier-common uptimed usb-modeswitch 
  usb-modeswitch-data usbutils util-linux uuid-runtime vim vim-common 
  vim-runtime vim-tiny vlan vnstat w3m wamerican wdiff wget whiptail 
  wireless-regdb wireless-tools wpasupplicant x11-common x11-utils 
  x11proto-core-dev x11proto-dev xauth xdg-user-dirs xfsprogs 
  xkb-data xml-core xtrans-dev xxd xz-utils zerofree zlib1g 
```

After this I hit "y" to start the upgrade.

We're off! Hundreds of packages downloading at ~10-14MB/s. Wheeee!

```
Get:540 http://192.168.1.8/ubuntu focal/main amd64 python3-requests all 2.22.0-2ubuntu1 [47.1 kB]
Get:541 http://192.168.1.8/ubuntu focal-updates/main amd64 python3-urllib3 all 1.25.8-2ubuntu0.1 [88.3 kB]                             
Get:542 http://192.168.1.8/ubuntu focal/main amd64 python3-requests-unixsocket all 0.2.0-2 [7,272 B]                                   
Get:543 http://192.168.1.8/ubuntu focal-updates/main amd64 python3-apport all 2.20.11-0ubuntu27.16 [84.9 kB]                           
Get:544 http://192.168.1.8/ubuntu focal-updates/main amd64 apport all 2.20.11-0ubuntu27.16 [129 kB]                                    
Get:545 http://192.168.1.8/ubuntu focal/main amd64 libfl2 amd64 2.6.4-6.2 [11.5 kB]                                                    
Get:546 http://192.168.1.8/ubuntu focal/main amd64 at amd64 3.1.23-1ubuntu1 [38.7 kB]                                                  
Get:547 http://192.168.1.8/ubuntu focal/main amd64 gawk amd64 1:5.0.1+dfsg-1 [418 kB]                                                  
Get:548 http://192.168.1.8/ubuntu focal-updates/main amd64 bcache-tools amd64 1.0.8-3ubuntu0.1 [19.5 kB]                               
28% [Waiting for headers]                                                      14 MB/s 20s
```

The upgrade chugged along for a while, and once complete I had to reboot again, into the new release.

```
System upgrade is complete.

Restart required 

To complete the upgrade, a system restart is required. 
If you select 'y' the system will be restarted. 

Continue [yN] 
```

Boom! It worked

```bash
alan@robby:~$ lsb_release -a
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 20.04.2 LTS
Release:        20.04
Codename:       focal
```

Even better, the python script I had trouble with, which made me need to upgrade in the first place, works!