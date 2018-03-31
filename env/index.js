let chalk = require('chalk');
let fs = require('fs');
let path = require('path');

if(process.env.SMOKE_TEST){
    console.log(chalk.inverse("Smoke test responding!"));
    console.log(chalk.gray(process.env.SMOKE_TEST));
}

if(process.env.NODE_ENV === 'production'){
    // production
    console.log(chalk.bgRed("Running in PRODUCTION mode"));
    module.exports = require('./production');
}
else if(process.env.NODE_ENV === 'staging'){
    // staging
    console.log(chalk.bgYellow("Running in STAGING mode"))
}
else {
    console.log(chalk.inverse("Running in DEVELOPMENT mode"));
    if (fs.existsSync(path.join(__dirname, '../secrets/development.js'))) {
        console.log(chalk.gray("using variables from secrets/development.js"));
        module.exports = require('../secrets/development');
    }
    else {
        console.log(chalk.red(chalk.bold("WARNING ") + "using environment variables from `env`. This will be removed in the next" +
            "major release. Create a `secrets` directory and add move environment variables there instead." +
            "See https://github.com/nickpalencharOpen/tinytiny/issues/1 for more info."));
        module.exports = require('./development');
    }
}
