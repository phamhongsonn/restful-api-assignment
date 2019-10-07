var express = require("express");
var request = require("request");
var router = express.Router();
const multer = require("multer");

var product = require("../model/vegetable");

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

router.post("/:id", upload.single("image"), async function(req, res, next) {  
  const data = { ...req.body };

  if (req.file) {
    data.image = req.file.path;
  }

  // console.log(new FormData(data));

    request(
    {
      url: `http://localhost:3000/edit/${req.params.id}`,
      method: "PUT",
      json: data
    },
    (err, res, body) => {
      if (body) {
        res.redirect("http://localhost:3001/admin");
      }
    }
  );
});

module.exports = router;
