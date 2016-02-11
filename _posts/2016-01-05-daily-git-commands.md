---
layout: post
title: "GIT: Daily commands"
author: kamal
tags: git, tips
---

Git commands are massive and chances are, you only need a small subset of them in daily usages. So here are the common git commands that I used daily:-

### Undo last commit

```
git reset HEAD~1
```

### Abort merge

```
git merge --abort
```

### Set color on output (by default git already use color but not on OSX):-

```
git diff --color
```

### Show diff on index/staging area

```
git diff --cached # OR
git diff --staged
```

### Delete all branch except master:-

```
git branch | grep -v master | xargs git branch -d
```

### Use `-D` instead to force delete. Sometimes git refused to delete like this

```
error: The branch '41-messages-too-long' is not fully merged.
If you are sure you want to delete it, run 'git branch -D 41-messages-too-long'.
```

### List commits on local but not yet on remote (kind of `hg outgoing`)

```
git log origin/master..master
```
http://stackoverflow.com/questions/7624790/what-is-the-git-equivalent-of-of-hg-outgoing-hg-out-or-hg-incoming-hg-in

### Git add patch (`git add -p`) I think is pretty well known but I've just discovered one of it's very handy option

```
Stage this hunk [y,n,q,a,d,/,K,g,e,?]? s
y - stage this hunk
n - do not stage this hunk
q - quit; do not stage this hunk nor any of the remaining ones
a - stage this hunk and all later hunks in the file
d - do not stage this hunk nor any of the later hunks in the file
g - select a hunk to go to
/ - search for a hunk matching the given regex
j - leave this hunk undecided, see next undecided hunk
J - leave this hunk undecided, see next hunk
k - leave this hunk undecided, see previous undecided hunk
K - leave this hunk undecided, see previous hunk
s - split the current hunk into smaller hunks
e - manually edit the current hunk
? - print help
```
So the proposed hunk might contain 2 unrelated changes you don't want to commit together. The `s` option allow you to split the hunk into much smaller hunk.

### Stash untracked files

```
git stash save -u
```
