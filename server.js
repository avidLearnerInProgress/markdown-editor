var express = require('express');
var share = require('share');


var app = express();


app.set('view engine', 'ejs');

app.use(express.static(__dirname+'/public'));

app.get('/', (req,res)=>{
	res.render('pad');
});

app.get('/(:id)', (req, res)=>{
  res.render('pad');
});

require('redis');
var options = {
	db: {type: 'redis'},
};

share.server.attach(app, options);

var port = process.env.PORT || 8000;
app.listen(port);