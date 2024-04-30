const express = require('express');
const bodyParser = require('body-parser');


const bookRoutes = require('./routes/book');
const db = require('./config/database');
const { testDBConnection } = require('./utils/helpers');

const PORT = process.env.PORT || 4000;

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bookRoutes);

app.get('/', (req, res) => {
    res.send('<h1>Welcome To Books!</h1>')
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
