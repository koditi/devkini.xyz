---
layout: post
title: Django 1.11 From Scratch
author: kamal
tags:
    - python
    - django
summary: >
            Uncommon approach to learn django by starting from the very basic of handcoding everything, skipping some of the shortcut provided by django-admin startproject command.
---

There are a lot of tutorials out there on Django and the official documentation also has one. For this post, I decided not to go through the typical route on how to get started with django. Let's 'ignore' the best practices and focus on what actually work and hopefully we can learn something along the way.

<!--more-->

# Contents
{:.no_toc}
* xxxx
{:toc}

So let's get started by downloading Django itself from the website.

```
$ wget -O django.tar.gz https://www.djangoproject.com/download/1.11.2/tarball/
$ tar xzf django.tar.gz 
$ ls
Django-1.11.2  django.tar.gz
$ ls Django-1.11.2
AUTHORS          Gruntfile.js     LICENSE.python   README.rst       js_tests         setup.cfg
CONTRIBUTING.rst INSTALL          MANIFEST.in      docs             package.json     setup.py
Django.egg-info  LICENSE          PKG-INFO         extras           scripts          tests
```

What we're getting is called a Python package that supposed to be installed. But we're not going to install it, instead let just take what we really need. Take out the `django` directory and move to our current directory.

```
$ mv Django-1.11.2/django .
```

One thing we should understand when get started with Django is that it's just Python. In Python the most important thing is to make sure we can import the module we want to use. Let's try to `import django`.

```
$ python
Python 2.6.5 (r265:79063, Apr 16 2010, 13:09:56) 
[GCC 4.4.3] on linux2
Type "help", "copyright", "credits" or "license" for more information.

>>> import django
>>> django
<module 'django' from 'django/__init__.py'>
```

This is great, we 'have' django now so let's build some application with it. In any computer program, it's important to know what is the entry point to that program. In C program we have the `main()` function for example, in Java you specify a class for the JVM to load and that class must have the `static main()` method. So what is the entry point to django application ? There will be at least 2 entry points to django application. First let's called command line entry point (CLI) and second the WSGI entry point. Let's ignore what is WSGI and focus on executing django application from command line. This is the minimal python script that you can use to invoke django application:-

```
$ cat main.py 
from django.core.management import execute_from_command_line

execute_from_command_line()
```

The filename can be anything but let's call it `main.py`. If you run that script with python, it will display a list of available sub-commands, along with some help message. But when you run this command, you probably got an error like this:-

```
ImportError: No module named 'pytz'
```

Let's get pytz:-

wget https://pypi.python.org/packages/aa/b1/6ce9665e4ecc240aff34a762c0d9ad5c4b028b0aa8f1f2e2625fca2d60ff/pytz-2017.2-py3.5.egg

unzip pytz-2017.2-py3.5.egg

```
python main.py
$ python main.py 
Usage: main.py subcommand [options] [args]
...
[django]
cleanup
compilemessages
createcachetable
dbshell
...
runserver
```

You may get a warning message (in red) like this:-

Note that only Django core commands are listed as settings are not properly configured (error: Requested setting INSTALLED_APPS, but settings are not configured. You must either define the environment variable DJANGO_SETTINGS_MODULE or call settings.configure() before accessing settings.).

The sub-command we're interested with is the `runserver`. That will start a process that listen at port 8000 and ready to serve HTTP request. People call it web server, quite similar to that well known Apache. Of course this web server that come with Django is not meant to replace Apache and far from usable outside of this local machine but that will be in another post. Let's try to run the `runserver` command:-

```
$ python main.py
```

You'll get a message like this:-

```
Traceback (most recent call last):
  File "main.py", line 4, in <module>
    django.setup()
  File "/Users/kamal/python/dfs/django/__init__.py", line 22, in setup
    configure_logging(settings.LOGGING_CONFIG, settings.LOGGING)
  File "/Users/kamal/python/dfs/django/conf/__init__.py", line 56, in __getattr__
    self._setup(name)
  File "/Users/kamal/python/dfs/django/conf/__init__.py", line 39, in _setup
    % (desc, ENVIRONMENT_VARIABLE))
django.core.exceptions.ImproperlyConfigured: Requested setting LOGGING_CONFIG, but settings are not configured. You must either define the environment variable DJANGO_SETTINGS_MODULE or call settings.configure() before accessing settings.
```

So something not right, in order for Django to start up, you have to tell it how to configure itself. You have to provide some settings. The settings itself just another python module (there's another way to provide settings) which mean the module must be able to be imported from the python script that we use to run django. Let's create the settings module, name it `settings.py` (it can be anything):-

```
$ touch settings.py
$ python
>>> import settings
>>> settings
<module 'settings' from 'settings.py'> 
```

Now that we have settings module in place, let's modify our `main.py`:-

```
$ cat main.py
import os

from django.core.management import execute_from_command_line

os.environ['DJANGO_SETTINGS_MODULE'] = 'settings'

execute_from_command_line()
```

Now when we run `python main.py`, we'll get the following:-

```
Type 'main.py help <subcommand>' for help on a specific subcommand.

Available subcommands:

[django]
    check
    compilemessages
    createcachetable
    dbshell
    diffsettings
    dumpdata
    flush
    inspectdb
    loaddata
    makemessages
    makemigrations
    migrate
    runserver
    sendtestemail
    shell
    showmigrations
    sqlflush
    sqlmigrate
    sqlsequencereset
    squashmigrations
    startapp
    startproject
    test
    testserver
Note that only Django core commands are listed as settings are not properly configured (error: The SECRET_KEY setting must not be empty.).
```
Remember, our `settings.py` still empty and above, Django is expecting a settings named `SECRET_KEY`. Django already come with list of [default settings][1] but apparently for this one, you have to specify it yourself. Let's ignore first what the purpose of this `SECRET_KEY`. So fix our settings module to have that:-

```
$ cat settings.py
SECRET_KEY = "1+)O49,>}5!$+ 43*PN+2+=(2S'W*0^1_|76n{_"
```


Above, we hardcode the value of `DJANGO_SETTINGS_MODULE` environment variables to our settings module. Just like any environment variables, we can also specify it when we run our script:-

```
$ DJANGO_SETTINGS_MODULE=settings python main.py
```

The result would be the same. Specifying the environment variables value on the command line without hardcoding allow us to specify different settings to our app with having to modify the code. That's one of the reason why django choose to use environment variables to store pointer to the settings. One typical usecase when you want to have different settings for development and production. Let's continue with our app:-

```
$ python main.py runserver
```

You'll get this error:-

    CommandError: You must set settings.ALLOWED_HOSTS if DEBUG is False.

So add this another settings:-

```
$ cat settings.py
SECRET_KEY = "1+)O49,>}5!$+ 43*PN+2+=(2S'W*0^1_|76n{_"
DEBUG = True
```
The error above mentioned something called `ALLOWED_HOSTS` but let's ignore that for now. It's a settings for production so it's not applicable yet in our case. We'll revisit that once we want to deploy our app to production server. Let's run the app again:-

```
$ python main.py runserver
Performing system checks...

System check identified some issues:

WARNINGS:
?: (1_7.W001) MIDDLEWARE_CLASSES is not set.
        HINT: Django 1.7 changed the global defaults for the MIDDLEWARE_CLASSES. django.contrib.sessions.middleware.SessionMiddleware, django.contrib.auth.middleware.AuthenticationMiddleware, and django.contrib.messages.middleware.MessageMiddleware were removed from the defaults. If your project needs these middleware then you should configure this setting.

System check identified 1 issue (0 silenced).
July 21, 2015 - 14:55:21
Django version 1.8.3, using settings 'settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

Now django happily start the server. Let's try to access it. Run this on a separate console:-

```
$ curl http://localhost:8000/
A server error occurred.  Please contact the administrator.
```
You can also try to access the url using browser, the result would be similar. Let's check the console where we run `runserver`:-

```
Traceback (most recent call last):
  File "/usr/lib/python2.6/wsgiref/handlers.py", line 93, in run
    self.result = application(self.environ, self.start_response)
  File "/home/kamal/python/dthw/django/core/handlers/wsgi.py", line 255, in __call__
    response = self.get_response(request)
  File "/home/kamal/python/dthw/django/core/handlers/base.py", line 85, in get_response
    urlconf = settings.ROOT_URLCONF
  File "/home/kamal/python/dthw/django/conf/__init__.py", line 54, in __getattr__
    return getattr(self._wrapped, name)
AttributeError: 'Settings' object has no attribute 'ROOT_URLCONF'
[11/Apr/2013 16:37:55] "GET / HTTP/1.1" 500 59
```

The reason django gave you an error because you haven't tell yet django what to serve from your application. You can do this by providing a mapping between a set of url pattern to python function that will be called when the pattern match. Create a new python module, name it `urls.py` (once again, the name can be anything).

```
$ cat urls.py
from django.http import HttpResponse
from django.conf.urls import url

def hello_world(request):
    return HttpResponse('Hello world')

urlpatterns = [
    url(r'^$', hello_world),
]
```

The module must have a name called `urlpatterns` that having a list of call to function named `url`. 

Once above is done, you can hook it into `settings.py` which now should look like:-

```
$ cat settings.py
SECRET_KEY = "1+)O49,>}5!$+ 43*PN+2+=(2S'W*0^1_|76n{_"
ROOT_URLCONF = 'urls'
```

`ROOT_URLCONF` should contain valid import path to our module that define the url mapping. Try to `runserver` and access our app again:-

```
$ python manage.py runserver
```

On another console:-
    
```
$ curl http://localhost:8000/
```

Now running the `runserver` and try accessing http://localhost:8000/ through browser or using curl will give the "Hello world" string. The takeout from this is that all the django need is just a function that it can call given a particular url. From that function you can do whatever you want as long as you return a valid value that is an instance of `django.http.HttpResponse` or it's subclass. Another important thing to know is that most of the settings require you to provide a valid python import path that django can use to import the required module. The module itself can be anywhere and django does not restrict you to any particular structure. As long as you can do `import somestuff`, that would be fine. How to make sure you module can be imported will be a point of another post though.

## Namespace
So far what we have been doing is defining python module in the same directory as the script that executing our application (`main.py`). The is the easiest to get started because nothing we have to do in order for python to be able to import our module. Most of the time python can import module or package defined in the same directory of the executing script. In our case we defined `settings.py` and in `main.py` it's importable as `settings`. Similar goes to `urls.py`. These (settings, urls) however are too generic name that can potentially conflict with other python modules once our app grow and we need to use more python libraries than just django. Python has [namespace] to solve this so why not we start using it before getting too deep with our app.

Create a new directory called `myapp` (or anything you wish) in the same directory containing `main.py`, `settings.py` and `urls.py`.

```
$ mkdir myapp
$ ls
django  main.py  myapp  settings.py  urls.py
```

Then move `settings.py` and `urls.py` into the new directory.

```
$ ls
django  main.py  myapp
$ ls myapp
settings.py  urls.py
```

`main.py` should remain outside as it is the entry point to our app and it will be much easier if it is not in the containing app. This way we can phrase it as `main.py` will call `myapp`, otherwise if we put `main.py` in `myapp`, then `myapp` has to call itself. While technically possible it will be much harder to explain. Django has done this in the beginning and has since corrected it in last few latest versions. If you're using python 2, In order for a directory to be recognised as valid python package (namespace), you have to provide a file named `__init__.py`. Most of the time it can be empty.

Now we have to fix our settings a bit to reflect the new location of our modules. It should look like this:-

```
$ cat myapp/settings.py
SECRET_KEY = "1+)O49,>}5!$+ 43*PN+2+=(2S'W*0^1_|76n{_"
ROOT_URLCONF = 'myapp.urls'
DEBUG = True
```

`main.py` also need fixing:-

```
$ cat main.py
import os

from django.core.management import execute_from_command_line

os.environ['DJANGO_SETTINGS_MODULE'] = 'myapp.settings'

execute_from_command_line()
```

## Views
So we know that django only need to call our function for any matched url and we defined that function in the same module we defined the url mapping - `urls.py`. This is fine for small app but splitting it into separate module is a good practice. So `urls.py` can just contain url mapping instead of mixing it with our application logic. Let's create new module to store our app function. We call it `views.py` but you can choose any name you like.

```
$ cat myapp/views.py
from django.http import HttpResponse

def hello_world(request):
    return HttpResponse('Hello world')
```

Inside `urls.py` we import the views module and hook it into our url pattern:-

```
from django.conf.urls import url

from myapp.views import hello_world

urlpatterns = patterns('',
    url(r'^$', hello_world),
)
```

## Models
Now come the hardest part to explain because of some 'hardcoding' django did to implement the functionality. Unlike views, url config or settings, the name for the module that contain models definition was hardcoded in django - it want you to name it as `models.py`. Django also use `models.py` to imply some other parts of the framework. Let's define our models:-

```
$ cat myapp/models.py
from django.db import models

class Customer(models.Model):
    name = models.CharField(max_length=255)
```

After defining models, you have to tell django the package that contain this `models.py` module. Our settings should look like:-

```
$ cat myapp/settings.py
$ cat myapp/settings.py
SECRET_KEY = "1+)O49,>}5!$+ 43*PN+2+=(2S'W*0^1_|76n{_"
ROOT_URLCONF = 'myapp.urls'
DEBUG = True
INSTALLED_APPS = ('myapp',)
```

In short, what you define in `INSTALLED_APPS` basically just an import path to python package that contain `models.py` file. You can put all your models definition for your application in a single `models.py` but you maybe want to split it into multiple apps for better design. A common use case is when the `apps` can actually being reused in other project as well. It also not necessarily must be in the same directory as your current application. What important is it can be import by the python interpreter running your application. This will always true to third party libraries that you install such as from PyPI since that libraries will be installed in some other place on your system, not in your current project directory.

Since we started to use db, we must define our database credentials settings:-

```
    $ cat myapp/settings.py
SECRET_KEY = "1+)O49,>}5!$+ 43*PN+2+=(2S'W*0^1_|76n{_"
ROOT_URLCONF = 'myapp.urls'
DEBUG = True
INSTALLED_APPS = ('myapp',)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'myapp.db',
    }
}
```

Once we configured `settings.INSTALLED_APPS` to have our app defined, we can run `syncdb` to let django create necessary database tables to store our models data:-

```
$ python main.py makemigrations myapp
Migrations for 'myapp':
  myapp/migrations/0001_initial.py
    - Create model Customer
```

```
$ cat myapp/migrations/0001_initial.py
# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-08-21 20:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
    ]
```

```
$ python main.py migrate
Operations to perform:
  Apply all migrations: myapp
Running migrations:
  Applying myapp.0001_initial... OK
```

[1]:https://docs.djangoproject.com/en/1.5/ref/settings/
