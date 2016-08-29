# Chomecast Receiver React

## Table of Contents
- [Create the chromecast app](#create-the-chromecast-app)
- [Installation](#installation)
- [Debugging](#debugging)
- [Contributing](#contributing)

## Create the chromecast app

To create your receiver app, follow instructions describe in the cast documentation.
[Chromecast registration](https://developers.google.com/cast/docs/registration)

## Installation

* Install dependancies

```
npm i
```
* Start the development server. The server will be launched on port 3000

```
npm start
```

* The receiver app have to be hosted on an ```https``` url. To do that we need to secure tunnels to localhost. Ngrok will do the job for us. Download [ngrok](https://ngrok.com/download) and run the cmd bellow

```
ngrok http 3000 // The port set in param, have to be the same of the development server
```
Copy the generated url (ex:https://703b8da0.ngrok.io) and paste it in your app's settings in your Google Cast SDK Developer Console

## Debugging


 * Start your sender application
 * In the Chrome browser, enter the IP address of the device (eg. a Chromecast) on port 9222
 
 ```
 http://RECEIVER-IP-ADDRESS:9222
 ```
 
* The browser must be running on a computer connected to the same network as the receiver device. To get the IP address of a Chromecast device, use the Chromecast setup application.

* Click the link, Remote Debugging (App Engine) to run the debugger for your app.
You may have to click the shield icon in the URL field to enable scripts.

* Use ```window.location.reload(true);``` to perform a forced reload that flushes the cache of the receiver application.


## Contributing
* [Contributing] (CONTRIBUTING.md)




