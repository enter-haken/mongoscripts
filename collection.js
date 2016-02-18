DBCollection.prototype.id = function(id, fields) {
    if (id instanceof Array) {
        return this.find({
            _id: {
                $in: id
            }
        }, fields);
    }

    return this.find({
        _id: id
    }, fields);
};
