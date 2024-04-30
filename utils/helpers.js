const db = require('../config/database');

exports.testDBConnection = () => {
    return db.query('SELECT NOW();')
}