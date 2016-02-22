---
layout: docs
title: RESTful API Documentation
---

##Overview
All exceptions are submitted to slipspace using our REST API.
If you're using a supported plarform you can use one of our pre-made providers, otherwise you can manually use this API to create your own provider.

##API Endpoint details
_Note: all calls must be made over HTTPS, we actively refuse HTTP connections._

###Endpoint
https://data.slipspace.co/v1/events

###Method
POST

###Headers
**X-ApiKey:** {application api-key}
The **"X-ApiKey"** header must be present, it lets us know which application the exception should be associated with.
You can find the X-ApiKey for each of your applications on the application dashboard.

###Content Type
We only accept JSON payloads so the content type must be **application/json**.

###Request body

The request body is a JSON payload which describes the details of the exception.
It can be very detailed or super basic depending on the level of detail you want to be available to you in slipspace.co.

To get started the request can be as light as this, go ahead, POST it to the endpoint using your favourite REST client:

<pre class="prettyprint">
    
  {
    "exceptionData" : {
      "className":"System.Web.HttpException"
    }
  }


</pre>

But in practice you'll want to capture a bit more information.
Below is a description of the complete data format with an explanation of all the options available to you.

<pre class="prettyprint">
    
  {

    //The display name for this error, used as the group title if this is the initial error in the group.
    //Defaults to the exception class and exception message.
    "name": "HttpException: The page does not exist.",

    //The machine that the error occurred on.
    //Useful in tracking down problems with individual instances in a server farm.
    //Max 255 characters.
    "machineName": "ravenholm",

    //The environment that the error occurred in.
    //Useful for tracking an errors as the progress from development to production.
    //Max 255 characters, defaults to "production".
    "environment": "production",

    //The time that the error occurred.
    //Useful when submitting errors after they occurred in occasionally connected situations.
    //Must be in the ISO 8601 format, defaults to the current time (UTC).
    "occurredOn": "2014-07-23T08:39:14+00:00",

    //The platform that the environment was running on.
    //Max 255 characters.
    "platform": "azure websites",

    //The language that the application is written in.
    //Max 20 characters.
    "language": "C#",

    //The severity of an error
    //defaults to 2
    //Levels: 1 (critical), 2 (error), 3 (warning), 4 (information), 5 (verbose)
    "level": 2,

    //An object representing the user affected.
    //uuid: Used to power the "number of users affected" feature.
    //name & email: Used to supply a list of affected users.
    //Max 255 characters
    "userData": {
	  "uuid": "642c6a29-6f05-44c6-bd65-09db82f3855a",
	  "email": "eli.vance@blackmesa.research",
	  "name": "Eli Vance"
    },

    //The fingerprint of this error.
    //This parameter is usually omitted, it is used if you want to override the default slipspace grouping algorithm.
    //Exceptions with the same fingerprint are grouped together.
    //Max 255 characters.
    "fingerprint": "VGhlIGNha2UgaXMgYSBsaWU=",

    //The version of the application that this error occurred in.
    //Used when re-opening resolved exception groupings.
    //Max 255 characters.
    "version": "1.0.0",

    //The correlation id for the exception.
    //Usually a Guid, useful to generate and display to end users if they want to contact you about a specific error.
    //Max 255 characters.
    "correlationId": "10c1d3bb-05a0-40d9-b8cd-b78d148d41e0",

    //Custom data submitted by the application in a name-value pair format.
    //Usually holds some additional contextural inforamtion that may aid in debugging the problem
    //Max serialized size of 32 kB
    "customData": {
      "suit": "Mark V",
      "energyLevel": "low"
    },

    //Custom data submitted about the environment by the application in a name-value pair format.
    //You can add arbitrary keys but these are the ones slipspace understands
    //Max serialized size of 32 kB
    "environmentData": {
      "locale": "English (United States)",    //The culture settings of the host device
      "utcOffset": 0.0,                       //The offset from GMT of the host device
      "osVersion": "6.2.9200",                //The version of the OS that the application was running on
      "processorCount": 1,                   
      "architecture": "AMD64",                
      "totalPhysicalMemory": 314,
      "availablePhysicalMemory": 100,
      "totalVirtualMemory": 8311653,
      "availableVirtualMemory": 8301532,
      "cpu": "Intel(R) Xeon(R)",
      "diskSpaceFree": 156.13,
      //...other custom environmental information
    },

    //Details about the exception that occurred.
    //Required, max serialized size of 60 kB
    "exceptionData": {

      //The exact same structure for an inner exception
      "innerException": null,
            
      //The message giving some human readable details about the error
      "message":"HttpException: The page does not exist.",

      //The class name of the exception
      //Required
      "className":"System.Web.HttpException",
            
      //Custom data about the exception in name-value pair format
      "data":{
        "key": "value",
        //And so on...
      },
    
      //The stack trace of the exception, is an array of frames
      "trace":[{
        "lineNumber": 42,
        "methodName": "Detail(int id)",
        "className": "SomeWebsite.Controllers.SomeController",
        "fileName": "Some filename"
      },
      //And so on...
    },

    //Details about the HTTP Request that triggered the exception
    //Useful when monitoring exceptions from web applications
    //Max serialized size of 60 kB
    "requestData": {

      "hostName": "blackmesa.research",
      "url": "/resonance/cascade",
      "method": "POST",
      "ipAddress": "23.100.31.73",

      "headers": {
        "Content-Type": "application/x-www-form-urlencoded",
        //...other headers
      },

      "cookies": {
        "_ga": "Google",
        //...other cookies
      },

      "serverData": {
        "REQUEST_METHOD": "Post",
        //...other server data
      },

      "queryString": {
        "name": "Alyx Vance",
        //...other query string parameters
      },

      "formData": {
        "name": "Gordon Freeman",
        //...other submitted form fields
      },

      //Useful if the above parameters miss fields that you would like to process later.
      "rawData": "...raw request..."
    },
        
    //The notifier used to submit the exception to slipspace
    "notifier": {
      "name": "Breencast",    //The name of the notifier
      "version": "17"         //The version of the notifier
    }
  }


</pre>

###Response codes

On receiving a request the API will respond with one of the following codes.

**202 Accepted**
The request was accepted and will now be processed.

**400 Bad request**
There was a problem processing the request, check the response body for details.

**401 Unauthorized:**
The X-ApiKey was not specified.

**403 Forbidden:**
The X-ApiKey specified was not valid.

**500 Internal server error:**
Hopefully you won't see this one! It means something went wrong on our end.