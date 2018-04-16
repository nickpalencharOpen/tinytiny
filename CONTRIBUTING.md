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

Add the following template to `secrets/development.js`, which is what is used as the default configuration for the application. 

>*In order to develop locally, each of these values will need to be populated.* 

```javascript
module.exports = {
   BASE_URL: 'http://localhost:3210',
   NAKED_URL: 'localhost:3210',
   MONGO_URL: '', 
   GOOGLE_CLIENT_ID: '',
   GOOGLE_SECRET: '',
   GOOGLE_REDIRECT_URL: '',
   SESSION_SECRET: '*SomeSecret*'  
}
```


#### Run MongoDB

@TODO steps for running mongodb locally

When running, add the mongourl to `secrets/development.js` as `MONGO_URL`

#### Setup Google OAuth

1. Log into the Google Cloud Platform console: https://console.cloud.google.com
1. Create a new project
1. Click `API and Services` on the left menu.
1. Click `Enable APIs and Services`.
1. Search and find `Google+ API`, click enable.
1. Click `Credentials` on the left menu. This might just show as a key icon with no text.
1. Click `OAuth consent screen`, add a name (all other fields can be left blank). Click save.
1. Click `Credentials` tab, click `Create credentials > OAuth Client ID`
    1. For Application type, select `Web application`.
    1. Under `Restrictions`:
        1. For `Authorized JavaScript origins`, add `http://localhost:3210`
        1. For `Authorized redirect URIs`, add `http://localhost:3210/auth/success`
    You will get a popup with a Client ID and secret. Add these to `secrets/development.js` as `GOOGLE_CLIENT_ID` and `GOOGLE_SECRET`, respectively.
1. Finally, add `"http://localhost:3210/auth/success"` to `secrets/development.js` as `GOOGLE_REDIRECT_URL`.

#### Add User to DB

1. Run the mongo client in shell:
    ```shell
    $ mongo
    ```
1. Create a new user with the email attached to your google account that you will use to sign into the app with
    ```shell
    > db.users.insert({ name: 'YOUR NAME', email: 'YOUR_EMAIL@gmail.com' })
    ```
    

#### Run the app

```shell
$ cd tinytiny
$ npm start
```

Happy coding!
