---
layout: post
title: "Telegram: Generasi bot"
author: kamal
tags: telegram, bot
---

Ada 2 generasi bot. Generasi awal, yang seperti user biasa - perlukan phone number dan seperti user biasa dapat baca kesemua mesej dalam group yang dia join. Bot yang guna command mula dengan `!` tu adalah generasi awal.

Bot generasi baru menggunakan official [Bot API][api]. Nama dia mesti ada "bot" kat belakang. Tak perlukan phone number. Cuma boleh terima mesej yang dihantar khusus kepadanya - sama ada melalui command seperti `/cari`, `/help` atau pun kalau mention nama dia seperti `@kambingbot` dan sebagainya. Boleh terima semua mesej kalau privacy setting bot itu diubah.

https://github.com/yagop/telegram-bot - bot generasi awal. Based on Lua so in theory boleh run kat windows.

https://github.com/yagop/telegram-bot - A Telegram Bot based on plugins
https://github.com/yukuku/telebot - bot generasi baru, based on Python, run on app engine.

https://gist.github.com/k4ml/04867dc17389a1cfba45 - also on python tapi just basic example.

Satu lagi library pilihan saya untuk develop bot adalah https://github.com/python-telegram-bot/python-telegram-bot. Menggunakan library ini, membina bot adalah semudah beberapa baris code seperti di bawah:-

```python
from telegram import Updater

updater = Updater(token='token')
dispatcher = updater.dispatcher

def start(bot, update):
  bot.sendMessage(chat_id=update.message.chat_id, text="I'm a bot, please talk to me!")

def echo(bot, update):
  bot.sendMessage(chat_id=update.message.chat_id, text=update.message.text)

dispatcher.addTelegramCommandHandler('start', start)
dispatcher.addTelegramMessageHandler(echo)
updater.start_polling()
```

[api]:https://core.telegram.org/bots
