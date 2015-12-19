---
layout: post
title: "PHP: Server Sent Event (SSE) Example"
author: kamal
tags: sse,php,javascript,ajax
---

This is a basic example on how to implement Server Sent Event (SSE) with PHP. More lengthy explanation can be read at [HTML5 Rocks article](http://www.html5rocks.com/en/tutorials/eventsource/basics/) so I'll just focus on the example.

First, let's look at frontend side code, let's say we have `index.html`:-

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
</head>
<body>
  <script>
    var source = new EventSource('sse.php');
    source.addEventListener('delta', function(e) {
        var data = JSON.parse(e.data);
        console.log(data);
        document.body.innerHTML += data.msg + '<br>';
    }, false);
  </script>
</body>
</html>
```
<!--more-->

It is very simple code and didn't even try to check if `EventSource` (the meat of SSE) is supported on the browser. Next is the PHP code that will send data to the above code:-

```php
<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

/**
 * Constructs the SSE data format and flushes that data to the client.
 *
 * @param string $id Timestamp/id of this connection.
 * @param string $msg Line of text that should be transmitted.
 */
function sendMsg($id , $msg) {
    echo "id: $id" . PHP_EOL;
    echo "event: delta" . PHP_EOL;
    echo "data: {\n";
    echo "data: \"msg\": \"$msg\", \n";
    echo "data: \"id\": $id\n";
    echo "data: }\n";
    echo PHP_EOL;
    ob_flush();
    flush();
}

$startedAt = time();
$db = new SQLite3('sse.db');

$lastEventId = floatval(isset($_SERVER["HTTP_LAST_EVENT_ID"]) ? $_SERVER["HTTP_LAST_EVENT_ID"] : 0);
  if ($lastEventId == 0) {
    $lastEventId = floatval(isset($_GET["lastEventId"]) ? $_GET["lastEventId"] : 0);
  }

do {
    // Cap connections at 10 seconds. The browser will reopen the connection on close
    if ((time() - $startedAt) > 10) {
        die();
    }

    $stmt = $db->prepare("SELECT * FROM messages WHERE id > :id");
    $stmt->bindValue(':id', $lastEventId);
    $result = $stmt->execute();

    while ($data = $result->fetchArray()) {
        sendMsg($data['id'], $data['message']);
    }
    $lastEventId = $data['id'];

    sleep(5);

    // If we didn't use a while loop, the browser would essentially do polling
    // every ~3seconds. Using the while, we keep the connection open and only make
    // one request.
} while(true);
?>
```

Create the sqlite database tables for testing this:-

```
> sqlite3 sse.db
SQLite version 3.8.4.1 2014-03-11 15:27:36
Enter ".help" for usage hints.
sqlite> create table messages (id integer primary key autoincrement, message text);
sqlite> insert into messages (message) values ('hello world');
```

We can test this by running php development server:-

```
php -S 127.0.0.1:8000
```
And open up in browser `http://localhost:8000/index.html`. We should see the first "hello world" message. If we insert a second message:-

```
sqlite> insert into messages (message) values ('hello world 2');
```
We can see it appear at the second line, without having to refresh the browser ! Keep adding the messages and will appear on the browser. This is the gist of SSE and can be a foundation to build something more useful like user notifications etc.

So how it actually work ?

1. Browser open connection to `sse.php`.
2. On the server, it return data in the format of:-
```
data: hello\n
data: world\n\n
```
3. Browser assume the data stream end when it encounter double newlines `\n\n`, and fire an event with the data.
4. Our PHP code keep the connection open for x amount time, and can keep sending the data to the `EventSource` on the browser.
5. If the server close the connection, `EventSource` will create new connection, and the cycle repeat.
6. We can optionally specify an id for the data and the id will be sent back to the server in the header as `Last-Event-ID`:-

```
id: 1002\n
data: hello\n
data: world\n\n
```
This is what we use in the above example, to only query for new messages to be sent to browser.
7. The data stream also can be named, allowing us to specify multiple `EventSource` channel that can be used for different purposes.
