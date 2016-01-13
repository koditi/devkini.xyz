---
layout: post
title: "Github: Notes and Lack of Search"
author: kamal
tags: github, git
---

It's been a while since we fully moved all our project repos (in svn) to Github. So I'll try to share our experiences so far. This is a work in progress so I'll keep adding more as we progress.

Search definitely lacking. You can only search through issues and code per repo only, or through all repos globally on Github, which useless for private repos. While commenting on commit and pull request are great for code review, unable to search it back is definitely an awful experience as that what make code review valuable when you trying to figure out the past on why certain thing being done in certain way.

The workaround for search as of now is to search your emails (if you enable notification). In our case, we're using Slack so we can use the following keywords:-

* "New comment on commit" <keyword> - code review search.
* "New comment on issue" <keyword> - issue search.

This [blog post](http://ariya.ofilabs.com/2012/08/github-and-lack-of-searchability.html) also talk in length on the lack of search issue.

<!--more-->

## Triangular Workflow
This work great so far except for a few hiccups but let's look at what it mean first. This diagram describe it well:-

<img src="https://cloud.githubusercontent.com/assets/1319791/8943755/5dcdcae4-354a-11e5-9f82-915914fad4f7.png"></img>
Image ref - https://github.com/blog/2042-git-2-5-including-multiple-worktrees-and-triangular-workflows

Most of our repos only writable by a few developers, which the rest of the team will need to fork and submit their changes through a Pull Request. Few of the hiccups I mentioned just now:-

* Collaboration between developers - When a developer submit a PR, other fellow dev might need to chip in some fixes and naturally, he would also submit a PR against the other developer's fork. But this making the workflow more complicated, not to mention the discussion now all over the place, instead in just one single PR. So for now what we did is require all developers to set their forks to be writable by entire team, so any developer that need to contribute will just need to clone the repo, and commit to the same branch, which would then appear in the same PR.
* Tagging release - When making release, developer need to make a tag but since they don't have write access to the canonical repo, that mean committing the tag to their fork. But at the same time, there's no PR kind of thing for tag, so they have to manually inform the repo maintainer to fetch new tags from their fork, which really prone to human error - forgotten.
