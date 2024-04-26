+++
date = "2024-04-26T09:00:00+00:00"
title = "Do you know Simone?"
slug = "2024/04/do-you-know-simone"
author = "Alan Pope"
tags = ['python', 'ai']
+++

Over coffee this morning, I stumbled upon [simone](https://github.com/rajtilakjee/simone), a fledgling Open-Source tool for repurposing YouTube videos as blog posts. The Python tool creates a text summary of the video and extracts some contextual frames to illustrate the text. 

A neat idea! In my experience, software engineers are often tasked with making demonstration videos, but other engineers commonly prefer consuming the written word over watching a video. I took simone for a spin, to see how well it works. Scroll down and tell me what you think! 

I was sat in front of my work laptop, which is a mac, so roughly speaking, this is what I did:

* Install host pre-requisites
```bash
$ brew install ffmpeg tesseract virtualenv
```
* Get [simone](https://github.com/rajtilakjee/simone)
```bash
git clone https://github.com/rajtilakjee/simone
```
* Get a free API key from [OpenRouter](https://openrouter.ai/)
* Put the API key in `.env`
```text
GEMMA_API_KEY=sk-or-v1-0000000000000000000000000000000000000000000000000000000000000000
```
* Install python requisites
```bash
$ cd simone
$ virtualenv .venv
$ source .venv/bin/activate
(.venv) $ pip install -r requirements.txt
```
* Run it!
```bash
(.venv) $ python src/main.py
Enter YouTube URL: https://www.youtube.com/watch?v=VDIAHEoECfM
/Users/alan/Work/rajtilakjee/simone/.venv/lib/python3.12/site-packages/whisper/transcribe.py:115: UserWarning: FP16 is not supported on CPU; using FP32 instead
  warnings.warn("FP16 is not supported on CPU; using FP32 instead")
Traceback (most recent call last):
  File "/Users/alan/Work/rajtilakjee/simone/.venv/lib/python3.12/site-packages/pytesseract/pytesseract.py", line 255, in run_tesseract
    proc = subprocess.Popen(cmd_args, **subprocess_args())
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/opt/homebrew/Cellar/python@3.12/3.12.3/Frameworks/Python.framework/Versions/3.12/lib/python3.12/subprocess.py", line 1026, in __init__
    self._execute_child(args, executable, preexec_fn, close_fds,
  File "/opt/homebrew/Cellar/python@3.12/3.12.3/Frameworks/Python.framework/Versions/3.12/lib/python3.12/subprocess.py", line 1955, in _execute_child
    raise child_exception_type(errno_num, err_msg, err_filename)
FileNotFoundError: [Errno 2] No such file or directory: 'C:/Program Files/Tesseract-OCR/tesseract.exe'

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "/Users/alan/Work/rajtilakjee/simone/src/main.py", line 47, in <module>
    blogpost(url)
  File "/Users/alan/Work/rajtilakjee/simone/src/main.py", line 39, in blogpost
    score = scores.score_frames()
            ^^^^^^^^^^^^^^^^^^^^^
  File "/Users/alan/Work/rajtilakjee/simone/src/utils/scorer.py", line 20, in score_frames
    extracted_text = pytesseract.image_to_string(
                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/alan/Work/rajtilakjee/simone/.venv/lib/python3.12/site-packages/pytesseract/pytesseract.py", line 423, in image_to_string
    return {
           ^
  File "/Users/alan/Work/rajtilakjee/simone/.venv/lib/python3.12/site-packages/pytesseract/pytesseract.py", line 426, in <lambda>
    Output.STRING: lambda: run_and_get_output(*args),
                           ^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/alan/Work/rajtilakjee/simone/.venv/lib/python3.12/site-packages/pytesseract/pytesseract.py", line 288, in run_and_get_output
    run_tesseract(**kwargs)
  File "/Users/alan/Work/rajtilakjee/simone/.venv/lib/python3.12/site-packages/pytesseract/pytesseract.py", line 260, in run_tesseract
    raise TesseractNotFoundError()
pytesseract.pytesseract.TesseractNotFoundError: C:/Program Files/Tesseract-OCR/tesseract.exe is not installed or it's not in your PATH. See README file for more information.
```
* [Oof](https://www.youtube.com/watch?v=3w-2gUSus34)!
* File a [bug](https://github.com/rajtilakjee/simone/issues/7) (like a good Open Source citizen)
* Locally patch the [file](https://github.com/rajtilakjee/simone/blob/main/src/utils/scorer.py#L15) and try again
```bash
(.venv) python src/main.py
Enter YouTube URL: https://www.youtube.com/watch?v=VDIAHEoECfM
/Users/alan/Work/rajtilakjee/simone/.venv/lib/python3.12/site-packages/whisper/transcribe.py:115: UserWarning: FP16 is not supported on CPU; using FP32 instead
  warnings.warn("FP16 is not supported on CPU; using FP32 instead")
```
* Look for results
```bash
(.venv) $ ls -l generated_blogpost.txt *.jpg
-rw-r--r--  1 alan  staff    2163 26 Apr 09:26 generated_blogpost.txt
-rw-r--r--@ 1 alan  staff  132984 26 Apr 09:27 top_frame_4_score_106.jpg
-rw-r--r--  1 alan  staff  184705 26 Apr 09:27 top_frame_5_score_105.jpg
-rw-r--r--  1 alan  staff  126148 26 Apr 09:27 top_frame_9_score_101.jpg
```
* [Drink your weak lemon drink now](https://youtu.be/a1xjcyyuDM0?si=co6zN_17UIb_3HB4&t=60)! (to wash away the foul taste of computer lies in your honest hobby gullet)

In my test I pointed simone at a short [demo video](https://www.youtube.com/watch?v=VDIAHEoECfM) from my employer, [Anchore's](https://anchore.com/) [YouTube channel](https://www.youtube.com/@Anchore). The results are below, with no editing, I even included the typos. The images at the bottom of this post are frames from the video that simone selected.

----

## Ancors Static Stick Checker Tool Demo: Evaluating and Resolving Security Findings

**Introduction**

Static stick checker tool helps developers identify security vulnerabilities in Docker images by running open-source security checks and generating remediation recommendations. This blog post summarizes a live demo of the tool's capabilities.

**How it works**

The tool works by:

* Downloading and analyzing the Docker image.
* Detecting the base operating system distribution and selecting the appropriate stick profile.
* Running open-source security checks on the image.
* Generating a report of identified vulnerabilities and remediation actions.


**Demo Walkthrough**

The demo showcases the following steps:

* **Image preparation:** Uploading a Docker image to a registry.
* **Tool execution:** Running the static stick checker tool against the image.
* **Results viewing:** Analyzing the generated stick results and identifying vulnerabilities.
* **Remediation:** Implementing suggested remediation actions by modifying the Dockerfile.
* **Re-checking:** Running the tool again to verify that the fixes have been effective.


**Key findings**

* The static stick checker tool identified vulnerabilities in the Docker image in areas such as:
    * Verifying file hash integrity.
    * Configuring cryptography policy.
    * Verifying file permissions.
* Remediation scripts were provided to address each vulnerability.
* By implementing the recommended changes, the security posture of the Docker image was improved.


**Benefits of using the static stick checker tool**

* Identify security vulnerabilities early in the development process.
* Automate the remediation process.
* Shift security checks leftward in the development pipeline.
* Reduce the burden on security teams by addressing vulnerabilities before deployment.


**Conclusion**

The Ancors static stick checker tool provides a valuable tool for developers to improve the security of their Docker images. By proactively addressing vulnerabilities during the development process, organizations can ensure their applications are secure and reduce the risk of security incidents

----

Here's the images it pulled out:

[![First image taken from the video](/blog/images/2024-04-26/top_frame_4_score_106.jpg)](/blog/images/2024-04-26/top_frame_4_score_106.jpg)

[![Second image taken from the video](/blog/images/2024-04-26/top_frame_5_score_105.jpg)](/blog/images/2024-04-26/top_frame_5_score_105.jpg)

[![Third image taken from the video](/blog/images/2024-04-26/top_frame_9_score_101.jpg)](/blog/images/2024-04-26/top_frame_9_score_101.jpg)

Not bad! It could be better - getting the company name wrong, for one! 

I can imagine using this to create a YouTube description, or use it as a skeleton from which a blog post could be created. I certainly wouldn't just pipe the output of this into blog posts! But so many videos need better descriptions, and this could help!