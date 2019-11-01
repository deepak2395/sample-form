var express = require('express');
const axios = require('axios');
var router = express.Router();
var Events = require('../models/Events');
var os = require("os");
var hostaddress = os.hostname();


/* GET users listing. */
router.get('/', async function (req, res, next) {

 
  function getIPAddress() {
    
    return new Promise((resolve, reject) => {
      axios.get('https://jsonip.com?callback=?')
        .then(function (response) {
          // handle success
          resolve(JSON.parse(response.data.replace('?(', '').replace(');', '')).ip);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          resolve("not found")
        })
        .finally(function () {
          // always execu
        });
    })
  }
  var url_Details = req.url
  var parti_Details = []
  var parti_obj = {}
  parti_Details = url_Details.replace('/?', '').replace(/\+/g,' ').replace(/\%27/g,"'").replace('&remember=on', '').split('&')
  if (parti_Details.length == 3) {
    let newUser = new Events();
    for (var i = 0; i < parti_Details.length; i++) {
      /* var keyq = parti_Details[i].split('=')[0]
      var value = parti_Details[i].split('=')[1]
      parti_obj.keyq = value */
      if (i == 0) {
        newUser.user = parti_Details[i].split('=')[1]
      }
      if (i == 1) {
        newUser.registerid = parti_Details[i].split('=')[1]
      }
      if (i == 2) {
        newUser.event = parti_Details[i].split('=')[1]
      }
    }
    newUser.client = await getIPAddress()

    /* newUser.user = parti_obj['uname'];
    newUser.registerid = parti_obj['isnum'];
    newUser.event = parti_obj['events']; */
    newUser.save((err) => {
      if (err) return res.json({ success: false, error: err });
      // return res.json({ success: true });
      res.render('notification', { title: 'Integra' });
    });


  } else {
    console.log('Something went wrong')
  }

  // res.send('respond with a resource');
});

module.exports = router;
