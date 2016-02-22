---
layout: docs
title: JavaScript Documentation
---

##JavaScript
We provide support for tracking errors that occur in your JavaScript applications

##Getting started

We have a few ways you can install slipspace in your JavaScript project. The library has no dependencies so you can install it on any old website.

####Manually

You can manually download the JavaScript file for your project. We have both a [minified production version](https://github.com/slipspace/slipspace.js/blob/master/build/slipspace-1.0.0.min.js) and [development version](https://github.com/slipspace/slipspace.js/blob/master/build/slipspace-1.0.0.js) available.

####NuGet

You can install the library using the NuGet package manager

<pre class="prettyprint">

    PM> Install-Package slipspace.js


</pre>

####Bower

You can install the library using bower

<pre class="prettyprint">

    bower install slipspace
  
</pre>
  
##Usage instructions

You can start recording errors in as little as one line of code. In your webpage just reference the library and supply your API Key.

<pre class="prettyprint">

    &lt;script data-apikey="{YOUR API KEY}" src="/Scripts/slipspace-1.0.0.min.js"&gt;&lt;/script&gt;


</pre>
    
You can set any setting via data attributes on the script tag or by using the _init({settings})_ function. Any settings set using init will take precedence.

<pre class="prettyprint">

    &lt;script src="/Scripts/slipspace-1.0.0.min.js"&gt;&lt;/script&gt;
    &lt;script&gt;
        Slipspace.init({apikey: {YOUR API KEY}});
    &lt;/script&gt;


</pre>

To manually submit an error just use the _send(ex)_ function.

<pre class="prettyprint">

    try{
      //some code that throws an error...
    }catch(ex){
      Slipspace.send(ex);
    }
 
 
</pre>
   
You can also send custom data using the send method. The custom data will be accessible from the Slipspace web interface.

<pre class="prettyprint">

    try{
      //some code that throws an error...
    }catch(ex){
      Slipspace.send(ex, { custom: data });
    }


</pre>

By default we automatically catch all errors that hit the _window.onerror_ handler, if you want to turn off automatic error handling just call.

<pre class="prettyprint">

    Slipspace.detach();
    

</pre>

##Documentation

###Settings

All settings can be set using either data attributes on the script tag that loads Slipspace or using the _Slipspace.init_ function.

Here are all the available settings

**apikey** _required_ 

Your api key, required to send the error to Slipspace.

**debug** _default: false_

Whether to log debug information to the browser's console window.

**level** _default: 2_

The severity of the issue, we default to 2 (error).

Levels include: 1 (critical), 2 (error), 3 (warning), 4 (information), 5 (verbose).

**environment** _default: production_

The environment that this error occurred on.

**correlationId** _default: none_

The correlation Id for the error.

###Custom data

Custom data can be added with the _addCustomData_ function.

<pre class="prettyprint">

    Slipspace.addCustomData({custom: "data"});
    

</pre>

It can also be passed during sending

<pre class="prettyprint">

    Slipspace.send(ex, {custom: "data"});
 
 
</pre>
    
###CorrelationId

A correlation Id is used to help identify an error that your user is talking about. You set it to a (usually) unique string and show that string to the user. They now have an identifier for the error which they can use if they want to contact you about it.

<pre class="prettyprint">

    Slipspace.setCorrelationId("c7b86ba3-dce8-46ce-8d91-c0a2fc06ae06");


</pre>

###User tracking

You can track which users are affected by the JavaScript errors, just use the _setUser_ function

<pre class="prettyprint">

    Slipspace.setUser("unique identifier", "email", "name")


</pre>
    
Only the unique identifier is needed, it helps us calculate how many of your users have been affected by an error. If you want to know who has been affected by an error make sure to also include the name and email.

###Versioning

To track which version of your app an error is impacting use the _setVersion_ method

<pre class="prettyprint">

    Slipspace.setVersion("1.0.0")


</pre>

##Release History

Release history for the JavaScript library

####**1.0.2**

Added support for setting the severity of the error

####**1.0.1**

A bunch of minor improvements including:

  
* Version tracking support
* User tracking support
* Custom environment data support
* Chaining support


####**1.0.0**
Initial release