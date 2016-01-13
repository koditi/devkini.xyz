---
layout: post
title: "Github: Notes and Lack of Search"
author: kamal
tags: github, git
---

It's been a while since we fully moved all our project repos (in svn) to Github. So I'll try to share our experiences so far.

Search definitely lacking. You can only search through issues and code per repo only, or through all repos globally on Github, which useless for private repos. While commenting on commit and pull request are great for code review, unable to search it back is definitely an awful experience as that what make code review valuable when you trying to figure out the past on why certain thing being done in certain way.

The workaround for search as of now is to search your emails (if you enable notification). In our case, we're using Slack so we can use the following keywords:-

* "New comment on commit" <keyword> - code review search.
* "New comment on issue" <keyword> - issue search.

This [blog post](http://ariya.ofilabs.com/2012/08/github-and-lack-of-searchability.html) also talk in length on the lack of search issue.
