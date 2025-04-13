// Dependencies
const express = require('express'); // Web application framework
const livereload = require("livereload"); // Automatically refresh browser
const connectLiveReload = require("connect-livereload"); // Middleware for livereload
const morgan = require('morgan'); // HTTP request logger middleware
const cors = require("cors"); //Enable Cross-Origin Resource Sharing
require("dotenv").config(); // Loads environment variables from a .env file
const cookieParser = require("cookie-parser"); // Read and Work with cookies

loginCtrl = require('./controllers/loginController');

const PORT = process.env.PORT||4000;

const app = express();

const liveReloadServer = livereload.createServer();

liveReloadServer.server.once("connection", () => {
    // wait for nodemon to fully restart before refreshing the page
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});


app.use(express.static('public'));
// Use the connect-livereload package to connect nodemon and livereload
app.use(connectLiveReload());
// Body parser: used for POST/PUT/PATCH routes: 
// this will take incoming strings from the body that are URL encoded and parse them into an object that can be accessed in the request parameter as a property called body (req.body).
app.use(express.urlencoded({ extended: true })); // parse incoming requests with URL payloads (actual data that is sent) and makes the data available in req.body
app.use(express.json()); // Parses incoming JSON requests

app.use(morgan('tiny')); // tiny logging format

app.get('/', (req, res)=>{
    res.send('Hello world');
});

app.use('/login', loginCtrl);

// App Listen
app.listen(PORT, ()=> {
    console.log(`Listening to port ${PORT}`);
  }); 