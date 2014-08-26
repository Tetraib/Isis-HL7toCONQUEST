var express = require("express"),
app = express(),
exec = require('child_process').exec,
fs = require('fs'),
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
	
    fs.writeFile("./hl7/test", req.text, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
        // child = exec('dgate –loadhl7:file',
//  function (error, stdout, stderr) {
//      if (error !== null) {
//          console.log('exec error: ' + error);
//      }
//  });
    }
}); 

res.status(200).end();
});
app.listen(1338, '127.0.0.1');