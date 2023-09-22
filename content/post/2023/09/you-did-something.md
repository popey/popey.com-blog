+++
date = "2023-09-22T16:00:00+01:00"
title = "You did something!"
slug = "2023/09/you-did-something"
author = "Alan Pope"
tags = ['tfts']
+++

This is the third in a series of [Tales From Tech Support](https://popey.com/blog/tags/tfts/). Some stories from the past featuring broken computers and even more broken tech support operatives - mostly me.

In the early 1990s, I worked as a contractor for a large, well-established accounting firm. In [It's MY monitor](/blog/2023/09/its-MY-monitor), I told the story of dealing with an angry Partner. Today's story is worse, as I'm dealing with the *Personal Assistant* of a Partner. 

## Our protagonist

A call came in from someone we'll call Susan because I don't remember her name. Susan called the helpdesk, but we were all out dealing with issues. The phones on the helpdesk were configured to ring around a 'hunt group' then, if nobody picked up, it would drop to voicemail so people could leave a message.

Susan left *multiple* messages.

I didn't have my own desk at the IT support area because I had no computer. I would be out dealing with issues all day, only returning to pick up my next job or parts I may need.

When I got back from completing a job, I was immediately dispatched to help Susan. They chose me because, at the time, I had a very sunny disposition, so it was expected I'd be able to cheerily calm Susan down while solving whatever issue she had.

*Narrator: This did not happen.*

Susan was based in a very sparsely populated section of the lower-ground floor in another building. I trekked out there, arriving mere minutes after I was first told of the problem.

## Unfriendly greetings

The walk from the stairs to her desk was along a very lengthy and vacant open-plan office. She started shouting out to me as soon as I entered the room. I couldn't hear her until I got closer.

> Susan: (shouting) "Where have you been!?"

> Me: "I came as soon as I got the call"

> Susan: "I've been calling all morning!!"

It was like 9:30AM.

> Me: "Okay, I'm here now, what can I do?"

Susan was the Personal Assistant to one of the Partners of the organisation. So in her eyes, any problem she had was as important if not *more* important, than anyone else's. 

> Susan: "Nothing is working, I can't get on, I can't do anything!"

> Me: "Okay, let's take a look"

Her PC was booted into [Windows 3.11](https://en.wikipedia.org/wiki/Windows_3.1x), the display was on, and the keyboard lights were lit. I gave the mouse a wiggle, and the cursor moved. The basics work. All good so far.

At this point, before I've actually done anything, Susan volunteers more information.

> Susan: "It's the network! John told me it's the network. Check the network! That's what John said!"

## Alice! (Who the F**k is Alice?)

> Me: "John?"

I don't know anyone on the helpdesk called John. 

> Susan: "Yes, you know, John, he sits near you guys."

After Susan had left messages on our voicemail, she started calling anyone who sat near the helpdesk, whether IT was their business or not. John was one of those people. Apparently, if you sit near the IT Support area, you're naturally a knowledgeable technical person. 

It seemed to me like John had given Susan a hand-wavy "Sounds like the network" catch-all answer after getting her call. He promised to alert the helpdesk, which he did. 

> Me: "Okay"

I stood up and wandered around the back of her PC. I saw all the cables were connected, with LEDs flashing in the right places. I bent down to lift the floor trap, and everything looked well seated there too. I couldn't see any physical problems.

> Me: "What exactly are you trying to do which isn't working?"

> Susan: "I can't login! I told you, nothing works!"

The files most users needed were typically held on shared network drives. Those drives were mapped to letters like `H:` and `S:`, but only after you'd logged into the network. Unlike modern operating systems, with our setup, you would log into the network resources after you get to the Windows desktop "Program Manager".

One quick and easy check for network connectivity was to look for a mapped network drive. Even *before* you logged to the network resources, there would always be a mapped `F:` drive. If there was no `F:` drive, then the network definitely wasn't connected.

So, I opened Windows File Manager. Along the top bar I could see `A`, `C` and `F`. Aha! There was indeed an `F:` drive mapped, so the network must have been up! 

*For those of you unfamiliar with Windows File Manager on Windows 3.11, here it is. Yes, I just took this photo on a Compaq laptop running MSDOS and Windows 3.11 that I have handy for these occasions. Apologies for any [moire](https://en.wikipedia.org/wiki/Moir%C3%A9_pattern) effect.*

[![Windows File Manager](/blog/images/2023-09-22/winfile.jpg)](/blog/images/2023-09-22/winfile.jpg)

*The above picture doesn't show the `F:` because I don't have that kind of network at home, sadly.*

## Daisy, daisy

Seeing the drive mapped on her PC made me think maybe she'd just tried logging in, and got her password wrong. I double-clicked the login application, which popped up a dialog box asking for the username and password. Her username, 'susanwhatever' was already filled in, and the password field was blank.

I was sitting at the PC, and Susan was standing over me, watching every move like a hawk, reminding me, *"It's the network, John said it's the network"* like a spiritual mantra.

> Me: "Can you type your password in, please?"

> Susan: "It's 'daisy', you do it."

*(I still remember to this day that her actual password was indeed 'daisy')*

I typed `d a i s y` and clicked the big `[Login]` button. 

Stuff started happening. The hard disk light flashed madly, and more drives got mapped. 

Great success!

> Me: "Ok, looks like it's all working now!"

> Susan: "What did you do?"

> Me: "Nothing actually"

> Susan: "You DID! I saw you do something down there on the floor!"

> Susan: "John said it was the network. You did something! What did you DO!?"

> Me: "Honestly, nothing."

## Don't say it

Then, I did something stupid. I said this:

> Me: "Is it possible you maybe just typed your password incorrectly?"

[![Big mistake](/blog/images/2023-09-22/pretty-woman-shopping.gif)](/blog/images/2023-09-22/pretty-woman-shopping.gif)

It was at this point, I knew I messed up. 

Susan raged at me. She shouted, called me a liar, told me I don't know how to do my job. She said I was the rudest IT Support person to ever visit her, and that I should never come and see her ever again. 


I learned a valuable lesson that day. 

*When the user **clearly** did something wrong, don't point it out.*

From then on, I would always wave away these things as *"Oh, the magic network pixies are working again"*, and move on.

## Epilog

I had such a poor impact on Susan that day, that she remembered it. Months later, she had an unrelated printer problem, and called the helpdesk. 

She specifically asked them not to send *"That grumpy guy you sent me last time!"*. Our Team Lead actually had to look back through the Lotus Notes database to figure out who it was, and didn't believe it was me. 

I was the only one available, so they sent me again. 

*"Oh no, not YOU!"* isn't a nice way to be greeted. Still, I sorted her problem again, and that was the last time I saw her.
