---
layout: post
title: Getting Started With Laravel
author: kamal
---

I'm using the [`laravel-base`][1] as starting point. For starter, the [`laravel-base`][1]'s `Readme.md` already covering it well.

## Database Tables
Since I want to store some data in the db, the first thing to do is to create the table's schema. You accomplish this using the `artisan` command:-

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

The column `id` and `timestamps` were added by default but you have to add other column manually. Once you have filled up the file with all the column you want, you can run the `migrate` command to let laravel create the corresponding database table:-

```
php artisan migrate
```

## Model

To interact with the database, Laravel use an ORM named Eloquent. To create the model, we can ru the command:-

```
php artisan make:model Customer
```

This will create a file named `Customer.php` in the `app/` folder. I wish the `artisan` command show the exact path where the files being generated instead of just showing:-

```
Model created successfully.
```

## Controller

[1]:https://github.com/zulfajuniadi/laravel-base
