var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'Hl7Worklist',
  description: 'Worklist node to conguest',
  script: require('path').join(__dirname,'app.js')
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();