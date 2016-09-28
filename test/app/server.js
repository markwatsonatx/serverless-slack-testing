var bodyParser = require('body-parser');
var express = require('express');
var functionRunner = require('./__functionRunner__.js');

var app = express();

app.use(bodyParser.json())

app.post('/function/:func', function(req, res) {
    res.send(functionRunner.run(req.params.func, req.body));
});

app.get('/auth/slack', function(req, res) {
	var args = {
		code: req.query.code,
		state: req.query.state,
		error: req.query.error
	};
	res.send(functionRunner.run('SlackAuth', args));
});

// start server
app.listen(3000, '0.0.0.0', function() {
  console.log('Server started on port 3000.')
});