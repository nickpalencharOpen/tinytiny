let chalk = require('chalk');

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
    module.exports = require('./development');
}
