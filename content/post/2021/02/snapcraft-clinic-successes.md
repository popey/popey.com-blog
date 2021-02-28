+++
date = "2021-02-27T12:00:00-00:00"
title = "Snapcraft Clinic Successes"
slug = "2021/02/snapcraft-clinic-successes"
author = "Alan Pope"
tags = ['software', 'linux', 'snap', 'snapcraft']
+++

On Thursday I [mentioned](/blog/2021/02/snapcraft-clinic/) we were restarting the [Snapcraft Clinic](https://forum.snapcraft.io/t/snapcraft-clinic/20166/1?u=popey). Basically we stand up a regular video call with engineers from the snap and snapcraft team & us from Snap Advocacy. Developers of applications and publishers of snaps are invited to join to troubleshoot. 

There was nothing especially secret or private discussed, but as we don't record or stream the calls, and I don't have direct permission to mention the applications or people involved, so I'll keep this a little vague. In future I think we should ask permission and record the outcomes of the calls. 

We had a few productive discussions. One developer brought an application which they'd requested `classic` confinement for, and wished to discuss the options for confinement. We had a rather lengthy open discussion about the appropriateness of the available options. The developer was offered some choices, including making changes to their application to accomodate confinement, and another was (as always) *not* to snap the application. They appreciated our openness in terms of accepting that there are limitations with all software, and not everything always makes sense to be packaged as a snap, at the moment.

We also had a productive discusison with a representative of a group responsible for publishing multiple snaps. They had difficulties with a graphical snapped application once it had been updated to use `core20`. The application would launch and almost immediately segfault. As the application was already published in the Snap Store, in a non-stable channel, we were all able to install it to test on our own systems. 

In this case the application launched fine on some systems but not others. The common problem being with systems running on nVidia GPUs actually (amusingly) could run the application fine, but those running on Intel or AMD GPUs experienced the segfault. With a little investigation we worked to improve the snap packaging definition used by the developer, and began rebuilding the application.

As this compile took a little while, it was possible to answer a bunch of questions from others in the meeting. Having an "in-person" meeting like this where developers can rattle through a number of questions directly to developers is great. They get answers to their questions and we're able to understand where our documentation is missing crucial pieces.

Once the build was finished, we were able to test the failing application and it worked. It was a really great way to end the week. Productive discussions, actions for us to improve our documentation, and successful debugging. I'm looking forward to the next one.