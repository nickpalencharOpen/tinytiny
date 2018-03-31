let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
let passport = require('passport');
let mongoose = require('mongoose');
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

let User = mongoose.model('User');
let ENV = require('./env');

module.exports = function (app) {
    app.use(session({
        secret: ENV.SESSION_SECRET,
        store: new MongoStore({mongooseConnection: mongoose.connection}),
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 1470409855938}
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((obj, done) => done(null, obj));

    console.log("redirect url?? ", ENV.GOOGLE_REDIRECT_URL);

    let googleCredentials = {
        clientID: ENV.GOOGLE_CLIENT_ID,
        clientSecret: ENV.GOOGLE_SECRET,
        callbackURL: ENV.GOOGLE_REDIRECT_URL,
    };
    let verifyCallback = function (request, accessToken, refreshToken, profile, done) {
        //NOTE:::: I am using the email associate with type account only ({ value: 'thisemail@gmail.com', type: 'account })
        // but other types of emails ale available.
        // If this stops worknig or a situation is discovered whene a different type of email is needed within the google
        // profile, then this might need to be changed to a Promise.all scenerio, looking up with all the emails.

        // profile object error handling
        if (!(profile && profile.emails)) {
            return done("There was a problem with the profile structure provided by google");
        }

        // get the email that will be checked on the whitelist (see comment above)
        let lookupEmail = null;
        profile.emails.forEach(emailObj => {
            if (emailObj.type === 'account') {
                lookupEmail = emailObj.value;
            }
        });

        return User.findOne({email: lookupEmail}).then(profile => {
            console.log("looking for user verifiy");
            if (profile) return done(null, profile);
            console.log("errorrrr");
            done(5);
            // profile ? done(null, profile) : done("error")
        });
    };

    passport.use(new GoogleStrategy(googleCredentials, verifyCallback));

    app.get('/auth/success', passport.authenticate('google'), (err, req, res, next) => {
        console.log("error? ", err);
            if (err) {
                return res.redirect(`/error?code=${errorCode}`);
            }
            next();
        },
        (req, res) => res.redirect('/dashboard')
    );

    app.get('/auth/google', passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.email']
    }));

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/session', function (req, res) {
        if (req.user) {
            res.status(200).send({user: req.user});
        } else {
            res.status(404).send();
        }
    });

};
