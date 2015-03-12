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

    replicaEndpoint: function (rds, filter, callBack) {
        params = {};
        rds.describeDBInstances(params, function(err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else {
              var info;
              if (filter) {
                  info = module.exports.select(filter, 'Endpoint', data['DBInstances']);
              }
              callBack(info);
          }
        });
    },
};
