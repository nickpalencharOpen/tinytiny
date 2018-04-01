# Architecture

This document walks through the archictecture and functionality of the app.

## Structure

TinyTiny takes the following structure

```
├ bin/
├ config/
├ env/
├ helper/
├ models/
├ public/
├ routes/
├ secrets/
├ views/
├ app.js
├ authSetup.js
```

They contain the following

+ **bin:** contains setup for the server. `www` is used to start the app via `npm start`
+ **config:** various options to change how the app works (see readme contained within)
+ **env** _\[DEPRECATED]_ contains secrets used in the app. Use `secrets/` instead
+ **models:** MongoDB Schemas for the Database.
+ **public:** Public assets, served staticly via `/public`.
+ **routes:** Various routes in the app, created via `express.Router`
+ **secrets:** (gitignored) Store secrets for environments (NOTE: This directory does not exist by default. Create directory to use)
+ **views:** Template HTML files for swig to use when rendering a view on the frontend.
+ **app.js:** Setup of express routes, require in auth. Generated initially from express generator.
+ **authSetup.js:** Setup of authentication using passport.js
