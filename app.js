let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let chalk = require('chalk');
let swig = require('swig');

let ERROR_CODES = require('./config/errorCodes');

let {requireAuthentication, randomHash} = require('./helper');

const { BASE_URL, NAKED_URL=BASE_URL } = require('./env');
const { linksPerPage: LINKS_PER_PAGE } = require('./config/dashboard');

let app = express();
///// data models ////
require('./models/user');
require('./models/link');

// HTTPS headers and request logging
app.use(function(req, res, next){
    console.log("----- NEW REQUEST -----");
    console.log(chalk.blue(`${req.method} ${req.url}`));
    if(req.body) console.log(chalk.yellow(`BODY: ${req.body}`));
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', BASE_URL);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//authentication
require('./authSetup')(app);

// view engine setup
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

let swigCache = false;
if((process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging')){
    console.log(chalk.green("Swig cache is NOT enabled, but view cache is."));
    swigCache = true;
}
else console.log(chalk.yellow("Swig cache is disabled"));

app.set('view cache', swigCache);
swig.setDefaults({ cache: false });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/bower', express.static(path.join(__dirname, 'bower_components')));

// app.use('/users', users);

// passport auth setup TODO: Move this to `authSetup.js`
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let User = mongoose.model('User');

/// ROUTES ///
app.get('/', (req, res ) =>
{
    if(req.isAuthenticated()){
        res.redirect('/dashboard');
    }
    else res.render('index');
});
// hard-coded redirects
let hardRoutes = require('./config/hardRoutes');
console.log(chalk.red('ROUTES '), hardRoutes);
for(let k in hardRoutes){
    if(hardRoutes.hasOwnProperty(k)) {
        console.log("adding in ", k, " ", hardRoutes[k]);
        app.get(`/${k}`, (req, res) => {
            console.log("AT A ROUTE, redirect to ", hardRoutes[k]);
            res.redirect(hardRoutes[k])
        });
    }
}
let Link = mongoose.model('Link');
app.get('/dashboard', requireAuthentication, (req, res) => {
    Link.find({author: req.user._id})
        .then(links => {
            links.reverse();

            let linkPages = [];

            for (let i = 0; i < links.length; i += LINKS_PER_PAGE ) {
                linkPages.push(links.slice(i, i + LINKS_PER_PAGE));
            }

            let success = req.query.success && JSON.parse(req.query.success);

            res.render('dashboard', {username: req.user.name, linkPages, success, NAKED_URL});
        });
});


app.use('/api', require('./routes/api'));

app.get('/error', (req, res) => {
    let err = ERROR_CODES[req.query.code] || ERROR_CODES["1"];
    res.render('error', {err});
});

app.get('/:id', (req, res) => {
    //@@~~**REDIRECTION TIME**~~@@
    // THIS IS WHAT WE CAME HER FOR PPL1//
    console.log("looking up ", req.params.id);
    return Link.findOne({link_id: req.params.id})
        .then(result => {
            if(result) res.redirect(result.expandedUrl);
            else res.redirect('/error?code=404');
        })
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
});

module.exports = app;
