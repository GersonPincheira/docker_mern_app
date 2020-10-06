const Router = require("express");
const router = Router();
const searchProductsController = require("../controllers/searchProducts.controller");

router.route("/").get(searchProductsController.search);

module.exports = router;