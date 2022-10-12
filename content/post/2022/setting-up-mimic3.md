+++
date = "2022-10-12T12:00:00-00:00"
title = "Setting Up Mimic 3"
slug = "2022/10/setting-up-mimic3"
author = "Alan Pope"
tags = ['accessibility', 'tts', 'mycroft', 'mimic3']
+++

{{< rawhtml >}}
    <audio controls src="/blog/audio/audio_2022-10-12_10-55-04.mp3"><a href="/blog/audio/audio_2022-10-12_10-55-04.mp3">Download audio</a></audio>
{{< /rawhtml >}}

Yesterday I [blogged](/blog/2022/10/blog-to-speech-in-my-voice/) about using Mycroft AI's Mimic 3, an Open Source Text-to-Speech engine I used to generate audio of a blog post.

One thing I didn't mention, which might be useful, is how to setup Mimic 3. It's pretty straightforward, so here we go.

The Mimic 3 developers have some [releases](https://github.com/MycroftAI/mimic3/releases) over on their [mimic3 GitHub repo](https://github.com/MycroftAI/mimic3), which include deb packages. If you want the easy way, maybe use those, but I wanted to try the latest and greatest, so I grabbed the latest master branch.

## Pre-requisites

On my laptop I'm using Kubuntu Kinetic Kudu, a development release of Kubuntu which will become 22.10 sometime soon. Mimic 3 setup uses a Python venv (virtual environment), so I needed to install one additional package.

```bash
$ sudo apt install python3.10-venv
```

That package will almost certainly differ on your system if you're not on Kubuntu Kinetic Kudu (22.10). 

## Get the code

I grabbed the code from GitHub using a git clone, but there's also a tarball you could grab, and unpack.

```bash
$ mkdir ~/Source/mycroftai
$ cd mycroftai
$ git clone https://github.com/MycroftAI/mimic3
```

## Install Mimic 3

Installing mimic is simplified via one command. 

```bash
$ cd mimic3
$ ./install.sh
```

The output from that looks like this:

```bash
Creating virtual environment at /home/alan/Source/mycroftai/mimic3/.venv (Python 3.10.7)
Installing Python dependencies
Looking in links: /home/alan/Source/mycroftai/mimic3/wheels, https://synesthesiam.github.io/prebuilt-apps/
Requirement already satisfied: pip in ./.venv/lib/python3.10/site-packages (22.2)
Collecting pip
  Downloading pip-22.2.2-py3-none-any.whl (2.0 MB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 2.0/2.0 MB 5.7 MB/s eta 0:00:00
Installing collected packages: pip
  Attempting uninstall: pip
    Found existing installation: pip 22.2
    Uninstalling pip-22.2:
      Successfully uninstalled pip-22.2
Successfully installed pip-22.2.2
⋮
```

It ends like this:

```bash
⋮
Successfully built espeak-phonemizer gruut phonemes2ids gruut-ipa gruut_lang_de gruut_lang_en gruut_lang_es gruut_lang_fa gruut_lang_fr gruut_lang_it gruut_lang_nl gruut_lang_ru gruut_lang_sw nltk unicodecsv docopt libwapiti editdistance
Installing collected packages: xdgenvpy, unicodecsv, pytz, python-crfsuite, phonemes2ids, mypy-extensions, munkres, mpmath, gruut_lang_sw, gruut_lang_ru, gruut_lang_nl, gruut_lang_it, gruut_lang_fr, gruut_lang_fa, gruut_lang_es, gruut_lang_en, gruut_lang_de, flatbuffers, espeak-phonemizer, docopt, urllib3, tzdata, typing-extensions, tqdm, toml, sympy, six, regex, PyYaml, pyparsing, protobuf, priority, numpy, num2words, networkx, markupsafe, marisa-trie, itsdangerous, idna, hyperframe, humanfriendly, hpack, h11, gruut-ipa, editdistance, click, charset-normalizer, certifi, blinker, Babel, aiofiles, wsproto, werkzeug, typing-inspect, requests, pytz-deprecation-shim, python-dateutil, panphon, packaging, nltk, libwapiti, jsonlines, jinja2, h2, coloredlogs, tzlocal, swagger-ui-py, onnxruntime, marshmallow, hypercorn, hazm, epitran, quart, marshmallow-enum, dateparser, quart-cors, gruut, dataclasses-json, mycroft-mimic3-tts
  Running setup.py develop for mycroft-mimic3-tts
Successfully installed Babel-2.10.3 PyYaml-6.0 aiofiles-22.1.0 blinker-1.5 certifi-2022.9.24 charset-normalizer-2.1.1 click-8.1.3 coloredlogs-15.0.1 dataclasses-json-0.5.7 dateparser-1.1.1 docopt-0.6.2 editdistance-0.6.0 epitran-1.17 espeak-phonemizer-1.1.0 flatbuffers-22.9.24 gruut-2.3.4 gruut-ipa-0.13.0 gruut_lang_de-2.0.0 gruut_lang_en-2.0.0 gruut_lang_es-2.0.0 gruut_lang_fa-2.0.0 gruut_lang_fr-2.0.2 gruut_lang_it-2.0.0 gruut_lang_nl-2.0.2 gruut_lang_ru-2.0.0 gruut_lang_sw-2.0.0 h11-0.14.0 h2-4.1.0 hazm-0.7.0 hpack-4.0.0 humanfriendly-10.0 hypercorn-0.14.3 hyperframe-6.0.1 idna-3.4 itsdangerous-2.1.2 jinja2-3.1.2 jsonlines-1.2.0 libwapiti-0.2.1 marisa-trie-0.7.7 markupsafe-2.1.1 marshmallow-3.18.0 marshmallow-enum-1.5.1 mpmath-1.2.1 munkres-1.1.4 mycroft-mimic3-tts-0.2.3 mypy-extensions-0.4.3 networkx-2.8.7 nltk-3.3 num2words-0.6.0 numpy-1.23.3 onnxruntime-1.12.1 packaging-21.3 panphon-0.20.0 phonemes2ids-1.2.2 priority-2.0.0 protobuf-4.21.7 pyparsing-3.0.9 python-crfsuite-0.9.8 python-dateutil-2.8.2 pytz-2022.4 pytz-deprecation-shim-0.1.0.post0 quart-0.18.3 quart-cors-0.5.0 regex-2022.3.2 requests-2.28.1 six-1.16.0 swagger-ui-py-21.12.8 sympy-1.11.1 toml-0.10.2 tqdm-4.64.1 typing-extensions-4.4.0 typing-inspect-0.8.0 tzdata-2022.4 tzlocal-4.2 unicodecsv-0.14.1 urllib3-1.26.12 werkzeug-2.2.2 wsproto-1.2.0 xdgenvpy-2.3.5
~/Source/mycroftai/mimic3
OK
```

## Start Mimic 3

First enter the virtual environment:

```bash
$ source .venv/bin/activate
```

Launch the Mimic 3 server:

```bash
(.venv) $ mimic3-server
```

The output looks a bit like this:

```bash
INFO:mimic3_http.__main__:Starting web server
[2022-10-11 09:01:07 +0100] [441199] [INFO] Running on http://0.0.0.0:59125 (CTRL + C to quit)
INFO:hypercorn.error:Running on http://0.0.0.0:59125 (CTRL + C to quit)
```

## Use Mimic 3

Point your browser at the URL displayed. From there, you can select a language, and voice, type some text and mash the "Speak" button. 

![Mimic 3 web UI](/blog/images/2022-10-11/mimic3.png)

You'll see this in your terminal, as Mimic 3 downloads the files for whatever language and voice you selected.

```bash
ALIASES: 100%|█████████████████████████████████████████████████| 27.0/27.0 [00:00<00:00, 101kB/s]
LICENSE: 100%|█████████████████████████████████████████████████| 46.0/46.0 [00:00<00:00, 244kB/s]
README.md: 100%|█████████████████████████████████████████████████| 8.52k/8.52k [00:00<00:00, 9.15MB/s]
README.md.in: 100%|█████████████████████████████████████████████████| 155/155 [00:00<00:00, 652kB/s]
SOURCE: 100%|█████████████████████████████████████████████████| 18.0/18.0 [00:00<00:00, 94.0kB/s]
VERSION: 100%|█████████████████████████████████████████████████| 6.00/6.00 [00:00<00:00, 10.5kB/s]
config.json: 100%|█████████████████████████████████████████████████| 3.41k/3.41k [00:00<00:00, 5.63MB/s]
generator.onnx: 100%|█████████████████████████████████████████████████| 59.9M/59.9M [00:05<00:00, 10.6MB/s]
phoneme_map.txt: 100%|█████████████████████████████████████████████████| 15.0/15.0 [00:00<00:00, 68.0kB/s]
phonemes.txt: 100%|█████████████████████████████████████████████████| 263/263 [00:00<00:00, 442kB/s]
INFO:mimic3_tts.tts:Loaded voice from /home/alan/.local/share/mycroft/mimic3/voices/en_UK/apope_low
```

Then you'll get an audio file embedded in the page which can be played directly, or downloaded as a WAV file.

The only slight fly in the ointment is there is currently a [bug](https://github.com/MycroftAI/mimic3/issues/23) where if you hit the `/api/voices` endpoint, it breaks Mimic 3. So don't do that, or contribute a fix to the bug instead ;)

Other than that, it's pretty neat and quick to get setup and running.