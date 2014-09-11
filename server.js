var express = require("express"),
app = express(),
mongoose = require('mongoose'),
bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/clients');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

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
  var client = new Client({
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

  client.save(function(err) {
    if (!err) {
    } else {
      return console.log(err);
    }
  });

  return res.send(client);
});

app.put('/api/clients/:id', function(req, res) {

  if (req.params.id && req.params.id === '') {
    return console.log('No id specified');
  }

  return Client.findById(req.params.id, function(err, client) {

    if (!client) {
      return res.send('client does not exist);
    }
    
    client.contactName = req.body.contactName,
    client.dba = req.body.dba,
    client.address = {
      line1: req.body.address.line1,
      line2: req.body.address.line2,
      city: req.body.address.city,
      state: req.body.address.state,
      zip: req.body.address.zip,
      country: req.body.address.country
    },
    client.billingAddress = {
      name: req.body.billingAddress.name,
      line1: req.body.billingAddress.line1,
      line2: req.body.billingAddress.line2,
      city: req.body.billingAddress.city,
      state: req.body.billingAddress.state,
      zip: req.body.billingAddress.zip,
      country: req.body.billingAddress.country
    },
    client.phone = req.body.phone,
    client.website = req.body.website,
    client.email = req.body.email,
    client.description = req.body.description;

    client.save(function(err) {
      if (!err) {
      } else {
        console.log(err);
      }

      return res.send(client);
    });
  });
});

app.delete('/api/clients/:id', function(req, res) {

  if (req.params.id && req.params.id === '') {
    return console.log('No id specified');
  }

  return Client.findById(req.params.id, function(err, client) {

    if (!client) {
      return res.send('client does not exist);
    }

    return client.remove(function(err) {
      if (!err) {
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
});

app.listen(8989);

console.log('api listening on 8989');
