---
layout: post
title: Overview on How To Use AWS SDK v2 in Codeigniter v2
author: robotys
tags:
    - aws
    - aws sdk
    - codeigniter
    - php
---

The back story was: I need to improve speed of a feature so that it will not throw max_execution_time server error. The problem was: it need to upload 100++ html file to s3, so, on production server it throws 504 error as production server has max_execution_time limit set to 30s.

The time that script run was 240s.

So, after trying so many ideas, it comes down to 'Radically change the process of uploading to s3 to better and faster one'.

At that time, the process was:

1. Take html from mysql
1. Process it to fit the format needed
1. Save it as local temporary file
1. Use custom AWS S3 library to beam up that file to s3
1. Save the url returned to array
1. Save the data to approriate table

The new process to try was:

1. Take html from mysql
1. Process it to fit the format needed, return as string
1. Take that html string and beam directly to s3 using latest AWS PHP SDK
1. Save url and save data to table.

How much improvement? Old way: 240s, new way: 14s.

<!--more-->

How many headache:

1. Latest AWS PHP SDK best to be used via Composer.
1. Codeigniter 2 was not friendly to Composer. It was developed BEFORE Composer popularity. So, it is understandable for it to be that way.
1. Need to adjust the way to install and use AWS official SDK to CI 2. As it was not officially supported.
1. Never done this before...

So, the steps:

### Step 1: Composer Update

Well, somebody before me has tried to use composer before on this codebase, so there were already composer.json file.

Or if that file not exist, create new one with the same name in the root of out CI installation. Fill it with the code below:

```json
{
	"require":{
		"aws/aws-sdk-php": "2.*"
	}
}
```

Make sure you have installed Composer. If not, better go to [getcomposer.org][1] and follow the instruction. After that, we install the AWS SDK via Composer like this:

```
$ composer install
```

For my case, I just need to update instead of install. And need to use sudo as I`ve installed composer as root user previously.

```
$ sudo composer update
```

Once done, you will have new ```/vendor``` directory in the root installation. That will be the place where all the files that we install via composer. There should be ```/vendor/aws``` in it.

Last for installation: we autoload it in CI index.php.

Open index.php and paste this code ```require './vendor/autoload.php';``` near the bottom JUST ABOVE require core:

```php
<?php
//index.php

/*
 * --------------------------------------------------------------------
 * LOAD THE BOOTSTRAP FILE
 * --------------------------------------------------------------------
 *
 * And away we go...
 *
 */
require './vendor/autoload.php';
require_once BASEPATH.'core/CodeIgniter.php';
/* End of file index.php */
/* Location: ./index.php */
```

Below than that, it will throw and error. I did not figure out why. Just move on:

### Step 2: Use s3Client in Controller

This is an example from [AWS PHP SDK documentation][2]:

```php
<?
use Aws\S3\S3Client;

$bucket = '*** Your Bucket Name ***';
$keyname = '*** Your Object Key ***';
						
// Instantiate the client.
$s3 = S3Client::factory();

// Upload data.
$result = $s3->putObject(array(
    'Bucket' => $bucket,
    'Key'    => $keyname,
    'Body'   => 'Hello, world!'
));

echo $result['ObjectURL'];
```

The problem with this example was, it is given as a function, buat we need to use it in a Class (CI_Controller). The way to do that was, we put the ```use``` part on top of the class, outside of it. Refer example below:

```php
<?php
use Aws\S3\S3Client;
use Aws\Common\Credentials\Credentials;

class Pro extends CI_Controller {
	// controller codes
}
```

We only load classes that we want to use. Hence the verb ```use```.

And then proceed to use the s3 methods in the function as shown below:

```php
<?php

// other method for this class up and below this code.

public function sandbox(){
		
	$credentials = new Credentials('YOUR_AWS_KEY', 'YOUR_AWS_SECRET');

	$s3 = S3Client::factory(array(
	    'credentials' => $credentials
	));

	$bucket = 'bucketname';
	$key = 'path/to/file.html';

							
	// Upload data.
	$result = $s3->putObject(array(
	    'Bucket' => $bucket,
	    'Key'    => $key,
	    'Body'   => '<html><body><h1>Hello, world!</h1></body></html>',
	    'ACL'    => 'public-read',
	    'ContentType'  => 'text/html',
	));

	echo $result['ObjectURL'];
}
```

We need to verify our credentials first before send to s3 as shown by the ```$credentials``` code in that example.

What we do here was we sending a html code (the 'Body' part there) and ask s3 SDK to save it as html file at the ```Key``` path.

Refer to [credentials docs][3] at AWS official docs for further info.

### Step 3: Done

Finish! This is the whole controller code:

```php
<?php
use Aws\S3\S3Client;
use Aws\Common\Credentials\Credentials;

class Pro extends CI_Controller {
	
	// controller codes ...

	public function sandbox(){
			
		$credentials = new Credentials('YOUR_AWS_KEY', 'YOUR_AWS_SECRET');

		$s3 = S3Client::factory(array(
		    'credentials' => $credentials
		));

		$bucket = 'bucketname';
		$key = 'path/to/file.html';

								
		// Upload data.
		$result = $s3->putObject(array(
		    'Bucket' => $bucket,
		    'Key'    => $key,
		    'Body'   => '<html><body><h1>Hello, world!</h1></body></html>',
		    'ACL'    => 'public-read',
		    'ContentType'  => 'text/html',
		));

		echo $result['ObjectURL'];
	}

	// other controller codes ....
}
```

----------------

That was basicly the step to use it. Simple enough, but due to major lack of experience on composer and aws official SDK, it turns into 1 whole day job.

Well, everything was like that for the first time I suppose.


[1]: https://getcomposer.org/ 'Composer Main Page'
[2]: http://docs.aws.amazon.com/AmazonS3/latest/dev/UploadObjSingleOpPHP.html 'AWS S3 Example'
[3]: http://docs.aws.amazon.com/aws-sdk-php/v2/guide/credentials.html#factory-credentials 'AWS Credentials Docs'
