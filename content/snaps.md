+++
title = "popey snaps"
date =  2024-03-15T18:16:44Z
author = "Alan Pope"
description = "popeys snap status"
+++

## popey's snap status

I maintain [a few](https://snapcraft.io/publisher/popey) snaps in the [Snap Store](https://snapcraft.io). This page is generated periodically so I can keep an eye on the updatedness of each one. The script isn't perfect, and doesn't monitor them all. It's a whole thing I need to maintain and update. 

The list is sorted by the "OK" column which either has a ✔ or ✖ to give a rough indication if the snap needs updating. This whole page is mostly just for my reference. 

### 2024-03-15T18:16:44Z
| Snap | Stable | Edge | Upstream | OK? |
| - | - | - | - | - |
| [Azimuth](https://snapcraft.io/azimuth) | v1.0.3 | v1.0.3 | v1.0.3 | ✔ |
| [Bandwhich](https://snapcraft.io/bandwhich) | v0.22.2.5f5cc7e | v0.22.2.23d1879 | v0.22.2 | ✔ |
| [Defold](https://snapcraft.io/defold) | 1.7.0 | ^ | 1.7.0 | ✔ |
| [Dog](https://snapcraft.io/dog) | v0.1.0 | v0.1.0 | v0.1.0 | ✔ |
| [DOSBox-Staging](https://snapcraft.io/dosbox-staging) | v0.81.0 | v0.81.0 | v0.81.0 | ✔ |
| [DynaHack](https://snapcraft.io/dynahack) | v0.6.0 | v0.6.0 | v0.6.0 | ✔ |
| [emu2](https://snapcraft.io/emu2) | v2021.01 | v2021.01 | v2021.01 | ✔ |
| [Fab-Agon-Emulator](https://snapcraft.io/fab-agon-emulator) | 0.9.34 | 8043065 | 0.9.34 | ✔ |
| [Forgejo](https://snapcraft.io/forgejo) | v1.21.7-0 | ^ | v1.21.7-0 | ✔ |
| [halloy](https://snapcraft.io/halloy) | 2024.3.bc4416a | 2024.3.ea3ff04 | 2024.3 | ✔ |
| [iamb](https://snapcraft.io/iamb) | v0.0.8 | v0.0.8 | v0.0.8 | ✔ |
| [Ladder](https://snapcraft.io/ladder) | v0.0.21.3918cf3 | v0.0.21.3918cf3 | v0.0.21 | ✔ |
| [MAME](https://snapcraft.io/mame) | mame0263 | mame0263-221-gf65fb7586d9 | mame0263 | ✔ |
| [MatterBridge](https://snapcraft.io/matterbridge) | v1.26.0 | v1.26.0 | v1.26.0 | ✔ |
| [Mindustry](https://snapcraft.io/mindustry) | v146 | v146 | v146 | ✔ |
| [Monolith](https://snapcraft.io/monolith) | v2.8.1 | v2.8.1 | v2.8.1 | ✔ |
| [ncspot](https://snapcraft.io/ncspot) | v1.1.0 | v1.1.0 | v1.1.0 | ✔ |
| [Pencil](https://snapcraft.io/pencil) | 3.1.1 | ^ | 3.1.1 | ✔ |
| [PioneerSpaceSimulator](https://snapcraft.io/pioneer) | 20240314 | 20240314 | 20240314 | ✔ |
| [Rustscan](https://snapcraft.io/rustscan) | 2.1.1 | 2.1.1 | 2.1.1 | ✔ |
| [Session-Desktop](https://snapcraft.io/session-desktop) | v1.12.0 | v1.12.0 | v1.12.0 | ✔ |
| [Shattered-Pixel-Dungeon](https://snapcraft.io/shattered-pixel-dungeon) | v2.3.2 | v2.3.2 | v2.3.2 | ✔ |
| [Spot](https://snapcraft.io/spot) | 0.4.0 | 0.4.0 | 0.4.0 | ✔ |
| [Toot](https://snapcraft.io/toot) | 0.42.0 | 0.42.0 | 0.42.0 | ✔ |
| [TwineJS](https://snapcraft.io/twinejs) | 2.8.1 | 2.8.1 | 2.8.1 | ✔ |
| [B2](https://snapcraft.io/b2) | 20231011-172305-4bd1939 | 20231011-172305-4bd1939 | 20240117-221907-230624c | ✖ |
| [BombSquad](https://snapcraft.io/bombsquad) | 1.7.28 | 1.7.30 | 1.7.33 | ✖ |
| [ClassiCube](https://snapcraft.io/classicube) | 1.3.6 | 1.3.6 | - | ✖ |
| [emoj](https://snapcraft.io/emoj) | v3.3.0.e60099d | v3.3.0.e60099d | v4.0.1 | ✖ |
| [Lapin](https://snapcraft.io/lapin) | a6b34c9 | ^ | - | ✖ |
| [Libation](https://snapcraft.io/libation) | 11.1.0 | ^ | v11.3.6 | ✖ |
| [SpectrumAnalyser](https://snapcraft.io/spectrum-analyser) | -- | v0.2.0-alpha-master | v0.2.0-alpha | ✖ |
| [Telegram-Asahi](https://snapcraft.io/telegram-asahi) | 4.15.2      | 4.15.2 | v4.15.2 | ✖ |

### Notes

Some notes about specific apps and why they may not looks like they're updated.

* [b2](https://snapcraft.io/b2): 
* [BombSquad](https://snapcraft.io/bombsquad): In newer versions the upstream ships a some newer libraries which conflict. This may need to wait for core24
* [ClassiCube](https://snapcraft.io/classicube): Need to fix the script to get the upstream version correctly.
* [Defold](https://snapcraft.io/defold): I'm only shipping stable releases in the snap, not alpha/beta releases.
* [emoj](https://snapcraft.io/emoj): Build error in npm on later releases need investigation.
* [Libation](https://snapcraft.io/libation): I'm only shipping stable releases in the snap, not pre-release versions. 
* [Telegram Asahi](https://snapcraft.io/telegram-asahi): Currently manually built in a fresh LXD container for each release, on my MacBook Air. I do keep an eye on upstream but sometimes there's a little delay
