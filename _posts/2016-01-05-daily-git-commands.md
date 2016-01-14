---
layout: post
title: "GIT: Daily commands"
author: kamal
tags: git, tips
---

Git commands are massive and chances are, you only need a small subset of them in daily usages. So here are the common git commands that I used daily:-

Undo last commit:-

```
git reset HEAD~1
```

Abort merge:-

```
git merge --abort
```

Set color on output (by default git already use color but not on OSX):-

```
git diff --color
```

Show diff on index/staging area:-

```
git diff --cached # OR
git diff --staged
```

Delete all branch except master:-

```
git branch | grep -v master | xargs git branch -d
```

Use `-D` instead to force delete. Sometimes git refused to delete like this:-

```
error: The branch '41-messages-too-long' is not fully merged.
If you are sure you want to delete it, run 'git branch -D 41-messages-too-long'.
```

List commits on local but not yet on remote (kind of `hg outgoing`):-

```
git log origin/master..master
```
http://stackoverflow.com/questions/7624790/what-is-the-git-equivalent-of-of-hg-outgoing-hg-out-or-hg-incoming-hg-in
