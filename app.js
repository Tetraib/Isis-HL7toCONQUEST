var express = require("express"),
	app = express(),
	exec = require('child_process').exec,
	fs = require('fs'),
	path = require('path'),
	child;

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
	console.log(req.text);
	var filename = Date.now() + ".hl7";

	fs.writeFile("./hl7/" + filename, req.text, function(err) {
		if (err) {
			console.log(err);
		}
		else {
			child = exec(path.normalize(__dirname + "/../dgate –loadhl7:") + "./hl7/" + filename,
				function(error, stdout, stderr) {
					if (error !== null) {
						console.log('exec error: ' + error);
					}
					else {
						res.status(200).end();
					}
				});
		}
	});
});

app.listen(1337, '127.0.0.1');