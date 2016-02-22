---
layout: docs
title: .NET Documentation
---

##.NET Framework

We provide support for tracking errors that occur in your .NET applications

##Getting started

The easiest way to get started is to [grab the NuGet package](https://www.nuget.org/packages/slipspace.sharp/). It's called slipspace.sharp and you can install it using the NuGet package manager.

    PM> Install-Package slipspace.sharp

##Supported frameworks

We're only in beta so support for frameworks is limited at the moment. Don't worry more are on their way!!

###Fully supported

These frameworks are fully supported, check the usage instructions below for information.

* .NET 4.5
* ASP.NET
* ASP.NET MVC
* ASP.NET WebApi

###Partially supported 

With these frameworks you need to construct the DTO from the exception yourself, but we take care of all the HTTP stuff.

* _Windows Store Apps_
* _Windows Phone 7.5+_
 
##Usage instructions

Each framework has it's own idiosyncrasies when it comes to error handling, here's how you install Slipspace in the supported frameworks.

###ASP.NET

Step 1: Add a config section to the configSections element in the web.config

<pre class="prettyprint">

  &lt;section name="SlipspaceSettings" type="Slipspace.Sharp.Web.SlipspaceSettings, Slipspace.Sharp.Web" /&gt;


</pre>
    
Step 2: Add the Slipspace configuration section

<pre class="prettyprint">

  &lt;SlipspaceSettings apikey="{YOUR_API_KEY}" /&gt;
 

</pre>
   
Then you can either add a HttpModule which sends up all unhandled exceptions to Slipspace

<pre class="prettyprint">

  &lt;system.webServer&gt;
    &lt;modules&gt;
      &lt;add name="SlipspaceErrorModule" type="Slipspace.Sharp.Web.SlipspaceHttpModule" /&gt;
    &lt;/modules&gt;
  &lt;/system.webServer&gt;
  

</pre>
   
Or send up the exceptions manually

<pre class="prettyprint">

  SlipspaceWebClient.New().SendInBackground(exception)
	  

</pre>