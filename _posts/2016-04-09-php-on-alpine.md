---
layout: post
title: 'PHP on Alpine Linux'
author: kamal
date: 2016-04-09
tags:
    - php
    - laravel
    - linux
    - vm
    - xhyve
summary: >
            Notes on running PHP Laravel app on Alpine Linux
---

I'd never been comfortable doing development on Mac OSX. There are always rough edges, missing packages or libraries, out of date XCode etc. It much easier to just ssh into Digital Ocean droplet running Ubuntu and do your development there. But lately, my internet connection has becoming worse and I don't have much option that do local development again.

I've try Docker but Docker on OSX is not that straightforward. It need to run inside Docker Machine, which is a vm running under virtualbox. Given my macbook air only has 4GB RAM, I need something lightweight. The new [Docker for Mac and Windows Beta][1] mentioned about the use of xhyve vm instead of virtualbox. It look interesting so I gave it a try.

Compiling xhyve is very straightforward. Just `git clone` from Github and run `make`. It come with a test vm that will boot tinylinux. Seeing it working, I decided to try running Alpine Linux. There's one catch, to have networking inside xhyve, you have to run it as root.

To have Alpine on xhyve, I just followed this gist [snippet](https://gist.github.com/k4ml/e3efb2f167a56084b89fae55f44cd150). With the exception of the shown Alpine version (3.3.1) failed to have networking with DHCP, it work as expected. You need to use Alpine 3.3.3 instead.

<!--more-->

Once you get Alpine running, you can start adding the required packages using Alpine package manager `apk`:-

    apk add php php-json php-phar php-openssl php-curl php-xml php-dom php-pdo php-mbcrypt php-pdo_mysql php-ctype
    apk add php-iconv
    apk add mysql
    apk add mysql-client
    apk add nodejs

Setting Up Mariadb:-

    /etc/init.d/mariadb setup
    service mariadb start
    /usr/bin/mysqladmin -u root -h alpine password 'new-password'

<div class="admonition-warning">
    Please note that this is not for production setup. It just for testing and development.
</div>

So for a test drive, I decided to try to run InvoiceNinja app.

    git clone https://github.com/invoiceninja/invoiceninja.git
    cd invoiceninja

Create the required database:-

    mysql -uroot -pnew-password
    CREATE SCHEMA `ninja` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
    CREATE USER 'ninja'@'localhost' IDENTIFIED BY 'ninja';
    GRANT ALL PRIVILEGES ON `ninja`.* TO 'ninja'@'localhost';
    FLUSH PRIVILEGES;

Download Composer:-

    curl -sS https://getcomposer.org/installer | php
    php composer.phar install
    cp .env.example .env

    npm install -g gulp

[1]:https://blog.docker.com/2016/03/docker-for-mac-windows-beta/
