opt = require('node-getopt').create([
  ['h' , 'help'          , 'display this help']                ,
  ['f' , 'file=ARG'      , 'Path of the file which has the DBInstanceIdentifier names'] ,
  ['i' , 'instance=ARG+' , 'Instance name of the replica'],
  ['p' , 'port'          , 'Print the port defined in the Endpoint']
])
.bindHelp()
.parseSystem();

var path = opt['options']['file'];
var instances = opt['options']['instance'];

if (path) {
    fs = require('fs');
    instances = fs.readFileSync(path).toString().split("\n");
    instances.pop(); // Delete the last item which is void ''.
}

var AWS = require('aws-sdk');
AWS.config.region = 'eu-central-1';
var awsRds = new AWS.RDS();
var rds = require('./rds')


for (i in instances){
    rds.replicaEndpoint(awsRds, {DBInstanceIdentifier: instances[i]}, function(endpoint) {
        var output = endpoint['Address'];
        if (opt['options']['port']) {
            output += ':'+endpoint['Port'];
        }
        console.info(output);
    });
}

