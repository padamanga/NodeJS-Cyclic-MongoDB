require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
//const {check, validationResult} = require('express-validator');
const ejsMate = require('ejs-mate');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const helmet = require('helmet');
const LocalStrategy = require('passport-local');
const mongoSanitize = require('express-mongo-sanitize');
const MongoDBStore = require("connect-mongo");

const Book = require('./models/books');
const port = process.env.PORT || 3000;


const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/yelpCamp';
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.json());



app.get('/', (req, res) => {
    res.send("hello");
});

app.get('/add-note', (async (req, res) => {
    try {
        await Book.insertMany([
            {
                title: "Sons of Anarchy",
                body:"The body text is Here..."
            },
            {
                title: "Kirikou Film",
                body: "The boy of Africae..."
            }
        ])
    } catch (error) {
        console.log(`Oh No! Error: ${error}`);
    }
}));



app.get('/', (async(req, res) => {
    const book = await Book.find();
    if(book)
    {
        res.json(book);
    }
    else{
        res.send('Somthing went wrong!');;
    }
    // res.render('home');
}));




app.listen(port, () => {
    console.log(`Listening from PORT: ${port}`);
});

