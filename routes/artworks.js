var express = require('express');
var router = express.Router();

/* GET artworklist page. */
router.get('/', function(req, res, next) {
  var db = req.db;
    var collection = db.get('artworks');
    collection.find({},{limit: 10, "sort": "title"},renderPage);
    
    function renderPage(e,docs)
    {
        res.render('artworklist', {
            "artworklist" : docs,
            title: 'Tate Gallery : Artwork List'
        });
    }
    
});

/*
 * GET artworklist json file.
 */
router.get('/json', function(req, res) {
    var db = req.db;
    var collection = db.get('artworks');
    collection.find({},{limit: 10, "sort": "title"},function(e,docs){
        res.json(docs);
    });
});

/*
 * GET artworklist pagination.
 */
router.get('/artworklist/:num', function(req, res) {
    var db = req.db;
    var num = req.params.num * 10;
    var collection = db.get('artworks');
    collection.find({},{limit: 10, skip: num, "sort": "title"},function(e,docs){
        res.json(docs);
    });
});


/* GET single artwork page. */
router.get('/:id', function(req, res) {
    var db = req.db;
    var id = req.params.id;
    var collection = db.get('artworks');
    
    collection.findOne( {_id:id} ,renderPage);
    
    function renderPage(e,item)
    {
        res.render('artwork', {
            "artwork" : item,
            title: 'Tate Gallery : Artwork'
        });
    }
});


/*
 * GET single artwor json
 */
router.get('/:id/json', function(req, res) {
    var db = req.db;
    var id = req.params.id;
    var collection = db.get('artworks');
    
    collection.findOne( {_id:id} , function(err, item) {
        res.json(item);
    });
});

router.get('/findartistartwork/:id', function (req, res) {
    console.log(req.params.id);
    var id = req.params.id;
    var db = req.db;
    var collection = db.get('artworks');
    collection.find({
        contributors: {
            $elemMatch: {
                id: parseInt(id)
            }
        }
    }, function (e, docs) {
        res.json(docs);
    });
});

module.exports = router;