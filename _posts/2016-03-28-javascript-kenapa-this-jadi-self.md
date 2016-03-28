---
layout: post
title: "JavaScript: Kenapa this jadi self ?"
author: kamal
tags:
    - javascript
---

Anda mungkin pernah terjumpa kod JavaScript yang mungkin kelihatan seperti berikut:-

```javascript
app = new App({
    newMessage: '',
    connect: function() {
        var socket = new WebSocket(url);
        var self = this;
        socket.onmessage = function(msg) {
            self.newMessage = msg;
        }
    }
});
```
Dan anda tertanya-tanya kenapa perlu ada `self = this` ?

Ini kerana `this` dalam function, sekiranya function tersebut dipanggil menggunakan cara *invocation* biasa seperti `getfunctionName()`, adalah merujuk kepada global object `Window` (jika dalam persekitaran browser). Ini mungkin agak kurang intuitif jika anda datang daripada bahasa Java atau PHP di mana `this` merujuk kepada *current instance*.

Nilai `this` ini boleh di'customize' dengan menggunakan *function* `function.apply`. Cara invokasi biasa function:-

```javascript
doSomething(myName);
```

Adalah bersamaan dengan:-

```javascript
doSomething.apply(null, [myName]);
```

Secara asasnya, sintaks `function.apply` boleh diringkaskan seperti berikut:-

    theFunction.apply(theValueThatWillBecomethis, [theArgumentsToPass])

Dalam contoh di atas, oleh kerana nilai *argument* yang pertama adalah `null`, maka `this` merujuk kepada objek `Window`. Untuk menukar `this` kepada nilai yang kita kehendaki, kita boleh memanggil function tadi seperti berikut:-

```javascript
doSomething.apply(doSomething, [myName]);
```

Sekarang `this` adalah merujuk kepada function itu sendiri. Selain itu, penggunaan *keyword* `new` juga akan menukar nilai `this` kepada object kosong `{}`.

Bagaimana ini menjawab soalan berkaitan `self` di atas ? Kita rujuk kembali contoh pertama di atas. Dalam function `onmessage` di atas, kita tidak tahu bagaimana *function* tersebut akan dipanggil, jadi kita juga tidak tahu apa nilai `this` dalam function tersebut. Untuk mengekalkan `this` kepada `this` yang diluar `onmessage`, maka kita `bind` nilai this itu kepada *variable* baru yang kita namakan `self`.

Ada yang berpendapat nama `self` sepatutnya tidak digunakan lagi kerana dalam implementasi yang terkini, nama `self` [turut digunakan sebagai built-in object][1]. Selain `self` ada yang lebih gemar menggunakan nama `that`:-

    var that = this;

Bagaimana pun ia terpulang kepada anda nama apa yang hendak digunakan.

[1]:https://developer.mozilla.org/en-US/docs/Web/API/Window/self
