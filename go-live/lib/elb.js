
module.exports = ELB;

function ELB(aws, name) {
    this.name = name;
    this.elb = new aws.ELB();
}

ELB.prototype.describeInstances = function () {
    return this.data['Instances'].map(
        function (item) {
            return item['InstanceId']
        }
    );
};

ELB.prototype.create = function (params, callBack) {
    this.elb.createLoadBalancer(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            process.exit(-1);
        }
        else {
            callBack(data['DNSName']);
        }
    });
}

ELB.prototype.name = function () {
    return this.name;
}

ELB.prototype.listeners = function () {
    return this.data['ListenerDescriptions'].map(
        function (item) {
            return item['Listener'];
        }
    );
}

ELB.prototype.AZs = function () {
    return this.data['AvailabilityZones'];
}

ELB.prototype.scheme = function () {
    return this.data['Scheme'];
}

ELB.prototype.secGroups = function () {
    return this.data['SecurityGroups'];
}

ELB.prototype.subnets = function () {
    return this.data['Subnets'];
}

ELB.prototype.getParamsFromElb = function (elb) {
    var params = {
        Listeners: elb.listeners(),
        LoadBalancerName: this.name,
        Scheme: elb.scheme(),
        SecurityGroups: elb.secGroups(),
        Subnets: elb.subnets(),
    }
    return params;
}

ELB.prototype.populate = function (callBack) {
    var params = {
        LoadBalancerNames: [ this.name ],
    };

    var that = this;
    this.elb.describeLoadBalancers(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            process.exit(-1);
        }
        else {
            data = data['LoadBalancerDescriptions'];
            if (data.length == 0) {
                console.log("No results for this query:\n", params);
                process.exit(0);
            }
            that.setInfo(data[0]);
            callBack();
        }
    });
};

ELB.prototype.setInfo = function (data) {
    this.data = data;
}
