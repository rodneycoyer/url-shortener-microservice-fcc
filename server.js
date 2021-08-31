require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const URLshort = require('./models/url');
const { deleteOne } = require('./models/url');

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
app.post('/api/:shorturl/', function (req, res) {
  // user req url
  const url_input = req.body.url;
  // url lookup
    URLshort.findById(url_input, function (err, storedUrl) {
      if ( url_input == 'invalid url') {
        res.json({error: 'invalid url'});
      } else {
        if (err) {
          return console.log(err);
        } else if (url_input !== storedUrl) {
          URLshort.save((err, url_input) => {
            // create instance of url doc to save
            const saveReqUrl = new URLshort({original_url: url_input});
            if (err) return console.log(err);
            done(null, saveReqUrl);
          })
        }
      }
      res.json({
        original_url: url_input,
        short_url: __dirname + "api/shorturl" + saveReqUrl._id
      });
    }
  );
});



app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
