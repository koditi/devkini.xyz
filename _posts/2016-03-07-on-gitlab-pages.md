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
1. We use GitLab mirroring functionality to mirror the Github repo on GitLab.
1. Every hour, GitLab will check on Github if there's any new commits on the master branch.
1. If there's commit(s), GitLab will pull it and trigger a CI build.
1. The CI config for building this website - https://github.com/devkini/devkini.xyz/blob/master/.gitlab-ci.yml
