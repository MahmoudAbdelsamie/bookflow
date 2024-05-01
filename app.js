const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');
const db = require('./config/database');
const { testDBConnection } = require('./utils/helpers');

const PORT = process.env.PORT || 4000;

const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(session({
    store: new pgSession({
        pool: db,
        tableName: 'session'
    }),
    secret: 'houda',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        // httpOnly: true,
        // secure: true
    }
}));

app.use(userRoutes);
app.use(bookRoutes);

app.get('/', (req, res) => {
    res.send('<h1>Welcome To BookFlow!</h1>')
})



testDBConnection()
    .then(() => {
        console.log('Database Connected...');
        app.listen(PORT, () => {
            console.log(`Server Running On Port ${PORT}`)
        })
    })
    .catch(err => {
        console.log('Error: ', err);
    })
