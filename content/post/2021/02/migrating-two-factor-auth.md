+++
date = "2021-02-17T12:00:00-00:00"
title = "Migrating Two Factor Auth"
slug = "2021/02/migrating-two-factor-auth"
author = "Alan Pope"
tags = ['software', 'security', 'android', '2fa', 'aegis']
+++

I use a ton of services which either require or recommend [2fa](https://en.wikipedia.org/wiki/Multi-factor_authentication) as part of the authentication process. I used to use "[Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2)" then more recently "[Authenticator Plus](https://play.google.com/store/apps/details?id=com.mufri.authenticatorplus)". However Authenticator Plus seems to be no longer maintained. So while I have no problems with it, I think it is time to migrate to something else.

Step up, [Aegis Authenticator](https://getaegis.app/), a free, [open source](https://github.com/beemdevelopment/Aegis) authenticator app, available on the [play store](http://play.google.com/store/apps/details?id=com.beemdevelopment.aegis), and [F-Droid](https://f-droid.org/app/com.beemdevelopment.aegis). 

Migration was a cinch! Aegis can import the password-protected zip file backup exports created by Authenticator Plus. So I did was open Authenticator Plus, go to Menu -> Settings -> Backup & Restore -> Export as Text and HTML. I entered a unique password, which is used to encrypt the zip file in which the backup is put. Once I clicked "Ok" I then found somewhere to stash the zip file.

Over in Aegis I went through the initial setup wizard, then use **⋮** -> Settings -> Import from file -> Authenticator Plus. I'm then promted to find the zip file, enter the encryption password I used in the export step, and select which services to import, or import all. 

That's it, all done. A super smooth and simple process for migrating from one 2fa app to another. As a bonus there's an [aegis-icons](https://github.com/aegis-icons/aegis-icons) repo which contains unofficial icons that can be attached to each service in Aegis. 

Overall I'm very happy with the result. 