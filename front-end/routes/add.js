var express = require('express');
var router = express.Router();
var request = require('request');
var multer = require("multer");
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
    fileSize: 1024 * 1024 * 10
  }
});
router.post("/", upload.single("image"), async (req, res, next) => {

  const data = { ...req.body };

  if (req.file) {
    data.image = req.file.path;
  }

  const isAdd = await request(
    {
      url: "http://localhost:3000/add",
      method: "POST",
      json: data
    },
    (err, resp, body) => {
      if (body) {
        res.redirect("http://localhost:3001/admin");
      }
    }
  );
});

module.exports = router;