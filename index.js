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

var MarsSchema = new mongoose.Schema({
  order: Number,
  name: String,
  days: Number
});

var Mars = mongoose.model('orders', MarsSchema);

app.get('/trips', function(req, res) {
  Mars.find(function(err, orders) {
    if (err) {
      res.send(err);
    }

    res.json(orders);
  });
});

app.post('trips', function(req, res) {
  Mars.create({
    text: req.body.text,
    done: false
  }, function(err, trip) {
    if (err) {
      res.send(err);
    }

    Mars.find(function(err, trips) {
      if (err) {
        res.send(err);
      }

      res.json(trips);
    });

  });
});

app.listen(8989);

console.log('api listening on 8989');
