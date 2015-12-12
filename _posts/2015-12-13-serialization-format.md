---
layout: post
title: Serialization Format (When JSON Not Good Enough)
author: angch
tags: json
---

This is an excerpt from a discussion in [#devkini][1] Telegram group, so if you have something more to say on this topic, heads up to the [group][1] to share your thought.

[1]:https://telegram.me/joinchat/ACIF0AHECE3dGeOPeqM8zw

JSON is a *de-facto* format to use when transferring structured data over the network. But what if you need more than JSON can offer, such as faster serialization/de-serialization, efficient bandwidth usage or backward compatible data schema ? Let's look at some of the alternatives:-

<!--more-->

## msgpack
From the website - MessagePack is an efficient binary serialization format. It lets you exchange data among multiple languages like JSON. But it's faster and smaller. Small integers are encoded into a single byte, and typical short strings require only one extra byte in addition to the strings themselves.

## (google) protobuf
`protobuf` is binary. `msgpack` is 1:1 with json. If you have a set predefined structure, you'd save a lot of bandwidth not passing the keys, unlike json or msgpack. TL/DR: **much** smaller. For performance, capnproto (by one of the creators of protobuf) and flatbuffers (also by google) are the successors. Key diff: no serialization, so you get zero-copy performance.

Note: **everyone** (with large data in production) uses protobuf for on-the-wire data (v2 though, v3 take up is a lot less). [Diablo3's network protocol](https://github.com/fry/d3) , google's gtfs-realtime, etcd. Compares very similar to facebook's apache thrift. Twitter [shoehorned protobuf into Hadoop](http://www.slideshare.net/kevinweil/protocol-buffers-and-hadoop-at-twitter/26-Enter_Protocol_Buffers_Protocol_Buffers).

Note: I do NOT recommend protobuf for new projects. Premature optimization. Stick with json, then switch when you have hit CPU/bandwidth bottlenecks (yeah, those are serialization stuff, we still use them over https anyway. mix and match) [Read all about them here](https://en.wikipedia.org/wiki/Comparison_of_data_serializatio) so you'll be able to impress other folks: :) 

Another smartsounding useless factoid: zfs, nfs, libvirt, firebird db uses XDR... Financial services ("millions of messages per second") like(?)/standardized(?)/use(?) [SBE](http://real-logic.github.io/simple-binary-encoding/)  
[dota2 (and steam)](https://github.com/SteamRE/SteamKit/tree/master/Resources/Protobufs/dota).
