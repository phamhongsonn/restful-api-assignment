// var express = require("express");
// var router = express.Router();
// const multer = require("multer");

// var vege = require("../model/vegetable");

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, "./upload/");
//   },
//   filename: function(req, file, cb) {
//     cb(null, file.originalname);
//   }
// });


// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   }
// });

// router.get("/:id", function(req, res, next) {
//   vege.findById(req.params.id, (err, vegetable) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     res.render("edit", {
//       vegetable
//     });
//   });
// });

// router.post("/:id", upload.single("image"), function(req, res, next) {
//   vege.update({ _id: req.params.id }, req.file ? { ...req.body, image: req.file.path } : {...req.body }, (err, result) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log('insert success');
//     res.redirect('http://localhost:3000/admin');
//   });
// });

// module.exports = router;
var express = require("express");
var router = express.Router();
const multer = require("multer");

var product = require("../model/vegetable");

const wrap = require("../utils/asyncWrapper");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./upload");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

router.get("/:id", function(req, res, next) {
  product.findById(req.params.id, (err, value) => {
    if (err) {
      console.log(err);
      return;
    }
    res.render("edit", {
      value
    });
  });
});

router.put("/:id", upload.single("image"), (function(req, res, next) {
  product.update({ _id: req.params.id }, req.file ? { ...req.body, image: req.file.path } : {...req.body }, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('edit success');
        res.redirect('http://localhost:3001/admin');
      });
  })
);

module.exports = router;