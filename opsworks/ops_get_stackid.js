
var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
var opsworks = new AWS.OpsWorks();

opsworks.describeStacks({}, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data["Stacks"][0]["StackId"]);           // successful response
});
