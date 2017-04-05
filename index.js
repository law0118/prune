const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// setup express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://admin_tier0:root@ds135800.mlab.com:35800/prune_news')
mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/api', routes);
app.use(function(err, req, res, next){
  res.status(422).send({error: err.message});
});

// listen request
app.listen(process.env.port || 8000, function(){
  console.log('Start application in : localhost:8000');
});
