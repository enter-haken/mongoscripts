mongoscripts
============

The *mongoscripts* project is a collection of tiny tools, which extend the functionality of [the mongo Shell](https://docs.mongodb.org/manual/mongo)


### collection extensions

looking for \_ids
 
```javascript
db.collection.find({
    _id: 1
});

db.collection.find({
    _id: {
        $in: [1, 2, 3]
    }
});
```

can be shortened to

```javascript
db.collection.id(1);
db.collection.id([1,2,3]);
```

### query extensions

Sorting a query ascending / descending by id

```javascript
db.collection.find().sort({
    _id: 1
});

db.collection.find().sort({
    _id: -1
});
```

can be shortened to

```javascript
db.collection.find().asc();
db.collection.find().desc();
```

If you have [relationships](https://docs.mongodb.org/manual/tutorial/model-referenced-one-to-many-relationships-between-documents/) between collections, it is often helpful to store references in an array for later use.


```javascript
var sourceIds = db.sourceCollection.find().extractFieldToArray();

// here comes some code...

db.targetCollection.find({
    sourceId: {
        $in: sourceIds
    }
});
```

You can transform your search result into different formats.


```javascript
db.collection.find().toHtmlTable()

```

gets a simple HTML table as result. Subdocuments and arrays are printed as json


```javascript
db.collection.find().toJiraTable()

```

gets a JIRA table for given search result.

The transformation works fine for simple documents. The column count can be controlled via query projection. 
The document count should be limited, since the rendering occurs after fetching the documents. 

### misc

When it comes to date handling, you'll like to find documents in a specific date range. Querys like this are looking like

```javascript
db.LogEntry.find({
    TimeStamp: {
        $gte: ISODate("2016-02-18T09:30:00.000+0000"),
        $lte: ISODate("2016-02-18T09:31:00.000+0000")
    }
}).sort({
    TimeStamp: -1
});
```

with the *getRange* method, you can shorten this query to

```javascript
db.LogEntry.find(getDateRange(new Date(2016,1,18,9,30,30), 30, 'TimeStamp'))

```
This Query searches documents +/- 30 seconds around the given date for the *TimeStamp* field.

### Further reading

* [MongoDB API Docs for js](https://api.mongodb.org/js)
* [underscore.js](http://underscorejs.org/)

### Contact

Jan Frederik Hake, <jan_hake@gmx.de>. [@enter\_haken](https://twitter.com/enter_haken) on Twitter.
