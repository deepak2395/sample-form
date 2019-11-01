var express = require('express');
var Library = require('../models/library');

var router = express.Router();

/* GET home page. */

router.get('/', function (req, res, next) {
    res.render('library', { title: 'Integra' });
});

router.post('/getval', function (req, res, next) {
    let srcword = req.body.word
    Library.findOne({ word: srcword }, (err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    })
});

router.post('/', function (req, res, next) {
    let newWord = new Library();
    newWord.word = req.body.word
    newWord.meaning = req.body.meaning
    newWord.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

module.exports = router;