#### Fork the repo

#### Setup Your Upstream

1. Change directory to the new tinytiny directory (`cd tinytiny`)
2. Add a remote to the official tinytiny repo:

```shell
$ git remote add upstream https://github.com/nickpalencharOpen/tinytiny.git
```

### Development Setup

Below are the steps needed to run the app locally

#### Install dependencies

```shell
$ npm i
```

#### Add Environment Variables.

Add the following to `secrets/development.js`, which is what is used by default.

```
module.exports = {
   BASE_URL: 'http://localhost:3210',
   NAKED_URL: 'localhost:3210',
   /* ... continue to add other keys when mentioned below */
   }
```


#### Run MongoDB

@TODO steps for running mongodb localls

When running, add the mongourl to `secrets/development.js` as `MONGO_URL`

#### Setup Google OAuth

Log into the Google Cloud Platform console: https://console.cloud.google.com

Click `API and Services` on the left menu.

Click `Enable APIs and Services`.

Search and find `Google+ API`, click enable.

Click `Credentials` on the left menu. This might just show as a key icon with no text.

Click `OAuth consent screen`, add a name (all other fields can be left blank). Click save.

Click `Credentials` tab, click `Create credentials > OAuth Client ID`

For Application type, select `Web application`.

Under `Restrictions`:

+ For `Authorized JavaScript origins`, add `http://localhost:3210`
+ For `Authorized redirect URIs`, add `http://localhost:3210/auth/success`

You will get a popup with a Client ID and secret. Add these to `secrets/development.js` as `GOOGLE_CLIENT_ID` and `GOOGLE_SECRET`, respectively.

Finally, add `"http://localhost:3210/auth/success"` to `secrets/development.js` as `GOOGLE_REDIRECT_URL`.

#### Run the app

```shell
$ cd tinytiny
$ npm start
```

Happy coding!
