var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
  request.get('http://localhost:3000/admin' , { json: true }, (err, response, data) => {
        if (err) { return console.log(err); }
        res.render("admin", {
          listVege: data
        });
    });
});

module.exports = router;
