
var AWS = require('aws-sdk');
AWS.config.region = 'eu-central-1';

var rds = new AWS.RDS();
var params = {
  DBInstanceIdentifier: 'Replica',             /* required */
  SourceDBInstanceIdentifier: 'WordpressTest', /* required */
  AutoMinorVersionUpgrade: false,
  DBInstanceClass: 'db.t2.micro',
  PubliclyAccessible: true,
};

rds.createDBInstanceReadReplica(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
