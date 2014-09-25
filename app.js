var express = require("express"),
	app = express(),
	mysql = require('mysql'),
	bodyParser = require('body-parser'),

	mysqlPool = mysql.createPool({
		host: 'localhost',
		user: 'me',
		password: 'secret',
		database: 'conquest'
	});
app.use(bodyParser.json());
app.use(function(req, res, next) {
	if (req.is('text/*')) {
		req.text = '';
		req.setEncoding('utf8');
		req.on('data', function(chunk) {
			req.text += chunk;
		});
		req.on('end', next);
	}
	else {
		next();
	}
});

app.get('/', function(req, res) {
	res.send("Isis-HL7toCONQUEST is running smouthly..");

});

app.post('/JSON_IN', function(req, res) {
	mysqlPool.getConnection(function(err, connection) {
		if (err) {
			console.log(err);
		}
		else {
			if (req.body.action == "add") {
				delete req.body.action;
				connection.query('INSERT INTO dicomworklist SET ?', req.body, function(err, result) {
					if (err) {
						console.log(err);
					}
					else {
						res.status("200").end();
					}
				});
			}
			connection.release();
		}
	});
});

// app.post('/HL7_IN', function(req, res) {

// });

app.listen(1337, '127.0.0.1');