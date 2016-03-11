---
layout: post
title: Git stash usecase
author: kamal
tags:
    - git
---

So someone asked in our Telegram group about `git stash`. Stash definitely is one of my favorite command in git. Like it so much that while I was still working with svn, I looked for an svn equivalent, [`svn stash`][svn-stash] !

<img src="http://i.imgur.com/D9n8iip.png">

Stash is great when you need to keep aside first what you're working right now, without having to make it into the history. This is the difference with branch, as someone might ask - why don't just use a branch ? With branch, you have to commit the stuff and it permanently recorded in the history, unless you use something like rebase later on for merging.

One of the question in the discussion was, when running `git stash`, what happen to the file already added to the index but not yet committed ? So I looked into the manual and answered this:-

<!--more-->

<img src="http://i.imgur.com/gNQBF5J.png">

Then I did some test:-

```
> git diff
diff --git a/README.txt b/README.txt
index ce01362..94954ab 100644
--- a/README.txt
+++ b/README.txt
@@ -1 +1,2 @@
 hello
 +world
 kamal@Kamal-no-MacBook-Air~/test-stash
 > git add README.txt
 kamal@Kamal-no-MacBook-Air~/test-stash
 > git diff --cached
 diff --git a/README.txt b/README.txt
 index ce01362..94954ab 100644
 --- a/README.txt
 +++ b/README.txt
 @@ -1 +1,2 @@
  hello
  +world
  kamal@Kamal-no-MacBook-Air~/test-stash
  > git stash
  Saved working directory and index state WIP on master: 5ae203d initial
  HEAD is now at 5ae203d initial
  kamal@Kamal-no-MacBook-Air~/test-stash
  > git diff --cached
  kamal@Kamal-no-MacBook-Air~/test-stash
  >
```

`git stash --keep-index` - so yang dah add stay in index, when the guy come back he can commit that.

```
> git add README.txt
kamal@Kamal-no-MacBook-Air~/test-stash
> git stash --keep-index
Saved working directory and index state WIP on master: 5ae203d initial
HEAD is now at 5ae203d initial
kamal@Kamal-no-MacBook-Air~/test-stash
> git diff --cached
diff --git a/README.txt b/README.txt
index ce01362..94954ab 100644
--- a/README.txt
+++ b/README.txt
@@ -1 +1,2 @@
 hello
 +world
```

Notice the changes still in index after stash.

### Should you use stash as backup ?

Definitely no, shouldn't use stash as backup, that definitely an abuse of the feature.

<img src="http://i.imgur.com/K5CESX9.png">

> Rule of thumb - stash should always been used in single session. If you need to get back at it later - use branch.

[svn-stash]:http://blog.xoxzo.com/2012/03/09/svn-stash/
