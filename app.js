var express = require("express"),
	app = express(),
	child_process = require('child_process'),
	fs = require('fs'),
	path = require('path'),
	mysql = require('mysql'),
	bodyParser = require('body-parser'),
	exec,
	mysqlonnection = mysql.createConnection({
		host: 'localhost',
		user: 'me',
		password: 'secret',
		database:'conquest'
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

app.post('/HL7_IN', function(req, res) {
	var filename = Date.now() + ".hl7";

	fs.writeFile("./hl7/" + filename, req.text, function(err) {
		if (err) {
			console.log(err);
		}
		else {
			exec = child_process.exec("loadhl7.cmd " + path.normalize(__dirname + "/hl7/") + filename);
			exec.stdout.on('data', function(data) {});
			exec.stderr.on('data', function(data) {});
			exec.on('close', function(code) {
				//it bug with code 1 but the action is done properly :-/ ...
				res.status("200").end();
			});
		}
	});
});

app.post('/JSON_IN', function(req, res) {
	mysqlonnection.connect();

	if (req.body.action == "add") {
		delete req.body.action;
		mysqlonnection.query('INSERT INTO dicomworklist SET ?', req.body, function(err, result) {
			if (err) {
				console.log(err);
			}
			else {
				res.status("200").end();
			}
		});
	}

	mysqlonnection.end();
});

app.listen(1337, '127.0.0.1');