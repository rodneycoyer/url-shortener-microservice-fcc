require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const URLshort = require('./models/url');

const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;
// connect to mongo server with mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch(err => console.log(err.reason));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
// parse application/json
app.use(bodyParser.json());
app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});



// url shortener API endpoint
app.post('/api/shorturl/new', function (req, res) {
  // user url entry
  const userUrlInput = req.body.url;
  // create but do not execute query search
  const findUrl = URLshort.find({original_url: userUrlInput});


  res.json({
    original_url: userUrlInput,
    short_url: ''
  });
  console.log(req.body)
});






app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
