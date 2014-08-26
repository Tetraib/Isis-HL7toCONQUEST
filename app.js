var express = require("express"),
app = express(),
exec = require('child_process').exec,
child;


app.get('/', function(req, res) {
	res.send("Hello world");
});

app.listen(1338, '127.0.0.1');

child = exec('C:\\Windows\\notepad.exe C:\\Users\\Thibaut\\NODEJS\\Isis-HL7toCONQUEST\\README.md',
	function (error, stdout, stderr) {
		if (error !== null) {
			console.log('exec error: ' + error);
		}
	});