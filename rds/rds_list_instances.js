
var AWS = require('aws-sdk');
AWS.config.region = 'eu-central-1';

var rds = new AWS.RDS();
var params = {};
rds.describeDBInstances(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else     console.log(data);
});
