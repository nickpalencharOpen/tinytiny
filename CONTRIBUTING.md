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

@TODO


