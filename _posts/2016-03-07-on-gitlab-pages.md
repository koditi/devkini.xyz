---
layout: post
title: This website now on GitLab Pages
author: kamal
tags:
    - git
    - gitlab
    - github
---

This is how the current setup:-

1. This website (devkini.xyz) is hosted on GitLab Pages.
1. The source repo still on Github - https://github.com/devkini/devkini.xyz
1. We use GitLab mirroring functionality to mirror the Github repo on GitLab - https://gitlab.com/devkini/devkini.xyz
1. Every hour, GitLab will check on Github if there's any new commits on the master branch.
1. If there's commit(s), GitLab will pull it and trigger a CI build.
1. The CI config for building this website - https://github.com/devkini/devkini.xyz/blob/master/.gitlab-ci.yml

The main difference between GitLab Pages and Github Pages is that the former use the integrated CI to build the page. This mean we're free to use whatever static site generator that we want instead of just limited to Jekyll on Github Pages. On top of that GitLab Pages also support HTTPS on custom domain ! You can see the new domain with ssl settings below:-

<img src="http://i.imgur.com/4OChECc.png"></img>

This of course require a browser/client with SNI support.
