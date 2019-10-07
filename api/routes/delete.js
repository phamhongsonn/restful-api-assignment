//var express = require('express');
// var router = express.Router();
// var Vegetable = require("../model/vegetable")

// router.get('/:id', function(req, res, next) {
//     var id = req.params.id;
//     Vegetable.findByIdAndRemove(id).exec();
//     res.redirect('http://localhost:3000/admin');
//   });

//   module.exports = router;
var express = require("express");
var router = express.Router();
var Product = require("../model/vegetable");
const wrap = require("../utils/asyncWrapper");

router.delete(
  "/:id",
  wrap(async function (req, res, next) {
    var id = req.params.id;
    await Product.findByIdAndRemove(id).exec();
    res.redirect("http://localhost:3001/admin");
  })
);

module.exports = router;
