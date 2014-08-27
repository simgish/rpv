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

app.get('/gettrips', function(req, res) {
  Mars.find(function(err, orders) {
    if (err) {
      res.send(err);
    }

    res.json(orders);
  });
});

app.listen(8989);

console.log('api listening on 8989');
