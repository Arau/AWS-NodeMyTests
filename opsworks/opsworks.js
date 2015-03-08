module.exports = {

    /*
     * filter := { Name: "MyName" }
     * select the Id of the data which match with the
     * filter option
     */
    select: function(filter, field, data) {
        var selector = Object.keys(filter)[0];
        for (var i in data) {
          if (filter[selector] == data[i][selector]){
              return data[i][field];
          }
        }
    },

    stackId: function (opsworks, filter, callBack) {
        opsworks.describeStacks({}, function(err, data) {
          if (err) console.log(err, err.stack);
          else {
              var idName = "StackId";
              if (filter) {
                  info = module.exports.select(filter, idName, data["Stacks"]);
              } else {
                  info = data["Stacks"].map(
                      function(stack) { return stack[idName] }
                  );
              }
              callBack(info);
          }
        });
    },

    layerId: function (opsworks, params, filter, callBack) {
        opsworks.describeLayers(params, function(err, data){
            if (err) console.log(err, err.stack);
            else {
                var idName = "LayerId";
                if (filter) {
                    info = module.exports.select(filter, idName, data["Layers"]);
                } else {
                    info = data["Layers"].map(
                        function(layer) { return layer[idName] }
                    );
                }
                callBack(info);
            }
        });
    },

    instanceIds: function (opsworks, info, callBack) {
        module.exports.stackId(opsworks, {Name: info["StackName"]}, function(stackId) {
            if (info["layerName"]) {
                module.exports.layerId(opsworks,
                    { StackId: stackId },
                    { Name: info["layerName"] },
                    function (layerId) {
                        describeInstances({LayerId: layerId});
                    }
                );
            } else {
                describeInstances({StackId: stackId});
            }
        });

        function describeInstances(params) {
            opsworks.describeInstances(params, function(err, data) {
                if (err) console.log(err, err.stack);
                else {
                    var ids = data["Instances"].map(
                        function (instance) {
                            return instance["InstanceId"]
                        }
                    );
                    callBack(ids);
                }
            });
        }
    },
};
