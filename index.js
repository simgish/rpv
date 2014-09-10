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

app.get('/api/clients', function(req, res) {
  Client.find(function(err, clients) { 
    if (err) {
      res.send(err);
    }

    res.json(clients);
  });
});

app.get('/api/clients/:id', function(req, res) {
  return Client.findById(req.params.id, function(err, client) {
    if (!err) {
      return res.send(client);
    } else {
      res.json(client);
    }
  });
});

app.post('/api/clients', function(req, res) {
  var client;

  client = new Client({
    contactName: req.body.contactName,
    dba: req.body.dba,
    address: {
      line1: req.body.address.line1,
      line2: req.body.address.line2,
      city:  req.body.address.city,
      state: req.body.address.state,
      zip: req.body.address.zip,
      country: req.body.address.country
    },
    billingAddress: {
      name: req.body.billingAddress.name,
      line1: req.body.billingAddress.line1,
      line2: req.body.billingAddress.line2,
      city: req.body.billingAddress.city,
      state: req.body.billingAddress.state,
      zip: req.body.billingAddress.zip,
      country: req.body.billingAddress.country
    },
    phone: req.body.phone,
    website: req.body.website,
    email: req.body.email,
    description: req.body.description
  });

});

app.listen(8989);

console.log('api listening on 8989');
