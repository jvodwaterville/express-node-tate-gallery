var express = require('express');
var router = express.Router();

/*
 * GET home page
 */
router.get('/', function(req, res) 
{
    var artwork; var artist;
    
    var db = req.db;
    var collection = db.get('artworks');
    
    collection.findOne( {},{skip: Math.random() * 2000} , renderPage);
    
    function renderPage(e, item) 
    {
        res.render('index', {
            "artwork" : item,
            title: 'Tate Gallery : Home'
        });
    }
    
});


module.exports = router;
