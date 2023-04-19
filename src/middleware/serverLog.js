const colors = require('colors');
const serverLog = (req, res, next) => {
    console.log(`${req.method}`.gray + `${req.url}`.cyan);
    next()
}
module.exports = serverLog;