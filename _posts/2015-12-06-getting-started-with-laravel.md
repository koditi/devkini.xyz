---
layout: post
title: Getting Started With Laravel
author: kamal
---

I'm using the [`laravel-base`][1] as starting point. For starter, the [`laravel-base`][1]'s `Readme.md` already covering it well.

Since I want to store some data in the db, the first thing to do is to create the table's schema. You accomplish this using the `artisan` command.
```
php artisan make:migration create_customers_table --create=customers
```
This will create the schema migration file in `database/migrations/2015_12_06_095232_create_customers_table.php`. The file look like:-

```php
<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('name', 255);
            $table->text('address');
            $table->string('phone_no', 255);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('customers');
    }
}
```

[1]:https://github.com/zulfajuniadi/laravel-base
