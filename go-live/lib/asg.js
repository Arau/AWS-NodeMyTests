module.exports = ASG;

function ASG(aws, name) {
    this.name = name;
    this.asg = new aws.AutoScaling();
}

ASG.prototype.describeInstances = function () {
    return this.data['Instances'].map(
        function (item) {
            return item['InstanceId']
        }
    );
};

ASG.prototype.launchConfigName = function () {
    return this.data['LaunchConfigurationName'];
}

ASG.prototype.zoneId = function () {
    return this.data['VPCZoneIdentifier'];
}

ASG.prototype.minSize = function () {
    return this.data['MinSize'];
}

ASG.prototype.maxSize = function () {
    return this.data['MaxSize'];
}

ASG.prototype.lbNames = function () {
    return this.data['LoadBalancerNames'];
}

ASG.prototype.create = function (params, callBack) {
    this.asg.createAutoScalingGroup(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            process.exit(-1);
        }
        else {
            callBack();
        }
    });
}

ASG.prototype.getParamsFromAsg = function (asg) {
    var params = {
        AutoScalingGroupName: this.name,
        MaxSize: asg.maxSize(),
        MinSize: asg.minSize(),
        DesiredCapacity: asg.describeInstances().length,
        HealthCheckGracePeriod: 90,
        LaunchConfigurationName: asg.launchConfigName(),
        VPCZoneIdentifier: asg.zoneId(),
    }
    return params;
}

ASG.prototype.populate = function (callBack) {
    var params = {
        AutoScalingGroupNames: [ this.name ],
    };

    var that = this;
    this.asg.describeAutoScalingGroups(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            process.exit(-1);
        }
        else {
            if (data['AutoScalingGroups'].length == 0) {
                console.log("No results for this query:\n", params);
                process.exit(0);
            }
            that.setInfo(data['AutoScalingGroups'][0]);
            callBack();
        }
    });
};

ASG.prototype.setInfo = function (data) {
    this.data = data;
}
