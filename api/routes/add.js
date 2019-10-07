// var express = require('express');
// var router = express.Router();
// var Vegetable = require("../model/vegetable")
// var multer = require("multer");
// const storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//                 cb(null, "./upload");
//         },
//         filename: function (req, file, cb) {
//                 cb(null, file.originalname);
//         }
// });

// const upload = multer({
//         storage: storage,
//         limits: {
//                 fileSize: 1024 * 1024 * 5
//         }
// });
// router.post('/', upload.single("image"), (req, res, next) => {
//         let vegeitem = new Vegetable({
//                 ...req.body
//         });
//         vegeitem.image = req.file.path;
//         vegeitem.save(err => {
//                 if (err) {
//                         console.log(err);
//                         return;
//                 }
//                 console.log('success');
//                 res.end();
//         });

// });
var express = require("express");
var router = express.Router();
var Product = require("../model/vegetable");
var multer = require("multer");
const wrap = require("../utils/asyncWrapper");

/* GET home page. */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10
  }
});
router.post('/', upload.single("image"), (req, res, next) => {
  let vegeitem = new Product({
    ...req.body
  });
  vegeitem.image = req.file.path;
  vegeitem.save(err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(vegeitem);
    res.redirect('http://localhost:3001/admin')
  });

});
module.exports = router;