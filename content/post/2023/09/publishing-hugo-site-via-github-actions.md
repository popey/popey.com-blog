+++
date = "2023-09-27T10:00:00+01:00"
title = "Publishing Hugo site via GitHub Actions"
slug = "2023/09/publishing-hugo-site-via-github-actions"
author = "Alan Pope"
tags = ['hugo', 'blog', 'github', 'actions']
+++

My blog at [popey.com/blog](https://popey.com/blog/) is hosted on a [Bitfolk](https://bitfolk.com/) VPS, built from the [Hugo](https://gohugo.io/) source code in a public [GitHub repo](https://github.com/popey/popey.com-blog).

My workflow for publishing a post goes like this:

* 💻 Use whatever machine I'm sat at
* 🔽 Clone the repo
* 🗒 Add a new page, edit until ready
* 🤠 Push directly to the main branch 

Early on in my use of Hugo, I was manually using `hugo` and `rsync` over SSH directly on the VPS. Given I was publishing a post very infrequently, this process wasn't tremendously onerous. I typically have a terminal open nearby anyway, and it's only a couple of commands.

More recently I automated it with a poorly written shell-script running hourly on the VPS. It would just check if the repo had changed, clone it, build the site then `rsync` it into place. 

I figured it was about time (indeed, overdue) to do this properly with [GitHub Actions](https://github.com/features/actions). This enables me to push a blog post to GitHub and know it'll be published at some point soon after. This blog post covers what I did. 

## Gather secrets

There's a few 'secrets' we need to add to GitHub. First we collect the data, then we'll add it to GH a bit further down.

### SSH key

The GitHub Action runs in some kind of container and requires an SSH key to actually deploy onto the VPS. 

On my workstation, I generated a new SSH key with no passphrase. Here's what that looks like.

```text
mkdir ./gh-action
alan@ziggy:~$ mkdir ./gh-action
alan@ziggy:~$ ssh-keygen -f ./gh-action/id_rsa
Generating public/private rsa key pair.
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in ./gh-action/id_rsa
Your public key has been saved in ./gh-action/id_rsa.pub
The key fingerprint is:
SHA256:UYwyQgpJP25ibb78pDF348IvpRHm9CI+KnY+Fasu+9o alan@ziggy
The key's randomart image is:
+---[RSA 3072]----+
|oo ..    o.      |
|..... o ...      |
|  .o . o.        |
|  o .=   .       |
| o =+ = S        |
|. =. * o         |
|  .+=o=o         |
|.oo*B=o .        |
|o+XE+.+o         |
+----[SHA256]-----+
```

### User

Create a user which has access to ssh into the VPS and deploy the site to wherever it's hosted. Place the contents of the `id_rsa.pub` file generated above in `~/.ssh/authorized_hosts` for that user on the VPS.

### Host name

Make a note of the hostname of the VPS. For me that's `popey.com`.

### Path

Make a note of the path to wherever the site is deployed. For me that will be `/srv/popey.com/www/blog/`.

## Configure secrets

In the web interface for GitHub, within the repo for the blog, click "⚙ Settings" at the top. Click "Secrets and variables" on the left menu under "Security". Click "Actions" within that sub-menu.

Click "New repository secret", and enter details as below, but change for your host. After each entry, click "Add secret"


### DEPLOY_KEY

Paste the contents of the `id_rsa` file - the private part of the key generated above, in here.

### DEPLOY_HOST_IP

Set this to your hostname or IP. Mine is `popey.com`, yours will differ.

### DEPLOY_USER

This is the user on the VPS mentioned above, which has access to the deploy directory.

### DEPLOY_PATH

In my case, as above, that's `/srv/popey.com/www/blog/` (note the trailing slash).

## Configure Action

Now the secrets are in place, we can make the action. Go to the GitHub repo then click "▶️ Actions", then click "set up a workflow yourself →". Alternatively just create a new file called `/.github/workflows/deploy.yml` (the name isn't super important).

Here's the code I used in that yaml file.

```yaml
name: Hugo

on:
  push:
    branches:
      - main
  schedule:
    - cron: '47 * * * *'  # “At minute 47.”
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-22.04
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3
        with:
          submodules: false
          fetch-depth: 0

      - name: Install Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: '0.108.0'
          extended: false

      - name: Build Website
        run: hugo --minify

      - name: Install SSH Key
        uses: shimataro/ssh-key-action@v2
        with:
          key: ${{ secrets.DEPLOY_KEY }} 
          known_hosts: 'placeholder' # to make it work

      - name: Adding Known Hosts
        run: ssh-keyscan -H ${{ secrets.DEPLOY_HOST_IP }} >> ~/.ssh/known_hosts

      - name: Deploy with rsync
        run: rsync -avz --delete ./public/ ${{ secrets.DEPLOY_USER }}@${{ secrets.DEPLOY_HOST_IP }}:${{ secrets.DEPLOY_PATH }}
```

That's it. Save, and it should run. 

## YAML breakdown

But let's break it down.

This first section determines that the action will run whenever I push to the [main](https://github.com/popey/popey.com-blog/tree/main) branch. The action will also run periodically, in this case every hour, at fourty-seven minutes past. This is probably overkill, as it will re-deploy hourly whether I've changed anything or not. I may change this later. 

```yaml
on:
  push:
    branches:
      - main
  schedule:
    - cron: '47 * * * *'  # “At minute 47.”
  workflow_dispatch:
```

The section is where we start defining our deploy job. It's going to spin up an Ubuntu 22.04 container, in which it will checkout the latest state of the main branch.

```yaml
jobs:
  deploy:
    runs-on: ubuntu-22.04
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3
        with:
          submodules: false
          fetch-depth: 0
```

The container needs a copy of [Hugo](https://gohugo.io/), so we have detailed here that it's needed. I'm only using the basic version of Hugo, not the 'extended' version. 

```yaml
      - name: Install Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: '0.118.2'
          extended: false
```

I've specified the same version of Hugo as I have on my main workstation. 

```bash
alan@ziggy:~$ hugo version
hugo v0.118.2-da7983ac4b94d97d776d7c2405040de97e95c03d linux/amd64 BuildDate=2023-08-31T11:23:51Z VendorInfo=gohugoio
```

But I don't think it largely matters much, as I'm not using anything particularly advanced in Hugo itself.

The next section actually builds the site, having cloned it, and installed Hugo.

```yaml
      - name: Build Website
        run: hugo --minify
```

Next we add the ssh key to the container running, so we can then `rsync` over `ssh` to the host.

```yaml
      - name: Install SSH Key
        uses: shimataro/ssh-key-action@v2
        with:
          key: ${{ secrets.DEPLOY_KEY }} 
          known_hosts: 'placeholder' # to make it work
```

Now we add the ssh host key for my VPS to the container. Note this uses the secret for the hostname/IP of my VPS that we configured earlier.

```yaml
      - name: Adding Known Hosts
        run: ssh-keyscan -H ${{ secrets.DEPLOY_HOST_IP }} >> ~/.ssh/known_hosts
```

Finally we actually do the deployment. This uses the other three secrets to determine the username it connects to the VPS with, the hostname/IP and the path into which `rsync` puts the files.  

```yaml
      - name: Deploy with rsync
        run: rsync -avz --delete ./public/ ${{ secrets.DEPLOY_USER }}@${{ secrets.DEPLOY_HOST_IP }}:${{ secrets.DEPLOY_PATH }}
```

## Running it

All I have to do is push to the [main](https://github.com/popey/popey.com-blog/tree/main) branch, or edit any file in the repo to trigger this. 

I can click through to "▶️ Actions" in the repo to see the logs. 

[![Action run](/blog/images/2023-09-27/deploy.png)](/blog/images/2023-09-27/deploy.png)

Great success!