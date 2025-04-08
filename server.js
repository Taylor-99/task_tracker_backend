// Dependencies
const express = require('express'); // Web application framework
const livereload = require("livereload"); // Automatically refresh browser
const connectLiveReload = require("connect-livereload"); // Middleware for livereload
const morgan = require('morgan'); // HTTP request logger middleware
const cors = require("cors"); //Enable Cross-Origin Resource Sharing
require("dotenv").config(); // Loads environment variables from a .env file
const cookieParser = require("cookie-parser"); // Read and Work with cookies