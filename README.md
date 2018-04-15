# TinyTiny
version 0.0.3-beta.

Read about my [inspiration](https://www.nickpalenchar.com/url-shortener) for building this.

Contributors welcome! 
+ See [CONTRIBUTING](https://github.com/nickpalencharOpen/tinytiny/blob/master/CONTRIBUTING.md) to get started with setting up a development environment.
+ See [ARCHITECTURE](https://github.com/nickpalencharOpen/tinytiny/blob/master/config/readme.md) to get a better idea of how the directories are structured.

# Summary

TinyTiny is an open source URL-shortener app. Deployed on a server with a domain name, users can paste URL links (like "`www.google.com`") in the web interface and get a generated "shortened" route (like "`yourdomain.com/u4F`"), which will redirect requests to the original link (much like bit.ly or tinyurl.com). Anyone can navigate to these shortened links, which will redirect them to the original URL automatically.

# Install

```shell
$ git clone https://github.com/nickpalencharOpen/tinytiny.git
$ cd tinytiny
$ npm i
$ mkdir secrets
$ touch secrets/development.js # add secret variables (see setup in CONTRIBUTING)
$ npm start
```

# Production Setup

Feel free to deploy this for public, private, commercial and non-commercial use! You can edit variables in `config` to customize the app without modifying the code (modifying the code is of course welcomed as well--please contact me to share what you've added!). See [/config/readme.md](https://github.com/nickpalencharOpen/tinytiny/blob/master/config/readme.md) for info on how to customize via the config directory.
