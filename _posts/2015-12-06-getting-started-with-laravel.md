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

Controller will be the meat of the application as this is where user request being processed. To create the controller, we run the command:-

```
php artisan make:controller CustomerController
```

This will create a file `app/Http/Controllers/CustomerController.php`. The file will contain a class with some pre-defined methods:-

```php
<?php
class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){}
    public function create(){}
    public function store(){}
    public function store(Request $request) {}
    public function edit($id) {}
    ...
```

## Routing

Having a controller alone is not enough as Laravel still don't know about the controller and it relation with the incoming request. So we need to define a route that will match the url user request with the controller. Open `/app/Http/routes.php` and add the routing config:-

```php
<?php
Route::resource('customer', 'CustomerController');
```

This is where I got stucked initially, as the existing routes defined in `laravel-base` look like this:-

```php
<?php

Route::get('/', function () {
    return view('welcome');
});

Route::controller('auth', 'Auth\AuthController');
Route::controller('password', 'Auth\PasswordController');
```

Notice that they're using `Route::controller` instead. Turn out there are 2 types of controller in Laravel - RESTFull resource controller and Implicit controller. The one generated with the `artisan` command basically a resource controller so that's why you should attach it to the route with `Route::resource()` and not `Route::controller()`.

[1]:https://github.com/zulfajuniadi/laravel-base
