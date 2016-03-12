---
layout: post
title: CNAME Pattern and CloudFlare CNAME Flattening
author: kamal
tags:
    - cloudflare
    - dns
    - aws
---

One common pattern when hosting website with third party hosting is that to abstract out the location of the server(s). This come out for a number of purpose, from simply as some convenience to achieving high scalability of the website. For example when using AWS Elastic Load Balancer (ELB), the approach is to point the website's domain name as a CNAME to ELB's endpoint domain:-

```
www.mysite.com  CNAME   elb-01.us-east-1.elb.amazonaws.com
```

This allow the actual IP address returned to the user being handled by the AWS infrastructure, in more scalable fashion.

Or look at how serving website using Github Pages:-

```
www.mysite.com  CNAME mysite.github.io
```

<!--more-->

So here the actual IP address for www.mysite.com will be take care by Github. One problem with all this kind of setup is that we only restricted to the subdomain, such as `www` above. We can't have the root domain `mysite.com` as the domain of our website. It's really terrible and in the beginning, people have to resort to using some ugly workaround such as having a separate server that will simply do 301 permanent redirect from `mysite.com` to `www.mysite.com`.

There's even a service that doing this so that you don't have to setup your own server, such as wwwizer.com. Another workaround people did is to constantly updating their dns record using cron job so that the root domain will contain A record with latest IP address returned by the third party CNAME. Less than ideal solution is to simply provide a fix list of IP address that user can use for their root domain A record. Blogger.com for example using this approach.

Now most DNS provider already providing sort of alias record such as ANAME or ALIAS, which not really a standard but the same cron job workaround but now done at the dns provider itself instead of at user's own infrastructure. AWS Route 53 allow you to define an alias record for the root domain, pointing to AWS services such as S3 or ELB. Picture below show example of Route 53 interface to add an alias record.

<img src="http://i.imgur.com/KwqWeRT.png">

CloudFlare also come up with what they call CNAME flattening. With a typical CNAME, when user query the dns server for a particular subdomain, the dns server will return the CNAME record which user's dns resolver need to make another query to get the actual IP address.

```
host www.devkini.xyz
www.devkini.xyz is an alias to devkini.gitlab.io
devkini.gitlab.io has address 104.24.106.62
```

But with CNAME flattening, user will immediately get the IP address of the subdomain:-

```
host devkini.xyz
devkini.xyz has address 104.24.106.62
devkini.xyz has address 104.24.107.62
```
