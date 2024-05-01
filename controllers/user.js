const db = require('../config/database');

exports.login = async (req, res, next) => {
    req.session.user = {
        name: 'mahmoud'
    }
    res.redirect('/');
}