opt = require('node-getopt').create([
  ['h' , 'help'           , 'display this help'],
  [''  , 'stack-name=ARG' , 'Stack name'],
  [''  , 'layer-name=ARG' , 'Long layer name']
])
.bindHelp()
.parseSystem();

var stackName = opt['options']['stack-name'];
var layerName = opt['options']['layer-name'];

if (!stackName) {
    console.info("Stack name not defined.");
    process.exit(code=0);
}

var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
var opsworks = new AWS.OpsWorks();

var ops = require('./opsworks');

ops.instanceInfo(
    opsworks,
    { StackName: stackName,
      LayerName: layerName,
      selector:  'InstanceId',
    },
    function (instanceIds) {
        instanceIds.map(
            function (id){
                console.info(id)
            }
        );
});
