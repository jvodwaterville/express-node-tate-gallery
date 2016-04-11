var express = require('express');
var router = express.Router();

/* GET artistlist page. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var collection = db.get('artists');
    collection.find({},{limit: 10, "sort": "mda"},renderPage);
    
    function renderPage(e,docs)
    {
        res.render('artistlist', {
            "artistlist" : docs,
            title: 'Tate Gallery : Artist List'
        });
    }
});

/*
 * GET artistlist json.
 */
router.get('/json', function(req, res) {
    var db = req.db;
    var collection = db.get('artists');
    collection.find({},{limit: 10, skip: 0, "sort": "mda"},function(e,docs){
        res.json(docs);
    });
});

/*
 * GET artistlist pagination.
 */
router.get('/artistlist/:num', function(req, res) {
    var db = req.db;
    var num = req.params.num * 10;
    var collection = db.get('artists');
    collection.find({},{limit: 10, skip: num, "sort": "mda"},function(e,docs){
        res.json(docs);
    });
});


/*
 * GET artistlist with name search.
 */
router.get('/search/:name', function(req, res) {
    var db = req.db;
    var name = req.params.name;
    var collection = db.get('artists');
    collection.find({mda : {'$regex': name, $options: 'i'} },{limit: 10, "sort": "mda"},function(e,docs){
        res.json(docs);
    });
});


/*
 * GET artistlist search with pagination.
 */
router.get('/artistlist/:name/:num', function(req, res) {
    var db = req.db;
    var num = req.params.num * 10;
    var name = req.params.name;
    var collection = db.get('artists');
    collection.find({mda : {'$regex': name, $options: 'i'}},{limit: 10, skip: num, "sort": "mda"},function(e,docs){
        res.json(docs);
    });
});


/*
 * GET single artist json
 */
router.get('/:id/json', function(req, res) {
    var db = req.db;
    var id = req.params.id;
    var collection = db.get('artists');
    
    collection.findOne( {_id:id} , function(err, item) {
        res.json(item);
    });
});


/* 
* GET single artist page. 
*/
router.get('/:id', function(req, res, next) {
    var db = req.db;
    var id = req.params.id;
    var collection = db.get('artists');
    
    collection.findOne( {_id:id} ,renderPage);
    
    function renderPage(e,item)
    {
        res.render('artist', {
            "artist" : item,
            title: 'Tate Gallery : Artist Details'
        });
    }
});

module.exports = router;