var getRange = function(date, range, field) {
    var from = new Date(date.setSeconds(date.getSeconds() - range));
    var to = new Date(date.setSeconds(date.getSeconds() + range * 2));
    var result = {};
    result[field] = {
        $gte: from,
        $lte: to
    };

    return result;
};

var getGuid = (function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return function() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
})();
