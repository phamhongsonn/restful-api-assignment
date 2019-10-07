var express = require("express");
var request = require("request");
var router = express.Router();
var product = require("../model/vegetable");

router.get("/:id", async function(req, res, next) {
  var id = req.params.id;
  request.delete(`http://localhost:3000/delete/${id}`, {}, () => {
    res.redirect("http://localhost:3001/admin");
  });
});

module.exports = router;