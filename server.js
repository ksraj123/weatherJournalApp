// Requireng required packages
const express = require('express')

// Setup empty JS object to act as endpoint for all routes
projectData = {posts: []};
const port = 3000;

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// using ejs templating
app.set('view engine', 'ejs')

// Initialize the main project folder
app.use(express.static('website'));

app.get('/data', function(req, res){
    res.json(projectData);
})

app.post('/data', function(req, res){
    console.log('POST route');
    projectData.posts.push(req.body);
    res.json(projectData);
})

// Setup Server
app.listen(port, () => console.log(`Weather Journal app listening at http://localhost:${port}`))