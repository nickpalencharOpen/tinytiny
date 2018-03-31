module.exports.requireAuthentication = function(req, res, next){
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/');
};

// @TODO: In the future, we should hash strings based on their url value and make a true hash table
// @TODO: hash table should probably be in a RDBM

module.exports.randomHash = function(num=2){
    let validChars = require('../config/linkOptions').validChars;
    if (!validChars) {
        throw new ReferenceError("Option 'validChars' not defined! Check the option in config/linkOptions.json");
    }
    if(typeof validChars !== 'string') {
        throw new TypeError("Option 'validChars' must be a string. Check the option in config/linkOptions.json");
    }

    let result = '';
    for(let i = 0; i < num; i++){
        result += validChars[Math.floor(Math.random() * validChars.length)];
    }
    return result;
};
