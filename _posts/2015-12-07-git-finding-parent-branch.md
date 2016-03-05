---
layout: post
title: "GIT: Finding Parent Branch"
author: kamal
tags:
    - git
    - tips
---

When you create a branch in git, using command such as:-

```
git checkout -b branch1
```

Git will create the new branch based on our current branch, usually the master branch. But it possible at the time we created the branch, we're not on master branch. So to figure out what is the branch origin/parent, we can use this command:-

```
current_branch=`git rev-parse --abbrev-ref HEAD`
git show-branch -a | awk -F'[]^~[]' '/\*/ && !/'"$current_branch"'/ {print $2;exit}'
```

Reference - http://stackoverflow.com/questions/3161204/find-the-parent-branch-of-a-git-branch
