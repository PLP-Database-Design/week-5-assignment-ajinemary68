// declare dependencies / variables

const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

app.use(express.json());
app.use(cors());
dotenv.config();

// connect to the database ***

const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
);

// to check if db connection worked
db.connect((err) => {
    // No wedding today
    if(err) return console.log("Error connecting to the mysql db")
    
    // Yes wedding connected
    console.log("Connected to mysql successfully as id: ", db.threadId)

    //Your code goes here
    //GET METHOD example

    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');

    //Data is the name of the file inside views folder
    // Question 1
    app.get('/data', (req, res) => {
        // Retrieve data from database
        db.query('SELECT * FROM patients', (err, results) => {
            if (err){
                console.error(err);
                res.status(500).send('Error retrieving data');
            } else {
                // Render the data in a template
                res.render('data', {results: results });
            }
        })
    })

    //Question 2
    app.get('/data', (req, res) => {
        // Retrieve data from database
        db.query('SELECT * FROM providers', (err, results) => {
            if (err){
                console.error(err);
                res.status(500).send('Error retrieving data');
            } else {
                // Render the data in a template
                res.render('data', {results: results });
            }
        })
    })

    // Question 3
    app.get('/data', (req, res) => {
        // Retrieve data from database
        db.query('SELECT * FROM patients GROUP BY first_name', (err, results) => {
            if (err){
                console.error(err);
                res.status(500).send('Error retrieving data');
            } else {
                // Render the data in a template
                res.render('data', {results: results });
            }
        })
    })

    // Question 4
    app.get('/data', (req, res) => {
        // Retrieve data from database
        db.query('SELECT * FROM providers GROUP BY provider_specialty;', (err, results) => {
            if (err){
                console.error(err);
                res.status(500).send('Error retrieving data');
            } else {
                // Render the data in a template
                res.render('data', {results: results });
            }
        })
    })

    // listen to the server
    app.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`);
        
        // Send a message to the browser
        console.log('Sending message to browser...');
        app.get('/', (req,res) =>{
            res.send('Server started successfully! Wedding can go on')
        })
    });
});
