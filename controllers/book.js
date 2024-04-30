const db = require('../config/database');


exports.addBook = async (req, res, next) => {
    const {
        title,
        author,
        published_year,
        genre
    } = req.body;
    const query = 'INSERT INTO books (title, author, published_year, genre) VALUES($1, $2, $3, $4);';

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
};


exports.getBooks = async (req, res, next) => {
    let query = 'SELECT * FROM books';
    const queryParams = [];
    let index = 1;
    const {
        author,
        published_year,
        genre
    } = req.query;
        
    if(author || published_year || genre) {
        query += ' WHERE 1=1'; 
        if(author) {
            query += ` AND author=$${index}`;
            queryParams.push(author);
            index++;
        }
        if(published_year) {
            query += ` AND published_year=$${index}`;
            queryParams.push(parseInt(published_year));
            index++;
        }
        if(genre) {
            query += ` AND genre=$${index}`;
            queryParams.push(genre);
        }
    }
    query += ';';
    try {
        const books = await db.query(query, queryParams);
        if(books.rowCount < 1) {
            return res.status(404).send({
                status: 'error',
                message: 'No Books Found'
            })
        }
        return res.status(200).send({
            status: 'Success',
            message: 'Books Retrieved',
            data: books.rows
        })
    } catch(err) {
        return res.status(500).send({
            status: 'error',
            message: 'Internal Server Error',
            error: err.message
        })
    }    
};


exports.getBookById = async (req, res, next) => {
    const { id } = req.params;
    const query = 'SELECT * FROM books WHERE id=$1;';
    try {
        const book = await db.query(query, [id]);
        if(book.rowCount < 1) {
            return res.status(404).send({
                message: 'No Book Found'
            })
        }
        return res.status(200).send({
            status: 'Success',
            message: 'Book Retreived...',
            data: book.rows
        })
    } catch(err) {
        return res.status(500).send({
            error: err.message
        })
    }
};
