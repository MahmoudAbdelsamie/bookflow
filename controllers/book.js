const db = require('../config/database');


exports.addBook = async (req, res, next) => {
    const {
        title,
        author,
        published_year,
        genre
    } = req.body;

    const query = 'INSERT INTO books (title, author, published_year, genre) VALUES($1, $2, $3, $4);'
    try {
        await db.query(query, [title, author, published_year, genre]);
        return res.status(201).send({
            status: 'Success',
            message: 'Book Added...'
        })
    } catch(err) {
        return res.status(500).send({
            error: err.message
        })
    }
}

