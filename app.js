var express = require('express');
var app = express();

app.use(express.bodyParser());

app.get('/', function(req, res){
  res.send('hello world');
  console.log('here');
});

app.post('/', function(req, res) {
  res.send('success');
  console.log(req.body);
});

app.listen(8000);
