---
layout: post
title: "Git: Merge Unrelated Repos"
author: kamal
tags: git
---

So I have this repo - `git@github.com:k4ml/k4ml.github.io.git` and I want to merge
it with `git@github.com:barryclark/jekyll-now.git`. Both repos are not related.

```
git clone git@github.com:k4ml/k4ml.github.io.git
cd k4ml.github.io
git pull -s recursive -X theirs git@github.com:barryclark/jekyll-now.git master
```

You'll see a warning about no common commits but the merge proceed:-

```
warning: no common commits
remote: Counting objects: 1257, done.
remote: Total 1257 (delta 0), reused 0 (delta 0), pack-reused 1257
Receiving objects: 100% (1257/1257), 8.17 MiB | 1.09 MiB/s, done.
Resolving deltas: 100% (698/698), done.
From github.com:barryclark/jekyll-now
 * branch            master     -> FETCH_HEAD
 Auto-merging index.html
 Auto-merging about.md
 Auto-merging README.md
```

The `theirs` merge strategy option mean if there's conflict (similar filename for example), the incoming
version will be used.

I'd first seen this being used in [Openshift example](https://github.com/openshift/django-example).
