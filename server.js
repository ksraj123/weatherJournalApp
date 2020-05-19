// Requireng required packages
const express = require('express')
const bodyParser = require('body-parser')

// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = 3000;

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// using ejs templating
app.set('view engine', 'ejs')

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(port, () => console.log(`Weather Journal app listening at http://localhost:${port}`))