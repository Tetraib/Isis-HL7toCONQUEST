var express = require("express"),
app = express(),
exec = require('child_process').exec,
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
	res.send("Hello world");

});
app.post('/HL7_IN', function(req, res) {
	console.log(req.text)
	res.status(200).end();
// child = exec('C:\\Windows\\notepad.exe C:\\Users\\Thibaut\\NODEJS\\Isis-HL7toCONQUEST\\README.md',
// 	function (error, stdout, stderr) {
// 		if (error !== null) {
// 			console.log('exec error: ' + error);
// 		}
// 	});
});
app.listen(1338, '127.0.0.1');