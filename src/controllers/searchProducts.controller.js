const { isPalindrome } = require("../helpers");
const { Product } = require("../models");
const searchProductsController = {};

// GET /api/v1/searchProducts
searchProductsController.search = async (req, res) => {
  try {
    var results = [];
    if (Boolean(req.query.consult)) {
      if (!isNaN(req.query.consult)) {
        var search_for_id = await Product.findOne({ id: req.query.consult });
        results = Boolean(search_for_id)
          ? results.concat(search_for_id)
          : results;
      }
      if (results.length == 0 && req.query.consult.length > 3) {
        var search_by_info = await Product.find({
          $or: [
            { brand: { $regex: ".*" + req.query.consult + ".*" } },
            { description: { $regex: ".*" + req.query.consult + ".*" } },
          ],
        });
        results = Boolean(search_by_info)
          ? results.concat(search_by_info)
          : results;
      }
      if (results.length > 0 && isPalindrome(req.query.consult)) {
        results = results.map((item) => {
          item.sale = "50%";
          item.price = Math.round(item.price / 2);
          return item;
        });
      }
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = searchProductsController;
