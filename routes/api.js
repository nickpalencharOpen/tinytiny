let router = require('express').Router();
let chalk = require('chalk');
let { requireAuthentication, randomHash } = require('../helper');
let mongoose = require('mongoose');
let Link = mongoose.model('Link');
let reserved = require('../config/reserved').concat(Object.keys(require('../config/hardRoutes')));
let { defaultStartLength } = require('../config/linkOptions');


//// POST api/new-link ////
/** creates a new tiny link.
 *
 *  @property {string} expandedUrl (Required) full URL that the tiny link should redirect to.
 *  @property {string} customName a link code to use instead of a randomly generated one. "customNameAllowed" must be
 *    true in config/linkOptions.json to use this.
 */
router.post('/new-link', requireAuthentication ,(req, res) => {
    let { expandedUrl, customName } = req.body;
    if(!/^https?:\/\//.test(expandedUrl)) expandedUrl = "http://" + expandedUrl;

    function tryLink(n=defaultStartLength, attempt=1){
        // randomly tries to find an available link
        return new Promise((resolve, reject) => {
            let id = (require('../config/linkOptions').customNameAllowed && customName) || randomHash(n);
            return Link.find({link_id: id})
                .then(result => {
                    if(result.length) {
                        console.log("link already exists: ", result);
                        if(attempt > 100) reject({nick:true, error: "Gave up finding an available link", body: "This might be solved " +
                        "if you try again. If not, the admin might have to expand the algorithm. Wow this app grew quick!"});
                        else return tryLink(n+1, attempt+1);
                    }
                    if(reserved.includes(id.toLowerCase())){
                        reject({ nick:true, error: "Link is a reserved word", body: "You can't use that! Because programming needs. " +
                        "Try something else. Please note that no uppercase version of the reserved word can be used either, " +
                        "to avoid ambiguity."});
                    }
                    else return Link.create({link_id: id, expandedUrl, author: req.user._id})
                        .then(result => resolve(result));
                })
        })
    }
    tryLink()
        .then(result => {
            res.redirect('/dashboard?success=' + JSON.stringify(result));
        })
        .catch( err => {
            console.log("ERR", err);
            if(err.nick) res.render('error', {err} );
            else res.redirect('/error?code=1');
        })
});

module.exports = router;
