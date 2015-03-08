
var AWS = require('aws-sdk');
AWS.config.region = 'eu-central-1';

var rds = new AWS.RDS();
var params = {
    AllocatedStorage: 5,                   /* required */
    DBInstanceClass: 'db.t2.micro',        /* required */
    DBInstanceIdentifier: 'WordpressTest', /* required */
    Engine: 'MySQL',                       /* required */
    MasterUserPassword: 'wordpress#',      /* required */
    MasterUsername: 'wordpress',           /* required */
    AutoMinorVersionUpgrade: false,
    DBName: 'wordpressdb',
    EngineVersion: '5.6',
    Iops: 0,
    MultiAZ: false,
    PubliclyAccessible: true,
};

rds.createDBInstance(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else     console.log(data);
});
