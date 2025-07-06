// Get dependencies
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import the routing files for your resources
var documentRoutes = require('./server/routes/documents');
var messageRoutes = require('./server/routes/messages');
var contactRoutes = require('./server/routes/contacts');

// Import the routing file to handle the default (index) route
var index = require('./server/routes/app');

var app = express(); // create an instance of express

// ------------------ MongoDB Connection ------------------
mongoose.connect('mongodb://localhost:27017/cms',
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      console.log('Connection failed: ' + err);
    } else {
      console.log('Connected to database!');
    }
  }
);
// --------------------------------------------------------

// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Tell express to use the specified directory as the root directory for your website
app.use(express.static(path.join(__dirname, 'dist/cms')));

// Map the default route ('/') to the index route
app.use('/', index);

// Map URLs to routing files for API endpoints
app.use('/documents', documentRoutes);
app.use('/messages', messageRoutes);
app.use('/contacts', contactRoutes);

// Map all other non-defined routes back to the index page (for Angular routing support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/cms/index.html'));
});

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function() {
  console.log('API running on localhost: ' + port);
});
