DBQuery.prototype.asc = function() {
    return this._addSpecial('$orderby', {
        _id: 1
    });
};

DBQuery.prototype.desc = function() {
    return this._addSpecial('$orderby', {
        _id: -1
    });
};

DBQuery.prototype.extractFieldToArray = function(field) {
    if (!_)
        throw Error('underscore missing');

    if (field === undefined || field === null)
        field = '_id';

    // the cursor will be fetched completely at this point
    var arrayResult = this.toArray();

    return _.chain(arrayResult)
        .pluck(field)
        .map(function(item) {
            return isNumber(item) ? NumberInt(item) : item;
        })
        .value();
};

DBQuery.prototype.toJiraTable = function() {

    var array = this.toArray();

    if (!_) {
        return 'underscore not found.';
    }

    var result = '||';
    _.each(_.keys(array[0]), function(item) {
        result += item + '||';
    });

    result += '\n';

    _.each(array, function(item) {
        result += '|';

        _.each(_.keys(item), function(header) {
            if (isObject(item[header])) {
                result += JSON.stringify(item[header]) + '|';
            } else {
                result += item[header] + '|';
            }
        });

        result += '\n';

    });

    return result;
};

DBQuery.prototype.toHtmlTable = function() {

    var array = this.toArray();

    if (!_) {
        return 'underscore not found.';
    }

    // first fetch all possible header keys
    // the order of fields in an object may differ
    var allKeys = _.chain(array)
        .map(function(item) {
            return _.keys(item);
        })
        .flatten()
        .uniq()
        .value();

    var result = '<table border="1"><tr>';
    _.each(allKeys, function(item) {
        result += '<th>' + item + '</th>';
    });

    result += '</tr>';

    _.each(array, function(item) {
        result += '<tr>';

        _.each(allKeys, function(header) {
            if (isObject(item[header])) {
                // kind of toString();
                result += '<td>' + _.escape(JSON.stringify(item[header])) + '</td>';
            } else {
                result += '<td>' + _.escape(item[header]) + '</td>';
            }
        });

        result += '</tr>';
    });

    result += '</table>';

    return result;
};
