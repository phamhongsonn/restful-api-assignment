var express = require('express');
var router = express.Router();
const formatCurrency = require('format-currency')
var vegetables = require('../model/vegetable');
router.get("/", function ({ query: { query } }, res, next) {
  var data = vegetables.find();
  if (query) {
    data = vegetables.find({
      $text:
      {
        $search: query
      }
    })
  }

  data.exec(async (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    const response = await Promise.all(results.map(({ name, price, type, image }) => ({ name, type, image, price }))).then(data => data).catch(err => err);

    // res.render("index", {
    //   listVege: response, searchQuery: query
    // });

    res.send(JSON.stringify(response))
  });
});

module.exports = router;
