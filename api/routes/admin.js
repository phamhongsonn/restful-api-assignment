// var express = require('express');
// var router = express.Router();
// const formatCurrency = require('format-currency')


// var vegetables = require('../model/vegetable');

// /* GET admin page. */
// router.get("/", function (req, res, next) {
//   var query = vegetables.find();
//   // console.log()
//   query.exec(async (err, results) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     const data = await Promise.all(results.map(({ name, price, type, image }) => ({ name, type, image, price }))).then(data => data).catch(err => err);
//     // res.render("admin", {
//     //   listVege: results
//     // });
//     res.send(JSON.stringify(response))
//   });
// });

// module.exports = router;
var express = require("express");
var router = express.Router();
var Product = require("../model/vegetable");
const wrap = require("../utils/asyncWrapper");
router.get("/", async function (req, res, next) {
  const results = await Product.find();
  console.log(results)
  res.send(JSON.stringify(results))

});

// router.post("/", upload.single("image"), async (req, res, next) => {
//   if (req.body.name) {
//     await Product.create({
//       name: req.body.name,
//       price: req.body.price,
//       type: req.body.type,
//       desc: req.body.desc,
//       image: req.file.path
//     });
//   }

//   const products = await Product.find({ deleted: false }).lean();
//   const data = await Promise.all(
//     products.map(v => ({
//       ...v,
//       price: currencyFormatter.format(v.price, { code: "USD" })
//     }))
//   )
//     .then(data => data)
//     .catch(err => console.error(err));

//   res.send({ title: "Express", products: data });
// });

module.exports = router;
