var express = require("express"),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

// mongoose.connect('mongodb://mars:Winter12@ds063869.mongolab.com:63869');
mongoose.connect('mongodb://localhost/test');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
// app.use(methodOverride());

var ClientSchema = new mongoose.Schema({
  contactName: String,
  dba: String,
  address: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    zip: Number,
    country: String
  },
  billingAddress: {
    name: String,
    line1: String,
    line2: String,
    city: String,
    state: String,
    zip: Number,
    country: String
  },
  phone: String,
  website: String,
  email: String,
  description: String
});

var Client = mongoose.model('clients', ClientSchema);

app.get('/clients', function(req, res) {
  Client.find(function(err, clients) {
    if (err) {
      res.send(err);
    }

    res.json(clients);
  });
});

app.get('/clients/:id', function(req, res) {
  return Client.findById(req.params.id, function(err, client) {
    if (!err) {
      return res.send(client);
    } else {
      res.json(client);
    }
  });
});

app.post('/client', function(req, res) {
  Client.create({
    text: req.body.text,
    done: false
  }, function(err, trip) {
    if (err) {
      res.send(err);
    }

    Client.find(function(err, clients) {
      if (err) {
        res.send(err);
      }

      res.json(clients);
    });

  });
});

app.listen(8989);

console.log('api listening on 8989');
