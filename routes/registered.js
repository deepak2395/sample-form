var express = require('express');
var Events = require('../models/Events');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    Events.find({}, (err, data) => {
        if (err) return res.json({ success: false, error: err });
        //   return res.json({ success: true, data: data });
        var arr = []
        for (var i = 0; i < data.length; i++) {
            arr.push(data[i].user + " -> " + data[i].event)
        }
        // res.render('registered', { 'user': arr });
        res.render('registered', { 'user': data });
    })
});

router.get('/sort', function (req, res, next) {
    var url_Details = req.url
    parti_Details = url_Details.replace(/\+/g, ' ').replace(/\%27/g, "'").split('=')[1]
    Events.find({ "event": parti_Details }, (err, data) => {
        if (err) return res.json({ success: false, error: err });
        //   return res.json({ success: true, data: data });
        var arr = []
        for (var i = 0; i < data.length; i++) {
            arr.push(data[i].user + " -> " + data[i].event)
        }
        // res.render('registered', { 'user': arr });
        res.render('registered', { 'user': data });
    })
});

module.exports = router;
