---
layout: post
title: Phoenix Authorization Library
author: farisamali
tags:
    - phoenix
    - elixir
    - erlang
    - authorization
summary: >
            An initial release of authorization library we're developing for Phoenix framework.
---

Currently we are developing an [authorisation library][1] for [Phoenix framework][2]. We find our approach seems to be intuitive for us compared to the other libs out there. Feel free to try it out and maybe consider contributing to this lib, we wish for the lib to be able to do granular resource authorisation in the future  but still mantain the simple API.

Some little quick explanation about what the library is:-

* Its a resource authorisation lib, while oauth is authentication, that deals with identifying the identity of a user, either by their password hash/salt combo or oauth tokens. This lib goes after authentication. This lib works in the controller layer. The idea is that each time an authenticated connection comes through, we authorise it against our model and we can get a selective/filtered resource.
* One use case here is, when you are dealing with streams you have data coming over time. Each time data arrives to your controller, you can granularly check against your model and determine if its authorised or not. Imagine in a chat channel for example, if lets say user A and B has elevated privilege, they can communicate in the same channel without others with elevated permissions seeing the message because they are not authorised to do so.
* Another example is receiving mqtt messages from a broker, broker publishes message and our backend needs to subscribe to it. If we have few devices publishing to the broker, our controller can just filter the device id with the current user registered device id for example and they will only receive data from that device only.

Phoenix framework and maybe even Elixir itself is not widely used yet and we plan to have more friendly introduction of it. Just stay tune to this blog for more upcoming Phoneix and Elixir posts.

[1]:https://github.com/127labs/can/
[2]:http://www.phoenixframework.org/
