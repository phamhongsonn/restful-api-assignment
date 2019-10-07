var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  request.get('http://localhost:3000/' , { json: true }, (err, response, data) => {
        if (err) { return console.log(err); }

        res.render("index", {
          listVege: data
        });
    });
//   request('http://localhost:3000/', function (error, response, data) {
//     if (!error && response.statusCode == 200) {
//         res.end(JSON.stringify(data)) // Print the google web page.
//      }
// })

  // res.render('index', { title: 'Express' });
});

module.exports = router;
